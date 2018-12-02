/*
やること
アニメーション
・
*/


let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];

let beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
let newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false

let r;//タッチした指に表示する円の半径

//https://www.materialui.co/flatuicolors
const color =　[
  [192, 57, 43,200],//0 Pomegranate
  [ 46,204,113,200],//1 Emerland green
  [ 52,152,219,200],//2 Peterriver blue
  [241,196, 15,200],//3 sunflower yellow
  [155, 89,182,200],//4 Amethyst purple
  [230,126, 34,200],//5 Carrot orange
  [ 22,160,133,200],//6 Greensea
  [211, 84,  0,200] //7 Pumpukin orange

]

console.log(color);
console.log(color[0]);
console.log(color[0][0]);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER,CENTER);
  r=height/13;
}


function draw() {
  clear();
  noStroke();

  var obj = new Array();
  let OrderNum=[];//ランダムの数字作るための配列 ex.[1,2,3,4,5,6]

  //
  if(beforeFrameTouchesLength<touches.length){
    newTouchBool = true;
  }else{
    newTouchBool = false;
  }
  beforeFrameTouchesLength = touches.length;


  for (var i = 0; i < touches.length; i++) {
    OrderNum.push((i+1));//[1,2,3,4,5,6...]
  }

  strokeWeight(10);
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
    //抽選開始
    if( (obj.length>2) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) && (newTouchBool) &&(obj.length%2 == 1) ){

      let temp = obj[(touches.length-1)].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける

      DecisionObj = obj.concat();//DecisionObjにobjをコピー

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
      rouletteStart = true;//押された
    }
    //抽選後に、真ん中のボタン押すとリロード
    if( rouletteStart  && (dist(touches[0].x, touches[0].y, width/2, height/2) < (height/6) ) && (touches.length==1)&& (newTouchBool)){
      location.reload();
    }
  }


  if(rouletteStart===false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){


      noFill();
      stroke('#3498db');
      ellipse(obj[i].x,obj[i].y,r,r);


      textSize(height/24);
      push();
      translate(obj[i].x, obj[i].y);
      let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
      rotate(a-PI/2);
      //text(obj[i].num, 0, -50);//ボールの上に数字をかく
      //text(obj[i].id, 0, -70); //ボールの上にid書く
      pop();
    }
  }else{//ボタンが押された後


    for(let i = 1 ; i<obj.length ; i+=2 ){
      noFill();
      stroke(color[(i-1)/2]);

      let x1,x2,y1,y2;//円の中心
      for(var j = 0; j<(obj.length-1); j++){
        if(obj[j].num==i){
          x1 = obj[j].x;
          y1 = obj[j].y;
        }
        if(obj[j].num==(i+1)){
          x2 = obj[j].x;
          y2 = obj[j].y;
        }
      }

      let a = atan2(y1-y2, x1-x2);

      ellipse(x1,y1,r,r);
      ellipse(x2,y2,r,r);
      line(
        x1-(r/2)*cos(a),
        y1-(r/2)*sin(a),
        x2+(r/2)*cos(a),
        y2+(r/2)*sin(a)
      );
    }

  }

  //--真ん中のボタンのビジュアル
  noStroke();
  fill(240,86,70,180);

  ellipse(width/2,height/2,height/3,height/3);

  strokeWeight(7);
  fill(255);
  if(!rouletteStart){
    textSize(height/30);
    text("ペア決めスタート！", width/2,height/2-height/24);
    textSize(height/12);
    text(obj.length+"人", width/2,height/2+height/24);
  }else{
    textSize(height/24);
    text("ペア決定！", width/2,height/2);
  }

}


//html button
// position つかう absolute fixed tatic
//z-index
