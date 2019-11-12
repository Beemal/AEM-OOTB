(function ($) {
    "use strict";

    var _ = window._,
        Class = window.Class,
        CUI = window.CUI,
        ExtendedRTE_IMAGE = null,
        COLUMN_CONTAINER = ".rte-dialog-columnContainer",
        CAPTION_SEL = ".rte-dialog--image .rte-dialog-column--caption",
        ALT_SEL = ".rte-dialog--image .rte-dialog-column--alt",
        HEIGHT_SEL = ".rte-dialog--image .rte-dialog-column--height",
        WIDTH_SEL = ".rte-dialog--image .rte-dialog-column--width",
        IMAGE_OPTIONS_HTML = '<div class="rte-dialog-columnContainer">'
            +'<div class="rte-dialog-column rte-dialog-column--caption">'
            +'<label>'
            +'<input is="coral-textfield" class="coral-Textfield" data-type="caption" placeholder="Caption" aria-invalid="false">'
            +'</label>'
            +'</div>'
            +'<div class="rte-dialog-column rte-dialog-column--height rte-dialog-column--width">'
            +'&nbsp;Height&nbsp;'
            +'<input is="coral-textfield" class="coral-Textfield rte--small" data-type="height" value="" aria-invalid="false">'
            +'&nbsp;Width&nbsp;'
            +'<input is="coral-textfield" class="coral-Textfield rte--small" data-type="width" value="" aria-invalid="false">'
            +'</div>'
            +'</div>';

    if(CUI.rte.ui.cui.ImagePropsDialog.rteImageExtended){
        return;
    }

    CUI.rte.ui.cui.ImagePropsDialog = new Class({

        extend: CUI.rte.ui.cui.ImagePropsDialog,

        toString: "RTEImagePropsDialog",

        //override
        initialize: function(config) {
            this.superClass.initialize.call(this, config);

            this.$caption = this.$container.find(CAPTION_SEL);
            this.$height = this.$container.find(HEIGHT_SEL);
            this.$width = this.$container.find(WIDTH_SEL);

            if(!_.isEmpty(this.$caption) && !_.isEmpty(this.$height) && !_.isEmpty(this.$width)){
                return;
            }

            this.$alt = this.$container.find(".rte-dialog--image input[data-type=\"alt\"]");

            $(IMAGE_OPTIONS_HTML).insertBefore( this.$alt.closest(COLUMN_CONTAINER) );
        },

        //override
        apply: function () {

            if (this.validate()) {
                this.toModel();
                this.hide();

                var $altText = $(ALT_SEL).find('input[data-type="alt"]');
                var altText = $altText.val();

                var $captionText = $(CAPTION_SEL).find('input[data-type="caption"]');
                var captionText = $captionText.val();

                var $heightText = $(HEIGHT_SEL).find('input[data-type="height"]');
                var heightText = $heightText.val();

                var $widthText = $(WIDTH_SEL).find('input[data-type="width"]');
                var widthText = $widthText.val();

                var props = {
                    'alt': altText,
                    'caption': captionText,
                    'height': heightText,
                    'width': widthText
                };

                this.applyFn('image', props);
            }
            var alignment = {
                'style.float': 'none',
                'margin': ''
            };

            switch (this._elements.targetSelect.selectedItem.value) {
                case 'none':
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'left':
                    alignment['style.float'] = 'left';
                    alignment['margin'] = '5px 20px 0 0';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'inherit':
                    alignment['style.float'] = 'inherit';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'right':
                    alignment['style.float'] = 'right';
                    alignment['margin'] = '5px 0 20px';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
            }
        },

        /**
         * Fetch the alignment of the selected Image
         * @param selectedImageNode
         * @returns {string}
         */
        getCurrentAlignment: function (selectedImageNode) {
            var com = CUI.rte.Common;
            var style = com.getAttribute(selectedImageNode, 'style');
            if (style) {
                if (style.indexOf('float: left') !== -1) {
                    return 'left';
                }
                else if (style.indexOf('float: right') !== -1) {
                    return 'right';
                }
                else if (style.indexOf('float: inherit') !== -1) {
                    return 'inherit';
                } else {
                    return 'none';
                }
            }
            else {
                return 'none';
            }
        },


        // Override
        onShow: function () {

            this.superClass.onShow.call(this);

            var captionText = $(CAPTION_SEL).find('input[data-type="caption"]'); //TODO needs to be split out from an attr
            captionText.val(this.objToEdit.getAttribute('caption'));

            var heightText = $(HEIGHT_SEL).find('input[data-type="height"]');
            heightText.val(this.objToEdit.getAttribute('height'));

            var widthText = $(WIDTH_SEL).find('input[data-type="width"]');
            widthText.val(this.objToEdit.getAttribute('width'));
        }
    });

    ExtendedRTE_IMAGE = new Class({
        toString: "ExtendedRTE_IMAGE",

        extend: CUI.rte.commands.Image,

        createImage: function (execDef) {
            var value = execDef.value;
            var url = null;
            if (value.path) {
                url = CUI.rte.Utils.processUrl(value.path, CUI.rte.Utils.URL_IMAGE);
            }
            var alt = (value.alt ? value.alt : '');
            var width = (value.width ? value.width : null);
            var height = (value.height ? value.height : null);
            // var caption = (value.caption ? value.caption : '');
            //TODO make this caption a part of the HTML below

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
        }
    });

    CUI.rte.commands.CommandRegistry.register("_image", ExtendedRTE_IMAGE);

    CUI.rte.ui.cui.ImagePropsDialog.rteImageExtended = true;
})(jQuery);
