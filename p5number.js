
let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];

$(function() {
    $(window).on('touchmove.noScroll', function(e) {
        e.preventDefault();
    });
    $('.close').on('click', function() {
        $('.loading_box').hide();
        $(window).off('.noScroll');
    });
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER);
}


function draw() {
  clear();

  stroke(0);

  line(0,0,width,0);
  line(width-15,0,width-15,height);
  line(width,height,0,height);
  line(height,0,0,0);

  noStroke();

  var obj = new Array();

  let XYobj = [];//スタート判定用
  let OrderNum=[];//ランダムの数字作るための配列 ex.[1,2,3,4,5,6]



  for (var i = 0; i < touches.length; i++) {
    OrderNum.push((i+1));//[1,2,3,4,5,6...]
  }

  if(!rouletteStart){//ボタンが押される前
    //obj<-touches
    //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
    for(var i = 0; i<touches.length; i++){


        let rand = Math.floor(random(OrderNum.length));//ordernumのindexをランダムに指定 1~n
        let objNum = OrderNum[rand];//ordernumの中からrand番目を取得 4なら、[1,2,3,4,5,6]
        OrderNum.splice(rand, 1);//[1,2,3,5,6]になる
        obj.push(
          {
            x:touches[i].x,//x point
            y:touches[i].y,//y point
            id:i,//0~n
            num:objNum// 1~n+1
          }
        )
    }
  }else {
    //ぼたんがおされたあと
    //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
    obj.length=0;

    for(var i = 0; i<DecisionObj.length; i++){
      obj = DecisionObj.concat();
    }
  }


  //真ん中ボタン押された検知
  for(var i = 0; i<touches.length; i++){
    if( (obj.length>2) && (dist(obj[i].x, obj[i].y, width/2, height/2) < (height/6)) ){

      let temp = obj[i].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける
      /*
      for(var j = 0; j<touches.length; j++){
        DecisionObj.push(obj[j])
      }
      */
      DecisionObj = obj.concat();

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
      rouletteStart = true;//押された
    }
  }

  fill('#3498db');
  if(rouletteStart===false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){
      ellipse(obj[i].x,obj[i].y,50,50);

      textSize(20);
      push();
      translate(obj[i].x, obj[i].y);
      let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
      rotate(a-PI/2);
      text(obj[i].num, 0, -50);
      //text(obj[i].id, 0, -70); ボールの上にid書く
      pop();
    }
  }else{//ボタンが押された後
    for(var i = 0; i<(obj.length-1); i++){
      ellipse(obj[i].x,obj[i].y,50,50);
      textSize(20);
      push();
      translate(obj[i].x, obj[i].y);
      let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
      rotate(a-PI/2);
      text(obj[i].num, 0, -50);
      pop();
    }
  }
  //--真ん中のボタンのビジュアル
  noStroke();
  fill('#e74c3c');
  ellipse(width/2,height/2,height/3,height/3);

  strokeWeight(5);
  textSize(30);
  fill('#ecf0f1');
  text("抽選スタート！", width/2,height/2+10);


}


//html button
// position つかう absolute fixed tatic
//z-index
