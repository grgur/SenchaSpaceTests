/**
 * Created by grgur on 28/02/14.
 */

Ext.define('Pkg.data.proxy.SecureLocalStorage', {
    extend             : 'Ext.data.proxy.WebStorage',
    alias              : 'proxy.securelocalstorage',
    alternateClassName : 'Pkg.data.SecureLocalStorageProxy',

    //inherit docs
    getStorageObject   : function () {
        return Ext.space.SecureLocalStorage.get(this.getId());
    },

    /**
     * @private
     * Fetches a model instance from the Proxy by ID. Runs each field's decode function (if present) to decode the data.
     * @param {String} id The record's unique ID
     * @return {Ext.data.Model} The model instance or undefined if the record did not exist in the storage.
     */
    getRecord : function (id) {
        if (this.cache[id] === undefined) {
            var recordKey = this.getRecordKey(id),
                item = this.getStorageObject().get(recordKey),
                data = {},
                Model = this.getModel(),
                fields = Model.getFields().items,
                length = fields.length,
                i, field, name, record, rawData, rawValue;

            if (!item) {
                return undefined;
            }

            rawData = Ext.decode(item);

            for (i = 0; i < length; i++) {
                field = fields[i];
                name = field.getName();
                rawValue = rawData[name];

                if (typeof field.getDecode() == 'function') {
                    data[name] = field.getDecode()(rawValue);
                } else {
                    if (field.getType().type == 'date') {
                        data[name] = this.readDate(field, rawValue);
                    } else {
                        data[name] = rawValue;
                    }
                }
            }

            record = new Model(data, id);
            this.cache[id] = record;
        }

        return this.cache[id];
    },

    /**
     * Saves the given record in the Proxy. Runs each field's encode function (if present) to encode the data.
     * @param {Ext.data.Model} record The model instance
     * @param {String} [id] The id to save the record under (defaults to the value of the record's getId() function)
     */
    setRecord : function (record, id) {
        if (id) {
            record.setId(id);
        } else {
            id = record.getId();
        }

        var me = this,
            rawData = record.getData(),
            data = {},
            Model = me.getModel(),
            fields = Model.getFields().items,
            length = fields.length,
            i = 0,
            rawValue, field, name, obj, key;

        for (; i < length; i++) {
            field = fields[i];
            name = field.getName();
            rawValue = rawData[name];

            if (field.getPersist() === false) {
                continue;
            }

            if (typeof field.getEncode() == 'function') {
                data[name] = field.getEncode()(rawValue, record);
            } else {
                if (field.getType().type == 'date' && Ext.isDate(rawValue)) {
                    data[name] = this.writeDate(field, rawValue);
                } else {
                    data[name] = rawValue;
                }
            }
        }

        obj = me.getStorageObject();
        key = me.getRecordKey(id);

        //keep the cache up to date
        me.cache[id] = record;

        //iPad bug requires that we remove the item before setting it
        obj.delete(key);
        try {
            obj.set(key, Ext.encode(data));
        }
        catch (e) {
            this.fireEvent('exception', this, e);
        }

        record.commit();
    },

    /**
     * @private
     * Physically removes a given record from the local storage. Used internally
     * by {@link #destroy}, which you should use instead because it updates the
     * list of currently-stored record ids.
     * @param {String/Number/Ext.data.Model} id The id of the record to remove,
     * or an Ext.data.Model instance.
     * @param {Boolean} [updateIds] False to skip saving the array of ids
     * representing the set of all records in the Proxy.
     */
    removeRecord : function (id, updateIds) {
        var me = this,
            ids;

        if (id.isModel) {
            id = id.getId();
        }

        if (updateIds !== false) {
            ids = me.getIds();
            Ext.Array.remove(ids, id);
            me.setIds(ids);
        }

        delete this.cache[id];
        me.getStorageObject().delete(me.getRecordKey(id));
    },

    /**
     * @private
     * Returns the array of record IDs stored in this Proxy
     * @return {Number[]} The record IDs. Each is cast as a Number
     */
    getIds : function () {
        var ids = (this.getStorageObject().get(this.getId()) || "").split(","),
            length = ids.length,
            i;

        if (length == 1 && ids[0] === "") {
            ids = [];
        }

        return ids;
    },

    /**
     * @private
     * Saves the array of ids representing the set of all records in the Proxy
     * @param {Number[]} ids The ids to set
     */
    setIds : function (ids) {
        var obj = this.getStorageObject(),
            str = ids.join(","),
            id = this.getId();

        obj.delete(id);

        if (!Ext.isEmpty(str)) {
            try {
                obj.set(id, str);
            }
            catch (e) {
                this.fireEvent('exception', this, e);
            }
        }
    },

    /**
     * @private
     * Sets up the Proxy by claiming the key in the storage object that corresponds to the unique id of this Proxy. Called
     * automatically by the constructor, this should not need to be called again unless {@link #clear} has been called.
     */
    initialize : function () {
        Ext.data.proxy.Client.prototype.initialize.apply(this, arguments);
        var storageObject = this.getStorageObject();
        try {
            storageObject.set(this.getId(), storageObject.get(this.getId()) || "");
        }
        catch (e) {
            this.fireEvent('exception', this, e);
        }
    },

    /**
     * Destroys all records stored in the proxy and removes all keys and values used to support the proxy from the
     * storage object.
     */
    clear : function () {
        var obj = this.getStorageObject(),
            ids = this.getIds(),
            len = ids.length,
            i;

        //remove all the records
        for (i = 0; i < len; i++) {
            this.removeRecord(ids[i], false);
        }

        //remove the supporting objects
        obj.delete(this.getId());
    },
});