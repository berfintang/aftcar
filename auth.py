from flask import session
from flask import Response
import hashlib
import json
from flask import abort
from flask import request
from account.db_action import db_action
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token


def login():
	global cursor
	if request.headers.get("Content-Type") != "application/json":
		abort(403)
	
	uname = request.json["userName"]
	pwd = request.json["password"]
	entry = db_action("users.db","SELECT * FROM users WHERE username=? OR email=?",(uname,uname))
	print("here")
	if len(entry) <= 0:
		abort(404)
	user = entry[0]
	if user[3] == hashlib.md5(str(pwd).encode()).hexdigest():
		token = create_access_token(identity=user[0],additional_claims={"name":user[1]})
		return Response(json.dumps({"message":"Login successful","token":token}), status=200)
	abort(404)

def signup():
	if request.headers.get("Content-Type") != "application/json":
		abort(403)
	values = (request.json["userName"],request.json["email"],hashlib.md5(str(request.json["password"]).encode()).hexdigest())
	db_action("users.db","INSERT INTO users (username,email,password) VALUES(?,?,?)",values)
	user_list = db_action("users.db","SELECT * FROM users WHERE username = ? AND email = ? AND password = ?",values)
	if len(user_list) <= 0:
		abort(500)
	user = user_list[0]
	token = create_access_token(identity=user[0],additional_claims={"name":user[1]})
	return Response(json.dumps({"message": "A user created successfully","token":token}), status=201,mimetype='application/json')
