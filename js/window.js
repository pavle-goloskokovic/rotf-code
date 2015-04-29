/**
 * window.js
 *
 * window events
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

/**
 * On page load function
 */
window.onload = function(){

};

/**
 * On page resize function
 * @param event
 */
window.onresize = function(event) {
    rotf.interface.positionElements();
};

window.onfocus = function(){
    if(rotf.game && rotf.game.status){
        if(rotf.game.isFocused){
            return;
        }
        rotf.game.isFocused = true;
        if(!rotf.game.wasPausedOnBlur){
            rotf.game.continueGame();
        }
    }
};
window.onblur = function(){
    if(rotf.game && rotf.game.status){
        if(!rotf.game.isFocused){
            return;
        }
        rotf.game.isFocused = false;
        rotf.game.wasPausedOnBlur = rotf.game.isPaused;
        if(!rotf.game.wasPausedOnBlur){
            rotf.game.pauseGame();
        }
    }
};

