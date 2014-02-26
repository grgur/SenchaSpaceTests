Ext.define('Warp.controller.Communication', {
    extend : 'Pkg.app.Controller',

    config : {
        refs : {
            'main' : 'main'
        }
    },

    launch : function () {
        var main = this.getMain();

        main.log('Warp init controller comm');

        Ext.onSpaceReady(function () {
            alert('space ready then');
            main.log('Space is ready');
        });
    },

    onSpaceReady : function () {
        var me = this,
            main = me.getMain();

        main.log('Space is ready with the built in Controller.prototype.onSpaceReady method');
        Ext.Msg.prompt('Message', 'Send something to Spacer', function (button, text) {
            main.log('pressed ', button);
            main.log('text ', text);

            console.log('[button pressed]', button);

            if (button === 'ok') {
                me.sendSpaceMsg({
                    app     : 'spacer',
                    type    : 'texting',
                    msg     : text,
                    show    : true,
                    success : function (m) {
                        main.log('Msg sent successfully ' + m);
                    },
                    failure : function (m) {
                        main.log('Msg failed ' + m);
                    }
                });
            }
        });
    }
});