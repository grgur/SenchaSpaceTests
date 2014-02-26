Ext.define('Warp.controller.Communication', {
    extend : 'Pkg.app.Controller',

    config : {
        refs : {
            'main' : 'main'
        }
    },

    onSpaceReady : function () {
        var me = this,
            main = me.getMain();

        main.log('Space is ready with the built in Controller.prototype.onSpaceReady method');
        Ext.Msg.prompt('Message', 'Send something to Spacer', function (button, text) {
            main.log('Sending to spacer: ', text);

            if (button === 'ok') {
                me.sendSpaceMsg({
                    app     : 'spacer',
                    action  : 'texting',
                    msg     : text,
                    show    : true
                });
            }
        });
    }
});