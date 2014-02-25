Ext.define('Pkg.app.Controller', {
    override : 'Ext.app.Controller',

    config : {

        /**
         * Handlers for message based on action
         * Handler arguments as follow:
         * @param {Mixed} msg
         * @param {Ext.Promise} promise
         * @param {Object} message Message object
         */
        msgHandlers : {}
    },

    /**
     * Incorporate onSpaceReady in all controllers and Application
     */
    constructor : function () {
        var me = this;
        Ext.onSpaceReady(me, me.initSpace, me.onSpaceError);
        me.callOverridden(arguments);

    },

    /**
     * @private
     * Init Space functionalities
     */
    initSpace : function () {
        var me = this;

        me.spaceListenMessages();
        me.onSpaceReady.apply(me, arguments);
    },

    onSpaceReady : Ext.emptyFn,

    onSpaceError : Ext.emptyFn,

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
     * @param {String} message.action Message action. Should match a handler in msgHandlers
     * @param {Mixed} message.msg Message content
     * @param {Ext.Promise} promise
     */
    spaceHandleMessage : function (message, promise) {
        var action = message.action,
            handler = this.getMsgHandlers()[action];

        if (!Ext.isFunction(handler)) {
            return;
        }

        this[handler](message.msg, promise, message);
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
        var success = cfg.success.bind(cfg.scope, cfg),
            failure = cfg.failure.bind(cfg.scope, cfg),
            send = function (connection) {
                connection.send(
                    {
                        type : cfg.type,
                        msg  : cfg.msg
                    },
                    cfg.show
                ).then(
                        success,
                        failure
                    );
            };

        Ext.space.Invoke.get(cfg.app).then(send, failure);
    }
});