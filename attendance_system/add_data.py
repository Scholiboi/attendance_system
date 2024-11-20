from app import app, db
from models import Teacher, Student, Class, StudentClass
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

def add_teacher():
    name = input("Enter teacher's name: ")
    email = input("Enter teacher's email: ")
    password = input("Enter teacher's password: ")
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_teacher = Teacher(name=name, email=email, password=hashed_password)
    db.session.add(new_teacher)
    db.session.commit()
    print(f"Teacher {name} added successfully.")

def add_student():
    name = input("Enter student's name: ")
    email = input("Enter student's email: ")
    password = input("Enter student's password: ")
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_student = Student(name=name, email=email, password=hashed_password)
    db.session.add(new_student)
    db.session.commit()
    print(f"Student {name} added successfully.")

def add_class():
    name = input("Enter class name: ")
    teacher_id = input("Enter teacher ID for this class: ")
    new_class = Class(name=name, teacher_id=teacher_id)
    db.session.add(new_class)
    db.session.commit()
    print(f"Class {name} added successfully.")

def enroll_student_in_class():
    student_id = input("Enter student ID: ")
    class_id = input("Enter class ID: ")
    new_enrollment = StudentClass(student_id=student_id, class_id=class_id)
    db.session.add(new_enrollment)
    db.session.commit()
    print(f"Student {student_id} enrolled in class {class_id} successfully.")

def main():
    with app.app_context():
        while True:
            print("\n1. Add Teacher")
            print("2. Add Student")
            print("3. Add Class")
            print("4. Enroll Student in Class")
            print("5. Exit")
            choice = input("Enter your choice: ")

            if choice == '1':
                add_teacher()
            elif choice == '2':
                add_student()
            elif choice == '3':
                add_class()
            elif choice == '4':
                enroll_student_in_class()
            elif choice == '5':
                break
            else:
                print("Invalid choice. Please try again.")

if __name__ == '__main__':
    main()