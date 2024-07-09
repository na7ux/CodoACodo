from flask import jsonify, request,render_template
from app.models import User




def create_user():
    data = request.json
    new_user = User(
        user_name=data['name'], 
        user_last_name=data['last_name'], 
        email=data['email'], 
        phone=data['phone'],
        user_usuario=data['user'],
        user_password=data['password'],
        image=data['image'])
    new_user.save()
    return jsonify({'message': 'User created successfully'}),201

def get_all_users():
    users = User.get_all()
    return jsonify([users.serialize() for users in users])

def get_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.serialize())

def update_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.json
    user.user_name = data['name']
    user.user_last_name = data['last_name']
    user.email = data['email']
    user.phone = data['phone']
    user.user_usuario = data['user']
    user.user_password = data['password']
    user.image = data['image']
    user.save()
    return jsonify({'message': 'User updated successfully'})

def delete_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    user.delete()
    return jsonify({'message': 'User deleted successfully'})