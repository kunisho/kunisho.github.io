
  var ac = document.getElementById("ac"); // canvas要素のオブジェクトを取得
  ac.ontouchstart = function (e) {
    e.preventDefault();     // デフォルトイベントをキャンセル
    var s = "";             // 変数sを初期化

    // 引数のtouchesプロパティは配列の要素数（触れている指の数）だけ繰り返し処理
    for (var i = 0; i < e.touches.length; i++) {
      var t = e.touches[i];       // 触れている指に関する情報を取得

      s += "[" + i + "]";
      s += "x=" + t.pageX + ",";
      s += "y=" + t.pageY + "<br>";
    }
    document.getElementById("disp").innerHTML = s;  // 生成した文字列を画面に表示
  };
