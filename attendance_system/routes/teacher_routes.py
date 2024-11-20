from flask import Blueprint, request, jsonify
from models import db, Attendance, Class, StudentClass, Student
from datetime import datetime

teacher_bp = Blueprint('teacher', __name__)

@teacher_bp.route('/teacher/<int:teacher_id>/classes', methods=['GET'])
def get_teacher_classes(teacher_id):
    classes = Class.query.filter_by(teacher_id=teacher_id).all()
    class_list = [{"class_id": c.id, "class_name": c.name} for c in classes]
    return jsonify(class_list), 200

@teacher_bp.route('/teacher/<int:teacher_id>/attendance/<int:class_id>', methods=['POST'])
def mark_attendance(teacher_id, class_id):
    data = request.json
    date_str = data.get('date')
    date = datetime.strptime(date_str, '%Y-%m-%d').date()  # Convert string to date object
    attendance_list = data.get('attendance')  # [{ "student_id": 1, "status": "Present" }, ...]

    for record in attendance_list:
        new_attendance = Attendance(date=date, student_id=record['student_id'], status=record['status'], class_id=class_id)
        db.session.add(new_attendance)

    db.session.commit()
    return jsonify({"message": "Attendance marked successfully"}), 201

@teacher_bp.route('/teacher/<int:teacher_id>/students/<int:class_id>', methods=['GET'])
def get_students_in_class(teacher_id, class_id):
    students = StudentClass.query.filter_by(class_id=class_id).all()
    student_list = [{"student_id": sc.student_id, "student_name": Student.query.get(sc.student_id).name} for sc in students]
    return jsonify(student_list), 200

@teacher_bp.route('/teacher/<int:teacher_id>/attendance/<int:class_id>', methods=['GET'])
def get_class_attendance(teacher_id, class_id):
    attendance = Attendance.query.filter_by(class_id=class_id).all()
    attendance_list = [{"date": a.date, "student_id": a.student_id, "status": a.status} for a in attendance]
    return jsonify(attendance_list), 200
