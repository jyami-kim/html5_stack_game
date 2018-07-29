# html5_stack_game
html5 기반 스낵게임 제작

## basic
> pharser 가져오기
>> 게임을 렌더링하고 제어하기 위한 Javascript 코드
>> <pre><code>
<script src="js/phaser.min.js"></script>
</code></pre>

> game 객체 초기화
>>(width, height,렌더링 방법, id, {게임 루프})
렌더링 방법 - 세가지 옵션 (AUTO, CANVAS,WEBGL)

>> + CANVAS, WEBGL : AUTO 보다 좀더 명확하게 Phaser를 정의할 수 있다.
일반적으로 브라우저에서 사용 가능한 경우 WebGL을 사용하고 그렇지 않은경우 CANVAS 2D로 사용한다.
>> - id : canvas의 id 값은 이미 존재하는 페이지가 있고 렌더링 해야하는 경우에 사용한다.
우리는 Phaser가 자체적으로 만들어 지길 원하기 때문에 null로 설정하였다 (이해가 안된다ㅠ)
>> * 게임을 각각의 프레임마다 update하고 start, load하기 위한 Phaser의 세가지 function이다.
>>  * preload: asset들을 preloading 하는 것을 다룬다. 
>>  * create: 모든 것이 load되고 준비가 되었을때 딱 한번 실행된다.
>>  * update: 모든 프레임에서 실행된다.
>> <pre><code>
var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
      preload: preload, create: create, update: update
    });
</code></pre>

## scale
>Phaser scale 객체
>scale: 게임 캔버스가 다른 화면 크기에 따라 어떻게 scale되는 지를 나타낸다. preload 단계에서 자동으로 게임 크기를 모든 화면 크기에 맞출 수 있다.
>>scaleMode: 캔버스의 크기를 조정 하는 옵션
>> + NO_SCALE: 크기가 아무것도 조정되지 않는다.
>> + EXACT_FIT : width, height 비율 보존하지 않고 캔버스가 무조껀 사용가능 한 공간을 채운다.
>> + SHOW_ALL: 캔버스의 크기를 조정하지만 가로 세로 비율을 변경하지 않는다. (EXACT_FIT처럼 이미지 비율이 이상해 지지 않는다.)
>> 화면가장자리에 검은 줄무늬가 보인다.
>> + RESIZE: 사용가능한 너비와 높이와 같은 크기의 캔버스를 만든다.
>> 게임 내부에 개체를 동적으로 배치해야한다. (사이즈에 맞춰서 일일히 코딩해야한다..))
>> + USER_SCALE: 사용자 정의 동적 크기조절, 크기, 비율, 비율계산 
>> 캔버스의 크기를 동적으로 배치한다
>>pageAlign: 캔버스를 가로, 세로 정렬을한다. 크기와 상관없이 항상 화면 중앙에 배치된다.
>> <pre><code>
    function preload() {
        game.scale.scaleMode = Parsher.ScaleManger.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    }
</code></pre>
>사용자 정의 캔버스 배경색 추가
>>stage 객체
>>backgroundColor라는 CSS 색상 정의 구문을 사용해서 설정한다.
>><pre><code> game.stage.backgroundColor = '#eee';</code></pre>
