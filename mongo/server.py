from flask import Flask, Response, request
import json
from flask_cors import CORS
import pymongo
from bson import json_util
from bson.objectid import ObjectId
# import numpy as np
# import datetime as dt
# from datetime import date, datetime

app = Flask(__name__)

try:
    cluster = pymongo.MongoClient("mongodb+srv://robocare:stage2022@cluster0.opiw24i.mongodb.net/?retryWrites=true&w=majority")
    db = cluster["company"]
    collection = db["records"]
    cluster.server_info() #trigger exception if not connected to db
    print(" Connected to DB ")
except:
    print(" ERROR - Cannot connect to db")


# app = Flask(__name__)
# try:
#     app.config['MONGO_URI']="mongodb+srv://robocare:stage2022@cluster0.opiw24i.mongodb.net/?retryWrites=true&w=majority"
#     print(" Connected to DB ")
# except:
#     print(" ERROR - Cannot connect to db")

# cluster = PyMongo(app)
# db = cluster.db
# collection = db.records

# try:
#     mongo = pymongo.MongoClient("mongodb+srv://robocare:<stage2022>@cluster0.opiw24i.mongodb.net/?retryWrites=true&w=majority")
#     db = mongo["company"]
#     collection = db["records"]
#     # mongo.server_info() #trigger exception if not connected to db
#     print(" Connected to DB 2 ")
# except:
#     print(" ERROR - Cannot connect to db")

CORS(app)
##########################
@app.route("/company/records", methods=["GET"])
def get_some_records():
    try:
        data = list(collection.find({}))
        for record in data:
            record["_id"] = str(record["_id"])
            # print((np.array(record["Poids"]).astype(float)).tolist())
            # record["Poids"] = list((np.array(record["Poids"]).astype(float)).tolist())
            # print(type((np.array(record["Poids"]).astype(float)).tolist()[0]))

            # print("sum = ", math.fsum(record["Poids"]))
            # print("mean = ", math.fsum(record["Poids"])/len(record["Poids"]))

            # print(type(record["Poids"]))
            # print(type(record["Poids"][0]))
            
            record["properties"]["Poids"] = ' ; '.join(str(p) for p in (record["properties"]["Poids"]))
            record["properties"]["Debit"] = ' ; '.join(str(p) for p in (record["properties"]["Debit"]))
            record["geometry"]["coordinates"] = ' ; '.join(str(p) for p in (record["geometry"]["coordinates"]))

            # print((record["Date"]))
            # print(type(record["Date"]))
            # print(type(record["Date"][0]))

        return Response(
            response= json.dumps(data, default=json_util.default),
            status= 200,
            mimetype= "application/json",
        )
        
    except Exception as ex:
        print(ex)
        return Response(
            response= json.dumps({"message":"CANNOT READ RECORDS"}),
            status= 500,
            mimetype= "application/json"
        )


##########################
# @app.route("/company/records", methods=["POST"]) 
# def create_record():
#     try:
#         # record = {
#         #     "Poids":list(np.array(request.form["properties"]["Poids"].split(',')).astype(float)), 
#         #     "Debit":list(np.array(request.form["properties"]["Debit"].split(',')).astype(float)),
#         #     "Coordinates":list(np.array(request.form["geometry"]["Coordinates"].split(','))),
#         #     "Date_created":request.form["properties"]["Date_created"],
#         #     "Date":list(np.array(request.form["properties"]["Date"].split(',')).astype(date))
#         # }
#         #request.form["Date"] = [dt.datetime.strptime(date, '"%Y-%m-%d"').date() for date in request.form["Date"]]
#         dbResponse = collection.insert_one(record)
#         print(dbResponse.inserted_id)
#         return Response(
#             response= json.dumps(
#                 {"message":"record created", 
#                 "id":f"{dbResponse.inserted_id}"
#                 }),
#             status= 200,
#             mimetype= "application/json"
#         )
        
#     except Exception as ex:
#       print(ex)

##########################
@app.route("/company/records/<id>", methods=["DELETE"]) 
def delete_record(id):
    try :
        dbResponse = collection.delete_one({"_id": ObjectId(id)})
        if dbResponse.deleted_count == 1 : 
         return Response(
            response= json.dumps(
            {"message": "Record deleted" , "id" : f"{id}"}), 
            status= 200,
            mimetype= "application/json"
        )
        return Response(
            response= json.dumps(
            {"message":" Record not found" , "id" : f"{id}"}), 
            status= 200,
            mimetype= "application/json"
        ) 
    except Exception as ex:
        return Response(
            response=json.dumps({"message" : "CANNOT DELETE RECORD"}),
            status = 500,
            mimetype = "application/json"
            )  
        
##########################        
@app.route("/company/records", methods=["DELETE"])  
def delete_all():
    try:
        dbResponse = collection.delete_many({})
        if dbResponse.deleted_count == 1 : 
         return Response(
            response= json.dumps(
            {"message": "Records deleted"}), 
            status= 200,
            mimetype= "application/json"
            )
        return Response(
            response= json.dumps(
            {"message":" Records cannot be deleted"}), 
            status= 200,
            mimetype= "application/json"
        ) 
     
    except Exception as ex:
        return Response(
            response=json.dumps({"message" : "CANNOT DELETE RECORDS"}),
            status = 500,
            mimetype = "application/json"
            )

##########################
import json

# Opening JSON file
f = open("data.geojson")

data = json.load(f)

collection.insert_one(data)

# Get data
# keys = list(data["properties"].keys())
# values = list(data["properties"].values())

# print(keys)
# print(values)

##########################
if __name__ == "__main__":
    app.run(port = 80, debug = True)