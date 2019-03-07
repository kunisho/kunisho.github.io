

/*
一人だけじゃなくて当選する人数変更できるようにする
*/

let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];

let beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
let newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false

let r;//タッチした指に表示する円の半径
let drumroll;


let countMove=0;//抽選の結果発表時のアニメーション用のカウント変数
const time=30;
const endcount=240;

let randomline = 0;

let startTime; // 開始時間

let endTime; // 終了時間

function preload() {
  end = loadSound('src/decision-v1-end.wav');
  shuffle = loadSound('src/shuffle.wav');

  inSE = loadSound('src/in.wav');
  outSE = loadSound('src/out.wav');
}


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

  //in out SE鳴らす
  if(!rouletteStart){
    if(beforeFrameTouchesLength<touches.length){
      inSE.play();
    }else if(beforeFrameTouchesLength>touches.length){
      outSE.play();
    }
  }

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
      t=12
    }else if(countMove<220){
      t=14
    }else if(countMove<endcount){
      t=15
    }

    if( (countMove%t) == 0 ){
      randomline = 1 + Math.floor(random(obj.length-1))
    }

    for(var j = 0; j<(obj.length-1); j++){
      if(obj[j].num == randomline && countMove<endcount ){

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


    if(countMove>endcount){
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

          line(x1,y1,x2,y2);
        }
      }
    }

  }


  //真ん中ボタン押された検知
  for(var i = 0; i<touches.length; i++){
    //抽選開始
     // console.log("beforeFrameTouchesLength:"+beforeFrameTouchesLength);
     // console.log("touches.length"+touches.length);
     // console.log("newTouchBool:"+newTouchBool);
     if( (dist(obj[(touches.length-1) ].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6))   ){
       console.log(!rouletteStart);
       console.log((obj.length>2) );
       console.log( (newTouchBool));
     }

    if(!rouletteStart&& (obj.length>2) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6)) && (newTouchBool)  ){

      let temp = obj[(touches.length-1)].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける

      DecisionObj = obj.concat();//DecisionObjにobjをコピー

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
      if(!rouletteStart){
        shuffle.play();
      }
      rouletteStart = true;//押された
      startTime = Date.now()
    }
    //抽選後、真ん中のボタン押した時
    if( rouletteStart  && (dist(touches[i].x, touches[i].y, width/2, height/2) < (height/6) ) &&  (newTouchBool) && countMove>10){
      if(countMove>endcount){
        //抽選後、アニメーション終わった後、真ん中のボタン押すとリロード　
        //location.reload();
         rouletteStart = false;//falseはまだ押されてない
         DecisionObj =[];
         beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
         newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false

         countMove=0;//抽選の結果発表時のアニメーション用のカウント変数
         randomline = 0;
         startTime=0; // 開始時間
         endTime=0; // 終了時間
      }else{
        //抽選後、アニメーション中、真ん中のボタン押すと確定　
        countMove=endcount;
        shuffle.stop();
        end.play();
      }
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
      if( (obj[i].num==1) && (countMove>endcount) ){

        noFill();
        stroke(240,86,70,180);
        ellipse(obj[i].x,obj[i].y,r,r);

        noStroke();
        fill('#d35400');
        textSize(height/16);

        push();
        translate(obj[i].x, obj[i].y);
        let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
        rotate(a-PI/2);
        //text(obj[i].num, 0, -50);
        text("当選!", 0, -height/12);
        pop();


      }else{

        noFill();
        stroke('#3498db');
        ellipse(obj[i].x,obj[i].y,r,r);

      }
    }
    if(countMove==endcount){
      end.play();
      endTime = Date.now(); // 終了時間
    }

    //text(endTime - startTime,100,100);抽選のアニメーションをの時間を測る用
  }



  //--真ん中のボタンのビジュアル


  if(rouletteStart){
    noStroke();
    fill(240,86,70,180);
    ellipse(width/2,height/2,height/3,height/3);
    fill(255);
    //ルーレット終わった後　ボタン押された後
    if( countMove < endcount ) {
      //結果発表アニメーション中
      strokeWeight(7);
      textSize(height/24);
      text("抽選中...", width/2,height/2);
    }else{
      //アニメーション終了後
      strokeWeight(6);
      textSize(height/24);
      text("決定！", width/2,height/2);
      textSize(height/48);
      text("もう一度抽選する", width/2,height/2+height/16);
    }

  }else{
    //抽選前 ボタン押される前
    //抽選前 ボタン押される前
    if(obj.length>1){
      //押せる時
      noStroke();
      fill(231,76,60 ,230);
      ellipse(width/2,height/2,height/3,height/3);
      fill(255);

      strokeWeight(6);
      textSize(height/28);
      text("抽選スタート！", width/2,height/2);
      textSize(height/20);
      text(obj.length+"人", width/2,height/2+height/20);
    }else{
      //押せる前
      noStroke();
      fill(240,86,70,180);
      ellipse(width/2,height/2,height/3,height/3);
      fill(255);

      strokeWeight(6);
      textSize(height/28);
      text("抽選hoge", width/2,height/2);
      textSize(height/20);
      if(obj.length>0){
        text(obj.length+"人", width/2,height/2+height/20);
      }

    }
  }
}


//html button
// position つかう absolute fixed tatic
//z-index
