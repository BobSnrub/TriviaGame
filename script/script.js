


let totalScore = 0;
let totalQuestions = 20;
let injectContent = document.getElementById('inject');
let body = document.getElementById('body');
let diff = "";
let smArray = [];
let fullArray = [];

let qNum = 0;


let interval;

//let correct = document.getElementById('correct');
let counter = document.getElementById('counter');
let questions = document.getElementById('questions');

let A1 = document.getElementById('a1');
let A2 = document.getElementById('a2');
let A3 = document.getElementById('a3');
let A4 = document.getElementById('a4');

function injectHTML(url) {

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);

            if (url === '../inject/title.html') {
                loadTitle(myArr);
            }
            else if (url === '../inject/menu.html') {
                loadMenu(myArr);
            }
            else if (url === '../inject/game.html') {
                loadGame(myArr);
            }
            else {
                console.log('Check your if statement in InjectHTML');
            }
        }

    };
    //opens connection
    xmlhttp.open("GET", url, true);

    //pulls the request
    xmlhttp.send();
}

function mksmallArray(fullArray) {
    for (let i = 0; i < totalQuestions; i++) {
        qNum = Math.floor(Math.random() * q.fullArray.length)
        smArray.push(q.fullArray[qNum]);
        console.log(smArray);
    }

    // for (let i = 0; i < totalQuestions; i++) {
    //     qNum = Math.floor(Math.random() * q.ezQ.length);
    //     //console.log(qNum);
    //     triviaQ.push(q.ezQ[qNum]);
    //     q.ezQ.splice(qNum, 1);

    // }
}

function loadTitle(info) {
    injectContent.innerHTML = info;
    body.className = 'title-bg';
    let titleToMenuBtn = document.getElementById('titleToMenuBtn').addEventListener('click', function (e) {
        injectHTML("../inject/menu.html");
    });
}

function loadMenu(info) {
    injectContent.innerHTML = info;
    body.className = 'game-bg';

    let easyBtn = document.getElementById('easyBtn').addEventListener('click', function () {
        loadJSON("../data/ezQ.json");
        injectHTML("../inject/game.html");
    });
    let mediumBtn = document.getElementById('mediumBtn').addEventListener('click', function () {
        loadJSON("../data/mQ.json");
        injectHTML("../inject/game.html");
    });
    let hardBtn = document.getElementById('hardBtn').addEventListener('click', function () {
        loadJSON("../data/hQ.json");
        injectHTML("../inject/game.html");
    });
}

function loadGame(info) {
    injectContent.innerHTML = info;
    //body.className = 'title-bg';
}

function loadJSON(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {

            if (url === '../data/ezQ.json') {
                fullArray = JSON.parse(this.responseText).ezQ;
                console.log(fullArray);
            }
            else if (url === '../data/mQ.json') {
                fullArray = JSON.parse(this.responseText).mQ;
                console.log(fullArray);
                genRndArr();
            }
            else if (url === '../data/hQ.json') {
                fullArray = JSON.parse(this.responseText).hQ;
                console.log(fullArray);
            }
            else {
                console.log('Check your if statement in loadJSON');
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function genRndArr(e) {
    console.log(fullArray);
    for (let i = 0; i < totalQuestions; i++) {
        let rNum = Math.floor(Math.random() * fullArray.length);
        console.log(rNum);
        smArray.push(fullArray[rNum]);
    }
    console.log(smArray);
    console.log(smArray[qNum].q);
}

function loadQuestion() {
    questions.innerText = smArray[qNum].q;
    A1.innerText = smArray[qNum].a1;
    A2.innerText = smArray[qNum].a2;
    A3.innerText = smArray[qNum].a3;
    A4.innerText = smArray[qNum].a4;
}

function checkAnswer(answer) {
    //Retrieve the answer and see if it is correct
    //Increment your correct number

    if (answer === tQuestions[qNum].qa) {
        totalScore++;
    }
    else {
        incorrect++;
    }
    console.log('Console Log');
    // correct.innerText = `${totalScore}/${totalQuestions}`;
    // timer = 5;
    // counter.innerText = timer;
    nextQuestion();
}

function nextQuestion() {
    //Prep
    //aaa
    if (qNum < totalQuestions) {
        // will run until you hit total questions = 20
        qNum++;
        loadQuestion();
    }
    else {
        //load ending page
        // clearInterval(interval);
        // alert("You have finished the game!!");
    }
}

console.log(smArray);
injectHTML('../inject/title.html');
