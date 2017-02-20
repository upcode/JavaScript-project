![IMAGE ALT TEXT HERE](https://pbs.twimg.com/profile_images/441333137885233152/IAMb5_G2_bigger.png)  **AltSchool Software Engineering**
=

***
# **Dynamic** **Timeline** **Project**

## Synopsis
Constructed a horizontal timeline using Python, Flask and JavaScript. Timeline dynamically renders human lifetimes. Timeline displays each person’s name, date of birth, death along with a summary of each individual.


### Tech Stack
- **Languages:**
    - Python
    - JavaScript
    - jQuery
    - CSS3
    - HTML5
- **Framework:**
    - Flask
- **Operating Systems:**
    - Linux
    - Windows
    - MacOS

## Project Image with screen Video
![Image of Yaktocat](https://github.com/upcode/JavaScript-project/blob/master/static/img/timeline.jpg?raw=true)
![Image of Yaktocat](https://github.com/upcode/JavaScript-project/blob/master/static/img/timeline1.jpg?raw=true)


## Installation
Project includes Python files, JavaScript files and JSON(JavaScript Object Notation) files to add more data.
*From command line make project `directory` and `cd` into that directory*

```shell
$ mkdir timeline
$ cd timeline
```
- To set up server to handle `JSON data`, create a Sandbox
    - Add Python sandbox by creating a virtual environment
```shell
$ virtualenv env  # creates virtual sandbox environment
$ source env/bin/activate  # this activates your environment
(env)$ python  #(env) activates sandbox
```
#### Python Installing Libraries
- Once virtual sandbox is created, install `Flask` a light-weight framework, save environment configuration. It will be used later for deployment to `Heroku`.
#### Flask
```shell
(env)$ pip install flask # creates python framework
```
### Project Folder Structure
---**evn/**
---**static/**
----------**css/** `timeline.css`
----------**js/** `timeline.js`
-----------**data/** `data.json`
---`server.py`
---`README.md`
---`requirements.txt`
---`.gitignore`

*In the shell, type the following to set up project directories and files*
```shell
(env)$ mkdir templates # holds templates for the view layer(HTML)
(env)$ mkdir static, css, js, data # static folder holds css, js and JSON files
(env)$ touch server.py # holds server code to run timeline program
```
#### Flask Save Env Config
- Next, save requirements by pip freeze
- `requirements.txt` make explicit, repeatable installation of packages. This creates a working set of packages that can be installed elsewhere. Requirements files lets person install exact versions, but it won’t tell what all the exact versions are.

*To create a new requirements file from a known working environment, use:*
```shell
(env)$ pip freeze > requirements.txt
```

## Getting Started
Please follow the [installation](#installation) instruction before getting started.
Information below follows python server code that sets up the sever and also takes `JOSN(data)` and converts it to a python data structure which then can be used to create timeline using JavaScript. Execute the following Python code:

## Flask App

#### Python Server File
```python
from flask import Flask, render_template, jsonify
import json
from signal import signal, SIGPIPE, SIG_DFL

app = Flask(__name__)
#-ROUTES---------------------------------------------------------------------------#
@app.route("/")
def index():
    return render_template("timeline.html")

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

```
#### Run Timeline App
*In terminal enter:*
```shell
(env)$ python server.py
Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

#### JavaScript Code
* Creating a dynamic timeline using JSON data that is stored on the server and rendered to client.
* The JavaScript code below takes the JSON data that is stored on the backend and converts it to Python data structure.
* To calculate each person’s div that represents their lifeline requires a few calculations before each person can be added to the timeline.
* **Three formulas:**
    *  How many pixels to equal 1 year
    * Padding Left to for each individual person
    * Div width

* **1 year in Pixels Formula**
    ```shell
    1yr in pixels / (maximum birth year - minimum birth year)
    ```
**The first for-loop**
* The first for-loop iterates though the `JSON data object` and grabs each person's ***name***, ***birth***, ***death***, and ***summary***.
* Once the loop iterates through the data object, the loop appends every person’s birth year to an empty Array called `birthArray` that is declared above the `for-loop`.
* The array sorts from Min to Max.  To access the min birth year can be accesses by grabbing min birth year at `[0]` index.
* Next find the size of the window size by the following code:
    ```shell
    windowWidth = $(window).width(); // size of browser
    ```
* To get maxium year use JavaScript date object function
    ```shell
    (new Date()).getFullYear(); // Current year 2017
    ```
* That is everything needed to make the first, calculation which will return 1 year in pixels

#### Left Padding and Div Width
* The second `for-loop` calculates left padding.  `padding left` tells where to place each individual div based on their birth.
* Calculates each person's individual `div width` based on person life-line by obtaining birth year and death

**The Second for-loop**
* The second for-loop calculates left padding to be added to each individual’s div.
* The for-loop through the `JOSN data` again and grabs each person’s death year, which is then used to determine each person’s left padding.
    ```shell
    Padding-Left = (Person Birth Year - Min Birth Year) * (Year in Pixels);

    ```
* Next to calculate width of each person’s div is calculated by the following formula:
    ```shell
    Div Width = (Person Death Year - Person Birth Year) * (Year in Pixels);
    ```
#### Adding each person to the timeline
* CreateDiv function creates new div for each person by passing in the above for-loop variables as parameters. Using jQuery each person’s div element is appended to the DOM where the timeline div.

#### JavaScript timeline.js
```javascript
$('document').ready(function() {
    var inputs = {};
    $.get('/input_data.json', inputs, parseData);

    function parseData(data) {
        // console.log("preparse data" , data);

        data = JSON.parse(data);
        // for loop
        var birthArray = [];
        console.log("Birth Array:", birthArray);

        var minYear, windowWidth, maxYear, pixelYear, name, summary, birth, death;
        for (var i = 0; i < data.length; ++i) {
            // person is an Object
            var person = data[i];
            var birth = parseInt(person.birth);
            var death = parseInt(person.death);
            var name = person.name;
            var summary = person.summary;
            birthArray.push(birth);
     }

        birthArray.sort();
        console.log("Birth Array: ", birthArray);
        console.log("Birth Array Sorted: ", birthArray[0]);
        minYear = birthArray[0]; // sorted the array from smallest to greatest gives MIN
        windowWidth = $(window).width();
        maxYear = (new Date()).getFullYear();
        pixelYear = windowWidth / (maxYear - minYear);
        console.log("Pixel Year: ", pixelYear);
        console.log("Min Year: ", minYear);
        console.log("Window Width: ", windowWidth);
        console.log("Max Year: ", maxYear);

        for (var k = 0; k < data.length; ++k) {
            var currentPerson = data[k];
            var currentPersonBirth = parseInt(currentPerson.birth);
            console.log("currentPersonBirth:", currentPersonBirth);
            var currentPersonDeath = parseInt(currentPerson.death);
            console.log("currentPersonDeath:", currentPersonDeath);
            var name = currentPerson.name;
            var sumamry = currentPerson.summary;
            if (currentPerson === maxYear);

            var paddingLeft = (currentPersonBirth - minYear) * (pixelYear);
            console.log("paddingLeft:", paddingLeft);
            var personDivWidth = (currentPersonDeath - currentPersonBirth) * (pixelYear);
            console.log("personDivWidth:", personDivWidth);

            //function call createDiv()
            createDiv(paddingLeft, personDivWidth,name, summary, birth, currentPersonDeath)
        }
    }
    // create fuction pass in prams
    function createDiv(paddingLeft, personDivWidth, name, summary, birth, currentPersonDeath) {
        var $newDiv = $("<div/>")   // creates a div element
            .addClass("person")   // add a class
            .html("<div class=\"content\"><h5>"+ name+"("+  birth +"--"+ "<span>"+ currentPersonDeath +"</span>"+")" + "</h5><div class=\"pop-up\"><p>"+summary+"</p></div></div>");
            $(".person span:contains('-1')").html("present");

        $($newDiv).css({'padding-left':paddingLeft, 'padding-right':'150px', 'padding-top':'5px', 'padding-bottom':'30px', 'width':personDivWidth});
        $('#container').append($newDiv);

    }
});

```

## Documentation & Support
For more information, please visit:
**Flask:** [http://flask.pocoo.org/](http://flask.pocoo.org/)
**jQuery:** [https://jquery.com/](https://jquery.com//)
**Heroku:** [https://www.heroku.com/](https://www.heroku.com/)

## License

This is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

***
U.P.⇡[code] [http://umapetersen.com](http://umapetersen.com/ "Title")




