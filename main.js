song1="";
song2="";

song_1_status="";
song_2_status="";

left_wristX=0;
right_wristX=0;
left_wristY=0;
right_wristY=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload() {
    song1 = loadSound("impossible.mp3");
    song2 = loadSound("LoveIsGone.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function draw() {
    image(video,0,0,600,500);

    song_1_status=song1.isPlaying();
    song_2_status=song2.isPlaying();

    fill("ff0000");
    stroke("ff0000");

    if(scoreleftwrist > 0.2) {
        circle(left_wristX,left_wristY,20);

        song2.stop();

        if(song_1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML="Playing Impossible";
        }
    }

    if(scorerightwrist > 0.2) {
        circle(right_wristX,right_wristY,20);

        song1.stop();

        if(song_2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML="Playing Love Is Gone";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist x is "+left_wristX+" Left Wrist y is "+left_wristY);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;

        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist x is "+right_wristX+" Right Wrist y is "+right_wristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}