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

    if not date_str:
        return jsonify({"error": "Date is required"}), 400

    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    attendance_list = data.get('attendance')

    for record in attendance_list:
        existing_record = Attendance.query.filter_by(
            date=date,
            student_id=record['student_id'],
            class_id=class_id
        ).first()

        if existing_record:
            existing_record.status = record['status']
        else:
            new_attendance = Attendance(
                date=date,
                student_id=record['student_id'],
                status=record['status'],
                class_id=class_id
            )
            db.session.add(new_attendance)

    db.session.commit()
    return jsonify({"message": "Attendance marked successfully"}), 200

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

@teacher_bp.route('/teacher/<int:teacher_id>/attendance/<int:class_id>/<date>', methods=['GET'])
def get_class_attendance_by_date(teacher_id, class_id, date):
    attendance_records = Attendance.query.filter_by(class_id=class_id, date=date).all()
    attendance_list = [{"student_id": record.student_id, "status": record.status} for record in attendance_records]
    return jsonify(attendance_list), 200