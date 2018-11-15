

window.onload = function(){
  var ac = document.getElementById("cv"); // canvas要素のオブジェクトを取得


  ac.ontouchstart = function (e) {

    document.getElementById("disp").innerHTML = "touch";


      e.preventDefault();     // デフォルトイベントをキャンセル
      var s = "";             // 変数sを初期化

      var arrayX = [];
      var arrayY = [];


      // 引数のtouchesプロパティは配列の要素数（触れている指の数）だけ繰り返し処理
      for (var i = 0; i < e.touches.length; i++) {
          var t = e.touches[i];       // 触れている指に関する情報を取得

          s += "[" + i + "]";
          s += "x=" + t.pageX + ",";
          s += "y=" + t.pageY + "<br>";

          arrayX.push(t.pageX);
          arrayY.push(t.pageY);
          //console.log(array); // ['a', 'b', 'c']
      }
      document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示

      var ctx = document.getElementById("cv").getContext("2d");



      ctx.strokeStyle = "white";  //線の色を緑に指定
      ctx.fillStyle = "white";  //塗り潰しの色を赤に指定
      ctx.strokeRect(0,0,0,0);
      ctx.fillRect(0,0,1000, 600);



      ctx.strokeStyle = "black";  //線の色を緑に指定
        for (var i = 0; i < e.touches.length; i++) {
        ctx.beginPath();
        ctx.arc(arrayX[i], arrayY[i], 50, 0, Math.PI*2, true);
        ctx.stroke();

        //----テキスト-----
              var txt =1; //描画する文字

              ctx.font = "40px Arial"; //フォントにArial,40px,斜体を指定
              ctx.fillStyle = "green"; //塗り潰し色を緑に
              ctx.fillText(txt,arrayX[i],arrayY[i]);      //テキストを塗り潰しで描画

        //------

      }

  };

}
