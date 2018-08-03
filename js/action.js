
var canvas = document.getElementById("myCanvas"); //canvas 엘리먼트 참조
var ctx = canvas.getContext("2d"); //2d rendering

//상수설정
const rowCard = 4;
const columnCard = 4;

//이미지 초기화
var image_group = [];
for(var i=0; i<=8; i++){
    image_group[i] = "img/"+i+".png";   
}

//난수 함수
function randomNum(num){
    return Math.floor(Math.random()*num);
}


//변하는 것!
//정답인 pair의 개수
var openpair = 4;
var stage = 0;

//pairGroup 변수 설정 > pair짝들의 객체 생성 //다시 초기화 필요
var pairGroup = [];
for(var i = 0 ; i<openpair ; i++){
    pairGroup[i] = {image: null, pair: []}
}

function pairGroupImageSame(image){
    for(var i =0; i<openpair; i++){
        if(pairGroup[i].image != image){
            continue;
        }
        return [true, i]
    }
    return [false, 0];
}

function pairGroupNext(){
    for(var i =0 ; i<openpair; i++){
        if(pairGroup[i].image ==null){
            return i;
        }
    }
    return 0
}

 //card 배열 초기화 //다시 초기화 필요
var cards = [];
for(var c=0; c<rowCard; c++){
    cards[c] = [];
    for(var r=0; r<columnCard; r++){
        cards[c][r] = {id: c*10+r ,status: 0, pair: [], image: null};
    }
}

//카드 무작위 선택
function randomCard(){
    var card_r = randomNum(4);
    var card_c = randomNum(4);
    return cards[card_r][card_c];
}

//card 뒤집는 event
var x = document.getElementsByClassName("cards");
for(var i=0; i<x.length;i++){
    x[i].addEventListener("touchstart", function(e){
        cardClick(e.path[1].id);
    }, false); //click하면 다음 실행
}

function cardClick(card_id){
    var card_row = parseInt(card_id/10);
    var card_col = card_id % 10;
    var card_num = card_row*4+card_col;
    console.log("card");
    console.log(cards[card_row][card_col]);
    if(cards[card_row][card_col].status == 1){ //카드 있음 상태
        document.getElementsByTagName("img")[card_num].src=cards[card_row][card_col].image;
    }
}

//카드 쌍 무작위 선택 + 카드 쌍 저장
function randpair(){
    var i = 0;
    while(i < openpair){
       var card1 = randomCard();
       do{
           var card2 = randomCard();
       }
       while(card1.id == card2.id)
        if(card1.image == null && card1.image == null){
            var newImage = image_group[randomNum(image_group.length)];
            console.log(newImage);
            var check = pairGroupImageSame(newImage);
            console.log(check);
            if(check[0]){ //같은이미지가 있다
                var putting = check[1];
                console.log("같은이미지" + putting);
            }else{//같은 이미지가 없다
                var putting = pairGroupNext();
                console.log("다른이미지" + putting);
            }
            //pair 쌍 이미지 생성, 링크 연결
            pairGroup[putting].image = newImage;
            card1.image = pairGroup[putting].image;
            card2.image = pairGroup[putting].image;

            //pair 쌍 배열에 push, 링크 연결
            pairGroup[putting].pair.push(card1.id);
            pairGroup[putting].pair.push(card2.id);
            card1.pair.push(pairGroup[putting].pair);
            card2.pair.push(pairGroup[putting].pair);  

            //image 있음 상태 status
            card1.status =1;
            card2.status =1;

            i++
            console.log("card1");
            console.log(card1);
            console.log("card2");
            console.log(card2);
        }
    }
}

randpair();

for(var i = 0; i<4;i++){
    console.log(cards[i]);
}
for(var i =0; i<openpair; i++){
    console.log(pairGroup[i]);
}

function check(){

}

setInterval(check, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행