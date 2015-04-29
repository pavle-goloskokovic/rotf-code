/**
 * Game.js
 *
 * Contains game class and logic related to the flow of the game
 *
 * Copyright (c) 2013-2014 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var ASSETS_DEFINITION_URL = "tp/gameAtlas.json",
        ASSETS_IMAGE_URL = "tp/gameAtlas.png",
        MAP_DEFINITION_URL = "tld/map.json";

    var dataQueue = null;

    var dataQueueManifest = [
        {id:"assets_image", src: ASSETS_IMAGE_URL},
        {id:"assets_definition", src: ASSETS_DEFINITION_URL},
        {id:"map_definition", src: MAP_DEFINITION_URL}
    ];

    var soundQueue = null;

    var soundQueueManifest = [
        {id:"menu.ogg", src: "audio/menu.ogg"},
        {id:"play.ogg", src: "audio/play.ogg"},
        {id:"end-win.ogg", src: "audio/end-win.ogg"},
        {id:"end-lost.ogg", src: "audio/end-lost.ogg"},
        {id:"coins.ogg", src: "audio/coins.ogg"},
        {id:"junk-shoot.ogg", src: "audio/junk-shoot.ogg", data: {channels:2}},
        {id:"junk-explode.ogg", src: "audio/junk-explode.ogg", data: {channels:2}},
        {id:"plasma-shoot.ogg", src: "audio/plasma-shoot.ogg", data: {channels:2}},
        {id:"plasma-explode.ogg", src: "audio/plasma-explode.ogg", data: {channels:2}},
        {id:"rocket-shoot.ogg", src: "audio/rocket-shoot.ogg",data: {channels:2}},
        {id:"rocket-explode.ogg", src: "audio/rocket-explode.ogg", data: {channels:2}},
        {id:"died-rabbit.ogg", src: "audio/died-rabbit.ogg", data: {channels:2}},
        {id:"died-cat.ogg", src: "audio/died-cat.ogg", data: {channels:2}},
        {id:"died-dog.ogg", src: "audio/died-dog.ogg", data: {channels:2}},
        {id:"died-bear.ogg", src: "audio/died-bear.ogg", data: {channels:2}}
    ];

    /**
     * Class that represents the game object
     * @type {*}
     */
    var Game = rotf.extend( createjs.EventDispatcher, {

        // Static public members

        CANVAS_WIDTH: 1070,
        CANVAS_HEIGHT: 600,
        FRAMERATE: 60,
        FONT_FAMILY: "'Asap', sans-serif",

        /**
         * Enum for representing game states
         * @type {{MENU_STATE: number, PLAY_STATE: number, END_STATE: number}}
         */
        GameState : {
            MENU_STATE: 1,
            PLAY_STATE: 2,
            END_STATE: 3
        }

    },{

        stage: null,
        status: null,

        path: null,
        waveManager: null,
        _resetDialog: null,
        _exitDialog: null,

        platformsBehindContainer: null,
        enemiesContainer: null,
        platformsInFrontContainer: null,
        bulletsContainer: null,
        animationsContainer: null,

        onPlayStateNextFrameTickHandle: null,

        isPaused: false,
        wasPausedOnBlur: false,
        isFocused: true,

        _events: null,

        /**
         * Game constructor
         */
        initialize: function(){

            // Position elements

            rotf.interface.positionElements();

            // Create stage

            var canvas = document.getElementById('game-canvas');
            canvas.width = Game.CANVAS_WIDTH;
            canvas.height = Game.CANVAS_HEIGHT;

            this.stage = new createjs.Stage(canvas);

            // Add loading text

            var loadingText = new createjs.Text(
                "Loading... 0%",
                "11px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            loadingText.x = (Game.CANVAS_WIDTH / 2)|0;
            loadingText.y = (Game.CANVAS_HEIGHT / 2)|0;
            loadingText.textAlign = "center";

            this.stage.addChild(loadingText);
            this.stage.update();

            // Add fps text

            var fpsText = new createjs.Text(
                "-",
                "bold 16px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            fpsText.x = 10;
            fpsText.y = 10;

            this.fpsText = fpsText;

            // Enable touch events
            createjs.Touch.enable(this.stage);

            dataQueue = new createjs.LoadQueue(true); // false enables local xhr
            dataQueue.on("fileload", handleDataQueueFileLoad, this);
            dataQueue.on("error", handleDataQueueError, this);
            dataQueue.on("progress", handleDataQueueProgress, this);
            dataQueue.on("complete", handleDataQueueComplete, this);
            dataQueue.loadManifest(dataQueueManifest);

            var isFirefox = typeof InstallTrigger !== 'undefined';
            if(isFirefox){
                createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
            }else{
                createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
            }

            soundQueue = new createjs.LoadQueue(true); // false enables local xhr
            soundQueue.installPlugin(createjs.Sound);
            soundQueue.on("fileload", handleSoundQueueFileLoad, this);
            soundQueue.on("error", handleSoundQueueError, this);
            soundQueue.on("progress", handleSoundQueueProgress, this);
            soundQueue.on("complete", handleSoundQueueComplete, this);
            soundQueue.loadManifest(soundQueueManifest);

            // Event handlers for loading data

            function handleDataQueueError(event){
                console.error("Failed loading file:  \"" + event.item.src + "\"");
            }
            function handleDataQueueFileLoad(event){

            }
            function handleDataQueueProgress(event){
                var progress = (event.progress*100)|0;
                if(progress < 95){
                    progress += rotf.Util.randomInterval(0,5)
                }
                loadingText.text = "Loading... " + progress + "%";
                this.stage.update();
            }
            function handleDataQueueComplete(event){
                this.stage.removeChild(loadingText);
                this._loadAssetsFactory();
            }

            // Event handlers for loading sound

            function handleSoundQueueError(event){
                console.error("Failed loading file:  \"" + event.item.src + "\"");
            }
            function handleSoundQueueFileLoad(event){
                if(rotf.Game && rotf.game && rotf.game.status){
                    switch(event.result.src){
                        case "audio/menu.ogg":
                            if(rotf.game.status.state == rotf.Game.GameState.MENU_STATE){
                                createjs.Sound.stop();
                                createjs.Sound.play("menu.ogg","none",0,0,-1,0.2);
                                //rotf.interface.showMuteButton();
                            }
                            break;
                        case "audio/play.ogg":
                            if(rotf.game.status.state == rotf.Game.GameState.PLAY_STATE){
                                createjs.Sound.stop();
                                createjs.Sound.play("play.ogg","none",0,0,-1,0.2);
                                //rotf.interface.showMuteButton();
                            }
                            break;
                    }
                }

            }
            function handleSoundQueueProgress(event){

            }
            function handleSoundQueueComplete(event){
                //rotf.interface.showMuteButton();
            }
        },

        _loadAssetsFactory: function(){

            // Load assets definition into AssetsFactory

            var assetsDefinition = dataQueue.getResult("assets_definition");

            rotf.assetsFactory.load(
                assetsDefinition,
                ASSETS_IMAGE_URL,
                function(evt){ // event passed if async

                    this._onLoaded();

                }, this);
        },

        _initEvents: function () {

            this._events = [];

            this.stage.on("stagemousedown", function(evt) {

                var targetChild = evt.currentTarget.getObjectUnderPoint(evt.rawX, evt.rawY);
                if(!targetChild || (targetChild._listeners && !targetChild._listeners["mousedown"])){
                    this.hidePlatformDialogs();
                }
            },this);

        },

        _onLoaded: function(){

            this._initEvents();

            // Init status

            this.status = {};

            // Initialize interface

            rotf.interface.init();

            // Add map background

            var map = rotf.assetsFactory.getAsset("map/map.png");
            map.x = (Game.CANVAS_WIDTH / 2)|0;
            map.y = (Game.CANVAS_HEIGHT / 2)|0;
            this.stage.addChild(map);

            // Add platforms behind enemies

            var platformsBehindContainer = new createjs.Container();
            this.stage.addChild(platformsBehindContainer);
            this.platformsBehindContainer = platformsBehindContainer;

            // Add enemies container

            var enemiesContainer = new createjs.Container();
            this.stage.addChild(enemiesContainer);
            this.enemiesContainer = enemiesContainer;

            // Add animations container

            var animationsContainer = new createjs.Container();
            this.stage.addChild(animationsContainer);
            this.animationsContainer = animationsContainer;

            // Add platforms in front of enemies

            var platformsInFrontContainer = new createjs.Container();
            this.stage.addChild(platformsInFrontContainer);
            this.platformsInFrontContainer = platformsInFrontContainer;

            // Add bullets container

            var bulletsContainer = new createjs.Container();
            this.stage.addChild(bulletsContainer);
            this.bulletsContainer = bulletsContainer;

            // Add reset dialog

            this._resetDialog = new rotf.PopUpDialog(
                (Game.CANVAS_WIDTH/2)|0,
                (Game.CANVAS_HEIGHT/2)|0,
                "RESET GAME?",
                this.resetPlayState,
                this.hideResetDialog
            );
            this.stage.addChild(this._resetDialog);

            // Add exit dialog

            this._exitDialog = new rotf.PopUpDialog(
                (Game.CANVAS_WIDTH/2)|0,
                (Game.CANVAS_HEIGHT/2)|0,
                "EXIT TO MENU?",
                this.initMenuState,
                this.hideExitDialog
            );
            this.stage.addChild(this._exitDialog);

            // Load level definitions into LevelManager

            var mapDefinition = dataQueue.getResult("map_definition");
            this._loadMapDefinition(mapDefinition);

            createjs.Ticker.setFPS(Game.FRAMERATE);

            this.initMenuState();

        },

        /**
         * Main loop function
         */
        onPlayStateNextFrame: function(event){

            //this.fpsText.text = createjs.Ticker.getMeasuredFPS();

            if(event.paused) return;

            var delta = event.delta; // in ms

            //handle events
            this._handleEvents();

            //update enemies
            var enemies = this.enemiesContainer.children;
            for(var i=0; i<enemies.length; i++){
                enemies[i].update(delta);
            }

            //sort enemies by their path progress for shooting
            enemies.sort(function(foo,bar){return (foo.progress>bar.progress?-1:1);});

            //update bullets
            for(i=0; i<this.bulletsContainer.children.length; i++){
                this.bulletsContainer.children[i].update(delta);
            }

            //update all platforms
            var platforms = this.platformsBehindContainer.children;
            for(i=0; i<platforms.length; i++){
                platforms[i].update(delta);
            }
            platforms = this.platformsInFrontContainer.children;
            for(i=0; i<platforms.length; i++){
                platforms[i].update(delta);
            }

            //update wave manager
            this.waveManager.update(delta);

            //sort enemies for next drawing
            enemies.sort(function(foo,bar){return (foo.y<bar.y?-1:1);});

            //update animations
            var animations = this.animationsContainer.children;
            for(i=0; i<animations.length; i++){
                animations[i].update(delta);
            }

            //draw
            this.stage.update();

        },

        /**
         * Function that handles game state change
         * @param nextState
         */
        changeState: function(nextState){

            if(nextState == this.status.state){return;}

            switch(nextState){
                case Game.GameState.MENU_STATE:
                    this.initMenuState();
                    break;
                case Game.GameState.PLAY_STATE:
                    this.initPlayState();
                    break;
                case Game.GameState.END_STATE:
                    this.initEndState();
                    break;
            }

            this.status.state = nextState;
        },

        initMenuState: function(){

            if(this.onPlayStateNextFrameTickHandle){
                createjs.Ticker.off("tick", this.onPlayStateNextFrameTickHandle);
                this.onPlayStateNextFrameTickHandle = null;
            }

            createjs.Sound.stop();
            createjs.Sound.play("menu.ogg","none",0,0,-1,0.2);

            this.status = {
                state: Game.GameState.MENU_STATE
            };

            rotf.interface.hideEnd();
            rotf.interface.showInterface();
            rotf.interface.showMenu();
        },

        initPlayState: function(){

            createjs.Sound.stop();
            createjs.Sound.play("play.ogg","none",0,0,-1,0.2);

            this._events = [];

            this.status = {
                state: Game.GameState.PLAY_STATE,
                lives:5,
                money: 150
            };
            this.bulletsContainer.removeAllChildren();
            this.enemiesContainer.removeAllChildren();

            this.waveManager = new rotf.WaveManager(2000);

            this.removePlatformTowers();

            this.hidePlatformDialogs();

            this.hideResetDialog();
            this.hideExitDialog();

            // hide other states

            rotf.interface.hideInterface();

            //this.stage.addChild(this.fpsText);

            // Setup interval loop

            this.onPlayStateNextFrameTickHandle =
                createjs.Ticker.on("tick", this.onPlayStateNextFrame, this);

            createjs.Ticker.setPaused(false);
        },

        resetPlayState: function () {

            createjs.Ticker.off("tick", this.onPlayStateNextFrameTickHandle);
            this.onPlayStateNextFrameTickHandle = null;

            createjs.Sound.stop();

            this.initPlayState();

        },

        initEndState: function(){

            createjs.Ticker.off("tick", this.onPlayStateNextFrameTickHandle);
            this.onPlayStateNextFrameTickHandle = null;

            createjs.Sound.stop();

            rotf.interface.hideMenu();
            rotf.interface.showInterface();

            if(rotf.game.status.lives>0){

                rotf.interface.showEndWin();

                createjs.Sound.play("end-win.ogg","none",0,0,-1,0.2);

            }else{

                rotf.interface.showEndLoose();

                createjs.Sound.play("end-lost.ogg","none",0,0,-1,0.2);
            }

            this.status = {
                state: Game.GameState.END_STATE
            };
        },

        endGame: function(){
            var thiz = this;
            setTimeout(function(){
                thiz.changeState(Game.GameState.END_STATE);
            }, 1500);
        },

        pauseGame: function(){

            if(this.status.state != Game.GameState.PLAY_STATE || this.isPaused){
                return;
            }
            this.isPaused = true;
            createjs.Ticker.setPaused(true);
        },

        continueGame: function(){

            if(this.status.state != Game.GameState.PLAY_STATE || !this.isPaused){
                return;
            }
            this.isPaused = false;
            createjs.Ticker.setPaused(false);
        },

        togglePause: function(){
            if(this.isPaused){
                this.continueGame();
            }else{
                this.pauseGame();
            }
        },

        /**
         * Function for pushing platform in front of enemies
         * for drawing purposes
         * @param platform
         */
        pushPlatformInFront: function(platform){
            this.platformsInFrontContainer.addChild(platform);
        },
        /**
         * Function for pushing platform behind enemies
         * for drawing purposes
         * @param platform
         */
        pushPlatformBehind: function(platform){
            this.platformsBehindContainer.addChild(platform);
        },

        addEvent: function(evt){
            if(!this.isPaused){
                this._events.push(evt);
            }
        },

        _handleEvents: function(){

            while(this._events.length > 0){

                var evt = this._events.shift(),
                    type = evt.type,
                    data = evt.data;

                switch (type){

                    case "pause":

                        this.togglePause();
                        break;

                    case "reset":
                    case "exit":

                        this.pauseGame();
                        break;

                    case "buyTower":

                        var tower = data.tower;
                        var platform = data.platform;

                        if(rotf.game.status.money >= tower.buyPrice){

                            rotf.game.status.money-=tower.buyPrice;
                            platform.buyTower(tower);

                            createjs.Sound.play("coins.ogg","none",0,0,0,0.3);
                        }

                        break;

                    case "sellTower":

                        platform = data.platform;

                        rotf.game.status.money+=platform.tower.sellPrice;
                        platform.sellTower();

                        createjs.Sound.play("coins.ogg","none",0,0,0,0.3);

                        break;

                    default:
                        console.warn("Unknown event \'" + type + "\'");
                }
            }
        },

        removePlatformTowers: function () {
            for(var i=0; i<this.platformsBehindContainer.children.length; i++){
                this.platformsBehindContainer.getChildAt(i).removeTower();
            }
            for(i=0; i<this.platformsInFrontContainer.children.length; i++){
                this.platformsInFrontContainer.getChildAt(i).removeTower();
            }
        },

        hidePlatformDialogs: function(){
            for(var i=0; i<this.platformsBehindContainer.children.length; i++){
                this.platformsBehindContainer.getChildAt(i).hideDialog();
            }
            for(i=0; i<this.platformsInFrontContainer.children.length; i++){
                this.platformsInFrontContainer.getChildAt(i).hideDialog();
            }
        },

        showResetDialog: function () {
            this._resetDialog.visible = true;
            this.addEvent({type: "reset"});
        },

        hideResetDialog: function () {
            this._resetDialog.visible = false;
            this.continueGame();
        },

        showExitDialog: function () {
            this._exitDialog.visible = true;
            this.addEvent({type: "exit"});
        },

        hideExitDialog: function () {
            this._exitDialog.visible = false;
            this.continueGame();
        },

        _loadMapDefinition: function(definition){

            if(!definition){console.error("_loadMapDefinition() error: definition undefined."); return;}

            for(var li = definition.layers.length-1; li >= 0 ; li--) {

                var layer = definition.layers[li];
                var objects = layer.objects;

                if(layer.type != "objectgroup") continue;

                // if layer is an object layer we parse its definition
                // to create corresponding objects

                switch(layer.name){
                    // we define path array for this map
                    case "path":
                        this.path = [];
                        // sort path points by their ordinal number
                        objects.sort(function(foo,bar){return (parseInt(foo.properties.ord)<parseInt(bar.properties.ord)?-1:1);});
                        for(var i=0; i<objects.length; i++){
                            // add point to path array
                            this.path.push({x: objects[i].x, y: objects[i].y});
                        }

                        var length = 0;
                        for(i=1; i<objects.length; i++){
                            var obj1 = objects[i-1],
                                obj2 = objects[i];
                            // add point to path array
                            length += rotf.Util.vectorMagnitude(obj1.x, obj2.x, obj1.y, obj2.y);
                        }
                        //console.log(length);

                        break;
                    // we define map items array for this map
                    case "animations":
                        for(i=0; i<objects.length; i++){
                            // we take object type which represents name of the class
                            // and get that class object form "window" map
                            if(rotf[objects[i].type]){
                                this.animationsContainer.addChild(new rotf[objects[i].type](objects[i].x,objects[i].y));
                            }
                        }
                        break;
                    // we define platforms array for this map for platforms
                    // that need to be drawn in front of the enemies
                    case "platformsInFront":
                        for(i=0; i<objects.length; i++){
                            var platform = new rotf.Platform(objects[i].x,objects[i].y,true);
                            this.platformsInFrontContainer.addChild(platform);
                        }
                        break;
                    // we define platforms array for this map for platforms
                    // that need to be drawn behind the enemies
                    case "platformsBehind":
                        for(i=0; i<objects.length; i++){
                            var platform = new rotf.Platform(objects[i].x,objects[i].y,false);
                            this.platformsBehindContainer.addChild(platform);
                        }
                        break;
                }
            }

            // check if map definition is missing any of the required layers
            // and display an error if true
            if( this.platformsInFrontContainer == null || this.platformsInFrontContainer.children.length == 0
                || this.platformsBehindContainer == null || this.platformsBehindContainer.children.length == 0
                || this.animationsContainer == null || this.animationsContainer.children.length == 0
                || this.path == null || this.path.length == 0){
                console.error("Map JSON file doesn't contain all required layers or their objects (platforms, mapItems or path)!");
            }
        }
    });

    /**
     * add Game class to rotf package
     * @type {*}
     */
    rotf.Game = Game;

    /**
     * Global game object
     */
    rotf.game = new Game();

}());
