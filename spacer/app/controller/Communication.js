Ext.define('Spacer.controller.Communication', {
    extend: 'Pkg.app.Controller',

    config: {
        msgHandlers: {
            'text' : 'onText'
        }
    },

    onSpaceReady: function () {
        var main = this.getMain();

        main.log('Spacer is ready');
    },

    onText: function (msg, promise) {
        var main = this.getMain();

        main.log('Spacer received a message');
        main.log(msg);
    }
});