
let value = 0;
let rouletteStart = false;//falseはまだ押されてない

let DecisionObj =[];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  textAlign(CENTER);
}


function draw() {
  clear();
  let obj =[];//表示するやつ
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
            x:touches[i].x,
            y:touches[i].y,
            num:objNum
          }
        )
    }
  }else {
    //ぼたんがおされたあと
    //obj{}にtouches{}を入れる (touchesのままだとなぜかxとかが参照できない)
    for(var i = 0; i<DecisionObj.length; i++){
      obj.push(DecisionObj[i])
    }
  }


  //真ん中ボタン押された検知
  for(var i = 0; i<touches.length; i++){
    if( (obj.length>2) && (dist(obj[i].x, obj[i].y, width/2, height/2) < (height/6)) ){

      let temp = obj[i].num;//スタートボタン押した指のnumを保存　→　一番大きいnumの所にこれを代入すればいける
      for(var j = 0; j<touches.length; j++){
        DecisionObj.push(obj[j])
      }

      for(var j = 0; j<touches.length; j++){
        if(DecisionObj[j].num==touches.length){
          DecisionObj[j].num = temp;//最大数にstart押した指のnumを代入
        }
      }
      rouletteStart = true;//押された
    }
  }


  if(rouletteStart==false){//ボタンが押される前
    for(var i = 0; i<touches.length; i++){
      textSize(10);
      text(JSON.stringify(obj[i]), 5, 20+i*10);
      ellipse(obj[i].x,obj[i].y,50,50);
      textSize(20);
      text(obj[i].num, obj[i].x, obj[i].y-50)
    }
  }else{//ボタンが押された後
    for(var i = 0; i<obj.length; i++){
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
