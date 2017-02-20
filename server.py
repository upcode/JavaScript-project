import os
import sys
from flask import Flask, render_template, jsonify
import json


#-FLASK CONFIGS---------------------------------------------------------------------------#

app = Flask(__name__)

#-ROUTES---------------------------------------------------------------------------#
@app.route("/")
def index():
	return render_template("timeline.html")
# Json was origionally loaded on the backend using python,
# I had a broken pipe error that made thigs difficult. I discovered work-around until I have more time to fix broken pipe issues
# I grabed the github URL link and had Javascript parse the data

@app.route("/input_data.json")
def get_json_data():

	with open('static/data/eduists.json', 'r') as file:
		eduists = json.loads(file.read())
		print "\n\n\n\n TESTING"

		# print "eduists: ", eduists
		return (json.dumps(eduists))

@app.route("/error")
def error():
    raise Exception("Error!")

#-HELPER FUNCTIONS--------------------------------------------------------------------#
if __name__ == "__main__":

    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = "NO_DEBUG" not in os.environ

    app.run(debug=DEBUG, host="0.0.0.0", port=PORT)


