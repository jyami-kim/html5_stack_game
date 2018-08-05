var canvas = document.getElementById("myCanvas"); //canvas 엘리먼트 참조
var ctx = canvas.getContext("2d"); //2d rendering


//상수설정
const rowCard = 4;
const columnCard = 4;

//변하는 것! (게임 난이도 조정)
var openpair = 4;
var stage = 1;
var level = 1;

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
        for(var i=0; i<=8; i++){
            this.image_group[i] = "img/"+i+".png";   
        }
        //cards init
        for(var r=0; r<rowCard; r++){
            this.cards[r] = [];
            for(var c=0; c<columnCard; c++){
                this.cards[r][c] = {id: r*10+c ,status: 0, pair: [], image: null};
            }
        }
        //pairgroup init
        for(var i = 0 ; i<openpair ; i++){
            this.pairGroup[i] = {image: null, pair: []};
        }
        //image reset
        for(var r = 0; r<rowCard; r++){
            for(var c =0 ; c<columnCard; c++){
                var id = r*4+c;
                document.getElementsByTagName("img")[id].src="img/default.png";
            }
        }
    }

    randpair(){
        function pairGroupImageSame(obj,img){
            for(var i =0; i<openpair; i++){
                if(obj[i].image != img){
                    continue;
                }
                return [true, i];
            }
            return [false, 0];
        }

        function pairGroupNext(obj){
            for(var i =0 ; i<openpair; i++){
                if(obj[i].image ==null){
                    return i;
                }
            }
            return 0
        }

        function randomNum(num){
            return Math.floor(Math.random()*num);
        }

        function randomCard(obj){
            var card_r = randomNum(4);
            var card_c = randomNum(4);
            var randcard = obj[card_r][card_c];
            return randcard;
        }

        var i = 0;
        while(i < openpair){ // 4개 쌍이 정해질 때 까지 반복
        var card1 = randomCard(this.cards);
        do{
            var card2 = randomCard(this.cards);
            }while(card1.id == card2.id);

            //card1과 card2가 다른 값이 나올때까지 반복한다.

            //card1과 card2 image가 둘다 null 일때 다음 함수를 실행한다.
            if(card1.image == null && card1.image == null){
                var newImage = this.image_group[randomNum(this.image_group.length)];

                var check = pairGroupImageSame(this.pairGroup,newImage);

                if(check[0]){ //같은이미지가 있다
                    var putting = check[1];
                }else{//같은 이미지가 없다
                    var putting = pairGroupNext(this.pairGroup);
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

    }
    // show(){
    //     setTimeout(function(){ 
    //         for(var r=0; r<rowCard; r++){
    //             for(var c=0; c<columnCard; c++){
    //                 card_num = r*4+c;
    //                 document.getElementsByTagName("img")[card_num].src=cards[r][c].image;}
    //             }
    //         }, 3000);
    // }
}

var game = new Game();
newStage(game);


//난수 함수



//메소드




//카드 무작위 선택


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
        newStage(obj);
    }
}

function cardCheck(obj,r,c){
    console.log("이미지 로드");
    var preClick = obj.previousClick;
    if(preClick.check == false){
        preClick.check = true;
        preClick.myCard = obj.cards[r][c];
        console.log("짝0");
        console.log(preClick);
    }else{
        var previousClickId = obj.cards[r][c].id;
        console.log("array = " +  preClick.myCard.pair);
        console.log("find = " + previousClickId);
        if(findArray(previousClickId, preClick.myCard.pair[0])){ // 같은 pair일 경우
            console.log("짝1");
            obj.previousClick.check = false;
            obj.previousClick.myCard = null;
            console.log(preClick);
        }else{
            console.log("짝 틀림")
            newStage(obj);
        }
    }
}

function newStage(obj){
    console.log("newStage");
    
    obj.init();
    obj.randpair();

    for(var i = 0; i<4;i++){
        console.log(obj.cards[i]);
    }
    for(var i =0; i<openpair; i++){
        console.log(obj.pairGroup[i]);
    }

    // obj.show();
}

//게임 객체 생성


//card 뒤집는 event
var x = document.getElementsByClassName("cards");
for(var i=0; i<x.length;i++){
    x[i].addEventListener("click", function(e){
        cardClick(game,e.path[1].id);
    }, false); //click하면 다음 실행
}

// function check(){
    
// }

// setInterval(check, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행

