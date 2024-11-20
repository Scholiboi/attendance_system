from flask import Blueprint, request, jsonify
from models import db, Teacher, Student
from flask_bcrypt import Bcrypt

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Check if user is a teacher
    user = Teacher.query.filter_by(email=email).first()
    role = 'teacher'
    
    if not user:
        # Check if user is a student
        user = Student.query.filter_by(email=email).first()
        role = 'student'

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Login successful", "role": role, "user_id": user.id}), 200

    return jsonify({"message": "Invalid credentials"}), 401
