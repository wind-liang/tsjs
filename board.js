window.board = {};
var canvas = document.getElementById('id-canvas');
var context = canvas.getContext('2d');
//
// var getCoordInDocument = function(e) {
//     e = e || window.event;
//     var x = e.pageX || (e.clientX +
//       (document.documentElement.scrollLeft
//       || document.body.scrollLeft));
//     var y= e.pageY || (e.clientY +
//       (document.documentElement.scrollTop
//       || document.body.scrollTop));
//     return {'x':x,'y':y};
//   }
// document.getElementById('id-canvas').onmouseup = function (oEvent) {
//     if (!oEvent) {
//         oEvent = window.event;
//     }
//     if (oEvent.button === 0) {
//         var pointer = getCoordInDocument(oEvent);
//         console.log(pointer.x + ' ' + pointer.y);
//     }
// };
var paddleW = 200;
var paddleX = 150;
var paddleY = 250;
var paddleSpeed = 10;
var paddleWidth = paddleW;
var paddleHeight = 25;
var paddle = new Image();
paddle.src = 'https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/paddle.jpg';
paddle.onload = function () {
    context.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
};


board.move = function (direction) {

    if (direction === 37) {
        board.left();
    }
    else if (direction === 39) {
        board.right();
    }


    // else if (direction === 38) {
    //     drawALL();
    // }
    // else {
    //
    // }
};
board.left = function () {
    paddleX -= paddleSpeed;
    if (paddleX >= 0) {
        drawALL();
    }
    else {
        paddleX += paddleSpeed;
        drawALL();
    }

};
board.right = function () {
    var temp = paddleX + paddleSpeed + paddleWidth;
    if (temp <= canvas.width) {
        drawALL();
        paddleX = paddleX + paddleSpeed;
    }
    else {
        drawALL();
    }

};
window.addEventListener('keydown', function (event) {
    if (event.key === 'a') {
        board.left();
    }
    else if (event.key === 'd') {
        board.right();
    }
});

// 球
var ballSpeedX = 1;
var ballSpeedY = 1;
var ballX = 150;
var ballY = 219;
//var isKeeping = false;
var ball = new Image();
var ballWidth = 30;
var drawALL = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(paddle, paddleX, paddleY, paddleWidth, paddleHeight);
    context.drawImage(ball, ballX, ballY, ballWidth, ballWidth);
    for (let i = 0; i < barrier.length; i++) {
        if (barrier[i].isLive) {
            context.drawImage(img, barrier[i].x , barrier[i].y
                , barrierWidth, barrierHeight);
        }
    }
};
ball.src = 'https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/ball.png';

ball.onload = function () {
    context.drawImage(ball, ballX, ballY, ballWidth, ballWidth);
};
var fps = 60;
var isBorder = function () {

    if (ballX < 0 || ballX + ballWidth > canvas.width) {
        ballSpeedX *= -1;
    }
    if (ballY < 0) {
        ballSpeedY *= -1;
    }

};
var intersect = function (rect1, rect2) {
    var half1Width = rect1.width / 2;
    var half1Height = rect1.height / 2;
    var half2Width = rect2.width / 2;
    var half2Height = rect2.height / 2;
    var cen1 = {
            x: rect1.x + half1Width,
            y: rect1.y + half1Height
        };
    var cen2 = {
            x: rect2.x + half2Width,
            y: rect2.y + half2Height
        };

    return Math.abs(cen2.x - cen1.x) <= half1Width + half2Width
     && Math.abs(cen2.y - cen1.y) <= half1Height + half2Height;
};

var ballToPaddle = function () {
    var b = {};
    b.x = ballX;
    b.y = ballY;
    b.width = ballWidth;
    b.height = ballWidth;
    var p = {};
    p.x = paddleX;
    p.y = paddleY;
    p.width = paddleWidth;
    p.height = paddleHeight;
    if (intersect(b, p)) {
        if (b.x < p.x + p.width * 1 / 4 && ballSpeedX > 0) {
            ballSpeedX *= -1;
        }
        if (b.x > p.x + p.width * 3 / 4 && ballSpeedX < 0) {
            ballSpeedX *= -1;
        }

        ballSpeedY *= -1;
    }
};

var isOver = function () {
    if (ballY >= paddleY + paddleHeight) {
        window.isPredicting = false;
        clearInterval(window.board.timeout);
        alert('游戏结束！');
        init();
        hasInit = true;
    }
    let hasTrue = false;
    for (let i = 0; i < barrier.length; i++) {
        if (barrier[i].isLive) {
            hasTrue = true;
            break;
        }
    }
    if (!hasTrue) {
        window.isPredicting = false;
        clearInterval(window.board.timeout);
        alert('游戏胜利！');
        nextLevel();
        hasInit = true;
    }


};
var runloop = function () {
    // events
   // if (isKeeping) {

    ballX += ballSpeedX;
    if (ballX <= 0 && ballSpeedX > 0) {
        ballX = 1;
    }
    ballY -= ballSpeedY;
    // console.log(ballX + ' ' +ballY)
    // console.log(ballSpeedX)
    isBorder();
    ballToPaddle();
    ballToBarrier();
    isOver();
    drawALL();
  //  }
};

var init = function () {
    ballSpeedX = 3;
    ballSpeedY = 3;
    ballX = 150;
    ballY = 219;
    ballWidth = 30;

    paddleX = 150;
    paddleY = 250;
    paddleSpeed = 15;
    paddleWidth = paddleW;
    paddleHeight = 25;

    for (let i = 0; i < barrier.length; i++) {
        barrier[i].isLive = true;
    }
};

var nextLevel = function () {
    ballSpeedX = 3;
    ballSpeedY = 3;
    ballX = 150;
    ballY = 219;
    ballWidth = 30;

    paddleX = 150;
    paddleY = 250;
    paddleSpeed += 2;
    paddleWidth -= 30;
    paddleHeight -= 1;

    for (let i = 0; i < barrier.length; i++) {
        barrier[i].isLive = true;
    }
};
// setTimeout(function () {
//     runloop();
// }, 1000 / fps);
var hasInit = false;
window.board.timeout;
window.board.start = function () {
    if (!hasInit){
         init();
    }

   // isKeeping = true;
    window.board.timeout = setInterval(function () {
        runloop();
    }, 1000 / fps);
};

var sumLength = canvas.width;
var barrierNum = 8;
var barrierWidth = sumLength / barrierNum;
var barrierHeight = 30;
var barrierStartY = 60;
var barrier = [];
for (let j = 0; j < 2; j++) {
    for (let i = 0; i < barrierNum; i++) {
        var img = new Image();
        img.src = 'https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/barrier.jpg';
        img.onload = function () {
            context.drawImage(img, i * barrierWidth, barrierStartY + j * barrierHeight, barrierWidth, barrierHeight);
        };
        var b = {img: img, isLive: true, x: i * barrierWidth, y: barrierStartY + j * barrierHeight};
        barrier.push(b);
    }
}
var ballToBarrier = function () {
    for (let i = 0; i < barrier.length; i++) {
        if (barrier[i].isLive) {
            var b = {};
            b.x = ballX;
            b.y = ballY;
            b.width = ballWidth;
            b.height = ballWidth;
            var p = {};
            p.x = barrier[i].x;
            p.y = barrier[i].y;
            p.width = barrierWidth;
            p.height = paddleHeight;
            if (intersect(b, p)) {
                if (b.x < p.x + p.width * 1 / 4 && ballSpeedX > 0) {
                    ballSpeedX *= -1;
                }
                if (b.x > p.x + p.width * 3 / 4 && ballSpeedX < 0) {
                    ballSpeedX *= -1;
                }
                barrier[i].isLive = false;
                ballSpeedY *= -1;
            }
        }

    }
};
