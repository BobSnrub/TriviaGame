//---------Set and Get Variables----------//

// let domBtn = document.getElementById('dom');
// let randomBtn = document.getElementById('random');
// let directoryBtn = document.getElementById('directory');
// let triviaBtn = document.getElementById('trivia');

//----------Add Event Listeners---------//
// domBtn.addEventListener('click', function (e) {
    //     console.log("clicked dom");
    //     loadHTML('../inject/dom.html');
    // });
    
    // randomBtn.addEventListener('click', function (e) {
        //     loadHTML('../inject/random.html');
        // });
        
        // directoryBtn.addEventListener('click', function (e) {
            //     loadHTML('../inject/directory.html');
            // });
            
            //----------injecting HTML Pages-----------//



            
let injectContent = document.getElementById('inject');
let body = document.getElementById('body');
  

function injectHTML(url) {

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            let myArr = this.responseText;//JSON.parse(this.responseText);
            
            if(url === '../inject/title.html'){
                loadTitle(myArr);
            }
            else if(url === '../inject/menu.html'){
                loadMenu(myArr);
            }
            else if(url === '../inject/game.html'){
                loadGame(myArr);
            }
            else{
                console.log('Check your if statement in InjectHTML');
            }
        }

    };
    //opens connection
    xmlhttp.open("GET", url, true);

    //pulls the request
    xmlhttp.send();

}

function loadTitle(info){
    injectContent.innerHTML = info;
    body.className = 'title-bg';
    //get stuff
    //add event listeners
    let titleToMenuBtn = document.getElementById('titleToMenuBtn').addEventListener('click', function(e){
        injectHTML('../inject/menu.html');
    });
}

function loadMenu(info){
    injectContent.innerHTML = info;
    body.className = 'game-bg';

    let easyBtn = document.getElementById('easyBtn').addEventListener('click', function(){
        injectHTML('../inject/game.html');
    });
    let mediumBtn = document.getElementById('mediumBtn').addEventListener('click', function(){
        injectHTML('../inject/game.html');
    });
    let hardBtn = document.getElementById('hardBtn').addEventListener('click', function(){
        injectHTML('../inject/game.html');
    });
}

function loadGame(info){
    injectContent.innerHTML = info;
    //body.className = 'title-bg';
}


injectHTML('../inject/title.html');