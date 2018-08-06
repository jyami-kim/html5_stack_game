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

var ctx = document.getElementById("myCanvas").getContext("2d"); //2d rendering

//타이머
class Time{
    constructor(){
        var now =0; 
        var timer;
        var i = 0;
        var until = 5; 
        var total = 5;
    }
    
  
    start(){
        console.log("start");
        this.timer = self.setInterval(this.increment, (1000 / 100));
    }
    
    increment(){
        function clear() {
            ctx.clearRect(0, 0, 80, 80);
        }
        
        function setTrack() {
            ctx.strokeStyle = '#d6ff00';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(894, 172, 27, 0, Math.PI*2);
            ctx.stroke();
        }
        function setTime() {
            ctx.strokeStyle = '#6E828E';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.arc(
                894,
                172,
                27,
                Math.PI/-2,
                ( Math.PI * 2 ) * ( ( gameTimer.until - gameTimer.now % gameTimer.total ) / gameTimer.total ) + ( Math.PI / -2 ),
                false
            );
            ctx.stroke();
        }
        clear();
        setTrack();
        setTime();
        gameTimer.i += 1 ;

        gameTimer.now = (gameTimer.i /100);
        if(gameTimer.now > 5){
            gameTimer.stop();
        }
    }

    stop(){
        console.log("stop");
        clearInterval(this.timer);
        this.now = null;
    }

    reset(){
        console.log("reset");
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
        var pairNumMax; //같은 이미지 개수 max //
        var pairsNum; // 같은 이미지 개수
        var openpair; // 열리는 카드쌍 개수   (pairNum <= openpair)
        var stage; //newstage마다 갱신
        var level; //stage 10 마다 level 1up > 이미지 카드 배열 종류 변화
        //level 1up 마다 pairnum max++
        //level 2up 마다 image_group 변화 > 같은 이미지 배치
    }
    init(){ // 게임 시작할 때
        this.pairNumMax = 3;
        this.pairNumMin = 1;
        this.stage = 1;
        this.level = 1;
    }
    stagestart(){//스테이지
        var x = randomNum(this.pairNumMax)+1;
        this.pairNum = x;
        this.openpair = randomNum(8)+1;
    }
}



class Game{
    constructor(){
        this.previousClick;
        this.cards = [];
        this.pairGroup = [];
        this.image_group = [];
    }

    init(obj){
        console.log("init 시작");
        //previousClick init
        this.previousClick = {check: false, myCard: null};

        console.log("imagegroup 시작");
        //image_group init
        for(var i=0; i<=58; i++){
            this.image_group[i] = "img/"+i+".png";
        }
        
        console.log("cards init 시작");
        //cards init
        for(var r=0; r<rowCard; r++){
            this.cards[r] = [];
            for(var c=0; c<columnCard; c++){
                this.cards[r][c] = {id: r*10+c ,status: 0, pair: [], image: null};
            }
        }
        
        console.log("pairgroup init 시작");
        //pairgroup init
        for(var i = 0 ; i<obj.openpair ; i++){
            this.pairGroup[i] = {image: null, pair: []};
        }
        console.log("init 끝");
        this.randpair(obj);
    }

    randpair(obj){
        console.log("randpair 시작");
        function pairGroupImageSame(obj,img, level){
            for(var i =0; i<level.openpair; i++){
                if(obj[i].image != img){
                    continue;
                }
                return [true, i];
            }
            return [false, 0];
        }

        function pairGroupNext(obj, level){
            for(var i =0 ; i<level.openpair; i++){
                if(obj[i].image ==null){
                    return i;
                }
            }
            return 0
        }



        function randomCard(obj){
            var card_r = randomNum(4);
            var card_c = randomNum(4);
            var randcard = obj[card_r][card_c];
            return randcard;
        }

        var i = 0;
        while(i < obj.openpair){ // 4개 쌍이 정해질 때 까지 반복
        var card1 = randomCard(this.cards);
        do{
            var card2 = randomCard(this.cards);
            }while(card1.id == card2.id);

            //card1과 card2가 다른 값이 나올때까지 반복한다.

            //card1과 card2 image가 둘다 null 일때 다음 함수를 실행한다.
            if(card1.image == null && card1.image == null){
                var newImage = this.image_group[randomNum(this.image_group.length)];

                var check = pairGroupImageSame(this.pairGroup,newImage, gameLevel);

                if(check[0]){ //같은이미지가 있다
                    var putting = check[1];
                }else{//같은 이미지가 없다
                    var putting = pairGroupNext(this.pairGroup, gameLevel);
                }

                //pair 쌍 이미지 생성, 링크 연결
                this.pairGroup[putting].image = newImage;
                card1.image = this.pairGroup[putting].image;
                card2.image = this.pairGroup[putting].image;

                //pair 쌍 배열에 push, 링크 연결
                this.pairGroup[putting].pair.push(card1.id);
                this.pairGroup[putting].pair.push(card2.id);
                card1.pair.push(this.pairGroup[putting].pair);
                card2.pair.push(this.pairGroup[putting].pair);  

                
                //image 있음 상태 status
                card1.status = 1;
                card2.status = 1;

                i++
            }
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
        myTimer = setTimeout(this.imagereset, 5000);
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
newStage(game,gameTimer,gameLevel);


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

function cardClick(obj,card_id){
    if(!clickEve){
        clearTimeout(myTimer);
        obj.imagereset();
        clickEve = true;
        gameTimer.stop();
    }
    var card_row = parseInt(card_id/10);
    var card_col = card_id % 10;
    var card_num = card_row*4+card_col;
    var clickCard = obj.cards[card_row][card_col];
    clickCard.id = parseInt(card_id);
    console.log("cardClick");
    console.log(clickCard);
    if(clickCard.status == 1){ //카드 있음 상태
        document.getElementsByTagName("img")[card_num].src=clickCard.image;
        cardCheck(obj,card_row, card_col);
    }else{ // 카드 없음 상태
        newStage(obj,gameTimer,gameLevel);
    }
}

function cardCheck(obj,r,c){
    var preClick = obj.previousClick;
    clickNum++;
    if(preClick.check == false){
        preClick.check = true;
        preClick.myCard = obj.cards[r][c];
    }else{
        var previousClickId = obj.cards[r][c].id;
        if(findArray(previousClickId, preClick.myCard.pair[0])){ // 같은 pair일 경우
            obj.previousClick.check = false;
            obj.previousClick.myCard = null;
            console.log(preClick);
            if(clickNum == gameLevel.openpair*2){
                newStage(obj,gameTimer,gameLevel);
            }
        }else{
            newStage(obj,gameTimer,gameLevel);
        }
    }
}

function newStage(game, gameTimer, gameLevel){
    console.log("newStage");
    clickNum = 0;
    gameTimer.reset();
    gameLevel.stagestart();
    game.init(gameLevel);
    // obj.randpair();
    clickEve = false;
    for(var i = 0; i<4;i++){
        console.log(game.cards[i]);
    }
    for(var i =0; i<gameLevel.openpair; i++){
        console.log(game.pairGroup[i]);
    }
}

//게임 객체 생성


//card 뒤집는 event
var x = document.getElementsByClassName("cards");
for(var i=0; i<x.length;i++){
    x[i].addEventListener("touchstart", function(e){
        cardClick(game,e.path[1].id);
    }, false); //click하면 다음 실행
}


// setInterval(function(){
//     console.log(a);
// }, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행

// function check(){

// }

