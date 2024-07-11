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
        sql = "INSERT INTO userWebfolio (user_name, user_last_name , email , phone , user_usuario , user_password , image ) VALUE (%s,%s,%s,%s,%s,%s,%s)"
        val = (self.user_name, self.user_last_name, self.email,
               self.phone, self.user_usuario, self.user_password, self.image)
        cursor.execute(sql, val)

        db.commit()
    """  cursor.close() """

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM userWebfolio")
        rows = cursor.fetchall()
        user = [User(user_name=row[1],  user_last_name=row[2],
                     email=row[3], phone=row[4], user_usuario=row[5], image=row[7]) for row in rows]
        cursor.close()
        return user

    def update(self):
        db = get_db()
        cursor = db.cursor()
        sql = "UPDATE userWebfolio SET user_name =%s,user_last_name=%s,email =%s,phone =%s,image =%s WHERE user_usuario =%s"
        val = (self.user_name, self.user_last_name, self.email,
               self.phone, self.image, self.user_usuario)
        cursor.execute(sql, val)
        db.commit()

    @staticmethod
    def get_by_id(user_usuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "SELECT * FROM userWebfolio WHERE user_usuario =%s", (user_usuario,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return User(user_name=row[1],  user_last_name=row[2],
                        email=row[3], phone=row[4], user_usuario=row[5], image=row[7])

        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "DELETE FROM userWebfolio WHERE user_usuario = %s", (self.user_usuario,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'user_name': self.user_name,
            'user_last_name': self.user_last_name,
            'email': self.email,
            'phone': self.phone,
            'user_usuario': self.user_usuario,
            'user_password': self.user_password,
            'image': self.image,
        }
