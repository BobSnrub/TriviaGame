


let totalScore = 0;
let totalQuestions = 20;
let injectContent = document.getElementById('inject');
let body = document.getElementById('body');
let diff = 0;
let fullArray = [];
let backpArray = [];
let smArray = [];
let incorrect = 0;
let qNum = 0;
let easyArr = [];
let mediumArr = [];
let hardArr = [];

let interval;

//let correct = document.getElementById('correct');


function loadJSON(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {

            if (url === '../data/ezQ.json') {
                easyArr = JSON.parse(this.responseText).ezQ;
            }
            else if (url === '../data/mQ.json') {
                mediumArr = JSON.parse(this.responseText).mQ;
            }
            // else if (url === '../data/hQ.json') {
            //     hardArr = JSON.parse(this.responseText).hQ;
            // }
            else {
                console.log('Check your if statement in loadJSON');
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
loadJSON('../data/ezQ.json');
loadJSON('../data/mQ.json');
loadJSON('../data/hQ.json');

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
            else if (url === '../inject/game.html' && diff === 1) {
                loadGame(myArr, easyArr, 30);
            }
            else if (url === '../inject/game.html' && diff === 2) {
                loadGame(myArr, mediumArr, 20);
            }
            else if (url === '../inject/game.html' && diff === 3) {
                loadGame(myArr, hardArr, 10);
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

    document.getElementById('easyBtn').addEventListener('click', function () {
        diff = 1;
        injectHTML("../inject/game.html");
    });
    document.getElementById('mediumBtn').addEventListener('click', function () {
        diff = 2;
        injectHTML("../inject/game.html");
    });
    document.getElementById('hardBtn').addEventListener('click', function () {
        diff = 3;
        injectHTML("../inject/game.html");
    });
    document.getElementById('modal-back').addEventListener('click', function () {
        console.log("is it working???");
        $('#OptionsModal').modal('hide');
        injectHTML('../inject/title.html');
    });

}

function loadGame(info, arr, triviaTime) {
    let timeCount = triviaTime;
    injectContent.innerHTML = info;
    document.getElementById('modal-menu').addEventListener('click', function () {
        $('#OptionsModal').modal('hide');
        qNum = 0;
        injectHTML('../inject/menu.html');
    });
    document.getElementById('modal-restart').addEventListener('click', function () {
        $('#OptionsModal').modal('hide');
        qNum = 0;
        injectHTML('../inject/game.html');
    });
    interval = setInterval(updateTime, 1000);
    let triviaQ = [];
    genRndArr(arr);
    let counter = document.getElementById('counter');
    let questions = document.getElementById('questions');
    let A1 = document.getElementById('a1');
    let A2 = document.getElementById('a2');
    let A3 = document.getElementById('a3');
    let A4 = document.getElementById('a4');
    A1.addEventListener('click', function (e) {
        console.log("My A1 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A2.addEventListener('click', function (e) {
        console.log("My A2 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A3.addEventListener('click', function (e) {
        console.log("My A3 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A4.addEventListener('click', function (e) {
        console.log("My A4 click event is working");
        checkAnswer(e.toElement.innerText);
    });

    function loadQuestion() {
        // console.log(smArray);
        questions.innerText = triviaQ[qNum].q;
        A1.innerText = triviaQ[qNum].a1;
        A2.innerText = triviaQ[qNum].a2;
        A3.innerText = triviaQ[qNum].a3;
        A4.innerText = triviaQ[qNum].a4;
    }

    function genRndArr(q) {
        for (let i = 0; i < totalQuestions; i++) {
            let rNum = Math.floor(Math.random() * q.length);
            console.log(rNum);
            triviaQ.push(q[rNum]);
            q.splice(rNum, 1);
        }
        // console.log(smArray);
        // console.log(smArray[qNum].q);
        // console.log(backpArray);
    }


    function checkAnswer(answer) {
        //Retrieve the answer and see if it is correct
        //Increment your correct number
        console.log(triviaQ[qNum]);
        if (answer === triviaQ[qNum].qa) {
            totalScore++;
            console.log("correct");
        }
        else {
            incorrect++;
            console.log("incorrect");
        }
        // console.log('test');
        // correct.innerText=`${totalScore}/${totalQuestions}`;
        counter.innerText = triviaTime;
        nextQuestion();
    }

    //aaa
    function nextQuestion() {
        //Prep
        //aaa
        if (qNum < totalQuestions) {
            // will run until you hit total questions = 20
            console.log("next question???");
            qNum++;
            loadQuestion();
        }
        else {
            //load ending page
            clearInterval(interval);
            alert("You have finished the game!!");
        }
        console.log(qNum);
        console.log();
    }

    function updateTime(){
        //Make sure time isn't over and that it's showing correct time
    
        timeCount--;
        if(timeCount == 0){
            timeCount=triviaTime;
            counter.innerText=timeCount;
            nextQuestion();
        }
        else{
            counter.innerText=timeCount;
        }
    }
    loadQuestion();
}


injectHTML('../inject/title.html');


