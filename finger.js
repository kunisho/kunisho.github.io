

window.onload = function(){
  let ac = document.getElementById("cv"); // canvas要素のオブジェクトを取得


  ac.ontouchstart = function (e) {

    document.getElementById("disp").innerHTML = "touch";


      e.preventDefault();     // デフォルトイベントをキャンセル
      let s = "";             // 変数sを初期化

      let arrayX = [];
      let arrayY = [];




      let ctx = document.getElementById("cv").getContext("2d");



      ctx.strokeStyle = "white";  //線の色を緑に指定
      ctx.fillStyle = "white";  //塗り潰しの色を赤に指定
      ctx.strokeRect(0,0,0,0);
      ctx.fillRect(0,0,1000, 600);

      let OrderNum=[];//１から順番に指の数だけ数字が入っている配列[1,2,3,4,5....]
      for(let i = 1; i < e.touches.length+1; i++){
        OrderNum.push(i);
      }


      ctx.strokeStyle = "black";  //線の色を緑に指定
        for (let i = 0; i < e.touches.length; i++) {
          //円書く
          ctx.beginPath();
          ctx.arc(arrayX[i], arrayY[i], 30, 0, Math.PI*2, true);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(arrayX[i], arrayY[i]-60, 30, 0, Math.PI*2, true);
          ctx.stroke();

          ctx.beginPath();     // 1.Pathで描画を開始する
          ctx.moveTo(arrayX[i],arrayY[i]-30); // 2.描画する位置を指定する
          ctx.lineTo(arrayX[i],arrayY[i]-60); // 3.指定座標まで線を引く
          ctx.stroke();
      }

      let touchNum =[];//それぞれの指の番号をcanvasの下にテキストとして表示するための臨時変数

      for (let i = 0; i < e.touches.length; i++) {
        let random = Math.floor(Math.random() * OrderNum.length); // 0~触っている指の数の値

        let txt = OrderNum[random]; //描画する文字
        touchNum.push(OrderNum[random]);


        OrderNum.splice(random, 1);

        ctx.textAlign = "center";
        ctx.font = "40px Arial"; //フォントにArial,40px,斜体を指定
        ctx.fillStyle = "black"; //塗り潰し色を緑に
        // let rad = Math.atan2(500-arrayX[i], arrayY[i]-300);
        // ctx.rotate(Math.PI / 4); //回転
        ctx.fillText(txt,arrayX[i],arrayY[i]-60);
      }

      // 引数のtouchesプロパティは配列の要素数（触れている指の数）だけ繰り返し処理
      for (let i = 0; i < e.touches.length; i++) {
          let t = e.touches[i];       // 触れている指に関する情報を取得

          s += "[" + i + "]";
          s += "x=" + t.pageX + ",";
          s += "y=" + t.pageY + ",";
          s += "Num=" + touchNum[i] + "<br>";

          arrayX.push(t.pageX);
          arrayY.push(t.pageY);
          //console.log(array); // ['a', 'b', 'c']
      }
      document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示

  };

}
