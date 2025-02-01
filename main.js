x = 0;
y = 0;

draw_apple = "";
draw_circle = "";
draw_rectangle = "";
content = null;
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

screen_height = 0;
screen_width = 0;

Apple = "apple.png";

// Set up canvas and image loading
function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.center();
  console.log("Canvas created and loaded.");
  background(220);
}

function preload() {
  apple = loadImage("apple.png");
  round = loadImage("circle.png");
  rect = loadImage("rectangle.png");

  if (apple && round && rect) {
    console.log("All images have been loaded");
  }

  if (document.getElementById("p5_loading")) {
    console.error("Canvas might not load!!");
  }
}

// Start listening to speech input
function start() {
  document.getElementById("status").innerHTML = "System is listening, please speak";
  recognition.start();
}

recognition.onresult = function (event) {
  content = event.results[0][0].transcript.toLowerCase();

  console.log("Received:", content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  // Check what the user said and set flags accordingly
  if (content === "circle") {
    draw_circle = "set";
    draw_apple = draw_rectangle = ""; // Reset the other drawing states
    draw(); // Draw circle
  } else if (content === "rectangle") {
    draw_rectangle = "set";
    draw_apple = draw_circle = ""; // Reset the other drawing states
    draw(); // Draw rectangle
  } else if (content === "apple") {
    draw_apple = "set";
    draw_circle = draw_rectangle = ""; // Reset the other drawing states
    draw(); // Draw apple
  } else {
    // Handle drawing numbers
    to_number = parseInt(content);
    if (isNaN(to_number)) {
      to_number = 1; // Default to 1 if it's not a number
    }
    console.log("Number of shapes to draw:", to_number);
  }

  // Do not immediately restart the recognition here — let it process naturally
};

// Draw based on the state
function draw() {
  let Rng;
  x = 0;
  y = 0;

  if (draw_apple === "set") {
    for (let i = 0; i < to_number; i++) {
      Rng = Math.floor(Math.random() * 7);
      x = Rng * 700;
      y = Math.floor(Math.random() * 4) * 400;
      image(apple, x, y, 50, 50);
      speak_data = "Drawn an apple";
      speak();
    }
    draw_apple = ""; // Reset state
  } else if (draw_circle === "set") {
    for (let i = 0; i < to_number; i++) {
      Rng = Math.floor(Math.random() * 7);
      x = Rng * 700;
      y = Math.floor(Math.random() * 4) * 400;
      ellipse(x, y, 50, 50);
      speak_data = "Drawn a circle";
      speak();
    }
    draw_circle = ""; // Reset state
  } else if (draw_rectangle === "set") {
    for (let i = 0; i < to_number; i++) {
      Rng = Math.floor(Math.random() * 7);
      x = Rng * 700;
      y = Math.floor(Math.random() * 4);
      rect(x, y, 55, 40);
      speak_data = "Drawn a rectangle";
      speak();
    }
    draw_rectangle = ""; // Reset state
  }
}

// Speak feedback to the user
function speak() {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  console.log("Speaking:", speak_data);
  synth.speak(utterThis);
  speak_data = "";
}


