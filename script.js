var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var warriorImg = document.getElementById("warriorImg")
var casterImg = document.getElementById("casterImg")
var rangerImg = document.getElementById("rangerImg")
var ennemi1Img = document.getElementById("ennemi1Img")
var ennemi2Img = document.getElementById("ennemi2Img")
var bow = new Audio("bow.wav")
var sword = new Audio("sword.wav")
var defense = new Audio("defense.wav")
var magic = new Audio("magic.wav")
var storm = new Audio("storm.wav")
var potion = new Audio("potion.wav")
var howlEnnemi1 = new Audio("howlEnnemi1.wav")
var howlEnnemi2 = new Audio("howlEnnemi2.wav")
//Tours
var indice = 1;
var guys = ["ennemi1","warrior","caster","ennemi2","ranger"];
var felows = ["warrior","caster","ranger"];
var foes = ["ennemi1","ennemi2"];
var time;
var lastAction = "A vous de jouer!!!";
//objets personnages
var warrior = {
  name: "warrior", life: 100, isDead: false,
  x:150, y:100, go: false, moving: false, defending: false}
var caster = {
  name: "caster", life: 100, isDead: false,
  x:150, y:250, go: false, moving: false}
var ranger = {
  name: "ranger", life: 100, isDead: false,
  x:150, y:400, go: false, moving: false}
var ennemi1 = {
  name: "ennemi1", life: 100, isDead: false,
  x:850, y:100, go: false, moving: false}
var ennemi2 = {
  name: "ennemi2", life: 100, isDead: false,
  x:800, y:300, go: false, moving: false}

//nombre entier aleatoire
function getRandomInt(max){return Math.floor(Math.random() * Math.floor(max));}

//comptage des tours et RAZ

function endTurn(){
  for (var i = 0; i < guys.length; i++) {
    if (window[guys[i]].isDead) {
      guys.splice(i,1)
    }
  }
  for (var i = 0; i < foes.length; i++) {
    if (window[foes[i]].isDead) {
      foes.splice(i,1)
    }
  }
  for (var i = 0; i < felows.length; i++) {
    if (window[felows[i]].isDead) {
      felows.splice(i,1)
    }
  }
  if (foes.length == 0) {
    alert("Victoire!!!")
    document.location.reload();
  }
  if (felows.length == 0){
    alert("GAME OVER");
    document.location.reload();
  }
  if (indice < guys.length-1) {
    indice ++;}else {indice = 0;}
  }
function switchMenu() {
  document.getElementById("warrior-menu").style.display = "none";
  document.getElementById("caster-menu").style.display = "none";
  document.getElementById("ranger-menu").style.display = "none";
  switch (guys[indice]) {
    case "warrior":
      document.getElementById("warrior-menu").style.display = "block";
      break;
    case "caster":
      document.getElementById("caster-menu").style.display = "block";
      break;
    case "ranger":
      document.getElementById("ranger-menu").style.display = "block";
      break;
  }
}
//Action ennemi
function ennemiTurn(){
  var whoIndice = getRandomInt(felows.length); //indice de liste aleatoire
  var dmg = getRandomInt(20)+ 10; // dÃ©gats infligÃ©s
  function who2var(x){return window[felows[x]];}//
  //fonction inputDamage
  function inputDamage(who,dmg){
    if (who.defending == true) {
      who.life = who.life - dmg/4;
      who.defending = false;
      lastAction = who.name + " subit " + dmg/4 + " dommages"
    }else {who.life = who.life - dmg;}
    who.life = who.life - dmg;
    lastAction = who.name + " subit " + dmg + " dommages"
    if (who.life <= 0) {
      who.life = 0;
      felows.splice(whoIndice,1);
      who.isDead = true;
      lastAction = lastAction + " et meurt";
      }
  }//fin fonction inputDamage
  //ennemi1
  if(guys[indice] == "ennemi1"){
    if(!ennemi1.isDead){
      //coder IA ennemi1 ici
      howlEnnemi1.play();
      ennemi1.go = true;
      if (warrior.defending && !warrior.isDead) {
        inputDamage(warrior,dmg);
      }else{
        inputDamage(who2var(whoIndice),dmg);}
        endTurn();
        //fin du code IA ennemi1
      }else{endTurn();}
  }//fin ennemi1
  //ennemi2
  if(guys[indice] == "ennemi2"){
    if(!ennemi2.isDead){
      //coder IA ennemi2 ici
      howlEnnemi2.play();
      ennemi2.go = true;
      if (warrior.defending && !warrior.isDead) {
        inputDamage(warrior,dmg);
        // alert("warrior life: " + warrior.life)
      }else{
        // alert("ennemi2 attaque: " + felows[whoIndice] + " a recu " + dmg);
        inputDamage(who2var(whoIndice),dmg);}
        endTurn();
      //fin du code IA ennemi2
    }else{endTurn();}
  }//fin ennemi2
}//fin action ennemi

//fonction attack
function attack(who,withWho){
  var dmg = getRandomInt(20); // dÃ©gats infligÃ©s
  switch (withWho) {
    case "warrior":
      warrior.go = true
      who.life -= dmg;
      lastAction = who.name + " subit " + dmg + " dommages"
      sword.play();
      warrior.defending = false;
      break;
    case "caster":
      caster.go = true;
      let casterDMG = dmg+20;
      who.life -= casterDMG;
      lastAction = who.name + " subit " + casterDMG + " dommages";
      magic.play();
      break;
    case "ranger":
      ranger.go = true;
      let rangerDMG = dmg+30;
      who.life -= rangerDMG;
      lastAction = who.name + " subit " + rangerDMG + " dommages"
      bow.play();
      break;
  }
  if (who.life <= 0) {
      document.getElementById(who.name).style.display = "none";
    who.life = 0;
    who.isDead = true;
    lastAction = lastAction + " et meurt."
  }
  var time = setTimeout(endTurn, 1300);
}//fin attack
function target1(){attack(ennemi1,guys[indice]);}
function target2(){attack(ennemi2,guys[indice]);}

//HEAL
function heal(who){
  switch (who) {
    case warrior:
      warrior.life += 20;
      lastAction = warrior.name + " est soigné de " + 20 + " PV"
      break;
    case caster:
      caster.life += 20;
      lastAction = caster.name + " est soigné de " + 20 + " PV"
      break;
    case ranger:
      ranger.life += 20;
      lastAction = ranger.name + " est soigné de " + 20 + " PV"
      break;
  }
  if (who.life >= 100){who.life=100;}
  potion.play();
  ranger.go = true;
  var time = setTimeout(endTurn, 1300);
}//
function healWarrior(){heal(warrior)}
function healCaster(){heal(caster)}
function healRanger(){heal(ranger)}
//

//
function aoe(){
  for (var i = 0; i < foes.length; i++) {
    storm.play();
    caster.go = true;
    window[foes[i]].life -= 25;
    if (window[foes[i]].life <= 0) {
      window[foes[i]].life = 0;
      window[foes[i]].isDead = true;
    }
    lastAction = caster.name + " utilise tempête!!!"
  }
  var time = setTimeout(endTurn, 1300);
}//
//

function drawWarrior(){
  if (!warrior.isDead) {
    //barre de vie
    ctx.beginPath();
    ctx.rect(warrior.x, warrior.y-20, warrior.life, 10);
    if (warrior.life > 60) {
      ctx.fillStyle = "#72D16A";
    }else if (warrior.life > 20) {
      ctx.fillStyle = "#FFC300";
    }else {
      ctx.fillStyle = "#E1140D";
    }
    ctx.fill();
    ctx.closePath();

    if (warrior.defending) {
        if(warrior.x <= 350){
          warrior.x += 9;
          warrior.y += 1.5;
        }
      } else {

        if (warrior.go) {
          if (warrior.x <= 600) {
            warrior.x += 12;
            warrior.y += 2;
          }else {
            warrior.go = false;
          }
        }
        if (!warrior.go){
           if(warrior.x >= 150){
             warrior.x -= 12;
             warrior.y -= 2;
           }
        }
      }
    ctx.drawImage(warriorImg, warrior.x, warrior.y);
  }

}

function drawCaster(){
  if (!caster.isDead) {
    ctx.beginPath();
    ctx.rect(caster.x+10, caster.y-15, caster.life, 10);
    if (caster.life > 60) {
      ctx.fillStyle = "#72D16A";
    }else if (caster.life > 20)  {
      ctx.fillStyle = "#FFC300";
    }else {
      ctx.fillStyle = "#E1140D";
    }
    ctx.fill();
    ctx.closePath();
    if (caster.go) {
        if(caster.x <= 400){
          caster.x += 9;
          caster.y -= 0.5;
        }else {
          caster.go = false;
         }
     }
    if (!caster.go) {
      if(caster.x >= 150){
        caster.x -= 9;
        caster.y += 0.5;
      }
    }
    ctx.drawImage(casterImg, caster.x, caster.y);
  }
}

function drawRanger(){
  if (!ranger.isDead) {
    ctx.beginPath();
    ctx.rect(ranger.x+10, ranger.y+5, ranger.life, 10);
    if (ranger.life > 60) {
      ctx.fillStyle = "#72D16A";
    }else if (ranger.life > 20)  {
      ctx.fillStyle = "#FFC300";
    }else {
      ctx.fillStyle = "#E1140D";
    }
    ctx.fill();
    ctx.closePath();
    if (ranger.go) {
        if(ranger.x <= 400){
          ranger.x += 9;
          ranger.y -= 1;
        }else {
          ranger.go = false;
         }
     }
    if (!ranger.go) {
      if(ranger.x >= 150){
        ranger.x -= 9;
        ranger.y += 1;
      }
    }
    ctx.drawImage(rangerImg, ranger.x, ranger.y);
  }
}

function drawEnnemi1(){
  if (!ennemi1.isDead) {
    ctx.beginPath();
    ctx.rect(ennemi1.x+40, ennemi1.y-20, ennemi1.life, 10);
    if (ennemi1.life > 60) {
      ctx.fillStyle = "#72D16A";
    }else if (ennemi1.life > 20)  {
      ctx.fillStyle = "#FFC300";
    }else {
      ctx.fillStyle = "#E1140D";
    }
    ctx.fill();
    ctx.closePath();
    if (ennemi1.go) {
      if (ennemi1.x > 600) {
        ennemi1.x -= 9;
        ennemi1.y += 2;
      }else {ennemi1.go=false;}}
    if (!ennemi1.go) {
      if(ennemi1.x < 850){
        ennemi1.x += 9;
        ennemi1.y -= 2;
      }
    }
    ctx.drawImage(ennemi1Img, ennemi1.x, ennemi1.y);
  }
}

function drawEnnemi2(){
  if (!ennemi2.isDead) {
    ctx.beginPath();
    ctx.rect(ennemi2.x+90, ennemi2.y-20, ennemi2.life, 10);
    if (ennemi2.life > 60) {
      ctx.fillStyle = "#72D16A";
    }else if (ennemi2.life > 20)  {
      ctx.fillStyle = "#FFC300";
    }else {
      ctx.fillStyle = "#E1140D";
    }
    ctx.fill();
    ctx.closePath();
    if (ennemi2.go) {
      if (ennemi2.x > 600) {
        ennemi2.x -= 9;
        ennemi2.y -= 1;
      }else {ennemi2.go=false;}}
  if (!ennemi2.go) {
    if(ennemi2.x < 800){
      ennemi2.x += 9;
      ennemi2.y += 1;
    }
  }
    ctx.drawImage(ennemi2Img, ennemi2.x, ennemi2.y);
  }
}

function drawTurn(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#D1CC6A";
  ctx.fillText("Personnage: "+ guys[indice], 8, 20);
}

function drawAction(){
  ctx.font = "20px Arial";
  ctx.fillStyle = "#D1CC6A";
  ctx.fillText(lastAction,8,50);
}
function drawArrowActiveCharacter(){
  //fleche peronnage actif
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWarrior();
    drawCaster();
    drawRanger();
    drawEnnemi1();
    drawEnnemi2();
    drawTurn();
    drawAction();
    ennemiTurn();
    switchMenu();

  requestAnimationFrame(draw);
}

function defend(){
  defense.play();
  warrior.defending = !warrior.defending;
  lastAction = warrior.name + " défend le groupe!"
  var time = setTimeout(endTurn, 1300);
}

draw();
