
// var canvas = document.getElementById("myCanvas"); //canvas 엘리먼트 참조
// var ctx = canvas.getContext("2d"); //2d rendering

//상수설정
const rowCard = 4;
const columnCard = 4;

//난수 함수
function randomNum(num){
    return Math.floor(Math.random()*num);
}

//변하는 것! (게임 난이도 조정)
var openpair = 4;
var stage = 1;
var level = 1;

var previousClick = {check: false, myCard: null};
var cards = [];
var pairGroup = [];
var image_group = [];


//이미지 초기화 // 레벨 조정시 초기화 필요
function initImage(){
    for(var i=0; i<=8; i++){
        image_group.push( "img/"+i+".png");   
    }
}

// 현재클릭 초기화
function initpreviousClick(){
    previousClick = {check: false, myCard: null};
}

// pairGroup 변수 설정 > pair짝들의 객체 생성 //다시 초기화 필요
function initPairGroup(){
    for(var i = 0 ; i<openpair ; i++){
        pairGroup[i] = {image: null, pair: []};
    }
}

//  card 배열 초기화  + 이미지 초기화//다시 초기화 필요
 function initCards(){
    for(var r=0; r<rowCard; r++){
        cards[r] = [];
        for(var c=0; c<columnCard; c++){
            cards[r][c] = {id: r*10+c ,status: 0, pair: [], image: "img/default.png"};
        }
    }
 }

//메소드

function pairGroupImageSame(img){
    for(var i =0; i<openpair; i++){
        if(pairGroup[i].image != img){
            continue;
        }
        return [true, i];
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

//카드 무작위 선택
function randomCard(){
    var card_r = randomNum(4);
    var card_c = randomNum(4);
    return cards[card_r][card_c];
}

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
function randpair(){
    var i = 0;
    console.log("randpair not work2");
    while(i < openpair){ // 4개 쌍이 정해질 때 까지 반복
        console.log("randpair not work3");
       var card1 = randomCard();
       console.log("randpair not work4");
       do{
        console.log("randpair not work5");
           var card2 = randomCard();
           console.log("randpair not work6");
        }while(card1.id == card2.id);

        //card1과 card2가 다른 값이 나올때까지 반복한다.

        //card1과 card2 image가 둘다 null 일때 다음 함수를 실행한다.
        if(card1.image == null && card1.image == null){
            console.log("randpair not work7");
            var newImage = image_group[randomNum(image_group.length)];
            console.log("randpair not work8");
            console.log(newImage);

            var check = pairGroupImageSame(newImage);
            console.log("randpair not work9");
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

//card 뒤집는 event
var x = document.getElementsByClassName("cards");
for(var i=0; i<x.length;i++){
    x[i].addEventListener("click", function(e){
        cardClick(e.path[1].id);
    }, {passive: true}); //click하면 다음 실행
}

function cardClick(card_id){
    var card_row = parseInt(card_id/10);
    var card_col = card_id % 10;
    var card_num = card_row*4+card_col;
    cards[card_row][card_col].id = parseInt(card_id);
    console.log("cardClick");
    console.log(cards[card_row][card_col]);
    if(cards[card_row][card_col].status == 1){ //카드 있음 상태
        cardCheck(card_row, card_col);
        document.getElementsByTagName("img")[card_num].src=cards[card_row][card_col].image;
    }else{ // 카드 없음 상태
        newStage();
    }
}

function cardCheck(r,c){
    if(previousClick.check == false){
        previousClick.check = true;
        previousClick.myCard = cards[r][c];
        console.log("짝0");
        console.log(previousClick);
    }else{
        var previousClickId = r*10+c;
        console.log(previousClick);
        if(findArray(previousClickId, previousClick.myCard.pair[0])){ // 같은 pair일 경우
            initpreviousClick();
            console.log("짝1");
        }else{
            newStage();
        }
    }
}

function newStage(){
    console.log("newStage");
    initImage();
    initCards();
    initpreviousClick();
    initPairGroup();
    console.log("randpair not work");
    randpair();
    
    for(var i = 0; i<4;i++){
        console.log(cards[i]);
    }
    for(var i =0; i<openpair; i++){
        console.log(pairGroup[i]);
    }
}

newStage();



// function check(){
    
// }

// setInterval(check, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행

// function show(){
//     setTimeout(function(){ 
//         for(var r=0; r<rowCard; r++){
//             for(var c=0; c<columnCard; c++){
//                 card_num = r*4+c;
//                 document.getElementsByTagName("img")[card_num].src=cards[r][c].image;}
//             }
//         }, 3000);
//     for(var r=0; r<rowCard; r++){
//         for(var c=0; c<columnCard; c++){
//             card_num = r*4+c;
//             document.getElementsByTagName("img")[card_num].src="img/default.png";
//         }
//     }
// }
