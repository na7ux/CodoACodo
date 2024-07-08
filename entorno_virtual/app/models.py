from app.database import get_db

class User:

    def __init__(self, user_name=None, user_last_name=None, email=None, phone=None, user_usuario=None, user_password=None, image=None):
        self.user_name = user_name
        self.user_last_name = user_last_name
        self.email = email
        self.phone = phone
        self.user_usuario = user_usuario
        self.user_password = user_password
        self.image = image
        
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.user:
            cursor.execute("""
                UPDATE webfolio SET user_name = %s, user_last_name = %s, email = %s, phone = %s, user_usuario = %s, user_password = %s, image = %s
                WHERE user = %s
            """, (self.user_name, self.user_last_name, self.email, self.phone, self.user_usuario, self.id_movie, self.user_password,  self.image))
        else:
            cursor.execute("""
                INSERT INTO webfolio (user_name, user_last_name, email, phone, user_usuario, user_password, image) VALUES (%s, %s, %s, %s)
            """, (self.user_name, self.user_last_name, self.email, self.phone, self.user_usuario, self.user_password,  self.image))
            self.id_movie = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM webfolio")
        rows = cursor.fetchall()
        user = [User(user_usuario=row[0], user_name=row[1], user_last_name=row[2], email=row[3], phone=row[4], , image=row[5]) for row in rows]
        cursor.close()
        return user

    @staticmethod
    def get_by_id(user_usuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Webfolio WHERE user_usuario = %s", (user_usuario))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return User(id_userWebfolio=row[0], user_name=row[1], user_last_name=row[2], email=row[3], phone=row[4], user_usuario=row[5], user_password=row[6], image=row[7])
        
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM webfolio WHERE iser_usuario = %s", (self.user_usuario))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'user_name': self.user_name, 
            'user_last_name':self.user_last_name, 
            'email':self.email,
            'phone':self.phone,  
            'user_usuario':self.user_usuario,
            'user_password':self.user_password, 
            'image':self.image,
        }