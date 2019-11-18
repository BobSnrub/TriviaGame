injectHTML('../inject/title.html');



let totalScore = 0;
let totalQuestions = 20;
let diff = 0;
let incorrect = 0;
let qNum = 0;
let easyArr = [];
let mediumArr = [];
let hardArr = [];
let interval;
let bonusNum = 0;

let injectContent = document.getElementById('inject');
let body = document.getElementById('body');


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
            else if (url === '../data/hQ.json') {
                hardArr = JSON.parse(this.responseText).hQ;
            }
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
                loadGame(myArr, mediumArr, 15);
            }
            else if (url === '../inject/game.html' && diff === 3) {
                loadGame(myArr, hardArr, 5);
            }
            else if (url === '../inject/endPage.html') {
                test(myArr);
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
    document.getElementById('titleToMenuBtn').addEventListener('click', function (e) {
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
        // console.log("is it working???");
        $('#OptionsModal').modal('hide');
        injectHTML('../inject/title.html');
    });

}

function loadGame(info, arr, triviaTime) {
    let timeCount = triviaTime;
    injectContent.innerHTML = info;
    document.getElementById('modal-menu').addEventListener('click', function () {
        $('#OptionsModal').modal('hide');
        injectHTML('../inject/menu.html');
        totalScore = 0
        totalQuestions = 20;
        incorrect = 0;
        qNum = 0;
        easyArr = [];
        mediumArr = [];
        hardArr = [];
        clearInterval(interval);
        loadJSON('../data/ezQ.json');
        loadJSON('../data/mQ.json');
        loadJSON('../data/hQ.json');
    });
    document.getElementById('modal-restart').addEventListener('click', function () {
        $('#OptionsModal').modal('hide');
        totalScore=0;
        document.getElementById('cor').innerText = totalScore;
        qNum = 0;
        bonusNum = 0;
        document.getElementById('bon').innerText = bonusNum;
        incorrect = 0;
        document.getElementById('incor').innerText = incorrect;
        clearInterval();
        timeCount = triviaTime;
        updateTime();
        nextQuestion();
    });
    interval = setInterval(updateTime, 1000);
    let triviaQ = [];
    genRndArr(arr);
    let counter = document.getElementById('counter');
    let scoreCount = document.getElementById('scoreCount');
    let questions = document.getElementById('questions');
    let A1 = document.getElementById('a1');
    let A2 = document.getElementById('a2');
    let A3 = document.getElementById('a3');
    let A4 = document.getElementById('a4');
    A1.addEventListener('click', function (e) {
        // console.log("My A1 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A2.addEventListener('click', function (e) {
        // console.log("My A2 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A3.addEventListener('click', function (e) {
        // console.log("My A3 click event is working");
        checkAnswer(e.toElement.innerText);
    });
    A4.addEventListener('click', function (e) {
        // console.log("My A4 click event is working");
        checkAnswer(e.toElement.innerText);
    });

    function loadQuestion() {
        // console.log(smArray);
        questions.innerText = triviaQ[qNum].q;
        console.log(triviaQ[qNum].qa);
        A1.innerText = triviaQ[qNum].a1;
        A2.innerText = triviaQ[qNum].a2;
        A3.innerText = triviaQ[qNum].a3;
        A4.innerText = triviaQ[qNum].a4;
    }

    loadQuestion();

    function genRndArr(q) {
        for (let i = 0; i < totalQuestions; i++) {
            let rNum = Math.floor(Math.random() * q.length);
            // console.log(rNum);
            triviaQ.push(q[rNum]);
            q.splice(rNum, 1);
        }
        console.log(triviaQ);
        console.log(q);
    }


    function checkAnswer(answer) {
        //Retrieve the answer and see if it is correct
        //Increment your correct number
        console.log(triviaQ[qNum]);
        if (answer === triviaQ[qNum].qa) {
            totalScore++;
            bonusNum++;
            if (bonusNum === 5 && incorrect !== 0) {
                incorrect = incorrect - 1;
                document.getElementById('incor').innerText = incorrect;
                bonusNum = 0;
            }
            console.log("correct");
            scoreCount.innerText = `${totalScore}/${totalQuestions}`;
            document.getElementById('cor').innerText = totalScore;
            nextQuestion();
        }
        else {
            incorrect++;
            bonusNum = 0;
            console.log(incorrect);
            console.log("incorrect");
            document.getElementById('incor').innerText = incorrect;
            nextQuestion();
        }
        // console.log('test');
        timeCount = triviaTime;
        counter.innerText = timeCount;

        console.log(qNum);
        console.log();
    }

    //aaa
    function nextQuestion() {
        //Prep
        //aaa

        if (qNum < totalQuestions - 1) {
            // will run until you hit total questions = 20
            //console.log("next question???");
            qNum++;
            document.getElementById('bon').innerText = bonusNum;
            loadQuestion();
        }
        else {
            //load ending page
            clearInterval(interval);
            injectHTML('../inject/endPage.html');
        }
    }

    function updateTime() {
        //Make sure time isn't over and that it's showing correct time

        if (timeCount == 0) {
            timeCount = triviaTime;
            incorrect++;
            document.getElementById('incor').innerText = incorrect;
            counter.innerText = timeCount;
            nextQuestion();
        }
        else {
            counter.innerText = timeCount;
        }
        timeCount--;
    }
}

function test(stuff) {
    injectContent.innerHTML = stuff;
    document.getElementById('endPage-cor').innerText = totalScore;
    document.getElementById('endPage-incor').innerText = incorrect;
    document.getElementById('endPage-scoreCount').innerText = `${totalScore}/${totalQuestions}`;

    document.getElementById('modal-menu').addEventListener('click', function () {
        injectHTML('../inject/menu.html');
        totalScore = 0;
        incorrect = 0;
        totalQuestions = 20;
        qNum = 0;
        easyArr = [];
        mediumArr = [];
        hardArr = [];
        clearInterval(interval);
        loadJSON('../data/ezQ.json');
        loadJSON('../data/mQ.json');
        loadJSON('../data/hQ.json');
    });
}
