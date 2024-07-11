from flask import jsonify, request, render_template
from app.models import User


def create_user():
    data = request.json
    new_user = User(
        user_name=data['user_name'],
        user_last_name=data['user_last_name'],
        email=data['email'],
        phone=data['phone'],
        user_usuario=data['user_usuario'],
        user_password=data['user_password'],
        image=data['image'])

    new_user.save()
    return jsonify({'message': 'Victoria'}), 201


def update_user(user_usuario):
    user = User.get_by_id(user_usuario)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.json
    user.user_name = data.get('user_name', user.user_name)
    user.user_last_name = data.get('user_last_name', user.user_last_name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.image = data.get('image', user.image)

    user.update()
    return jsonify({'message': 'User updated successfully'})


def get_user(user_usuario):
    user = User.get_by_id(user_usuario)

    if not user:
        return jsonify({'message': 'User not found'})
    return jsonify(user.serialize())


def get_all_users():
    users = User.get_all()
    return jsonify([users.serialize() for users in users])


def delete_user(user_usuario):
    user = User.get_by_id(user_usuario)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.delete()
    return jsonify({'message': 'User deleted successfully'})
