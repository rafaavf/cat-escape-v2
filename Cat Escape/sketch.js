
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var cat, catImg, catAnimationLeft, catAnimationRight, catAnimationUp, catAnimationDown;
var menina, meninaImgL, meninaImgR, meninaAnimationL, meninaAnimationR;
var movel, comida, trampolim, plataforma;
var movelImg, comidaImg, trampolimImg, plataformaImg;
var planoDeFnd, planoDeFndImg;
var moveis, mesa, cadeira1, cadeira2, sofa1, sofa2, estante, planta, parede1, parade2, parade3, parede4;
var recompensa, recompensaImg;
var isJumping = false;
var jumpX, jumpY, jumpTime = false, stopJumping = false;

function preload() {
	//catImg1 = loadImage ();
	meninaImgL = loadImage("./assets/dona_do_gato5.png");
	meninaImgR = loadImage("/assets/dona_do_gato5R.png");
	meninaAnimationL = loadAnimation("./assets/dona_do_gato1.png", "./assets/dona_do_gato2.png", "./assets/dona_do_gato3.png", "./assets/dona_do_gato4.png");
	meninaAnimationR = loadAnimation("/assets/dona_do_gato1R.png", "/assets/dona_do_gato2R.png", "/assets/dona_do_gato3R.png", "/assets/dona_do_gato4R.png");
	catImg = loadAnimation("./assets/cat1.png");
	catAnimationLeft = loadAnimation("./assets/cat1.png", "./assets/cat2.png", "./assets/cat3.png");
	catAnimationRight = loadAnimation("./assets/cat1R.png", "./assets/cat2R.png", "./assets/cat3R.png");
	catAnimationUp = loadAnimation("./assets/cat1U.png", "./assets/cat2U.png", "./assets/cat3U.png");
	catAnimationDown = loadAnimation("./assets/cat1D.png", "./assets/cat2D.png", "./assets/cat3D.png");
	planoDeFndImg = loadImage("./assets/planodefundo1.png");
	recompensaImg = loadImage("./assets/atum2.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;
	//Crie os Corpos aqui.

	cat = createSprite(1450, 170, 50, 50);
	cat.addAnimation("gato parado", catImg);
	cat.addAnimation("gato direita", catAnimationRight);
	cat.addAnimation("gato esquerda", catAnimationLeft);
	cat.addAnimation("gato cima", catAnimationUp);
	cat.addAnimation("gato baixo", catAnimationDown);
	cat.scale = 1.7;

	menina = createSprite(1470, 630, 50, 50);
	menina.addAnimation("menina parada", meninaImgL);
	menina.addAnimation("menina direita", meninaAnimationR);
	menina.addAnimation("menina esquerda", meninaAnimationL);

	mesa = createSprite(990, 403, 308, 170);
	mesa.visible = false;
	sofa1 = createSprite(1400, 411, 250, 370);
	sofa1.visible = false;
	sofa2 = createSprite(994, 170, 415, 140);
	sofa2.visible = false;
	estante = createSprite(260, 400, 280, 510);
	estante.visible = false;
	cadeira1 = createSprite(995, 520, 215, 155);
	cadeira1.visible = false;
	cadeira2 = createSprite(760, 403, 190, 130);
	cadeira2.visible = false;
	planta = createSprite(575, 600, 180, 120);
	planta.visible = false;

	recompensa = createSprite(330, 395, 60, 60);
	recompensa.addAnimation("comida", recompensaImg);
	recompensa.scale = 0.33;

	moveis = new Group()
	moveis.add(mesa);
	moveis.add(sofa1);
	moveis.add(sofa2);
	moveis.add(estante);
	moveis.add(cadeira1);
	moveis.add(cadeira2);
	moveis.add(planta);

	rectMode(CENTER);
}


function draw() {
	background(0);
	image(planoDeFndImg, 0, 0, width, height);
	fill("black");
	textSize(30);

	moveCat();
	moveMenina();

	menina.collide(moveis);

/*consegui resolver o pulo! só falta ajustar tempo e
velocidade, mas está funcionando. os proximos ifs são os
que determinam o pulo*/
	if (keyDown("space")) {
		cat.velocityY -= 1;
		isJumping = true;
		setTimeout(() => {
			jumpTime = true;
		}, 1000);
	} else {
		isJumping = false;
	}
	if (jumpTime) {
		cat.velocityY += 1;
		isJumping = true;
		setTimeout(() => {
			stopJumping = true;
			jumpTime = false;
		}, 600);
	} else {
		isJumping = false;
	}
	if (stopJumping){
		cat.velocityY = 0;
	}
	if (!isJumping) {
		//cat.collide(moveis);
		stopJumping = false;
	}

	drawSprites();
	text("X: " + mouseX + "/ Y: " + mouseY, mouseX, mouseY);
	Engine.run(engine);
}

function moveCat() {
	if (keyDown("w")) {
		cat.y -= 5;
		cat.changeAnimation("gato cima");
	}
	if (keyDown("a")) {
		cat.x -= 5;
		cat.changeAnimation("gato esquerda");
	}
	if (keyDown("s")) {
		cat.y += 5;
		cat.changeAnimation("gato baixo");
	}
	if (keyDown("d")) {
		cat.x += 5;
		cat.changeAnimation("gato direita");
	}
}

function moveMenina() {
	if (keyIsDown(LEFT_ARROW)) {
		menina.x -= 5;
		menina.changeAnimation("menina esquerda");
	}
	if (keyIsDown(RIGHT_ARROW)) {
		menina.x += 5;
		menina.changeAnimation("menina direita");
	}
	if (keyIsDown(UP_ARROW)) {
		menina.y -= 5;
		menina.changeAnimation("menina esquerda");
	}
	if (keyIsDown(DOWN_ARROW)) {
		menina.y += 5;
		menina.changeAnimation("menina esquerda");
	}
}