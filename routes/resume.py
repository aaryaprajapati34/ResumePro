import os
import uuid

from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    current_app
)

from models.resume import (
    create_resume,
    get_resume_by_id,
    update_resume,
    delete_resume
)

from models.certificate import (
    add_certificate,
    get_certificates_by_resume,
    get_certificate_by_id,
    delete_certificate
)


# =========================================
# RESUME BLUEPRINT
# =========================================

resume = Blueprint(
    "resume",
    __name__,
    url_prefix="/resume"
)


# =========================================
# ALLOWED FILE EXTENSIONS
# =========================================

ALLOWED_IMAGE_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp"
}

ALLOWED_CERTIFICATE_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp",
    "pdf"
}


# =========================================
# CHECK IMAGE EXTENSION
# =========================================

def allowed_image(filename):

    if not filename or "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in ALLOWED_IMAGE_EXTENSIONS


# =========================================
# CHECK CERTIFICATE EXTENSION
# =========================================

def allowed_certificate(filename):

    if not filename or "." not in filename:
        return False

    extension = filename.rsplit(".", 1)[1].lower()

    return extension in ALLOWED_CERTIFICATE_EXTENSIONS


# =========================================
# CHECK LOGIN
# =========================================

def logged_in():

    return "userid" in session


# =========================================
# CREATE RESUME
# =========================================

@resume.route(
    "/create",
    methods=["GET", "POST"]
)
def create():

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    # =====================================
    # CREATE RESUME
    # =====================================

    if request.method == "POST":

        resume_name = request.form.get(
            "resume_name",
            "My Resume"
        ).strip()

        if not resume_name:

            resume_name = "My Resume"

        # =================================
        # GET SELECTED TEMPLATE
        # =================================

        template = request.form.get(
            "selected_template",
            "template1"
        )

        # =================================
        # VALIDATE TEMPLATE
        # =================================

        if template not in {
            "template1",
            "template2",
            "template3"
        }:

            template = "template1"

        userid = session["userid"]

        # =================================
        # CREATE RESUME WITH TEMPLATE
        # =================================

        resumeid = create_resume(
            userid,
            resume_name,
            template
        )

        # Remove temporary template from session
        session.pop(
            "selected_template",
            None
        )

        flash(
            "Resume created successfully.",
            "success"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # GET SELECTED TEMPLATE
    # =====================================

    selected_template = request.args.get(
        "template"
    )

    if not selected_template:

        selected_template = session.get(
            "selected_template",
            "template1"
        )

    # =====================================
    # VALIDATE TEMPLATE
    # =====================================

    if selected_template not in {
        "template1",
        "template2",
        "template3"
    }:

        selected_template = "template1"

    # =====================================
    # DISPLAY CREATE RESUME PAGE
    # =====================================

    return render_template(
        "create_resume.html",
        selected_template=selected_template
    )


# =========================================
# RESUME BUILDER
# =========================================

@resume.route(
    "/builder/<int:resumeid>",
    methods=["GET", "POST"]
)
def builder(resumeid):

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    resume_data = get_resume_by_id(
        resumeid,
        userid
    )

    if not resume_data:

        flash(
            "Resume not found.",
            "error"
        )

        return redirect(
            url_for("dashboard")
        )

    # =====================================
    # SAVE RESUME
    # =====================================

    if request.method == "POST":

        resume_name = request.form.get(
            "resume_name",
            ""
        ).strip()

        fullname = request.form.get(
            "fullname",
            ""
        ).strip()

        email = request.form.get(
            "email",
            ""
        ).strip()

        phone = request.form.get(
            "phone",
            ""
        ).strip()

        address = request.form.get(
            "address",
            ""
        ).strip()

        summary = request.form.get(
            "summary",
            ""
        ).strip()

        skills = request.form.get(
            "skills",
            ""
        ).strip()

        education = request.form.get(
            "education",
            ""
        ).strip()

        experience = request.form.get(
            "experience",
            ""
        ).strip()

        projects = request.form.get(
            "projects",
            ""
        ).strip()

        certifications = request.form.get(
            "certifications",
            ""
        ).strip()

        template = request.form.get(
            "template",
            "template1"
        )

        # =================================
        # VALIDATE TEMPLATE
        # =================================

        if template not in {
            "template1",
            "template2",
            "template3"
        }:

            template = "template1"

        if not resume_name:

            resume_name = "My Resume"

        # =================================
        # PROFILE IMAGE
        # =================================

        profile_image = resume_data.get(
            "profile_image"
        )

        uploaded_file = request.files.get(
            "profile_image"
        )

        if uploaded_file and uploaded_file.filename:

            # =============================
            # CHECK FILE TYPE
            # =============================

            if not allowed_image(
                uploaded_file.filename
            ):

                flash(
                    "Invalid profile photo. Please upload JPG, JPEG, PNG or WEBP.",
                    "error"
                )

                return redirect(
                    url_for(
                        "resume.builder",
                        resumeid=resumeid
                    )
                )

            # =============================
            # GET EXTENSION
            # =============================

            extension = uploaded_file.filename.rsplit(
                ".",
                1
            )[1].lower()

            # =============================
            # UNIQUE FILE NAME
            # =============================

            unique_filename = (
                f"{uuid.uuid4().hex}.{extension}"
            )

            # =============================
            # PROFILE PHOTO FOLDER
            # =============================

            upload_folder = os.path.join(
                current_app.root_path,
                "uploads",
                "profile_photos"
            )

            os.makedirs(
                upload_folder,
                exist_ok=True
            )

            # =============================
            # SAVE IMAGE
            # =============================

            uploaded_file.save(
                os.path.join(
                    upload_folder,
                    unique_filename
                )
            )

            # =============================
            # DATABASE PATH
            # =============================

            profile_image = os.path.join(
                "profile_photos",
                unique_filename
            ).replace(
                "\\",
                "/"
            )

        # =====================================
        # UPDATE RESUME
        # =====================================

        update_resume(
            resumeid=resumeid,
            userid=userid,
            resume_name=resume_name,
            fullname=fullname,
            email=email,
            phone=phone,
            address=address,
            summary=summary,
            skills=skills,
            education=education,
            experience=experience,
            projects=projects,
            certifications=certifications,
            template=template,
            profile_image=profile_image
        )

        flash(
            "Resume saved successfully!",
            "success"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # GET CERTIFICATES
    # =====================================

    certificates = get_certificates_by_resume(
        resumeid
    )

    # =====================================
    # DISPLAY BUILDER
    # =====================================

    return render_template(
        "builder.html",
        resume=resume_data,
        certificates=certificates
    )


# =========================================
# UPLOAD CERTIFICATE
# =========================================

@resume.route(
    "/certificate/upload/<int:resumeid>",
    methods=["POST"]
)
def upload_certificate(resumeid):

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    # =====================================
    # CHECK RESUME OWNERSHIP
    # =====================================

    resume_data = get_resume_by_id(
        resumeid,
        userid
    )

    if not resume_data:

        flash(
            "Resume not found.",
            "error"
        )

        return redirect(
            url_for("dashboard")
        )

    # =====================================
    # GET FORM DATA
    # =====================================

    certificate_name = request.form.get(
        "certificate_name",
        ""
    ).strip()

    issuing_organization = request.form.get(
        "issuing_organization",
        ""
    ).strip()

    certificate_date = request.form.get(
        "certificate_date",
        ""
    ).strip()

    if not certificate_date:

        certificate_date = None

    uploaded_file = request.files.get(
        "certificate_file"
    )

    # =====================================
    # VALIDATE CERTIFICATE NAME
    # =====================================

    if not certificate_name:

        flash(
            "Please enter the certificate name.",
            "error"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # VALIDATE FILE
    # =====================================

    if not uploaded_file or not uploaded_file.filename:

        flash(
            "Please select a certificate file.",
            "error"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # VALIDATE FILE TYPE
    # =====================================

    if not allowed_certificate(
        uploaded_file.filename
    ):

        flash(
            "Invalid certificate file. Please upload JPG, JPEG, PNG, WEBP or PDF.",
            "error"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # GET FILE EXTENSION
    # =====================================

    extension = uploaded_file.filename.rsplit(
        ".",
        1
    )[1].lower()

    # =====================================
    # GENERATE UNIQUE FILE NAME
    # =====================================

    unique_filename = (
        f"{uuid.uuid4().hex}.{extension}"
    )

    # =====================================
    # CERTIFICATE UPLOAD FOLDER
    # =====================================

    upload_folder = os.path.join(
        current_app.root_path,
        "uploads",
        "certificates"
    )

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    # =====================================
    # SAVE CERTIFICATE FILE
    # =====================================

    uploaded_file.save(
        os.path.join(
            upload_folder,
            unique_filename
        )
    )

    # =====================================
    # DATABASE FILE PATH
    # =====================================

    file_path = os.path.join(
        "certificates",
        unique_filename
    ).replace(
        "\\",
        "/"
    )

    # =====================================
    # SAVE CERTIFICATE INFORMATION
    # =====================================

    add_certificate(
        resumeid=resumeid,
        certificate_name=certificate_name,
        issuing_organization=issuing_organization,
        certificate_date=certificate_date,
        file_path=file_path,
        file_type=extension
    )

    flash(
        "Certificate uploaded successfully!",
        "success"
    )

    return redirect(
        url_for(
            "resume.builder",
            resumeid=resumeid
        )
    )


# =========================================
# DELETE CERTIFICATE
# =========================================

@resume.route(
    "/certificate/delete/<int:certificateid>/<int:resumeid>",
    methods=["POST"]
)
def delete_certificate_route(
    certificateid,
    resumeid
):

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    # =====================================
    # CHECK RESUME OWNERSHIP
    # =====================================

    resume_data = get_resume_by_id(
        resumeid,
        userid
    )

    if not resume_data:

        flash(
            "Resume not found.",
            "error"
        )

        return redirect(
            url_for("dashboard")
        )

    # =====================================
    # GET CERTIFICATE
    # =====================================

    certificate = get_certificate_by_id(
        certificateid,
        resumeid
    )

    if not certificate:

        flash(
            "Certificate not found.",
            "error"
        )

        return redirect(
            url_for(
                "resume.builder",
                resumeid=resumeid
            )
        )

    # =====================================
    # GET FILE PATH
    # =====================================

    file_path = certificate.get(
        "file_path"
    )

    # =====================================
    # DELETE DATABASE RECORD
    # =====================================

    delete_certificate(
        certificateid,
        resumeid
    )

    # =====================================
    # DELETE ACTUAL FILE
    # =====================================

    if file_path:

        full_file_path = os.path.join(
            current_app.root_path,
            "uploads",
            file_path
        )

        if os.path.exists(
            full_file_path
        ):

            try:

                os.remove(
                    full_file_path
                )

            except OSError:

                pass

    flash(
        "Certificate deleted successfully.",
        "success"
    )

    return redirect(
        url_for(
            "resume.builder",
            resumeid=resumeid
        )
    )


# =========================================
# RESUME PREVIEW
# =========================================

@resume.route(
    "/preview/<int:resumeid>"
)
def preview(resumeid):

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    resume_data = get_resume_by_id(
        resumeid,
        userid
    )

    if not resume_data:

        flash(
            "Resume not found.",
            "error"
        )

        return redirect(
            url_for("dashboard")
        )

    # =====================================
    # GET CERTIFICATES
    # =====================================

    certificates = get_certificates_by_resume(
        resumeid
    )

    return render_template(
        "preview.html",
        resume=resume_data,
        certificates=certificates
    )


# =========================================
# DELETE RESUME
# =========================================

@resume.route(
    "/delete/<int:resumeid>",
    methods=["POST"]
)
def delete(resumeid):

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    # =====================================
    # CHECK RESUME OWNERSHIP
    # =====================================

    resume_data = get_resume_by_id(
        resumeid,
        userid
    )

    if not resume_data:

        flash(
            "Resume not found.",
            "error"
        )

        return redirect(
            url_for("dashboard")
        )

    # =====================================
    # DELETE RESUME
    # =====================================

    delete_resume(
        resumeid,
        userid
    )

    flash(
        "Resume deleted successfully.",
        "success"
    )

    return redirect(
        url_for("dashboard")
    )


# =========================================
# TEMPLATES PAGE
# =========================================

@resume.route(
    "/templates"
)
def templates():

    if not logged_in():

        return redirect(
            url_for("auth.login")
        )

    return render_template(
        "templates.html"
    )