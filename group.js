//グループ決めjs


let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];

let beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
let newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false

let r;//タッチした指に表示する円の半径
let groupCount = 0;//グループ数 0~ [ 0->2, 1->3, 2->4, ....

let countMove=0;//抽選の結果発表時のアニメーション用のカウント変数
const time=30;



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
    //グループ数変更
    //if((touches.length==1)&&(dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) ){
    //groupTouchObj = obj.concat();
    if( (obj.length==1) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) && (newTouchBool)  ){
      console.log("hoge");
      groupCount++;
    }

    //}
    //抽選開始
    if( (obj.length>2) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) && (newTouchBool)  ){
      text(touches.length,100,100);
      let temp = obj[(touches.length-1)].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける

      DecisionObj = obj.concat();//DecisionObjにobjをコピー

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
      rouletteStart = true;//押された
    }
  }


  strokeWeight(10);
  if(rouletteStart===false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){


      noFill();
      stroke('#95a5a6');
      ellipse(obj[i].x,obj[i].y,r,r);;

    }
  }else{//ボタンが押された後
    for(var i = 0; i<(obj.length-1); i++){

      textSize(height/16);

      let color;
      let groupText="";

      switch ( (obj[i].num+1) % (groupCount%5+2) ) {
        case 0:
         color = [46,204,113];//Emerland green
         groupText = "A";
          break;
        case 1:
        color = [52,152,219];//Peterriver blue
        groupText = "B";
          break;
        case 2:
        color = [241,196,15];//sunflower yellow
        groupText = "C";
          break;
        case 3:
        color = [211,84,0];//Pumpukin orange
        groupText = "D";
          break;
        case 4:
        color = [155,89,182];//Amethyst purple
        groupText = "E";
          break;
        case 5:
        color = [230,126,34];//Amethyst purple
        groupText = "F";
          break;

        default:
      }
      noFill();
      stroke(color);
      ellipse(obj[i].x,obj[i].y,r,r);
      noStroke();
      fill(color);

      push();
      translate(obj[i].x, obj[i].y);
      let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
      rotate(a-PI/2);
      text(groupText, 0, -height/12);
      pop();
/*
      if((obj[i].num%2)==0){
        let c = [230,126,34];
        noFill();
        stroke(c);
        ellipse(obj[i].x,obj[i].y,r,r);
        noStroke();
        fill('#3498db');

        push();
        translate(obj[i].x, obj[i].y);
        let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
        rotate(a-PI/2);
        text("B", 0, -50);
        pop();

      }else{
        noFill();
        stroke('#2ecc71');
        ellipse(obj[i].x,obj[i].y,r,r);
        noStroke();
        fill('#2ecc71');

        push();
        translate(obj[i].x, obj[i].y);
        let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
        rotate(a-PI/2);
        text("A", 0, -50);
        pop();
      }
      */

    }

    //------------------------------------------- 矢印表示(仮)→ ------------
    /*
    stroke(241,196,15,150);
    for(var i = 0; i<(obj.length-1); i++){
      let x1,x2,y1,y2;
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
      line(x1,y1,x2,y2);
    }
    */

    //------------------------------------------


  }
  //--真ん中のボタンのビジュアル
  noStroke();
  fill(240,86,70,180);
  ellipse(width/2,height/2,height/3,height/3);

  strokeWeight(5);
  textSize(height/16);
  fill(255);


  if(rouletteStart){
    //ルーレット終わった後　ボタン押された後
    if( (countMove/time) < (obj.length-1) ) {
      //結果発表アニメーション中
      strokeWeight(7);
      textSize(height/4);
      text(Math.floor(countMove/time+1), width/2,height/2);
    }else{
      //アニメーション終了後
      strokeWeight(6);
      textSize(height/24);
      text("順番決定！", width/2,height/2);
    }

  }else{
    //抽選前 ボタン押される前
    strokeWeight(6);
    textSize(height/24);
    text((groupCount%5+2)+"グループ", width/2,height/2);
  }

}

//html button
// position つかう absolute fixed tatic
//z-index
