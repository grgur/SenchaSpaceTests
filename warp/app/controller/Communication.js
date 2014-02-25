Ext.define('Warp.controller.Communication', {
    extend : 'Ext.app.Controller',

    config : {

    },

    onSpaceReady : function () {
        var me = this;
        Ext.Msg.prompt('Message', 'Send something to Spacer', function (text) {
            me.sendSpaceMsg({
                app  : 'spacer',
                type : 'texting',
                msg  : text
            });
        });
    }
});