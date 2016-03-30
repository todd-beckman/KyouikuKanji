var HERE = window.location.href;
if (HERE.indexOf("index.html") != -1) {
    HERE = HERE.substring(0, HERE.length - 10);
}

function loadFile(path, callback, grade) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText, grade);
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}

var ERROR = "<div class=\"row\">" + 
"    <div class=\"col-sm-12\">" +
"        Error: &" +
"    </div>" +
"</div>";

function reportError(grade, error) {
    document.getElementById("grade" + grade).innerHTML = ERROR.replace("&", error);
}

var WIDTHS = [1, 1, 1, 3, 3, 3];
var HEADER = "<div class=\"row\">" +
"    <div class=\"col-sm-12\">Grade &</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[0] + "\">ID</div>" +
"    <div class=\"col-sm-" + WIDTHS[1] + "\">Kanji</div>" +
"    <div class=\"col-sm-" + WIDTHS[2] + "\">Strokes</div>" +
"    <div class=\"col-sm-" + WIDTHS[3] + "\">English</div>" +
"    <div class=\"col-sm-" + WIDTHS[4] + "\">On</div>" +
"    <div class=\"col-sm-" + WIDTHS[5] + "\">Kun</div>" +
"</div>";



function setGradeHeader(grade) {
    document.getElementById("grade" + grade).innerHTML = HEADER.replace("&", grade);
}

function setGradeContent(csv, grade) {
    var lines = csv.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(",");
        if (line.length != 6) {
            reportError("Line " + i + " of grade " + grade + " not properly formatted.");
        }
document.getElementById("grade" + grade).innerHTML += "<div class=\"row\">" +
"   <div class=\"col-sm-" + WIDTHS[0] + "\">" + line[0] + "</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[1] + "\">" + line[1] + "</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[2] + "\">" + line[2] + "</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[3] + "\">" + line[3] + "</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[4] + "\">" + line[4] + "</div>" +
"</div>" +
"<div class=\"row\">" +
"    <div class=\"col-sm-" + WIDTHS[5] + "\">" + line[5] + "</div>" +
"</div>";

    }
}

for (var i = 1; i < 7; i++) {//OBOE
    setGradeHeader(i);
    loadFile(HERE + "/grades/" + i + ".csv", setGradeContent, i);
}