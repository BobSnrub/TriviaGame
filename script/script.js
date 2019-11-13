let totalQuestions = 20;
let diff = ""; // Can be medium or hard also
let triviaQ = [];

function LoadQuestions() {
    let xmlhttp = new XMLHttpRequest();
    let url = "";

    if (diff == "easy") {
        url = "../data/ezQ.json";
    }
    else if (diff == "medium") {
        url = "../data/mQ.json";
    }
    else if (diff == "hard") {
        url = "../data/hQ.json";
    }
    // else{
    //     url = "../data/ezQ.json";
    // }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            allQuestions(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function allQuestions(q) {
    console.log(q.ezQ[26]);
    let qNum = 0;
    for (let i = 0; i < totalQuestions; i++) {
        qNum = Math.floor(Math.random() * q.ezQ.length);
        //console.log(qNum);
        triviaQ.push(q.ezQ[qNum]);
        q.ezQ.splice(qNum, 1);

    }
    console.log(triviaQ);


}

document.getElementById("easy-diff").addEventListener('click', function(){
    diff = "easy";
});

document.getElementById("med-diff").addEventListener('click', function(){
    diff = "medium";
});

document.getElementById("hard-diff").addEventListener('click', function(){
    diff = "hard";
});

LoadQuestions(diff);