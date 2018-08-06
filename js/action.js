
//상수설정
const rowCard = 4;
const columnCard = 4;

var myTimer = 0;

//첫번째 클릭 확인
var clickEve = false;
//이게 openpair*2와 같아지면 그 stage 클리어
var clickNum;

//random함수
function randomNum(num){
    return Math.floor(Math.random()*num);
}

//card 뒤집는 event

var el = document.getElementById("table");
el.addEventListener("touchstart", function(e){
    console.log(e.path[1].id);
    cardClick(game,e.path[1].id);
}, false);

var ctx = document.getElementById("myCanvas").getContext("2d"); //2d rendering
function hello(){
    console.log("testhello");
}

//타이머
class Time{
    constructor(){ 
        var now =0; 
        var timer;
        var i = 0;
        var until = 2;
        var total = 5;
    }
    start(){
        this.timer = self.setInterval(this.increment, (1000 / 100));
    }
    
    increment(){
        function setTrack() {
            ctx.strokeStyle = '#d6ff00';
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.arc(880, 160, 40, 0, Math.PI*2);
            ctx.stroke();
        }
        function setTime() {
            ctx.strokeStyle = '#6E828E';
            ctx.lineWidth = 18;
            ctx.beginPath();
            ctx.arc(
                880,
                160,
                40,
                Math.PI/-2,
                ( Math.PI * 2 ) * ( ( gameTimer.until - gameTimer.now % gameTimer.total ) / gameTimer.total ) + ( Math.PI / -2 ),
                false
            );
            ctx.stroke();
        }
        setTrack();
        setTime();
        gameTimer.i += 2 ;

        gameTimer.now = (gameTimer.i /100);
        if(gameTimer.now > 5){
            gameTimer.stop();
        }
    }

    stop(){
        clearInterval(this.timer);
        this.now = null;
    }
    reset(){
        this.stop();
        this.i = 0;
        this.total = 5;
        this.until = 5;
        this.start();
    }
}

//변하는 것! (게임 난이도 조정)
class Level{
    constructor(){
        var pairNumMax; //같은 이미지 배열 개수 max //
        var pairsNum; // 같은 이미지 배열 개수
        var openpair; // 열리는 카드쌍 개수   (pairNum <= openpair)
        var stage; //newstage마다 갱신
        var level; //stage 10 마다 level 1up > 이미지 카드 배열 종류 변화
        var score;
        //level 1up 마다 pairnum max++
        //level 2up 마다 image_group 변화 > 같은 이미지 배치
    }
    init(){ // 게임 시작할 때
        this.pairNumMax = 3;
        this.stage = 1;
        this.level = 1;
        this.score = 0;
    }
    stagestart(){//스테이지
        var x = randomNum(this.pairNumMax)+1;
        this.pairNum = x;
        this.openpair = randomNum(8)+1;
        this.score += 100*this.level; //stage clear 추가점수
        if(this.stage%10 == 0){
            this.level +=1;
            if(this.level %2 == 1){
                this.pairNumMax +=1;
            } 
        }
        this.start();
    }
    start(){
        self.setInterval(this.scoreup, 10);
    }
    scoreup(){
        var scr = gameLevel.score
        
        ctx.clearRect(70, 80, 500, 100);
        ctx.font="50px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(scr,100,165);
    }
}

class Game{
    constructor(){
        this.previousClick;
        this.cards = [];
        this.pairGroup = [];
        this.image_group = [];
    }

    init(){
        //previousClick init
        this.previousClick = {check: false, myCard: null};

        //image_group init
        var folder = parseInt((gameLevel.level+1)/2);
        for(var i=0; i<14; i++){
            this.image_group[i] = "img/"+folder+"/"+i+".png";
        }

        //cards init
        for(var r=0; r<rowCard; r++){
            this.cards[r] = [];
            for(var c=0; c<columnCard; c++){
                this.cards[r][c] = {id: r*10+c ,status: 0, image: null};
            }
        }
        //pairgroup init
        for(var i = 0 ; i<gameLevel.pairNum ; i++){
            this.pairGroup[i] = {image: null, pair: []};
        }

        this.randpair();
    }

    randpair(){

        
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        
        var left = gameLevel.openpair;
        var cardId = [];
        for(var r = 0; r<4; r++){
            for(var c=0; c<4; c++){
                cardId[r*4+c] = r*10+c;
            }
        }

        //image random

        var i = 0;
        var array = this.image_group.slice();

        while(i < gameLevel.pairNum){ 
            var randIndex = randomNum(array.length)
            var randValue = array[randIndex];
            array.splice(randIndex, 1);

            this.pairGroup[i].image = randValue;
            i++
        }
        
        cardId = shuffle(cardId); //배열 랜덤

        function register(obj,index){
            // console.log(cardId);
            var pop = cardId.pop();
            // console.log(pop);
            // console.log(left);
            // console.log(gameLevel.openpair);
            var r = parseInt(pop/10);
            var c = pop%10;
            
            obj.pairGroup[index].pair.push(pop);
            obj.cards[r][c].status =1;
            obj.cards[r][c].image = obj.pairGroup[index].image;
        }
        
        for(var i=0; i<gameLevel.pairNum;i++){
            if(left ==0){
                break;
            }
            register(this,i);
            register(this,i);
            left -= 1;
        }        
        while(left !== 0){
            var index = randomNum(gameLevel.pairNum);
            register(this,index);
            register(this,index);
            left -= 1;
        }

        console.log("randpair 끝");

        this.show();
    } 

    show(){
        console.log("show 시작");
        for(var r=0; r<rowCard; r++){
            for(var c=0; c<columnCard; c++){
                var card_num = r*4+c;
                var showcard =this.cards[r][c].image;
                if(showcard == null){
                    document.getElementsByTagName("img")[card_num].src = "img/default.png";
                }else{
                    document.getElementsByTagName("img")[card_num].src=showcard;
                }
            }
        }
        
        console.log("show 끝"); 
        myTimer = setTimeout(this.imagereset, 3000);
    }

    imagereset(){
        console.log("imagereset 시작")
        // image reset
        for(var r = 0; r<rowCard; r++){
            for(var c =0 ; c<columnCard; c++){
                var id = r*4+c;
                document.getElementsByTagName("img")[id].src="img/default.png";
            }
        }
        console.log("imagereset 끝");
    }
}


var game = new Game();
var gameTimer = new Time();
var gameLevel = new Level();

gameLevel.init();
newStage();


//배열안 요소 찾는 함수
function findArray(find, array){
    for(var i=0; i<array.length; i++){
        if(find == array[i]){
            return true;
        }
    }
    return false;
}

//카드 쌍 무작위 선택 + 카드 쌍 저장
var alreadys= [];

function cardClick(obj,card_id){
    if(!clickEve){
        var timeLeft = parseInt(gameTimer.until -gameTimer.now);
        clearTimeout(myTimer);
        obj.imagereset();
        clickEve = true;
        gameTimer.stop();
        if(!timeLeft == 5){
            gameLevel.score += timeLeft;
        }
    }
    var checking = (alreadys.includes(parseInt(card_id)));
    alreadys.push(parseInt(card_id));
    var card_row = parseInt(card_id/10);
    var card_col = card_id % 10;
    var card_num = card_row*4+card_col;
    var clickCard = obj.cards[card_row][card_col];
    clickCard.id = parseInt(card_id);
    console.log("cardClick");
    console.log(clickCard);
    if(clickCard.status == 1 && !checking){ //카드 있음 상태
        document.getElementsByTagName("img")[card_num].src=clickCard.image;
        cardCheck(card_row, card_col);
    }else{ // 카드 없음 상태
        endStage();
        // top.location.href = 'end.html';
    }
    
}

function checkobj(chimg, pgroup){
    for(var i=0; i<pgroup.length; i++){
        if(pgroup[i].image == chimg){
            return i;
        }
    }
}

function cardCheck(r,c){
    var preClick = game.previousClick;
    clickNum++;

    if(preClick.check == false){ // 첫번째 짝
        console.log("첫번째 짝")
        preClick.check = true;
        console.log(game.cards[r][c].id);
        preClick.myCard = game.cards[r][c].id;
        gameLevel.score += gameLevel.level*5;
    }else{
        var groupi = checkobj(game.cards[r][c].image,game.pairGroup);
        console.log(game.previousClick.myCard);
        
        var previousClickId = game.previousClick.myCard;
        var check = findArray(previousClickId, game.pairGroup[groupi].pair);
        if(check){ // 같은 pair일 경우
            console.log("두번째 짝");
            game.previousClick.check = false;
            game.previousClick.myCard = null;
            gameLevel.score += gameLevel.level*5;
            if(clickNum == gameLevel.openpair*2){
                console.log("stage 클리어");
                newStage();
            }
        }else{
            console.log("stage 탈락");
            endStage();
            // top.location.href = 'end.html';
        }
    }
    console.log(preClick);
    console.log(clickNum);
    console.log(gameLevel.openpair);
}

function endStage(){
    console.log(gameLevel.score);
    document.getElementById("output").style.display = 'block';
    document.getElementById("score").innerHTML = gameLevel.score;
}

function newStage(){
    document.getElementById("output").style.display = 'none';
    console.log("newStage");
    clickNum = 0;
    gameTimer.reset();
    gameLevel.stagestart();

    game.init();
    clickEve = false;
    alreadys = [];
    console.log(gameLevel);
    for(var i = 0; i<4;i++){
        console.log(game.cards[i]);
    }
    for(var i =0; i<gameLevel.pairNum; i++){
        console.log(game.pairGroup[i]);
    }
}

// setInterval(test,10);

// function test(){
//     console.log(parseInt(gameTimer.until -gameTimer.now));
// }


