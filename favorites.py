from flask import request
from flask import Response
from account.db_action import db_action
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json
import functools

def add_favorite(user_id, plate):
	db_action("users.db","INSERT INTO favorites(user_id,plate) VALUES(?,?)",(user_id,plate,))
	return Response({"message":"An item added to favorites"},status=201,mimetype="application/json")

def remove_favorite(user_id, plate):
	db_action("users.db","DELETE FROM favorites WHERE user_id = ? AND plate = ?",(user_id,plate,))
	return Response({"message":"An item removed from favorites"},status=200,mimetype="application/json")

def get_favorites(user_id):
	lst = db_action("users.db","SELECT plate FROM favorites WHERE user_id = ?", (user_id,))
	
	result = [x[0] for x in lst]
	print(result)
	if (len(lst) > 0):
		return Response(json.dumps(result),mimetype="application/json")
	return Response(json.dumps({"message":"No content found"}),status=404,mimetype="application/json")

@jwt_required()
def handle_request():
	user_id = get_jwt_identity()
	print(user_id)
	if request.method == "POST":
		return add_favorite(user_id,request.get_json()["plate"])
	if request.method == "DELETE":
		return remove_favorite(user_id,request.get_json()["plate"])
	if request.method == "GET":
		return get_favorites(user_id)