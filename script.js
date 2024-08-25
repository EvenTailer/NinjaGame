let ninja = document.querySelector(".ninja");
let enemy = document.querySelector(".enemy");
let total = document.querySelector(".total");
let flag = true;
let jump = 200;
let countRL = 0;
let enemyStart = 550;
let totalNum = "0"; 
total.textContent = "total:" + " " + totalNum;
document.querySelector(".moveEnemy").src = "./img/enemy.png";
let arrow = document.querySelector(".arrow");
document.querySelector(".moveNinja").src = "./img/ninjaR.png ";

document.addEventListener("keydown", function (event) {
  if (event.code == "Space" && flag == true) {
    flag = false;
    jumping(ninja);
  }
});

function runingNinja() {
  document.addEventListener("keydown", function (event) {
    
    
    if (event.code == "ArrowRight" && flag == true) {
      document.querySelector(".moveNinja").src ='./img/runR.png';
      if (countRL != 550) {
        countRL += 20;
        ninja.style.left = countRL + "px";
        
      }
      
    } else if (event.code == "ArrowLeft" && flag == true) {
      document.querySelector(".moveNinja").src ='./img/runL.png'
      if (countRL != 0) {
        countRL -= 20;
        ninja.style.left = countRL + "px";
        
      }
    }
  });
  document.addEventListener("keyup", function (event) {
    if (flag == true){
      document.querySelector(".moveNinja").src = "./img/ninjaR.png ";
    }
  })
}
runingNinja();
function jumping(ninja) {
  let ninjaJump = setInterval(function () {
    document.querySelector(".moveNinja").src = "./img/jumpR.png";
    jump = jump - 10;
    ninja.style.top = jump + "px";
    if (jump == 70) {
      clearInterval(ninjaJump);
      fall();
    }
  }, 50);

  function fall() {
    let ninjaFalling = setInterval(function () {
      document.querySelector(".moveNinja").src = "./img/fallR.png";
      jump += 10;
      ninja.style.top = jump + "px";
      if (jump == 200) {
        clearInterval(ninjaFalling);
        flag = true;
        document.querySelector(".moveNinja").src = "./img/ninjaR.png ";
      }
    }, 50);
  }
}

function moveEnemy(enemy) {
  let movingEnemy = setInterval(function () {
    enemyStart -= 10;
    enemy.style.left = enemyStart + "px";
    if (enemyStart == 0) {
      countTheTotal();
      clearInterval(movingEnemy);
      enemyStart = 550;
      moveEnemy(enemy);
    }
  }, speedAdd());
}
moveEnemy(enemy);

function countTheTotal() {
  totalNum++;
  console.log(totalNum);
  total.textContent = "total:" + " " + totalNum;
}

function conflict() {
  let isAlive = setInterval(function () {
    let rect1 = enemy.getBoundingClientRect();
    let rect2 = ninja.getBoundingClientRect();
    let rect3 = arrow.getBoundingClientRect();
    if (
        rect1.left+10 < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left+10 &&
        rect1.top+10 < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top+10
        ||
        rect3.left+10 < rect2.left + rect2.width &&
        rect3.left + rect3.width > rect2.left+10 &&
        rect3.top+10 < rect2.top + rect2.height &&
        rect3.top + rect3.height > rect2.top+10
    ) {
      alert("вы проиграли, выш счет: " + totalNum);
      location.reload();
      enemyStart = 550;
      placeArrow = 750;
      arrow.style.left = placeArrow + "px";
      enemy.style.left = enemyStart + "px";
      jump = 220;
      ninja.style.top = jump + "px";
      document.querySelector(".moveNinja").src = "./img/stay.png ";
      totalNum = 0;
      total.textContent = "total:" + " " + totalNum;
    }
  }, 50);
}
conflict();

function speedAdd() {
  let speed = 50;
  if (totalNum > 5 && totalNum <= 10) {
    speed = 45;
  } else if (totalNum > 10 && totalNum <= 15) {
    speed = 40;
  } else if (totalNum > 15 && totalNum <= 20) {
    speed = 35;
  } else if (totalNum > 20) {
    speed = 30;
  }
  console.log(speed);
  return speed;
}

let placeArrow = 750;
function moveArrow() {
  let timeToMove = setTimeout(function () {
    movingArrow();
  }, 3000);
}
moveArrow()
function movingArrow() {
  let interval = setInterval(function () {
    placeArrow -= 10;
    arrow.style.left = placeArrow + "px";
    if (placeArrow == 0) {
      clearInterval(interval);
      placeArrow = 550;
      movingArrow();
    }
  }, 70);
}
