import sqlite3
import os


# =========================================
# DATABASE PATH
# =========================================

DATABASE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "resumepro.db"
)


# =========================================
# GET DATABASE CONNECTION
# =========================================

def get_db_connection():

    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    # Enable foreign key support
    connection.execute("PRAGMA foreign_keys = ON")

    return connection


# =========================================
# INITIALIZE DATABASE
# =========================================

def init_db():

    connection = get_db_connection()

    cursor = connection.cursor()


    # =====================================
    # USERS TABLE
    # =====================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (

            userid INTEGER PRIMARY KEY AUTOINCREMENT,

            fullname TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            password TEXT NOT NULL

        )
    """)


    # =====================================
    # RESUMES TABLE
    # =====================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS resumes (

            resumeid INTEGER PRIMARY KEY AUTOINCREMENT,

            userid INTEGER NOT NULL,

            resume_name TEXT NOT NULL DEFAULT 'My Resume',

            fullname TEXT,

            email TEXT,

            phone TEXT,

            address TEXT,

            summary TEXT,

            skills TEXT,

            education TEXT,

            experience TEXT,

            projects TEXT,

            certifications TEXT,

            template TEXT NOT NULL DEFAULT 'template1',

            profile_image TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (userid)
                REFERENCES users(userid)
                ON DELETE CASCADE

        )
    """)


    # =====================================
    # CERTIFICATES TABLE
    # =====================================

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS certificates (

            certificateid INTEGER PRIMARY KEY AUTOINCREMENT,

            resumeid INTEGER NOT NULL,

            certificate_name TEXT NOT NULL,

            issuing_organization TEXT,

            certificate_date TEXT,

            file_path TEXT,

            file_type TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (resumeid)
                REFERENCES resumes(resumeid)
                ON DELETE CASCADE

        )
    """)


    # =====================================
    # SAVE CHANGES
    # =====================================

    connection.commit()


    # =====================================
    # CLOSE CONNECTION
    # =====================================

    cursor.close()

    connection.close()

    print("SQLite database initialized successfully!")


# =========================================
# INITIALIZE DATABASE WHEN APP STARTS
# =========================================

try:

    init_db()

except sqlite3.Error as error:

    print("SQLite database error:", error)