Ext.define('Spacer.controller.Communication', {
    extend: 'Pkg.app.Controller',

    config: {
        msgHandlers: {
            'text' : 'onText'
        }
    },

    onSpaceReady: function () {

    },

    onText: function (msg, promise) {
        Ext.Msg.alert(msg);
    }
});