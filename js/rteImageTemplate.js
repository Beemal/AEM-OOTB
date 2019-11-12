/**
* One way to override RTE image dialog 
     * Override Image Dialog template
     */
    window["Coral"]["templates"]["RichTextEditor"]["dlg_image"] = (function anonymous(data_0
    /**/) {
        var frag = document.createDocumentFragment();
        var data = data_0;

        // Dialog column container
        var el0 = document.createElement("div");
        el0.className += " rte-dialog-columnContainer";
        var el1 = document.createTextNode("\n  ");
        el0.appendChild(el1);

        // Alt Text field
        var el2 = document.createElement("div");
        el2.className += " rte-dialog-column rte-dialog-column--alt";
        var el3 = document.createElement("label");
        var el4 = document.createTextNode(" ");
        el3.appendChild(el4);
        var el5 = document.createElement("input","coral-textfield");
        el5.setAttribute("is", "coral-textfield");
        el5.setAttribute("data-type", "alt");
        el5.setAttribute("placeholder", "Alt Text");
        el3.appendChild(el5);
        var el6 = document.createTextNode(" ");
        el3.appendChild(el6);
        el2.appendChild(el3);
        var el7 = document.createTextNode(" ");
        el2.appendChild(el7);
        el0.appendChild(el2);
        var el8 = document.createTextNode("\n  ");
        el0.appendChild(el8);

        // Alignment select
        var el9 = document.createElement("div");
        el9.className += " rte-dialog-column";
        var el10 = document.createTextNode("\n    ");
        el9.appendChild(el10);
        var el11 = this["targetSelect"] = document.createElement("coral-select");
        el11.setAttribute("handle", "targetSelect");
        var el12 = document.createTextNode("\n      ");
        el11.appendChild(el12);
        var el13 = document.createElement("coral-select-item");
        el13.setAttribute("value", "none");
        el13.textContent = CUI["rte"]["Utils"]["i18n"]('plugins.image.noAlign');
        el11.appendChild(el13);
        var el14 = document.createTextNode("\n      ");
        el11.appendChild(el14);
        var el15 = document.createElement("coral-select-item");
        el15.setAttribute("value", "left");
        el15.textContent = CUI["rte"]["Utils"]["i18n"]('plugins.image.alignLeft');
        el11.appendChild(el15);
        var el16 = document.createTextNode("\n      ");
        el11.appendChild(el16);
        var el17 = document.createElement("coral-select-item");
        el17.setAttribute("value", "right");
        el17.textContent = CUI["rte"]["Utils"]["i18n"]('plugins.image.alignRight');
        el11.appendChild(el17);
        var el18 = document.createTextNode("\n      ");
        el11.appendChild(el18);
        var el19 = document.createElement("coral-select-item");
        el19.setAttribute("value", "inherit");
        el19.textContent = CUI["rte"]["Utils"]["i18n"]('plugins.image.alignInherit');
        el11.appendChild(el19);
        var el20 = document.createTextNode("\n    ");
        el11.appendChild(el20);
        el9.appendChild(el11);
        var el21 = document.createTextNode("\n  ");
        el9.appendChild(el21);
        el0.appendChild(el9);
        var el22 = document.createTextNode("\n  ");
        el0.appendChild(el22);

        // Dialog column container
        var el41 = document.createElement("div");
        el41.className += " rte-dialog-columnContainer";
        var el42 = document.createTextNode("\n  ");
        el41.appendChild(el42);

        // Caption field
        var el34 = document.createElement("div");
        el34.className += " rte-dialog-column rte-dialog-column--caption";
        var el35 = document.createElement("label");
        var el36 = document.createTextNode(" ");
        el35.appendChild(el36);
        var el37 = document.createElement("input","coral-textfield");
        el37.setAttribute("is", "coral-textfield");
        el37.setAttribute("data-type", "caption");
        el37.setAttribute("placeholder", "Caption");
        el35.appendChild(el37);
        var el38 = document.createTextNode(" ");
        el35.appendChild(el38);
        el34.appendChild(el35);
        var el39 = document.createTextNode(" ");
        el34.appendChild(el39);
        el41.appendChild(el34);
        var el40 = document.createTextNode("\n  ");
        el41.appendChild(el40);

        // Dialog column for Height and Width
        var el45 = document.createElement("div");
        el45.className += " rte-dialog-column rte-dialog-column--height rte-dialog-column--width";

        // Height
        var el21 = document.createTextNode(" \nHeight  ");
        el45.appendChild(el21);
        var el22 = document.createElement("input","coral-textfield");
        el22.setAttribute("is", "coral-textfield");
        el22.setAttribute("data-type", "height");
        el22.setAttribute("value", "");
        el22.className += " rte--small";
        el45.appendChild(el22);

        // Width
        var el21 = document.createTextNode(" \n Width  ");
        el45.appendChild(el21);
        var el22 = document.createElement("input","coral-textfield");
        el22.setAttribute("is", "coral-textfield");
        el22.setAttribute("data-type", "width");
        el22.setAttribute("value", "");
        el22.className += " rte--small";
        el45.appendChild(el22);

        // Append Height and Width Column to Column Container
        el41.appendChild(el45);

        // Dialog column container
        var el43 = document.createElement("div");
        el43.className += " rte-dialog-columnContainer u-coral-pullRight";
        var el44 = document.createTextNode("\n  ");
        el43.appendChild(el44);

        // Cancel
        var el23 = document.createElement("div");
        el23.className += " rte-dialog-column";
        var el24 = document.createTextNode("\n    ");
        el23.appendChild(el24);
        var el25 = document.createElement("button","coral-button");
        el25.setAttribute("is", "coral-button");
        el25.setAttribute("icon", "close");
        el25.setAttribute("title", CUI["rte"]["Utils"]["i18n"]('dialog.cancel'));
        el25.setAttribute("aria-label", CUI["rte"]["Utils"]["i18n"]('dialog.cancel'));
        el25.setAttribute("iconsize", "S");
        el25.setAttribute("type", "button");
        el25.setAttribute("data-type", "cancel");
        el25.setAttribute("tabindex", "-1");
        el23.appendChild(el25);
        var el26 = document.createTextNode("\n  ");
        el23.appendChild(el26);
        el43.appendChild(el23);
        var el27 = document.createTextNode("\n  ");
        el43.appendChild(el27);

        // Save
        var el28 = document.createElement("div");
        el28.className += " rte-dialog-column";
        var el29 = document.createTextNode("\n    ");
        el28.appendChild(el29);
        var el30 = document.createElement("button","coral-button");
        el30.setAttribute("is", "coral-button");
        el30.setAttribute("icon", "check");
        el30.setAttribute("title", CUI["rte"]["Utils"]["i18n"]('dialog.apply'));
        el30.setAttribute("aria-label", CUI["rte"]["Utils"]["i18n"]('dialog.apply'));
        el30.setAttribute("iconsize", "S");
        el30.setAttribute("variant", "primary");
        el30.setAttribute("type", "button");
        el30.setAttribute("data-type", "apply");
        el30.setAttribute("tabindex", "-1");
        el28.appendChild(el30);
        var el31 = document.createTextNode("\n  ");
        el28.appendChild(el31);
        el43.appendChild(el28);
        var el32 = document.createTextNode("\n");
        el43.appendChild(el32);

        // Append Column Containers to dialog fragment
        frag.appendChild(el0);
        frag.appendChild(el41);
        frag.appendChild(el43);

        var el33 = document.createTextNode("\n");
        frag.appendChild(el33);
        return frag;
    });
