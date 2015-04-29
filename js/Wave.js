/**
 * Wave.js
 *
 * Class representing waves of enemies
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

(function() {

    rotf.Wave = rotf.extend(rotf.Class, {

        // Static public members

    }, {

        interval: 0,
        enemyInterval: 0,
        currentInterval: 0,
        timeAfter: 0,
        numOfEnemies: null,
        enemyTypes: null,
        index: 0,
        enemiesTogether: 0,
        manager: null,
        path: null,
        after: false,
        ended: false,

        /**
         * Wave class constructor that takes as params duration of this wave,
         * object of wave manager class and time that another wave should wait
         * after this wave finishes
         * @param interval
         * @param manager
         * @param timeAfter
         */
        initialize: function (interval, manager, timeAfter) {
            this.interval = interval;
            this.manager = manager;
            this.timeAfter = timeAfter;
            this.path = rotf.game.path;
            this.numOfEnemies = [];
            this.enemyTypes = [];
        },

        /**
         * This function adds certain number of certain type of enemies
         * to this wave
         * @param enemyClass
         * @param enemiesCount
         */
        pushEnemyToEnd: function (enemyClass, enemiesCount) {

            this.numOfEnemies.push(enemiesCount);
            this.enemyTypes.push(enemyClass);
            this.enemiesTogether += enemiesCount;
            this.enemyInterval
                = this.currentInterval
                = this.interval / this.enemiesTogether;
        },

        /**
         * Function that measures time and checks if
         * enough time passed so that new enemy can be added
         * to the map
         */
        update: function (delta) {

            if (!this.ended) {

                if (!this.after) {

                    this.currentInterval -= delta;

                    if (this.currentInterval < 0) {
                        this.createEnemy();
                    }

                } else {

                    this.timeAfter -= delta;

                    if (this.timeAfter <= 0) {
                        this.manager.currentWaveFinished(-this.timeAfter);
                        this.ended = true;
                    }
                }
            }
        },

        createEnemy: function () {

            rotf.game.enemiesContainer.addChild(new this.enemyTypes[this.index]());
            this.numOfEnemies[this.index]--;
            if (this.numOfEnemies[this.index] <= 0) {
                this.index++;
                if (this.index == this.numOfEnemies.length) {
                    this.timeAfter += this.currentInterval;
                    this.after = true;
                    return;
                }
            }
            this.currentInterval += this.enemyInterval;
        }
    });

}());
