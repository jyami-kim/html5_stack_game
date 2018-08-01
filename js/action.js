
var canvas = document.getElementById("myCanvas"); //canvas 엘리먼트 참조
var ctx = canvas.getContext("2d"); //2d rendering
var rowCard = 4;
var columnCard = 4;
var CardWidth = 340;
var CardHeight = 340;
var margin = 20;
var offset = 10;
var cards = [];
    for(var c=0; c<rowCard; c++){
        cards[c] = [];
        for(var r=0; r<columnCard; r++){
            cards[c][r] = {x: margin + (offset + CardWidth) * c, y:  margin+ (offset + CardWidth) * r, status: 1};
        }
    }

//document.addEventListener("touchstart", clickHandler,false); //click하면 다음 실행

function drawCard(){
    for(var c=0; c<rowCard; c++){
        for(var r=0; r<columnCard; r++){
            if(cards[c][r].status==1){
                ctx.drawImage(img,cards[c][r].x,cards[c][r].y, CardWidth, CardWidth);
                //img
            }
        }
    } 
}

function draw(){
    drawCard();
    
}

setInterval(draw, 10); //함수를 몇번이고 반복해서 실행할 수 있다. 10밀리초마다 실행