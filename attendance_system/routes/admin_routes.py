from flask import Blueprint, request, jsonify
from models import db, Admin, Teacher, Student, Class, StudentClass
from flask_bcrypt import Bcrypt

admin_bp = Blueprint('admin', __name__)
bcrypt = Bcrypt()

@admin_bp.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    admin = Admin.query.filter_by(username=username).first()
    if admin and bcrypt.check_password_hash(admin.password, password):
        return jsonify({"message": "Login successful", "role": "admin", "user_id": admin.id}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@admin_bp.route('/admin/teachers', methods=['GET'])
def get_teachers():
    teachers = Teacher.query.all()
    teacher_list = [{"id": teacher.id, "name": teacher.name} for teacher in teachers]
    return jsonify(teacher_list), 200

@admin_bp.route('/admin/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    student_list = [{"id": student.id, "name": student.name} for student in students]
    return jsonify(student_list), 200

@admin_bp.route('/admin/add_teacher', methods=['POST'])
def add_teacher():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not all([name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400
    existing_teacher = Teacher.query.filter_by(email=email).first()
    if existing_teacher:
        return jsonify({"error": "Teacher with this email already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_teacher = Teacher(name=name, email=email, password=hashed_password)
    db.session.add(new_teacher)
    db.session.commit()
    return jsonify({"message": f"Teacher {name} added successfully"}), 200

@admin_bp.route('/admin/add_student', methods=['POST'])
def add_student():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not all([name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400
    existing_student = Student.query.filter_by(email=email).first()
    if existing_student:
        return jsonify({"error": "Student with this email already exists"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_student = Student(name=name, email=email, password=hashed_password)
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": f"Student {name} added successfully"}), 200

@admin_bp.route('/admin/add_class', methods=['POST'])
def add_class():
    data = request.json
    name = data.get('name')
    teacher_id = data.get('teacher_id')
    if not all([name, teacher_id]):
        return jsonify({"error": "Missing required fields"}), 400
    existing_class = Class.query.filter_by(name=name, teacher_id=teacher_id).first()
    if existing_class:
        return jsonify({"error": "Class with this name and teacher already exists"}), 400
    new_class = Class(name=name, teacher_id=teacher_id)
    db.session.add(new_class)
    db.session.commit()
    return jsonify({"message": f"Class {name} added successfully"}), 200

@admin_bp.route('/admin/enroll_student', methods=['POST'])
def enroll_student():
    data = request.json
    student_id = data.get('student_id')
    class_id = data.get('class_id')
    if not all([student_id, class_id]):
        return jsonify({"error": "Missing required fields"}), 400
    existing_enrollment = StudentClass.query.filter_by(student_id=student_id, class_id=class_id).first()
    if existing_enrollment:
        return jsonify({"error": "Student is already enrolled in this class"}), 400
    new_enrollment = StudentClass(student_id=student_id, class_id=class_id)
    db.session.add(new_enrollment)
    db.session.commit()
    return jsonify({"message": f"Student {student_id} enrolled in class {class_id} successfully"}), 200

@admin_bp.route('/admin/classes', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    class_list = [{"id": cls.id, "name": cls.name} for cls in classes]
    return jsonify(class_list), 200