/**
 * StatusBar.js
 *
 * Status bar map item
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var buttonHitArea = new createjs.Shape(new createjs.Graphics()
        .f("rgba(0, 255, 0, 1)")
        .r(-15,-15,30,30));

    rotf.StatusBar = rotf.extend( rotf.Animation, {

        //static members

    },{
        enemyIcon: null,
        waveText: null,
        livesText: null,
        moneyText: null,
        pausePlayBtn: null,

        // Constructor
        initialize: function(x,y){

            // money icon

            this._super(x,y,"map/money.png");
            this.sprite.x = 149;

            // money text

            var moneyText = new createjs.Text(
                "-",
                "bold 16px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            moneyText.x = 172;
            moneyText.y = 0;
            moneyText.textAlign = "left";

            this.addChild(moneyText);
            this.moneyText = moneyText;

            // lives text

            var livesText = new createjs.Text(
                "-",
                "bold 16px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            livesText.x = 114;
            livesText.y = 0;
            livesText.textAlign = "center";

            this.addChild(livesText);
            this.livesText = livesText;

            // lives icon

            var lives = rotf.assetsFactory.getAsset("map/life.png");
            lives.x = 87;
            this.addChild(lives);

            // wave text

            var waveText = new createjs.Text(
                "-",
                "bold 16px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            waveText.x = 20;
            waveText.y = 0;
            waveText.textAlign = "left";

            this.addChild(waveText);
            this.waveText = waveText;

            // enemy waves icon

            var enemyWaves = rotf.assetsFactory.getAsset("map/enemy-wave.png");
            enemyWaves.x = 2;
            enemyWaves.stop();
            this.addChild(enemyWaves);
            this.enemyIcon = enemyWaves;

            // vertical line

            var verticalLine = new createjs.Shape(
                new createjs.Graphics()
                    .f('#FFF')
                    .s('#FFF')
                    .mt(0, -15)
                    .lt(0, 15)
            );
            verticalLine.x = -32;

            this.addChild(verticalLine);

            // play pause button

            var pausePlayBtn = rotf.assetsFactory.getAsset("map/pause-play.png");
            pausePlayBtn.x = -64;
            pausePlayBtn.stop();

            pausePlayBtn.hitArea = buttonHitArea;
            pausePlayBtn.on("mousedown", function(evt) {

                this.pausePlayBtn.currentAnimationFrame = rotf.game.isPaused ? 0 : 1;

                if(!rotf.game.isPaused){
                    rotf.game.addEvent({
                        type: "pause"
                    });
                }else{
                    rotf.game.continueGame();
                }

            }, this);

            this.addChild(pausePlayBtn);
            this.pausePlayBtn = pausePlayBtn;

            // reset button

            var resetBtn = rotf.assetsFactory.getAsset("map/restart.png");
            resetBtn.x = -111;

            resetBtn.hitArea = buttonHitArea;
            resetBtn.on("mousedown", function(evt) {
                if(!rotf.game.isPaused){
                    rotf.game.showResetDialog();
                }
            }, this);

            this.addChild(resetBtn);

            // exit button

            var exitBtn = rotf.assetsFactory.getAsset("map/exit.png");
            exitBtn.x = -158;

            exitBtn.hitArea = buttonHitArea;
            exitBtn.on("mousedown", function(evt) {
                if(!rotf.game.isPaused){
                    rotf.game.showExitDialog();
                }
            }, this);

            this.addChild(exitBtn);
        },

        update: function(){

            var wm = rotf.game.waveManager;

            this.enemyIcon.currentAnimationFrame = wm.waves[wm.currWave].after?0:1;
            this.waveText.text = (wm.currWave+1) + "/" + wm.waves.length;
            this.livesText.text = rotf.game.status.lives<0?"0":rotf.game.status.lives;
            this.moneyText.text = rotf.game.status.money;
        }
    });

}());