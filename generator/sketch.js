let seascape;

function setup() {
  createCanvas(450, 450);
  createButton("+").mousePressed(generateSeascape);
  generateSeascape();
}

function generateSeascape() {
  const z = [];
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
  }

  const model = new rw.HostedModel({
    url: "https://seascapes.hosted-models.runwayml.cloud/v1",
  });

  const inputs = {
    z: z,
    truncation: 0.8
  };

  // model.info().then(info => console.log('info', info));

  model.query(inputs).then(outputs => {
    const { image } = outputs;
    gotImage(image);
  });

}

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  seascape = createImg(result);
  seascape.hide();
}

function draw() {
  background(220);
  if (seascape) {
    image(seascape, 0, 0, 450, 450);
  }
}