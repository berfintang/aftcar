from flask import Flask
from flask_jwt_extended import JWTManager
from cars import cars
from account import auth
from account import favorites
from account.db_action import init_db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)
app.config.from_object(__name__)


app.add_url_rule("/cars","cars",cars.get_cars)
app.add_url_rule("/auth/login","login", auth.login, methods=["POST"])
app.add_url_rule("/auth/signup","signup", auth.signup, methods=["POST"])
app.add_url_rule("/auth/favorites","favorite", favorites.handle_request, methods=["POST","GET", "DELETE"])

if __name__ == "__main__":
	init_db()
	app.run()