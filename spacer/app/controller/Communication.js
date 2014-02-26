Ext.define('Spacer.controller.Communication', {
    extend: 'Pkg.app.Controller',

    config: {
        msgactions: {
            'text' : 'onText'
        },

        refs : {
            'main' : 'main'
        }
    },

    onSpaceReady: function () {

    },

    onText: function (msg, promise) {
        var main = this.getMain();

        main.log('Spacer received a message');
        console.log('onText called ', arguments);
        main.log(JSON.stringify(msg));
    },

    updateMsgactions: function (h) {
        console.log('msgHandlers updated', h);
    }
});