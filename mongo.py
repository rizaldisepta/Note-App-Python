from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId


app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'Noteapp'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/Noteapp'

mongo = PyMongo(app)
CORS(app)

@app.route('/api/notes', methods=['GET'])
def get_all_notes():
    notes = mongo.db.notes
    result = []
    for field in notes.find():
        result.append({'_id' : str(field['_id']), 'title': field['title']})
    return jsonify(result)   

@app.route('/api/note', methods=['POST'])
def add_note():
    notes = mongo.db.notes
    title = request.get_json()['title']
    note_id = notes.insert({'title': title})
    new_note = notes.find_one({'_id': note_id})

    result = {'title': new_note['title']}
    return jsonify({'result': result})

@app.route('/api/note/<id>', methods=['PUT'])
def update_note(id):
    notes = mongo.db.notes
    title = request.get_json()['title']

    notes.find_one_and_update({'_id': ObjectId(id)}, {'$set': {'title': title}}, upsert=False)
    new_note = notes.find_one({'_id': ObjectId(id)})

    result = {'title': new_note['title']}
    return jsonify({'result': result})

@app.route('/api/note/<id>', methods=['DELETE'])
def delete_note(id):
    notes = mongo.db.notes

    response = notes.delete_one({'_id': ObjectId(id)})

    result = {'message': 'note deleted'}
   
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)