from flask import Blueprint, jsonify
from models import db, StudentClass, Attendance, Class

student_bp = Blueprint('student', __name__)

@student_bp.route('/student/<int:student_id>/classes', methods=['GET'])
def get_student_classes(student_id):
    classes = StudentClass.query.filter_by(student_id=student_id).all()
    class_list = [{"class_id": sc.class_id, "class_name": Class.query.get(sc.class_id).name} for sc in classes]
    return jsonify(class_list), 200

@student_bp.route('/student/<int:student_id>/attendance/<int:class_id>', methods=['GET'])
def get_student_attendance(student_id, class_id):
    attendance = Attendance.query.filter_by(student_id=student_id, class_id=class_id).all()
    attendance_list = [{"date": a.date, "status": a.status} for a in attendance]
    return jsonify(attendance_list), 200
