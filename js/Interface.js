/**
 * Interface.js
 *
 * Contains class and logic for game interface
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    rotf.interface = {

        init: function(){

            // Add page background
            new rotf.Background();

            // Add glow to game canvas

            document.getElementById('game-canvas').classList.add('glow');

            this.showMuteButton();
        },

        /**
         * Function for positioning DOM elements on a page.
         * Gets called on page load event and on page resize event.
         */
        positionElements: function(){
            var v = rotf.Util.viewport();
            var gameScale = 1.2;
            if(rotf.Util.isMobileViewport(v)){
                gameScale = 1;
            }

            var top = (v.height/2-rotf.Game.CANVAS_HEIGHT/2) + "px";
            var left = (v.width/2-rotf.Game.CANVAS_WIDTH/2) + "px";
            var gameInterface = document.getElementById('game-interface');
            var gameCanvas = document.getElementById('game-canvas');
            var muteButton = document.getElementById('mute-toggle');
            gameCanvas.style.left = gameInterface.style.left = left;
            gameCanvas.style.top = gameInterface.style.top = top;

            var transform;

            var game = {
                width:rotf.Game.CANVAS_WIDTH * gameScale,
                height:rotf.Game.CANVAS_HEIGHT * gameScale
            };

            if(v.height < game.height || v.width < game.width){

                var gameRatio = game.width / game.height;
                var viewportRatio = v.width / v.height;

                var scale;

                if(gameRatio <= viewportRatio){
                    scale = (v.height / game.height);
                }else{
                    scale = (v.width / game.width);
                }

                transform = "scale(" + scale + ")";

            }else{
                transform = "";
            }

            gameCanvas.style.webkitTransform = gameInterface.style.webkitTransform = muteButton.style.webkitTransform =
                gameCanvas.style.MozTransform = gameInterface.style.MozTransform = muteButton.style.MozTransform =
                    gameCanvas.style.msTransform = gameInterface.style.msTransform = muteButton.style.msTransform =
                        gameCanvas.style.OTransform = gameInterface.style.OTransform = muteButton.style.OTransform =
                            gameCanvas.style.transform = gameInterface.style.transform = muteButton.style.transform = transform;
        },

        showInterface: function(){
            document.getElementById('game-interface').style.display = 'block';
        },

        hideInterface: function(){
            document.getElementById('game-interface').style.display = '';
        },

        showMenu: function(){
            document.getElementById('menu-state').style.display = 'block';
        },

        hideMenu: function(){
            document.getElementById('menu-state').style.display = '';
        },

        showInstructions: function(){
            document.getElementById('instructions').style.display = 'block';
            document.getElementById('menu-state').style.display = 'none';
        },

        hideInstructions: function(){
            document.getElementById('instructions').style.display = '';
            document.getElementById('menu-state').style.display = 'block';
        },

        showAbout: function(){
            document.getElementById('about').style.display = 'block';
            document.getElementById('menu-state').style.display = '';
        },

        hideAbout: function(){
            document.getElementById('about').style.display = '';
            document.getElementById('menu-state').style.display = 'block';
        },

        showEndWin: function(){
            var endState = document.getElementById('end-state');
            var endStateWon = document.getElementById('end-state-won-wrapper');            var endStateLost = document.getElementById('end-state-lost-wrapper');
            var endStateLost = document.getElementById('end-state-lost-wrapper');
            endState.style.display = endStateWon.style.display = 'block';
            endStateLost.style.display = '';
        },

        showEndLoose: function(){
            var endState = document.getElementById('end-state');
            var endStateWon = document.getElementById('end-state-won-wrapper');
            var endStateLost = document.getElementById('end-state-lost-wrapper');
            endState.style.display = endStateLost.style.display = 'block';
            endStateWon.style.display = '';
        },

        hideEnd: function(){
            document.getElementById('end-state').style.display = '';
        },

        showMuteButton: function () {
            document.getElementById('mute-toggle').style.display = 'block';
        }
    };

    document.getElementById('menu-play-btn').onclick = function(){
        rotf.game.initPlayState();
    };
    document.getElementById('instructions-btn').onclick = function(){
        rotf.interface.showInstructions();
    };
    document.getElementById('about-btn').onclick = function(){
        rotf.interface.showAbout();
    };

    document.getElementById('instructions-back').onclick = function(){
        rotf.interface.hideInstructions();
    };
    document.getElementById('about-back').onclick = function(){
        rotf.interface.hideAbout();
    };

    document.getElementById('end_play_btn').onclick = function(){
        rotf.game.initPlayState();
    };
    document.getElementById('end-menu-btn').onclick = function(){
        rotf.game.initMenuState()
    };

    document.getElementById('mute-toggle').onclick = function(evt){
        evt.target.classList.toggle('mute-off');
        evt.target.classList.toggle('mute-on');
        createjs.Sound.setMute(!createjs.Sound.getMute());
    };

}());