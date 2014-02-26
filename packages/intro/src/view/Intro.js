Ext.define('Pkg.view.Intro', {
    extend   : 'Ext.tab.Panel',
    xtype    : 'introview',
    requires : [
        'Ext.TitleBar'
    ],
    config   : {
        tabBarPosition : 'bottom',
        title          : undefined,
        html           : undefined
    },

    initialize : function () {
        var title = this.getTitle(),
            html = this.getHtml();

        this.add([
            {
                title   : title,
                iconCls : 'home',
                itemId  : 'welcomehome',

                styleHtmlContent : true,
                scrollable       : true,

                items : {
                    docked : 'top',
                    xtype  : 'titlebar',
                    title  : title
                },

                html : html
            }
        ]);
    },

    updateHtml: function (html) {
        var home = this.down('#welcomehome');

        if (home) {
            home.setHtml(html);
        }
    },

    log: function (text) {
        var current = this.getHtml();

        text = [
            current,
            '<br />',
            a.toLocaleTimeString(),
            ': ',
            text
        ].join();

        this.setHtml(text);
    }
});