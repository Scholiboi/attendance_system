from app import app, db
from models import Admin

with app.app_context():
    username = input("Enter admin username: ")
    password = input("Enter admin password: ")

    existing_admin = Admin.query.filter_by(username=username).first()
    if existing_admin:
        print("Admin user already exists.")
    else:
        admin = Admin(username=username)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        print("Admin user created successfully.")