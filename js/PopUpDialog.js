/**
 * ResetDialog.js
 *
 * Class for representing interface dialog for resetting game.
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members


    rotf.PopUpDialog = rotf.extend( createjs.Container, {

        //static members

    },{

        // Constructor
        initialize: function(x, y, questionText, onYes, onNo){
            // Call super constructor, necessary for extending createjs.Container class
            this._super();

            this.x = x;
            this.y = y;

            // backdrop

            var backdrop = new createjs.Shape(
                new createjs.Graphics()
                    .f("rgba(51, 51, 51, 0.4)")
                    .r(-rotf.Game.CANVAS_WIDTH/2,
                    -rotf.Game.CANVAS_HEIGHT/2,
                    rotf.Game.CANVAS_WIDTH,
                    rotf.Game.CANVAS_HEIGHT)
            );

            backdrop.on("mousedown", function(evt) {
                if(onNo){ onNo.call(rotf.game) }
            }, this);

            this.addChild(backdrop);

            // dialog

            this.addChild(
                new createjs.Shape(
                    new createjs.Graphics()
                        .lf(["#262625","#2b2b2a"], [0, 1], 0, 0, -10, 10)
                        .s('#FFF')
                        .ss(2)
                        .rr(-80,-45,160,90, 8)
                )
            );

            // question text

            var question = new createjs.Text(
                questionText,
                "bold 20px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            question.y = -33;
            question.textAlign = "center";

            this.questionText = question;
            this.addChild(question);

            // yes button

            var yesButton = new createjs.Shape(
                new createjs.Graphics()
                    .lf(["#262625","#2b2b2a"], [0, 1], 0, 0, -10, 10)
                    .s('#FFF')
                    .ss(1.5)
                    .rr(-60,5,50,25, 4)
            );

            yesButton.hitArea = new createjs.Shape(
                new createjs.Graphics()
                    .f("rgba(0, 255, 0, 1)")
                    .r(-80, -5, 80, 50)
            );

            yesButton.on("mousedown", function(evt) {
                if(onYes){  onYes.call(rotf.game); }
            }, this);

            this.addChild(yesButton);

            var yesText = new createjs.Text(
                "Yes",
                "bold 18px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            yesText.x = -35;
            yesText.y = 7;
            yesText.textAlign = "center";
            this.addChild(yesText);

            // no button

            this.addChild(
                new createjs.Shape(
                    new createjs.Graphics()
                        .lf(["#262625","#2b2b2a"], [0, 1], 0, 0, -10, 10)
                        .s('#FFF')
                        .ss(1.5)
                        .rr(10,5,50,25, 4)
                )
            );

            var noText = new createjs.Text(
                "No",
                "bold 18px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            noText.x = 35;
            noText.y = 7;
            noText.textAlign = "center";
            this.addChild(noText);

        }

    });

}());