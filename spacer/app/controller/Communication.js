Ext.define('Spacer.controller.Communication', {
    extend: 'Pkg.app.Controller',

    config: {
        msgHandlers: {
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
        alert(JSON.stringify(msg));
        main.log(JSON.stringify(msg));
    },

    updateMsgHandlers: function (h) {
        alert(JSON.stringify(h));
    }
});