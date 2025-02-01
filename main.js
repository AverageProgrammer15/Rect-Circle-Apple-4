x = 0;
y = 0;

draw_apple = "";
draw_circle = "";
draw_rectangle = "";
content = null
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();


screen_height = 0;
screen_width = 0;



Apple = "apple.png"


function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.center()
  console.log("Canvas created and loaded.");
  background(220);



};

function preload(){
  apple = loadImage("apple.png");
  round = loadImage("circle.png");
  rect = loadImage("rectangle.png");

  if (apple && round && rect){
    console.log("All images have been loaded")
  }

  if (document.getElementById("p5_loading")){
    console.error("Canvas might not load!!")
  }
}



function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  

 content = event.results[0][0].transcript.toLowerCase();

 console.log("Recieved:", content)

 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

 if (content == "circle"){
  draw_circle = "set";
  console.log("Set circle");
  draw();
  console.log("Script should be running: circle")
 } else if (content == "rectangle"){
  draw_rectangle = "set";
  console.log("Set rectangle")
  draw();
  console.log("Script should be running: Rectangle")
  
 } else if (content == "apple"){
  draw_apple = "set";
  console.log("Set apple")
  draw();
  console.log("Script should be running: apple")
 }

 
 to_number = Number(content)

 
}



function draw(){
  Rng = Math.floor(Math.random());
  x = 0;
  y = 0;
  if(draw_apple == "set")
  {
    for (i=0; i<=to_number;i++){
      Rng = Math.floor(Math.random());
      x = Rng * 700
      y = Rng * 400
      
      image(apple, x, y, 50,50)
      speak_data = "Drawn an apple"

      
      
      speak()
    }
    draw_apple = "";
  } else if(draw_circle == "set"){
    for (i=0; i<=to_number;i++){
      Rng = Math.floor(Math.random());
      x = Rng * 700
      y = Rng * 400
      
      circle(x, y, 25)
      speak_data = "Drawn a circle"
      speak()
    }
    draw_circle = "";
    
  }else if(draw_rectangle == "set"){
    for (i=0; i<=to_number;i++){
      Rng = Math.floor(Math.random());
      x = Rng * 700
      y = Rng * 400
      
      rect(x,y,55,40)
      speak_data = "Drawn a rectangle"

      
      speak()
    }
    draw_rectangle = "";
  }
} 

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    console.log("Speaking:", speak_data);
    synth.speak(utterThis);
    speak_data = "";
}