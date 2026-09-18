from database.db import get_db_connection


# -----------------------------------
# Create Resume
# -----------------------------------

def create_resume(
    userid,
    resume_name,
    template="template1"
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        INSERT INTO resumes (
            userid,
            resume_name,
            template
        )
        VALUES (?, ?, ?)
    """

    cursor.execute(
        query,
        (
            userid,
            resume_name,
            template
        )
    )

    connection.commit()

    resumeid = cursor.lastrowid

    cursor.close()
    connection.close()

    return resumeid


# -----------------------------------
# Get All Resumes of User
# -----------------------------------

def get_resumes_by_user(userid):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        SELECT *
        FROM resumes
        WHERE userid = ?
        ORDER BY updated_at DESC
    """

    cursor.execute(
        query,
        (userid,)
    )

    rows = cursor.fetchall()

    columns = [column[0] for column in cursor.description]

    resumes = [
        dict(zip(columns, row))
        for row in rows
    ]

    cursor.close()
    connection.close()

    return resumes


# -----------------------------------
# Get Single Resume
# -----------------------------------

def get_resume_by_id(
    resumeid,
    userid
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        SELECT *
        FROM resumes
        WHERE resumeid = ?
        AND userid = ?
    """

    cursor.execute(
        query,
        (
            resumeid,
            userid
        )
    )

    row = cursor.fetchone()

    if row:
        columns = [column[0] for column in cursor.description]

        resume = dict(zip(columns, row))
    else:
        resume = None

    cursor.close()
    connection.close()

    return resume


# -----------------------------------
# Update Resume
# -----------------------------------

def update_resume(
    resumeid,
    userid,
    resume_name,
    fullname,
    email,
    phone,
    address,
    summary,
    skills,
    education,
    experience,
    projects,
    certifications,
    template,
    profile_image
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        UPDATE resumes
        SET
            resume_name = ?,
            fullname = ?,
            email = ?,
            phone = ?,
            address = ?,
            summary = ?,
            skills = ?,
            education = ?,
            experience = ?,
            projects = ?,
            certifications = ?,
            template = ?,
            profile_image = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE resumeid = ?
        AND userid = ?
    """

    cursor.execute(
        query,
        (
            resume_name,
            fullname,
            email,
            phone,
            address,
            summary,
            skills,
            education,
            experience,
            projects,
            certifications,
            template,
            profile_image,
            resumeid,
            userid
        )
    )

    connection.commit()

    cursor.close()
    connection.close()


# -----------------------------------
# Delete Resume
# -----------------------------------

def delete_resume(
    resumeid,
    userid
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        DELETE FROM resumes
        WHERE resumeid = ?
        AND userid = ?
    """

    cursor.execute(
        query,
        (
            resumeid,
            userid
        )
    )

    connection.commit()

    cursor.close()
    connection.close()
