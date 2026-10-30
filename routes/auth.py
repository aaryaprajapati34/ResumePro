from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash
)

from models.user import (
    create_user,
    get_user_by_email,
    verify_password
)


auth = Blueprint("auth", __name__)


# =========================================================
# SIGNUP
# =========================================================

@auth.route("/signup", methods=["GET", "POST"])
def signup():

    # Get template selected from homepage
    selected_template = request.args.get(
        "template",
        "template1"
    )

    # Validate selected template
    if selected_template not in {
        "template1",
        "template2",
        "template3"
    }:
        selected_template = "template1"

    if request.method == "POST":

        # Get selected template from signup form
        selected_template = request.form.get(
            "selected_template",
            selected_template
        )

        # Validate selected template again
        if selected_template not in {
            "template1",
            "template2",
            "template3"
        }:
            selected_template = "template1"

        fullname = request.form["fullname"].strip()
        email = request.form["email"].strip().lower()
        password = request.form["password"]
        confirm_password = request.form["confirm_password"]

        # -------------------------------------------------
        # Check empty fields
        # -------------------------------------------------

        if not fullname or not email or not password:

            flash(
                "Please fill in all fields.",
                "error"
            )

            return redirect(
                url_for(
                    "auth.signup",
                    template=selected_template
                )
            )

        # -------------------------------------------------
        # Check password length
        # -------------------------------------------------

        if len(password) < 6:

            flash(
                "Password must be at least 6 characters.",
                "error"
            )

            return redirect(
                url_for(
                    "auth.signup",
                    template=selected_template
                )
            )

        # -------------------------------------------------
        # Check passwords
        # -------------------------------------------------

        if password != confirm_password:

            flash(
                "Passwords do not match.",
                "error"
            )

            return redirect(
                url_for(
                    "auth.signup",
                    template=selected_template
                )
            )

        # -------------------------------------------------
        # Check existing email
        # -------------------------------------------------

        existing_user = get_user_by_email(
            email
        )

        if existing_user:

            flash(
                "An account with this email already exists.",
                "error"
            )

            return redirect(
                url_for(
                    "auth.signup",
                    template=selected_template
                )
            )

        # -------------------------------------------------
        # Create account
        # -------------------------------------------------

        create_user(
            fullname,
            email,
            password
        )

        # Save selected template
        session["selected_template"] = selected_template

        flash(
            "Account created successfully! Please login.",
            "success"
        )

        return redirect(
            url_for(
                "auth.login"
            )
        )

    # -----------------------------------------------------
    # Display signup page
    # -----------------------------------------------------

    return render_template(
        "signup.html",
        selected_template=selected_template
    )


# =========================================================
# LOGIN
# =========================================================

@auth.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"].strip().lower()
        password = request.form["password"]

        # Get user
        user = get_user_by_email(
            email
        )

        # Verify login
        if user and verify_password(
            user["password"],
            password
        ):

            session["userid"] = user["userid"]
            session["fullname"] = user["fullname"]
            session["email"] = user["email"]

            return redirect(
                url_for(
                    "dashboard"
                )
            )

        # Invalid login
        flash(
            "Invalid email or password.",
            "error"
        )

        return redirect(
            url_for(
                "auth.login"
            )
        )

    return render_template(
        "login.html"
    )


# =========================================================
# LOGOUT
# =========================================================

@auth.route("/logout")
def logout():

    session.clear()

    flash(
        "You have been logged out.",
        "success"
    )

    return redirect(
        url_for(
            "auth.login"
        )
    )