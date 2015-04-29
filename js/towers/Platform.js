/**
 * Platform.js
 *
 * Class representing a platform object
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    // Static private members

    var platformHitArea = null;

    var junkHotSpotHitArea = new createjs.Graphics()
        .f("rgba(0, 255, 0, 0.01)")
        .r(-65-13,-67+35,44,65);
    var plasmaHotSpotHitArea = new createjs.Graphics()
        .f("rgba(0, 0, 255, 0.01)")
        .r(-21-13,-67+35,42,65);
    var rocketHotSpotHitArea = new createjs.Graphics()
        .f("rgba(0, 255, 0, 0.01)")
        .r(21-13,-67+35,43,65);
    var buyDismissHotSpotHitArea = new createjs.Graphics()
        .f("rgba(255, 0, 0, 0.01)")
        .r(64-13,-60+35,27,32);

    var sellHotSpotHitArea = new createjs.Graphics()
        .f("rgba(0, 255, 0, 0.01)")
        .r(-42,-57+35,42,45);
    var sellDismissHotSpotHitArea = new createjs.Graphics()
        .f("rgba(255, 0, 0, 0.01)")
        .r(0,-57+35,43,45);


    var Platform = rotf.extend(createjs.Container, {

        //static members

    },{

        isDialogShown: false,
        light: null,
        tower: null,
        buyDialogContainer: null,
        sellDialogContainer: null,
        towerContainer: null,
        isInFront: false,

        // Constructor
        initialize: function(x,y,isInFront){

            // Call super constructor, necessary for extending createjs.Container class

            this._super();

            this.x = x;
            this.y = y;
            this.isInFront = isInFront;

            // Add platform sprite

            var platform = rotf.assetsFactory.getAsset("towers/platform.png");
            this.addChild(platform);

            if(!platformHitArea){
                var pb =  platform.getBounds();
                platformHitArea = new createjs.Shape(
                    new createjs.Graphics()
                        .f("#0f0")
                        .r(pb.x,pb.y,pb.width,pb.height)
                );
            }

            platform.hitArea = platformHitArea;

            platform.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        if (!this.isDialogShown) {
                            rotf.game.hidePlatformDialogs();
                        }
                        this.toggleDialog();
                    }
            }, this);


            // Add light sprite

            var light = rotf.assetsFactory.getAsset("towers/platform-light.png");
            light.x = -14;
            light.y = -35;
            light.framerate = 1 + Math.random(); // 1.? animations per second
            light.stop();
            this.addChild(light);

            this.light = light;


            // Add tower container

            var towerContainer = new createjs.Container();
            this.addChild(towerContainer);
            this.towerContainer = towerContainer;

            // Add buy dialog container

            var buyDialogContainer = new createjs.Container();
            buyDialogContainer.x = 13;
            buyDialogContainer.y = -35;
            buyDialogContainer.visible = false;
            this.addChild(buyDialogContainer);

            this.buyDialogContainer = buyDialogContainer;

            var buyDialog = rotf.assetsFactory.getAsset("towers/platform-buy-menu.png");
            buyDialogContainer.addChild(buyDialog);

            // Tower price texts

            var junkTowerPriceText = new createjs.Text(
                "100",
                    "bold 12px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            junkTowerPriceText.x = -63;
            junkTowerPriceText.y = 13;
            junkTowerPriceText.textAlign = "center";
            buyDialogContainer.addChild(junkTowerPriceText);

            var plasmaTowerPriceText = new createjs.Text(
                "150",
                    "bold 12px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            plasmaTowerPriceText.x = -21;
            plasmaTowerPriceText.y = 13;
            plasmaTowerPriceText.textAlign = "center";
            buyDialogContainer.addChild(plasmaTowerPriceText);

            var rocketTowerPriceText = new createjs.Text(
                "200",
                    "bold 12px " + rotf.Game.FONT_FAMILY,
                "#fff"
            );
            rocketTowerPriceText.x = 21;
            rocketTowerPriceText.y = 13;
            rocketTowerPriceText.textAlign = "center";
            buyDialogContainer.addChild(rocketTowerPriceText);

            // Add buy junk tower

            var junkHotSpot = new createjs.Shape(junkHotSpotHitArea);
            junkHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        rotf.game.addEvent({
                            type: "buyTower",
                            data: {
                                platform: this,
                                tower: new rotf.JunkTower(this)
                            }
                        });
                    }
            }, this);

            buyDialogContainer.addChild(junkHotSpot);


            // Add buy plasma tower

            var plasmaHotSpot = new createjs.Shape(plasmaHotSpotHitArea);
            plasmaHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        rotf.game.addEvent({
                            type: "buyTower",
                            data: {
                                platform: this,
                                tower: new rotf.PlasmaTower(this)
                            }
                        });
                    }
            }, this);

            buyDialogContainer.addChild(plasmaHotSpot);


            // Add buy rocket tower

            var rocketHotSpot = new createjs.Shape(rocketHotSpotHitArea);
            rocketHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        rotf.game.addEvent({
                            type: "buyTower",
                            data: {
                                platform: this,
                                tower: new rotf.RocketTower(this)
                            }
                        });
                    }
            }, this);

            buyDialogContainer.addChild(rocketHotSpot);


            // Add dismiss buy dialog

            var buyDismissHotSpot = new createjs.Shape(buyDismissHotSpotHitArea);
            buyDismissHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        this.hideDialog();
                    }
            }, this);

            buyDialogContainer.addChild(buyDismissHotSpot);


            // Add sell dialog container

            var sellDialogContainer = new createjs.Container();
            sellDialogContainer.x = 0;
            sellDialogContainer.y = -35;
            sellDialogContainer.visible = false;
            this.addChild(sellDialogContainer);

            this.sellDialogContainer = sellDialogContainer;


            // Add sell dialog sprite

            var sellDialog = rotf.assetsFactory.getAsset("towers/platform-sell-menu.png");
            sellDialogContainer.addChild(sellDialog);

            // Add buy rocket tower

            var sellHotSpot = new createjs.Shape(sellHotSpotHitArea);
            sellHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        rotf.game.addEvent({
                            type: "sellTower",
                            data: {
                                platform: this
                            }
                        });
                    }
            }, this);

            sellDialogContainer.addChild(sellHotSpot);


            // Add dismiss buy dialog

            var sellDismissHotSpot = new createjs.Shape(sellDismissHotSpotHitArea);
            sellDismissHotSpot.on("mousedown", function(evt) {
                    if(!rotf.game.isPaused) {
                        this.hideDialog();
                    }
            }, this);

            sellDialogContainer.addChild(sellDismissHotSpot);

        },

        showDialog: function () {
            this.isDialogShown = true;
            rotf.game.pushPlatformInFront(this);
            if(this.tower){
                this.sellDialogContainer.visible = true;
            }else{
                this.buyDialogContainer.visible = true;
            }
        },
        hideDialog: function () {
            this.isDialogShown = false;
            if(!this.isInFront){
                rotf.game.pushPlatformBehind(this);
            }
            this.buyDialogContainer.visible = false;
            this.sellDialogContainer.visible = false;
        },
        toggleDialog: function () {
            if(!this.isDialogShown){
                this.showDialog();
            }else{
                this.hideDialog();
            }
        },

        update : function(delta){
            this.light.advance(delta);
            if(this.tower !== null){
                this.tower.update(delta);
            }
        },

        buyTower: function (tower) {
            this.tower = tower;
            this.towerContainer.addChild(tower);
            this.hideDialog();
        },
        sellTower: function(){
            this.tower = null;
            this.towerContainer.removeAllChildren();
            this.hideDialog();
        },

        removeTower: function(){
            if(this.tower){
                this.tower.platform = null;
                this.tower = null;
            }
            this.towerContainer.removeAllChildren();
        }
    });

    rotf.Platform = Platform;

}());