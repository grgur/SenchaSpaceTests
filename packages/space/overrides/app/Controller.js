Ext.define('Pkg.app.Controller', {
    override : 'Ext.app.Controller',

    constructor : function () {
        var me = this;
        Ext.onSpaceReady(me, me.onSpaceReady, me.onSpaceError);
        me.callOverridden(arguments);
    },

    onSpaceReady : Ext.emptyFn,

    onSpaceError : Ext.emptyFn
});