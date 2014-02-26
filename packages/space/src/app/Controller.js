/**
 * Created by grgur on 25/02/14.
 */
Ext.define('Pkg.app.Controller', {
    extend : 'Ext.app.Controller',

    config : {

        /**
         * Handlers for message based on action
         * Handler arguments as follow:
         * @param {Mixed} msg
         * @param {Ext.Promise} promise
         * @param {Object} message Message object
         */
        msgactions : {}
    },

    /**
     * @private
     * Init Space functionalities
     */
    initSpace : function () {
        var me = this;
        me.spaceListenMessages();
        me.callParent();
    },

    /**
     * @private
     * Listen for Space messages
     */
    spaceListenMessages : function () {
        var me = this;

        Ext.space.Invoke.onMessage(function (senderId, message) {
            var promise = new Ext.Promise();
            me.spaceHandleMessage(message, promise);
            return promise;
        });
    },

    /**
     * @private
     * Forward messages to registered handlers
     * @param {Object} message Message object
     * @param {String} message.action Message action. Should match a handler in msgActions
     * @param {Mixed} message.msg Message content
     * @param {Ext.Promise} promise
     */
    spaceHandleMessage : function (message, promise) {
        var action = message.action,
            handlerName = this.getMsgactions()[action],
            handler = this[handlerName];

        if (!Ext.isFunction(handler)) {
            alert('not a handler my friend' + action);
            promise.reject('No handlers associated with action ' + action);
            return;
        }

        promise.fulfill(handler(message.msg, promise, message));
    },


    /**
     * Send a message to another app
     * @param {Object} cfg Configuration object
     * @param {String} cfg.app Application name/ID for the receiving app
     * @param {String} cfg.action Action name, used by handler in the other app
     * @param {Mixed} cfg.msg Message to send
     * @param {Boolean} cfg.show True to bring the other app to the foreground. Defaults to false.
     * @param {Function} cfg.success Success callback
     * @param {Function} cfg.failure Failure callback
     * @param {Object} cfg.scope Scope to run callbacks in
     */
    sendSpaceMsg : function (cfg) {
        var success = cfg.success ? cfg.success.bind(cfg.scope, cfg) : Ext.emptyFn,
            failure = cfg.failure ? cfg.failure.bind(cfg.scope, cfg) : Ext.emptyFn,
            send = function (connection) {
                connection.send(
                    {
                        type : cfg.type,
                        msg  : cfg.msg
                    },
                    cfg.show
                ).then(success, failure);
            };

        Ext.space.Invoke.get(cfg.app).then(send, failure);
    }
});