Ext.define('Spacer.view.Main', {
    extend: 'Pkg.view.Intro',
    xtype: 'main',

    config: {
        title: 'Spacer',
        html: 'This is <b>Spacer</b>, our first Sencha Space app.'
    },

    applyHtml: function (html) {
        if (Ext.isSpace) {
            html += '<br />Hey, I noticed you are using Sencha Space. Werd!';
        }

        return html;
    }
});