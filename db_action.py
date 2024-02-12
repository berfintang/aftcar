import sqlite3


def init_db():
	connection = sqlite3.connect("users.db")
	cursor = connection.cursor()
	cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)")
	cursor.execute("CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, plate TEXT, FOREIGN KEY(user_id) REFERENCES users(id))")
	connection.commit()
	connection.close()

def db_action(db, statement ,values ) -> list:
    connection = sqlite3.connect(db)
    cursor = connection.cursor()
    result = cursor.execute(statement,values).fetchall()
    connection.commit()
    connection.close()
    return result
