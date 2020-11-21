//Create variables here
var dog;
var happyDog;
var foodS, foodStock;
function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  dog1 = createSprite(250,250,50,50);
  dog1.addImage(dog);
  dog1.scale = 0.1;
  
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  fill("red");
  stroke("red");
  text("Press Up-Arrow to feed dog", 200, 10);
  
  //add styles here
  if(keyWentDown(UP_ARROW) && foodS >0){
    foodS = foodS-1;
    writeStock(foodS);
    dog1.addImage(happyDog);
  }

  if(foodS===0){
    dog1.addImage(dog);
  }
  
  drawSprites();

  if(foodS!== undefined){
  textSize(20);
  stroke("blue");
  fill("blue");
  text("Food Remaining:" + foodS,180,100);
}
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  
  database.ref('/').update({
    Food:x
  })
}



