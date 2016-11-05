    /**
     * ローパスフィルタを実装するための関数
     * 前回の値を使用するのでそれを保持する変数をプロパティに持つ
     */
    effector = function(){
        this.prev = 0;
    };

    /**
     * X Y Zの三軸それぞれにeffector()関数をnewする。
     */
    effectorX = new effector();
    effectorY = new effector();
    effectorZ = new effector();

    /**
     * ローパスフィルタ
     */
    effector.prototype.lpf = function(data){
        var output = (this.prev * 0.92) + (data * 0.08);

        this.prev = output;
        return output;
    };

    /**
     * 差分取得
     */
    effector.prototype.diff = function(data){
      var output = Math.abs(this.prev - data);
      return output;
    }

    /**
     * 加速度センサーのイベントハンドラ
     */
    $(window).on('devicemotion',function(e){

        var
        /**
         * 重力加速度イベントへの参照
         */
        acclData = e.originalEvent.accelerationIncludingGravity;
        display = { x : $('#x'), y : $('#y'), z : $('#z') };

        /**
         * 各軸のデータをローパスフィルタにかける
         */
        x = effectorX.lpf(acclData.x);
        y = effectorY.lpf(acclData.y);
        z = effectorZ.lpf(acclData.z);

        xdiff = effectorX.diff(acclData.x);
        ydiff = effectorY.diff(acclData.y);
        zdiff = effectorZ.diff(acclData.z);

        // 閾値以上の動きをトリガに作業中のくそみそ感検出
        /*if (9.99 < xdiff && 9.99 < ydiff && 9.99 < zdiff) {
          $('p').text(xdiff);
          $(document.body).css( "background", "red" );
        }*/

        var xp = Math.floor(256 * (x + 10.0) / 20.0);
        var yp = Math.floor(256 * (y + 10.0) / 20.0);
        var zp = Math.floor(256 * (z + 10.0) / 20.0);
        var randomColor = new RGBColor("rgb("+xp+","+yp+","+zp+")");
        $(document.body).css( "background", randomColor.toHex() );

        /**
         * 実データを表示
         */
         $('input[name="acclColor"]').val(randomColor.toHex());
        /*display.x.text(x);
        display.y.text(y);
        display.z.text(z);*/
    });