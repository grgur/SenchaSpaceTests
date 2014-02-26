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
        console.log('space ready!!');
        var main = this.getMain();

        main.log('Spacer is ready');
    },

    onText: function (msg, promise) {
        var main = this.getMain();

        main.log('Spacer received a message');
        main.log(msg);
    }
});