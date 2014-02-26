Ext.define('Pkg.override.app.Controller', {
    override : 'Ext.app.Controller',

    /**
     * Incorporate onSpaceReady in all controllers and Application
     */
    //    constructor : function () {
    //
    //        me.callOverridden(arguments);
    //
    //    },

    init : function () {
        var me = this;
        Ext.onSpaceReady(me.initSpace, me);
    },

    /**
     * @private
     * Init Space functionalities
     */
    initSpace : function () {
        var me = this;

        me.onSpaceReady.apply(me, arguments);
    },

    onSpaceReady : Ext.emptyFn
});