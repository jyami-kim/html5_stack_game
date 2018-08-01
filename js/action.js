
var canvas = document.getElementById("myCanvas"); //canvas 엘리먼트 참조
var ctx = canvas.getContext("2d"); //2d rendering
var rowCard = 4;
var columnCard = 4;
var cards = [];
for(var c=0; c<rowCard; c++){
    cards[c] = [];
    for(var r=0; r<columnCard; r++){
        cards[c][r] = {status: 0};
    }
}

var x = document.getElementsByClassName("cards");
for(var i=0; i<x.length;i++){
    x[i].addEventListener("touchstart", function(e){
        cardClick(e.path[1].id);
    }, false); //click하면 다음 실행
}

function cardClick(card_id){
    console.log(card_id);
    var card_row = parseInt(card_id/10);
    var card_col = card_id % 10;
    var card_num = card_row*4+card_col;
    if(cards[card_row][card_col].status == 0){
        cards[card_row][card_col].status = 1;
        document.getElementsByTagName("img")[card_num].src="img/card1.png";
    }else{
        cards[card_row][card_col].status = 0;
        document.getElementById(card_id).src="../img/card.png";
        document.getElementsByTagName("img")[card_num].src="img/card.png";
    }
}

function check(){
   
}
setInterval(check, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행