
let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];

let beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
let newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false

let r;//タッチした指に表示する円の半径

let countMove=0;//抽選の結果発表時のアニメーション用のカウント変数
const time=30;

let randomline = 0;

function setup() {
  createCanvas(windowWidth,windowHeight );
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
    //ボタンが押された後
    //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
    obj.length=0;

    for(var i = 0; i<DecisionObj.length; i++){
      obj = DecisionObj.concat();
    }

    //線のアニメーション表示
    //if(countMove>(i*time)){
    let t=0;
    if(countMove<70){
      t=2
    }else if (countMove<130) {
      t=4
    }else if(countMove<160){
      t=10
    }else if(countMove<200){
      t=15
    }else if(countMove<220){
      t=15
    }else if(countMove<250){
      t=25
    }

    if( (countMove%t) == 0 ){
      randomline = 1 + Math.floor(random(obj.length-1))
    }

    for(var j = 0; j<(obj.length-1); j++){
      if(obj[j].num == randomline && countMove<250 ){

          let a = atan2(obj[j].y - (height/2), obj[j].x - (width/2));//
          //アニメーションの線を引く
          stroke(241,196,15,200);
          let x1,x2,y1,y2;
          x1 = width /2+(height/6*cos(a)) + (obj[j].x - ( width/2+height/6*cos(a) )) - r/2*cos(a);
          y1 = height/2+(height/6*sin(a)) + (obj[j].y - ( height/2+height/6*sin(a) ))- r/2*sin(a);
          x2 = width /2+(height/6*cos(a));//真ん中の円の円周 x
          y2 = height/2+(height/6*sin(a));//真ん中の円の円周 y

          //if( 1+Math.floor(countMove/time)==obj[j].num){
          line(x1,y1,x2,y2);

      }
      //}
      //  }
    }


    if(countMove>250){
      for(var j = 0; j<(obj.length-1); j++){
        if(obj[j].num==1){
          let a = atan2(obj[j].y - (height/2), obj[j].x - (width/2));//
          //アニメーションの線を引く
          stroke(241,196,15,200);
          let x1,x2,y1,y2;
          x1 = width /2+(height/6*cos(a)) + (obj[j].x - ( width/2+height/6*cos(a) )) - (r/2+height/12)*cos(a);
          y1 = height/2+(height/6*sin(a)) + (obj[j].y - ( height/2+height/6*sin(a) ))- (r/2+height/12)*sin(a);
          x2 = width /2+(height/6*cos(a));//真ん中の円の円周 x
          y2 = height/2+(height/6*sin(a));//真ん中の円の円周 y

          //if( 1+Math.floor(countMove/time)==obj[j].num){
          line(x1,y1,x2,y2);
        }
      }
    }

  }


  //真ん中ボタン押された検知
  for(var i = 0; i<touches.length; i++){
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
    //抽選後に、真ん中のボタン押すとリロード
    if( rouletteStart  && (dist(touches[0].x, touches[0].y, width/2, height/2) < (height/6) ) && (touches.length==1)&& (newTouchBool)){
      location.reload();
    }
  }

  fill('#3498db');

  if(rouletteStart===false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){
      noFill();
      stroke('#3498db');
      ellipse(obj[i].x,obj[i].y,r,r);

      textSize(height/16);
      push();
      translate(obj[i].x, obj[i].y);
      let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
      rotate(a-PI/2);
      //text(obj[i].num, 0, -50);//ボールの上に数字をかく
      //text(obj[i].id, 0, -70); //ボールの上にid書く
      pop();
    }
  }else{//ボタンが押された後

    countMove++;//アニメーション用の変数

    for(var i = 0; i<(obj.length-1); i++){
      if( (obj[i].num==1) && (countMove>250) ){

        noFill();
        stroke(240,86,70,180);
        ellipse(obj[i].x,obj[i].y,r,r);

        noStroke();
        fill(250,30,30,180);
        textSize(height/16);

        push();
        translate(obj[i].x, obj[i].y);
        let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
        rotate(a-PI/2);
        //text(obj[i].num, 0, -50);
        text("おめでとう!", 0, -height/12);
        pop();

      }else{

        noFill();
        stroke('#3498db');
        ellipse(obj[i].x,obj[i].y,r,r);

      }
    }
  }



  //--真ん中のボタンのビジュアル
  noStroke();
  fill(240,86,70,180);
  ellipse(width/2,height/2,height/3,height/3);
  fill(255);

  if(rouletteStart){
    //ルーレット終わった後　ボタン押された後
    if( countMove < 250 ) {
      //結果発表アニメーション中
      strokeWeight(7);
      textSize(height/24);
      text("抽選中...", width/2,height/2);
    }else{
      //アニメーション終了後
      strokeWeight(6);
      textSize(height/24);
      text("決定！", width/2,height/2);
    }

  }else{
    //抽選前 ボタン押される前
    strokeWeight(6);
    textSize(height/24);
    text("抽選スタート！", width/2,height/2);
  }
}


//html button
// position つかう absolute fixed tatic
//z-index
