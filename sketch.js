var balls = []  //所有球的資料內容
// var ball  //正在處理的球

// 生地の色
var kiji_color = "d4a276-895737".split("-").map(a=>"#"+a)
// チョコの色
var choco_color = "f9bec7-522500-6a994e".split("-").map(a=>"#"+a)
// 背景の色

let bg = ["#F2EDEC"];


class ball_class{  //宣告一個ball_class物件，
  constructor(args){  //描述物件的初始值，只有設定物件的資料內容   
    this.p = args.p || {x:width/2,y:height/2}; //球的位置
    // this.w = args.w || random(30,50) //寬
    // this.h = args.h || random(30,50) //高
    this.r = args.r || random(50,120)  //球的大小
    this.v = args.v || {x:random(-2,2),y:random(-2,2)}   //球的移動速度
    this.a = args.a || {x:0,y:random(0.7,1.2)}  //加速度
    this.shape_num = args.shape_num || int(random(4))
    this.kiji_color = args.kiji_color || random(kiji_color)
    this.choco_color = args.choco_color || random(choco_color)
  }

  
  draw(){   //畫出物件畫面的程式碼，一個物件繪出的程式碼    
    
    push();
    translate(this.p.x, this.p.y);
    rotate(this.rotate_num);

    if (this.shape_num == 0) {
      // モコモコ
      push();

      drawingContext.setLineDash([1, 20]);
      strokeWeight(this.r / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, this.r * 0.8);

      strokeWeight(this.r / 2.8);
      stroke(this.choco_color);
      circle(0, 0, this.r * 0.7);

      pop();
    } else if (this.shape_num == 1) {
      // ノーマル
      strokeWeight(this.r / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, this.r * 0.8);

      strokeWeight(this.r / 3.5);
      stroke(this.choco_color);
      circle(0, 0, this.r * 0.7);
    } else if (this.shape_num == 2) {
      // ハーフ
      strokeWeight(this.r / 2.5);
      stroke(this.kiji_color);
      noFill();
      circle(0, 0, this.r * 0.8);

      strokeWeight(this.r / 2.3);
      stroke(this.choco_color);
      strokeCap(SQUARE);
      arc(0, 0, this.r * 0.8, this.r * 0.8, 0, 180);
    } else if (this.shape_num == 3) {
      // クルーラー
      push();

      drawingContext.setLineDash([3, 20]);
      strokeWeight(this.r / 2);
      noFill();
      stroke(this.kiji_color);
      circle(0, 0, this.r * 0.8);

      strokeWeight(this.r / 2);
      stroke("#895737");
      strokeCap(SQUARE);
      circle(0, 0, this.r * 0.8);
      pop();
    }

    pop();
  }

 
  update(){  //物件移動更新後的程式碼
      this.p.x += this.v.x   //x軸
      this.p.y += this.v.y   //y軸

      if(this.p.x<0){  //碰到視窗左邊
        this.v.x = -this.v.x
      }
      if(this.p.x>width){  //碰到視窗右邊
        this.v.x = -this.v.x
      }
      if(this.p.y<0){   //碰到視窗上邊
        this.v.y = -this.v.y
      }
      if(this.p.y>height){  //碰到視窗下邊
        this.v.y= -this.v.y
      }
    }

    isBALLInRange(){ //計算物件與滑鼠間的距離是否小於直徑
      //d:把目前這個物件的位置與滑鼠間的距離
      let d = dist(mouseX,mouseY,this.p.x,this.p.y)
      if(d < this.r){
        return true
      }
      else{
        return false
      }
    }
  }



function setup() {
  createCanvas(windowWidth, windowHeight);
 
  for(i=0;i<100;i=i+1){  //產生多個球資料(20顆球)
    ball = new ball_class({  //傳一串參數值到class內
    v:{x:random(-2,2),y:random(-2,2)},
    p:{x:random(0,width),y:random(0,height)},
    a:{x:0,y:0}
    })
    balls.push(ball)
  }
}

var score = 0
function draw() {
  background("#F2EDEC");

  for(let ball of balls){
    ball.draw();
    ball.update();
    if(ball.isBALLInRange()){
      ball.v.x += 0.8;
      ball.v.y += 0.8;
    }
  }
}


function mousePressed(){
  for(let i = balls.length - 1; i >= 0; i--){
    if(ball[i].isBALLInRange()){
      balls.splice(i,1)
      score = score++
    }
  }

  fill("#fb6f92")
  textSize(70)
  text(score,50,0)
}