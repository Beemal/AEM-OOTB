(function ($) {
    "use strict";

    var _ = window._,
        Class = window.Class,
        CUI = window.CUI,
        REL_FIELD = "rel",
        RTE_LINK_DIALOG = "rtelinkdialog";

    if(CUI.rte.ui.cui.CuiDialogHelper.rteLinkExtended){
        return;
    }

    var EAEMLinkBaseDialog = new Class({
        extend: CUI.rte.ui.cui.CQLinkBaseDialog,

        toString: "EAEMLinkBaseDialog",

        initialize: function(config) {
            this.superClass.initialize.call(this, config);

            this.$rteDialog = this.$container.find("[data-rte-dialog=link]");

            this.$rteDialog.find(".rte-dialog-columnContainer:last").before(getLinkRelOptionsHtml());
        },

        dlgToModel: function() {
            this.superClass.dlgToModel.call(this);

            var relField = this.getFieldByType(REL_FIELD);

            if(_.isEmpty(relField)){
                return;
            }

            var relVal = relField.val();

            if (_.isEmpty(relVal)) {
                return;
            }

            this.objToEdit.attributes["rel"] = relVal;
        },

        dlgFromModel: function() {
            this.superClass.dlgFromModel.call(this);

            if(_.isEmpty(this.objToEdit.attributes)){
                return;
            }

            var relValue = this.objToEdit.attributes['rel'];

            if(_.isEmpty(relValue)){
                return;
            }

            var relSelect = this.$rteDialog.find("[data-type='rel']")[0];

            relSelect.items.getAll().forEach(function(elem) {
                elem.selected = (elem.value === relValue);
            });
        }
    });

    CUI.rte.ui.cui.CuiDialogHelper = new Class({
        extend: CUI.rte.ui.cui.CuiDialogHelper,

        toString: "EAEMCuiDialogHelper",

        instantiateDialog: function(dialogConfig) {
            var type = dialogConfig.type;

            if(type !== RTE_LINK_DIALOG){
                this.superClass.instantiateDialog.call(this, dialogConfig);
                return;
            }

            var $editable = $(this.editorKernel.getEditContext().root),
                $container = CUI.rte.UIUtils.getUIContainer($editable),
                dialog = new EAEMLinkBaseDialog();

            dialog.attach(dialogConfig, $container, this.editorKernel);

            return dialog;
        }
    });

    function getLinkRelOptionsHtml(){
        var html =  "<div class='rte-dialog-columnContainer'>" +
            "<div class='rte-dialog-column'>" +
            "<coral-select data-type='rel' placeholder='Choose \"rel\" attribute'>";

        var options = ["alternate", "author", "bookmark", "external", "help",
            "license", "next", "nofollow", "noreferrer", "noopener", "prev", "search", "tag" ];

        _.each(options, function(option){
            html = html + getOptionHtml(option);
        });

        html = html + "</coral-select></div></div>";

        return html;

        function getOptionHtml(option){
            return "<coral-select-item>" + option + "</coral-select-item>"
        }
    }

    CUI.rte.ui.cui.CuiDialogHelper.rteLinkExtended = true;
})(jQuery);