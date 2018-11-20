
let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];
let temp = false;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER);
}


function draw() {
  clear();
  let obj =[];//表示するやつ
  let OrderNum=[];//ランダムの数字作るための配列
  for (var i = 0; i < touches.length; i++) {
    OrderNum.push((i+1));
  }

if(!rouletteStart){//ボタンが押される前
  //obj<-touches
  //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
  for(var i = 0; i<touches.length; i++){
    let rand = Math.floor(random(OrderNum.length));
    let objNum = OrderNum[rand];
    OrderNum.splice(rand, 1);
    obj.push(
      {
        x:touches[i].x,
        y:touches[i].y,
        num:objNum
      }
    )
  }
}else {
  //ぼたんがおされたあと
  //obj<-確定obj(DecisionObj)
  //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
  for(var i = 0; i<5; i++){
    obj.push(DecisionObj[i])
  }
}



if(touches.length==5){//タッチが円の中だった時
  //確定obj<-obj
  for(var i = 0; i<touches.length; i++){
    DecisionObj.push(obj[i])
  }
  rouletteStart = true;//押された
}

//真ん中ボタン押された検知
  /*
  for(var i = 0; i<touches.length; i++){
    if( (obj.length>1) && (dist(obj[i].x, obj[i].y, width/2, height/2) < (height/6)) ){
      temp =true;
    }
    text(temp,100,200)
  }
  */

  if(rouletteStart==false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){
      textSize(10);
      text(JSON.stringify(obj[i]), 5, 20+i*10);
      ellipse(obj[i].x,obj[i].y,50,50);
      textSize(20);
      text(obj[i].num, obj[i].x, obj[i].y-50)
    }
  }else{//ボタンが押された後
    for(var i = 0; i<5; i++){
      textSize(10);
      text(JSON.stringify(obj[i]), 5, 20+i*10);
      ellipse(obj[i].x,obj[i].y,50,50);
      textSize(20);
      text(obj[i].num, obj[i].x, obj[i].y-50)
    }
  }

  //--真ん中のボタンのビジュアル
  noStroke();
  fill(255,0,0);
  ellipse(width/2,height/2,height/3,height/3);
  strokeWeight(1);
  textSize(30);
  fill(0,0,0);
  text("抽選開始！", width/2,height/2);
}
