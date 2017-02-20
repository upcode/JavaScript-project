$('document').ready(function() {
    var inputs = {};
    console.log(inputs)
    $.get("https://gist.githubusercontent.com/benshine/392d95f7cb0f8e299599/raw/e20cf9b7e59b7090c856c88b74c5b4084298edd7/eduists.json", inputs, parseData);

    function parseData(data) {
        console.log("preparse data", data);

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
            console.log("SUMMARY: ", summary);
            console.log("NAME: ", name);

        }

        birthArray.sort();
        console.log("Birth Array: ", birthArray);
        console.log("Birth Array Sorted: ", birthArray[0]);
        minYear = birthArray[0]; // sorted the array from smallest to greatest gives MIN
        windowWidth = $(window).width(); // window width
        maxYear = (new Date()).getFullYear(); // current year = MAX
        pixelYear = windowWidth / (maxYear - minYear); // 1 year in pixels = widow width divided by MAX - MIN
        console.log("Pixel Year: ", pixelYear); // 2.7049180327868854
        console.log("Min Year: ", minYear); // 1712
        console.log("Window Width: ", windowWidth); //825
        console.log("Max Year: ", maxYear); //2017


        for (var k = 0; k < data.length; ++k) {
            var currentPerson = data[k];
            var currentPersonBirth = parseInt(currentPerson.birth);
            console.log("currentPersonBirth:", currentPersonBirth);
            var currentPersonDeath = parseInt(currentPerson.death);
            console.log("currentPersonDeath:", currentPersonDeath);
            var name = currentPerson.name;
            var summary = currentPerson.summary;
            if (currentPersonDeath === maxYear);
            //if current person -1 neg == maxYear

            var paddingLeft = (currentPersonBirth - minYear) * (pixelYear);
            console.log("paddingLeft:", paddingLeft);
            var personDivWidth = (currentPersonDeath - currentPersonBirth) * (pixelYear);
            console.log("personDivWidth:", personDivWidth);

            //function call reateDiv()Data


            createDiv(paddingLeft, personDivWidth, name, summary, birth, currentPersonDeath)
        }
    }
    // create fuction pass in prams
    function createDiv(paddingLeft, personDivWidth, name, summary, birth, currentPersonDeath) {
        var div = $("<div></div>");
        $(div).addClass("person");
        $(div).html("<div><h5>" + name + "(" + birth + "-" + "<span>" + currentPersonDeath + "</span>" + ")" + "</h5></div>").appendTo('#container');
        $(div).after('<div class="content hidden"><p>' + summary + '</p></div>').appendTo('#container');

        $(".person span:contains('-1')").html("present");
        $(".person:contains(present)").css({"background": 'radial-gradient(circle, #B7FFCA, #3BBA87)', "border": '2px solid #00442C'});
        $('.content').css({ 'padding-left': paddingLeft, 'padding-right': '300px', 'padding-top': '20px', 'padding-bottom': '10px', 'margin-bottom':'20px','margin-top':'20px', 'width': personDivWidth });

        $(div).css({ 'padding-left': paddingLeft, 'padding-right': '20px', 'padding-top': '20px', 'padding-bottom': '10px', 'margin-bottom':'20px','margin-top':'20px', 'width': personDivWidth });
        $('#container').append(div);


    $('.person').one('click', func);

   function func(e) {
       e.preventDefault();
       $(this).next('div.content').show();
   }

   $('div.content a:contains(close)').click(function(e) {
       e.preventDefault();
       $(this).parent().hide()
           .prev().one('click', func);
           // TODO
           // fix click function to close summary div

   });


// TODO
// style summary div container


// .appendTo('#container');



        //TODO Modal Window
        // var content = $("<div></div>").appendTo(div);
        // $(content).addClass("modalDialog");
        // $('<div/>').html("<div><h5><a href="+"#openModal"+">"+name+"</a><div class="+"modalDialog"+"><div><a href="+"#close"+ title="Close" class="close">X</a><h2>Modal Box</h2><p></p><p>"+summary+"</p></div></div>"+"("+  birth +"--"+ "<span>"+ currentPersonDeath +"</span>"+")" + "</h5></div>");




    }
});
