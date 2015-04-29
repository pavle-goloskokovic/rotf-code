/**
 * rotf.js
 *
 * rotf package file
 *
 * Copyright (c) 2013-2015 Pavle Goloskoković. All rights reserved.
 */

var rotf = {

    /**
     * The base Class implementation (does nothing)
     */
    Class: function(){}

};

(function() {

    var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
    var initializing = false;

    /**
     * Creates a new class that inherits from superClass class
     * @param superClass reference to super class
     * @param newClass object containing methods and fields we want to add to subclass
     * @param staticMembers
     */
    rotf.extend = function(superClass,staticMembers,newClass) {

        var _super = superClass.prototype;

        // Instantiate a base class
        initializing = true;
        var prototype = new superClass();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in newClass) {
            // Check if we're overwriting an existing function
            prototype[name] =
                    typeof newClass[name] == "function"
                && typeof _super[name] == "function"
                && fnTest.test(newClass[name]) ?
                (function(name, fn){
                    return function() {

                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, newClass[name])
                :
                newClass[name];
        }

        // The dummy class constructor
        function c() {
            if (!initializing && this.initialize){
                this.initialize.apply(this, arguments);
            }
        }

        // Populate class with static members
        for (var name in staticMembers) {
            c[name] = staticMembers[name];
        }

        // Populate our constructed prototype object
        c.prototype = prototype;

        // Enforce the constructor to be what we expect
        c.prototype.constructor = c;

        return c;
    }

}());