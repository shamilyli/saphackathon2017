from flask import Flask
from flask.ext.pymongo import PyMongo
from flask import Flask, request, render_template
from pymongo import MongoClient
from flask import request

app = Flask(__name__)
mongo = PyMongo(app)
client = MongoClient('localhost', 27017)
db = client.local

# @app.route('/')
# def home_page():
#     online_users = mongo.db.users.find({'online': True})
#     return render_template('index.html',
#         online_users=online_users)


@app.route('/')
def hello_world():
    #return 'Hello, World
    return render_template('index.html', name="index")

# eg: http://localhost:5000/status?udid=d1
@app.route('/status')
def hello():
	udid = request.args.get('udid')
	result = db.status.find_one({"deviceId" : udid})
	status = result['status']
	return status

# # eg: http://localhost:5000/post/10
# @app.route('/update/<int:post_id>')
# def show_post(post_id):
#     # show the post with the given id, the id is an integer
#     return '0 is closed, 1 is open. \nNow updated as %d' % post_id


# eg: http://localhost:5000/update?udid=d1&status=closed
@app.route('/update', methods=['GET', 'POST'])
def update():
	udid = request.args.get('udid')
	status = request.args.get('status')
	db.status.update({"deviceId" : udid}, {'$set': {"status" : status}})
	print 'udid: ' + str(udid)
	print 'status' + str(status)


	return 'update succeeded'

