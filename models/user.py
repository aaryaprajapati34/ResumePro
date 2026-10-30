from werkzeug.security import generate_password_hash, check_password_hash
from database.db import get_db_connection


def create_user(fullname, email, password):
    connection = get_db_connection()
    cursor = connection.cursor()

    hashed_password = generate_password_hash(password)

    query = """
        INSERT INTO users (fullname, email, password)
        VALUES (?, ?, ?)
    """

    cursor.execute(query, (fullname, email, hashed_password))
    connection.commit()

    cursor.close()
    connection.close()


def get_user_by_email(email):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE email = ?"

    cursor.execute(query, (email,))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    return user


def verify_password(stored_password, entered_password):
    return check_password_hash(stored_password, entered_password)