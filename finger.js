

window.onload = function(){
  let ac = document.getElementById("cv"); // canvas要素のオブジェクトを取得


  ac.ontouchstart = function (e) {

    document.getElementById("disp").innerHTML = "touch";


      e.preventDefault();     // デフォルトイベントをキャンセル
      let s = "";             // 変数sを初期化

      let arrayX = [];
      let arrayY = [];


      // 引数のtouchesプロパティは配列の要素数（触れている指の数）だけ繰り返し処理
      for (let i = 0; i < e.touches.length; i++) {
          let t = e.touches[i];       // 触れている指に関する情報を取得

          s += "[" + i + "]";
          s += "x=" + t.pageX + ",";
          s += "y=" + t.pageY + "<br>";

          arrayX.push(t.pageX);
          arrayY.push(t.pageY);
          //console.log(array); // ['a', 'b', 'c']
      }
      document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示

      let ctx = document.getElementById("cv").getContext("2d");



      ctx.strokeStyle = "white";  //線の色を緑に指定
      ctx.fillStyle = "white";  //塗り潰しの色を赤に指定
      ctx.strokeRect(0,0,0,0);
      ctx.fillRect(0,0,1000, 600);

      let OrderNum=[];
      for(let i = 1; i < e.touches.length+1; i++){
        OrderNum.push(i);
      }


      ctx.strokeStyle = "black";  //線の色を緑に指定
        for (let i = 0; i < e.touches.length; i++) {
          //円書く
          ctx.beginPath();
          ctx.arc(arrayX[i], arrayY[i], 50, 0, Math.PI*2, true);
          ctx.stroke();
          //----テキスト-----
            //テキストを塗り潰しで描画
      }








      for (let i = 0; i < e.touches.length; i++) {
        let random = Math.floor(Math.random() * OrderNum.length); // 0~触っている指の数の値

        let txt = OrderNum[random]; //描画する文字

        OrderNum.splice(random, 1);

        ctx.textAlign = "center";
        ctx.font = "40px Arial"; //フォントにArial,40px,斜体を指定
        ctx.fillStyle = "black"; //塗り潰し色を緑に
        // let rad = Math.atan2(500-arrayX[i], arrayY[i]-300);
        // ctx.rotate(Math.PI / 4); //回転
        ctx.fillText(txt,arrayX[i],arrayY[i]-60);
      }

  };

}
