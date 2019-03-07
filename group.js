//グループ決めjs



let rouletteStart = false;//falseはまだ押されてない
let r;//タッチした指に表示する円の半径

let DecisionObj =[];

let beforeFrameTouchesLength=0;//前のフレームでのtoucheslength 抽選開始ボタンで、新しく押した指かどうか判定する為に使う
let newTouchBool = false;//そのフレームで新しくタッチが追加されたかどうかtrue false


let groupCount = 0;//グループ数 0~ [ 0->2, 1->3, 2->4, .... //groupCount%5+2 ->　グループ数


let countMove=0;//抽選の結果発表時のアニメーション用のカウント変数
const time=40;

let drumroll;
let drumrollBool = [];


function preload() {
  inSE = loadSound('src/in.wav');
  outSE = loadSound('src/out.wav');
  for (var i = 0; i < 17; i++) {
    drumroll = loadSound('src/decision-v1-end.wav');
    drumrollBool.push(true);
  }
}


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
  //in out SE鳴らす
  if(!rouletteStart){
    if(beforeFrameTouchesLength<touches.length){
      inSE.play();
    }else if(beforeFrameTouchesLength>touches.length){
      outSE.play();
    }
  }

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
            group:0,//0~6
            groupText:"",//A~F
            color3:[],
            color4:[],
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
      groupCount++;
    }

    //}
    //抽選開始
    if(!rouletteStart){
    if(newTouchBool && ((groupCount%5+2)<obj.length) && (dist(obj[(touches.length-1)].x, obj[(touches.length-1)].y, width/2, height/2) < (height/6))  ){
      //新しく指にタッチされた&指の数がグループ数以上&真ん中押された
      if(!rouletteStart){
      let temp = obj[(touches.length-1)].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける

      DecisionObj = obj.concat();//DecisionObjにobjをコピー

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
    }
    for(var j = 0; j<touches.length; j++){
      switch ( (DecisionObj[j].num-1) % (groupCount%5+2) ) {
        case 0:
         DecisionObj[j].color3 = [46,204,113];//Emerland green
         DecisionObj[j].color4 = [46,204,113,200];//Emerland green
         DecisionObj[j].groupText= "A";
         DecisionObj[j].group = 0;
          break;
        case 1:
        DecisionObj[j].color3 = [52,152,219];//Peterriver blue
        DecisionObj[j].color4 = [52,152,219,200];//Peterriver blue
        DecisionObj[j].groupText= "B";
        DecisionObj[j].group = 1;
          break;
        case 2:
        DecisionObj[j].color3 = [241,196,15];//sunflower yellow
        DecisionObj[j].color4 = [241,196,15,200];//sunflower yellow
        DecisionObj[j].groupText= "C";
        DecisionObj[j].group = 2;
          break;
        case 3:
        DecisionObj[j].color3 = [211,84,0];//Pumpukin orange
        DecisionObj[j].color4 = [211,84,0,200];//Pumpukin orange
        DecisionObj[j].groupText= "D";
        DecisionObj[j].group = 3;
          break;
        case 4:
        DecisionObj[j].color3 = [155,89,182];//Amethyst purple
        DecisionObj[j].color4 = [155,89,182,200];//Amethyst purple
        DecisionObj[j].groupText= "E";
        DecisionObj[j].group = 4;
          break;
        case 5:
        DecisionObj[j].color3 = [230,126,34];//Amethyst purple
        DecisionObj[j].color4 = [230,126,34,200];//Amethyst purple
        DecisionObj[j].groupText= "F";
        DecisionObj[j].group = 5;
          break;

        default:
      }
    }


      console.log(obj);


      rouletteStart = true;//押された

    }
  }

    //抽選後、真ん中のボタン押した時
    if( rouletteStart  && (dist(touches[i].x, touches[i].y, width/2, height/2) < (height/6) ) &&  (newTouchBool) && countMove>10){
      if(Math.floor(countMove/time)+1 > (groupCount%5+2)){
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

         for(var j = 0; j<17; j++){
           drumrollBool[j]=true;
         }
         
      }else{
        //抽選後、アニメーション中、真ん中のボタン押すと確定　
        countMove=(groupCount%5+2)*time;
      }
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

    countMove++;//アニメーション用の変数

    for(var i = 0; i<(obj.length-1); i++){

      if(countMove > time*(obj[i].group+1) ){
        textSize(height/16);

        noFill();
        stroke(obj[i].color3);
        ellipse(obj[i].x,obj[i].y,r,r);
        noStroke();
        fill(obj[i].color3);

        push();
        translate(obj[i].x, obj[i].y);
        let a = atan2(obj[i].y - (height/2), obj[i].x - (width/2));//
        rotate(a-PI/2);
        text(obj[i].groupText, 0, -height/12);
        //デバック用 num表示
        //text(obj[i].num, 0, +height/12);
        pop();

        if(drumrollBool[obj[i].group]){
          drumroll.play();
          drumrollBool[obj[i].group]=false;
        }

      }else{
        noFill();
        stroke('#95a5a6');
        ellipse(obj[i].x,obj[i].y,r,r);;
      }


      if(countMove < ( (groupCount%5+2)*time ) ){

        for(var j = 0; j<(obj.length-1); j++){
          //Math.floor(countMove/time)　アニメーション中のグループ
          if(obj[j].group==Math.floor(countMove/time) ){
            let a = atan2(obj[j].y - (height/2), obj[j].x - (width/2));//
            //アニメーションの線を引く
            console.log(obj);
            stroke(obj[j].color4);
            //stroke(0,0,0);
            let x1,x2,y1,y2;
            x1 = width /2+(height/6*cos(a)) + (obj[j].x - ( width/2+height/6*cos(a) ))*( 2/3*(countMove%time)/time );
            y1 = height/2+(height/6*sin(a)) + (obj[j].y - ( height/2+height/6*sin(a) ))*( 2/3*(countMove%time)/time );
            x2 = width /2+(height/6*cos(a));//真ん中の円の円周 x
            y2 = height/2+(height/6*sin(a));//真ん中の円の円周 y

              line(x1,y1,x2,y2);
          }
        }
      }
    }
  }

  //--真ん中のボタンのビジュアル






  if(rouletteStart){
    //ルーレット終わった後　ボタン押された後

    noStroke();
    fill(240,86,70,180);
    ellipse(width/2,height/2,height/3,height/3);
    fill(255);

    if( Math.floor(countMove/time) < (groupCount%5+2) ) {
      //結果発表アニメーション中
      let txt="";
      switch (Math.floor(countMove/time)) {
        case 0:
         txt = "A";
          break;
        case 1:
        txt = "B";
          break;
        case 2:
        txt = "C";
          break;
        case 3:
        txt = "D";
          break;
        case 4:
        txt = "E";
          break;
        case 5:
        txt = "F";
          break;
        default:
      }
      strokeWeight(7);
      textSize(height/4);
      text(txt, width/2,height/2);
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



    if( ((groupCount%5+2)<obj.length+1)){

      noStroke();
      fill(231,76,60 ,230);
      ellipse(width/2,height/2,height/3,height/3);
      fill(255);

      strokeWeight(6);
      textSize(height/24);
      text((groupCount%5+2)+"グループ", width/2,height/2-height/24);
      strokeWeight(15);
      textSize(height/34);
      text("グループ決めスタート！", width/2,height/2+height/34);
    }else{
      noStroke();
      fill(240,86,70,180);
      ellipse(width/2,height/2,height/3,height/3);
      fill(255);

      strokeWeight(6);
      textSize(height/24);
      text((groupCount%5+2)+"グループ", width/2,height/2-height/24);
    }

  }

}

//html button
// position つかう absolute fixed tatic
//z-index
