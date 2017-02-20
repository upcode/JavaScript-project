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

#-HELPER FUNCTIONS--------------------------------------------------------------------#
if __name__ == "__main__":

    app.run()
# debug = True



