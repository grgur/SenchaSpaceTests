Ext.define('Spacer.controller.Communication', {
    extend: 'Pkg.app.Controller',

    config: {
        msgActions: {
            'text' : 'onText'
        },

        refs : {
            'main' : 'main'
        }
    },

    init: function () {
        this.setMsgActions({
            'text' : 'onText'
        });
    },

    onSpaceReady: function () {

    },

    onText: function (msg, promise) {
        var main = this.getMain();

        main.log('Spacer received a message');
        console.log('onText called ', arguments);
        main.log(JSON.stringify(msg));
    },

    updateMsgActions: function (h) {
        console.log('msgHandlers updated', h);
    }
});