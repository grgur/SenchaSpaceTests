Ext.define('Warp.controller.Communication', {
    extend : 'Pkg.app.Controller',

    config : {

    },

    init: function () {
        Ext.onSpaceReady(function () {
           console.log('simple space ready');
        });
    },

    onSpaceReady : function () {
        console.log('spaceready');
        var me = this;
        Ext.Msg.prompt('Message', 'Send something to Spacer', function (text) {
            me.sendSpaceMsg({
                app  : 'spacer',
                type : 'texting',
                msg  : text,
                show : true
            });
        });
    }
});
//
//me = Warp.app.getController('Communication')
//        Ext.Msg.prompt('Message', 'Send something to Spacer', function (text) {
//            me.sendSpaceMsg({
//                app  : 'spacer',
//                type : 'texting',
//                msg  : text, show: true
//            });
//        });