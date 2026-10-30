from database.db import get_db_connection


# =========================================
# ADD CERTIFICATE
# =========================================

def add_certificate(
    resumeid,
    certificate_name,
    issuing_organization,
    certificate_date,
    file_path,
    file_type
):

    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO certificates (
            resumeid,
            certificate_name,
            issuing_organization,
            certificate_date,
            file_path,
            file_type
        )
        VALUES (?, ?, ?, ?, ?, ?)
    """

    cursor.execute(
        query,
        (
            resumeid,
            certificate_name,
            issuing_organization,
            certificate_date,
            file_path,
            file_type
        )
    )

    connection.commit()

    certificateid = cursor.lastrowid

    cursor.close()
    connection.close()

    return certificateid


# =========================================
# GET CERTIFICATES FOR A RESUME
# =========================================

def get_certificates_by_resume(resumeid):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        SELECT *
        FROM certificates
        WHERE resumeid = ?
        ORDER BY created_at DESC
    """

    cursor.execute(
        query,
        (resumeid,)
    )

    certificates = cursor.fetchall()

    cursor.close()
    connection.close()

    return certificates


# =========================================
# GET SINGLE CERTIFICATE
# =========================================

def get_certificate_by_id(
    certificateid,
    resumeid
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        SELECT *
        FROM certificates
        WHERE certificateid = ?
        AND resumeid = ?
    """

    cursor.execute(
        query,
        (
            certificateid,
            resumeid
        )
    )

    certificate = cursor.fetchone()

    cursor.close()
    connection.close()

    return certificate


# =========================================
# DELETE CERTIFICATE
# =========================================

def delete_certificate(
    certificateid,
    resumeid
):

    connection = get_db_connection()

    cursor = connection.cursor()

    query = """
        DELETE FROM certificates
        WHERE certificateid = ?
        AND resumeid = ?
    """

    cursor.execute(
        query,
        (
            certificateid,
            resumeid
        )
    )

    connection.commit()

    cursor.close()
    connection.close()
