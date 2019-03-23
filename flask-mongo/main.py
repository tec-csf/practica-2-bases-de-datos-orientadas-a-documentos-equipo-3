from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from pymongo import MongoClient
from bson.json_util import dumps


app = FlaskAPI(__name__)

@app.route("/", methods=['GET'])
def hello():
    return "Hello World!"


@app.route("/liga", methods=['GET'])
def liga():
    mongo_uri = "mongodb://mongo-router:27017"

    client = MongoClient(mongo_uri)
    db = client.practica
    collection = db.liga

    pipeline = [
        {"$unwind":"$products"},
        {"$sortByCount":"$products.product"},
        {"$limit":5}
    ]

    cursor = collection.aggregate(pipeline)

    return jsonify(dumps(cursor))

@app.route("/club", methods=['GET'])
def club():
    mongo_uri = "mongodb://mongo-router:27017"

    client = MongoClient(mongo_uri)
    db = client.practica
    collection = db.club

    pipeline = [
        {"$match":{"name":{"$regex":"^A"}}},
        {"$project":{"_id":0,"name":1,"credit":1}},
        {"$sort": {"credit":-1}},
        {"$limit":5}
    ]

    cursor = collection.aggregate(pipeline)

    return jsonify(dumps(cursor))

@app.route("/jugador", methods=['GET'])
def jugador():
     return "Hello World!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)