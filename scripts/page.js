// ===================== Fall 2021 EECS 493 Assignment 2 =====================
// This starter code provides a structure and helper functions for implementing
// the game functionality. It is a suggestion meant to help you, and you are not
// required to use all parts of it. You can (and should) add additional functions
// as needed or change existing functions.

// ==============================================
// ============ Page Scoped Globals Here ========
// ==============================================

// Div Handlers
let game_window;

// Game Object Helpers
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 5;                // Speed of the person
let vaccineOccurrence = 20000;       // Vaccine spawns every 20 seconds
let vaccineGone = 5000;              // Vaccine disappears in 5 seconds
let maskOccurrence = 15000;          // Masks spawn every 15 seconds
let maskGone = 5000;                 // Mask disappears in 5 seconds
let NFTstate = 0;
let pageState = 1;
let changed = 0;
let seenGif = 0;

// Movement Helpers
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;
var pause = false;
var letsGo = 1;
var blink = 0;
var rememberHeaderText = "Use 'A' and 'D' to move my NFT!";
var rememberHeaderLeft = "21%";
var seenMe = 0;
var meWidth = 0;
var doneWithMe = 0;
var textWidth = 0;
var doneWithText = 0;
var carOpacity = 0;
var isBoostedLeft = 0;
var isBoostedRight = 0;
var rightCount=1;
var leftCount =1;
var upCount =1;
var downCount = 1;
var allowGravity =0;
var allowHorizMove =1;
var boostNFT = 0;
var getTop = 0;
var getLeft = 0;
var firstPageInterval;
var secondPageInterval;
var thirdPageInterval;
var fourthPageInterval;
var fourthPageIntervalHover;
var barrierInterval;
var gravityInterval;

// ==============================================
// ============ Functional Code Here ============
// ==============================================
//console.log();
// Main
$(document).ready(function () {
    // ====== Startup ====== 
    game_window = $('.game-window');
    myNFT = $('#myNFT');
    nextArrow = $('#nextArrow');
    backArrow = $('#backArrow');
    wLetter = $("#w");
    bpinkBox = $("#bpinkBox");
    middleBox = $('#middleBox');
   // document.getElementById("backArrow").style.display = "none";
    document.getElementById("pageThree").style.display = "none";
    document.getElementById("pipe").style.display = "none";
    firstPage();
    alwaysRunning();

  
});


function alwaysRunning(){

  var image = document.getElementById("arrowBox");
  image.onmouseover = function() {  
    document.getElementById("header").innerHTML = "Nope! WEBPAGE IS ONLY KEYBOARD INTERACTABLE"; 
    document.getElementById("header").style.color = "red"; 
    document.getElementById("header").style.left = "8%"; 
  }
  image.onmouseleave = function() {  
    document.getElementById("header").innerHTML = rememberHeaderText; 
    document.getElementById("header").style.color = "white"; 
    document.getElementById("header").style.left = rememberHeaderLeft; 
  }

  setInterval(()=>{
    
    if(!pause){
      if(!LEFT){
        leftCount =1;
      }
      if(!RIGHT){
        rightCount =1;
      }
      if(LEFT){
        leftCount += .02;
      }
      if(RIGHT){
        rightCount += .02;
      }
      checkMovement();
    }
  },10);

  setInterval(()=>{
    if(isColliding(nextArrow,myNFT) && letsGo){
      ++pageState;

      if(pageState == 2){
    //    document.getElementById("backArrow").style.display = "block";
       // document.getElementById("backText").style.display = "block";
        document.getElementById("nextArrow").style.width = "120px";
        document.getElementById("nextText").style.width = "23px";

        document.getElementById("pageOne").style.display = "none";
        document.getElementById("pageTwo").style.display = "block";
        rememberHeaderLeft = '42%';
        rememberHeaderText =  "About Me";
        document.getElementById("header").innerHTML = rememberHeaderText;
        document.getElementById("header").style.left = rememberHeaderLeft;
        secondPage();
        transitionscreen();
        clearInterval(firstPageInterval);
      }
      else if(pageState == 3){
        document.getElementById("pageThree").style.display = "block";
        document.getElementById("pageTwo").style.display = "none";
        rememberHeaderLeft = '50%';
        rememberHeaderText = "Hit that right wall -->";
        document.getElementById("header").innerHTML = rememberHeaderText;
        document.getElementById("header").style.left = rememberHeaderLeft;
        thirdPage();
        transitionscreen();
        clearInterval(secondPageInterval);
      }
      else if(pageState == 4){
        document.getElementById("pageFour").style.display = "block";
        document.getElementById("pageThree").style.display = "none";
        rememberHeaderLeft = '40%';
        rememberHeaderText = "Next Page Up Here --->";
        document.getElementById("header").innerHTML = rememberHeaderText;
        document.getElementById("header").style.left = rememberHeaderLeft;
        fourthPage();
        transitionscreen();
        clearInterval(thirdPageInterval);
      }
      
    }
    if(isColliding(backArrow,myNFT) && letsGo){
      --pageState;

      if(pageState == 1){
     //   document.getElementById("backArrow").style.display = "none";
     ////   document.getElementById("backText").style.display = "none";
     //   document.getElementById("backArrow").style.width = "120px";
     //   document.getElementById("backText").style.width = "23px";
     //   document.getElementById("backText").style.opacity = "0";
      //  document.getElementById("backArrow").style.opacity = "0";

        document.getElementById("pageOne").style.display = "block";
        document.getElementById("pageTwo").style.display = "none";
        rememberHeaderLeft = '21%';
        rememberHeaderText =  "Use 'A' and 'D' to move my NFT!";
        document.getElementById("header").innerHTML = rememberHeaderText;
        document.getElementById("header").style.left = rememberHeaderLeft;
        firstPage();
      }
      else if(pageState == 2){
      //  document.getElementById("backArrow").style.display = "block";
     //   document.getElementById("backText").style.display = "block";
        document.getElementById("nextArrow").style.width = "120px";
        document.getElementById("nextText").style.width = "23px";

        document.getElementById("pageThree").style.display = "none";
        document.getElementById("pageTwo").style.display = "block";
        rememebrHeaderLeft = '45%';
        rememberHeaderText =  "About Me";
        document.getElementById("header").innerHTML = rememberHeaderText;
        document.getElementById("header").style.left = rememberHeaderLeft;
        secondPage();
      }
      else if(pageState == 3){
        document.getElementById("nextArrow").style.width = "120px";
        document.getElementById("nextText").style.width = "23px";

        document.getElementById("pageThree").style.display = "block";
        document.getElementById("pageFour").style.display = "none";
        rememberHeaderLeft = '40%';
        rememberHeaderText =  "keep going...";
        document.getElementById("header").style.left = rememberHeaderLeft;
        document.getElementById("header").innerHTML = rememberHeaderText;
        thirdPage();
      }
    }
  },10);

  setInterval(()=>{
    if(pageState == 1){
      if(blink){
        document.getElementById("nextArrow").style.opacity = ".7";
        document.getElementById("nextText").style.opacity = ".7";
        blink = 0;
      }
      else{
        document.getElementById("nextArrow").style.opacity = ".3";
        document.getElementById("nextText").style.opacity = ".3";
        blink = 1;
      }
    }
    else if(blink){
      document.getElementById("nextArrow").style.opacity = ".7";
   //   document.getElementById("backArrow").style.opacity = ".7";
      document.getElementById("nextText").style.opacity = ".7";
   //   document.getElementById("backText").style.opacity = ".7";
      blink = 0;
    }
    else{
      document.getElementById("nextArrow").style.opacity = ".3";
   //   document.getElementById("backArrow").style.opacity = ".3";
      document.getElementById("nextText").style.opacity = ".3";
  //    document.getElementById("backText").style.opacity = ".3";
      blink = 1;
    }
  },500); 
}


function firstPage(){
  document.getElementById("pageTwo").style.display = "none"; 
  document.getElementById("header").style.color = "white"; 
  pause = 1;
  letsGo = 0;
  let cOpacity = 0;
  let hOpacity = 0;
  setTimeout(()=>{
    document.getElementById("myNFT").style.left = "13%";
  },200);
  firstPageInterval = setInterval(()=>{
    gififyNFT();
  },150);
  setTimeout(()=>{
    pause = 0;
    letsGo = 1;
  },600);
  if(!seenGif){
    gififyArrow();
    setInterval(()=>{
      gififyArrow();
    },6300);
  }
  setTimeout(() => {
    if(cOpacity < 1){
      setInterval(() => {
        cOpacity += .003;
        document.getElementById("courtesy").style.opacity = cOpacity;
      }, 10);
    }
  }, 4000);
  setTimeout(() => {
    if(hOpacity<1){
      setInterval(() => {
        hOpacity += .003;
        document.getElementById("header").style.opacity = hOpacity;
      }, 10);
    }
  }, 1000);
  setTimeout(() => {
    if(carOpacity<1){
      setInterval(() => {
        carOpacity += .01;
        document.getElementById("myNFT").style.opacity = carOpacity;
      }, 10);
    }
  }, 200);
}
function transitionscreen(){
  rightCount = 1;
  leftCount = 1;
  let darkness = 0;
  let breaki = 0;
  setInterval(()=>{
    if(breaki !=2){
    if(!breaki){
      darkness += .05;
      if(darkness >= 1.5){
        darkness =1;
        breaki = 1;
      }
    }
    else{
      darkness -= .05;
      if(darkness <= 0){
        darkness =0;
        breaki = 2;
      }
    }
    document.getElementById("cover").style.opacity = darkness;
  }
  },10);
}

function secondPage(){
  document.getElementById("pageTwo").style.display = "block"; 
  document.getElementById("header").style.left = "42%"; 
  seenGif = 1;
  document.getElementById("header").style.color = "white"; 
  pause = 1;
  letsGo = 0;
  let doneWithMeBox =0;
  let meBoxWidth =0;
  let meBoxOpacity = 1;
  setTimeout(()=>{
    document.getElementById("meBox").style.opacity = meBoxOpacity;


    setTimeout(()=>{

    setInterval(()=>{
      if(meBoxWidth < 33 && !doneWithMeBox){
        meBoxWidth += .8;
        document.getElementById("meBox").style.width = meBoxWidth + "%";
      }
      else if(meBoxWidth >= 33 && !doneWithMeBox){
        doneWithMeBox =1;
      }
      else if(meBoxWidth > 24 && doneWithMeBox==1){
        meBoxWidth -= .4;
        document.getElementById("meBox").style.width = meBoxWidth + "%";
      }
      else if(meBoxWidth <= 24 && doneWithMeBox==1){
        doneWithMeBox =2;
      }
      else if(meBoxWidth < 29 && doneWithMeBox ==2){
        meBoxWidth +=.2;
        document.getElementById("meBox").style.width = meBoxWidth + "%";
      }

    },1)
  },300);
  },200);
  setTimeout(()=>{
    document.getElementById("nextArrow").style.width = "128px";
    document.getElementById("myNFT").style.left = "13%";
  },200);

  secondPageInterval = setInterval(()=>{
    gififyNFT();
  },150);
  setTimeout(()=>{
    letsGo = 1;
    pause = 0;
  },600);
  if(!seenMe){
    setTimeout(()=>{
      setInterval(()=>{
        if(meWidth < 33 && !doneWithMe){
          meWidth += .8;
          document.getElementById("me").style.width = meWidth + "%";
        }
        else if(meWidth >= 33 && !doneWithMe){
          doneWithMe =1;
        }
        else if(meWidth > 24 && doneWithMe==1){
          meWidth -= .4;
          document.getElementById("me").style.width = meWidth + "%";
        }
        else if(meWidth <= 24 && doneWithMe==1){
          doneWithMe =2;
        }
        else if(meWidth < 28 && doneWithMe ==2){
          meWidth +=.2;
          document.getElementById("me").style.width = meWidth + "%";
        }

      },1)
    },900);

  }
  if(!seenMe){
    setTimeout(()=>{
      setInterval(()=>{
        if(textWidth < 72 && !doneWithText){
          document.getElementById("aboutMe").style.opacity = "1";
          textWidth += .5;
          document.getElementById("aboutMe").style.width = textWidth + "%";
        }
        else if(textWidth >= 72 && !doneWithText){
          doneWithText = 1;
        }
        else if(textWidth > 69 && doneWithText){
          textWidth -= .25;
          document.getElementById("aboutMe").style.width = textWidth + "%";
        }

      },1);
    },1500);
  }
}


function thirdPage(){
  let count =1;
  seenMe = 1;
  document.getElementById("pageThree").style.display = "block";
  document.getElementById("header").style.color = "white"; 
  document.getElementById("nextArrow").style.top = "91%";
  document.getElementById("nextText").style.top = "89%";
  pause = 1;
  letsGo = 0;
  setTimeout(()=>{
    document.getElementById("nextArrow").style.width = "128px";
    document.getElementById("myNFT").style.left = "13%";
  },200);
  thirdPageInterval = setInterval(()=>{
    gififyNFT();
  },150);
  setTimeout(()=>{
    pause = 0;
    letsGo = 1;
  },600);
  setTimeout(()=>{
    setInterval(()=>{
      var getLeft = parseInt(myNFT.css("left"));
      if(getLeft >= 1124){
        allowHorizMove = 0;
        document.getElementById("whiteLine").style.width = "87%";
        count += 0.01;
        var getTop = parseInt(myNFT.css("top")) + count*count*count;
        if(getTop >maxPersonPosY-2){
          count=0;
          allowHorizMove =1;
        }
        myNFT.css("top", getTop);
      }
    },5);
  },1000);
}

function fourthPage(){
  allowHorizMove =1;
  fourthPageInterval = setInterval(()=>{
    gififyNFT();
  },150);
  seenMe = 1;
  document.getElementById("pageFour").style.display = "block";
  document.getElementById("nextArrow").style.top = "7%";
  document.getElementById("nextText").style.top = "5%";
  pause = 1;
  letsGo = 0;
  setTimeout(()=>{
    document.getElementById("nextArrow").style.width = "128px";
    document.getElementById("myNFT").style.left = "13%";
  },200);

  setTimeout(()=>{
    pause = 0;
    letsGo = 1;
    document.getElementById("pipe").style.display = "block";
  },600);
  setTimeout(() => {
    var pipeCheck = setInterval(() => {
      let wheelsLocation = parseInt(document.getElementById("myNFT").style.left);
      if(wheelsLocation >= 631){
        fourthPageSecondHalf();
        clearInterval(pipeCheck);
      }
    }, 10);
  }, 200);
  
}


function fourthPageSecondHalf(){
  let upForce = 10;
  document.getElementById("header").innerHTML = "Space to Boost";
  document.getElementById("header").style.left = "42%";
  let wheelsLocation = 0;
  document.getElementById("myNFT").style.top = maxPersonPosY-6;
  document.getElementById("myNFT").src = "src/myNFT/aNFTState0.png";
  barrierInterval = setInterval(() => {
    wheelsLocation = parseInt(document.getElementById("myNFT").style.left);
    if(wheelsLocation < 630){
      myNFT.css("left", 630);
      leftCount = 0;
    }
  }, 1);
  
  clearInterval(fourthPageInterval);

  fourthPageIntervalHover =  setInterval(() => {
    document.getElementById("myNFT").src = "src/myNFT/aNFTState0.png";
    setTimeout(() => {
      document.getElementById("myNFT").src = "src/myNFT/aNFTState1.png";
    }, 100);
    setTimeout(() => {
      document.getElementById("myNFT").src = "src/myNFT/aNFTState0.png";
    }, 300);
    setTimeout(() => {
      document.getElementById("myNFT").src = "src/myNFT/aNFTState2.png";
    }, 400);
  }, 600);

  gravityInterval = setInterval(() => {

    let topLocation = parseInt(document.getElementById("myNFT").style.top);

    if(UP){
      upForce +=0.2;
    }
    if(topLocation >= 652 && upForce < 0){
      upForce =0;
      topLocation = 652;
    }
    else if(!UP && topLocation < 651){
      upForce -= 0.2;
    }
    console.log(upForce);
    if(upForce <2) {
      upForce = 2;
    }
    if(upForce > 17) {
      upForce = 17;
    }
    if(upForce > 10){
      upForce = upForce;
    }
    if(upForce < 10){
      upForce = upForce;
    }
    topLocation -= upForce - 10;

    myNFT.css("top", topLocation);

  }, 10);
}

function dropNFT(){
  setTimeout(()=>{
    
  },600);
}

function checkMovement(){
  // if(allowGravity){
  //   console.log("go down")
  //   if(boostNFT > 0){
  //     var newPosy = parseInt(myNFT.css("top"));
  //     if(boostNFT <2){
  //       var newPosy = parseInt(myNFT.css("top")) - 1;
  //     }
  //     else if(boostNFT <5){
  //       var newPosy = parseInt(myNFT.css("top")) - 3;
  //     }
  //     else if(boostNFT <9){
  //       var newPosy = parseInt(myNFT.css("top")) - 6;
  //     }
  //     else{
  //       var newPosy = parseInt(myNFT.css("top")) - 10;
  //     }
  //     if(newPosy < 0){
  //       newPosy = 0;
  //     }
  //     myNFT.css("top", newPosy);
  //     console.log(boostNFT)
  //   }
  
  //   if(boostNFT <0){
  //     var newPosy = parseInt(myNFT.css("top"))
  //     if(boostNFT <2){
  //       var newPosy = parseInt(myNFT.css("top")) + 1;
  //     }
  //     else if(boostNFT <5){
  //       var newPosy = parseInt(myNFT.css("top")) + 3;
  //     }
  //     else if(boostNFT <9){
  //       var newPosy = parseInt(myNFT.css("top")) + 6;
  //     }
  //     else{
  //       var newPosy = parseInt(myNFT.css("top")) + 10;
  //     }
  //     if(newPosy > maxPersonPosY){
  //       newPosy =maxPersonPosY;
  //     }
  //     myNFT.css("top", newPosy);
  //     console.log(boostNFT)
  //   }
  // }
  if(allowHorizMove){
  if(LEFT){
    var newPosx = parseInt(myNFT.css("left")) - Math.sqrt(leftCount*leftCount*leftCount);
    if(newPosx<0){
      newPosx =0;
    }
    myNFT.css("left", newPosx);
  }
  if (RIGHT){
    var newPosx = parseInt(myNFT.css("left")) + Math.sqrt(rightCount*rightCount*rightCount);
    if(newPosx > maxPersonPosX-90){
      newPosx =maxPersonPosX-90;
    }
    myNFT.css("left", newPosx);
  }
  }
}

// TODO: ADD YOUR FUNCTIONS HERE
function gififyNFT(){
  if(!NFTstate){
    document.getElementById("myNFT").src = "src/myNFT/NFTState0.png"
    NFTstate = 1;
  }
  else if(NFTstate == 1){
    document.getElementById("myNFT").src = "src/myNFT/NFTState2.png"
    NFTstate = 4;
  }
  else if(NFTstate == 4){
    document.getElementById("myNFT").src = "src/myNFT/NFTState2.png"
    NFTstate = 2;
  }
  else if(NFTstate==2){
    document.getElementById("myNFT").src = "src/myNFT/NFTState0.png"
    NFTstate = 3;
  }
  else if(NFTstate==3){
    document.getElementById("myNFT").src = "src/myNFT/NFTState1.png"
    NFTstate = 5;
  }
  else if(NFTstate==5){
    document.getElementById("myNFT").src = "src/myNFT/NFTState1.png"
    NFTstate = 0;
  }
}

// Keydown event handler
document.onkeydown = function(e) {
    if (e.key == 'a') { 
      LEFT = true; 
    }
    if (e.key == 'd') {
      RIGHT = true; 
    }
    if (e.key == 'A') { 
      LEFT = true; 
      ++leftCount;
    }
    if (e.key == 'D') {
      RIGHT = true; 
      ++rightCount;
    }
    if (e.keyCode == 32) { 
      UP = true; 
    }
    if (e.key == 'ArrowLeft') {LEFT = true;++rightCount;}
    if (e.key == 'ArrowRight') {RIGHT = true;++rightCount;}
      
}

// Keyup event handler
document.onkeyup = function (e) {
    if (e.key == 'a'){ LEFT = false;leftCount=0;}
    if (e.key == 'd') {RIGHT = false;rightCount =0;}
    if (e.key == 'A'){ LEFT = false;leftCount=0;}
    if (e.key == 'D') {RIGHT = false;rightCount =0;}
    if (e.key == 'ArrowLeft') {LEFT = false;leftCount=0;}
    if (e.key == 'ArrowRight') {RIGHT = false;rightCount =0;}
    if (e.keyCode == 32) { 
      UP = false; 
    }
    // if(allowGravity){
    //   var Posy = parseInt(myNFT.css("top"));
    //   if (e.key == 'w') { 
    //     --boostNFT;
    //   }
    //   if(Posy > maxPersonPosY){
    //     boostNFT = 0;
    //   }
    // }
}

//===================================================

// ==============================================
// =========== Utility Functions Here ===========
// ==============================================

// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange){
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange){
  const o1D = { 'left': o1.offset().left + o1_xChange,
        'right': o1.offset().left + o1.width() + o1_xChange,
        'top': o1.offset().top + o1_yChange,
        'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = { 'left': o2.offset().left,
        'right': o2.offset().left + o2.width(),
        'top': o2.offset().top,
        'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
     // collision detected!
     return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max){
  return (Math.random() * (max - min)) + min;
}


function gififyArrow(){
  document.getElementById("whatToDo1").style.display = "none";
  document.getElementById("whatToDo2").style.display = "none";
  document.getElementById("whatToDo3").style.display = "none";
  document.getElementById("whatToDo4").style.display = "none";
  document.getElementById("whatToDo5").style.display = "none";
  document.getElementById("whatToDo6").style.display = "none";
  document.getElementById("whatToDo7").style.display = "none";
  document.getElementById("whatToDo8").style.display = "none";
  document.getElementById("whatToDo9").style.display = "none";
  document.getElementById("whatToDo10").style.display = "none";
  document.getElementById("whatToDo11").style.display = "none";
  document.getElementById("whatToDo12").style.display = "none";
  document.getElementById("whatToDo13").style.display = "none";
  document.getElementById("whatToDo14").style.display = "none";
  document.getElementById("whatToDo15").style.display = "none";
  document.getElementById("whatToDo16").style.display = "none";
  document.getElementById("whatToDo17").style.display = "none";
  document.getElementById("whatToDo18").style.display = "none";
  document.getElementById("whatToDo19").style.display = "none";
  document.getElementById("whatToDo20").style.display = "none";
  document.getElementById("whatToDo21").style.display = "none";
  document.getElementById("whatToDo22").style.display = "none";
  document.getElementById("whatToDo23").style.display = "none";
  document.getElementById("whatToDo24").style.display = "none";
  document.getElementById("whatToDo25").style.display = "none";
  setTimeout(()=>{
    document.getElementById("whatToDo1").style.display = "block";
  },500);
  setTimeout(()=>{
    document.getElementById("whatToDo2").style.display = "block";
  },550);
  setTimeout(()=>{
    document.getElementById("whatToDo3").style.display = "block";
  },600);
  setTimeout(()=>{
    document.getElementById("whatToDo4").style.display = "block";
  },650);
  setTimeout(()=>{
    document.getElementById("whatToDo5").style.display = "block";
  },700);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.display = "block";
    document.getElementById("whatToDo25").style.left = "26%";
  },1000);
  setTimeout(()=>{
    document.getElementById("whatToDo6").style.display = "block";
    document.getElementById("whatToDo25").style.left = "29%";
  },1150);
  setTimeout(()=>{
    document.getElementById("whatToDo7").style.display = "block";
    document.getElementById("whatToDo25").style.left = "32%";
  },1200);
  setTimeout(()=>{
    document.getElementById("whatToDo8").style.display = "block";
    document.getElementById("whatToDo25").style.left = "35%";
  },1250);
  setTimeout(()=>{
    document.getElementById("whatToDo9").style.display = "block";
    document.getElementById("whatToDo25").style.left = "38%";
  },1300);
  setTimeout(()=>{
    document.getElementById("whatToDo10").style.display = "block";
    document.getElementById("whatToDo25").style.left = "41%";
  },1350);
  setTimeout(()=>{
    document.getElementById("whatToDo11").style.display = "block";
    document.getElementById("whatToDo25").style.left = "44%";
  },1650);
  setTimeout(()=>{
    document.getElementById("whatToDo12").style.display = "block";
    document.getElementById("whatToDo25").style.left = "47%";
  },1700);
  setTimeout(()=>{
    document.getElementById("whatToDo13").style.display = "block";
    document.getElementById("whatToDo25").style.left = "50%";
  },1750);
  setTimeout(()=>{
    document.getElementById("whatToDo14").style.display = "block";
    document.getElementById("whatToDo25").style.left = "53%";
  },1800);
  setTimeout(()=>{
    document.getElementById("whatToDo15").style.display = "block";
    document.getElementById("whatToDo25").style.left = "56%";
  },2100);
  setTimeout(()=>{
    document.getElementById("whatToDo16").style.display = "block";
    document.getElementById("whatToDo25").style.left = "59%";
  },2150);
  setTimeout(()=>{
    document.getElementById("whatToDo17").style.display = "block";
    document.getElementById("whatToDo25").style.left = "62%";
  },2200);
  setTimeout(()=>{
    document.getElementById("whatToDo18").style.display = "block";
    document.getElementById("whatToDo25").style.left = "65%";
  },2250);
  setTimeout(()=>{
    document.getElementById("whatToDo19").style.display = "block";
    document.getElementById("whatToDo25").style.left = "68%";
  },2300);
  setTimeout(()=>{
    document.getElementById("whatToDo20").style.display = "block";
    document.getElementById("whatToDo25").style.left = "71%";
  },2600);
  setTimeout(()=>{
    document.getElementById("whatToDo21").style.display = "block";
    document.getElementById("whatToDo25").style.left = "74%";
  },2650);
  setTimeout(()=>{
    document.getElementById("whatToDo22").style.display = "block";
    document.getElementById("whatToDo25").style.left = "77%";
  },2700);
  setTimeout(()=>{
    document.getElementById("whatToDo23").style.display = "block";
    document.getElementById("whatToDo25").style.left = "80%";
  },2750);
  setTimeout(()=>{
    document.getElementById("whatToDo24").style.display = "block";
    document.getElementById("whatToDo25").style.left = "83%";
  },2800);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "84%";
    document.getElementById("whatToDo25").style.top = "23%";
    document.getElementById("whatToDo25").style.fontSize = "150px";
  },3300);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "83%";
    document.getElementById("whatToDo25").style.top = "25%";
    document.getElementById("whatToDo25").style.fontSize = "120px";
  },3800);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "84%";
    document.getElementById("whatToDo25").style.top = "23%";
    document.getElementById("whatToDo25").style.fontSize = "150px";
  },4300);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "83%";
    document.getElementById("whatToDo25").style.top = "25%";
    document.getElementById("whatToDo25").style.fontSize = "120px";
  },4800);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "84%";
    document.getElementById("whatToDo25").style.top = "23%";
    document.getElementById("whatToDo25").style.fontSize = "150px";
  },5300);
  setTimeout(()=>{
    document.getElementById("whatToDo25").style.left = "83%";
    document.getElementById("whatToDo25").style.top = "25%";
    document.getElementById("whatToDo25").style.fontSize = "120px";
  },5800);

}
