from app import app, db
from models import Teacher, Student, Class, StudentClass, Attendance

with app.app_context():
    db.create_all()
    print("Database and tables created successfully.")
