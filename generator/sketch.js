let seascape;

function setup() {
  createCanvas(450, 450);
  createButton("+").mousePressed(generateSeascape);
}

function generateSeascape() {
  const z = [];
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
  }
  const path = "http://localhost:8000/query";
  const data = {
    z: z,
    truncation: 0.8
  };
  httpPost(path, "json", data, gotImage, gotError);
}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  seascape = createImg(result.image);
  seascape.hide();
}

function draw() {
  background(220);
  if (seascape) {
    image(seascape, 0, 0, 450, 450);
  }
}