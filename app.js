let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let highestScore = 0;

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game Started");
        started = true;

        levelUp();

    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);

}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);

}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    //code for chosing a random button
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx){
    //console.log("curr level:", level);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,250);
        }
    }
    else{
        h2.innerHTML = `Game Over ! YOUR SCORE WAS <b>${level}</b> Press any key to Re-start`;
        if(highestScore < level ){
            highestScore = level;
            let h3 = document.querySelector("h3");
            h3.innerText = `Highest Score : ${level}`;
        }
        reset();
        document.body.classList.add("flash-red");

        setTimeout(function () {
            document.body.classList.remove("flash-red");
        }, 500);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    level=0;
    gameSeq=[];
    userSeq=[];
    started=false;
}