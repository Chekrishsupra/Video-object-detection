status = "";
video= "";
objects = [];
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480,340);
    canvas.center();
}

function draw() {
    image(video,0,0,480,340);
    if(status != "") {
        objectDetector.detect(video,gotresult);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects detected!";
            document.getElementById("number_objects").innerHTML = "Number of objects detected:" + objects.length;
            fill("#ae0bdb");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ae0bdb");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1); 
}

function gotresult(error,results) {
    if(error) {
        console.log(error)
    }
    else {
        console.log(results);
        objects = results;
    }
}