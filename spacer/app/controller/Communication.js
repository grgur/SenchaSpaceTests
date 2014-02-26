Ext.define('Spacer.controller.Communication', {
    extend : 'Pkg.app.Controller',

    config : {
        msgActions : {
            'texting' : 'onText'
        },

        refs : {
            'main' : 'main'
        }
    },

    init : function () {
        this.setMsgActions({
            'texting' : 'onText'
        });
    },

    onSpaceReady : function () {

    },

    onText : function (msg, promise) {
        console.log('onText called ', arguments, msg);
    },

    updateMsgActions : function (h) {
        console.log('msgHandlers updated', h);
    }
});