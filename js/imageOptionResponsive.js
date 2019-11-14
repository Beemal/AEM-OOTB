// This is working rte image plugin extension with Img-Responsive.

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
        RESPONSIVE_SEL = ".rte-dialog--image .rte-dialog-column--responsive",
        IMAGE_OPTIONS_HTML = '<div class="rte-dialog-columnContainer">'
            +'<div class="rte-dialog-column rte-dialog-column--responsive">'
            +'<coral-checkbox class="coral-Checkbox" name="imgResponsive" value="responsive" aria-disabled="false" aria-required="false" aria-invalid="false" aria-readonly="false">'
            +'<input type="checkbox" handle="input" class="coral-Checkbox-input" id="coral-img-responsive" name="imgResponsive" value="responsive">'
            +'<span class=" coral-Checkbox-checkmark" handle="checkbox">'
            +'</span>'
            +'<label class="coral-Checkbox-description" handle="labelWrapper" for="coral-img-responsive">'
            +'<coral-checkbox-label>Image Responsive</coral-checkbox-label>'
            +'</label></coral-checkbox>'
            +'</div>'
            +'</div>'
            +'<div class="rte-dialog-columnContainer">'
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

                var $heightText = $(HEIGHT_SEL).find('input[data-type="height"]');
                var heightText = $heightText.val();

                var $widthText = $(WIDTH_SEL).find('input[data-type="width"]');
                var widthText = $widthText.val();

                var props = {
                    'alt': altText,
                    'height': heightText,
                    'width': widthText
                };

                this.applyFn('image', props);
            }
            var alignment = {
                'style.float': 'none',
                'style.margin': ''
            };

            switch (this._elements.targetSelect.selectedItem.value) {
                case 'none':
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'left':
                    alignment['style.float'] = 'left';
                    alignment['style.margin'] = '0 10px 10px 0';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'inherit':
                    alignment['style.float'] = 'inherit';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
                case 'right':
                    alignment['style.float'] = 'right';
                    alignment['style.margin'] = '0 0 10px 10px';
                    this.editorKernel.relayCmd('image', alignment);
                    break;
            }

            // Caption
            var $captionText = $(CAPTION_SEL).find('input[data-type="caption"]');
            this.editorKernel.relayCmd('image', { 'caption': $captionText.val() });

            var $responsiveCheckbox = $(RESPONSIVE_SEL).find('coral-checkbox[name="imgResponsive"]');
            if ($responsiveCheckbox.prop("checked") === true) {
                this.editorKernel.relayCmd('image', {'class': 'img-responsive'});
            } else {
                this.editorKernel.relayCmd('image', {'class': ''});
            }
        },

        // Override
        onShow: function () {

            this.superClass.onShow.call(this);

            var captionText = $(CAPTION_SEL).find('input[data-type="caption"]');
            captionText.val($(this.objToEdit).closest('figure').find('figcaption').text());

            var heightText = $(HEIGHT_SEL).find('input[data-type="height"]');
            heightText.val(this.objToEdit.getAttribute('height'));

            var widthText = $(WIDTH_SEL).find('input[data-type="width"]');
            widthText.val(this.objToEdit.getAttribute('width'));

            var style = this.objToEdit.getAttribute("style");
            var alignmentOption = $(ALT_SEL).next().find('coral-select');

            var imgClasses = this.objToEdit.getAttribute('class');
            var $responsiveCheckbox = $(RESPONSIVE_SEL).find('coral-checkbox[name="imgResponsive"]');

            if (imgClasses && imgClasses.includes("img-responsive")) {
                $responsiveCheckbox.attr('checked', true);
            } else {
                $responsiveCheckbox.attr('checked', false);
            }

            if (style) {
                if (style.startsWith("float: right")) {
                    alignmentOption.val('right');
                } else if (style.startsWith("float: left")) {
                    alignmentOption.val('left');
                } else if (style.startsWith("float: inherit")) {
                    alignmentOption.val('inherit');
                } else {
                    alignmentOption.val('none');
                }
            } else {
                alignmentOption.val('none');
            }
        }
    });

    ExtendedRTE_IMAGE = new Class({
        toString: "ExtendedRTE_IMAGE",

        extend: CUI.rte.commands.Image/*

        //override
        applyProperties: function (execDef) {
            this.superclass.applyProperties.call(this, execDef);

            var props = execDef.value;
            var selection = execDef.selection;
            if (selection.startNode) {
                var node = selection.startNode;
                for (var propName in props) {
                    // Adding figCaption
                    if (propName === 'caption' && props[propName].length) {
                        var captionText = props[propName],
                            $figure = $(node).closest('figure'),
                            $figcaption = $figure.find('figcation');
                        if ($figure.length && $figcaption.length) {
                            $figcaption.text(captionText);
                        } else {
                            $(node).text(captionText)
                                .wrapInner('<figcaption></figcaption>')
                                .wrap('<figure></figure>');
                        }
                    }
                }
                if (com.ua.isGecko) {
                    CUI.rte.Selection.flushSelection(execDef.editContext);
                }
            }
        }*/
    });

    CUI.rte.commands.CommandRegistry.register("_image", ExtendedRTE_IMAGE);

    CUI.rte.ui.cui.ImagePropsDialog.rteImageExtended = true;
})(jQuery);
