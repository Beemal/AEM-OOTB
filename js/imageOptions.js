// Adding summary to ImageOptions RTE image plugin extend
(function ($) {
    "use strict";

    var _ = window._,
        Class = window.Class,
        CUI = window.CUI,
        ExtendedRTE_IMAGE = null,
        COLUMN_CONTAINER = ".rte-dialog-columnContainer",
        SUMMARY_SEL = ".rte-dialog--image input[data-type=\"summary\"]",
        SUMMARY_HTML = '<div class="rte-dialog-columnContainer">'
            + '<div class="rte-dialog-column">'
            +  'Summary'
            +  '</div>'
            +  '<div class="rte-dialog-column">'
            +  '<input is="coral-textfield" class="coral3-Textfield rte--large" data-type="summary">'
            +  '</div>'
            + '</div>';

    if(CUI.rte.ui.cui.TablePropsDialog.imagerteExtended){
        return;
    }

    CUI.rte.ui.cui.ImagePropsDialog = new Class({

        extend: CUI.rte.ui.cui.ImagePropsDialog,

        toString: "RTEImagePropsDialog",

        initialize: function(config) {
            this.superClass.initialize.call(this, config);

            this.$summary = this.$container.find(SUMMARY_SEL);

            if(!_.isEmpty(this.$summary)){
                return;
            }

            this.$alt = this.$container.find(".rte-dialog--image input[data-type=\"alt\"]");

            $(SUMMARY_HTML).insertBefore( this.$alt.closest(COLUMN_CONTAINER) );

            this.$summary = this.$container.find(SUMMARY_SEL);
        }
    });

    ExtendedRTE_IMAGE = new Class({
        toString: "ExtendedRTE_IMAGE",

        extend: CUI.rte.commands.Image,

// override
        createImage: function (execDef) {
            var value = execDef.value;
            var url = null;
            if (value.path) {
                url = CUI.rte.Utils.processUrl(value.path, CUI.rte.Utils.URL_IMAGE);
            }
            var alt = (value.alt ? value.alt : '');
            var width = (value.width ? value.width : null);
            var height = (value.height ? value.height : null);
            // todo encoding(?)
            if (url) {
                var imgHtml = '<img src=\"' + url + '\" alt=\"' + alt + '\"';
                imgHtml += ' ' + CUI.rte.Common.SRC_ATTRIB + '=\"' + value.path + '\"';
                if (width) {
                    imgHtml += ' width=\"' + width + '\"';
                }
                if (height) {
                    imgHtml += ' height=\"' + height + '\"';
                }
                imgHtml += '>';
                execDef.component.execCmd('inserthtml', imgHtml);
            }
        },

        applyProperties: function (execDef) {
            var props = execDef.value;
            var com = CUI.rte.Common;
            var selection = execDef.selection;
            if (selection.startNode &&
                ((selection.startOffset === null) || (typeof selection.startOffset === 'undefined')) &&
                !selection.endNode) {
                var node = selection.startNode;
                if (!com.isTag(node, 'img')) {
                    return;
                }
                var stylePrefix = 'style.';
                for (var propName in props) {
                    if (props.hasOwnProperty(propName)) {
                        if (com.strStartsWith(propName, stylePrefix)) {
                            var styleName =
                                propName.substring(stylePrefix.length, propName.length);
                            if (styleName === 'float') {
                                // IE < 9 requires to use node.style.styleFloat http://msdn.microsoft.com/en-us/library/ie/ms530755%28v=vs.85%29.aspx
                                // All other browsers and IE9 or newer allow node.style.cssFloat http://msdn.microsoft.com/en-us/library/ie/ff974668%28v=vs.85%29.aspx
                                if (com.ua.isIE6 || com.ua.isIE7 || com.ua.isIE8) {
                                    styleName = 'styleFloat';
                                } else {
                                    styleName = 'cssFloat';
                                }
                            }
                            node.style[styleName] = props[propName];
                        } else {
                            node.setAttribute(propName, props[propName]);
                        }
                    }
                }
                if (com.ua.isGecko) {
                    CUI.rte.Selection.flushSelection(execDef.editContext);
                }
            }
        }
    });

    CUI.rte.commands.CommandRegistry.register("_image", ExtendedRTE_IMAGE);

    CUI.rte.ui.cui.TablePropsDialog.imagerteExtended = true;
})(jQuery);
