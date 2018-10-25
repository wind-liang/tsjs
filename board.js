window.board={}
var canvas = document.getElementById('id-canvas')
var context = canvas.getContext('2d')
var x = 150
var y = 250
var speed = 10
var img = new Image()
img.src = "https://tensorflow-pro.oss-cn-beijing.aliyuncs.com/paddle.jpg"
 

img.onload = function() { 
    context.drawImage(img, x, y)
}
board.move = function(directon){
    if(directon==37){
        this.left()
    }
    if(directon==39){
        this.right()
    }
}    
board.left=function(){  
    context.clearRect(0, 0, 400, 300) 
        x-= speed
    if(x>=0){
        context.drawImage(img, x, y)
    }else{
        x+=speed
        context.drawImage(img, x, y)
    } 

}
board.right=function(){ 
    context.clearRect(0, 0, 400, 300)
    var temp = x + speed + img.width
    if(temp<=canvas.width){
        context.drawImage(img, x, y)
        x = x + speed
    }else{ 
        context.drawImage(img, x, y)
    } 
  
}
window.addEventListener('keydown', function(event) {
    if(event.key == 'a'){
        board.left() 
    } else if(event.key == 'd') {
        board.right()
    }
})  