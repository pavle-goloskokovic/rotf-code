/**
 * WaveManager.js
 *
 * Class representing a wave manager object
 * This class is responsible for manipulating
 * waves of enemies and adding new enemies to the game
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    var WaveManager = rotf.extend( rotf.Class, {

        // Static public members

    },{
        waves: null,
        currWave: 0,
        ready: false, ended: false,
        bootTime: 0,

        /**
         * WaveManager class constructor that takes
         * one param which represents amount of time
         * needed to pass before it starts adding enemies
         * to map
         * @param bootTime time before first wave starts
         */
        initialize: function(bootTime){

            /**
             * Array of enemy waves which is being initialised inside
             * of this constructor
             * @type {Array}
             */
            this.waves = [];
            this.bootTime = bootTime || 0;

            var wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Rabbit,6);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Rabbit,12);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Rabbit,18);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Rabbit,30);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Dog,10);
            this.waves.push(wave);

            wave = new rotf.Wave(20000,this,5000);
            for(var i=0; i<10; i++){
                wave.pushEnemyToEnd(rotf.Dog,1);
                wave.pushEnemyToEnd(rotf.Rabbit,1);
            }
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Dog,12);
            wave.pushEnemyToEnd(rotf.Rabbit,12);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            wave.pushEnemyToEnd(rotf.Cat,12);
            wave.pushEnemyToEnd(rotf.Rabbit,12);
            this.waves.push(wave);

            wave = new rotf.Wave(10000,this,5000);
            for(i=0; i<10; i++){
                wave.pushEnemyToEnd(rotf.Cat,1);
                wave.pushEnemyToEnd(rotf.Dog,1);
            }
            this.waves.push(wave);

            wave = new rotf.Wave(20000,this,0);
            wave.pushEnemyToEnd(rotf.Cat,20);
            wave.pushEnemyToEnd(rotf.Dog,20);
            this.waves.push(wave);

            var wave = new rotf.Wave(5000,this,0);
            wave.pushEnemyToEnd(rotf.Bear,3);
            this.waves.push(wave);

        },

        update : function(delta){
            if(!this.ended){
                if(!this.ready){
                    this.bootTime -= delta;
                    if(this.bootTime<=0){
                        this.ready = true;
                        this.waves[this.currWave].update(-this.bootTime);
                        this.bootTime = 0;
                    }
                }else {
                    this.waves[this.currWave].update(delta);
                }
            }
        },

        currentWaveFinished : function(delta){
            this.currWave++;
            if(this.currWave == this.waves.length){
                this.currWave--;
                this.ended = true;
            }else{
                this.waves[this.currWave].update(delta);
            }
        }
    });

    rotf.WaveManager = WaveManager;

}());
