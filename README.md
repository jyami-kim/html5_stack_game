# html5_stack_game
html5 기반 스낵게임 제작

## basic
> pharser 가져오기
게임을 렌더링하고 제어하기 위한 Javascript 코드
<pre><code>
<script src="js/phaser.min.js"></script>
</code></pre>

>game 객체 초기화
(width, height,렌더링 방법, id, {게임 루프})
렌더링 방법 - 세가지 옵션 (AUTO, CANVAS,WEBGL)

+ CANVAS, WEBGL : AUTO 보다 좀더 명확하게 Phaser를 정의할 수 있다.
일반적으로 브라우저에서 사용 가능한 경우 WebGL을 사용하고 그렇지 않은경우 CANVAS 2D로 사용한다.
+ id : canvas의 id 값은 이미 존재하는 페이지가 있고 렌더링 해야하는 경우에 사용한다.
우리는 Phaser가 자체적으로 만들어 지길 원하기 때문에 null로 설정하였다 (이해가 안된다ㅠ)
+ 게임을 각각의 프레임마다 update하고 start, load하기 위한 Phaser의 세가지 function이다.
- preload: asset들을 preloading 하는 것을 다룬다. 
- create: 모든 것이 load되고 준비가 되었을때 딱 한번 실행된다.
- update: 모든 프레임에서 실행된다.
<pre><code>
var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
      preload: preload, create: create, update: update
    });
</code></pre>

