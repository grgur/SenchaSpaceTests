Ext.define('Pkg.override.app.Controller', {
        override : 'Ext.app.Controller',

    /**
     * Incorporate onSpaceReady in all controllers and Application
     */
    constructor : function () {
        var me = this;
        Ext.onSpaceReady(me, me.initSpace, me.onSpaceError);
        me.callOverridden(arguments);

    },

    /**
     * @private
     * Init Space functionalities
     */
    initSpace : function () {
        var me = this;

        me.onSpaceReady.apply(me, arguments);
    },

    onSpaceReady : Ext.emptyFn,

    onSpaceError : Ext.emptyFn
});