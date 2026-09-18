import os

from flask import (
    Flask,
    render_template,
    redirect,
    url_for,
    session,
    send_from_directory,
    request,
    flash
)

from routes.auth import auth
from routes.resume import resume
from models.resume import get_resumes_by_user


app = Flask(__name__)

app.secret_key = "resumepro-secret-key-2026"


# -----------------------------------
# Upload Configuration
# -----------------------------------

UPLOAD_FOLDER = os.path.join(
    app.root_path,
    "uploads",
    "profile_photos"
)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Create profile photo folder automatically
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# -----------------------------------
# Register Blueprints
# -----------------------------------

app.register_blueprint(auth)
app.register_blueprint(resume)


# -----------------------------------
# Home
# -----------------------------------

@app.route("/")
def home():

    return render_template(
        "index.html"
    )


# -----------------------------------
# Dashboard
# -----------------------------------

@app.route("/dashboard")
def dashboard():

    if "userid" not in session:

        return redirect(
            url_for("auth.login")
        )

    userid = session["userid"]

    resumes = get_resumes_by_user(
        userid
    )

    completed_count = 0

    for resume_data in resumes:

        if (
            resume_data.get("fullname")
            and resume_data.get("email")
            and resume_data.get("summary")
        ):
            completed_count += 1

    return render_template(
        "dashboard.html",
        resumes=resumes,
        completed_count=completed_count
    )


# -----------------------------------
# Serve Uploaded Files
# -----------------------------------

@app.route("/uploads/<path:filename>")
def uploaded_file(filename):

    upload_folder = os.path.join(
        app.root_path,
        "uploads"
    )

    return send_from_directory(
        upload_folder,
        filename
    )

@app.route("/profile")
def profile():

    if "userid" not in session:
        return redirect(url_for("auth.login"))

    return render_template("profile.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":

        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        subject = request.form.get("subject", "").strip()
        message = request.form.get("message", "").strip()

        if not name or not email or not subject or not message:

            flash(
                "Please fill in all fields.",
                "error"
            )

            return redirect(
                url_for("contact")
            )

        flash(
            "Thank you for contacting ResumePro. Your message has been received.",
            "success"
        )

        return redirect(
            url_for("contact")
        )

    return render_template("contact.html")
# -----------------------------------
# Run Application
# -----------------------------------

if __name__ == "__main__":

    app.run(
        debug=True
    )