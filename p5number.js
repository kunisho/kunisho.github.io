
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
            time:0,
            num:objNum// 1~n+1
          }
        )
        obj[i].time++;
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
    if( (obj.length>2) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) && (obj[i].time<2)  ){
      text(touches.length,100,100);
      let temp = obj[(touches.length-1)].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける
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
      //text(obj[i].id, 0, -70); //ボールの上にid書く
      text(obj[i].time, 0, -30); //ボールの上にtime書く
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
  fill(240,86,70,180);
  ellipse(width/2,height/2,height/3,height/3);

  strokeWeight(5);
  textSize(30);
  fill(255);
  text(rouletteStart? "順番決定！":"抽選スタート！", width/2,height/2+10);


}


//html button
// position つかう absolute fixed tatic
//z-index
