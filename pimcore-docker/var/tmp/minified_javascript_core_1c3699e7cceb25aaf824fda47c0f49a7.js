/**
 * CoreShop
 *
 * LICENSE
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('coreshop.broker');
coreshop.broker = {

    _listeners: {},

    initialize: function () {

    },

    fireEvent: function () {
        var name = arguments[0];
        if (coreshop.broker._listeners[name] === undefined) {
            return;
        }

        var list = coreshop.broker._listeners[name];

        //copy arguments
        var args = [];
        for (var j = 1; j < arguments.length; j++) {
            args.push(arguments[j]);
        }

        for (var i = 0; i < list.length; i++) {
            list[i].func.apply(list[i].scope, args);

            if (list[i].once) {
                list.splice(i, 1);
            }
        }
    },

    removeListener: function (name, func) {
        if (coreshop.broker._listeners[name] === undefined) {
            return;
        }

        var list = coreshop.broker._listeners[name];
        for (var i = 0; i < list.length; i++) {
            if (list[i].func === func) {
                list.splice(i, 1);
            }
        }

        if (list.length === 0) {
            delete coreshop.broker._listeners[name];
        }
    },

    addListener: function (name, func, scope, once) {
        if (coreshop.broker._listeners[name] === undefined) {
            coreshop.broker._listeners[name] = [];
        }

        coreshop.broker._listeners[name].push({
            func: func,
            scope: scope,
            once: Ext.isDefined(once) ? once : false
        });
    },

    addListenerOnce: function (name, func, scope) {
        coreshop.broker.addListener(name, func, scope, true);
    }
};


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */
//pimcore.helpers.openElement = function (id, type, subtype) {

pimcore.registerNS('coreshop.helpers.x');
pimcore.registerNS('coreshop.util.format.currency');

coreshop.helpers.long2ip = function (ip) {
    if (!isFinite(ip)) {
        return false
    }

    return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.')
};

coreshop.helpers.constrastColor = function (color) {
    return (parseInt(color.replace('#', ''), 16) > 0xffffff / 2) ? 'black' : 'white';
};

coreshop.helpers.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};



Ext.define('CoreShop.form.field.ClearButton', {
    alias: 'plugin.clearbutton',

    /**
     * @cfg {Boolean} Hide the clear button when the field is empty (default: true).
     */
    hideClearButtonWhenEmpty: true,

    /**
     * @cfg {Boolean} Hide the clear button until the mouse is over the field (default: true).
     */
    hideClearButtonWhenMouseOut: true,

    /**
     * @cfg {Boolean} When the clear buttons is hidden/shown, this will animate the button to its new state (using opacity) (default: true).
     */
    animateClearButton: true,

    /**
     * @cfg {Boolean} Empty the text field when ESC is pressed while the text field is focused.
     */
    clearOnEscape: true,

    /**
     * @cfg {String} CSS class used for the button div.
     * Also used as a prefix for other classes (suffixes: '-mouse-over-input', '-mouse-over-button', '-mouse-down', '-on', '-off')
     */
    clearButtonCls: 'ext-ux-clearbutton',

    /**
     * The text field (or text area, combo box, date field) that we are attached to
     */
    textField: null,

    /**
     * Will be set to true if animateClearButton is true and the browser supports CSS 3 transitions
     * @private
     */
    animateWithCss3: false,

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Set up and tear down
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    constructor: function (cfg) {
        Ext.apply(this, cfg);

        this.callParent(arguments);
    },

    /**
     * Called by plug-in system to initialize the plugin for a specific text field (or text area, combo box, date field).
     * Most all the setup is delayed until the component is rendered.
     */
    init: function (textField) {
        this.textField = textField;
        if (!textField.rendered) {
            textField.on('afterrender', this.handleAfterRender, this);
        }
        else {
            // probably an existing input element transformed to extjs field
            this.handleAfterRender();
        }
    },

    /**
     * After the field has been rendered sets up the plugin (create the Element for the clear button, attach listeners).
     * @private
     */
    handleAfterRender: function (textField) {
        this.isTextArea = (this.textField.inputEl.dom.type.toLowerCase() === 'textarea');

        this.createClearButtonEl();
        this.addListeners();

        this.repositionClearButton();
        this.updateClearButtonVisibility();

        this.addEscListener();
    },

    /**
     * Creates the Element and DOM for the clear button
     */
    createClearButtonEl: function () {
        var animateWithClass = this.animateClearButton && this.animateWithCss3;
        this.clearButtonEl = this.textField.bodyEl.createChild({
            tag: 'div',
            cls: this.clearButtonCls
        });
        if (this.animateClearButton) {
            this.animateWithCss3 = this.supportsCssTransition(this.clearButtonEl);
        }
        if (this.animateWithCss3) {
            this.clearButtonEl.addCls(this.clearButtonCls + '-off');
        }
        else {
            this.clearButtonEl.setStyle('visibility', 'hidden');
        }
    },

    /**
     * Returns true iff the browser supports CSS 3 transitions
     * @param el an element that is checked for support of the "transition" CSS property (considering any
     *           vendor prefixes)
     */
    supportsCssTransition: function (el) {
        var styles = ['transitionProperty', 'WebkitTransitionProperty', 'MozTransitionProperty',
            'OTransitionProperty', 'msTransitionProperty', 'KhtmlTransitionProperty'];

        var style = el.dom.style;
        for (var i = 0, length = styles.length; i < length; ++i) {
            if (style[styles[i]] !== 'undefined') {
                // Supported property will result in empty string
                return true;
            }
        }
        return false;
    },

    /**
     * If config option "clearOnEscape" is true, then add a key listener that will clear this field
     */
    addEscListener: function () {
        if (!this.clearOnEscape) {
            return;
        }

        // Using a KeyMap did not work: ESC is swallowed by combo box and date field before it reaches our own KeyMap
        this.textField.inputEl.on('keydown',
            function (e) {
                if (e.getKey() === Ext.EventObject.ESC) {
                    if (this.textField.isExpanded) {
                        // Let combo box or date field first remove the popup
                        return;
                    }
                    // No idea why the defer is necessary, but otherwise the call to setValue('') is ignored

                    // 2011-11-30 Ing. Leonardo D'Onofrio leonardo_donofrio at hotmail.com
                    if (this.textField.clearValue) {
                        Ext.Function.defer(this.textField.clearValue, 1, this.textField);
                    } else {
                        Ext.Function.defer(this.textField.setValue, 1, this.textField, ['']);
                    }
                    // end Ing. Leonardo D'Onofrio
                    e.stopEvent();
                }
            },
            this);
    },

    /**
     * Adds listeners to the field, its input element and the clear button to handle resizing, mouse over/out events, click events etc.
     */
    addListeners: function () {
        // listeners on input element (DOM/El level)
        var textField = this.textField;
        var bodyEl = textField.bodyEl;
        bodyEl.on('mouseover', this.handleMouseOverInputField, this);
        bodyEl.on('mouseout', this.handleMouseOutOfInputField, this);

        // listeners on text field (component level)
        textField.on('beforedestroy', this.handleDestroy, this);
        textField.on('resize', this.repositionClearButton, this);
        textField.on('change', function () {
            this.repositionClearButton();
            this.updateClearButtonVisibility();
        }, this);

        // listeners on clear button (DOM/El level)
        var clearButtonEl = this.clearButtonEl;
        clearButtonEl.on('mouseover', this.handleMouseOverClearButton, this);
        clearButtonEl.on('mouseout', this.handleMouseOutOfClearButton, this);
        clearButtonEl.on('mousedown', this.handleMouseDownOnClearButton, this);
        clearButtonEl.on('mouseup', this.handleMouseUpOnClearButton, this);
        clearButtonEl.on('click', this.handleMouseClickOnClearButton, this);
    },

    /**
     * When the field is destroyed, we also need to destroy the clear button Element to prevent memory leaks.
     */
    handleDestroy: function () {
        this.clearButtonEl.destroy();
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Mouse event handlers
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Tada - the real action: If user left clicked on the clear button, then empty the field
     */
    handleMouseClickOnClearButton: function (event, htmlElement, object) {
        if (!this.isLeftButton(event)) {
            return;
        }
        // 2011-11-30 Ing. Leonardo D'Onofrio leonardo_donofrio at hotmail.com
        if (this.textField.clearValue) {
            this.textField.clearValue();
        } else {
            this.textField.setValue('');
        }
        // end Ing. Leonardo D'Onofrio
        this.textField.focus();
    },

    handleMouseOverInputField: function (event, htmlElement, object) {
        this.clearButtonEl.addCls(this.clearButtonCls + '-mouse-over-input');
        if (event.getRelatedTarget() === this.clearButtonEl.dom) {
            // Moused moved to clear button and will generate another mouse event there.
            // Handle it here to avoid duplicate updates (else animation will break)
            this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-over-button');
            this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-down');
        }
        this.updateClearButtonVisibility();
    },

    handleMouseOutOfInputField: function (event, htmlElement, object) {
        this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-over-input');
        if (event.getRelatedTarget() === this.clearButtonEl.dom) {
            // Moused moved from clear button and will generate another mouse event there.
            // Handle it here to avoid duplicate updates (else animation will break)
            this.clearButtonEl.addCls(this.clearButtonCls + '-mouse-over-button');
        }
        this.updateClearButtonVisibility();
    },

    handleMouseOverClearButton: function (event, htmlElement, object) {
        event.stopEvent();
        if (this.textField.bodyEl.contains(event.getRelatedTarget())) {
            // has been handled in handleMouseOutOfInputField() to prevent double update
            return;
        }
        this.clearButtonEl.addCls(this.clearButtonCls + '-mouse-over-button');
        this.updateClearButtonVisibility();
    },

    handleMouseOutOfClearButton: function (event, htmlElement, object) {
        event.stopEvent();
        if (this.textField.bodyEl.contains(event.getRelatedTarget())) {
            // will be handled in handleMouseOverInputField() to prevent double update
            return;
        }
        this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-over-button');
        this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-down');
        this.updateClearButtonVisibility();
    },

    handleMouseDownOnClearButton: function (event, htmlElement, object) {
        if (!this.isLeftButton(event)) {
            return;
        }
        this.clearButtonEl.addCls(this.clearButtonCls + '-mouse-down');
    },

    handleMouseUpOnClearButton: function (event, htmlElement, object) {
        if (!this.isLeftButton(event)) {
            return;
        }
        this.clearButtonEl.removeCls(this.clearButtonCls + '-mouse-down');
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Utility methods
    //
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Repositions the clear button element based on the textfield.inputEl element
     * @private
     */
    /* FIX FOR 4.1 */
    /*
    repositionClearButton: function() {
        var clearButtonEl = this.clearButtonEl;
        if (!clearButtonEl) {
            return;
        }
        var clearButtonPosition = this.calculateClearButtonPosition(this.textField);
        clearButtonEl.dom.style.right = clearButtonPosition.right + 'px';
        clearButtonEl.dom.style.top = clearButtonPosition.top + 'px';
    },
    */

    repositionClearButton: function () {
        var clearButtonEl = this.clearButtonEl;
        if (!clearButtonEl) {
            return;
        }
        var right = 0;
        if (this.fieldHasScrollBar()) {
            right += Ext.getScrollBarWidth();
        }
        if (this.textField.triggerWrap) {
            right += this.getTriggerWidth(this.textField);
        }
        // clearButtonEl.alignTo(this.textField.bodyEl, 'tr-tr', [-1 * (right + 3), 5]);
        clearButtonEl.alignTo(this.textField.bodyEl, 'r-r', [-1 * (right + 3), 0]);
    },
    /* END FIX FOR 4.1*/

    /**
     * Calculates the position of the clear button based on the textfield.inputEl element
     * @private
     */
    calculateClearButtonPosition: function (textField) {
        var positions = textField.inputEl.getBox(true, true);
        var top = positions.y;
        var right = positions.x;

        if (this.fieldHasScrollBar()) {
            right += Ext.getScrollBarWidth();
        }
        if (this.textField.triggerWrap) {
            right += this.getTriggerWidth(this.textField);
            // 2011-11-30 Ing. Leonardo D'Onofrio leonardo_donofrio at hotmail.com
            if (!this.getTriggerWidth(this.textField)) {
                Ext.Function.defer(this.repositionClearButton, 100, this);
            }
            // end Ing. Leonardo D'Onofrio
        }
        // 2012-03-08 Ing. Leonardo D'Onofrio leonardo_donofrio at hotmail.com
        if (textField.inputEl.hasCls('ux-icon-combo-input')) {
            right -= 20; // Fix for IconCombo
        }
        // end Ing. Leonardo D'Onofrio
        return {
            right: right,
            top: top
        };
    },

    /**
     * Checks if the field we are attached to currently has a scrollbar
     */
    fieldHasScrollBar: function () {
        if (!this.isTextArea) {
            return false;
        }

        var inputEl = this.textField.inputEl;
        var overflowY = inputEl.getStyle('overflow-y');
        if (overflowY === 'hidden' || overflowY === 'visible') {
            return false;
        }
        if (overflowY === 'scroll') {
            return true;
        }
        //noinspection RedundantIfStatementJS
        if (inputEl.dom.scrollHeight <= inputEl.dom.clientHeight) {
            return false;
        }
        return true;
    },


    /**
     * Small wrapper around clearButtonEl.isVisible() to handle setVisible animation that may still be in progress.
     */
    isButtonCurrentlyVisible: function () {
        if (this.animateClearButton && this.animateWithCss3) {
            return this.clearButtonEl.hasCls(this.clearButtonCls + '-on');
        }

        // This should not be necessary (see Element.setVisible/isVisible), but else there is confusion about visibility
        // when moving the mouse out and _quickly_ over then input again.
        var cachedVisible = Ext.core.Element.data(this.clearButtonEl.dom, 'isVisible');
        if (typeof(cachedVisible) === 'boolean') {
            return cachedVisible;
        }
        return this.clearButtonEl.isVisible();
    },

    /**
     * Checks config options and current mouse status to determine if the clear button should be visible.
     */
    shouldButtonBeVisible: function () {
        if (this.hideClearButtonWhenEmpty && Ext.isEmpty(this.textField.getValue())) {
            return false;
        }

        var clearButtonEl = this.clearButtonEl;
        //noinspection RedundantIfStatementJS
        if (this.hideClearButtonWhenMouseOut
            && !clearButtonEl.hasCls(this.clearButtonCls + '-mouse-over-button')
            && !clearButtonEl.hasCls(this.clearButtonCls + '-mouse-over-input')) {
            return false;
        }

        return true;
    },

    /**
     * Called after any event that may influence the clear button visibility.
     */
    updateClearButtonVisibility: function () {
        var oldVisible = this.isButtonCurrentlyVisible();
        var newVisible = this.shouldButtonBeVisible();

        var clearButtonEl = this.clearButtonEl;
        if (oldVisible !== newVisible) {
            if (this.animateClearButton && this.animateWithCss3) {
                this.clearButtonEl.removeCls(this.clearButtonCls + (oldVisible ? '-on' : '-off'));
                clearButtonEl.addCls(this.clearButtonCls + (newVisible ? '-on' : '-off'));
            }
            else {
                clearButtonEl.stopAnimation();
                clearButtonEl.setVisible(newVisible, this.animateClearButton);
            }

            // Set background-color of clearButton to same as field's background-color (for those browsers/cases
            // where the padding-right (see below) does not work)
            clearButtonEl.setStyle('background-color', this.textField.inputEl.getStyle('background-color'));

            // Adjust padding-right of the input tag to make room for the button
            // IE (up to v9) just ignores this and Gecko handles padding incorrectly with  textarea scrollbars
            if (!(this.isTextArea && Ext.isGecko) && !Ext.isIE) {
                // See https://bugzilla.mozilla.org/show_bug.cgi?id=157846
                var deltaPaddingRight = clearButtonEl.getWidth() - this.clearButtonEl.getMargin('l');
                var currentPaddingRight = this.textField.inputEl.getPadding('r');
                var factor = (newVisible ? +1 : -1);
                this.textField.inputEl.dom.style.paddingRight = (currentPaddingRight + factor * deltaPaddingRight) + 'px';
            }
        }
    },

    isLeftButton: function (event) {
        return event.button === 0;
    },


    /**
     * getTriggerWidth
     *
     * Get the total width of the trigger button area.
     * This metod is deprecated on textField since ext 5.0, but is usefull
     *
     * @return {Number} The total trigger width
     */
    getTriggerWidth: function (textField) {
        var triggers = textField.getTriggers(),
            width = 0,
            id;
        if (triggers && textField.rendered) {
            for (id in triggers) {
                if (triggers.hasOwnProperty(id)) {
                    width += triggers[id].el.getWidth();
                }
            }
        }

        return width;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.tags.coreShopSerializedData');
coreshop.object.tags.coreShopSerializedData = Class.create(pimcore.object.tags.abstract, {

    allowEmpty: false,

    initialize: function (data, fieldConfig) {
        this.data = data;
        this.fieldConfig = fieldConfig;
        this.fieldConfig.width = 350;
    },

    getLayoutEdit: function () {

        this.component = new Ext.panel.Panel({
            html: 'nothing to see here'
        });

        return this.component;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.classes.data.coreShopSerializedData');
pimcore.object.classes.data.coreShopSerializedData = Class.create(pimcore.object.classes.data.data, {
    type: 'coreShopSerializedData',

    getTypeName: function () {
        return t('coreshop_serialized_data');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_serialized';
    },

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true
    },

    initialize: function (treeNode, initData) {
        this.initData(initData);

        this.treeNode = treeNode;
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();

        return this.layout;
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.classes.data.coreShopEmbeddedClass");
pimcore.object.classes.data.coreShopEmbeddedClass = Class.create(pimcore.object.classes.data.data, {
    type: "coreShopEmbeddedClass",

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: false,
        fieldcollection: false,
        localizedfield: false,
        classificationstore: false,
        block: true
    },

    initialize: function (treeNode, initData) {
        this.type = "coreShopEmbeddedClass";

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("coreshop_embedded_class");
    },

    getGroup: function () {
        return "coreshop";
    },

    getIconClass: function () {
        return "coreshop_icon_embedded_class";
    },

    getLayout: function ($super) {
        $super();

        this.embeddedClassLayoutStore = this.getEmbeddedClassLayoutStore();
        this.embeddedClassCombo = this.getEmbeddedClassCombo();
        this.embeddedClassLayoutCombo = this.getEmbeddedClassLayoutCombo();

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("maximum_items"),
                name: "maxItems",
                value: this.datax.maxItems,
                disabled: this.isInCustomLayoutEditor(),
                minValue: 0
            },
            /*{
                xtype: "checkbox",
                fieldLabel: t("lazy_loading"),
                name: "lazyLoading",
                checked: this.datax.lazyLoading,
                disabled: this.isInCustomLayoutEditor()
            },
            {
                xtype: "displayfield",
                hideLabel: true,
                value: t('lazy_loading_description'),
                cls: "pimcore_extra_label_bottom",
                style: "padding-bottom:0;"
            },
            {
                xtype: "displayfield",
                hideLabel: true,
                value: t('lazy_loading_warning'),
                cls: "pimcore_extra_label_bottom",
                style: "color:red; font-weight: bold;"
            }*/
        ]);

        this.specificPanel.add([
            this.embeddedClassCombo,
            this.embeddedClassLayoutCombo
        ]);

        if (this.datax.embeddedClassName) {
            this.embeddedClassLayoutStore.load({
                className: this.datax.embeddedClassName
            });
        }

        return this.layout;
    },

    getEmbeddedClassCombo: function () {
        return Ext.create('Ext.form.ComboBox', {
            allowBlank: false,
            minWidth: 500,
            typeAhead: true,
            triggerAction: 'all',
            store: pimcore.globalmanager.get('object_types_store'),
            valueField: 'text',
            editable: true,
            queryMode: 'local',
            mode: 'local',
            anyMatch: true,
            displayField: 'text',
            fieldLabel: t('coreshop_embedded_class_name'),
            name: 'embeddedClassName',
            value: this.datax.embeddedClassName,
            forceSelection: true,
            listeners: {
                select: function (combo, record, index) {
                    this.datax.embeddedClassName = record.data.text;

                    if (this.datax.embeddedClassName) {
                        this.embeddedClassLayoutCombo.clearValue();
                        this.embeddedClassLayoutCombo.store.load({
                            params: {
                                className: this.datax.embeddedClassName
                            },
                            callback: function () {
                                this.embeddedClassLayoutCombo.setDisabled(false);

                            }.bind(this)
                        });
                    } else {
                        this.embeddedClassLayoutCombo.setDisabled(true);
                    }
                }.bind(this)
            }
        });
    },

    getEmbeddedClassLayoutStore: function () {
        return new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/embedded-class/get-custom-layouts',
                extraParams: {
                    className: this.datax.embeddedClassName
                },
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['key', 'label'],
            autoLoad: false
        });
    },

    getEmbeddedClassLayoutCombo: function () {
        return Ext.create('Ext.form.ComboBox', {
            allowBlank: false,
            minWidth: 500,
            typeAhead: true,
            triggerAction: 'all',
            store: this.birdgeClassLayoutStore,
            valueField: 'text',
            editable: true,
            queryMode: 'local',
            mode: 'local',
            anyMatch: true,
            displayField: 'text',
            fieldLabel: t('coreshop_object_embedded_class_layout'),
            name: 'embeddedClassLayout',
            value: this.datax.embeddedClassLayout,
            forceSelection: true,
            disabled: true,
            listeners: {
                load: function () {
                    this.embeddedClassLayoutCombo.setDisabled(false);
                }.bind(this)
            }
        });
    },

    applySpecialData: function (source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax = {};
            }

            Ext.apply(this.datax, {
                maxItems: source.datax.maxItems,
                embeddedClassName: source.datax.embeddedClassName,
                embeddedClassLayout: source.datax.embeddedClassLayout,
                lazyLoading: source.datax.lazyLoading
            });
        }
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.tags.coreShopEmbeddedClass");
pimcore.object.tags.coreShopEmbeddedClass = Class.create(pimcore.object.tags.abstract, {
    type: "coreShopEmbeddedClass",
    dataFields: {},

    initialize: function (data, fieldConfig) {
        this.data = data;
        this.fieldConfig = fieldConfig;
        this.eventDispatcherKey = pimcore.eventDispatcher.registerTarget(null, this);

        this.objects = data ? data : [];

        if (!pimcore.globalmanager.exists('coreshop_embedded_class_layouts')) {
            pimcore.globalmanager.add('coreshop_embedded_class_layouts', {});
        }

        if (!pimcore.globalmanager.exists('coreshop_embedded_class_layouts_loading')) {
            pimcore.globalmanager.add('coreshop_embedded_class_layouts_loading', {});
        }
    },

    getGridColumnEditor: function (field) {
        return false;
    },

    getGridColumnFilter: function (field) {
        return false;
    },

    postSaveObject: function (object, task) {
        var objectIdToCheck = this.object.id;

        if (this.context.hasOwnProperty('coreShopEmbeddedClassObjectId')) {
            objectIdToCheck = this.context.coreShopEmbeddedClassObjectId;
        }

        if (object.id === objectIdToCheck && task === "publish") {
            var items = this.container.getItems();

            for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                items[itemIndex].setIndex(itemIndex);
            }
        }
    },

    getLayoutEdit: function () {
        this.container = new coreshop.pimcore.coreExtension.embeddedClassContainer(this, false);

        this.component = this.getLayout(false);

        this.component.on("destroy", function () {
            pimcore.eventDispatcher.unregisterTarget(this.eventDispatcherKey);
        }.bind(this));

        return this.component;
    },

    getLayoutShow: function () {
        this.container = new coreshop.pimcore.coreExtension.embeddedClassContainer(this, true);

        this.component = this.getLayout(true);

        return this.component;
    },

    getLayout: function (noteditable) {
        var me = this,
            container = me.container,
            containerLayout = container.getLayout(),
            className = me.fieldConfig.embeddedClassName,
            layoutId = me.fieldConfig.embeddedClassLayout,
            cacheKey = className + (layoutId ? layoutId : '_default'),
            cacheEntry = null;

        if (pimcore.globalmanager.get('coreshop_embedded_class_layouts').hasOwnProperty(cacheKey)) {
            cacheEntry = pimcore.globalmanager.get('coreshop_embedded_class_layouts')[cacheKey];

            me.layoutLoaded(cacheEntry.layout, cacheEntry.general, noteditable);
        }
        else if (pimcore.globalmanager.get('coreshop_embedded_class_layouts_loading').hasOwnProperty(cacheKey)) {
            coreshop.broker.addListenerOnce('embedded_class.layout.loaded.' + cacheKey, function (data) {
                me.layoutLoaded(data.layout, data.general, noteditable);
            });
        }
        else {
            pimcore.globalmanager.get('coreshop_embedded_class_layouts_loading')[cacheKey] = true;

            Ext.Ajax.request({
                url: '/admin/coreshop/embedded-class/get-layout-configuration',
                params: {
                    className: className,
                    layoutId: layoutId
                },
                success: function (response) {
                    var data = Ext.decode(response.responseText);

                    coreshop.broker.fireEvent('embedded_class.layout.loaded.' + cacheKey, data);

                    pimcore.globalmanager.get('coreshop_embedded_class_layouts')[cacheKey] = data;
                    delete pimcore.globalmanager.get('coreshop_embedded_class_layouts_loading')[cacheKey];

                    me.layoutLoaded(data.layout, data.general, noteditable);

                    containerLayout.setLoading(false);
                }.bind(this)
            });

            containerLayout.setLoading(true);
        }

        return containerLayout;
    },

    layoutLoaded: function (layout, general, noteditable) {
        var me = this;

        me.layout = layout;
        me.general = general;

        Ext.each(this.objects, function (object) {
            me.addEmbeddedClass(object, object.general, noteditable);
        });
    },

    createNew: function () {
        var me = this,
            data = {},
            general = {
                o_className: me.fieldConfig.embeddedClassName,
                index: t('new')
            },
            object = {
                data: data,
                metaData: {}
            };

        me.addEmbeddedClass(object, general, false);
    },

    addEmbeddedClass: function (object, general, noteditable) {
        var me = this,
            container = me.container,
            pimcoreObjectEdit,
            objectId = me.context.hasOwnProperty('coreShopEmbeddedClassObjectId') ? me.context.coreShopEmbeddedClassObjectId : me.object.id;

        pimcoreObjectEdit = new pimcore.object.edit({
            id: object.id,
            data: object,
            ignoreMandatoryFields: false
        });
        pimcoreObjectEdit.getLayout = function (conf) {
            if (this.layout == null) {
                var items = [];
                if (conf) {
                    items = this.getRecursiveLayout(conf, noteditable, {coreShopEmbeddedClassObjectId: objectId}).items;
                }

                this.layout = Ext.create('Ext.panel.Panel', {
                    bodyStyle: 'background-color: #fff;',
                    border: false,
                    //layout: 'border',
                    layout: "fit",
                    cls: "pimcore_object_panel_edit",
                    items: items,
                    listeners: {
                        afterrender: function () {
                            pimcore.layout.refresh();
                        }
                    }
                });
            }

            return this.layout;
        };

        container.add(pimcoreObjectEdit, me.layout, general, me.general.iconCls);
    },

    getValue: function () {
        if (!this.component.rendered) {
            throw 'edit not available';
        }

        var me = this,
            items = this.container.getItems(),
            values = [],
            object,
            objectValues;

        Ext.each(items, function (item) {
            object = item.objectEdit;

            if (!item.isRemoved()) {
                object.object.ignoreMandatoryFields = me.object.ignoreMandatoryFields;

                objectValues = object.getValues();

                if (object.object.data.hasOwnProperty('id')) {
                    objectValues['id'] = object.object.data.id;
                }

                objectValues['currentIndex'] = item.getCurrentIndex();

                if (item.getIndex()) {
                    objectValues['originalIndex'] = item.getIndex();
                }

                values.push(objectValues);
            }
        });

        return values;
    },

    getName: function () {
        return this.fieldConfig.name;
    },

    isInvalidMandatory: function () {
        var me = this,
            invalidMandatoryFields = [],
            isInvalidMandatory,
            layouts = me.container.getLayouts(),
            object = null,
            dataKeys = null,
            currentField = null;

        for (var i = 0; i < layouts.length; i++) {
            object = layouts[i];
            dataKeys = Object.keys(object.dataFields);

            for (var j = 0; j < dataKeys.length; j++) {
                if (object.dataFields[dataKeys[j]] && typeof object.dataFields[dataKeys[j]] === 'object') {
                    currentField = object.dataFields[dataKeys[j]];

                    if (currentField.isMandatory() === true) {
                        isInvalidMandatory = currentField.isInvalidMandatory();
                        if (isInvalidMandatory !== false) {

                            // some fields can return their own error messages like fieldcollections, ...
                            if (typeof isInvalidMandatory === 'object') {
                                invalidMandatoryFields = array_merge(isInvalidMandatory, invalidMandatoryFields);
                            } else {
                                invalidMandatoryFields.push(currentField.getTitle() + ' ('
                                    + currentField.getName() + ')');
                            }
                        }
                    }
                }
            }
        }

        return invalidMandatoryFields;
    },

    isDirty: function () {
        var me = this,
            items = me.container.getItems(),
            objects = me.container.getLayouts(),
            object = null,
            dataKeys = null,
            currentField = null,
            i,
            j;

        for (i = 0; i < items.length; i++) {
            if (items[i].isDirty()) {
                return true;
            }
        }

        for (i = 0; i < objects.length; i++) {
            object = objects[i];
            dataKeys = Object.keys(object.dataFields);

            if (!object.object.data.hasOwnProperty('id')) {
                return true;
            }

            for (j = 0; j < dataKeys.length; j++) {
                if (object.dataFields[dataKeys[j]] && typeof object.dataFields[dataKeys[j]] === 'object') {
                    currentField = object.dataFields[dataKeys[j]];

                    if (currentField.isDirty()) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.pimcore.coreExtension.embeddedClassContainer');

coreshop.pimcore.coreExtension.embeddedClassContainer = Class.create({

    itemContainers: [],

    initialize: function (tag, noteditable) {
        this.tag = tag;
        this.noteditable = noteditable;
        this.itemContainers = [];
    },

    getLayout: function () {
        var toolbarItems = [
            {
                xtype: 'tbspacer',
                width: 20,
                height: 16,
                cls: 'coreshop_icon_embedded_class'
            },
            {
                xtype: "tbtext",
                text: "<b>" + t(this.tag.fieldConfig.title) + "</b>"
            }
        ];

        if (!this.noteditable) {
            toolbarItems.push("->");
            toolbarItems.push({
                iconCls: 'pimcore_icon_add',
                handler: function () {
                    this.tag.createNew();
                }.bind(this)
            });
        }

        this.container = new Ext.Panel({
            autoScroll: true,
            forceLayout: true,
            style: 'padding: 10px',
            tbar: toolbarItems,
            border: false
        });

        return this.container;
    },

    destroy: function () {
        if (this.container) {
            this.container.destroy();
        }
    },

    add: function (objectEdit, layout, general, icon) {
        var itemContainer = new coreshop.pimcore.coreExtension.embeddedClassItemContainer(this, objectEdit, this.noteditable, layout, general, icon);

        this.itemContainers.push(itemContainer);

        this.container.add(itemContainer.getLayout());
    },

    getItems: function() {
        return this.itemContainers;
    },

    getLayouts: function () {
        return this.container.items.items.map(function (item) {
            return item.initialConfig.objectEdit;
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.pimcore.coreExtension.embeddedClassItemContainer');

coreshop.pimcore.coreExtension.embeddedClassItemContainer = Class.create({
    panel: null,
    icon: 'pimcore_icon_object',
    dirty: false,
    removed: false,

    initialize: function (parentPanel, objectEdit, noteditable, layout, objectMetaData, icon) {
        this.parentPanel = parentPanel;
        this.noteditable = noteditable;
        this.index = objectMetaData.hasOwnProperty('index') ? objectMetaData.index : false;
        this.objectEdit = objectEdit;
        this.layout = layout;
        this.objectMetaData = objectMetaData;
        this.icon = icon;
    },

    getLayout: function () {
        var itemLayout = this.objectEdit.getLayout(this.layout);

        this.layout = new Ext.panel.Panel({
            blockClass: this,
            objectEdit: this.objectEdit,
            style: 'margin: 10px 0 0 0',
            border: true,
            scrollable: true,
            bodyPadding: 10,
            tbar: this.getTopBar(this.objectMetaData['o_className'] + ': ' + this.objectMetaData['index'], this.icon),
            items: [
                itemLayout
            ]
        });

        return this.layout;
    },

    isRemoved: function() {
        return this.removed;
    },

    isDirty: function () {
        return this.dirty;
    },

    getForm: function () {
        return {};
    },

    getIndex: function() {
        return this.index;
    },

    setIndex: function(index) {
        this.index = index;

        this.updateIndex();
    },

    getCurrentIndex: function () {
        // detect index
        var me = this,
            container = me.parentPanel.container,
            blockElement = me.layout,
            s;

        for (s = 0; s < container.items.items.length; s++) {
            if (container.items.items[s].getId() === blockElement.getId()) {
                return s;
            }
        }

        return null;
    },

    updateIndex: function() {
        this.layout.getDockedItems('toolbar[dock="top"]')[0].down('tbtext').setText(
            this.objectMetaData['o_className'] + ': ' + this.getIndex()
        );
    },

    getTopBar: function (name, iconCls) {
        var me = this,
            items = [
                {
                    iconCls: iconCls,
                    disabled: true,
                    xtype: 'button'
                },
                {
                    xtype: 'tbtext',
                    text: '<b>' + name + '</b>'
                },
                '-'
            ];

        if (!this.noteditable) {
            items.push({
                iconCls: 'pimcore_icon_up',
                handler: function (blockId, parent, container) {
                    var blockElement = me.layout,
                        prevElement = blockElement.previousSibling();

                    if (prevElement) {
                        me.parentPanel.container.moveBefore(blockElement, prevElement);
                        me.dirty = true;

                        me.updateIndex();
                        prevElement.blockClass.updateIndex();
                    }
                },
                xtype: 'button'
            });
            items.push({
                iconCls: 'pimcore_icon_down',
                handler: function (blockId, parent, container) {
                    var blockElement = me.layout,
                        nextElement = blockElement.nextSibling();

                    if (nextElement) {
                        me.parentPanel.container.moveAfter(blockElement, nextElement);
                        me.dirty = true;

                        me.updateIndex();
                        nextElement.blockClass.updateIndex();
                    }
                },
                xtype: 'button'
            });
            items.push('->');
            items.push({
                iconCls: 'pimcore_icon_delete',
                handler: function () {
                    me.parentPanel.container.remove(me.layout);
                    me.dirty = true;
                    me.removed = true;
                },
                xtype: 'button'
            });
        }

        return items;
    }
});


/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopDynamicDropdown');
pimcore.object.classes.data.coreShopDynamicDropdown = Class.create(pimcore.object.classes.data.data, {
    type: 'coreShopDynamicDropdown',
    allowIndex: true,

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true
    },

    // This is for documentation purposes (and to make ide IDE happy)
    // It will be overwritten in this.initData() immediately
    datax: {
        sortBy: null,
        recursive: null,
        className: null,
        methodName: null,
        folderName: null
    },

    initialize: function (treeNode, initData) {
        this.type = 'coreShopDynamicDropdown';
        this.initData(initData);
        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t('coreshop_dynamic_dropdown');
    },

    getGroup: function () {
        return 'select';
    },

    getIconClass: function () {
        return 'pimcore_icon_coreShopDynamicDropdown';
    },

    getLayout: function ($super) {
        $super();

        this.classesStore = new Ext.data.JsonStore({
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: '/admin/class/get-tree'
            },
            fields: ['name', 'id'],
            autoLoad: true
        });

        this.classesCombo = new Ext.form.ComboBox({
            fieldLabel: t('coreshop_dynamic_dropdown_allowed_classes'),
            name: 'className',
            listWidth: 'auto',
            triggerAction: 'all',
            editable: false,
            store: this.classesStore,
            displayField: 'text',
            valueField: 'text',
            summaryDisplay: true,
            value: this.datax.className,

            listeners: {
                collapse: {
                    fn: function (combo/*, value*/) {
                        this.methodsCombo.store.reload({
                            params: {
                                className: this.classesCombo.getValue()
                            }
                        });
                        this.methodsCombo.setValue('');
                    }.bind(this)
                }
            }
        });

        this.methodsStore = new Ext.data.JsonStore({
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/methods',
                extraParams: {
                    className: this.classesCombo.getValue()
                }
            },
            fields: ['key', 'value'],
        });

        this.methodsStore.load();

        this.methodsCombo = new Ext.form.ComboBox({
            fieldLabel: t('coreshop_dynamic_dropdown_methodname'),
            name: 'methodName',
            listWidth: 'auto',
            triggerAction: 'all',
            editable: false,
            store: this.methodsStore,
            displayField: 'value',
            valueField: 'key',
            summaryDisplay: true,
            queryMode: 'local',
            value: this.datax.methodName
        });

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: 'spinnerfield',
                fieldLabel: t('width'),
                name: 'width',
                value: this.datax.width
            },
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_dynamic_dropdown_folder_name'),
                name: 'folderName',
                cls: 'input_drop_target',
                value: this.datax.folderName,
                listeners: {
                    'render': function (el) {
                        new Ext.dd.DropZone(el.getEl(), {
                            reference: this,
                            ddGroup: 'element',
                            getTargetFromEvent: function (/* e */) {
                                return this.getEl();
                            }.bind(el),

                            onNodeOver: function (target, dd, e, data) {
                                data = data.records[0].data;
                                if (data.type == 'folder') {
                                    return Ext.dd.DropZone.prototype.dropAllowed;
                                }
                                return Ext.dd.DropZone.prototype.dropNotAllowed;
                            },

                            onNodeDrop: function (target, dd, e, data) {
                                data = data.records[0].data;
                                if (data.type == 'folder') {
                                    this.setValue(data.path);
                                    return true;
                                }
                                return false;
                            }.bind(el)
                        });
                    }
                }

            },
            {
                xtype: 'checkbox',
                fieldLabel: t('coreshop_dynamic_dropdown_recursive'),
                name: 'recursive',
                checked: this.datax.recursive
            },
            {
                xtype: 'checkbox',
                fieldLabel: t('coreshop_dynamic_dropdown_only_published'),
                name: 'onlyPublished',
                checked: this.datax.onlyPublished
            },
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_dynamic_dropdown_sort_by'),
                name: 'sortby',
                listWidth: 'auto',
                triggerAction: 'all',
                editable: false,
                value: this.datax.sortby ? this.datax.sortby : 'byid',
                store: [['byid', t('id')], ['byvalue', t('value')]]
            },
            this.classesCombo,
            this.methodsCombo
        ]);
        return this.layout;
    },

    isValid: function ($super) {
        var data = this.getData();
        if (data.className === '' || data.methodName === '' || data.folderName === '') {
            return false;
        }

        return $super();
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopDynamicDropdownMultiple');
pimcore.object.classes.data.coreShopDynamicDropdownMultiple = Class.create(pimcore.object.classes.data.coreShopDynamicDropdown, {
    type: 'coreShopDynamicDropdownMultiple',

    initialize: function (treeNode, initData) {
        this.type = 'coreShopDynamicDropdownMultiple';
        this.initData(initData);
        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t('coreshop_dynamic_dropdown_multiple');
    },

    getIconClass: function () {
        return 'pimcore_icon_coreShopDynamicDropdownMultiple';
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopItemSelector');
pimcore.object.classes.data.coreShopItemSelector = Class.create(pimcore.object.classes.data.coreShopDynamicDropdown, {
    type: 'coreShopItemSelector',

    initialize: function (treeNode, initData) {
        this.type = 'coreShopItemSelector';
        this.initData(initData);
        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t('coreshop_dynamic_dropdown_item_selector');
    },

    getIconClass: function () {
        return 'pimcore_icon_coreShopItemSelector';
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopSuperBoxSelect');
pimcore.object.classes.data.coreShopSuperBoxSelect = Class.create(pimcore.object.classes.data.coreShopDynamicDropdown, {
    type: 'coreShopSuperBoxSelect',

    initialize: function (treeNode, initData) {
        this.type = 'coreShopSuperBoxSelect';
        this.initData(initData);
        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t('coreshop_dynamic_dropdown_super_box_select');
    },

    getIconClass: function () {
        return 'pimcore_icon_coreShopSuperBoxSelect';
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.tags.coreShopDynamicDropdown');
pimcore.object.tags.coreShopDynamicDropdown = Class.create(pimcore.object.tags.select, {
    type: 'coreShopDynamicDropdown',

    getGridColumnEditor: function (field) {
        if (field.layout.noteditable) {
            return null;
        }
        this.options_store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/options',
                extraParams: {
                    folderName: field.layout.folderName,
                    methodName: field.layout.methodName,
                    className: field.layout.className,
                    recursive: field.layout.recursive,
                    current_language: pimcore.settings.language,
                    sortBy: field.layout.sortBy
                },
                reader: {
                    type: 'json',
                    rootProperty: 'options',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            fields: ['key', 'value'],
            listeners: {
                load: function (store, records, success, operation) {
                    console.debug(operation);
                }.bind(this)
            },
            autoLoad: true
        });

        var options = {
            store: this.options_store,
            triggerAction: 'all',
            editable: false,
            mode: 'local',
            valueField: 'value',
            displayField: 'key'
        };


        return new Ext.form.ComboBox(options);
    },

    getGridColumnConfig: function (field) {
        var renderer = function (key, value, metaData, record) {

            this.applyPermissionStyle(key, value, metaData, record);

            if (record.data.inheritedFields[key] && record.data.inheritedFields[key].inherited === true) {
                try {
                    metaData.tdCls += ' grid_value_inherited';
                } catch (e) {
                    console.log(e);
                }
            }

            return value;

        }.bind(this, field.key);

        return {
            header: ts(field.label), sortable: true, dataIndex: field.key, renderer: renderer,
            editor: this.getGridColumnEditor(field)
        };
    },

    getLayoutEdit: function () {

        this.options_store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/options',
                extraParams: {
                    folderName: this.fieldConfig.folderName,
                    methodName: this.fieldConfig.methodName,
                    className: this.fieldConfig.className,
                    recursive: this.fieldConfig.recursive,
                    current_language: pimcore.settings.language,
                    sortBy: this.fieldConfig.sortBy
                },
                reader: {
                    type: 'json',
                    rootProperty: 'options',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            fields: ['key', 'value'],
            listeners: {
                load: function (store, records, success, operation) {
                    if (!success) {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_dynamic_dropdown_error_loading_options'), 'error', operation.getError());
                    }
                }.bind(this)
            },
            autoLoad: true
        });

        var options = {
            name: this.fieldConfig.name,
            triggerAction: 'all',
            editable: true,
            typeAhead: true,
            forceSelection: true,
            selectOnFocus: true,
            fieldLabel: this.fieldConfig.title,
            store: this.options_store,
            itemCls: 'object_field',
            width: 300,
            displayField: 'key',
            valueField: 'value',
            queryMode: 'local',
            autoSelect: false,
            autoLoadOnValue: true,
            value: this.data,
            plugins: ['clearbutton'],
            listConfig: {
                getInnerTpl: function (displayField) {
                    return '<tpl for="."><tpl if="published == true">{key}<tpl else><div class="x-combo-item-disabled x-item-disabled">{key}</div></tpl></tpl>';
                }
            }
        };

        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }


        this.component = new Ext.form.ComboBox(options);

        if (!this.fieldConfig.onlyPublished) {
            this.component.addListener('beforeselect', function (combo, record, index, e) {
                if (!record.data.published) {
                    return false;
                }
            });
        }

        return this.component;
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.tags.coreShopDynamicDropdownMultiple');
pimcore.object.tags.coreShopDynamicDropdownMultiple = Class.create(pimcore.object.tags.multiselect, {
    type: 'coreShopDynamicDropdownMultiple',

    getLayoutEdit: function () {
        this.options_store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/options',
                extraParams: {
                    folderName: this.fieldConfig.folderName,
                    methodName: this.fieldConfig.methodName,
                    className: this.fieldConfig.className,
                    recursive: this.fieldConfig.recursive,
                    current_language: pimcore.settings.language,
                    sortNy: this.fieldConfig.sortBy
                },
                reader: {
                    type: 'json',
                    rootProperty: 'options',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            fields: ['key', 'value'],
            listeners: {
                load: function(store, records, success, operation) {
                    if (!success) {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_dynamic_dropdown_error_loading_options'), 'error', operation.getError());
                    }
                }.bind(this)
            },
            autoLoad: true
        });


        var options = {
            name: this.fieldConfig.name,
            triggerAction: 'all',
            editable: false,
            fieldLabel: this.fieldConfig.title,
            store: this.options_store,
            componentCls: 'object_field',
            height: 100,
            displayField: 'key',
            valueField: 'value',
            labelWidth: this.fieldConfig.labelWidth ? this.fieldConfig.labelWidth : 100,
            autoLoadOnValue: true,
            value: this.data
        };

        options.width = 300;
        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }

        options.width += options.labelWidth;

        if (this.fieldConfig.height) {
            options.height = this.fieldConfig.height;
        }

        if (typeof this.data === 'string' || typeof this.data === 'number') {
            options.value = this.data;
        }

        this.component = Ext.create('Ext.ux.form.MultiSelect', options);

        return this.component;
    },

    getGridColumnEditor:function (field) {
        return null;
    },

    getGridColumnFilter:function (field) {
        return null;
    }


});


/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.tags.coreShopItemSelector');
pimcore.object.tags.coreShopItemSelector = Class.create(pimcore.object.tags.multiselect, {
    delimiter:',',
    type: 'coreShopItemSelector',

    getLayoutEdit: function() {
        Ext.require([
            'Ext.ux.form.ItemSelector'
        ]);

        this.options_store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/options',
                extraParams: {
                    folderName: this.fieldConfig.folderName,
                    methodName: this.fieldConfig.methodName,
                    className: this.fieldConfig.className,
                    recursive: this.fieldConfig.recursive,
                    current_language: pimcore.settings.language,
                    sortBy: this.fieldConfig.sortBy
                },
                reader: {
                    type: 'json',
                    rootProperty: 'options',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            fields: ['key', 'value'],
            listeners: {
                load: function(store, records, success, operation) {
                    if (!success) {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_dynamic_dropdown_error_loading_options'), 'error', operation.getError());
                    }
                }.bind(this)
            },
            autoLoad: true
        });

        var options = {
            name: this.fieldConfig.name,
            displayField: 'key',
            valueField: 'value',
            fieldLabel: this.fieldConfig.title,
            store: this.options_store,
            fromTitle: t('coreshop_dynamic_dropdown_itemselector_available'),
            toTitle: t('coreshop_dynamic_dropdown_itemselector_selected'),
            width: 600,
            value: this.data
        };

        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }

        this.component = new Ext.ux.form.ItemSelector(options);
        return this.component;


    },

    getGridColumnEditor:function (field) {
        return null;
    },

    getGridColumnFilter:function (field) {
        return null;
    }
});


/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('pimcore.object.tags.coreShopSuperBoxSelect');
pimcore.object.tags.coreShopSuperBoxSelect = Class.create(pimcore.object.tags.multihref, {
    type: 'coreShopSuperBoxSelect',

    getLayoutEdit: function () {
        this.options_store = new Ext.data.JsonStore({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/dynamic-dropdown/options',
                extraParams: {
                    folderName: this.fieldConfig.folderName,
                    methodName: this.fieldConfig.methodName,
                    className: this.fieldConfig.className,
                    recursive: this.fieldConfig.recursive,
                    current_language: pimcore.settings.language,
                    sortBy: this.fieldConfig.sortBy,
                    requesting_field: 'superboxselect_' + this.fieldConfig.title
                },
                reader: {
                    type: 'json',
                    rootProperty: 'options',
                    successProperty: 'success',
                    messageProperty: 'message'
                }
            },
            fields: ['key', 'value'],
            listeners: {
                load: function(store, records, success, operation) {
                    if (!success) {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_dynamic_dropdown_error_loading_options'), 'error', operation.getError());
                    }

                    // FIXME is this necessary?
                    this.component.setValue(this.data, null, true);
                }.bind(this)
            },
            autoLoad: true
        });

        var options = {
            name: this.fieldConfig.name,
            displayField: 'key',
            valueField: 'value',
            fieldLabel: this.fieldConfig.title,
            store: this.options_store,
            width: 600,
            listeners: {
                blur: {
                    fn: function() {
                        this.dataChanged = true;
                    }.bind(this)
                }
            }
        };

        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }

        this.component = new Ext.form.field.Tag(options);
        return this.component;
    },

    getGridColumnEditor:function (field) {
        return null;
    },

    getGridColumnFilter:function (field) {
        return null;
    },

    getValue: function () {
        return this.component.getValue();
    }
});


pimcore.registerNS('coreshop.pimcore.plugin.grid');
coreshop.pimcore.plugin.grid = Class.create({

    openerCallback: null,
    allowedClasses: [],
    actionStore: null,
    type: null,
    gridPaginator: null,

    initialize: function (type, openerCallback, allowedClasses, gridPaginator) {
        this.type = type;
        this.openerCallback = openerCallback;
        this.allowedClasses = allowedClasses;
        this.gridPaginator = gridPaginator;
        this.actionStore = this.getActionStore();

        pimcore.plugin.broker.registerPlugin(this);
    },

    getActionStore: function () {
        var actionStore = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: '/admin/coreshop/grid/actions/' + this.type
            }),
            reader: new Ext.data.JsonReader({}, [
                {name: 'id'},
                {name: 'name'}
            ])
        });

        actionStore.load();

        return actionStore;
    },

    prepareOnRowContextmenu: function (menu, grid, selectedRows) {

        var extraParams = grid.getStore().getProxy().getExtraParams(),
            _ = this;

        if (!extraParams || !extraParams['class']) {
            return;
        }

        if (!Ext.Array.contains(this.allowedClasses, extraParams['class'])) {
            return;
        }

        menu.removeAll(true);

        if (selectedRows.length <= 1) {
            menu.add(new Ext.menu.Item({
                text: t('open'),
                iconCls: 'pimcore_icon_open',
                handler: function (grid, menu) {
                    var $el = Ext.get(menu.focusAnchor),
                        gridView = grid.getView(),
                        rowIndex = gridView.indexOf($el.el.up('table')),
                        data = grid.getStore().getAt(rowIndex);
                    if (data && data.data) {
                        this.openerCallback(data.data.id);
                    }
                }.bind(this, grid, menu)
            }));
        } else {
            menu.add(new Ext.menu.Item({
                text: t('open_selected'),
                iconCls: 'pimcore_icon_open',
                handler: function () {
                    for (var i = 0; i < selectedRows.length; i++) {
                        this.openerCallback(selectedRows[i].data.id);
                    }
                }.bind(this)
            }));
        }

        if (this.actionStore !== undefined) {

            var addActionsToMenu = function () {
                var actionItems = [];
                this.actionStore.each(function (rec) {
                    actionItems.push({
                        text: rec.get('name'),
                        iconCls: 'pimcore_icon_table',
                        name: rec.get('id'),
                        handler: function (item) {
                            this.applyAction(grid, item.name, selectedRows)
                        }.bind(this)
                    });
                }.bind(this));

                if (actionItems.length > 0) {
                    menu.add({
                        text: t('coreshop_order_list_action') + ' (' + selectedRows.length + ' ' + t(selectedRows.length === 1 ? 'item' : 'items') + ')',
                        iconCls: 'pimcore_icon_table pimcore_icon_overlay_go',
                        hideOnClick: false,
                        menu: actionItems
                    });
                }
            }.bind(this);

            if (this.actionStore.isLoading() || !this.actionStore.isLoaded()) {
                this.actionStore.on('load', function () {
                    addActionsToMenu();
                }.bind(this));
            } else {
                addActionsToMenu();
            }
        }
    },

    applyAction: function (grid, actionId, selectedRows) {

        var selectedObjects = [];
        for (var i = 0; i < selectedRows.length; i++) {
            selectedObjects.push(selectedRows[i].id)
        }

        grid.setLoading(t('loading'));

        Ext.Ajax.request({
            url: '/admin/coreshop/grid/apply-action',
            method: 'post',
            params: {
                actionId: actionId,
                ids: Ext.encode(selectedObjects)
            },
            success: function (response) {
                grid.setLoading(false);
                var res = Ext.decode(response.responseText);
                this.showMessageWindow(res.success ? 'success' : 'error', res.message);
            }.bind(this),
            failure: function (response) {
                grid.setLoading(false);
                // do nothing: pimcore will throw a error window.
            }.bind(this)
        });

    },

    showMessageWindow: function (type, message) {
        var win = new Ext.Window({
            modal: true,
            iconCls: 'pimcore_icon_' + type,
            title: t('coreshop_order_list_action_review'),
            width: 700,
            maxHeight: 500,
            html: message,
            autoScroll: true,
            bodyStyle: 'padding: 10px; background:#fff;',
            buttonAlign: 'center',
            shadow: false,
            closable: false,
            buttons: [{
                text: t('OK'),
                handler: function () {
                    this.gridPaginator.moveFirst();
                    win.close();
                }.bind(this)
            }]
        });

        win.show();
    }

});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.global');
coreshop.global = {
    resource: null,

    addStore: function (name, url, fields, sorters) {
        var proxy = new Ext.data.HttpProxy({
            url: '/admin/' + url + '/list'
        });

        if (!fields) {
            fields = [
                {name: 'id'},
                {name: 'name'}
            ];
        }

        var reader = new Ext.data.JsonReader({}, fields);

        var store = new Ext.data.Store({
            restful: false,
            proxy: proxy,
            reader: reader,
            autoload: true,
            fields: fields,
            sorters: sorters ? sorters : [],
            remoteSort: false,
            remoteFilter: false
        });

        pimcore.globalmanager.add(name, store);
    }
};


String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS("coreshop.resource");
pimcore.registerNS("coreshop.resource.plugin");
coreshop.resource.plugin = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "coreshop.resource.plugin";
    },

    initialize: function () {
        pimcore.plugin.broker.registerPlugin(this);
    },

    uninstall: function () {
    },

    pimcoreReady: function (params, broker) {
        this.fire('pimcore.ready', arguments);
    },

    preOpenObject: function (object, type) {
        this.fire('pimcore.preOpenObject', arguments);
    },

    postOpenObject: function (object, type) {
        this.fire('pimcore.postOpenObject', arguments);
    },

    preOpenAsset: function (asset, type) {
        this.fire('pimcore.preOpenAsset', arguments);
    },

    postOpenAsset: function (asset, type) {
        this.fire('pimcore.postOpenAsset', arguments);
    },

    preOpenDocument: function (document, type) {
        this.fire('pimcore.preOpenDocument', arguments);
    },

    postOpenDocument: function (document, type) {
        this.fire('pimcore.postOpenDocument', arguments);
    },

    fire: function(event, args) {
        args = Ext.Object.getValues(args);
        args.unshift(event);

        coreshop.broker.fireEvent.apply(this, args);
    }
});

new coreshop.resource.plugin();



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.helpers.requestNicePathData = function (targets, responseHandler) {
    var elementData = Ext.encode(targets);

    Ext.Ajax.request({
        method: 'POST',
        url: "/admin/coreshop/helper/get-nice-path",
        params: {
            targets: elementData
        },
        success: function (response) {
            try {
                var rdata = Ext.decode(response.responseText);
                if (rdata.success) {

                    var responseData = rdata.data;
                    responseHandler(responseData);
                }
            } catch (e) {
                console.log(e);
            }
        }.bind(this)
    });
};



Ext.define('CoreShop.resource.EventManager', {
    mixins: ['Ext.mixin.Observable'],

    constructor: function () {
        this.mixins.observable.constructor.call(this, {});
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.resources');
coreshop.resources = Class.create({
    resources: {},

    initialize: function () {
        Ext.Ajax.request({
            url: '/admin/coreshop/resource/config',
            success: function (response) {
                var resp = Ext.decode(response.responseText);

                coreshop.class_map = resp.classMap;
                coreshop.stack = resp.stack;

                coreshop.broker.fireEvent("afterClassMap", coreshop.class_map);
            }.bind(this)
        });

        coreshop.broker.addListener('resource.register', this.resourceRegistered, this);
    },

    resourceRegistered: function (name, resource) {
        this.resources[name] = resource;
    },

    open: function (module, resource) {
        this.resources[module].openResource(resource);
    }
});

coreshop.deepCloneStore = function (source) {
    source = Ext.isString(source) ? Ext.data.StoreManager.lookup(source) : source;

    var target = Ext.create(source.$className, {
        model: source.model,
    });

    target.add(Ext.Array.map(source.getRange(), function (record) {
        return record.copy();
    }));

    return target;
};

coreshop.broker.addListener('pimcore.ready', function() {
    coreshop.global.resource = new coreshop.resources();
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.resource.panel');
coreshop.resource.panel = Class.create({

    layoutId: 'abstract_layout',
    storeId: 'abstract_store',
    iconCls: 'coreshop_abstract_icon',
    type: 'abstract',

    url: {
        add: '',
        delete: '',
        get: '',
        list: ''
    },

    initialize: function () {
        // create layout
        this.getLayout();

        this.panels = [];
    },

    activate: function () {
        var tabPanel = Ext.getCmp('pimcore_panel_tabs');
        tabPanel.setActiveItem(this.layoutId);
    },

    getLayout: function () {
        if (!this.layout) {

            // create new panel
            this.layout = new Ext.Panel({
                id: this.layoutId,
                title: this.getTitle(),
                iconCls: this.iconCls,
                border: false,
                layout: 'border',
                closable: true,
                items: this.getItems()
            });

            // add event listener
            var layoutId = this.layoutId;
            this.layout.on('destroy', function () {
                pimcore.globalmanager.remove(layoutId);
            }.bind(this));

            // add panel to pimcore panel tabs
            var tabPanel = Ext.getCmp('pimcore_panel_tabs');
            tabPanel.add(this.layout);
            tabPanel.setActiveItem(this.layoutId);

            // update layout
            pimcore.layout.refresh();
        }

        return this.layout;
    },

    getTitle: function () {
        return t(this.type);
    },

    refresh: function () {
        if (pimcore.globalmanager.exists(this.storeId)) {
            pimcore.globalmanager.get(this.storeId).load();
        }
    },

    getItems: function () {
        return [this.getNavigation(), this.getTabPanel()];
    },

    getDefaultGridDisplayColumnName: function() {
        return 'name';
    },

    getGridDisplayColumnRenderer: function (value, metadata, record) {
        metadata.tdAttr = 'data-qtip="ID: ' + record.get('id') + '"';
        return value;
    },

    getDefaultGridConfiguration: function () {
        return {
            region: 'west',
            store: pimcore.globalmanager.get(this.storeId),
            columns: [
                {
                    text: '',
                    dataIndex: this.getDefaultGridDisplayColumnName(),
                    flex: 1,
                    renderer: this.getGridDisplayColumnRenderer
                }
            ],
            listeners: this.getTreeNodeListeners(),
            useArrows: true,
            autoScroll: true,
            animate: true,
            containerScroll: true,
            width: 200,
            split: true,
            tbar: this.getTopBar(),
            bbar: {
                items: [{
                    xtype: 'label',
                    text: '',
                    itemId: 'totalLabel'
                }, '->', {
                    iconCls: 'pimcore_icon_reload',
                    scale: 'small',
                    handler: function () {
                        this.grid.getStore().load();
                    }.bind(this)
                }]
            },
            hideHeaders: true
        };
    },

    getGridConfiguration: function () {
        return [];
    },

    getNavigation: function () {
        if (!this.grid) {

            this.grid = Ext.create('Ext.grid.Panel',
                Ext.apply({},
                    this.getGridConfiguration(),
                    this.getDefaultGridConfiguration()
                )
            );

            this.grid.getStore().on('load', function (store, records) {
                if (this.grid.rendered) {
                    this.grid.down('#totalLabel').setText(t('coreshop_total_items').format(records.length));
                }
            }.bind(this));

            this.grid.on('beforerender', function () {
                this.getStore().load();
            });

        }

        return this.grid;
    },

    getTopBar: function () {
        return [
            {
                // add button
                text: t('add'),
                iconCls: 'pimcore_icon_add',
                handler: this.addItem.bind(this)
            }
        ];
    },

    getTreeNodeListeners: function () {
        return {
            itemclick: this.onTreeNodeClick.bind(this),
            itemcontextmenu: this.onTreeNodeContextmenu.bind(this)
        };
    },

    onTreeNodeContextmenu: function (tree, record, item, index, e, eOpts) {
        e.stopEvent();
        tree.select();

        var menu = new Ext.menu.Menu();
        menu.add(new Ext.menu.Item({
            text: t('delete'),
            iconCls: 'pimcore_icon_delete',
            handler: this.deleteItem.bind(this, record)
        }));

        menu.showAt(e.pageX, e.pageY);
    },

    onTreeNodeClick: function (tree, record, item, index, e, eOpts) {
        this.openItem(record.data);
    },

    addItem: function () {
        Ext.MessageBox.prompt(t('add'), t('coreshop_enter_the_name'), this.addItemComplete.bind(this), null, null, '');
    },

    addItemComplete: function (button, value, object) {
        var jsonData = {
            name: value
        };

        if (Ext.isFunction(this.prepareAdd)) {
            jsonData = this.prepareAdd(jsonData);
        }

        if (button === 'ok' && value.length > 2) {
            Ext.Ajax.request({
                url: this.url.add,
                jsonData: jsonData,
                method: 'post',
                success: function (response) {
                    var data = Ext.decode(response.responseText);

                    this.grid.getStore().reload();

                    this.refresh();

                    if (!data || !data.success) {
                        Ext.Msg.alert(t('add_target'), t('problem_creating_new_target'));
                    } else {
                        this.openItem(data.data);
                    }
                }.bind(this)
            });
        } else {
            Ext.Msg.alert(t('add_target'), t('problem_creating_new_target'));
        }
    },

    deleteItem: function (record) {
        Ext.Ajax.request({
            url: this.url.delete,
            method: 'DELETE',
            params: {
                id: record.id
            },
            success: function () {
                this.grid.getStore().reload();

                this.refresh();

                if (this.panels[this.getPanelKey(record)]) {
                    this.panels[this.getPanelKey(record)].destroy();
                }

            }.bind(this)
        });
    },

    getPanelKey: function (record) {
        return this.layoutId + record.id;
    },

    openItem: function (record) {
        var panelKey = this.getPanelKey(record);

        if (this.panels[panelKey]) {
            this.panels[panelKey].activate();
        }
        else {
            Ext.Ajax.request({
                url: this.url.get,
                params: {
                    id: record.id
                },
                success: function (response) {
                    var res = Ext.decode(response.responseText);

                    if (res.success) {
                        var itemClass = this.getItemClass();

                        this.panels[panelKey] = new itemClass(this, res.data, panelKey, this.type, this.storeId);
                    } else {
                        Ext.Msg.alert(t('open_target'), t('problem_opening_new_target'));
                    }

                }.bind(this)
            });
        }
    },

    getItemClass: function () {
        return coreshop[this.type].item;
    },

    getTabPanel: function () {
        if (!this.panel) {
            this.panel = new Ext.TabPanel({
                region: 'center',
                border: false
            });
        }

        return this.panel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.resource.item');
coreshop.resource.item = Class.create({

    iconCls: '',

    url: {
        save: ''
    },

    multiShopSettings: false,

    initialize: function (parentPanel, data, panelKey, type) {
        this.parentPanel = parentPanel;
        this.data = data;
        this.panelKey = panelKey;
        this.type = type;

        this.initPanel();
    },

    initPanel: function () {
        this.panel = this.getPanel();

        this.panel.on('beforedestroy', function () {
            delete this.parentPanel.panels[this.panelKey];
        }.bind(this));

        this.parentPanel.getTabPanel().add(this.panel);
        this.parentPanel.getTabPanel().setActiveItem(this.panel);
    },

    destroy: function () {
        if (this.panel) {
            this.panel.destroy();
        }
    },

    getPanel: function () {
        var items = this.getItems();

        panel = new Ext.panel.Panel({
            title: this.getTitleText(),
            closable: true,
            iconCls: this.iconCls,
            layout: 'border',
            items: items
        });

        return panel;
    },

    getTitleText: function () {
        return this.data.name;
    },

    activate: function () {
        this.parentPanel.getTabPanel().setActiveItem(this.panel);
    },

    getItems: function () {
        return [];
    },

    getSaveData: function () {
        return {};
    },

    save: function (callback) {
        var me = this,
            data;

        if (this.isValid()) {
            var saveData = this.getSaveData();

            saveData['id'] = this.data.id;
            saveData = this.convertDotNotationToObject(saveData);

            if (saveData.hasOwnProperty('stores')) {
                var stores = [];

                saveData.stores.forEach(function (store) {
                    stores.push(store + "");
                });

                saveData.stores = stores;
            }

            Ext.Ajax.request({
                url: this.url.save,
                method: 'post',
                jsonData: saveData,
                success: function (response) {
                    try {
                        if (this.parentPanel.store) {
                            this.parentPanel.store.load();
                        }

                        this.parentPanel.refresh();

                        var res = Ext.decode(response.responseText);

                        this.postSave(res);

                        if (Ext.isFunction(callback)) {
                            callback(res);
                        }

                        if (res.success) {
                            pimcore.helpers.showNotification(t('success'), t('coreshop_save_success'), 'success');

                            this.data = res.data;

                            this.panel.setTitle(this.getTitleText());
                        } else {
                            pimcore.helpers.showNotification(t('error'), t('coreshop_save_error'),
                                'error', res.message);
                        }
                    } catch (e) {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_save_error'), 'error');
                    }
                }.bind(this)
            });
        }
    },

    postSave: function (result) {

    },

    isValid: function () {
        return true;
    },

    convertDotNotationToObject: function (data) {
        var obj = {};

        Object.keys(data).forEach(function (key) {  //loop through the keys in the object
            var val = data[key];  //grab the value of this key
            var step = obj;  //reference the object that holds the values
            key.split(".").forEach(function (part, index, arr) {   //split the parts and loop
                if (index === arr.length - 1) {  //If we are at the last index, than we set the value
                    step[part] = val;
                } else if (step[part] === undefined) {  //If we have not seen this key before, create an object
                    step[part] = {};
                }
                step = step[part];  //Step up the object we are referencing
            });
        });

        return obj;
    }
});



Ext.define('CoreShop.resource.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.coreshop.combo',

    typeAhead: true,
    mode: 'local',
    listWidth: 100,
    displayField: 'name',
    valueField: 'id',
    forceSelection: true,
    triggerAction: 'all',
    queryMode: 'local',

    config: {
        storeId: null
    },

    initComponent: function() {
        this.callParent();

        if (this.getStoreId()) {
            this.setStore(pimcore.globalmanager.get(this.getStoreId()));
        }
        else {
            this.setStore(coreshop.deepCloneStore(this.getStore()));
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.elementHref');
coreshop.object.elementHref = Class.create(pimcore.object.tags.href, {
    getLayoutEdit: function ($super) {
        var me = this,
            element = $super();

        if (this.data) {
            if (!this.data.path) {
                this.component.setValue(this.data.id);
            }
        }

        this.component.setReadOnly(true);

        this.component.getModelData = function (includeEmptyText, /*private*/
                                                isSubmitting) {
            var data = null;
            // Note that we need to check if this operation is being called from a Submit action because displayfields aren't
            // to be submitted,  but they can call this to get their model data.
            if (!this.disabled && (this.submitValue || !isSubmitting)) {
                data = {};
                data[this.getFieldIdentifier()] = me.getValue();
            }
            return data;
        };

        return element;
    },

    requestNicePathData: function () {
        if (this.data.id) {
            coreshop.helpers.requestNicePathData([this.data], function (responseData) {
                if (typeof responseData[this.data.id] !== "undefined") {
                    this.component.setValue(responseData[this.data.id]);
                }
            }.bind(this));
        }
    },

    getValue: function () {
        return this.data.id;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.objectMultihref');
coreshop.object.objectMultihref = Class.create(pimcore.object.tags.objects, {

    type: 'objectMultihref',
    dataChanged: false,

    initialize: function (data, fieldConfig) {
        this.data = [];
        this.fieldConfig = fieldConfig;

        if (data) {
            this.data = data;
        }

        this.store = new Ext.data.ArrayStore({
            listeners: {
                add: function () {
                    this.dataChanged = true;
                }.bind(this),
                remove: function () {
                    this.dataChanged = true;
                }.bind(this),
                clear: function () {
                    this.dataChanged = true;
                }.bind(this),
                update: function (store) {
                    this.dataChanged = true;
                }.bind(this)
            },
            fields: ['id'],
            expandData: true
        });

        this.store.loadData(this.data);
    },

    createLayout: function (readOnly) {
        var autoHeight = false;
        if (intval(this.fieldConfig.height) < 15) {
            autoHeight = true;
        }

        var cls = 'object_field';

        var columns = [
            {
                header: 'ID',
                dataIndex: 'id',
                width: 50
            },
            {
                header: t("reference"),
                dataIndex: 'path',
                flex: 1,
                sortable: false
            },
            {
                xtype: 'actioncolumn',
                width: 40,
                items: [
                    {
                        tooltip: t('open'),
                        iconCls: 'coreshop_icon_cursor',
                        handler: function (grid, rowIndex) {
                            var data = grid.getStore().getAt(rowIndex);
                            pimcore.helpers.openObject(data.data.id, 'object');
                        }.bind(this)
                    }
                ]
            },
            {
                xtype: 'actioncolumn',
                width: 40,
                items: [
                    {
                        tooltip: t('remove'),
                        icon: 'pimcore_icon_delete',
                        handler: function (grid, rowIndex) {
                            grid.getStore().removeAt(rowIndex);
                        }.bind(this)
                    }
                ]
            }
        ];

        this.component = new Ext.grid.GridPanel({
            store: this.store,
            selModel: Ext.create('Ext.selection.RowModel', {}),
            minHeight: 150,
            border: true,
            viewConfig: {
                forceFit: true
            },
            columns: columns,
            cls: cls,

            //autoExpandColumn: 'path',
            width: this.fieldConfig.width,
            height: this.fieldConfig.height,
            tbar: {
                items: [
                    {
                        xtype: 'tbspacer',
                        width: 20,
                        height: 16,
                        cls: 'pimcore_icon_droptarget'
                    },
                    {
                        xtype: 'tbtext',
                        text: '<b>' + this.fieldConfig.title + '</b>'
                    },
                    '->',
                    {
                        xtype: 'button',
                        iconCls: 'pimcore_icon_search',
                        handler: this.openSearchEditor.bind(this)
                    },
                    {
                        xtype: 'button',
                        iconCls: 'pimcore_icon_delete',
                        handler: this.empty.bind(this)
                    }
                ],
                ctCls: 'pimcore_force_auto_width',
                cls: 'pimcore_force_auto_width'
            },
            autoHeight: autoHeight,
            bodyCssClass: 'pimcore_object_tag_objects'
        });

        this.component.on('rowcontextmenu', this.onRowContextmenu);
        this.component.reference = this;

        if (!readOnly) {
            this.component.on('afterrender', function () {

                var dropTargetEl = this.component.getEl();
                var gridDropTarget = new Ext.dd.DropZone(dropTargetEl, {
                    ddGroup: 'element',
                    getTargetFromEvent: function (e) {
                        return this.component.getEl().dom;
                    }.bind(this),
                    onNodeOver: function (overHtmlNode, ddSource, e, data) {
                        var record = data.records[0];
                        var data = record.data;
                        var fromTree = this.isFromTree(ddSource);

                        if (data.elementType == 'object' && this.dndAllowed(data, fromTree)) {
                            return Ext.dd.DropZone.prototype.dropAllowed;
                        } else {
                            return Ext.dd.DropZone.prototype.dropNotAllowed;
                        }

                    }.bind(this),
                    onNodeDrop: function (target, ddSource, e, data) {
                        var record = data.records[0];
                        var data = record.data;
                        var fromTree = this.isFromTree(ddSource);

                        // check if data is a treenode, if not allow drop because of the reordering
                        if (!fromTree) {
                            return true;
                        }

                        if (data.elementType != 'object') {
                            return false;
                        }

                        if (this.dndAllowed(data, fromTree)) {
                            var initData = {
                                id: data.id,
                                path: data.path,
                                type: data.className
                            };

                            if (!this.objectAlreadyExists(initData.id)) {
                                this.store.add(initData);
                                return true;
                            }
                        }

                        return false;
                    }.bind(this)
                });
            }.bind(this));
        }

        this.requestNicePathData(this.store.data);

        return this.component;
    },

    getLayoutEdit: function () {
        return this.createLayout(false);
    },

    getLayoutShow: function () {
        return this.createLayout(true);
    },

    openSearchEditor: function () {
        var allowedClasses;
        if (this.fieldConfig.classes != null && this.fieldConfig.classes.length > 0) {
            allowedClasses = [];
            for (var i = 0; i < this.fieldConfig.classes.length; i++) {
                allowedClasses.push(this.fieldConfig.classes[i].classes);
            }
        }

        pimcore.helpers.itemselector(true, this.addDataFromSelector.bind(this), {
            type: ['object'],
            subtype: {
                object: ['object', 'folder', 'variant']
            },
            specific: {
                classes: allowedClasses
            }
        });
    },

    getValue: function () {
        var tmData = [];

        var data = this.store.queryBy(function (record, id) {
            return true;
        });

        for (var i = 0; i < data.items.length; i++) {
            tmData.push(data.items[i].data.id);
        }

        return tmData;
    },

    requestNicePathData: function (targets) {
        var elementData = [];

        targets.each(function (record) {
            elementData.push({
                type: 'object',
                id: record.get("id")
            });
        }, this);

        coreshop.helpers.requestNicePathData(elementData, pimcore.helpers.getNicePathHandlerStore.bind(this, this.store, {}, this.component.getView()));
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.classes.data.data');
coreshop.object.classes.data.data = Class.create(pimcore.object.classes.data.data, {

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true
    },

    initialize: function (treeNode, initData) {
        this.initData(initData);

        this.treeNode = treeNode;
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();

        return this.layout;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.classes.data.dataMultiselect');
coreshop.object.classes.data.dataMultiselect = Class.create(pimcore.object.classes.data.multiselect, {

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true
    },

    initialize: function (treeNode, initData) {
        this.initData(initData);

        this.treeNode = treeNode;
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();

        return this.layout;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.classes.data.select');
coreshop.object.classes.data.select = Class.create(coreshop.object.classes.data.data, {

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true
    },

    initialize: function (treeNode, initData) {
        this.initData(initData);

        this.treeNode = treeNode;
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();

        this.specificPanel.add([
            {
                xtype: "checkbox",
                checked: this.datax.allowEmpty,
                fieldLabel: t("allowEmpty"),
                name: "allowEmpty"
            }
        ]);

        return this.layout;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.tags.select');
coreshop.object.tags.select = Class.create(pimcore.object.tags.select, {

    allowEmpty: false,
    displayField: 'name',

    initialize: function (data, fieldConfig) {
        this.data = data;
        this.fieldConfig = fieldConfig;
        this.fieldConfig.width = 350;
    },

    getLayoutEdit: function () {
        // generate store
        var store = [];
        var validValues = [];

        if (pimcore.globalmanager.exists(this.storeName)) {
            store = pimcore.globalmanager.get(this.storeName);
        } else {
            throw this.storeName + ' should be added as valid store';
        }

        var comboBoxStore = new Ext.data.Store({
            proxy: store.proxy,
            reader: store.reader
        });

        if (store.isLoaded()) {
            comboBoxStore.add(store.getRange());

            if (this.fieldConfig.allowEmpty) {
                comboBoxStore.insert(0, {
                    name: t('empty'),
                    id: 0
                });
            }
        } else {
            comboBoxStore.load(function () {
                if (this.fieldConfig.allowEmpty) {
                    comboBoxStore.insert(0, {
                        name: t('empty'),
                        id: 0
                    });
                }
            }.bind(this));
        }

        var options = {
            name: this.fieldConfig.name,
            triggerAction: 'all',
            editable: false,
            typeAhead: false,
            forceSelection: true,
            fieldLabel: this.fieldConfig.title,
            store: comboBoxStore,
            componentCls: 'object_field',
            width: 250,
            labelWidth: 100,
            displayField: this.displayField,
            valueField: 'id',
            queryMode: 'local',
            value: this.data ? parseInt(this.data) : null,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();
                },

                select: function (comp, record, index) {
                    if (comp.getValue() == 0 && this.fieldConfig.allowEmpty)
                        comp.setValue(null);
                }.bind(this)
            }
        };

        if (this.fieldConfig.labelWidth) {
            options.labelWidth = this.fieldConfig.labelWidth;
        }

        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }

        options.width += options.labelWidth;

        this.component = new Ext.form.ComboBox(options);

        return this.component;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.object.tags.multiselect');
coreshop.object.tags.multiselect = Class.create(pimcore.object.tags.multiselect, {
    displayField: 'name',

    getLayoutEdit: function () {

        // generate store
        var store = [];

        if (pimcore.globalmanager.exists(this.storeName)) {
            store = pimcore.globalmanager.get(this.storeName);
        } else {
            console.log(this.storeName + ' should be added as valid store');
        }

        var options = {
            name: this.fieldConfig.name,
            triggerAction: 'all',
            editable: false,
            fieldLabel: this.fieldConfig.title,
            store: store,
            itemCls: 'object_field',
            maxHeight: 400,
            queryMode: 'local',
            displayField: this.displayField,
            valueField: 'id',
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();
                }
            }
        };

        if (this.fieldConfig.width) {
            options.width = this.fieldConfig.width;
        }

        if (this.fieldConfig.height) {
            options.height = this.fieldConfig.height;
        }

        if (typeof this.data == 'string' || typeof this.data == 'number') {
            options.value = this.data;
        }

        this.component = new Ext.ux.form.MultiSelect(options);

        return this.component;
    }

});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.classes.data.coreShopMoney");
pimcore.object.classes.data.coreShopMoney = Class.create(pimcore.object.classes.data.data, {
    type: "coreShopMoney",

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true,
        classificationstore: true,
        block: true
    },

    initialize: function (treeNode, initData) {
        this.type = "coreShopMoney";

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("coreshop_money");
    },

    getGroup: function () {
        return "coreshop";
    },

    getIconClass: function () {
        return "coreshop_icon_money";
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("width"),
                name: "width",
                value: this.datax.width
            },
            {
                xtype: "numberfield",
                fieldLabel: t("default_value"),
                name: "defaultValue",
                value: this.datax.defaultValue
            }, {
                xtype: "panel",
                bodyStyle: "padding-top: 3px",
                style: "margin-bottom: 10px",
                html: '<span class="object_field_setting_warning">' + t('default_value_warning') + '</span>'
            }
        ]);

        if (!this.isInCustomLayoutEditor()) {
            this.specificPanel.add([
                {
                    xtype: "numberfield",
                    fieldLabel: t("min_value"),
                    name: "minValue",
                    value: this.datax.minValue
                }, {
                    xtype: "numberfield",
                    fieldLabel: t("max_value"),
                    name: "maxValue",
                    value: this.datax.maxValue
                }
            ]);
        }

        return this.layout;
    },

    applySpecialData: function (source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax = {};
            }

            Ext.apply(this.datax, {
                width: source.datax.width,
                defaultValue: source.datax.defaultValue,
                minValue: source.datax.minValue,
                maxValue: source.datax.maxValue,
            });
        }
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.tags.coreShopMoney");
pimcore.object.tags.coreShopMoney = Class.create(pimcore.object.tags.abstract, {

    type: "coreShopMoney",

    initialize: function (data, fieldConfig)
    {
        this.defaultValue = null;
        if ((typeof data === "undefined" || data === null) && fieldConfig.defaultValue) {
            data = fieldConfig.defaultValue;
            this.defaultValue = data;
        }

        this.data = data;
        this.fieldConfig = fieldConfig;
    },

    getGridColumnEditor: function (field)
    {
        var editorConfig = {};

        if (field.config) {
            if (field.config.width) {
                if (intval(field.config.width) > 10) {
                    editorConfig.width = field.config.width;
                }
            }
        }

        if (field.layout.noteditable) {
            return null;
        }

        if (field.type === "numeric") {
            // we have to use Number since the spinner trigger don't work in grid -> seems to be a bug of Ext
            return new Ext.form.field.Number(editorConfig);
        }
    },

    getGridColumnFilter: function (field)
    {
        return {
            type: 'numeric',
            dataIndex: field.key
        };
    },

    getLayoutEdit: function ()
    {
        var input = {
            fieldLabel: this.fieldConfig.title,
            name: this.fieldConfig.name,
            componentCls: "object_field"
        };

        if (!isNaN(this.data)) {
            input.value = this.data;
        }

        if (this.fieldConfig.width) {
            input.width = this.fieldConfig.width;
        } else {
            input.width = 350;
        }

        if (this.fieldConfig.labelWidth) {
            input.labelWidth = this.fieldConfig.labelWidth;
        }
        input.width += input.labelWidth;

        if (is_numeric(this.fieldConfig["minValue"])) {
            input.minValue = this.fieldConfig.minValue;
        }

        if (is_numeric(this.fieldConfig["maxValue"])) {
            input.maxValue = this.fieldConfig.maxValue;
        }

        this.component = new Ext.form.field.Number(input);
        return this.component;
    },


    getLayoutShow: function ()
    {
        var input = {
            fieldLabel: this.fieldConfig.title,
            name: this.fieldConfig.name,
            componentCls: "object_field"
        };

        if (!isNaN(this.data)) {
            input.value = this.data;
        }

        if (this.fieldConfig.width) {
            input.width = this.fieldConfig.width;
        }

        if (this.fieldConfig.labelWidth) {
            input.labelWidth = this.fieldConfig.labelWidth;
        }

        input.width += input.labelWidth;

        this.component = new Ext.form.field.Number(input);
        this.component.disable();

        return this.component;
    },

    getValue: function ()
    {
        if (this.isRendered()) {
            var value = this.component.getValue();

            if (value === null) {
                return value;
            }

            return value.toString();
        } else if (this.defaultValue) {
            return this.defaultValue;
        }
        return this.data;
    },

    getName: function ()
    {
        return this.fieldConfig.name;
    },

    isInvalidMandatory: function ()
    {
        if (!this.isRendered() && (!empty(this.getInitialData() || this.getInitialData() === 0) )) {
            return false;
        } else if (!this.isRendered()) {
            return true;
        }

        return this.getValue();
    },

    isDirty: function ()
    {
        var dirty = false;

        if (this.defaultValue) {
            return true;
        }

        if (this.component && typeof this.component.isDirty === "function") {
            if (this.component.rendered) {
                dirty = this.component.isDirty();

                // once a field is dirty it should be always dirty (not an ExtJS behavior)
                if (this.component["__pimcore_dirty"]) {
                    dirty = true;
                }
                if (dirty) {
                    this.component["__pimcore_dirty"] = true;
                }

                return dirty;
            }
        }

        return false;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.panel');
coreshop.rules.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var array
     */
    conditions: [],

    /**
     * @var array
     */
    actions: [],

    /**
     * @var object
     */
    config: {},

    /**
     * constructor
     */
    initialize: function () {
        var me = this;

        Ext.Ajax.request({
            url: this.url.config,
            method: 'GET',
            success: function (result) {
                var config = Ext.decode(result.responseText);
                me.conditions = config.conditions;
                me.actions = config.actions;

                me.config = config;
            }
        });

        // create layout
        this.getLayout();

        this.panels = [];
    },

    getGridDisplayColumnRenderer: function (value, metadata, record) {
        metadata.tdAttr = 'data-qtip="ID: ' + record.get('id') + '"';
        if(record.get('active') === false) {
            metadata.tdCls = 'pimcore_rule_disabled';
        }
        return value;
    },

    getItemClass: function () {
        return coreshop.rules.item;
    },

    getActions: function () {
        return this.actions;
    },

    getConfig: function () {
        return this.config;
    },

    getConditions: function () {
        return this.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.item');

coreshop.rules.item = Class.create(coreshop.resource.item, {
    getActionContainerClass: function () {
        return coreshop.rules.action;
    },

    getConditionContainerClass: function () {
        return coreshop.rules.condition;
    },

    getItems: function () {
        var actionContainerClass = this.getActionContainerClass();
        var conditionContainerClass = this.getConditionContainerClass();

        this.actions = new actionContainerClass(this.parentPanel.getActions());
        this.conditions = new conditionContainerClass(this.parentPanel.getConditions());

        var items = [
            this.getSettings(),
            this.conditions.getLayout(),
            this.actions.getLayout()
        ];

        // add saved conditions
        if (this.data.conditions) {
            Ext.each(this.data.conditions, function (condition) {
                this.conditions.addCondition(condition.type, condition);
            }.bind(this));
        }

        // add saved actions
        if (this.data.actions) {
            Ext.each(this.data.actions, function (action) {
                this.actions.addAction(action.type, action);
            }.bind(this));
        }

        return items;
    },

    getSaveData: function () {
        saveData = this.settingsForm.getForm().getFieldValues();
        saveData['conditions'] = this.conditions.getConditionsData();
        saveData['actions'] = this.actions.getActionsData();

        return saveData;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.abstract');

coreshop.rules.abstract = Class.create({

    /**
     * coreshop.rules.item
     */
    parent: {},

    data: {},

    type: 'abstract',
    elementType: 'abstract',

    form: null,

    initialize: function (parent, type, data) {
        this.parent = parent;
        this.type = type;
        this.id = data && data.hasOwnProperty('id') ? data.id : data;
        this.data = data && data.hasOwnProperty('configuration') ? data.configuration : {};
    },

    getLayout: function () {
        var myId = Ext.id();

        this.layout = new Ext.panel.Panel({
            xparent: this,
            id: myId,
            style: 'margin: 10px 0 0 0',
            border: true,
            scrollable: true,
            bodyPadding: 10,
            maxHeight: 500,
            tbar: this.getTopBar(t('coreshop_' + this.elementType + '_' + this.type), myId, this.parent, this.data, this.getTopBarIconClass()),
            items: [
                this.getForm()
            ]
        });

        return this.layout;
    },

    getTopBarIconClass: function () {
        return 'coreshop_rule_icon_' + this.elementType + '_' + this.type;
    },

    getForm: function () {
        return {};
    },

    getIndex: function (blockElement, container) {
        // detect index
        var index;

        for (var s = 0; s < container.items.items.length; s++) {
            if (container.items.items[s].getId() == blockElement.getId()) {
                index = s;
                break;
            }
        }

        return index;
    },

    /**
     * @param name
     * @param index
     * @param parent
     * @param data
     * @param iconCls
     * @returns {Array}
     */
    getTopBar: function (name, index, parent, data, iconCls) {
        var namespace = '';
        var container = null;

        if (this.elementType == 'action') {
            namespace = 'actions';
            container = parent.actionsContainer;
        } else if (this.elementType == 'condition') {
            namespace = 'conditions';
            container = parent.conditionsContainer;
        }

        var items = [{
            iconCls: iconCls,
            disabled: true,
            xtype: 'button'
        }, {
            xtype: 'tbtext',
            text: '<b>' + name + '</b>'
        }, '-', {
            iconCls: 'pimcore_icon_up',
            handler: function (blockId, parent, container, namespace) {

                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.rules[namespace].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                var newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = 0;
                }

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(newIndex, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();
            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }, {
            iconCls: 'pimcore_icon_down',
            handler: function (blockId, parent, container, namespace) {

                var container = container;
                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.rules[namespace].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(index + 1, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();

            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }];


        if (Ext.isFunction(this.getTopBarItems)) {
            items.push.apply(items, this.getTopBarItems());
        }

        items.push.apply(items, [
            '->', {
                iconCls: 'pimcore_icon_delete',
                handler: function (index, parent, container, namespace) {
                    container.remove(Ext.getCmp(index));
                }.bind(window, index, parent, container, namespace),
                xtype: 'button'
            }
        ]);

        return items;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.condition');

coreshop.rules.condition = Class.create({
    initialize: function (conditions) {
        this.conditions = conditions;
    },

    getLayout: function () {
        // init
        var _this = this;
        var addMenu = [];

        // show only defined conditions
        Ext.each(this.conditions, function (condition) {

            if (condition === 'abstract')
                return;

            addMenu.push({
                iconCls: _this.getConditionStyleClass(condition),
                text: t('coreshop_condition_' + condition),
                handler: _this.addCondition.bind(_this, condition, null)
            });

        });

        this.conditionsContainer = new Ext.Panel({
            iconCls: 'coreshop_rule_conditions',
            title: t('conditions'),
            autoScroll: true,
            style: 'padding: 10px',
            forceLayout: true,
            tbar: [{
                iconCls: 'pimcore_icon_add',
                menu: addMenu
            }],
            border: false
        });

        return this.conditionsContainer;
    },

    destroy: function () {
        if (this.conditionsContainer) {
            this.conditionsContainer.destroy();
        }
    },

    getConditionStyleClass: function (condition) {
        return 'coreshop_rule_icon_condition_' + condition;
    },

    getConditionClassItem: function (type) {
        if (Object.keys(this.getConditionClassNamespace()).indexOf(type) >= 0) {
            return this.getConditionClassNamespace()[type];
        }

        return this.getDefaultConditionClassItem();
    },

    getConditionClassNamespace: function () {
        return coreshop.rules.conditions;
    },

    getDefaultConditionClassItem: function () {
        return coreshop.rules.conditions.abstract;
    },

    addCondition: function (type, data) {
        // create condition
        var conditionClass = this.getConditionClassItem(type);
        var item = new conditionClass(this, type, data);

        // add logic for brackets
        var tab = this;

        this.conditionsContainer.add(item.getLayout());
        this.conditionsContainer.updateLayout();
    },

    getConditionsData: function () {
        // get defined conditions
        var conditionsData = [];
        var conditions = this.conditionsContainer.items.getRange();
        for (var i = 0; i < conditions.length; i++) {
            var condition = {};
            var configuration = {};

            var conditionItem = conditions[i];
            var conditionClass = conditionItem.xparent;

            if (Ext.isFunction(conditionClass['getValues'])) {
                configuration = conditionClass.getValues();
            } else {
                var form = conditionClass.form;

                if (form) {
                    if (Ext.isFunction(form.getValues)) {
                        configuration = form.getValues();
                    }
                    else {
                        for (var c = 0; c < form.items.length; c++) {
                            var item = form.items.get(c);

                            try {
                                configuration [item.getName()] = item.getValue();
                            }
                            catch (e) {

                            }
                        }
                    }
                }
            }

            if (conditionClass.data.id) {
                action['id'] = conditionClass.data.id;
            }

            condition['configuration'] = configuration;
            condition['type'] = conditions[i].xparent.type;

            if (Ext.isFunction(this.prepareCondition)) {
                condition = this.prepareCondition(condition);
            }

            conditionsData.push(condition);
        }

        return conditionsData;
    },

    isDirty: function () {
        if (this.conditionsContainer.items) {
            var conditions = this.conditionsContainer.items.getRange();
            for (var i = 0; i < conditions.length; i++) {
                var conditionItem = conditions[i];
                var conditionClass = conditionItem.xparent;

                if (Ext.isFunction(conditionClass['isDirty'])) {
                    if (conditionClass.isDirty()) {
                        return true;
                    }
                } else {
                    var form = conditionClass.form;

                    if (form && Ext.isFunction(form.isDirty)) {
                        if (form.isDirty()) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.action');
coreshop.rules.action = Class.create({

    initialize: function (actions) {
        this.actions = actions;
    },

    getLayout: function () {
        // init
        var _this = this;
        var addMenu = [];

        // show only defined actions
        Ext.each(this.actions, function (action) {

            if (action == 'abstract')
                return;

            addMenu.push({
                iconCls: 'coreshop_rule_icon_action_' + action,
                text: t('coreshop_action_' + action),
                handler: _this.addAction.bind(_this, action, null)
            });
        });

        this.actionsContainer = new Ext.Panel({
            iconCls: 'coreshop_rule_actions',
            title: t('actions'),
            autoScroll: true,
            forceLayout: true,
            style: 'padding: 10px',
            tbar: [{
                iconCls: 'pimcore_icon_add',
                menu: addMenu
            }],
            border: false
        });

        return this.actionsContainer;
    },

    destroy: function () {
        if (this.actionsContainer) {
            this.actionsContainer.destroy();
        }
    },

    addAction: function (type, data) {
        var actionClass = this.getActionClassItem(type);
        var item = new actionClass(this, type, data);

        this.actionsContainer.add(item.getLayout());
        this.actionsContainer.updateLayout();
    },

    getActionClassItem: function (type) {
        if (Object.keys(this.getActionClassNamespace()).indexOf(type) >= 0) {
            return this.getActionClassNamespace()[type];
        }

        return this.getDefaultActionClassItem();
    },

    getActionClassNamespace: function () {
        return coreshop.rules.actions;
    },

    getDefaultActionClassItem: function () {
        return coreshop.rules.actions.abstract;
    },

    getActionsData: function () {
        // get defined actions
        var actionData = [];
        var actions = this.actionsContainer.items.getRange();
        for (var i = 0; i < actions.length; i++) {
            var action = {};
            var configuration = {};

            var actionItem = actions[i];
            var actionClass = actionItem.xparent;

            if (Ext.isFunction(actionClass['getValues'])) {
                configuration = actionClass.getValues();
            } else {
                var form = actionClass.form;

                if (form) {
                    if (Ext.isFunction(form.getValues)) {
                        configuration = form.getValues();
                    }
                    else {
                        for (var c = 0; c < form.items.length; c++) {
                            var item = form.items.get(c);

                            try {
                                configuration[item.getName()] = item.getValue();
                            }
                            catch (e) {

                            }

                        }
                    }
                }
            }

            if (actionClass.data.id) {
                action['id'] = actionClass.data.id;
            }

            action['configuration'] = configuration;
            action['type'] = actions[i].xparent.type;
            actionData.push(action);

            if (Ext.isFunction(this.prepareAction)) {
                action = this.prepareAction(action);
            }
        }

        return actionData;
    },

    isDirty: function () {
        if (this.actionsContainer.items) {
            var actions = this.actionsContainer.items.getRange();
            for (var i = 0; i < actions.length; i++) {
                var actionsItem = actions[i];
                var actionsClass = actionsItem.xparent;

                if (Ext.isFunction(actionsClass['isDirty'])) {
                    if (actionsClass.isDirty()) {
                        return true;
                    }
                } else {
                    var form = actionsClass.form;

                    if (form) {
                        if (form.isDirty()) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.actions');
pimcore.registerNS('coreshop.rules.actions.abstract');

coreshop.rules.actions.abstract = Class.create(coreshop.rules.abstract, {
    elementType: 'action'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.conditions');
pimcore.registerNS('coreshop.rules.conditions.abstract');

coreshop.rules.conditions.abstract = Class.create(coreshop.rules.abstract, {
    elementType: 'condition',

    getFormattedStackClasses: function (stackClasses) {
        var classes = [];
        if (Ext.isArray(stackClasses)) {
            Ext.Array.each(stackClasses, function (cClass) {
                classes.push({classes: cClass});
            });
        }
        return classes;
    },

    getForm: function () {

        this.form = Ext.create('Ext.form.FieldContainer', {
            items: [
                {
                    xtype: 'displayfield',
                    submitValue: false,
                    value: t('coreshop_condition_no_configuration'),
                    cls: 'description',
                    anchor: '100%',
                    width: '100%',
                    style: 'font-style:italic;background:#f5f5f5;padding:0 10px;',
                    getValue: function () {
                        return undefined;
                    }
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.rules.conditions.nested');
coreshop.rules.conditions.nested = Class.create(coreshop.rules.conditions.abstract, {

    type: 'nested',

    operatorCombo: null,
    conditions: null,

    getForm: function () {
        var me = this;

        this.conditions = new this.parent.__proto__.constructor(this.parent.conditions);

        var layout = this.conditions.getLayout();

        // add saved conditions
        if (this.data && this.data.conditions) {
            Ext.each(this.data.conditions, function (condition) {
                this.conditions.addCondition(condition.type, condition);
            }.bind(this));
        }


        this.form = new Ext.form.Panel({
            items: [
                layout
            ]
        });

        return this.form;
    },

    getTopBarItems: function () {
        if (!this.operatorCombo) {
            this.operatorCombo = Ext.create(
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_condition_conditions_operator'),
                    name: 'operator',
                    width: 500,
                    store: [['and', t('coreshop_condition_conditions_operator_and')], ['or', t('coreshop_condition_conditions_operator_or')], ['not', t('coreshop_condition_conditions_operator_not')]],
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    value: this.data ? this.data.operator : 'and'
                }
            );
        }

        return ['-', this.operatorCombo];
    },

    getValues: function () {
        return {
            operator: this.operatorCombo.getValue(),
            conditions: this.conditions.getConditionsData()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.resource');
coreshop.order.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_cart_price_rules', 'coreshop/cart_price_rules');

        Ext.Ajax.request({
            url: '/admin/coreshop/order/get-states',
            success: function (response) {
                var res = Ext.decode(response.responseText);

                if (res.success) {
                    Ext.Object.each(res.states, function(identifier, states) {
                        pimcore.globalmanager.add('coreshop_states' + identifier.replace('coreshop', ''), new Ext.data.Store({
                            restful: false,
                            proxy: {
                                type: 'memory'
                            },
                            reader: {
                                type: 'json'
                            },
                            fields: [
                                 'color', 'label', 'state'
                            ],
                            data: states
                        }));
                    });
                    
                    Ext.Object.each(res.transitions, function(identifier, transitions) {
                        pimcore.globalmanager.add('coreshop_transitions' + identifier.replace('coreshop', ''), new Ext.data.Store({
                            restful: false,
                            proxy: {
                                type: 'memory'
                            },
                            reader: {
                                type: 'json'
                            },
                            fields: [
                                 'name', 'froms', 'tos'
                            ],
                            data: transitions
                        }));
                    });
                }
            }.bind(this)
        });

        coreshop.broker.fireEvent('resource.register', 'coreshop.order', this);
    },

    openResource: function (item) {
        if (item === 'orders') {
            this.openOrders();
        } else if (item === 'quotes') {
            this.openQuotes();
        }else if (item === 'create_order') {
            this.openCreateOrder();
        } else if (item === 'create_quote') {
            this.openCreateQuote();
        } else if (item === 'cart_price_rule') {
            this.openCartPriceRules();
        }
    },

    openOrders: function () {
        try {
            pimcore.globalmanager.get('coreshop_order').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_order', new coreshop.order.order.list());
        }
    },

    openCreateOrder: function () {
        new coreshop.order.order.create.panel();
    },

    openQuotes: function () {
        try {
            pimcore.globalmanager.get('coreshop_quote').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_quote', new coreshop.order.quote.list());
        }
    },

    openCreateQuote: function () {
        new coreshop.order.quote.create.panel();
    },

    openCartPriceRules: function () {
        try {
            pimcore.globalmanager.get('coreshop_price_rules_panel').activate();
        }
        catch (e) {
            //console.log(e);
            pimcore.globalmanager.add('coreshop_price_rules_panel', new coreshop.cart.pricerules.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.order.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.panel');

coreshop.cart.pricerules.panel = Class.create(coreshop.rules.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_price_rules_panel',
    storeId: 'coreshop_cart_price_rules',
    iconCls: 'coreshop_icon_price_rule',
    type: 'coreshop_cart_pricerules',

    url: {
        add: '/admin/coreshop/cart_price_rules/add',
        delete: '/admin/coreshop/cart_price_rules/delete',
        get: '/admin/coreshop/cart_price_rules/get',
        list: '/admin/coreshop/cart_price_rules/list',
        config: '/admin/coreshop/cart_price_rules/get-config'
    },

    getItemClass: function () {
        return coreshop.cart.pricerules.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.pricerules.item');
coreshop.cart.pricerules.item = Class.create(coreshop.rules.item, {

    iconCls: 'coreshop_icon_price_rule',

    url: {
        save: '/admin/coreshop/cart_price_rules/save'
    },

    getPanel: function () {
        this.panel = new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: this.getItems()
        });

        this.addVoucherCodes();

        return this.panel;
    },

    getActionContainerClass: function () {
        return coreshop.cart.pricerules.action;
    },

    getConditionContainerClass: function () {
        return coreshop.cart.pricerules.condition;
    },

    getSettings: function () {
        var data = this.data;

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: t('name'),
                width: 250,
                value: data.name
            }, {
                xtype: 'textarea',
                name: 'description',
                fieldLabel: t('description'),
                width: 400,
                height: 100,
                value: data.description
            }, {
                xtype: 'checkbox',
                name: 'active',
                fieldLabel: t('active'),
                checked: this.data.active
            }, {
                xtype: 'checkbox',
                name: 'isVoucherRule',
                fieldLabel: t('coreshop_is_voucher_rule'),
                checked: this.data.isVoucherRule,
                listeners: {
                    change: function(checkbox, newValue) {
                        if (newValue) {
                            this.getVoucherCodes().enable();
                        }
                        else {
                            this.getVoucherCodes().disable();
                        }
                    }.bind(this)
                }
            }]
        });

        return this.settingsForm;
    },

    addVoucherCodes: function () {
        this.panel.add(this.getVoucherCodes());
    },

    destroyVoucherCodes: function () {
        if (this.voucherCodesPanel) {
            this.getVoucherCodes().destroy();
            this.voucherCodesPanel = null;
        }
    },

    getVoucherCodes: function () {
        if (!this.voucherCodesPanel) {
            var store = new Ext.data.JsonStore({
                remoteSort: true,
                remoteFilter: true,
                autoDestroy: true,
                autoSync: true,
                pageSize: pimcore.helpers.grid.getDefaultPageSize(),
                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'total'
                    },
                    api: {
                        read: '/admin/coreshop/cart_price_rules/get-voucher-codes',
                        destroy: '/admin/coreshop/cart_price_rules/delete-voucher-code'
                    },
                    extraParams: {
                        cartPriceRule: this.data.id
                    }
                },
                fields: [
                    {name: 'id', type: 'int'},
                    {name: 'used', type: 'boolean'},
                    {name: 'uses', type: 'int'},
                    {name: 'code', type: 'string'}
                ]
            });

            var grid = new Ext.grid.Panel({
                store: store,
                plugins: {
                    ptype: 'pimcore.gridfilters',
                    pluginId: 'filter',
                    encode: true,
                    local: false
                },
                columns: [
                    {
                        text: t('coreshop_cart_pricerule_voucher_code'),
                        dataIndex: 'code',
                        flex: 1
                    },
                    {
                        text: t('ccoreshop_cart_pricerule_creation_date'),
                        dataIndex: 'creationDate',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('d.m.Y H:i')
                    },
                    {
                        xtype: 'booleancolumn',
                        text: t('coreshop_cart_pricerule_used'),
                        dataIndex: 'used',
                        flex: 1,
                        trueText: t('yes'),
                        falseText: t('no')
                    },
                    {
                        text: t('coreshop_cart_pricerule_uses'),
                        dataIndex: 'uses',
                        flex: 1
                    },
                    {
                        xtype: 'actioncolumn',
                        width: 40,
                        items: [{
                            isDisabled: function (grid, rowIndex, colIndex, items, record) {
                                return record.data.used === true;
                            },
                            tooltip: t('remove'),
                            iconCls: 'pimcore_icon_deletes',
                            handler: function (grid, rowIndex) {
                                var record = grid.getStore().getAt(rowIndex);
                                grid.getStore().removeAt(rowIndex);
                                console.log(record);
                            }.bind(this)
                        }]
                    }
                ],
                region: 'center',
                flex: 1,
                bbar: pimcore.helpers.grid.buildDefaultPagingToolbar(store)
            });

            grid.on('beforerender', function () {
                this.getStore().load();
            });

            this.voucherCodesPanel = new Ext.panel.Panel({
                iconCls: 'coreshop_price_rule_vouchers',
                title: t('coreshop_cart_pricerule_voucherCodes'),
                autoScroll: true,
                forceLayout: true,
                style: 'padding: 10px',
                layout: 'border',
                disabled: !this.data.isVoucherRule,
                items: [
                    grid
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: t('coreshop_cart_pricerule_create_voucher'),
                            handler: function () {
                                this.openVoucherCreateDialog();
                            }.bind(this)
                        },
                        {
                            xtype: 'button',
                            text: t('coreshop_cart_pricerule_generate_vouchers'),
                            handler: function () {
                                this.openVoucherGenerationDialog();
                            }.bind(this)
                        },
                        {
                            xtype: 'button',
                            text: t('coreshop_cart_pricerule_vouchers_export'),
                            handler: function () {
                                pimcore.helpers.download('/admin/coreshop/cart_price_rules/export-voucher-codes?cartPriceRule=' + this.data.id);
                            }.bind(this)
                        }
                    ]
                }]
            });

        }

        return this.voucherCodesPanel;
    },

    openVoucherCreateDialog: function () {
        var window = new Ext.Window({
            width: 330,
            height: 170,
            modal: true,
            iconCls: 'coreshop_price_rule_vouchers',
            title: t('coreshop_cart_pricerule_create_voucher'),
            layout: 'fit',
            items: [{
                xtype: 'form',
                region: 'center',
                bodyPadding: 20,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'code',
                        allowBlank: false,
                        fieldLabel: t('coreshop_cart_pricerule_voucher_code')
                    }
                ],
                buttons: [{
                    text: t('create'),
                    iconCls: 'pimcore_icon_apply',
                    handler: function (btn) {
                        btn.setDisabled(true);
                        var params = btn.up('form').getForm().getFieldValues();

                        params['cartPriceRule'] = this.data.id;

                        Ext.Ajax.request({
                            url: '/admin/coreshop/cart_price_rules/create-voucher-code',
                            method: 'post',
                            jsonData: params,
                            success: function (response) {
                                var res = Ext.decode(response.responseText);
                                if (res.success) {
                                    pimcore.helpers.showNotification(t('success'), t('success'), 'success');
                                    window.close();
                                    this.getVoucherCodes().down('grid').getStore().load();
                                } else {
                                    btn.setDisabled(false);
                                    pimcore.helpers.showNotification(t('error'), (res.message ? res.message : 'error'), 'error');
                                }
                            }.bind(this),
                            failure: function(response) {
                                btn.setDisabled(false);
                            }.bind(this)
                        });
                    }.bind(this)
                }]
            }]
        });

        window.show();
    },

    openVoucherGenerationDialog: function () {
        var window = new Ext.Window({
            width: 330,
            height: 420,
            modal: true,
            iconCls: 'coreshop_price_rule_vouchers',
            title: t('coreshop_cart_pricerule_generate_vouchers'),
            layout: 'fit',
            items: [{
                xtype: 'form',
                region: 'center',
                bodyPadding: 20,
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'amount',
                        fieldLabel: t('coreshop_cart_pricerule_amount')
                    },
                    {
                        xtype: 'numberfield',
                        name: 'length',
                        fieldLabel: t('coreshop_cart_pricerule_length')
                    },
                    {
                        xtype: 'combo',
                        store: [['alphanumeric', t('coreshop_cart_pricerule_alphanumeric')], ['alphabetic', t('coreshop_cart_pricerule_alphabetic')], ['numeric', t('coreshop_cart_pricerule_numeric')]],
                        triggerAction: 'all',
                        typeAhead: false,
                        editable: false,
                        forceSelection: true,
                        queryMode: 'local',
                        fieldLabel: t('coreshop_cart_pricerule_format'),
                        name: 'format',
                        value: 'alphanumeric'
                    },
                    {
                        xtype: 'textfield',
                        name: 'prefix',
                        fieldLabel: t('coreshop_cart_pricerule_prefix')
                    },
                    {
                        xtype: 'textfield',
                        name: 'suffix',
                        fieldLabel: t('coreshop_cart_pricerule_suffix')
                    },
                    {
                        xtype: 'numberfield',
                        name: 'hyphensOn',
                        fieldLabel: t('coreshop_cart_pricerule_hyphensOn')
                    }
                ],
                buttons: [{
                    text: t('create'),
                    iconCls: 'pimcore_icon_apply',
                    handler: function (btn) {
                        btn.setDisabled(true);
                        var params = btn.up('form').getForm().getFieldValues();

                        params['cartPriceRule'] = this.data.id;

                        Ext.Ajax.request({
                            url: '/admin/coreshop/cart_price_rules/generate-voucher-codes',
                            method: 'post',
                            jsonData: params,
                            success: function (response) {
                                var res = Ext.decode(response.responseText);
                                if (res.success) {
                                    pimcore.helpers.showNotification(t('success'), t('success'), 'success');
                                    window.close();
                                    this.getVoucherCodes().down('grid').getStore().load();
                                } else {
                                    btn.setDisabled(false);
                                    pimcore.helpers.showNotification(t('error'), 'error', 'error');
                                }
                            }.bind(this),
                            failure: function(response) {
                                btn.setDisabled(false);
                            }.bind(this)
                        });
                    }.bind(this)
                }]
            }]
        });

        window.show();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.action');
coreshop.cart.pricerules.action = Class.create(coreshop.rules.action, {
    getActionClassNamespace: function () {
        return coreshop.cart.pricerules.actions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.condition');
coreshop.cart.pricerules.condition = Class.create(coreshop.rules.condition, {
    getConditionClassNamespace: function () {
        return coreshop.cart.pricerules.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.actions.discountAmount');
coreshop.cart.pricerules.actions.discountAmount = Class.create(coreshop.rules.actions.abstract, {

    type: 'discountAmount',

    getForm: function () {
        var amountValue = 0;
        var currency = null;
        var grossValue = false;
        var applyOnValue = 'total';

        if (this.data) {
            amountValue = this.data.amount / 100;
            currency = this.data.currency;
            grossValue = this.data.gross;
            applyOnValue = this.data.applyOn;
        }

        var amount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discount_amount_amount'),
            name: 'amount',
            value: amountValue,
            decimalPrecision: 2
        });

        var applyOn = new Ext.form.ComboBox({
            store: [['total', t('coreshop_action_discount_apply_on_total')], ['subtotal', t('coreshop_action_discount_apply_on_subtotal')]],
            triggerAction: 'all',
            typeAhead: false,
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            fieldLabel: t('coreshop_action_discount_apply_on'),
            name: 'applyOn',
            value: applyOnValue
        });

        var gross = new Ext.form.Checkbox({
            fieldLabel: t('coreshop_action_discountAmount_gross'),
            name: 'gross',
            value: grossValue
        });

        this.form = new Ext.form.Panel({
            items: [
                amount,
                gross,
                applyOn,
                {
                    xtype: 'coreshop.currency',
                    value: currency
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.actions.discountPercent');
coreshop.cart.pricerules.actions.discountPercent = Class.create(coreshop.rules.actions.abstract, {

    type: 'discountPercent',

    getForm: function () {
        var percentValue = 0;
        var applyOnValue = 'total';
        var me = this;

        if (this.data) {
            percentValue = this.data.percent;
        }

        var percent = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discount_percent_percent'),
            name: 'percent',
            value: percentValue,
            minValue: 0,
            maxValue: 100,
            decimalPrecision: 0
        });

        var applyOn = new Ext.form.ComboBox({
            store: [['total', t('coreshop_action_discount_apply_on_total')], ['subtotal', t('coreshop_action_discount_apply_on_subtotal')]],
            triggerAction: 'all',
            typeAhead: false,
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            fieldLabel: t('coreshop_action_discount_apply_on'),
            name: 'applyOn',
            value: applyOnValue
        });

        this.form = new Ext.form.Panel({
            items: [
                percent,
                applyOn
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.amount');
coreshop.cart.pricerules.conditions.amount = Class.create(coreshop.rules.conditions.abstract, {

    type: 'amount',

    getForm: function () {
        var minAmountValue = 0;
        var maxAmountValue = 0;
        var me = this;

        if (this.data && this.data.minAmount) {
            minAmountValue = this.data.minAmount / 100;
        }

        if (this.data && this.data.maxAmount) {
            maxAmountValue = this.data.maxAmount / 100;
        }

        var minAmount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_amount_minAmount'),
            name: 'minAmount',
            value: minAmountValue,
            minValue: 0,
            decimalPrecision: 2
        });

        var maxAmount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_amount_maxAmount'),
            name: 'maxAmount',
            value: maxAmountValue,
            minValue: 0,
            decimalPrecision: 2
        });

        this.form = Ext.create('Ext.form.Panel', {
            items: [
                minAmount, maxAmount
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.nested');
coreshop.cart.pricerules.conditions.nested = Class.create(coreshop.rules.conditions.nested, {

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.timespan');
coreshop.cart.pricerules.conditions.timespan = Class.create(coreshop.rules.conditions.abstract, {
    type: 'timespan',

    getForm: function () {
        var me = this;

        var dateFrom = {
            itemCls: 'object_field',
            width: 160,
            value: new Date()
        };

        var dateTo = {
            itemCls: 'object_field',
            width: 160,
            value: new Date()
        };

        var timeFrom = {
            format: 'H:i',
            emptyText: '',
            width: 120,
            value: Ext.Date.format(new Date(), 'H:i')
        };

        var timeTo = {
            format: 'H:i',
            emptyText: '',
            width: 120,
            value: Ext.Date.format(new Date(), 'H:i')
        };

        if (this.data) {
            if (this.data.dateFrom) {
                var tmpDateFrom = new Date(intval(this.data.dateFrom));
                dateFrom.value = tmpDateFrom;
                timeFrom.value = Ext.Date.format(tmpDateFrom, 'H:i');
            }

            if (this.data.dateTo) {
                var tmpDateTo = new Date(intval(this.data.dateTo));
                dateTo.value = tmpDateTo;
                timeTo.value = Ext.Date.format(tmpDateTo, 'H:i');
            }
        }

        this.dateFromField = new Ext.form.DateField(dateFrom);
        this.timeFromField = new Ext.form.TimeField(timeFrom);

        this.dateToField = new Ext.form.DateField(dateTo);
        this.timeToField = new Ext.form.TimeField(timeTo);

        this.dateFromFieldContainer = new Ext.form.FieldContainer({
            xtype: 'fieldcontainer',
            fieldLabel: t('coreshop_condition_timespan_dateFrom'),
            combineErrors: true,
            layout: 'hbox',
            items: [this.dateFromField, this.timeFromField],
            itemCls: 'object_field',
            name: 'dateFrom',
            getValue: function () {
                if (me.dateFromField.getValue()) {
                    var date = new Date(me.dateFromField.getValue());
                    var dateString = Ext.Date.format(date, 'Y-m-d');

                    if (me.timeFromField.getValue()) {
                        dateString += ' ' + Ext.Date.format(new Date(me.timeFromField.getValue()), 'H:i');
                    } else {
                        dateString += ' 00:00';
                    }

                    return Ext.Date.parseDate(dateString, 'Y-m-d H:i').getTime();
                }
            }.bind(this),
            getName: function () {
                return 'dateFrom';
            }
        });

        this.dateToFieldContainer = new Ext.form.FieldContainer({
            xtype: 'fieldcontainer',
            fieldLabel: t('coreshop_condition_timespan_dateTo'),
            combineErrors: true,
            layout: 'hbox',
            items: [this.dateToField, this.timeToField],
            itemCls: 'object_field',
            name: 'dateTo',
            getValue: function () {
                if (me.dateToField.getValue()) {
                    var date = new Date(me.dateToField.getValue());
                    var dateString = Ext.Date.format(date, 'Y-m-d');

                    if (me.timeToField.getValue()) {
                        dateString += ' ' + Ext.Date.format(new Date(me.timeToField.getValue()), 'H:i');
                    } else {
                        dateString += ' 00:00';
                    }

                    return Ext.Date.parseDate(dateString, 'Y-m-d H:i').getTime();
                }
            }.bind(this),
            getName: function () {
                return 'dateTo';
            }
        });

        this.form = new Ext.form.Panel({
            items: [
                this.dateFromFieldContainer, this.dateToFieldContainer
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            dateTo: this.dateToFieldContainer.getValue(),
            dateFrom: this.dateFromFieldContainer.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.voucher');
coreshop.cart.pricerules.conditions.voucher = Class.create(coreshop.rules.conditions.abstract, {
    type: 'voucher',

    getForm: function () {

        this.form = new Ext.form.Panel({
            items: [{
                fieldLabel: t('coreshop_action_voucher_max_usage_per_code'),
                xtype: 'numberfield',
                name: 'maxUsagePerCode',
                value: this.data.maxUsagePerCode
            },
            {
                fieldLabel: t('coreshop_action_voucher_only_one_per_cart'),
                xtype: 'checkbox',
                name: 'onlyOnePerCart',
                value: this.data.onlyOnePerCart
            }]
        });

        return this.form;
    },

    getValues: function () {
        return this.form.getForm().getValues();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.panel');
coreshop.order.sale.detail.panel = Class.create({
    modules: {},
    eventManager: null,
    blocks: {},

    sale: null,
    objectData: null,
    layoutId: null,
    type: 'sale',
    iconCls: '',

    borderStyle: {
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: '5px',
        borderWidth: '1px'
    },

    initialize: function (sale) {
        var me = this;

        me.blocks = {};
        me.modules = {};
        me.eventManager = new CoreShop.resource.EventManager();
        me.sale = sale;
        me.layoutId = 'coreshop_' + this.type + '_' + this.sale.o_id;
        me.iconCls = 'coreshop_icon_' + this.type;
        me.getLayout();
    },

    activate: function () {
        var tabPanel = Ext.getCmp('pimcore_panel_tabs');
        tabPanel.setActiveItem(this.layoutId);
    },

    reload: function () {
        var me = this;

        me.layout.setLoading(t('loading'));

        Ext.Ajax.request({
            url: '/admin/coreshop/'+me.type+'/detail',
            params: {
                id: me.sale.o_id
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);

                if (res.success) {
                    me.updateSale(res.sale);
                } else {
                    Ext.Msg.alert(t('open_target'), t('problem_opening_new_target'));
                }

                me.layout.setLoading(false);
            }.bind(this)
        });
    },

    updateSale: function(sale) {
        var me = this;

        me.sale = sale;
        Ext.Object.each(me.blocks, function(id, block) {
            block.setSale(sale);
        });
    },

    getTopButtons: function () {
        var me = this,
            buttons = [];

        Ext.Object.each(me.blocks, function(id, block) {
            buttons.push.apply(buttons, block.getTopBarItems());
        });

        return buttons;
    },

    getLayout: function () {
        if (!this.layout) {

            var buttons = [{
                iconCls: 'pimcore_icon_reload',
                text: t('reload'),
                handler: function () {
                    this.reload();
                }.bind(this)
            }];
            var items = this.getItems();
            buttons = buttons.concat(this.getTopButtons());

            // create new panel
            this.layout = new Ext.panel.Panel({
                id: this.layoutId,
                title: t('coreshop_' + this.type) + ': ' + this.sale.saleNumber,
                iconCls: this.iconCls,
                border: false,
                layout: 'border',
                scrollable: 'y',
                closable: true,
                items: items,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: buttons
                }]
            });

            // add event listener
            this.layout.on('destroy', function () {
                pimcore.globalmanager.remove(this.layoutId);
            }.bind(this));

            // add panel to pimcore panel tabs
            var tabPanel = Ext.getCmp('pimcore_panel_tabs');
            tabPanel.add(this.layout);
            tabPanel.setActiveItem(this.layoutId);

            // update layout
            pimcore.layout.refresh();
        }

        return this.layout;
    },

    getItems: function () {
        return [this.getPanel()];
    },

    getBlockIdentifier: function () {
        return coreshop.order.sale.detail.blocks;
    },

    getPanel: function () {
        var me = this,
            defaults = {
                style: this.borderStyle,
                cls: 'coreshop-panel',
                bodyPadding: 5
            },
            blockIdentifier = me.getBlockIdentifier(),
            blockKeys = Object.keys(blockIdentifier),
            blocks = [],
            leftItems = [],
            topItems = [],
            rightItems = [],
            bottomItems = [];

        blockKeys.forEach(function (blockName) {
            var block = new blockIdentifier[blockName](me, me.eventManager);

            blocks.push(block);
            me.blocks[blockName] = block;
        });

        blocks = blocks.sort(function (blockA, blockB) {
            var blockAPriority = blockA.getPriority();
            var blockBPriority = blockB.getPriority();

            if (blockAPriority > blockBPriority) {
                return 1;
            }
            if (blockAPriority < blockBPriority) {
                return -1;
            }

            return 0;
        });

        blocks.forEach(function (block) {
            var position = block.getPosition();
            var layout = block.getLayout();

            if (layout === false || layout === null) {
                return false;
            }

            switch (position) {
                case 'top':
                    layout.setMargin('0 0 20 0');
                    topItems.push(layout);
                    break;
                case 'left':
                    layout.setMargin('0 20 20 0');
                    leftItems.push(layout);
                    break;
                case 'bottom':
                    layout.setMargin('0 0 20 0');
                    bottomItems.push(layout);
                    break;
                case 'right':
                    layout.setMargin('0 0 20 0');
                    rightItems.push(layout);
                    break;
            }
        });

        var contentItems = [
            {
                xtype: 'container',
                border: 0,
                style: {
                    border: 0
                },
                flex: 7,
                defaults: defaults,
                items: leftItems
            },
            {
                xtype: 'container',
                border: 0,
                style: {
                    border: 0
                },
                flex: 5,
                defaults: defaults,
                items: rightItems
            }
        ];
        topItems.push(
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 20 0',
                border: 0,
                style: {
                    border: 0
                },
                items: contentItems
            }
        );

        topItems.push.apply(topItems, bottomItems);

        this.panel = Ext.create('Ext.container.Container', {
            border: false,
            items: topItems,
            padding: 20,
            region: 'center',
            defaults: defaults
        });

        return this.panel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks');
pimcore.registerNS('coreshop.order.sale.detail.abstractBlock');
coreshop.order.sale.detail.abstractBlock = Class.create({
    eventManager: null,
    panel: null,
    sale: null,

    initialize: function (panel, eventManager) {
        var me = this;

        me.panel = panel;
        me.eventManager = eventManager;

        if (Ext.isFunction(me.initBlock)) {
            me.initBlock();
        }

        me.setSale(panel.sale);
    },

    setSale: function(sale) {
        var me = this;

        me.sale = sale;

        me.updateSale();
    },

    updateSale: function() {

    },

    getPriority: function () {
        Ext.Error.raise('implement me');
    },

    getPanel: function () {
        Ext.Error.raise('implement me');
    },

    getTopBarItems: function() {
        return [];
    },

    getLayout: function () {
        var me = this;

        return me.getPanel();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.header');
coreshop.order.sale.detail.blocks.header = Class.create(coreshop.order.sale.detail.abstractBlock, {
    datePanel: null,
    totalPanel: null,
    productPanel: null,
    storePanel: null,

    initBlock: function () {
        var me = this;

        me.datePanel = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });
        me.totalPanel = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });
        me.productPanel = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });
        me.storePanel = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });
    },

    getPriority: function () {
        return 10;
    },

    getPosition: function () {
        return 'top';
    },

    getPanel: function () {
        var me = this,
            items = [
                me.datePanel,
                me.totalPanel,
                me.productPanel,
                me.storePanel
            ];

        me.headerPanel = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            margin: 0,
            items: items
        });

        return me.headerPanel;
    },

    updateSale: function () {
        var me = this;

        me.datePanel.setHtml(t('coreshop_date') + '<br/><span class="coreshop_order_big">' + Ext.Date.format(new Date(me.sale.saleDate * 1000), t('coreshop_date_time_format')) + '</span>');
        me.totalPanel.setHtml(t('coreshop_sale_total') + '<br/><span class="coreshop_order_big">' + coreshop.util.format.currency(me.sale.currency.symbol, me.sale.totalGross) + '</span>');
        me.productPanel.setHtml(t('coreshop_product_count') + '<br/><span class="coreshop_order_big">' + me.sale.items.length + '</span>');
        me.storePanel.setHtml(t('coreshop_store') + '<br/><span class="coreshop_order_big">' + me.sale.store.name + '</span>');
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.info');
coreshop.order.sale.detail.blocks.info = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.saleInfo = Ext.create('Ext.panel.Panel', {
            margin: '0 20 20 0',
            border: true,
            flex: 8,
            iconCls: this.iconCls,
            tools: [
                {
                    type: 'coreshop-open',
                    tooltip: t('open'),
                    handler: function () {
                        pimcore.helpers.openObject(me.sale.o_id);
                    }
                }
            ]
        });
    },

    getPriority: function () {
        return 10;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.saleInfo;
    },

    updateSale: function () {
        var me = this;

        me.saleInfo.setTitle(t('coreshop_' + me.panel.type) + ': ' + this.sale.saleNumber + ' (' + this.sale.o_id + ')');
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.correspondence');
coreshop.order.sale.detail.blocks.correspondence = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.mailCorrespondenceStore = new Ext.data.JsonStore({
            data: []
        });

        me.mailCorrespondence = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_mail_correspondence'),
            border: true,
            scrollable: 'y',
            maxHeight: 360,
            margin: '0 20 20 0',
            iconCls: 'coreshop_icon_mail',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 15 0',
                    cls: 'coreshop-detail-grid',
                    store: this.mailCorrespondenceStore,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'date',
                            text: t('coreshop_date'),
                            renderer: function (val) {
                                if (val) {
                                    return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                                }
                                return '';
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'subject',
                            text: t('coreshop_mail_correspondence_subject'),
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'recipient',
                            text: t('coreshop_mail_correspondence_recipient'),
                            flex: 2
                        },
                        {
                            xtype: 'actioncolumn',
                            sortable: false,
                            width: 50,
                            dataIndex: 'emailLogExistsHtml',
                            header: t('coreshop_mail_correspondence_mail_log'),
                            items: [{
                                tooltip: t('coreshop_mail_correspondence_mail_log_show'),
                                handler: function (grid, rowIndex) {
                                    var rec = grid.getStore().getAt(rowIndex),
                                        iFrameSettings = {width: 700, height: 500},
                                        iFrame = new Ext.Window(
                                            {
                                                title: t('coreshop_mail_correspondence_mail_log'),
                                                width: iFrameSettings.width,
                                                height: iFrameSettings.height,
                                                layout: 'fit',
                                                modal: true,
                                                items: [
                                                    {
                                                        xtype: 'box',
                                                        autoEl: {
                                                            tag: 'iframe',
                                                            src: '/admin/email/show-email-log?id=' + rec.get('email-log') + '&type=html'
                                                        }
                                                    }
                                                ]
                                            }
                                        );
                                    iFrame.show();
                                },
                                getClass: function (v, meta, rec) {
                                    if (!Ext.isDefined(rec.get('email-log')) || rec.get('email-log') === null) {
                                        return 'pimcore_hidden';
                                    }

                                    return 'pimcore_icon_newsletter';
                                }
                            }]
                        },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            items: [{
                                iconCls: 'pimcore_icon_open',
                                tooltip: t('open'),
                                handler: function (grid, rowIndex) {
                                    var record = grid.getStore().getAt(rowIndex);
                                    pimcore.helpers.openDocument(record.get('document'), 'email');
                                }
                            }]
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 50,
                            sortable: false,
                            items: [{
                                tooltip: t('open'),
                                handler: function (grid, rowIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    var threadId = rec.get('threadId');

                                    if (threadId) {
                                        coreshop.helpers.openMessagingThread(threadId);
                                    }

                                },
                                getClass: function (v, meta, rec) {
                                    if (!Ext.isDefined(rec.get('threadId')) || rec.get('threadId') === null) {
                                        return 'pimcore_hidden';
                                    }

                                    return 'coreshop_icon_messaging_thread';
                                }
                            }]
                        }
                    ]
                }
            ]
        });
    },

    getPriority: function () {
        return 100;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.mailCorrespondence;
    },

    updateSale: function () {
        var me = this;

        me.mailCorrespondenceStore.loadRawData(me.sale.mailCorrespondence);
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.customer');
coreshop.order.sale.detail.blocks.customer = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.customerInfo = Ext.create('Ext.panel.Panel', {
            border: true,
            flex: 6,
            iconCls: 'coreshop_icon_customer',
            tools: [
                {
                    type: 'coreshop-open',
                    tooltip: t('open'),
                    handler: function () {
                        if (me.sale.customer) {
                            pimcore.helpers.openObject(me.sale.customer.o_id);
                        }
                    }.bind(this)
                }
            ]
        });
    },

    getPriority: function () {
        return 10;
    },

    getPosition: function () {
        return 'right';
    },

    getPanel: function () {
        return this.customerInfo;
    },

    updateSale: function () {
        var me = this;

        var guestStr = me.sale.customer.isGuest ? ' –  ' + t('coreshop_is_guest') : '';
        me.customerInfo.setTitle(t('coreshop_customer') + ': ' + (me.sale.customer ? me.sale.customer.firstname + ' (' + me.sale.customer.o_id + ')' : t('unknown')) + guestStr);
        me.customerInfo.removeAll();

        var items = [];

        if (me.sale.customer) {
            if (!me.sale.customer.isGuest) {

                items.push({
                    xtype: 'panel',
                    bodyPadding: 10,
                    margin: '0 0 10px 0',
                    style: {
                        borderStyle: 'solid',
                        borderColor: '#ccc',
                        borderRadius: '5px',
                        borderWidth: '1px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            style: 'font-weight:bold;display:block',
                            text: t('email')
                        },
                        {
                            xtype: 'label',
                            style: 'display:block',
                            text: me.sale.customer.email
                        },
                        {
                            xtype: 'label',
                            style: 'font-weight:bold;display:block',
                            text: t('coreshop_customer_created')
                        },
                        {
                            xtype: 'label',
                            style: 'display:block',
                            text: Ext.Date.format(new Date(me.sale.customer.o_creationDate * 1000), t('coreshop_date_time_format'))
                        }
                    ]
                });
            }
        }

        if (me.sale.comment) {
            items.push({
                xtype: 'panel',
                bodyPadding: 10,
                margin: '0 0 10px 0',
                style: {
                    borderStyle: 'solid',
                    borderColor: '#ccc',
                    borderRadius: '5px',
                    borderWidth: '1px'
                },
                items: [
                    {
                        xtype: 'label',
                        style: 'font-weight:bold;display:block',
                        text: t('coreshop_comment')
                    },
                    {
                        xtype: 'label',
                        style: 'display:block',
                        html: Ext.util.Format.nl2br(me.sale.comment)
                    }
                ]
            });
        }

        items.push({
            xtype: 'tabpanel',
            items: [
                me.getAddressPanelForAddress(me.sale.address.shipping, t('coreshop_address_shipping'), 'shipping'),
                me.getAddressPanelForAddress(me.sale.address.billing, t('coreshop_address_invoice'), 'invoice')
            ]
        });

        me.customerInfo.add(items);
    },

    getAddressPanelForAddress: function (address, title, type) {
        var me = this,
            country = pimcore.globalmanager.get("coreshop_countries").getById(address.country);

        var panel = {
            xtype: 'panel',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    '->',
                    {
                        iconCls: 'coreshop_icon_open',
                        text: t('open'),
                        handler: function () {
                            pimcore.helpers.openObject(address.o_id);
                        }
                    }
                ]
            }],
            title: title,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height: 220,
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 5,
                    html: address.formatted,
                    flex: 1
                }
            ]
        };

        if (pimcore.settings.google_maps_api_key) {
            panel.items.push({
                xtype: 'panel',
                html: '<img src="https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&maptype=roadmap'
                + '&center=' + address.street + '+' + address.nr + '+' + address.zip + '+' + address.city + '+' + country.get("name")
                + '&markers=color:blue|' + address.street + '+' + address.nr + '+' + address.zip + '+' + address.city + '+' + country.get("name")
                + '&key=' + pimcore.settings.google_maps_api_key
                + '" />',
                flex: 1,
                bodyPadding: 5
            });
        }

        return panel;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.detail');
coreshop.order.sale.detail.blocks.detail = Class.create(coreshop.order.sale.detail.abstractBlock, {

    initBlock: function () {
        var me = this;

        me.detailsStore = new Ext.data.JsonStore({
            data: []
        });

        me.summaryStore = new Ext.data.JsonStore({
            data: []
        });

        me.detailsInfo = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_products'),
            border: true,
            margin: '0 0 20 0',
            iconCls: 'coreshop_icon_product',
        });
    },

    getPriority: function () {
        return 10;
    },

    getPosition: function () {
        return 'bottom';
    },

    getPanel: function () {
        return this.detailsInfo;
    },

    updateSale: function () {
        var me = this;

        me.detailsStore.loadRawData(me.sale.details);
        me.summaryStore.loadRawData(me.sale.summary);

        me.detailsInfo.removeAll();

        var actions = [
            {
                iconCls: 'pimcore_icon_open',
                tooltip: t('open'),
                handler: function (grid, rowIndex) {
                    var record = grid.getStore().getAt(rowIndex);

                    pimcore.helpers.openObject(record.get('o_id'));
                }
            }
        ];

        var itemsGrid = {
            xtype: 'grid',
            margin: '0 0 15 0',
            cls: 'coreshop-detail-grid',
            store: me.detailsStore,
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'product_name',
                    text: t('coreshop_product')
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'wholesale_price',
                    text: t('coreshop_wholesale_price'),
                    width: 150,
                    align: 'right',
                    renderer: coreshop.util.format.currency.bind(me, me.sale.currency.symbol)
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'price_without_tax',
                    text: t('coreshop_price_without_tax'),
                    width: 150,
                    align: 'right',
                    renderer: coreshop.util.format.currency.bind(me, me.sale.currency.symbol),
                    field: {
                        xtype: 'numberfield',
                        decimalPrecision: 4
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'price',
                    text: t('coreshop_price_with_tax'),
                    width: 150,
                    align: 'right',
                    renderer: coreshop.util.format.currency.bind(me, me.sale.currency.symbol)
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'quantity',
                    text: t('coreshop_quantity'),
                    width: 150,
                    align: 'right',
                    field: {
                        xtype: 'numberfield',
                        decimalPrecision: 0
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total',
                    text: t('coreshop_total'),
                    width: 150,
                    align: 'right',
                    renderer: coreshop.util.format.currency.bind(me, me.sale.currency.symbol)
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 50,
                    items: actions
                }
            ]
        };

        var summaryGrid = {
            xtype: 'grid',
            margin: '0 0 15 0',
            cls: 'coreshop-detail-grid',
            store: me.summaryStore,
            hideHeaders: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    align: 'right',
                    dataIndex: 'key',
                    renderer: function (value, metaData, record) {
                        if (record.get("text")) {
                            return '<span style="font-weight:bold">' + record.get("text") + '</span>';
                        }

                        return '<span style="font-weight:bold">' + t('coreshop_' + value) + '</span>';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'value',
                    width: 150,
                    align: 'right',
                    renderer: function (value, metaData, record) {
                        return '<span style="font-weight:bold">' + coreshop.util.format.currency(me.sale.currency.symbol, value) + '</span>';
                    }
                }
            ]
        };

        var detailItems = [itemsGrid, summaryGrid];

        if (me.sale.priceRule) {
            var priceRuleStore = new Ext.data.JsonStore({
                data: me.sale.priceRule
            });

            var priceRuleItem = {
                xtype: 'grid',
                margin: '0 0 15 0',
                cls: 'coreshop-detail-grid',
                store: priceRuleStore,
                hideHeaders: true,
                title: t('coreshop_pricerules'),
                columns: [
                    {
                        xtype: 'gridcolumn',
                        flex: 1,
                        align: 'right',
                        dataIndex: 'name'
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'discount',
                        width: 150,
                        align: 'right',
                        renderer: function (value, metaData, record) {
                            return '<span style="font-weight:bold">' + coreshop.util.format.currency(me.sale.currency.symbol, value) + '</span>';
                        }
                    }
                ]
            };

            detailItems.splice(1, 0, priceRuleItem);
        }

        me.detailsInfo.add(detailItems);
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.list');
coreshop.order.sale.list = Class.create({

    type: '',
    search: null,
    grid: null,
    gridPaginator: null,
    gridConfig: {},
    store: null,
    contextMenuPlugin: null,
    columns: [],
    storeFields: [],

    initialize: function () {
        Ext.Ajax.request({
            url: '/admin/coreshop/' + this.type + '/get-folder-configuration',
            ignoreErrors: true,
            success: function (response) {
                var data = Ext.decode(response.responseText);
                this.gridConfig = data;
                this.setClassFolder()
            }.bind(this)
        });
    },

    activate: function () {
        var tabPanel = Ext.getCmp('pimcore_panel_tabs');
        tabPanel.setActiveItem('coreshop_' + this.type);
    },

    setupContextMenuPlugin: function () {
        throw new Error('Please implement me');
    },

    setClassFolder: function () {
        Ext.Ajax.request({
            url: '/admin/object/get-folder',
            params: {id: this.gridConfig.folderId},
            ignoreErrors: true,
            success: function (response) {
                var data = Ext.decode(response.responseText);

                // unlock order overview silently
                // since multiple user may want to have access to it at the same time
                if (typeof data.editlock === 'object') {
                    Ext.Ajax.request({
                        url: '/admin/element/unlock-element',
                        method: 'PUT',
                        params: {
                            id: data.editlock.cid,
                            type: 'object'
                        },
                        success: function () {
                            this.setClassFolder();
                        }.bind(this)
                    });
                } else {
                    this.prepareLayout(data);
                }
            }.bind(this)
        });
    },

    prepareLayout: function (data) {

        var folderClass = [];

        Ext.Array.each(data.classes, function (objectClass) {
            if (objectClass.name === this.gridConfig.className) {
                folderClass.push(objectClass);
            }
        }.bind(this));

        data.classes = folderClass;
        this.search = new pimcore.object.search({data: data, id: this.gridConfig.folderId}, 'folder');
        this.getLayout();
    },

    prepareConfig: function (columnConfig) {
        var me = this,
            gridColumns = [],
            storeModelFields = [];

        Ext.each(columnConfig, function (column) {
            var newColumn = column;
            var storeModelField = {
                name: column.dataIndex,
                type: column.type
            };

            newColumn.id = me.type + '_' + newColumn.dataIndex;
            newColumn.text = newColumn.text.split('|').map(function (string) {
                //text like [foo bar] won't be translated. just remove brackets.
                return string.match(/\[([^)]+)]/) ? string.replace(/\[|]/gi, '') : t(string);
            }).join(' ');

            if (newColumn.hasOwnProperty('renderAs')) {
                if (Ext.isFunction(this[newColumn.renderAs + 'Renderer'])) {
                    newColumn.renderer = this[newColumn.renderAs + 'Renderer'];
                }
            }

            if (newColumn.type === 'date') {
                newColumn.xtype = 'datecolumn';
                newColumn.format = t('coreshop_date_time_format');

                storeModelField.dateFormat = 'timestamp';
            }

            if (newColumn.type === 'integer' || newColumn.type === 'float') {
                newColumn.xtype = 'numbercolumn';
            }

            storeModelFields.push(storeModelField);
            gridColumns.push(newColumn);
        }.bind(this));

        this.columns = gridColumns;
        this.storeFields = storeModelFields;
    },

    getLayout: function () {
        if (!this.layout) {

            // create new panel
            this.layout = new Ext.Panel({
                id: 'coreshop_' + this.type,
                title: t('coreshop_' + this.type),
                iconCls: 'coreshop_icon_' + this.type + 's',
                border: false,
                layout: 'border',
                closable: true,
                items: this.getItems(),
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            iconCls: 'coreshop_icon_' + this.type + '_create',
                            text: t('coreshop_' + this.type + '_create'),
                            handler: function () {
                                new coreshop.order[this.type].create.panel();
                            }.bind(this)
                        },
                        this.getQuickOrder()
                    ]
                }]
            });

            // add event listener
            this.layout.on('destroy', function () {
                pimcore.globalmanager.remove('coreshop_' + this.type);
            }.bind(this));

            // add panel to pimcore panel tabs
            var tabPanel = Ext.getCmp('pimcore_panel_tabs');
            tabPanel.add(this.layout);
            tabPanel.setActiveItem('coreshop_' + this.type);

            // update layout
            pimcore.layout.refresh();
        }

        return this.layout;
    },

    getItems: function () {
        return [this.getGrid()];
    },

    getQuickOrder: function () {

        var fieldSettings = {
            enableKeyEvents: false,
            fieldCls: 'input_drop_target',
            style: 'background-color:white;',
            readOnly: true,
            emptyText: t('coreshop_' + this.type + '_quick_open'),
            width: 300
        }, drag = new Ext.form.TextField(fieldSettings);

        drag.on('render', function (el) {

            new Ext.dd.DropZone(el.getEl(), {
                reference: drag,
                ddGroup: 'element',
                getTargetFromEvent: function (e) {
                    return this.reference.getEl();
                },

                onNodeOver: function (target, dd, e, data) {

                    var record = data.records[0],
                        data = record.data;

                    if (data.className == coreshop.class_map.coreshop[this.type]) {
                        return Ext.dd.DropZone.prototype.dropAllowed;
                    } else {
                        return Ext.dd.DropZone.prototype.dropNotAllowed;
                    }

                }.bind(this),

                onNodeDrop: function (target, dd, e, data) {
                    var record = data.records[0],
                        data = record.data,
                        view = this.search.getLayout();

                    if (data.className == coreshop.class_map.coreshop[this.type]) {
                        drag.setDisabled(true);
                        view.setLoading(t('loading'));
                        this.open(data.id, function () {
                            view.setLoading(false);
                            drag.setDisabled(false);
                        });
                        return true;
                    } else {
                        return false;
                    }
                }.bind(this)
            });

        }.bind(this));

        return drag;

    },

    getGrid: function () {

        this.tabbar = new Ext.TabPanel({
            tabPosition: 'top',
            region: 'center',
            deferredRender: true,
            enableTabScroll: true,
            border: false,
            activeTab: 0,
            listeners: {
                afterLayout: function () {
                    this.setActiveTab(0);
                }
            }
        });

        var searchLayout = this.search.getLayout();

        if (searchLayout) {
            searchLayout.on('afterrender', function (layout) {

                layout.setTitle(t('coreshop_' + this.type + '_manage'));
                layout.setIconCls('coreshop_icon_' + this.type);

                searchLayout.onBefore('add', function (item) {
                    var gridQuery = item.query('grid');
                    if (gridQuery.length > 0) {
                        this.setGridPaginator(layout);
                        this.setupContextMenuPlugin();
                        this.enhanceGridLayout(gridQuery[0]);
                    }
                }.bind(this));

            }.bind(this));

            this.tabbar.add(searchLayout);

        }

        return this.tabbar;
    },

    enhanceGridLayout(grid) {

        var toolbar;

        grid.on('beforeedit', function (grid, cell) {
            if (cell.column.hasEditor() === false) {
                return false;
            }
        });

        grid.on('celldblclick', function (view, td, cellIndex, record, tr, rowIndex) {

            if (!view.panel) {
                return;
            }

            var column = view.panel.columns[cellIndex - 1];
            if (column && column.hasEditor() === false) {
                view.setLoading(t('loading'));
                data = grid.getStore().getAt(rowIndex);
                this.open(data.id, function () {
                    view.setLoading(false);
                });
                return false;
            }
        }.bind(this));

        coreshop.broker.fireEvent('sales.list.enhancing.grid', grid);

        toolbar = grid.query('toolbar');
        if (toolbar.length > 0) {
            this.enhanceToolbarLayout(grid, toolbar[0]);
        }

    },

    enhanceToolbarLayout(grid, toolbar) {

        var label = new Ext.Toolbar.TextItem({
            text: t('coreshop_order_list_filter') + ':'
        });

        try {
            var searchAndMove = toolbar.down('[iconCls*=pimcore_icon_search]');
            var justChildrenCheckbox = toolbar.down('[name=onlyDirectChildren]');

            if (searchAndMove) {
                searchAndMove.next().destroy();
                searchAndMove.destroy();
            }

            if (justChildrenCheckbox) {
                justChildrenCheckbox.next().destroy();
                justChildrenCheckbox.destroy();
            }
        } catch (ex) {
            // fail silently.
        }

        toolbar.insert(2, [
            label,
            {
                xtype: 'combo',
                value: 'none',
                store: this.getFilterStore(),
                flex: 1,
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                disabled: false,
                name: 'coreshopFilter',
                listeners: {
                    'change': function (field) {
                        grid.getStore().getProxy().setExtraParam('coreshop_filter', field.getValue());
                        this.getGridPaginator().moveFirst();
                    }.bind(this)
                }
            }
        ]);

        coreshop.broker.fireEvent('sales.list.enhancing.toolbar', toolbar, grid);
    },

    open: function (id, callback) {
        coreshop.order.helper.openSale(id, this.type, callback);
    },

    setGridPaginator: function (layout) {
        this.gridPaginator = layout.down('pagingtoolbar');

        coreshop.broker.fireEvent('sales.list.enhancing.grid-paginator', this.gridPaginator);

    },

    getGridPaginator: function () {
        return this.gridPaginator;
    },

    getFilterStore: function () {

        var filterStore = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: '/admin/coreshop/grid/filters/coreshop_' + this.type
            }),
            reader: new Ext.data.JsonReader({}, [
                {name: 'id'},
                {name: 'name'}
            ]),
            listeners: {
                load: function (store) {
                    var rec = {id: 'none', name: t('coreshop_order_list_filter_empty')};
                    store.insert(0, rec);
                }.bind(this)
            }
        });

        filterStore.load();
        return filterStore;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create');
pimcore.registerNS('coreshop.order.sale.create.panel');
coreshop.order.sale.create.panel = Class.create({
    steps: {},
    eventManager: null,
    customerId: null,
    customerDetail: null,
    url: null,
    type: null,

    initialize: function () {
        var me = this;

        me.eventManager = new CoreShop.resource.EventManager();
        me.eventManager.on('validation', function () {
            var valid = true;

            Ext.Object.each(me.steps, function (key, value) {
                if (!value.isValid()) {
                    valid = false;
                    return false;
                }
            });

            if (valid) {
                me.createButton.enable();
            }
            else {
                me.createButton.disable();
            }
        });

        this.loadSaleRelator();
    },

    loadSaleRelator: function() {
        var me = this;

        pimcore.helpers.itemselector(
            false,
            function (customer) {
                this.loadCustomerDetail(customer.id);
            }.bind(me),
            {
                type: ['object'],
                subtype: {
                    object: ['object']
                },
                specific: {
                    classes: coreshop.stack.coreshop.customer
                }
            }
        );
    },

    loadCustomerDetail: function (customerId) {
        this.customerId = customerId;

        Ext.Ajax.request({
            url: '/admin/coreshop/order-creation/get-customer-details',
            method: 'post',
            params: {
                customerId: customerId
            },
            callback: function (request, success, response) {
                try {
                    response = Ext.decode(response.responseText);

                    if (response.success) {
                        this.customerDetail = response.customer;

                        this.getLayout();
                    } else {
                        Ext.Msg.alert(t('error'), response.message);
                    }
                }
                catch (e) {
                    Ext.Msg.alert(t('error'), e);
                }
            }.bind(this)
        });
    },

    getStep: function (step) {
        return this.steps[step];
    },

    getLayout: function () {
        if (!this.layout) {

            this.layoutId = Ext.id();

            this.createButton = new Ext.button.Button({
                iconCls: 'pimcore_icon_save',
                text: t('create'),
                disabled: true,
                handler: this.createSale.bind(this)
            });

            this.resetButton = new Ext.button.Button({
                iconCls: 'pimcore_icon_refresh',
                text: t('reset'),
                disabled: false,
                handler: this.reset.bind(this)
            });

            // create new panel
            this.layout = new Ext.panel.Panel({
                id: this.layoutId,
                title: t('coreshop_' + this.type + '_create'),
                iconCls: 'coreshop_icon_' + this.type + '_create',
                border: false,
                layout: 'border',
                autoScroll: true,
                closable: true,
                items: [this.getPanel()],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        this.createButton
                    ]
                }, {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        this.resetButton
                    ]
                }]
            });

            // add panel to pimcore panel tabs
            var tabPanel = Ext.getCmp('pimcore_panel_tabs');
            tabPanel.add(this.layout);
            tabPanel.setActiveItem(this.layoutId);

            // update layout
            pimcore.layout.refresh();
        }

        return this.layout;
    },

    getPanel: function () {
        var me = this,
            defaults = {
                style: this.borderStyle,
                cls: 'coreshop-panel',
                bodyPadding: 5
            },
            stepIdentifier = me.getStepIdentifier(),
            stepKeys = Object.keys(stepIdentifier),
            steps = [],
            stepLayouts = [];

        stepKeys.forEach(function (stepName) {
            var step = new stepIdentifier[stepName](me, me.eventManager);

            steps.push(step);
            me.steps[stepName] = step;
        });

        steps = steps.sort(function (stepA, stepB) {
            return stepA.getPriority() > stepB.getPriority();
        });

        stepLayouts = steps.map(function (step) {
            return step.getLayout();
        });

        this.panel = Ext.create('Ext.container.Container', {
            border: false,
            items: stepLayouts,
            padding: '5 20 20 20',
            region: 'center',
            defaults: defaults
        });

        return this.panel;
    },

    getValues: function () {
        var values = {
            customer: this.customerId
        };

        Ext.Object.each(this.steps, function (key, value) {
            values = Ext.apply(values, value.getValues());
        });

        return values;
    },

    reset: function() {
        this.eventManager.suspendEvents();

        Ext.Object.each(this.steps, function (key, step) {
            step.reset();
        });

        this.eventManager.resumeEvents();
    },

    prepareSuccessMessage: function(message, response) {
        return message;
    },

    createSale: function () {
        this.layout.setLoading(t('coreshop_creating_' + this.type));

        Ext.Ajax.request({
            url: '/admin/coreshop/' + this.type + '-creation/create',
            method: 'post',
            jsonData: this.getValues(),
            callback: function (request, success, response) {
                try {
                    response = Ext.decode(response.responseText);

                    if (response.success) {
                        var message = t('coreshop_creating_' + this.type + '_finished_detail');

                        message = this.prepareSuccessMessage(message, response);

                        var win = new Ext.Window({
                            modal: true,
                            iconCls: 'coreshop_icon_' + this.type + '_create',
                            title: t('coreshop_creating_' + this.type + '_finished'),
                            width: 600,
                            minWidth: 250,
                            minHeight: 110,
                            maxHeight: 500,
                            closable: false,
                            resizable: false,
                            items: [
                                {
                                    xtype: 'container',
                                    padding: 10,
                                    style: {
                                        overflow: 'hidden'
                                    },
                                    items: [
                                        {
                                            xtype: 'component',
                                            cls: Ext.baseCSSPrefix + 'message-box-icon-text',
                                            html: message,
                                        }
                                    ]
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'footer',
                                    dock: 'bottom',
                                    focusableContainer: false,
                                    ariaRole: null,
                                    layout: {
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            handler: function() {
                                                win.close();
                                                this.layout.destroy();
                                            }.bind(this),
                                            scope: this,
                                            text: t('coreshop_sale_action_close_editor'),
                                            minWidth: 75
                                        },
                                        {
                                            handler: function() {
                                                win.close();
                                                this.layout.destroy();

                                                this.__proto__.constructor();
                                            },
                                            scope: this,
                                            text: t('coreshop_sale_action_add_another'),
                                            minWidth: 75
                                        },
                                        {
                                            handler: function() {
                                                win.close();

                                                this.reset();
                                            }.bind(this),
                                            scope: this,
                                            text: t('coreshop_sale_action_add_another_same_customer'),
                                            minWidth: 75
                                        },
                                        {
                                            handler: function() {
                                                win.close();
                                                this.layout.destroy();

                                                coreshop.order.helper.openSale(response.id, this.type);
                                            }.bind(this),
                                            scope: this,
                                            text: t('coreshop_sale_action_open_' + this.type),
                                            minWidth: 75
                                        }
                                    ]
                                }
                            ],
                        }).show();
                    } else {
                        Ext.Msg.alert(t('error'), response.message);
                    }
                }
                catch (e) {
                    Ext.Msg.alert(t('error'), e);
                }

                this.layout.setLoading(false);
            }.bind(this)
        });
    },

    getStepIdentifier: function () {
        return coreshop.order.sale.create.step;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step');
pimcore.registerNS('coreshop.order.sale.create.abstractStep');
coreshop.order.sale.create.abstractStep = Class.create({
    eventManager: null,
    creationPanel: null,

    initialize: function (creationPanel, eventManager) {
        var me = this;

        me.creationPanel = creationPanel;
        me.eventManager = eventManager;

        if (Ext.isFunction(me.initStep)) {
            me.initStep();
        }
    },

    isValid: function () {
        return true;
    },

    reset: function() {

    },

    getPriority: function () {
        Ext.Error.raise('implement me');
    },

    getValues: function () {
        Ext.Error.raise('implement me');
    },

    getName: function() {
        Ext.Error.raise('implement me');
    },

    getPanel: function() {
        Ext.Error.raise('implement me');
    },

    getLayout: function () {
        var tools = Ext.isFunction(this.getTools) ? this.getTools() : [];
        var iconCls = Ext.isFunction(this.getIconCls) ? this.getIconCls() : '';
        var panel = this.getPanel();

        this.panel = panel;
        this.layout = new Ext.panel.Panel({
            margin: '15 0 15 0',
            iconCls: iconCls,
            title: this.getName(),
            items: panel,
            tools: tools
        });

        return this.layout;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.preparation');
/*coreshop.order.sale.create.step.preparation = Class.create(coreshop.order.sale.create.abstractStep, {

    isValid: function(parent) {
        return true;
    },

    getPriority: function() {
        return 10;
    },

    getValues: function(parent) {

    },

    getPanel: function() {
        return [];
    },

    getName: function() {
        return t('coreshop_order_create_preparation');
    }
});*/


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.base');
coreshop.order.sale.create.step.base = Class.create(coreshop.order.sale.create.abstractStep, {
    isValid: function () {
        var values = this.getValues();

        return values.currency && values.language;
    },

    getPriority: function () {
        return 20;
    },

    reset: function() {
        this.panel.getForm().reset();
    },

    getValues: function (parent) {
        return this.panel.getForm().getFieldValues();
    },

    getPanel: function () {
        this.panel = Ext.create('Ext.form.Panel', {
            items: this.getBaseItems()
        });

        return this.panel;
    },

    getBaseItems: function () {
        var languageStore = [];
        var websiteLanguages = pimcore.settings.websiteLanguages;

        for (var i = 0; i < websiteLanguages.length; i++) {
            languageStore.push([websiteLanguages[i], pimcore.available_languages[websiteLanguages[i]] + " [" + websiteLanguages[i] + "]"]);
        }

        var defaultStore = pimcore.globalmanager.get('coreshop_stores').findRecord('isDefault', true);

        if (!defaultStore) {
            defaultStore = pimcore.globalmanager.get('coreshop_stores').getAt(0);
        }

        return [
            Ext.create({
                xtype: 'coreshop.store',
                value: defaultStore.getId(),
                listeners: {
                    select: function () {
                        this.eventManager.fireEvent('store.changed');
                    }.bind(this)
                }
            }),
            {
                xtype: 'coreshop.currency',
                displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{name} ({symbol})', '</tpl>'),
                listConfig: {
                    itemTpl: Ext.create('Ext.XTemplate', '', '{name} ({symbol})', '')
                },
                listeners: {
                    select: function () {
                        this.eventManager.fireEvent('currency.changed');
                        this.eventManager.fireEvent('validation');
                    }.bind(this)
                },
                value: defaultStore.get('currency')
            },
            new Ext.form.ComboBox({
                fieldLabel: t('language'),
                name: "language",
                store: languageStore,
                editable: false,
                triggerAction: 'all',
                mode: "local",
                width: 500,
                emptyText: t('language'),
                value: languageStore[0],
                listeners: {
                    select: function () {
                        this.eventManager.fireEvent('language.changed');
                        this.eventManager.fireEvent('validation');
                    }.bind(this)
                }
            })
        ];
    },

    getName: function () {
        return t('coreshop_order_create_base');
    },

    getIconCls: function () {
        return 'coreshop_icon_localization';
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.products');
coreshop.order.sale.create.step.products = Class.create(coreshop.order.sale.create.abstractStep, {

    initStep: function () {
        var me = this;

        me.eventManager.on('currency.changed', function () {
            me.reloadProducts();
        });
        me.eventManager.on('store.changed', function () {
            me.reloadProducts();
        });
    },

    isValid: function () {
        var values = this.getValues();

        return values.products.length > 0;
    },

    getPriority: function () {
        return 30;
    },

    getValues: function () {
        return {
            products: this.getCartProducts()
        };
    },

    reset: function() {
        this.cartPanelStore.setData([]);
    },

    getPanel: function () {
        var me = this;
        var modelName = 'CoreShopCreateOrderCart';
        if (!Ext.ClassManager.isCreated(modelName)) {
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                idProperty: 'o_id'
            });
        }

        this.cartPanelStore = new Ext.data.JsonStore({
            data: [],
            model: modelName
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            listeners: {
                edit: function (editor, context, eOpts) {
                    if (context.originalValue !== context.value) {
                        this.cartPanelGrid.getView().refresh();
                    }

                    this.reloadProducts();
                }.bind(this)
            }
        });

        this.cartPanelGrid = Ext.create('Ext.grid.Panel', {
            margin: '0 0 15 0',
            cls: 'coreshop-detail-grid',
            store: this.cartPanelStore,
            plugins: [cellEditing],
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'o_id',
                    text: t('id'),
                    width: 100
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    flex: 1,
                    text: t('name'),
                    renderer: function (value, metaData, record) {
                        if (Object.keys(record.get("localizedfields").data).indexOf(pimcore.settings.language) > 0)
                            return record.get("localizedfields").data[pimcore.settings.language].name;
                        else {
                            var keys = Object.keys(record.get("localizedfields").data);

                            if (keys.length > 0) {
                                return record.get("localizedfields").data[keys[0]].name;
                            }
                        }

                        return "";
                    }.bind(this)
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'price',
                    width: 150,
                    align: 'right',
                    text: t('coreshop_base_price'),
                    renderer: function (value, metaData, record) {
                        return '<span style="font-weight:bold">' + record.get('priceFormatted') + '</span>';
                    }.bind(this)
                    /*field : { TODO: Make price editable
                        xtype: 'numberfield',
                        decimalPrecision : 2
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'priceConverted',
                    width: 150,
                    align: 'right',
                    text: t('coreshop_price'),
                    renderer: function (value, metaData, record) {
                        return '<span style="font-weight:bold">' + record.get('priceConvertedFormatted') + '</span>';
                    }.bind(this)
                    /*field : { TODO: Make price editable
                        xtype: 'numberfield',
                        decimalPrecision : 2
                    }*/
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'quantity',
                    width: 100,
                    text: t('coreshop_quantity'),
                    field: {
                        xtype: 'numberfield',
                        decimalPrecision: 0
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'total',
                    width: 150,
                    align: 'right',
                    text: t('coreshop_base_total'),
                    renderer: function (value, metaData, record) {
                        return '<span style="font-weight:bold">' + record.get('totalFormatted') + '</span>';
                    }.bind(this)
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'totalConverted',
                    width: 150,
                    align: 'right',
                    text: t('coreshop_total'),
                    renderer: function (value, metaData, record) {
                        return '<span style="font-weight:bold">' + record.get('totalConvertedFormatted') + '</span>';
                    }.bind(this)
                },
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [
                        {
                            iconCls: 'pimcore_icon_open',
                            tooltip: t('open'),
                            handler: function (grid, rowIndex) {
                                var record = grid.getStore().getAt(rowIndex);

                                pimcore.helpers.openObject(record.get('o_id'));
                            }
                        },
                        {
                            iconCls: 'pimcore_icon_delete',
                            tooltip: t('delete'),
                            handler: function (grid, rowIndex) {
                                var record = grid.getStore().getAt(rowIndex);

                                me.removeProductFromCart(record);
                            }
                        }
                    ]
                }
            ]
        });

        return this.cartPanelGrid;
    },

    getTools: function () {
        return [
            {
                type: 'coreshop-add-product',
                tooltip: t('add'),
                handler: function () {
                    pimcore.helpers.itemselector(
                        true,
                        function (products) {
                            products = products.map(function (pr) {
                                return {id: pr.id, quantity: 1};
                            });

                            this.addProductsToCart(products);
                        }.bind(this),
                        {
                            type: ['object'],
                            subtype: {
                                object: ['object', 'variant']
                            },
                            specific: {
                                classes: coreshop.stack.coreshop.product
                            }
                        }
                    );
                }.bind(this)
            }
        ];
    },

    removeProductFromCart: function(product) {
        this.cartPanelStore.remove(product);

        this.eventManager.fireEvent('products.changed');
        this.eventManager.fireEvent('validation');
    },

    addProductsToCart: function (products, reset) {
        if (products.length <= 0) {
            return;
        }

        this.layout.setLoading(t("loading"));

        var values = this.creationPanel.getValues();
        values['products'] = products;

        Ext.Ajax.request({
            url: '/admin/coreshop/' + this.creationPanel.type + '-creation/get-product-details',
            method: 'post',
            jsonData: values,
            callback: function (request, success, response) {
                try {
                    response = Ext.decode(response.responseText);

                    if (response.success) {
                        if (reset) {
                            this.cartPanelStore.removeAll();
                        }

                        this.cartPanelStore.add(response.products);

                        this.eventManager.fireEvent('products.changed');
                        this.eventManager.fireEvent('validation');
                    } else {
                        Ext.Msg.alert(t('error'), response.message);
                    }
                }
                catch (e) {
                    Ext.Msg.alert(t('error'), e);
                }

                this.layout.setLoading(false);
            }.bind(this)
        });
    },

    reloadProducts: function () {
        var baseStep = this.creationPanel.getStep('base');

        if (baseStep.isValid()) {
            this.addProductsToCart(this.getCartProducts(), true);
        }
    },

    getCartProducts: function () {
        return this.cartPanelStore.getRange().map(function (record) {
            return {
                id: record.get('o_id'),
                quantity: record.get('quantity')
            }
        });
    },

    getName: function () {
        return t('coreshop_order_create_products');
    },

    getIconCls: function () {
        return 'coreshop_icon_cart';
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.address');
coreshop.order.sale.create.step.address = Class.create(coreshop.order.sale.create.abstractStep, {
    addressStore: null,

    initStep: function () {
        var modelName = 'CoreShopCreateOrderAddress';
        if (!Ext.ClassManager.isCreated(modelName)) {
            Ext.define(modelName, {
                extend: 'Ext.data.Model',
                idProperty: 'o_id'
            });
        }

        this.addressStore = new Ext.data.JsonStore({
            data: this.creationPanel.customerDetail.addresses,
            model: modelName
        });

    },

    isValid: function (parent) {
        return true;
    },

    reset: function() {
        this.panel.getForm().reset();
    },

    getPriority: function () {
        return 40;
    },

    getValues: function (parent) {
        return this.panel.getForm().getFieldValues();
    },

    getPanel: function () {
        this.panel = Ext.create('Ext.form.Panel', {
            layout: 'hbox',
            items: [
                this.getAddressPanelForType('shipping'),
                this.getAddressPanelForType('invoice')
            ]
        });

        return this.panel;
    },

    getIconCls: function() {
        return 'coreshop_icon_address';
    },

    getName: function () {
        return t('coreshop_order_create_address');
    },

    getAddressPanelForType: function (type) {
        var key = 'addressPanel' + type;
        var addressKey = 'address' + type;

        if (!this[key]) {
            var addressDetailPanelKey = 'addressDetailPanel' + type;

            this[addressDetailPanelKey] = Ext.create('Ext.panel.Panel', {});

            this[key] = Ext.create('Ext.panel.Panel', {
                flex: 1,
                padding: 10,
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: t('coreshop_address_' + type),
                        labelWidth: 150,
                        name: type + 'Address',
                        store: this.addressStore,
                        editable: false,
                        triggerAction: 'all',
                        queryMode: 'local',
                        width: 500,
                        displayField: 'name',
                        valueField: 'o_id',
                        displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{firstname} {lastname}, {postcode} {city}, {street} {number}', '</tpl>'),
                        listConfig: {
                            itemTpl: Ext.create('Ext.XTemplate', '', '{firstname} {lastname}, {postcode} {city}, {street} {number}', '')
                        },
                        listeners: {
                            change: function (combo, value) {
                                var address = this.addressStore.getById(value);

                                this[addressDetailPanelKey].removeAll();

                                if (address) {
                                    this[addressDetailPanelKey].add(this.getAddressPanelForAddress(address.data));

                                    this[addressKey] = address.data;
                                }

                                this.eventManager.fireEvent('address.changed');
                                this.eventManager.fireEvent('validation');
                            }.bind(this)
                        }
                    },
                    this[addressDetailPanelKey]
                ]
            });
        }

        return this[key];
    },

    getAddressPanelForAddress : function (address) {
        var country = pimcore.globalmanager.get('coreshop_countries').getById(address.country);

        var panel = {
            xtype: 'panel',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    '->',
                    {
                        iconCls: 'coreshop_icon_open',
                        text: t('open'),
                        handler: function () {
                            pimcore.helpers.openObject(address.o_id);
                        }.bind(this)
                    }
                ]
            }],
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            height: 220,
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 5,
                    html: (address.firstname ? address.firstname : '') + ' ' + (address.lastname ? address.lastname : '') + '<br/>' +
                    (address.company ? address.company + '<br/>' : '') +
                    (address.street ? address.street : '') + ' ' + (address.nr ? address.nr : '') + '<br/>' +
                    (address.zip ? address.zip : '') + ' ' + (address.city ? address.city : '') + '<br/>' +
                    (country ? country.get('name') : ''),
                    flex: 1
                }
            ]
        };

        if (pimcore.settings.google_maps_api_key) {
            panel.items.push({
                xtype: 'panel',
                html: '<img src="https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&maptype=roadmap'
                + '&center=' + address.street + '+' + address.nr + '+' + address.zip + '+' + address.city + '+' + (country ? country.get('name') : '')
                + '&markers=color:blue|' + address.street + '+' + address.nr + '+' + address.zip + '+' + address.city + '+' + (country ? country.get('name') : '')
                + '&key=' + pimcore.settings.google_maps_api_key
                + '" />',
                flex: 1,
                bodyPadding: 5
            });
        }

        return panel;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.rules');
/*coreshop.order.sale.create.step.rules = Class.create(coreshop.order.sale.create.abstractStep, {

    isValid: function(parent) {
        return true;
    },

    getPriority: function() {
        return 70;
    },

    getValues: function(parent) {

    },

    getPanel: function() {
        return [];
    },

    getName: function() {
        return t('coreshop_order_create_rules');
    }
});*/


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.payment');
coreshop.order.sale.create.step.payment = Class.create(coreshop.order.sale.create.abstractStep, {

    isValid: function () {
        return this.getValues().paymentProvider;
    },

    getPriority: function () {
        return 50;
    },

    getValues: function (parent) {
        return this.panel.getForm().getFieldValues();
    },

    reset: function() {
        this.panel.getForm().reset();
    },

    getPanel: function () {
        this.panel = Ext.create('Ext.form.Panel', {
            items: [
                Ext.create({
                    xtype: 'combo',
                    fieldLabel: t('coreshop_payment_provider'),
                    editable: false,
                    mode: 'local',
                    listWidth: 100,
                    store: pimcore.globalmanager.get('coreshop_payment_provider'),
                    displayField: 'identifier',
                    valueField: 'id',
                    triggerAction: 'all',
                    labelWidth: 150,
                    name: 'paymentProvider',
                    listeners: {
                    change: function() {
                        this.eventManager.fireEvent('payment_provider.changed');
                        this.eventManager.fireEvent('validation');
                    }.bind(this)
                }
                })
            ]
        })
        ;

        return this.panel;
    },

    getName: function () {
        return t('coreshop_order_create_payment');
    },

    getIconCls: function() {
        return 'coreshop_icon_payment_provider';
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.totals');
coreshop.order.sale.create.step.totals = Class.create(coreshop.order.sale.create.abstractStep, {
    totalStore: null,

    initStep: function () {
        var me = this;

        me.eventManager.on('products.changed', function () {
            me.reloadTotalPanel();
        });
        me.eventManager.on('address.changed', function () {
            me.reloadTotalPanel();
        });
        me.eventManager.on('totals.reload', function () {
            me.reloadTotalPanel();
        });

        this.totalStore = new Ext.data.JsonStore({
            data: []
        });
    },

    reset: function() {
        this.layout.hide();
    },
    
    isValid: function (parent) {
        return true;
    },

    getPriority: function () {
        return 80;
    },

    getValues: function () {
        return [];
    },

    getPanel: function () {
        this.totalPanel = Ext.create('Ext.panel.Panel', {
            items: [
                {
                    xtype: 'grid',
                    store: this.totalStore,
                    hideHeaders: true,
                    margin: '0 0 20 0',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'key',
                            flex: 1,
                            renderer: function (value) {
                                return '<span style="font-weight:bold">' + t('coreshop_' + value) + '</span>';
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'value',
                            width: 150,
                            align: 'right',
                            renderer: function (value, metaData, record) {
                                return '<span style="font-weight:bold">' + record.get('valueFormatted') + '</span>';
                            }.bind(this)
                        }
                    ]
                },
            ]
        });

        return this.totalPanel;
    },

    getName: function () {
        return t('coreshop_order_create_totals');
    },

    getIconCls: function () {
        return 'coreshop_icon_orders';
    },

    getLayout: function ($super) {
        var layout = $super();

        layout.hide();

        return layout;
    },

    reloadTotalPanel: function () {
        var values = this.creationPanel.getValues();

        if (values.shippingAddress && values.invoiceAddress && values.products.length > 0) {
            this.layout.setLoading(t("loading"));

            Ext.Ajax.request({
                url: '/admin/coreshop/' + this.creationPanel.type + '-creation/get-totals',
                method: 'post',
                jsonData: values,
                callback: function (request, success, response) {
                    try {
                        response = Ext.decode(response.responseText);

                        if (response.success) {
                            this.totalStore.loadData(response.summary);
                        } else {
                            Ext.Msg.alert(t('error'), response.message);
                        }
                    }
                    catch (e) {
                        Ext.Msg.alert(t('error'), e);
                    }

                    this.layout.setLoading(false);
                }.bind(this)
            });

            this.layout.show();
        }
        else {
            this.layout.hide();
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.list');
coreshop.order.order.list = Class.create(coreshop.order.sale.list, {
    type: 'order',

    setupContextMenuPlugin: function () {
        this.contextMenuPlugin = new coreshop.pimcore.plugin.grid(
            'coreshop_order',
            function (id) {
                this.open(id);
            }.bind(this),
            [coreshop.class_map.coreshop.order],
            this.getGridPaginator()
        );
    },

    open: function (id, callback) {
        coreshop.order.helper.openOrder(id, callback);
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.create');
pimcore.registerNS('coreshop.order.order.create.panel');
coreshop.order.order.create.panel = Class.create(coreshop.order.sale.create.panel, {
    type: 'order',

    prepareSuccessMessage: function(message, response) {
        if (response.hasOwnProperty('reviseLink') && response.reviseLink) {
            message += '<div class="coreshop-order-create-revise">';
            message += '<span class="coreshop-order-create-revise-desc">' + t('coreshop_creating_order_finished_revise_link') + '</span>';
            message += '<span class="coreshop-order-create-revise-link">' + response.reviseLink + '</span>';
            message += '</div>';
        }

        return message;
    },
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.helper');
pimcore.registerNS('coreshop.order.helper.x');

coreshop.order.helper.openSale = function (id, type, callback) {
    var cacheIdentifier = 'coreshop_'+type+'_' + id;

    if (pimcore.globalmanager.exists(cacheIdentifier) === false) {
        pimcore.globalmanager.add(cacheIdentifier, true);

        Ext.Ajax.request({
            url: '/admin/coreshop/'+type+'/detail',
            params: {
                id: id
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);

                if (res.success) {
                    pimcore.globalmanager.add(cacheIdentifier, new coreshop.order[type].detail.panel(res.sale));
                } else {
                    Ext.Msg.alert(t('open_target'), t('problem_opening_new_target'));
                }

                if (Ext.isFunction(callback)) {
                    callback();
                }
            }.bind(this)
        });
    } else {
        var tab = pimcore.globalmanager.get(cacheIdentifier);

        if (Ext.isObject(tab) && Ext.isFunction(tab.activate)) {
            tab.activate();
        }

        if (Ext.isFunction(callback)) {
            callback();
        }
    }
};


coreshop.order.helper.openSaleByNumberDialog = function(type, keyCode, e) {
    if (e['stopEvent']) {
        e.stopEvent();
    }

    Ext.MessageBox.prompt(t('coreshop_'+type+'_by_number'), t('coreshop_please_enter_the_number_of_the_' + type),
        function (button, value) {
            if (button === 'ok' && !Ext.isEmpty(value)) {
                coreshop.order.helper.openSaleByNumber(type, value);
            }
        }
    );
};


coreshop.order.helper.openSaleByNumber = function (type, number) {
    Ext.Ajax.request({
        url: '/admin/coreshop/'+type+'/find',
        params: {
            number: number
        },
        success: function (response) {
            var res = Ext.decode(response.responseText);
            if (res.success) {
                coreshop.order.helper.openSale(res.id, type);
            } else {
                Ext.MessageBox.alert(t('error'), t('element_not_found'));
            }
        }
    });
};

coreshop.order.helper.openOrder = function (id, callback) {
    coreshop.order.helper.openSale(id, 'order', callback);
};

coreshop.order.helper.openQuote = function (id, callback) {
    coreshop.order.helper.openSale(id, 'quote', callback);
};


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.detail.panel');
coreshop.order.order.detail.panel = Class.create(coreshop.order.sale.detail.panel, {
    type: 'order',

    getBlockIdentifier: function () {
        return coreshop.order.order.detail.blocks;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.detail.blocks.header');
coreshop.order.order.detail.blocks.header = Class.create(coreshop.order.sale.detail.blocks.header, {
    orderState: null,
    paymentState: null,
    shipmentState: null,
    invoiceState: null,

    initBlock: function ($super) {
        $super();

        var me = this;

        me.orderState = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });

        me.paymentState = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });

        me.shipmentState = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });

        me.invoiceState = Ext.create({
            xtype: 'panel',
            bodyPadding: 20,
            flex: 1
        });
    },

    getPanel: function ($super) {
        var me = this,
            items = [
                me.orderState,
                me.paymentState,
                me.shipmentState,
                me.invoiceState
            ],
            panelDefault = $super();

        var panelItemsStates = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            margin: 0,
            items: items
        });

        return Ext.create('Ext.panel.Panel', {
            border: false,
            margin: '0 0 20 0',
            items: [panelItemsStates, panelDefault]
        });
    },

    updateSale: function ($super) {
        $super();

        var me = this;

        me.orderState.setHtml(t('coreshop_workflow_name_coreshop_order') + '<br/><span class="coreshop_order_big order_state"><span class="color-dot" style="background-color:' + this.sale.orderState.color + ';"></span> ' + this.sale.orderState.label + '</span>');
        me.paymentState.setHtml(t('coreshop_workflow_name_coreshop_order_payment') + '<br/><span class="coreshop_order_medium"><span class="color-dot" style="background-color:' + this.sale.orderPaymentState.color + ';"></span>' + this.sale.orderPaymentState.label + '</span>');
        me.shipmentState.setHtml(t('coreshop_workflow_name_coreshop_order_shipment') + '<br/><span class="coreshop_order_medium"><span class="color-dot" style="background-color:' + this.sale.orderShippingState.color + ';"></span>' + this.sale.orderShippingState.label + '</span>');
        me.invoiceState.setHtml(t('coreshop_workflow_name_coreshop_order_invoice') + '<br/><span class="coreshop_order_medium"><span class="color-dot" style="background-color:' + this.sale.orderInvoiceState.color + ';"></span>' + this.sale.orderInvoiceState.label + '</span>');
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.info');
coreshop.order.order.detail.blocks.info = Class.create(coreshop.order.sale.detail.blocks.info, {
    saleStatesStore: null,

    initBlock: function ($super) {
        $super();

        var me = this;

        me.saleStatesStore = new Ext.data.JsonStore({
            data: []
        });
    },

    updateSale: function ($super) {
        $super();

        var me = this;

        me.saleInfo.removeAll();
        me.saleStatesStore.loadRawData(me.sale.statesHistory);

        if (me.sale.availableOrderTransitions.length > 0) {
            var buttons = [],
                changeStateRequest = function (context, btn, transitionInfo) {
                    btn.disable();
                    Ext.Ajax.request({
                        url: '/admin/coreshop/order/update-order-state',
                        params: {
                            transition: transitionInfo.transition,
                            o_id: context.sale.o_id
                        },
                        success: function (response) {
                            var res = Ext.decode(response.responseText);
                            if(res.success === true) {
                                me.panel.reload();
                            } else {
                                Ext.Msg.alert(t('error'), res.message);
                                btn.enable();
                            }
                        },
                        failure: function () {
                            btn.enable();
                        }
                    });
                };

            Ext.Array.each(me.sale.availableOrderTransitions, function (transitionInfo) {
                buttons.push({
                    xtype: 'button',
                    style: transitionInfo.transition === 'cancel' ? '' : 'background-color:#524646;border-left:10px solid ' + transitionInfo.color + ' !important;',
                    cls: transitionInfo.transition === 'cancel' ? 'coreshop_change_order_order_state_button coreshop_cancel_order_button' : 'coreshop_change_order_order_state_button',
                    text: transitionInfo.label,
                    handler: function (btn) {
                        if (transitionInfo.transition === 'cancel') {
                            Ext.MessageBox.confirm(t('info'), t('coreshop_cancel_order_confirm'), function (buttonValue) {
                                if (buttonValue === 'yes') {
                                    changeStateRequest(me, btn, transitionInfo);
                                }
                            });
                        } else {
                            changeStateRequest(me, btn, transitionInfo);
                        }
                    }
                })
            });

            me.saleInfo.add({
                xtype: 'panel',
                layout: 'hbox',
                margin: 0,
                items: buttons
            });
        }

        me.saleInfo.add({
            xtype: 'grid',
            margin: '0 0 15 0',
            cls: 'coreshop-detail-grid',
            store: me.saleStatesStore,
            plugins: [{
              ptype: 'rowexpander',
              rowBodyTpl : [
                '<div style="padding:0 0 10px 0;">',
                    '{description}',
                '</div>'
              ]
            }],
            columns: [
                {
                    xtype: 'gridcolumn',
                    flex: 1,
                    dataIndex: 'title',
                    text: t('coreshop_orderstate')
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'date',
                    text: t('date')
                }
            ]
        });
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.shipment');
coreshop.order.order.detail.blocks.shipment = Class.create(coreshop.order.sale.detail.abstractBlock, {
    initBlock: function () {
        var me = this;

        me.shipmentsStore = new Ext.data.JsonStore({
            data: []
        });

        me.shippingInfo = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_shipments'),
            border: true,
            margin: '0 20 20 0',
            iconCls: 'coreshop_icon_orders_shipment',
            items: [
                {
                    xtype: 'grid',
                    margin: '0 0 15 0',
                    cls: 'coreshop-detail-grid',
                    store: me.shipmentsStore,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'shipmentDate',
                            text: t('coreshop_date'),
                            renderer: function (val) {
                                if (val) {
                                    return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                                }
                                return '';
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'carrierName',
                            text: t('coreshop_carrier')
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'trackingCode',
                            text: t('coreshop_tracking_code'),
                            flex: 1,
                            field: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            flex: 1,
                            onWidgetAttach: function (col, widget, record) {
                                var cursor = record.data.transitions.length > 0 ? 'pointer' : 'default';

                                widget.setText(record.data.stateInfo.label);
                                widget.setIconCls(record.data.transitions.length !== 0 ? 'pimcore_icon_open' : '');

                                widget.setStyle('border-radius', '2px');
                                widget.setStyle('cursor', cursor);
                                widget.setStyle('background-color', record.data.stateInfo.color);
                            },
                            widget: {
                                xtype: 'button',
                                margin: '3 0',
                                padding: '1 2',
                                border: 0,
                                defaultBindProperty: null,
                                handler: function (widgetColumn) {
                                    var record = widgetColumn.getWidgetRecord();
                                    var url = '/admin/coreshop/order-shipment/update-shipment-state',
                                        transitions = record.get('transitions'),
                                        id = record.get('o_id');
                                    if (transitions.length !== 0) {
                                        coreshop.order.order.state.changeState.showWindow(url, id, transitions, function (result) {
                                            if (result.success) {
                                                me.panel.reload();
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 32,
                            items: [{
                                iconCls: 'pimcore_icon_open',
                                tooltip: t('open'),
                                handler: function (grid, rowIndex) {
                                    coreshop.order.order.editShipment.showWindow(grid.getStore().getAt(rowIndex), function (result) {
                                        if (result.success) {
                                            me.panel.reload();
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                }
            ],
            tools: [
                {
                    type: 'coreshop-add',
                    tooltip: t('add'),
                    handler: function () {
                        me.createShipment();
                    }
                }
            ]
        });

        me.topBarButton = Ext.create({
            xtype: 'button',
            iconCls: 'coreshop_icon_orders_shipment',
            text: t('coreshop_shipment_create_short'),
            handler: function () {
                me.createShipment();
            }
        });

    },

    getTopBarItems: function () {
        var me = this;

        return [
            me.topBarButton
        ];
    },

    createShipment: function () {
        var me = this;

        new coreshop.order.order.shipment(me.sale, function () {
            me.panel.reload();
        });
    },

    getPriority: function () {
        return 30;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.shippingInfo;
    },

    updateSale: function () {
        var me = this,
            tool = me.shippingInfo.tools.find(function(tool) { return tool.type === 'coreshop-add'; });

        me.shipmentsStore.loadRawData(me.sale.shipments);

        if (me.sale.shipmentCreationAllowed) {
            me.topBarButton.show();
            if (tool && Ext.isFunction(tool.show)) {
                tool.show();
            }
        } else {
            me.topBarButton.hide();
            if (tool && Ext.isFunction(tool.hide)) {
                tool.hide();
            } else {
                tool.hidden = true;
            }
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.invoice');
coreshop.order.order.detail.blocks.invoice = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.invoicesStore = new Ext.data.JsonStore({
            data: []
        });

        me.invoiceDetails = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_invoices'),
            border: true,
            margin: '0 20 20 0',
            iconCls: 'coreshop_icon_orders_invoice',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 15 0',
                    cls: 'coreshop-detail-grid',
                    store: me.invoicesStore,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'invoiceDate',
                            text: t('coreshop_invoice_date'),
                            renderer: function (val) {
                                if (val) {
                                    return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                                }

                                return '';
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'totalNet',
                            text: t('coreshop_total_without_tax'),
                            flex: 1,
                            renderer: function (value) {
                                return coreshop.util.format.currency(me.sale.currency.symbol, value);
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'totalGross',
                            text: t('coreshop_total'),
                            flex: 1,
                            renderer: function (value) {
                                return coreshop.util.format.currency(me.sale.currency.symbol, value);
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            flex: 1,
                            onWidgetAttach: function (col, widget, record) {
                                var cursor = record.data.transitions.length > 0 ? 'pointer' : 'default';

                                widget.setText(record.data.stateInfo.label);
                                widget.setIconCls(record.data.transitions.length !== 0 ? 'pimcore_icon_open' : '');

                                widget.setStyle('border-radius', '2px');
                                widget.setStyle('cursor', cursor);
                                widget.setStyle('background-color', record.data.stateInfo.color);
                            },
                            widget: {
                                xtype: 'button',
                                margin: '3 0',
                                padding: '1 2',
                                border: 0,
                                defaultBindProperty: null,
                                handler: function (widgetColumn) {
                                    var record = widgetColumn.getWidgetRecord();
                                    var url = '/admin/coreshop/order-invoice/update-invoice-state',
                                        transitions = record.get('transitions'),
                                        id = record.get('o_id');
                                    if (transitions.length !== 0) {
                                        coreshop.order.order.state.changeState.showWindow(url, id, transitions, function (result) {
                                            if (result.success) {
                                                me.panel.reload();
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 32,
                            items: [{
                                iconCls: 'pimcore_icon_open',
                                tooltip: t('open'),
                                handler: function (grid, rowIndex) {
                                    coreshop.order.order.editInvoice.showWindow(grid.getStore().getAt(rowIndex), me.sale.currency, function (result) {
                                        if (result.success) {
                                            me.panel.reload();
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                }
            ],
            tools: [
                {
                    type: 'coreshop-add',
                    tooltip: t('add'),
                    handler: function () {
                        me.createInvoice();
                    }.bind(this)
                }
            ]
        });

        me.topBarButton = Ext.create({
            xtype: 'button',
            iconCls: 'coreshop_icon_orders_invoice',
            text: t('coreshop_invoice_create_short'),
            hidden: true,
            handler: function () {
                me.createInvoice();
            }
        });
    },

    getTopBarItems: function () {
        var me = this;

        return [
            me.topBarButton
        ];
    },

    createInvoice: function () {
        var me = this;

        new coreshop.order.order.invoice(me.sale, function () {
            me.panel.reload();
        });
    },

    getPriority: function () {
        return 40;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.invoiceDetails;
    },

    updateSale: function () {
        var me = this,
            tool = me.invoiceDetails.tools.find(function(tool) { return tool.type === 'coreshop-add'; });

        me.invoicesStore.loadRawData(me.sale.invoices);

        if (me.sale.invoiceCreationAllowed) {
            me.topBarButton.show();
            if (tool && Ext.isFunction(tool.show)) {
                tool.show();
            }
        } else {
            me.topBarButton.hide();
            if (tool && Ext.isFunction(tool.hide)) {
                tool.hide();
            } else {
                tool.hidden = true;
            }
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.payment');
coreshop.order.order.detail.blocks.payment = Class.create(coreshop.order.sale.detail.abstractBlock, {
    initBlock: function () {
        var me = this;

        me.paymentsStore = new Ext.data.JsonStore({
            data: []
        });

        me.paymentInfoAlert = Ext.create('Ext.panel.Panel', {
            xtype: 'panel',
            cls: 'x-coreshop-alert',
            bodyPadding: 5,
            hidden: true
        });

        me.paymentInfo = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_payments'),
            border: true,
            margin: '0 20 20 0',
            iconCls: 'coreshop_icon_payment',
            tools: [
                {
                    type: 'coreshop-add',
                    tooltip: t('add'),
                    handler: function () {
                        coreshop.order.order.createPayment.showWindow(me.sale.o_id, me.sale, function (result) {
                            if (result.success) {
                                me.panel.reload();
                            }
                        });
                    }
                }
            ],
            items: [
                me.paymentInfoAlert,
                {
                    xtype: 'grid',
                    margin: '0 0 15 0',
                    cls: 'coreshop-detail-grid',
                    store: me.paymentsStore,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'datePayment',
                            text: t('date'),
                            flex: 1,
                            renderer: function (val) {
                                if (val) {
                                    return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                                }

                                return '';
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'provider',
                            text: t('coreshop_paymentProvider')
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'amount',
                            text: t('coreshop_amount'),
                            flex: 1,
                            renderer: function (value) {
                                return coreshop.util.format.currency(me.sale.currency.symbol, value);
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            flex: 1,
                            onWidgetAttach: function (col, widget, record) {
                                var cursor = record.data.transitions.length > 0 ? 'pointer' : 'default';

                                widget.setText(record.data.stateInfo.label);
                                widget.setIconCls(record.data.transitions.length !== 0 ? 'pimcore_icon_open' : '');

                                widget.setStyle('border-radius', '2px');
                                widget.setStyle('cursor', cursor);
                                widget.setStyle('background-color', record.data.stateInfo.color);
                            },
                            widget: {
                                xtype: 'button',
                                margin: '3 0',
                                padding: '1 2',
                                border: 0,
                                defaultBindProperty: null,
                                handler: function (widgetColumn) {
                                    var record = widgetColumn.getWidgetRecord();
                                    var url = '/admin/coreshop/order-payment/update-payment-state',
                                        transitions = record.get('transitions'),
                                        id = record.get('id');
                                    if (transitions.length !== 0) {
                                        coreshop.order.order.state.changeState.showWindow(url, id, transitions, function (result) {
                                            if (result.success) {
                                                me.panel.reload();
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 32,
                            items: [{
                                iconCls: 'pimcore_icon_open',
                                tooltip: t('open'),
                                handler: function (grid, rowIndex) {
                                    coreshop.order.order.editPayment.showWindow(grid.getStore().getAt(rowIndex), function (result) {
                                        if (result.success) {
                                            me.panel.reload();
                                        }
                                    });
                                }
                            }]
                        }
                    ]
                }
            ]
        });
    },

    updatePaymentInfoAlert: function () {
        var me = this;

        if (me.paymentInfoAlert) {
            if (me.sale.totalPayed < me.sale.total || me.sale.totalPayed > me.sale.total) {
                me.paymentInfoAlert.update(t('coreshop_order_payment_paid_warning').format(coreshop.util.format.currency(me.sale.currency.symbol, me.sale.totalPayed), coreshop.util.format.currency(me.sale.currency.symbol, me.sale.totalGross)));
                me.paymentInfoAlert.show();
            } else {
                me.paymentInfoAlert.update('');
                me.paymentInfoAlert.hide();
            }
        }
    },

    getPriority: function () {
        return 20;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.paymentInfo;
    },

    updateSale: function () {
        var me = this,
            tool = me.paymentInfo.tools.find(function(tool) { return tool.type === 'coreshop-add'; });

        me.paymentsStore.loadRawData(me.sale.payments);
        me.updatePaymentInfoAlert();

        if (me.sale.paymentCreationAllowed) {
            if (tool && Ext.isFunction(tool.show)) {
                tool.show();
            }
        } else {
            if (tool && Ext.isFunction(tool.hide)) {
                tool.hide();
            } else {
                tool.hidden = true;
            }
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.correspondence');
coreshop.order.order.detail.blocks.correspondence = Class.create(coreshop.order.sale.detail.blocks.correspondence, {

});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.customer');
coreshop.order.order.detail.blocks.customer = Class.create(coreshop.order.sale.detail.blocks.customer, {

});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.detail');
coreshop.order.order.detail.blocks.detail = Class.create(coreshop.order.sale.detail.blocks.detail, {

});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.comments');
coreshop.order.order.detail.blocks.comments = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.layout = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_order_comments'),
            margin: '0 0 20 0',
            border: true,
            flex: 6,
            iconCls: 'coreshop_icon_order_comments',
            tools: [
                {
                    type: 'coreshop-add',
                    tooltip: t('add'),
                    handler: me.createComment.bind(me)
                }
            ]
        });
    },

    loadList: function () {
        var me = this;

        me.layout.removeAll();
        me.layout.setLoading(t('loading'));

        Ext.Ajax.request({
            url: '/admin/coreshop/order-comment/list',
            params: {
                id: me.sale.o_id
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);
                me.layout.setLoading(false);

                if (res.success) {
                    if (res.comments.length === 0) {
                        me.layout.add({
                            'xtype': 'panel',
                            'html': '<span class="coreshop-order-comments-nothing-found">' + t('coreshop_order_comments_nothing_found') + '</span>'
                        })
                    } else {
                        Ext.each(res.comments, function (comment) {
                            me.addCommentToList(comment);
                        });
                    }
                } else {
                    Ext.Msg.alert(t('error'), res.message);
                }

            }
        });
    },

    addCommentToList: function (comment) {
        var me = this,
            commentDate = Ext.Date.format(new Date(intval(comment.date) * 1000), 'd.m.Y H:i'),
            notificationApplied = comment.submitAsEmail === true;

        var commentPanel = {
            xtype: 'panel',
            bodyPadding: 10,
            margin: '0 0 10px 0',
            style: 'border-bottom: 1px dashed #b7b7b7;',
            title: commentDate + ' - <span class="published-by">' + t('coreshop_order_comments_published_by') + ' ' + comment.userName + '</span>',
            cls: 'coreshop-order-comment-block',
            tools: [
                {
                    type: 'coreshop-remove',
                    tooltip: t('add'),
                    handler: me.deleteComment.bind(me, comment)
                }
            ],
            items: [
                {
                    xtype: 'label',
                    style: 'display:block',
                    html: comment.text
                },
                {
                    xtype: 'label',
                    cls: notificationApplied ? 'comment_meta external' : 'comment_meta internal',
                    text: notificationApplied ? t('coreshop_order_comments_notification_applied') : t('coreshop_order_comments_is_internal'),
                }
            ]
        };

        me.layout.add(commentPanel);
    },

    createComment: function (tab) {
        var me = this,
            noteLabel = new Ext.form.Label({
                flex: 1,
                text: t('coreshop_order_comment_customer_locale_note') + ' ' + me.sale.localeCode,
                style: 'color: gray; font-style: italic; text-align: right; padding: 0px 2px 0px 0px;',
                hidden: true
            }),
            window = new Ext.window.Window({
                width: 600,
                height: 400,
                resizeable: false,
                modal: true,
                layout: 'fit',
                title: t('coreshop_order_comment_create'),
                items: [{
                    xtype: 'form',
                    bodyStyle: 'padding:20px 5px 20px 5px;',
                    border: false,
                    autoScroll: true,
                    forceLayout: true,
                    fieldDefaults: {
                        labelWidth: 150
                    },
                    buttons: [
                        {
                            text: t('coreshop_order_comment_create'),
                            handler: me.saveComment.bind(me),
                            iconCls: 'pimcore_icon_apply'
                        }
                    ],
                    items: [
                        {
                            xtype: 'textarea',
                            name: 'comment',
                            fieldLabel: t('coreshop_order_comment'),
                            labelAlign: 'top',
                            width: '100%',
                            height: '70%',
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            border: 0,
                            style: {
                                border: 0
                            },
                            items: [
                                {
                                    xtype: 'checkbox',
                                    flex: 2,
                                    name: 'submitAsEmail',
                                    fieldLabel: t('coreshop_order_comment_trigger_notifications'),
                                    listeners: {
                                        'change': function (b) {
                                            noteLabel.setHidden(!b.checked)
                                        }
                                    }
                                },
                                noteLabel
                            ]
                        }
                    ]
                }]
            });

        window.show();
    },

    saveComment: function (btn, event) {
        var me = this,
            formWindow = btn.up('window'),
            form = formWindow.down('form').getForm();

        formWindow.setLoading(t('loading'));

        if (!form.isValid()) {
            return;
        }

        var formValues = form.getFieldValues();

        formValues['id'] = me.sale.o_id;

        Ext.Ajax.request({
            url: '/admin/coreshop/order-comment/add',
            method: 'post',
            params: formValues,
            callback: function (request, success, response) {
                try {
                    formWindow.setLoading(false);
                    response = Ext.decode(response.responseText);
                    if (response.success === true) {
                        formWindow.close();
                        formWindow.destroy();
                        me.loadList();
                    } else {
                        Ext.Msg.alert(t('error'), response.message);
                    }
                } catch (e) {
                    formWindow.setLoading(false);
                }
            }
        });
    },

    deleteComment: function (comment, ev, el) {
        var me = this;

        Ext.MessageBox.confirm(t('info'), t('coreshop_delete_order_comment_confirm'), function (buttonValue) {

            if (buttonValue === 'yes') {

                me.layout.setLoading(t('loading'));

                Ext.Ajax.request({
                    url: '/admin/coreshop/order-comment/delete',
                    method: 'post',
                    params: {
                        id: comment.id
                    },
                    callback: function (request, success, response) {
                        me.layout.setLoading(false);

                        try {
                            response = Ext.decode(response.responseText);
                            if (response.success === true) {
                                me.loadList();
                            } else {
                                Ext.Msg.alert(t('error'), response.message);
                            }
                        } catch (e) {

                        }
                    }
                });
            }

        });
    },

    getPriority: function () {
        return 20;
    },

    getPosition: function () {
        return 'right';
    },

    getPanel: function () {
        return this.layout;
    },

    updateSale: function () {
        var me = this;

        me.loadList();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.invoice');
coreshop.order.order.invoice = Class.create({
    order: null,
    cb: null,

    height: 400,
    width: 800,

    initialize: function (order, cb) {
        this.order = order;
        this.cb = cb;

        Ext.Ajax.request({
            url: '/admin/coreshop/order-invoice/get-invoice-able-items',
            params: {
                id: this.order.o_id
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);

                if (res.success) {
                    if (res.items.length > 0) {
                        this.show(res.items);
                    }
                    else {
                        Ext.Msg.alert(t('coreshop_invoice'), t('coreshop_invoice_no_items'));
                    }
                } else {
                    Ext.Msg.alert(t('error'), res.message);
                }

            }.bind(this)
        });
    },

    getStoreFields: function() {
        return [
            'orderItemId',
            'price',
            'maxToInvoice',
            'quantity',
            'quantityInvoiced',
            'toInvoice',
            'tax',
            'total',
            'name'
        ];
    },

    getGridColumns: function() {
        return [
            {
                xtype: 'gridcolumn',
                flex: 1,
                dataIndex: 'name',
                text: t('coreshop_product')
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'price',
                text: t('coreshop_price'),
                width: 100,
                align: 'right',
                renderer: coreshop.util.format.currency.bind(this, this.order.currency.symbol)
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'quantity',
                text: t('coreshop_quantity'),
                width: 100,
                align: 'right'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'quantityInvoiced',
                text: t('coreshop_invoiced_quantity'),
                width: 120,
                align: 'right'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'toInvoice',
                text: t('coreshop_quantity_to_invoice'),
                width: 100,
                align: 'right',
                field: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'tax',
                text: t('coreshop_tax'),
                width: 100,
                align: 'right',
                renderer: coreshop.util.format.currency.bind(this, this.order.currency.symbol)
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'total',
                text: t('coreshop_total'),
                width: 100,
                align: 'right',
                renderer: coreshop.util.format.currency.bind(this, this.order.currency.symbol)
            }
        ];
    },

    createWindow: function(invoiceAbleItems) {
        var me = this;

        var positionStore = new Ext.data.JsonStore({
            data: invoiceAbleItems,
            fields: this.getStoreFields()
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

        var itemsGrid = {
            xtype: 'grid',
            cls: 'coreshop-order-detail-grid',
            minHeight: 400,
            store: positionStore,
            plugins: [rowEditing],
            listeners: {
                validateedit: function (editor, context) {
                    if (context.field === 'toInvoice') {
                        return context.value <= context.record.data.maxToInvoice;
                    }

                    return true;
                }
            },
            columns: this.getGridColumns()
        };

        var panel = Ext.create('Ext.form.Panel', {
            title: t('coreshop_invoice'),
            border: true,
            iconCls: 'coreshop_icon_product',
            bodyPadding: 10,
            items: [itemsGrid]
        });

        var window = new Ext.window.Window({
            width: me.width,
            height: me.height,
            resizeable: true,
            modal: true,
            layout: 'fit',
            title: t('coreshop_invoice_create_new') + ' (' + this.order.o_id + ')',
            items: [panel],
            buttons: [
                {
                    text: t('save'),
                    iconCls: 'pimcore_icon_apply',
                    handler: function (btn) {
                        var itemsToInvoice = [];

                        positionStore.getRange().forEach(function (item) {
                            if (item.get('toInvoice') > 0) {
                                itemsToInvoice.push(me.processItemsToInvoice(item));
                            }
                        });

                        window.setLoading(t('loading'));

                        var data = panel.getForm().getFieldValues();
                        data['id'] = parseInt(this.order.o_id);
                        data['items'] = itemsToInvoice;

                        Ext.Ajax.request({
                            url: '/admin/coreshop/order-invoice/create-invoice',
                            method: 'post',
                            jsonData: data,
                            success: function (response) {
                                var res = Ext.decode(response.responseText);

                                if (res.success) {
                                    pimcore.helpers.showNotification(t('success'), t('success'), 'success');

                                    if (Ext.isFunction(this.cb)) {
                                        this.cb();
                                    }

                                    window.close();
                                } else {
                                    pimcore.helpers.showNotification(t('error'), t(res.message), 'error');
                                }

                                window.setLoading(false);
                            }.bind(this)
                        });
                    }.bind(this)
                }
            ]
        });

        return window;
    },

    processItemsToInvoice: function(item) {
        return {
            orderItemId: item.get("orderItemId"),
            quantity: item.get("toInvoice")
        };
    },

    show: function (invoiceAbleItems) {
        var grWindow = this.createWindow(invoiceAbleItems);

        grWindow.show();

        return window;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.shipment');
coreshop.order.order.shipment = Class.create({
    order: null,
    cb: null,

    height: 400,
    width: 800,

    initialize: function (order, cb) {
        this.order = order;
        this.cb = cb;

        Ext.Ajax.request({
            url: '/admin/coreshop/order-shipment/get-ship-able-items',
            params: {
                id: this.order.o_id
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);

                if (res.success) {
                    if (res.items.length > 0) {
                        this.show(res.items);
                    }
                    else {
                        Ext.Msg.alert(t('coreshop_shipment'), t('coreshop_shipment_no_items'));
                    }
                } else {
                    Ext.Msg.alert(t('error'), res.message);
                }
            }.bind(this)
        });
    },

    getStoreFields: function() {
        return [
            'orderItemId',
            'price',
            'maxToShip',
            'quantity',
            'quantityShipped',
            'toShip',
            'tax',
            'total',
            'name'
        ];
    },

    getGridColumns: function() {
        return [
            {
                xtype: 'gridcolumn',
                flex: 1,
                dataIndex: 'name',
                text: t('coreshop_product')
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'price',
                text: t('coreshop_price'),
                width: 100,
                align: 'right',
                renderer: coreshop.util.format.currency.bind(this, this.order.currency.symbol)
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'quantity',
                text: t('coreshop_quantity'),
                width: 100,
                align: 'right'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'quantityShipped',
                text: t('coreshop_shipped_quantity'),
                width: 120,
                align: 'right'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'toShip',
                text: t('coreshop_quantity_to_ship'),
                width: 100,
                align: 'right',
                field: {
                    xtype: 'numberfield',
                    decimalPrecision: 0
                }
            }
        ];
    },

    createWindow: function(shipAbleItems) {
        var me = this;

        var positionStore = new Ext.data.JsonStore({
            data: shipAbleItems,
            fields: this.getStoreFields()
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');

        var itemsGrid = {
            xtype: 'grid',
            minHeight: 400,
            cls: 'coreshop-order-detail-grid',
            store: positionStore,
            plugins: [rowEditing],
            listeners: {
                validateedit: function (editor, context) {
                    if (context.field === 'toShip') {
                        return context.value <= context.record.data.maxToShip;
                    }

                    return true;
                }
            },
            columns: this.getGridColumns()
        };

        var trackingCode = Ext.create('Ext.form.TextField', {
            fieldLabel: t('coreshop_tracking_code'),
            name: 'trackingCode'
        });

        var panel = Ext.create('Ext.form.Panel', {
            title: t('coreshop_shipment'),
            border: true,
            iconCls: 'coreshop_icon_shipping',
            bodyPadding: 10,
            items: [trackingCode, itemsGrid]
        });

        var window = new Ext.window.Window({
            width: me.width,
            height: me.height,
            resizeable: true,
            modal: true,
            layout: 'fit',
            title: t('coreshop_shipment_create_new') + ' (' + this.order.o_id + ')',
            items: [panel],
            buttons: [
                {
                    text: t('save'),
                    iconCls: 'pimcore_icon_apply',
                    handler: function (btn) {
                        var itemsToShip = [];

                        positionStore.getRange().forEach(function (item) {
                            if (item.get('toShip') > 0) {
                                itemsToShip.push(me.processItemsToShip(item));
                            }
                        });

                        window.setLoading(t('loading'));

                        var data = panel.getForm().getFieldValues();
                        data['id'] = parseInt(this.order.o_id);
                        data['items'] = itemsToShip;

                        Ext.Ajax.request({
                            url: '/admin/coreshop/order-shipment/create-shipment',
                            method: 'post',
                            jsonData: data,
                            success: function (response) {
                                var res = Ext.decode(response.responseText);

                                if (res.success) {
                                    pimcore.helpers.showNotification(t('success'), t('success'), 'success');

                                    if (Ext.isFunction(this.cb)) {
                                        this.cb();
                                    }

                                    window.close();
                                } else {
                                    pimcore.helpers.showNotification(t('error'), t(res.message), 'error');
                                }

                                window.setLoading(false);
                            }.bind(this)
                        });
                    }.bind(this)
                }
            ]
        });

        return window;
    },

    processItemsToShip: function(item) {
        return {
            orderItemId: item.get('orderItemId'),
            quantity: item.get('toShip')
        };
    },

    show: function (shipAbleItems) {
        var grWindow = this.createWindow(shipAbleItems);

        grWindow.show();

        return window;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.createPayment');
coreshop.order.order.createPayment = {

    showWindow: function (id, order, callback) {
        var orderId = id;

        var paymentProvidersStore = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/payment_providers/list',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['id', 'identifier']
        });
        paymentProvidersStore.load();

        var window = new Ext.window.Window({
            width: 380,
            height: 380,
            modal: true,
            resizeable: false,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyStyle: 'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                forceLayout: true,
                fieldDefaults: {
                    labelWidth: 150
                },
                buttons: [
                    {
                        text: t('save'),
                        handler: function (btn) {
                            var form = btn.up('window').down('form').getForm();

                            if (form.isValid()) {
                                var formValues = form.getFieldValues();

                                formValues['o_id'] = orderId;

                                window.setLoading(t('loading'));

                                Ext.Ajax.request({
                                    url: '/admin/coreshop/order-payment/add-payment',
                                    method: 'post',
                                    params: formValues,
                                    callback: function (request, success, response) {
                                        window.setLoading(false);

                                        try {
                                            response = Ext.decode(response.responseText);

                                            if (response.success) {
                                                window.close();
                                                window.destroy();

                                                if (callback) {
                                                    callback(response);
                                                }

                                                //tab.reload(tab.data.currentLayoutId);
                                            } else {
                                                Ext.Msg.alert(t('error'), response.message);
                                            }
                                        }
                                        catch (e) {
                                            Ext.Msg.alert(t('error'), e);
                                        }
                                    }
                                });
                            }
                        },

                        iconCls: 'pimcore_icon_apply'
                    }
                ],
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: t('coreshop_date'),
                        name: 'date',
                        value: new Date(),
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                        ],
                        allowBlank: false
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: t('coreshop_paymentProvider'),
                        typeAhead: true,
                        mode: 'local',
                        listWidth: 100,
                        store: paymentProvidersStore,
                        displayField: 'identifier',
                        valueField: 'id',
                        forceSelection: true,
                        triggerAction: 'all',
                        name: 'paymentProvider',
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                        ],
                        allowBlank: false
                    },
                    {
                        xtype: 'numberfield',
                        name: 'amount',
                        fieldLabel: t('coreshop_amount'),
                        decimalPrecision: 4,
                        afterLabelTextTpl: [
                            '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                        ],
                        allowBlank: false
                    }
                ]
            }]
        });

        window.show();
    }

};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.editPayment');
coreshop.order.order.editPayment = {

    showWindow: function (payment, callback) {
        var window = new Ext.window.Window({
            width: 600,
            height: 450,
            resizeable: false,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyStyle: 'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                forceLayout: true,
                fieldDefaults: {
                    labelWidth: 150
                },
                buttons: [
                    {
                        text: t('OK'),
                        handler: function (btn) {
                            window.close();
                            window.destroy();
                        },
                        iconCls: 'pimcore_icon_apply'
                    }
                ],
                items: [
                    {
                        xtype: 'datefield',
                        format: 'd.m.Y H:i',
                        altFormats: 'U',
                        fieldLabel: t('coreshop_date'),
                        name: 'date',
                        disabled: true,
                        value: payment.get('datePayment')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_payment_number'),
                        disabled: true,
                        value: payment.get('paymentNumber')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_paymentProvider'),
                        disabled: true,
                        value: payment.get('provider')
                    },
                    {
                        xtype: 'numberfield',
                        name: 'total_amount',
                        fieldLabel: t('coreshop_amount'),
                        disabled: true,
                        value: payment.get('amount') / 100
                    },
                    {
                        xtype: 'gridpanel',
                        title: t('details'),
                        viewConfig: {
                        enableTextSelection: true
                        },
                        store: new Ext.data.ArrayStore({
                            data: payment.get('details'),
                            fields: ['name', 'value']
                        }),
                        columns: [
                            {
                                text: 'Name',
                                dataIndex: 'name',
                                flex: 1
                            },
                            {
                                text: 'Value',
                                dataIndex: 'value',
                                flex: 2,
                                renderer: function arg(val, test, test2){
                                    return '<div style="white-space: normal;">' + val + '</div>';
                                }
                            }
                        ]
                    }
                ]
            }]
        });

        window.show();
    }

};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.editShipment');
coreshop.order.order.editShipment = {

    showWindow: function (shipment, callback) {
        var window = new Ext.window.Window({
            width: 600,
            height: 450,
            resizeable: false,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyStyle: 'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                forceLayout: true,
                anchor: '100%',
                fieldDefaults: {
                    labelWidth: 150
                },
                buttons: [
                    {
                        text: t('OK'),
                        handler: function (btn) {
                            window.close();
                            window.destroy();
                        },
                        iconCls: 'pimcore_icon_apply'
                    }
                ],
                items: [
                    {
                        xtype: 'datefield',
                        format: 'd.m.Y H:i',
                        altFormats: 'U',
                        fieldLabel: t('coreshop_date'),
                        name: 'date',
                        disabled: true,
                        value: shipment.get('shipmentDate')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_shipment_number'),
                        name: 'shipmentNumber',
                        disabled: true,
                        value: shipment.get('shipmentNumber')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_tracking_code'),
                        name: 'trackingCode',
                        disabled: true,
                        value: shipment.get('trackingCode')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_weight'),
                        name: 'weight',
                        disabled: true,
                        value: shipment.get('weight')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_carrier'),
                        disabled: true,
                        value: shipment.get('carrierName')
                    },
                    {
                        xtype: 'button',
                        fieldLabel: '',
                        style: 'margin: 5px 0;',
                        tooltip: t('open'),
                        handler: function (widgetColumn) {
                            pimcore.helpers.openObject(shipment.get('o_id'), 'object');
                            window.close();
                        },
                        listeners: {
                            beforerender: function (widgetColumn) {
                                widgetColumn.setText(Ext.String.format(t('coreshop_open_order_shipment'), shipment.get('shipmentNumber')));
                            }
                        }
                    },
                    {
                        xtype: 'gridpanel',
                        title: t('coreshop_products'),
                        editable: true,
                        store: new Ext.data.JsonStore({
                            data: shipment.get('items'),
                            fields: ['_itemName', 'quantity']
                        }),
                        columns: [
                            {text: 'Item', dataIndex: '_itemName', flex: 2 },
                            {text: 'Quantity', dataIndex: 'quantity', flex: 1 }
                        ]
                    }
                ]
            }]
        });

        window.show();
    }

};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.editInvoice');
coreshop.order.order.editInvoice = {

    showWindow: function (invoice, currency, callback) {
        var window = new Ext.window.Window({
            width: 600,
            height: 450,
            resizeable: false,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                bodyStyle: 'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                forceLayout: true,
                fieldDefaults: {
                    labelWidth: 150
                },
                buttons: [
                    {
                        text: t('OK'),
                        handler: function (btn) {
                            window.close();
                            window.destroy();
                        },
                        iconCls: 'pimcore_icon_apply'
                    }
                ],
                items: [
                    {
                        xtype: 'datefield',
                        format: 'd.m.Y H:i',
                        altFormats: 'U',
                        fieldLabel: t('coreshop_date'),
                        name: 'date',
                        disabled: true,
                        value: invoice.get('invoiceDate')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('coreshop_invoice_number'),
                        disabled: true,
                        value: invoice.get('invoiceNumber')
                    },
                    {
                        xtype: 'textfield',
                        name: 'amount',
                        fieldLabel: t('coreshop_total_without_tax'),
                        disabled: true,
                        value: invoice.get('totalNet') / 100,
                        renderer: coreshop.util.format.currency.bind(this, currency.symbol)
                    },
                    {
                        xtype: 'textfield',
                        name: 'amount',
                        fieldLabel: t('coreshop_total'),
                        disabled: true,
                        value: invoice.get('totalGross') / 100,
                        renderer: coreshop.util.format.currency.bind(this, currency.symbol)
                    },
                    {
                        xtype: 'button',
                        fieldLabel: '',
                        style: 'margin: 5px 0;',
                        tooltip: t('open'),
                        handler: function (widgetColumn) {
                            pimcore.helpers.openObject(invoice.get('o_id'), 'object');

                            window.close();
                        },
                        listeners: {
                            beforerender: function (widgetColumn) {
                                widgetColumn.setText(Ext.String.format(t('coreshop_open_order_invoice'), invoice.get('invoiceNumber')));
                            }
                        }
                    },
                    {
                        xtype: 'gridpanel',
                        title: t('details'),
                        store: new Ext.data.JsonStore({
                            data: invoice.get('items'),
                            fields: ['_itemName', 'quantity']
                        }),
                        columns: [
                            {text: 'Item', dataIndex: '_itemName', flex: 2 },
                            {text: 'Quantity', dataIndex: 'quantity', flex: 1 }
                        ]
                    }
                ]
            }]
        });

        window.show();
    }

};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.invoice.render');
coreshop.invoice.render = Class.create({
    initialize: function (element) {
        this.panels = [];
        this.element = element;
    },

    getLayout: function () {
        if (!this.layout) {
            // create new panel
            this.layout = new Ext.Panel({
                title: t('coreshop_order_pdf'),
                iconCls: 'coreshop_icon_orders_invoice_pdf',
                border: false,
                layout: 'border',
                items: []
            });
        }

        return this.layout;
    },

    reload: function () {
        this.layout.add(this.loadDocument(this.element.id));
    },

    loadDocument: function (invoiceId) {
        var frameUrl = '/admin/coreshop/order-invoice/render?id=' + invoiceId;

        if (Ext.isFunction(pimcore.helpers.addCsrfTokenToUrl)) {
            frameUrl = pimcore.helpers.addCsrfTokenToUrl(frameUrl);
        }

        //check for native/plugin PDF viewer
        if (this.hasNativePDFViewer()) {
            frameUrl += '&native-viewer=true';
        }

        var editPanel = new Ext.Panel({
            bodyCls: 'pimcore_overflow_scrolling',
            html: '<iframe src="' + frameUrl + '" frameborder="0" id="coreshop_invoice_preview_' + invoiceId + '"></iframe>',
            region: 'center'
        });
        editPanel.on('resize', function (el, width, height, rWidth, rHeight) {
            Ext.get('coreshop_invoice_preview_' + invoiceId).setStyle({
                width: width + 'px',
                height: (height) + 'px'
            });
        }.bind(this));

        return editPanel;
    },

    hasNativePDFViewer: function () {

        var getActiveXObject = function (name) {
            try {
                return new ActiveXObject(name);
            } catch (e) {
            }
        };

        var getNavigatorPlugin = function (name) {
            for (key in navigator.plugins) {
                var plugin = navigator.plugins[key];
                if (plugin.name == name) return plugin;
            }
        };

        var getPDFPlugin = function () {
            return this.plugin = this.plugin || (function () {
                    if (typeof window['ActiveXObject'] != 'undefined') {
                        return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
                    } else {
                        return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
                    }
                })();
        };

        return !!getPDFPlugin();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shipment.render');
coreshop.shipment.render = Class.create({
    initialize: function (element) {
        this.panels = [];
        this.element = element;
    },

    getLayout: function () {
        if (!this.layout) {
            // create new panel
            this.layout = new Ext.Panel({
                title: t('coreshop_shipment_pdf'),
                iconCls: 'coreshop_icon_orders_shipment_pdf',
                border: false,
                layout: 'border',
                items: []
            });
        }

        return this.layout;
    },

    reload: function () {
        this.layout.add(this.loadDocument(this.element.id));
    },

    loadDocument: function (shipmentId) {
        var frameUrl = '/admin/coreshop/order-shipment/render?id=' + shipmentId;

        if (Ext.isFunction(pimcore.helpers.addCsrfTokenToUrl)) {
            frameUrl = pimcore.helpers.addCsrfTokenToUrl(frameUrl);
        }

        //check for native/plugin PDF viewer
        if (this.hasNativePDFViewer()) {
            frameUrl += '&native-viewer=true';
        }

        var editPanel = new Ext.Panel({
            bodyCls: 'pimcore_overflow_scrolling',
            html: '<iframe src="' + frameUrl + '" frameborder="0" id="coreshop_shipment_preview_' + shipmentId + '"></iframe>',
            region: 'center'
        });
        editPanel.on('resize', function (el, width, height, rWidth, rHeight) {
            Ext.get('coreshop_shipment_preview_' + shipmentId).setStyle({
                width: width + 'px',
                height: (height) + 'px'
            });
        }.bind(this));

        return editPanel;
    },

    hasNativePDFViewer: function () {

        var getActiveXObject = function (name) {
            try {
                return new ActiveXObject(name);
            } catch (e) {
            }
        };

        var getNavigatorPlugin = function (name) {
            for (key in navigator.plugins) {
                var plugin = navigator.plugins[key];
                if (plugin.name == name) return plugin;
            }
        };

        var getPDFPlugin = function () {
            return this.plugin = this.plugin || (function () {
                    if (typeof window['ActiveXObject'] != 'undefined') {
                        return getActiveXObject('AcroPDF.PDF') || getActiveXObject('PDF.PdfCtrl');
                    } else {
                        return getNavigatorPlugin('Adobe Acrobat') || getNavigatorPlugin('Chrome PDF Viewer') || getNavigatorPlugin('WebKit built-in PDF');
                    }
                })();
        };

        return !!getPDFPlugin();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.order.state.changeState');
coreshop.order.order.state.changeState = {

    showWindow: function (url, id, transitions, callback) {
        var buttons = [],
            window;

        Ext.Array.each(transitions, function (transitionInfo) {
            buttons.push({
                xtype: 'button',
                text: transitionInfo.label,
                border: 0,
                style: 'background-color:#524646;border-left:10px solid ' + transitionInfo.color + ' !important;',
                handler: function (btn) {
                    btn.setDisabled(true);
                    Ext.Ajax.request({
                        url: url,
                        params: {
                            id: id,
                            transition: transitionInfo.transition
                        },
                        success: function (response) {
                            var res = Ext.decode(response.responseText);
                            if (res.success) {
                                window.close();
                                window.destroy();
                                if (callback) {
                                    callback(res);
                                }
                            } else {
                                Ext.Msg.alert(t('error'), res.message);
                            }
                        }.bind(this),
                        failure: function (response) {
                            btn.setDisabled(false);
                        }.bind(this)
                    });
                }
            });
        });

        window = new Ext.window.Window({
            width: 450,
            height: 170,
            modal: true,
            resizeable: false,
            title: t('coreshop_change_state'),
            layout: 'fit',
            items: [{
                xtype: 'label',
                margin: '20 0 20 20',
                border: 0,
                text: t('coreshop_change_state_description')
            },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '30 20 20 20',
                    border: 0,
                    style: {
                        border: 0
                    },
                    items: buttons
                }]
        });

        window.show();
    }

};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.quote.list');
coreshop.order.quote.list = Class.create(coreshop.order.sale.list, {
    type: 'quote',

    setupContextMenuPlugin: function () {
        this.contextMenuPlugin = new coreshop.pimcore.plugin.grid(
            'coreshop_quote',
            function (id) {
                this.open(id);
            }.bind(this),
            [coreshop.class_map.coreshop.quote],
            this.getGridPaginator()
        );
    },

    open: function (id, callback) {
        coreshop.order.helper.openQuote(id, callback);
    }
});




/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.quote.detail.panel');
coreshop.order.quote.detail.panel = Class.create(coreshop.order.sale.detail.panel, {
    type: 'quote'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.quote.create');
pimcore.registerNS('coreshop.order.quote.create.panel');
coreshop.order.quote.create.panel = Class.create(coreshop.order.sale.create.panel, {
    type: 'quote'
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCartPriceRule');
pimcore.object.tags.coreShopCartPriceRule = Class.create(coreshop.object.tags.select, {

    type: 'coreShopCartPriceRule',
    storeName: 'coreshop_cart_price_rules'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCartPriceRule');
pimcore.object.classes.data.coreShopCartPriceRule = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopCartPriceRule',

    getTypeName: function () {
        return t('coreshop_priceRule');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_priceRule';
    }
});



pimcore.registerNS('pimcore.object.gridcolumn.operator.coreshop_order_state');

pimcore.object.gridcolumn.operator.coreshop_order_state = Class.create(pimcore.object.gridcolumn.Abstract, {
    type: 'operator',
    class: 'coreshop_order_state',
    iconCls: 'coreshop_icon_operator_orderstate',
    defaultText: 'coreshop_operator_orderstate',
    group: 'coreshop',

    getConfigTreeNode: function (configAttributes) {
        if (configAttributes) {
            var nodeLabel = this.getNodeLabel(configAttributes);
            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: nodeLabel,
                configAttributes: configAttributes,
                isTarget: true,
                isChildAllowed: this.allowChild,
                expanded: true,
                leaf: false,
                expandable: false
            };
        } else {

            //For building up operator list
            var configAttributes = {type: this.type, class: this.class};

            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: t(this.defaultText),
                configAttributes: configAttributes,
                isTarget: true,
                leaf: true,
                isChildAllowed: this.allowChild
            };
        }
        node.isOperator = true;
        return node;
    },


    getCopyNode: function (source) {
        var copy = source.createNode({
            iconCls: this.iconCls,
            text: source.data.text,
            isTarget: true,
            leaf: false,
            expandable: false,
            isOperator: true,
            isChildAllowed: this.allowChild,
            configAttributes: {
                label: source.data.text,
                type: this.type,
                class: this.class
            }
        });

        return copy;
    },

    getConfigDialog: function (node) {
        this.node = node;

        this.textField = new Ext.form.TextField({
            fieldLabel: t('label'),
            length: 255,
            width: 200,
            value: this.node.data.configAttributes.label
        });

        var options = {
            fieldLabel: t('coreshop_operator_orderstate_highlight'),
            width: 200,
            padding: 10,
            value: this.node.data.configAttributes.highlightLabel
        };

        this.highlightLabelField = new Ext.form.Checkbox(options);

        this.configPanel = new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding: 10px;',
            items: [this.textField, this.highlightLabelField],
            buttons: [{
                text: t('apply'),
                iconCls: 'pimcore_icon_apply',
                handler: function () {
                    this.commitData();
                }.bind(this)
            }]
        });

        this.window = new Ext.Window({
            width: 400,
            height: 200,
            modal: true,
            title: t('localeswitcher_operator_settings'),
            layout: 'fit',
            items: [this.configPanel]
        });

        this.window.show();
        return this.window;
    },

    commitData: function () {
        this.node.data.configAttributes.label = this.textField.getValue();
        this.node.data.configAttributes.highlightLabel = this.highlightLabelField.getValue();

        var nodeLabel = this.getNodeLabel(this.node.data.configAttributes);
        this.node.set('text', nodeLabel);
        this.node.set('isOperator', true);

        this.window.close();
    },

    allowChild: function (targetNode, dropNode) {
        if (targetNode.childNodes.length > 0) {
            return false;
        }
        return true;
    },

    getNodeLabel: function (configAttributes) {
        return configAttributes.label;
    }
});



pimcore.registerNS('pimcore.object.gridcolumn.operator.coreshop_price_formatter');

pimcore.object.gridcolumn.operator.coreshop_price_formatter = Class.create(pimcore.object.gridcolumn.Abstract, {
    type: 'operator',
    class: 'coreshop_price_formatter',
    iconCls: 'coreshop_icon_operator_priceformatter',
    defaultText: 'coreshop_operator_priceformatter',
    group: 'coreshop',

    getConfigTreeNode: function (configAttributes) {
        if (configAttributes) {
            var nodeLabel = this.getNodeLabel(configAttributes);
            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: nodeLabel,
                configAttributes: configAttributes,
                isTarget: true,
                isChildAllowed: this.allowChild,
                expanded: true,
                leaf: false,
                expandable: false
            };
        } else {

            //For building up operator list
            var configAttributes = {type: this.type, class: this.class};

            var node = {
                draggable: true,
                iconCls: this.iconCls,
                text: t(this.defaultText),
                configAttributes: configAttributes,
                isTarget: true,
                leaf: true,
                isChildAllowed: this.allowChild
            };
        }
        node.isOperator = true;
        return node;
    },


    getCopyNode: function (source) {
        var copy = source.createNode({
            iconCls: this.iconCls,
            text: source.data.text,
            isTarget: true,
            leaf: false,
            expandable: false,
            isOperator: true,
            isChildAllowed: this.allowChild,
            configAttributes: {
                label: source.data.text,
                type: this.type,
                class: this.class
            }
        });

        return copy;
    },

    getConfigDialog: function (node) {
        this.node = node;

        this.textField = new Ext.form.TextField({
            fieldLabel: t('label'),
            length: 255,
            width: 200,
            value: this.node.data.configAttributes.label
        });

        this.configPanel = new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding: 10px;',
            items: [this.textField],
            buttons: [{
                text: t('apply'),
                iconCls: 'pimcore_icon_apply',
                handler: function () {
                    this.commitData();
                }.bind(this)
            }]
        });

        this.window = new Ext.Window({
            width: 400,
            height: 200,
            modal: true,
            title: t('localeswitcher_operator_settings'),
            layout: 'fit',
            items: [this.configPanel]
        });

        this.window.show();
        return this.window;
    },

    commitData: function () {
        this.node.data.configAttributes.label = this.textField.getValue();

        var nodeLabel = this.getNodeLabel(this.node.data.configAttributes);
        this.node.set('text', nodeLabel);
        this.node.set('isOperator', true);

        this.window.close();
    },

    allowChild: function (targetNode, dropNode) {
        if (targetNode.childNodes.length > 0) {
            return false;
        }
        return true;
    },

    getNodeLabel: function (configAttributes) {
        return configAttributes.label;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.customer.resource');
coreshop.customer.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_customergroups', 'coreshop/customer_groups');

        coreshop.broker.fireEvent('resource.register', 'coreshop.customer', this);
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.customer.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.resource');
coreshop.product.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.broker.fireEvent('resource.register', 'coreshop.product', this);
    },

    openResource: function (item) {
        if (item === 'product_price_rule') {
            this.openProductPriceRule();
        }
    },

    openProductPriceRule: function () {
        try {
            pimcore.globalmanager.get('coreshop_product_price_rule_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_product_price_rule_panel', new coreshop.product.pricerule.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.product.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.panel');
coreshop.product.pricerule.panel = Class.create(coreshop.rules.panel, {
    /**
     * @var string
     */
    layoutId: 'coreshop_product_price_rule_panel',
    storeId: 'coreshop_product_price_rule',
    iconCls: 'coreshop_icon_price_rule',
    type: 'coreshop_product_pricerules',

    /**
     * @var array
     */
    conditions: [],

    /**
     * @var array
     */
    actions: [],
    
    /**
     * constructor
     */
    initialize: function () {
        var me = this;

        Ext.Ajax.request({
            url: '/admin/coreshop/product_price_rules/get-config',
            method: 'GET',
            success: function (result) {
                var config = Ext.decode(result.responseText);
                me.conditions = config.conditions;
                me.actions = config.actions;
            }
        });

        this.url = {
            add: '/admin/coreshop/product_price_rules/add',
            delete: '/admin/coreshop/product_price_rules/delete',
            get: '/admin/coreshop/product_price_rules/get',
            list: '/admin/coreshop/product_price_rules/list'
        };

        this.panels = [];
        this.store = new Ext.data.Store({
            idProperty: 'id',
            fields: [
                {name: 'id'},
                {name: 'name'}
            ],
            proxy: {
                type: 'ajax',
                url: this.url.list,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        this.getLayout();
    },

    getGridConfiguration: function () {
        return {
            store: this.store
        };
    },

    getItemClass: function () {
        return coreshop.product.pricerule.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.item');
coreshop.product.pricerule.item = Class.create(coreshop.rules.item, {

    iconCls: 'coreshop_icon_price_rule',

    url: {
        save: '/admin/coreshop/product_price_rules/save'
    },

    getSettings: function () {
        var data = this.data;

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: t('name'),
                width: 250,
                value: data.name
            }, {
                xtype: 'checkbox',
                name: 'active',
                fieldLabel: t('active'),
                checked: this.data.active
            }]
        });

        return this.settingsForm;
    },

    getPanel: function () {
        this.panel = new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: this.getItems()
        });

        return this.panel;
    },

    getActionContainerClass: function () {
        return coreshop.product.pricerule.action;
    },

    getConditionContainerClass: function () {
        return coreshop.product.pricerule.condition;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.action');
coreshop.product.pricerule.action = Class.create(coreshop.rules.action, {
    getActionClassNamespace: function () {
        return coreshop.product.pricerule.actions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule..condition');
coreshop.product.pricerule.condition = Class.create(coreshop.rules.condition, {
    getConditionClassNamespace: function () {
        return coreshop.product.pricerule.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.nested');
coreshop.product.pricerule.conditions.nested = Class.create(coreshop.rules.conditions.nested, {

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.timespan');
coreshop.product.pricerule.conditions.timespan = Class.create(coreshop.rules.conditions.abstract, {
    type: 'timespan',

    getForm: function () {

        var me = this;

        var dateFrom = {
            itemCls: 'object_field',
            width: 160,
            value: new Date()
        };

        var dateTo = {
            itemCls: 'object_field',
            width: 160,
            value: new Date()
        };

        var timeFrom = {
            format: 'H:i',
            emptyText: '',
            width: 120,
            value: Ext.Date.format(new Date(), 'H:i')
        };

        var timeTo = {
            format: 'H:i',
            emptyText: '',
            width: 120,
            value: Ext.Date.format(new Date(), 'H:i')
        };

        if (this.data) {
            if (this.data.dateFrom) {
                var tmpDateFrom = new Date(intval(this.data.dateFrom));
                dateFrom.value = tmpDateFrom;
                timeFrom.value = Ext.Date.format(tmpDateFrom, 'H:i');
            }

            if (this.data.dateTo) {
                var tmpDateTo = new Date(intval(this.data.dateTo));
                dateTo.value = tmpDateTo;
                timeTo.value = Ext.Date.format(tmpDateTo, 'H:i');
            }
        }


        this.dateFromField = new Ext.form.DateField(dateFrom);
        this.timeFromField = new Ext.form.TimeField(timeFrom);

        this.dateToField = new Ext.form.DateField(dateTo);
        this.timeToField = new Ext.form.TimeField(timeTo);

        this.dateFromFieldContainer = new Ext.form.FieldContainer({
            xtype: 'fieldcontainer',
            fieldLabel: t('coreshop_condition_timespan_dateFrom'),
            combineErrors: true,
            layout: 'hbox',
            items: [this.dateFromField, this.timeFromField],
            itemCls: 'object_field',
            name: 'dateFrom',
            getValue: function () {
                if (me.dateFromField.getValue()) {
                    var date = new Date(me.dateFromField.getValue());
                    var dateString = Ext.Date.format(date, 'Y-m-d');

                    if (me.timeFromField.getValue()) {
                        dateString += ' ' + Ext.Date.format(new Date(me.timeFromField.getValue()), 'H:i');
                    } else {
                        dateString += ' 00:00';
                    }

                    return Ext.Date.parseDate(dateString, 'Y-m-d H:i').getTime();
                }
            }.bind(this),
            getName: function () {
                return 'dateFrom';
            }
        });

        this.dateToFieldContainer = new Ext.form.FieldContainer({
            xtype: 'fieldcontainer',
            fieldLabel: t('coreshop_condition_timespan_dateTo'),
            combineErrors: true,
            layout: 'hbox',
            items: [this.dateToField, this.timeToField],
            itemCls: 'object_field',
            name: 'dateTo',
            getValue: function () {
                if (me.dateToField.getValue()) {
                    var date = new Date(me.dateToField.getValue());
                    var dateString = Ext.Date.format(date, 'Y-m-d');

                    if (me.timeToField.getValue()) {
                        dateString += ' ' + Ext.Date.format(new Date(me.timeToField.getValue()), 'H:i');
                    } else {
                        dateString += ' 00:00';
                    }

                    return Ext.Date.parseDate(dateString, 'Y-m-d H:i').getTime();
                }
            }.bind(this),
            getName: function () {
                return 'dateTo';
            }
        });

        this.form = new Ext.form.Panel({
            items: [
                this.dateFromFieldContainer, this.dateToFieldContainer
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            dateTo: this.dateToFieldContainer.getValue(),
            dateFrom: this.dateFromFieldContainer.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.weight');
coreshop.product.pricerule.conditions.weight = Class.create(coreshop.rules.conditions.abstract, {

    type: 'weight',

    getForm: function () {
        var minWeightValue = null;
        var maxWeightValue = 0;

        if (this.data && this.data.minWeight) {
            minWeightValue = this.data.minWeight;
        }

        if (this.data && this.data.maxWeight) {
            maxWeightValue = this.data.maxWeight;
        }

        var minWeight = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_weight_minWeight'),
            name: 'minWeight',
            value: minWeightValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        var maxWeight = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_weight_maxWeight'),
            name: 'maxWeight',
            value: maxWeightValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        this.form = Ext.create('Ext.form.Panel', {
            items: [
                minWeight, maxWeight
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.actions.discountAmount');
coreshop.product.pricerule.actions.discountAmount = Class.create(coreshop.rules.actions.abstract, {

    type: 'discountAmount',

    getForm: function () {
        var amountValue = 0;
        var currency = null;

        if (this.data) {
            amountValue = this.data.amount / 100;
            currency = this.data.currency;
        }

        var amount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discountAmount_amount'),
            name: 'amount',
            value: amountValue,
            decimalPrecision: 2
        });

        this.form = new Ext.form.Panel({
            items: [
                amount,
                {
                    xtype: 'coreshop.currency',
                    value: currency
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.actions.discountPercent');

coreshop.product.pricerule.actions.discountPercent = Class.create(coreshop.rules.actions.abstract, {

    type: 'discountPercent',

    getForm: function () {
        var percentValue = 0;
        var me = this;

        if (this.data) {
            percentValue = this.data.percent;
        }

        var percent = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discountPercent_percent'),
            name: 'percent',
            value: percentValue,
            minValue: 0,
            maxValue: 100,
            decimalPrecision: 0
        });
        this.form = new Ext.form.Panel({
            items: [
                percent
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.actions.price');
coreshop.product.pricerule.actions.price = Class.create(coreshop.rules.actions.abstract, {

    type: 'price',

    getForm: function () {
        var priceValue = 0;
        var currency = null;

        if (this.data) {
            priceValue = this.data.price / 100;
            currency = this.data.currency;
        }

        var price = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_price'),
            name: 'price',
            value: priceValue,
            decimalPrecision: 2
        });

        this.form = new Ext.form.Panel({
            items: [
                price,
                {
                    xtype: 'coreshop.currency',
                    value: currency
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.actions.discountPrice');
coreshop.product.pricerule.actions.discountPrice = Class.create(coreshop.product.pricerule.actions.price, {
    type: 'discountPrice'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.action');
coreshop.product.specificprice.action = Class.create(coreshop.rules.action, {
    getActionClassNamespace: function () {
        return coreshop.product.specificprice.actions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.condition');
coreshop.product.specificprice.condition = Class.create(coreshop.rules.condition, {
    getConditionClassNamespace: function () {
        return coreshop.product.specificprice.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.actions.price');
coreshop.product.specificprice.actions.price = Class.create(coreshop.product.pricerule.actions.price, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.actions.discountPrice');
coreshop.product.specificprice.actions.discountPrice = Class.create(coreshop.product.pricerule.actions.discountPrice, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.actions.discountPercent');
coreshop.product.specificprice.actions.discountPercent = Class.create(coreshop.product.pricerule.actions.discountPercent, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.actions.discountAmount');
coreshop.product.specificprice.actions.discountAmount = Class.create(coreshop.product.pricerule.actions.discountAmount, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.nested');
coreshop.product.specificprice.conditions.nested = Class.create(coreshop.product.pricerule.conditions.nested, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.timespan');
coreshop.product.specificprice.conditions.timespan = Class.create(coreshop.product.pricerule.conditions.timespan, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.object');
pimcore.registerNS('coreshop.product.specificprice.object.item');
coreshop.product.specificprice.object.item = Class.create(coreshop.rules.item, {

    iconCls: 'coreshop_icon_price_rule',

    getPanel: function () {
        this.panel = new Ext.TabPanel({
            activeTab: 0,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            items: this.getItems(),
            listeners: {
                added: function (panel) {
                    panel.setTitle(this.generatePanelTitle(this.data.name, this.data.active));
                }.bind(this)
            }
        });

        return this.panel;
    },

    generatePanelTitle: function (title, active) {
        var data = [title];
        if (active === false) {
            data.push('<span class="pimcore_rule_disabled standalone"></span>')
        }

        return data.join(' ');
    },

    initPanel: function () {
        this.panel = this.getPanel();
        this.parentPanel.getTabPanel().add(this.panel);
        this.parentPanel.getTabPanel().setActiveTab(this.panel);
    },

    getActionContainerClass: function () {
        return coreshop.product.specificprice.action;
    },

    getConditionContainerClass: function () {
        return coreshop.product.specificprice.condition;
    },

    getSettings: function () {
        var data = this.data;

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: t('name'),
                width: 250,
                value: data.name,
                enableKeyEvents: true,
                listeners: {
                    keyup: function(field) {
                        var activeField = field.up('form').getForm().findField('active');
                        this.panel.setTitle(this.generatePanelTitle(field.getValue(), activeField.getValue()));
                    }.bind(this)
                }
            }, {
                xtype: 'numberfield',
                name: 'priority',
                fieldLabel: t('coreshop_priority'),
                value: this.data.priority ? this.data.priority : 0,
                width: 250
            }, {
                xtype: 'checkbox',
                name: 'inherit',
                fieldLabel: t('coreshop_inherit'),
                hidden: true, // currently not implemented
                checked: this.data.inherit == '1'
            }, {
                xtype: 'checkbox',
                name: 'active',
                fieldLabel: t('active'),
                checked: this.data.active,
                listeners: {
                    change: function(field, state) {
                        var nameField = field.up('form').getForm().findField('name');
                        this.panel.setTitle(this.generatePanelTitle(nameField.getValue(), field.getValue()));
                    }.bind(this)
                }
            }]
        });

        return this.settingsForm;
    },

    getSaveData: function () {
        if (this.settingsForm.getEl()) {
            saveData = this.settingsForm.getForm().getFieldValues();
            saveData['conditions'] = this.conditions.getConditionsData();
            saveData['actions'] = this.actions.getActionsData();

            if (this.data.id) {
                saveData['id'] = this.data.id;
            }

            return saveData;
        }

        return {};
    },

    isDirty: function () {
        if (this.settingsForm.form.monitor && this.settingsForm.getForm().isDirty()) {
            return true;
        }

        if (this.conditions.isDirty()) {
            return true;
        }

        return !!this.actions.isDirty();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopProductSpecificPriceRules');
pimcore.object.classes.data.coreShopProductSpecificPriceRules = Class.create(coreshop.object.classes.data.data, {

    type: 'coreShopProductSpecificPriceRules',
    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: false,
        fieldcollection: false,
        localizedfield: false
    },

    initialize: function (treeNode, initData) {
        this.initData(initData);

        this.treeNode = treeNode;
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();

        return this.layout;
    },

    getTypeName: function () {
        return t('coreshop_product_specific_price_rules');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_product_specific_price_rules';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopProductSpecificPriceRules');
pimcore.object.tags.coreShopProductSpecificPriceRules = Class.create(pimcore.object.tags.abstract, {

    type: 'coreShopProductSpecificPriceRules',
    panels: [],

    /**
     * @var array
     */
    conditions: [],

    /**
     * @var array
     */
    actions: [],

    dirty: false,

    initialize: function (data, fieldConfig) {
        this.data = data.rules;
        this.fieldConfig = fieldConfig;
        this.panels = [];
        this.conditions = data.conditions;
        this.actions = data.actions;
    },

    getGridColumnConfig: function (field) {
        return {
            header: ts(field.label), width: 150, sortable: false, dataIndex: field.key,
            renderer: function (key, value, metaData, record) {
                this.applyPermissionStyle(key, value, metaData, record);

                return t('not_supported');
            }.bind(this, field.key)
        };
    },

    getLayoutEdit: function () {
        this.component = this.getEditLayout();

        return this.component;
    },

    getLayoutShow: function () {

        this.component = this.getLayoutEdit();

        this.component.on('afterrender', function () {
            this.component.disable();
        }.bind(this));


        return this.component;
    },

    getName: function () {
        return this.fieldConfig.name;
    },

    getEditLayout: function () {
        if (!this.layout) {
            // create new panel
            this.layout = new Ext.Panel({
                //id: this.layoutId,
                title: this.getTitle(),
                //iconCls: this.iconCls,
                layout: 'fit',
                items: [this.getTabPanel()],
                tools: [
                    {
                        type: 'coreshop-add',
                        tooltip: t('add'),
                        handler: function () {
                            this.panels.push(new coreshop.product.specificprice.object.item(this, {}, -1, 'productSpecificPriceRule'));
                        }.bind(this)
                    }
                ]
            });

            this.showPriceRules();
        }

        return this.layout;
    },

    showPriceRules: function () {
        Ext.each(this.data, function (data) {
            var panel = new coreshop.product.specificprice.object.item(this, data, data.id, 'productSpecificPriceRule');

            this.panels.push(panel);

            panel.panel.on('beforedestroy', function () {
                var index = this.panels.indexOf(panel);
                this.panels.splice(index, 1);

                this.dirty = true;
            }.bind(this));
        }.bind(this));

        if (this.panels.length > 0) {
            this.getTabPanel().setActiveItem(this.panels[0].panel);
        }
    },

    getTabPanel: function () {
        if (!this.panel) {
            this.panel = new Ext.TabPanel({
                region: 'center',
                border: false
            });
        }

        return this.panel;
    },

    getValue: function () {
        if (this.isRendered()) {
            var data = [];

            Ext.each(this.panels, function (panel) {
                data.push(panel.getSaveData());
            });

            return data;
        }
    },

    isDirty: function () {
        for (var i = 0; i < this.panels.length; i++) {
            if (this.panels[i].isDirty()) {
                return true;
            }
        }

        return this.dirty;
    },

    getActions: function () {
        return this.actions;
    },

    getConfig: function () {
        return this.config;
    },

    getConditions: function () {
        return this.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.address.resource');
coreshop.address.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_zones', 'coreshop/zones', [
            {name: 'id'},
            {name: 'name'},
            {name: 'active'}
        ]);
        coreshop.global.addStore('coreshop_countries', 'coreshop/countries', null, 'name');
        coreshop.global.addStore('coreshop_countries_active', 'coreshop/countries', null, 'name');
        coreshop.global.addStore('coreshop_states', 'coreshop/states');

        pimcore.globalmanager.get('coreshop_countries_active').addFilter({
            property: 'active',
            value: true
        });

        pimcore.globalmanager.get('coreshop_countries').load();
        pimcore.globalmanager.get('coreshop_countries_active').load();
        pimcore.globalmanager.get('coreshop_states').load();
        pimcore.globalmanager.get('coreshop_zones').load();

        coreshop.broker.fireEvent('resource.register', 'coreshop.address', this);
    },

    openResource: function (item) {
        if (item === 'country') {
            this.openCountryResource();
        } else if (item === 'state') {
            this.openStateResource();
        } else if (item === 'zone') {
            this.openZoneResource();
        }
    },

    openCountryResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_countries_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_countries_panel', new coreshop.country.panel());
        }
    },

    openZoneResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_zones_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_zones_panel', new coreshop.zone.panel());
        }
    },

    openStateResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_states_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_states_panel', new coreshop.state.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.address.resource();
});


Ext.define('CoreShop.store.Country', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.country',

    name: 'country',
    fieldLabel: t('coreshop_country'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_countries');

        this.callParent();
    }
});


Ext.define('CoreShop.store.State', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.state',

    name: 'state',
    fieldLabel: t('coreshop_state'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_states');

        this.callParent();
    }
});


Ext.define('CoreShop.store.Zone', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.zone',

    name: 'zone',
    fieldLabel: t('coreshop_zone'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_zones');

        this.callParent();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.country.item');
coreshop.country.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_country',

    url: {
        save: '/admin/coreshop/countries/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {
        var data = this.data,
            langTabs = [],
            salutationsStore = Ext.create('Ext.data.ArrayStore', {
                fields: ['name']
            });

        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var tab = {
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'translations.' + lang + '.name',
                    fieldLabel: t('name'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].name : ''
                }]
            };

            langTabs.push(tab);
        });

        var items = [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                defaults: {
                    autoHeight: true,
                    bodyStyle: 'padding:10px;'
                },
                width: '100%',
                items: langTabs
            },
            {
                fieldLabel: t('coreshop_country_isoCode'),
                name: 'isoCode',
                value: data.isoCode
            },
            {
                xtype: 'checkbox',
                fieldLabel: t('active'),
                name: 'active',
                inputValue: true,
                uncheckedValue: false,
                value: data.active
            },
            {
                xtype: 'coreshop.zone',
                value: data.zone
            },
            {
                fieldLabel: t('coreshop_country_addressFormat'),
                xtype: 'textarea',
                name: 'addressFormat',
                value: data.addressFormat
            },
            {
                xtype: 'tagfield',
                fieldLabel: t('coreshop_country_salutations'),
                store: new Ext.data.ArrayStore({
                    fields: [
                        'salutation'
                    ],
                    data: []
                }),
                value: data.salutations,
                name: 'salutations',
                createNewOnEnter: true,
                createNewOnBlur: true,
                queryMode: 'local',
                displayField: 'salutation',
                valueField: 'salutation',
                hideTrigger: true
            }
        ];

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 350,
                    defaultType: 'textfield',
                    defaults: {width: 300},
                    items: items
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        if (!values['active']) {
            delete values['active'];
        }

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.country.panel');
coreshop.country.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_countries_panel',
    storeId: 'coreshop_countries',
    iconCls: 'coreshop_icon_country',
    type: 'coreshop_countries',

    url: {
        add: '/admin/coreshop/countries/add',
        delete: '/admin/coreshop/countries/delete',
        get: '/admin/coreshop/countries/get',
        list: '/admin/coreshop/countries/list'
    },

    initialize: function ($super) {
        this.store = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: this.url.list
            }),
            reader: new Ext.data.JsonReader({
                rootProperty: 'data'
            }, [
                {name: 'id'},
                {name: 'name'},
                {name: 'zoneName'}
            ]),
            autoload: true,
            groupField: 'zoneName',
            groupDir: 'ASC'
        });

        $super();
    },

    getGridConfiguration: function () {
        return {
            store: this.store,
            groupField: 'zoneName',
            groupDir: 'ASC',
            features: [{
                ftype: 'grouping',

                // You can customize the group's header.
                groupHeaderTpl: '{name} ({children.length})',
                enableNoGroups: true,
                startCollapsed: true
            }]
        };
    },

    getItemClass: function() {
        return coreshop.country.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.state.item');
coreshop.state.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_state',

    url: {
        save: '/admin/coreshop/states/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {
        var data = this.data,
            langTabs = [];

        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var tab = {
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'translations.' + lang + '.name',
                    fieldLabel: t('name'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].name : ''
                }]
            };

            langTabs.push(tab);
        });

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 350,
                    defaultType: 'textfield',
                    defaults: {width: 300},
                    items: [
                        {
                            xtype: 'tabpanel',
                            activeTab: 0,
                            defaults: {
                                autoHeight: true,
                                bodyStyle: 'padding:10px;'
                            },
                            width: '100%',
                            items: langTabs
                        },
                        {
                            fieldLabel: t('coreshop_state_isoCode'),
                            name: 'isoCode',
                            value: data.isoCode
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: t('active'),
                            name: 'active',
                            checked: data.active
                        },
                        {
                            xtype: 'coreshop.country',
                            value: data.country,
                            name: 'country'
                        }
                    ]
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        if (!values['active']) {
            delete values['active'];
        }

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.state.panel');
coreshop.state.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_states_panel',
    storeId: 'coreshop_states',
    iconCls: 'coreshop_icon_state',
    type: 'coreshop_states',

    url: {
        add: '/admin/coreshop/states/add',
        delete: '/admin/coreshop/states/delete',
        get: '/admin/coreshop/states/get',
        list: '/admin/coreshop/states/list'
    },

    initialize: function ($super) {
        this.store = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: this.url.list
            }),
            reader: new Ext.data.JsonReader({}, [
                {name: 'id'},
                {name: 'name'},
                {name: 'countryName'}
            ]),
            autoload: true,
            groupField: 'countryName',
            groupDir: 'ASC'
        });

        $super();
    },

    getGridConfiguration: function () {
        return {
            store: this.store,
            groupField: 'zoneName',
            groupDir: 'ASC',
            features: [{
                ftype: 'grouping',

                // You can customize the group's header.
                groupHeaderTpl: '{name} ({children.length})',
                enableNoGroups: true,
                startCollapsed: true
            }]
        };
    },

    getItemClass: function() {
        return coreshop.state.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.zone.item');
coreshop.zone.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_zone',

    url: {
        save: '/admin/coreshop/zones/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 300},
                    items: [
                        {
                            fieldLabel: t('name'),
                            name: 'name',
                            value: this.data.name
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: t('active'),
                            name: 'active',
                            checked: this.data.active
                        }
                    ]
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        if (!values['active']) {
            delete values['active'];
        }

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.zone.panel');
coreshop.zone.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_zones_panel',
    storeId: 'coreshop_zones',
    iconCls: 'coreshop_icon_zone',
    type: 'coreshop_zones',

    url: {
        add: '/admin/coreshop/zones/add',
        delete: '/admin/coreshop/zones/delete',
        get: '/admin/coreshop/zones/get',
        list: '/admin/coreshop/zones/list'
    },

    getItemClass: function() {
        return coreshop.zone.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCountry');
pimcore.object.classes.data.coreShopCountry = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopCountry',

    getTypeName: function () {
        return t('coreshop_country');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_country';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCountry');
pimcore.object.tags.coreShopCountry = Class.create(coreshop.object.tags.select, {

    type: 'coreShopCountry',
    storeName: 'coreshop_countries'

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCountryMultiselect');
pimcore.object.classes.data.coreShopCountryMultiselect = Class.create(coreshop.object.classes.data.dataMultiselect, {

    type: 'coreShopCountryMultiselect',

    getTypeName: function () {
        return t('coreshop_country_multiselect');
    },

    getIconClass: function () {
        return 'coreshop_icon_country';
    },

    getGroup: function () {
        return 'coreshop';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCountryMultiselect');
pimcore.object.tags.coreShopCountryMultiselect = Class.create(coreshop.object.tags.multiselect, {

    type: 'coreShopCountryMultiselect',
    storeName: 'coreshop_countries'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopState');
pimcore.object.classes.data.coreShopState = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopState',

    getTypeName: function () {
        return t('coreshop_state');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_state';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopState');
pimcore.object.tags.coreShopState = Class.create(coreshop.object.tags.select, {

    type: 'coreShopState',
    storeName: 'coreshop_states'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.currency.resource');
coreshop.currency.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_currencies', 'coreshop/currencies');
        coreshop.global.addStore('coreshop_exchange_rates', 'coreshop/exchange_rates', [
            {name: 'id'},
            {name: 'fromCurrency'},
            {name: 'toCurrency'},
            {name: 'exchangeRate'}
        ]);

        pimcore.globalmanager.get('coreshop_currencies').load();

        coreshop.broker.fireEvent('resource.register', 'coreshop.currency', this);
    },

    openResource: function (item) {
        if (item === 'currency') {
            this.openCurrencyResource();
        } else if (item === 'exchange_rate') {
            this.openExchangeRateResource();
        }
    },

    openCurrencyResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_currencies_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_currencies_panel', new coreshop.currency.panel());
        }
    },

    openExchangeRateResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_exchange_rates_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_exchange_rates_panel', new coreshop.exchange_rate.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.currency.resource();
});


Ext.define('CoreShop.store.Currency', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.currency',

    name: 'currency',
    fieldLabel: t('coreshop_currency'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_currencies');

        this.callParent();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.currency.item');
coreshop.currency.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_currency',

    url: {
        save: '/admin/coreshop/currencies/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {
        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 300},
                    items: [
                        {
                            fieldLabel: t('name'),
                            name: 'name',
                            value: this.data.name
                        },
                        {
                            fieldLabel: t('coreshop_currency_isoCode'),
                            name: 'isoCode',
                            value: this.data.isoCode
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: t('coreshop_currency_numericIsoCode'),
                            name: 'numericIsoCode',
                            value: this.data.numericIsoCode
                        },
                        {
                            fieldLabel: t('coreshop_currency_symbol'),
                            name: 'symbol',
                            value: this.data.symbol
                        }
                    ]
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        return this.formPanel.getForm().getFieldValues();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.currency.panel');
coreshop.currency.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_currencies_panel',
    storeId: 'coreshop_currencies',
    iconCls: 'coreshop_icon_currency',
    type: 'coreshop_currencies',

    url: {
        add: '/admin/coreshop/currencies/add',
        delete: '/admin/coreshop/currencies/delete',
        get: '/admin/coreshop/currencies/get',
        list: '/admin/coreshop/currencies/list'
    },

    getItemClass: function() {
        return coreshop.currency.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCurrency');
pimcore.object.classes.data.coreShopCurrency = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopCurrency',

    getTypeName: function () {
        return t('coreshop_currency');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_currency';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCurrency');
pimcore.object.tags.coreShopCurrency = Class.create(coreshop.object.tags.select, {

    type: 'coreShopCurrency',
    storeName: 'coreshop_currencies'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCurrencyMultiselect');
pimcore.object.classes.data.coreShopCurrencyMultiselect = Class.create(coreshop.object.classes.data.dataMultiselect, {

    type: 'coreShopCurrencyMultiselect',

    getTypeName: function () {
        return t('coreshop_currency_multiselect');
    },

    getIconClass: function () {
        return 'coreshop_icon_currency';
    },

    getGroup: function () {
        return 'coreshop';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCurrencyMultiselect');
pimcore.object.tags.coreShopCurrencyMultiselect = Class.create(coreshop.object.tags.multiselect, {

    type: 'coreShopCurrencyMultiselect',
    storeName: 'coreshop_currencies'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopMoneyCurrency');
pimcore.object.classes.data.coreShopMoneyCurrency = Class.create(pimcore.object.classes.data.data, {
    type: "coreShopMoneyCurrency",

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true,
        classificationstore: true,
        block: true
    },

    initialize: function (treeNode, initData) {
        this.type = "coreShopMoneyCurrency";

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("coreshop_money_currency");
    },

    getGroup: function () {
        return "coreshop";
    },

    getIconClass: function () {
        return "coreshop_icon_money";
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("width"),
                name: "width",
                value: this.datax.width
            }
        ]);

        if (!this.isInCustomLayoutEditor()) {
            this.specificPanel.add([
                {
                    xtype: "numberfield",
                    fieldLabel: t("min_value"),
                    name: "minValue",
                    value: this.datax.minValue
                }, {
                    xtype: "numberfield",
                    fieldLabel: t("max_value"),
                    name: "maxValue",
                    value: this.datax.maxValue
                }
            ]);
        }

        return this.layout;
    },

    applySpecialData: function (source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax = {};
            }

            Ext.apply(this.datax, {
                width: source.datax.width,
                minValue: source.datax.minValue,
                maxValue: source.datax.maxValue,
            });
        }
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.tags.coreShopMoneyCurrency");
pimcore.object.tags.coreShopMoneyCurrency = Class.create(pimcore.object.tags.abstract, {

    type: "coreShopMoneyCurrency",

    initialize: function (data, fieldConfig)
    {
        this.data = data;
        this.fieldConfig = fieldConfig;
    },

    getLayoutEdit: function ()
    {
        var container = {
            xtype: 'fieldcontainer',
            fieldLabel: this.fieldConfig.title,
            name: this.fieldConfig.name,
            componentCls: "object_field",
            layout: 'hbox',
        };
        var valueField = {
            xtype: 'numberfield',
            name: 'value',
            flex: 1
        };
        var currencyField = {
            xtype: 'coreshop.currency',
            value: this.data.currency,
            name: 'currency',
            flex: 1,
            fieldLabel: null
        };

        if (!isNaN(this.data.value)) {
            valueField.value = this.data.value;
        }
        if (!isNaN(this.data.currency)) {
            currencyField.value = this.data.currency;
        }

        if (this.fieldConfig.width) {
            //container.width = this.fieldConfig.width;
        } else {
            //container.width = 350;
        }

        if (this.fieldConfig.labelWidth) {
            container.labelWidth = this.fieldConfig.labelWidth;
        }
        //container.width += container.labelWidth + valueField.width + currencyField.width;

        if (is_numeric(this.fieldConfig["minValue"])) {
            input.minValue = this.fieldConfig.minValue;
        }

        if (is_numeric(this.fieldConfig["maxValue"])) {
            input.maxValue = this.fieldConfig.maxValue;
        }

        container.items = [
            valueField,
            currencyField
        ];

        this.component = new Ext.create(container);

        return this.component;
    },


    getLayoutShow: function ()
    {
        this.getLayoutEdit();

        this.component.disable();

        return this.component;
    },

    getValue: function ()
    {
        if (this.isRendered()) {
            var value = this.component.down('[name="value"]').getValue();
            var currency = this.component.down('[name="currency"]').getValue();

            return {
                value: value,
                currency: currency
            };
        }

        return this.data;
    },

    getName: function ()
    {
        return this.fieldConfig.name;
    },

    isInvalidMandatory: function ()
    {
        if (!this.isRendered() && (!empty(this.getInitialData() || this.getInitialData() === 0) )) {
            return false;
        } else if (!this.isRendered()) {
            return true;
        }

        return this.getValue();
    },

    isDirty: function ()
    {
        var dirty = false;

        var components = [
            this.component.down('[name="value"]'),
            this.component.down('[name="currency"]')
        ];

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            if (component && typeof component.isDirty === "function") {
                if (component.rendered) {
                    dirty = component.isDirty();

                    // once a field is dirty it should be always dirty (not an ExtJS behavior)
                    if (component["__pimcore_dirty"]) {
                        dirty = true;
                    }
                    if (dirty) {
                        component["__pimcore_dirty"] = true;
                    }

                    if (dirty) {
                        return dirty;
                    }
                }
            }
        }

        return false;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.exchange_rate.panel');
coreshop.exchange_rate.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_exchange_rates_panel',
    storeId: 'coreshop_exchange_rates',
    iconCls: 'coreshop_icon_exchange_rate',
    type: 'coreshop_exchange_rate',

    url: {
        add: '/admin/coreshop/exchange_rates/add',
        save: '/admin/coreshop/exchange_rates/save',
        delete: '/admin/coreshop/exchange_rates/delete',
        get: '/admin/coreshop/exchange_rates/get',
        list: '/admin/coreshop/exchange_rates/list'
    },

    getItems: function () {
        return [this.getExchangeRatesGrid()];
    },

    getExchangeRatesGrid: function () {
        pimcore.globalmanager.get(this.storeId).load();

        this.grid = Ext.create('Ext.grid.Panel', {
            store: pimcore.globalmanager.get(this.storeId),
            region: 'center',
            columns: [
                {
                    header: t('coreshop_from_currency'),
                    flex: 1,
                    dataIndex: 'fromCurrency',
                    editor: new Ext.form.ComboBox({
                        store: pimcore.globalmanager.get('coreshop_currencies'),
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        required: true
                    }),
                    renderer: function (currencyId) {
                        var store = pimcore.globalmanager.get('coreshop_currencies');
                        var currency = store.getById(currencyId);
                        if (currency) {
                            return currency.get('name');
                        }

                        return null;
                    }
                },
                {
                    header: t('coreshop_to_currency'),
                    flex: 1,
                    dataIndex: 'toCurrency',
                    editor: new Ext.form.ComboBox({
                        store: pimcore.globalmanager.get('coreshop_currencies'),
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        required: true
                    }),
                    renderer: function (currencyId) {
                        var store = pimcore.globalmanager.get('coreshop_currencies');
                        var currency = store.getById(currencyId);
                        if (currency) {
                            return currency.get('name');
                        }

                        return null;
                    }
                },
                {
                    header: t('coreshop_exchange_rate'),
                    width: 200,
                    dataIndex: 'exchangeRate',
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 10,
                        required: true
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 40,
                    items: [{
                        iconCls: 'pimcore_icon_delete',
                        tooltip: t('delete'),
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);

                            grid.getStore().remove(rec);

                            if (!rec.phantom) {
                                Ext.Ajax.request({
                                    url: this.url.delete,
                                    jsonData: rec.data,
                                    method: 'delete',
                                    success: function (response) {

                                    }.bind(this)
                                });
                            }
                        }.bind(this)
                    }]
                }
            ],
            selModel: 'rowmodel',
            tbar: [
                {
                    text: t('add'),
                    handler: function () {
                        pimcore.globalmanager.get(this.storeId).add({});
                    }.bind(this),
                    iconCls: 'pimcore_icon_add'
                }
            ],

            plugins: Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 1,
                listeners: {}
            })
        });

        this.grid.on('edit', function (editor, e) {
            Ext.Ajax.request({
                url: this.url.save,
                jsonData: e.record.data,
                method: 'post',
                success: function (response) {
                    var res = Ext.decode(response.responseText);

                    if (res.success) {
                        e.record.set(res.data);
                        e.record.commit();
                    } else {
                        e.record.erase();
                        pimcore.helpers.showNotification(t('error'), t('coreshop_save_error'),
                            'error', res.message);
                    }
                }.bind(this)
            });
        }.bind(this));

        return this.grid;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.taxation.resource');
coreshop.taxation.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_tax_rates', 'coreshop/tax_rates', [
            {name: 'id'},
            {name: 'name'},
            {name: 'rate'}
        ]);
        coreshop.global.addStore('coreshop_taxrulegroups', 'coreshop/tax_rule_groups');

        pimcore.globalmanager.get('coreshop_tax_rates').load();

        coreshop.broker.fireEvent('resource.register', 'coreshop.taxation', this);
    },

    openResource: function (item) {
        if (item === 'tax_item') {
            this.openTaxItemResource();
        } else if (item === 'tax_rule_group') {
            this.openTaxRuleGroupResource();
        }
    },

    openTaxItemResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_taxes_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_taxes_panel', new coreshop.tax.panel());
        }
    },

    openTaxRuleGroupResource: function () {
        try {
            pimcore.globalmanager.get('coreshop_tax_rule_groups_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_tax_rule_groups_panel', new coreshop.taxrulegroup.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.taxation.resource();
});


Ext.define('CoreShop.store.TaxRate', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.taxRate',

    name: 'taxRate',
    fieldLabel: t('coreshop_tax_rate'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_tax_rates');

        this.callParent();
    }
});


Ext.define('CoreShop.store.TaxRuleGroup', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.taxRuleGroup',

    name: 'taxRule',
    storeId: 'coreshop_taxrulegroups',
    fieldLabel: t('coreshop_tax_rule_group'),
    listeners: {
        beforerender: function () {
            if (!this.getStore().isLoaded() && !this.getStore().isLoading())
                this.getStore().load();
        }
    },

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_tax_rule_group');

        this.callParent();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.tax.item');
coreshop.tax.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_taxes',

    url: {
        save: '/admin/coreshop/tax_rates/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getTitleText: function () {
        return this.data.name;
    },

    getFormPanel: function () {
        var data = this.data;

        var langTabs = [];
        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var tab = {
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'translations.' + lang + '.name',
                    fieldLabel: t('name'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].name : ''
                }]
            };

            langTabs.push(tab);
        });

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 350,
                    defaultType: 'textfield',
                    defaults: {width: '100%'},
                    items: [
                        {
                            xtype: 'tabpanel',
                            activeTab: 0,
                            defaults: {
                                autoHeight: true,
                                bodyStyle: 'padding:10px;'
                            },
                            items: langTabs
                        },
                        {
                            xtype: 'numberfield',
                            name: 'rate',
                            fieldLabel: t('coreshop_tax_rate'),
                            width: 400,
                            value: data.rate,
                            decimalPrecision: 2,
                            step: 1
                        }, {
                            xtype: 'checkbox',
                            name: 'active',
                            fieldLabel: t('active'),
                            width: 250,
                            checked: data.active
                        }
                    ]
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        if (!values['active']) {
            delete values['active'];
        }

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.tax.panel');
coreshop.tax.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_taxes_panel',
    storeId: 'coreshop_tax_rates',
    iconCls: 'coreshop_icon_taxes',
    type: 'coreshop_taxes',

    url: {
        add: '/admin/coreshop/tax_rates/add',
        delete: '/admin/coreshop/tax_rates/delete',
        get: '/admin/coreshop/tax_rates/get',
        list: '/admin/coreshop/tax_rates/list'
    },

    getItemClass: function() {
        return coreshop.tax.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.taxrulegroup.item');
coreshop.taxrulegroup.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_tax_rule_groups',

    url: {
        save: '/admin/coreshop/tax_rule_groups/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {
        var data = this.data;

        var items = [
            {
                name: 'name',
                fieldLabel: t('name'),
                value: data.name
            },
            {
                xtype: 'checkbox',
                name: 'active',
                fieldLabel: t('active'),
                checked: data.active
            }
        ];

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 350,
                    defaultType: 'textfield',
                    defaults: {width: 400},
                    items: items
                },
                this.getGrid()
            ]
        });

        return this.formPanel;
    },

    getGrid: function () {
        var listeners = {};

        var modelName = 'coreshop.model.taxrules';

        if (!Ext.ClassManager.get(modelName)) {
            Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'taxRuleGroup', 'tax', 'behavior']
                }
            );
        }

        this.store = new Ext.data.Store({
            restful: false,
            idProperty: 'id',
            model: modelName,
            listeners: listeners,
            data: this.data.taxRules
        });

        var gridColumns = [
            {
                header: t('coreshop_tax'),
                width: 200,
                dataIndex: 'taxRate',
                editor: new Ext.form.ComboBox({
                    store: pimcore.globalmanager.get('coreshop_tax_rates'),
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local'
                }),
                renderer: function (taxRate) {
                    var record = pimcore.globalmanager.get('coreshop_tax_rates').getById(taxRate);

                    if (record) {
                        return record.get('name');
                    }

                    return null;
                }
            },
            {
                header: t('coreshop_tax_rule_behavior'),
                width: 300,
                dataIndex: 'behavior',
                editor: new Ext.form.ComboBox({
                    store: [[0, t('coreshop_tax_rule_behavior_disable')], [1, t('coreshop_tax_rule_behavior_combine')], [2, t('coreshop_tax_rule_behavior_on_after_another')]],
                    triggerAction: 'all',
                    editable: false,
                    queryMode: 'local'
                }),
                renderer: function (behavior) {
                    switch (parseInt(behavior)) {
                        case 0:
                            return t('coreshop_tax_rule_behavior_disable');
                            break;

                        case 1:
                            return t('coreshop_tax_rule_behavior_combine');
                            break;

                        case 2:
                            return t('coreshop_tax_rule_behavior_on_after_another');
                            break;
                    }
                }
            },
            {
                xtype: 'actioncolumn',
                width: 40,
                tooltip: t('delete'),
                iconCls: 'pimcore_icon_deletes',
                handler: function (grid, rowIndex) {
                    grid.getStore().removeAt(rowIndex);
                }.bind(this)
            }
        ];

        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {

            }
        });

        var gridConfig = {
            frame: false,
            store: this.store,
            border: true,
            columns: gridColumns,
            loadMask: true,
            columnLines: true,
            stripeRows: true,
            trackMouseOver: true,
            viewConfig: {
                forceFit: false
            },
            selModel: Ext.create('Ext.selection.RowModel', {}),
            tbar: [
                {
                    text: t('add'),
                    handler: function () {
                        this.store.add({
                            id: null,
                            taxRuleGroup: this.data.id,
                            tax: null,
                            behavior: 0
                        });
                    }.bind(this),
                    iconCls: 'pimcore_icon_add'
                }
            ],
            plugins: [
                this.cellEditing
            ]
        };

        this.grid = Ext.create('Ext.grid.Panel', gridConfig);

        return this.grid;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();
        var taxRules = [];

        this.store.getRange().forEach(function (range, index) {
            var data = range.data;

            if (range.phantom) {
                delete data['id'];
            }

            taxRules.push(data);
        });

        if (!values['active']) {
            delete values['active'];
        }

        values['taxRules'] = taxRules;

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.taxrulegroup.panel');
coreshop.taxrulegroup.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_tax_rule_groups_panel',
    storeId: 'coreshop_taxrulegroups',
    iconCls: 'coreshop_icon_tax_rule_groups',
    type: 'coreshop_taxrulegroups',

    url: {
        add: '/admin/coreshop/tax_rule_groups/add',
        delete: '/admin/coreshop/tax_rule_groups/delete',
        get: '/admin/coreshop/tax_rule_groups/get',
        list: '/admin/coreshop/tax_rule_groups/list'
    },

    getItemClass: function() {
        return coreshop.taxrulegroup.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopTaxRuleGroup');
pimcore.object.classes.data.coreShopTaxRuleGroup = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopTaxRuleGroup',

    getTypeName: function () {
        return t('coreshop_tax_rule_group');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_tax_rule_groups';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopTaxRuleGroup');
pimcore.object.tags.coreShopTaxRuleGroup = Class.create(coreshop.object.tags.select, {

    type: 'coreShopTaxRuleGroup',
    storeName: 'coreshop_taxrulegroups'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.store.resource');
coreshop.store.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_stores', 'coreshop/stores');

        pimcore.globalmanager.get('coreshop_stores').load();

        coreshop.broker.fireEvent('resource.register', 'coreshop.store', this);
    },

    openResource: function (item) {
        if (item === 'store') {
            this.openStore();
        }
    },

    openStore: function () {
        try {
            pimcore.globalmanager.get('coreshop_stores_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_stores_panel', new coreshop.store.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.store.resource();
});


Ext.define('CoreShop.store.Store', {
    extend: 'CoreShop.resource.ComboBox',
    alias: 'widget.coreshop.store',

    name: 'store',
    fieldLabel: t('coreshop_store'),

    initComponent: function () {
        this.store = pimcore.globalmanager.get('coreshop_stores');

        this.callParent();
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.store.item');
coreshop.store.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_store',

    url: {
        save: '/admin/coreshop/stores/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getFormPanel: function () {
        this.store = new Ext.data.Store({
            restful: false,
            idProperty: 'id',
            remoteSort: true,
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/stores/list-sites',
                reader: {
                    type: 'json'
                }
            }
        });

        this.store.load();

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 300},
                    items: [
                        {
                            fieldLabel: t('name'),
                            name: 'name',
                            value: this.data.name
                        },
                        {
                            fieldLabel: t('coreshop_store_site'),
                            xtype: 'combo',
                            name: 'siteId',
                            width: 400,
                            store: this.store,
                            displayField: 'name',
                            valueField: 'id',
                            triggerAction: 'all',
                            typeAhead: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local',
                            value: this.data.siteId
                        },
                        {
                            fieldLabel: t('coreshop_store_template'),
                            name: 'template',
                            value: this.data.template
                        },
                        {
                            xtype: 'coreshop.currency',
                            value: this.data.currency
                        },
                    ]
                }
            ]
        });

        return this.formPanel;
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.store.panel');
coreshop.store.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_stores_panel',
    storeId: 'coreshop_stores',
    iconCls: 'coreshop_icon_store',
    type: 'coreshop_stores',

    url: {
        add: '/admin/coreshop/stores/add',
        delete: '/admin/coreshop/stores/delete',
        get: '/admin/coreshop/stores/get',
        list: '/admin/coreshop/stores/list'
    },

    getItemClass: function() {
        return coreshop.store.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopStore');
pimcore.object.classes.data.coreShopStore = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopStore',

    getTypeName: function () {
        return t('coreshop_store');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_store';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopStore');
pimcore.object.tags.coreShopStore = Class.create(coreshop.object.tags.select, {

    type: 'coreShopStore',
    storeName: 'coreshop_stores'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopStoreMultiselect');
pimcore.object.classes.data.coreShopStoreMultiselect = Class.create(coreshop.object.classes.data.dataMultiselect, {

    type: 'coreShopStoreMultiselect',

    getTypeName: function () {
        return t('coreshop_store_multiselect');
    },

    getIconClass: function () {
        return 'coreshop_icon_store';
    },

    getGroup: function () {
        return 'coreshop';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopStoreMultiselect');
pimcore.object.tags.coreShopStoreMultiselect = Class.create(coreshop.object.tags.multiselect, {

    type: 'coreShopStoreMultiselect',
    storeName: 'coreshop_stores'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.resource');
coreshop.index.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_indexes', 'coreshop/indices');
        coreshop.global.addStore('coreshop_filters', 'coreshop/filters');

        coreshop.broker.fireEvent('resource.register', 'coreshop.index', this);
    },
    
    openResource: function(item) {
        if (item === 'index') {
            this.openIndex();
        } else if(item === 'filter') {
            this.openFilter();
        }
    },
    
    openIndex: function() {
        try {
            pimcore.globalmanager.get('coreshop_indexes_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_indexes_panel', new coreshop.index.panel());
        }
    },
    
    openFilter: function() {
        try {
            pimcore.globalmanager.get('coreshop_filters_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_filters_panel', new coreshop.filter.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.index.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.item');

coreshop.index.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_indexes',

    url: {
        save: '/admin/coreshop/indices/save'
    },

    getPanel: function () {
        return new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: this.getItems()
        });
    },

    getItems: function () {
        var fields = this.getIndexFields();
        var settings = this.getSettings();

        return [
            settings,
            fields
        ];
    },

    getSettings: function () {
        this.indexWorkerSettings = new Ext.form.Panel({});

        this.formPanel = new Ext.panel.Panel({
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            items: [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype: 'fieldset',
                            autoHeight: true,
                            border: false,
                            labelWidth: 350,
                            defaultType: 'textfield',
                            defaults: {width: '100%'},
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: t('name'),
                                    name: 'name',
                                    value: this.data.name,
                                    regex: /^[a-z0-9]+$/i
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: t('class'),
                                    name: 'class',
                                    displayField: 'name',
                                    valueField: 'name',
                                    store: pimcore.globalmanager.get('coreshop_index_classes'),
                                    value: this.data.class,
                                    queryMode: 'local',
                                    forceSelection: true
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: t('coreshop_indexes_type'),
                                    typeAhead: true,
                                    value: this.data.worker,
                                    mode: 'local',
                                    listWidth: 100,
                                    store: this.parentPanel.typesStore,
                                    displayField: 'name',
                                    valueField: 'name',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    name: 'worker',
                                    listeners: {
                                        change: function (combo, value) {
                                            this.getIndexWorkerConfig(value);
                                        }.bind(this)
                                    }
                                }
                            ]
                        }
                    ]
                },
                this.indexWorkerSettings
            ]
        });

        if (this.data.worker) {
            this.getIndexWorkerConfig(this.data.worker);
        }

        return this.formPanel;
    },

    getIndexFields: function () {
        this.fieldsPanel = new coreshop.index.fields(this.data, this.data.class);

        this.indexFields = new Ext.panel.Panel({
            iconCls: 'coreshop_icon_indexes_fields',
            title: t('coreshop_indexes_fields'),
            border: false,
            layout: 'fit',
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            items: [
                this.fieldsPanel.getLayout()
            ]
        });

        return this.indexFields;
    },

    getIndexWorkerConfig: function (worker) {
        if (this.indexWorkerSettings) {
            this.indexWorkerSettings.removeAll();

            if (coreshop.index.worker[worker] !== undefined) {
                this.workerSettings = new coreshop.index.worker[worker](this);
                this.indexWorkerSettings.add(this.workerSettings.getForm(this.data.configuration));
            }
            else {
                this.workerSettings = null;
            }

            if (this.indexWorkerSettings.items.items.length === 0) {
                this.indexWorkerSettings.hide();
            }
            else {
                this.indexWorkerSettings.show();
            }
        }
    },

    getSaveData: function () {
        var saveData = this.formPanel.down("form").getForm().getFieldValues();

        if (this.workerSettings && Ext.isFunction(this.workerSettings.getData)) {
            saveData['configuration'] = this.workerSettings.getData();
        }
        else {
            saveData['configuration'] = this.indexWorkerSettings.getForm().getFieldValues();
        }
        saveData['columns'] = this.fieldsPanel.getData();

        return saveData;
    },

    isValid: function () {
        return this.formPanel.down("form").isValid();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.panel');

coreshop.index.panel = Class.create(coreshop.resource.panel, {

    layoutId: 'coreshop_indexes_panel',
    storeId: 'coreshop_indexes',
    iconCls: 'coreshop_icon_indexes',
    type: 'coreshop_indexes',

    url: {
        add: '/admin/coreshop/indices/add',
        delete: '/admin/coreshop/indices/delete',
        get: '/admin/coreshop/indices/get',
        list: '/admin/coreshop/indices/list',
        config: '/admin/coreshop/indices/get-config',
        types: '/admin/coreshop/indices/get-types'
    },

    typesStore: null,

    /**
     * constructor
     */
    initialize: function () {
        var proxy = new Ext.data.HttpProxy({
            url: this.url.types
        });

        var reader = new Ext.data.JsonReader({}, [
            {name: 'name'}
        ]);

        this.typesStore = new Ext.data.Store({
            restful: false,
            proxy: proxy,
            reader: reader,
            autoload: true
        });
        this.typesStore.load();

        this.getConfig();

        this.panels = [];
    },

    getConfig: function () {
        var modelName = 'coreshop.model.index.interpreter';

        if (!Ext.ClassManager.get(modelName)) {
            Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['type', 'name', 'localized', 'relation'],
                    idProperty: 'type'
                }
            );
        }

        this.getterStore = new Ext.data.JsonStore({
            data: []
        });

        this.interpreterStore = new Ext.data.JsonStore({
            data: [],
            model: modelName
        });

        this.fieldTypeStore = new Ext.data.JsonStore({
            data: []
        });

        this.classes = new Ext.data.JsonStore({
            data: []
        });

        pimcore.globalmanager.add('coreshop_index_getters', this.getterStore);
        pimcore.globalmanager.add('coreshop_index_interpreters', this.interpreterStore);
        pimcore.globalmanager.add('coreshop_index_classes', this.classes);
        pimcore.globalmanager.add('coreshop_index_fieldTypes', this.fieldTypeStore);

        Ext.Ajax.request({
            url: this.url.config,
            method: 'get',
            success: function (response) {
                try {
                    var res = Ext.decode(response.responseText);

                    this.getterStore.loadData(res.getters);
                    this.interpreterStore.loadData(res.interpreters);
                    this.fieldTypeStore.loadData(res.fieldTypes);
                    this.classes.loadData(res.classes);

                    // create layout
                    this.getLayout();
                } catch (e) {
                    //pimcore.helpers.showNotification(t('error'), t('coreshop_save_error'), 'error');
                }
            }.bind(this)
        });
    },

    getItemClass: function () {
        return coreshop.index.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.fields');

coreshop.index.fields = Class.create({
    data: {},
    brickKeys: [],

    initialize: function (data, klass) {
        this.data = data;
        this.class = klass;
    },

    getLayout: function () {
        this.configPanel = new Ext.Panel({
            layout: 'border',
            items: [this.getSelectionPanel(), this.getClassDefinitionTreePanel()]

        });

        return this.configPanel;
    },

    getData: function () {

        var columns = {};

        if (this.selectionPanel) {
            var allowedColumns = [
                'name', 'getter', 'getterConfig', 'interpreter', 'interpreterConfig', 'columnType', 'configuration', 'objectType', 'dataType'
            ];

            this.selectionPanel.getRootNode().eachChild(function (child) {
                var obj = {
                    type: child.data.objectType,
                    objectKey: child.data.key
                };

                Ext.Object.each(Ext.Object.merge(child.data, {}), function (key, value) {

                    if (key === 'configuration') {
                        var configuration = {};

                        Ext.Object.each(value, function (ckey, cvalue) {
                            if (cvalue) {
                                configuration[ckey] = cvalue;
                            }
                        });

                        value = configuration;

                        if (Object.keys(configuration).length === 0) {
                            return;
                        }
                    }

                    if (value && allowedColumns.indexOf(key) >= 0) {
                        obj[key] = value;
                    }
                });

                if (!obj.hasOwnProperty('getter') && obj.hasOwnProperty('getterConfig')) {
                    delete obj['getterConfig'];
                }

                if (!obj.hasOwnProperty('interpreter') && obj.hasOwnProperty('interpreterConfig')) {
                    delete obj['interpreterConfig'];
                }

                columns[obj.name] = obj;
            }.bind(this));
        }

        return columns;
    },

    getSelectionPanel: function () {
        if (!this.selectionPanel) {

            var childs = [];
            if (this.data.hasOwnProperty('columns')) {
                for (var i = 0; i < this.data.columns.length; i++) {
                    var nodeConf = this.data.columns[i];
                    var child = Ext.Object.merge(nodeConf,
                        {
                            text: nodeConf.name,
                            type: 'data',
                            leaf: true,
                            iconCls: 'pimcore_icon_' + nodeConf.dataType,
                            key: nodeConf.objectKey
                        }
                    );

                    childs.push(child);
                }
            }

            this.selectionPanel = new Ext.tree.TreePanel({
                bufferedRenderer: false,
                root: {
                    id: '0',
                    root: true,
                    text: t('coreshop_indexes_selected_fields'),
                    leaf: false,
                    isTarget: true,
                    expanded: true,
                    children: childs
                },

                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        ddGroup: 'columnconfigelement'
                    },
                    listeners: {
                        beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                            var target = overModel.getOwnerTree().getView();
                            var source = data.view;

                            if (target != source) {
                                var record = data.records[0];
                                var copy = record.createNode(Ext.apply({}, record.data));
                                var element = this.getConfigElement(copy);

                                element.getConfigDialog(copy);

                                data.records = [copy]; // assign the copy as the new dropNode
                            }
                        }.bind(this),
                        options: {
                            target: this.selectionPanel
                        }
                    }
                },
                region: 'east',
                title: t('coreshop_indexes_selected_fields'),
                layout: 'fit',
                width: 428,
                split: true,
                autoScroll: true,
                listeners: {
                    itemcontextmenu: this.onTreeNodeContextmenu.bind(this)
                }
            });
            var store = this.selectionPanel.getStore();
            var model = store.getModel();
            model.setProxy({
                type: 'memory'
            });
        }

        return this.selectionPanel;
    },

    onTreeNodeContextmenu: function (tree, record, item, index, e, eOpts) {
        e.stopEvent();

        tree.select();

        var menu = new Ext.menu.Menu();

        if (this.id != 0) {
            menu.add(new Ext.menu.Item({
                text: t('delete'),
                iconCls: 'pimcore_icon_delete',
                handler: function (node) {
                    this.selectionPanel.getRootNode().removeChild(record, true);
                }.bind(this, record)
            }));
            menu.add(new Ext.menu.Item({
                text: t('edit'),
                iconCls: 'pimcore_icon_edit',
                handler: function (node) {
                    this.getConfigElement(record).getConfigDialog(record);
                }.bind(this, record)
            }));
        }

        menu.showAt(e.pageX, e.pageY);
    },

    getConfigElement: function (record) {
        return new coreshop.index.objecttype.abstract(this);
    },

    /*
     *       FIELD-TREE
     *
     **/
    getClassDefinitionTreePanel: function () {
        if (!this.classDefinitionTreePanel) {
            this.brickKeys = [];
            this.classDefinitionTreePanel = this.getClassTree('/admin/coreshop/indices/get-class-definition-for-field-selection', this.class);
        }

        return this.classDefinitionTreePanel;
    },

    getClassTree: function (url, klass) {

        var tree = new Ext.tree.TreePanel({
            title: t('class_definitions'),
            region: 'center',

            //ddGroup: "columnconfigelement",
            autoScroll: true,
            rootVisible: false,
            root: {
                id: '0',
                root: true,
                text: t('base'),
                allowDrag: false,
                leaf: true,
                isTarget: true
            },
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    enableDrag: true,
                    enableDrop: false,
                    ddGroup: 'columnconfigelement'
                }
            }
        });

        Ext.Ajax.request({
            url: url,
            params: {
                class: klass
            },
            success: this.initLayoutFields.bind(this, tree)
        });

        tree.addListener('itemdblclick', function (tree, record, item, index, e, eOpts) {
            if (!record.data.root && record.datatype != 'layout'
                && record.data.dataType != 'localizedfields') {
                var copy = Ext.apply({}, record.data);

                if (this.selectionPanel && !this.selectionPanel.getRootNode().findChild('name', record.data.name)) {
                    this.selectionPanel.getRootNode().appendChild(copy);
                }

                if (record.data.dataType == 'keyValue') {
                    var ccd = new pimcore.object.keyvalue.columnConfigDialog();
                    ccd.getConfigDialog(copy, this.selectionPanel);
                }
            }
        }.bind(this));

        return tree;
    },

    initLayoutFields: function (tree, response) {
        var data = Ext.decode(response.responseText);

        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            if (data[keys[i]]) {
                if (data[keys[i]].childs) {
                    var text = t(data[keys[i]].nodeLabel);

                    if (data[keys[i]].nodeType == 'objectbricks') {
                        text = ts(data[keys[i]].nodeLabel) + ' ' + t('columns');
                    }

                    if (data[keys[i]].nodeType == 'classificationstore') {
                        text = ts(data[keys[i]].nodeLabel) + ' ' + t('columns');
                    }

                    if (data[keys[i]].nodeType == 'fieldcollections') {
                        text = ts(data[keys[i]].nodeLabel) + ' ' + t('columns');
                    }

                    var baseNode = {
                        type: 'layout',
                        allowDrag: false,
                        iconCls: 'pimcore_icon_' + data[keys[i]].nodeType,
                        text: text
                    };

                    baseNode = tree.getRootNode().appendChild(baseNode);
                    for (var j = 0; j < data[keys[i]].childs.length; j++) {
                        var node = this.addDataChild.call(baseNode, data[keys[i]].childs[j].fieldtype, data[keys[i]].childs[j], data[keys[i]].nodeType, data[keys[i]].className);

                        baseNode.appendChild(node);
                    }

                    if (data[keys[i]].nodeType == 'object') {
                        baseNode.expand();
                    } else {
                        baseNode.collapse();
                    }
                }
            }
        }
    },

    addDataChild: function (type, initData, objectType, className) {

        if (type != 'objectbricks' && !initData.invisible) {
            var isLeaf = true;
            var draggable = true;

            var key = initData.name;

            var newNode = Ext.Object.merge(initData, {
                text: key,
                objectKey: initData.name,
                key: initData.name,
                type: 'data',
                layout: initData,
                leaf: isLeaf,
                allowDrag: draggable,
                dataType: type,
                iconCls: 'pimcore_icon_' + type,
                expanded: true,
                objectType: objectType,
                className: className
            });

            newNode = this.appendChild(newNode);

            if (this.rendered) {
                this.expand();
            }

            return newNode;
        } else {
            return null;
        }

    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.getters');
pimcore.registerNS('coreshop.index.getters.abstract');

coreshop.index.getters.abstract = Class.create({

    getLayout: function () {
        return [];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.getters.brick');

coreshop.index.getters.brick = Class.create(coreshop.index.getters.abstract, {

    getLayout: function (record) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_index_field_brickfield'),
                name: 'brickField',
                length: 255,
                value: record.data.getterConfig ? record.data.getterConfig.brickField : null,
                allowBlank: false
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.getters.classificationstore');

coreshop.index.getters.classificationstore = Class.create(coreshop.index.getters.abstract, {

    getLayout: function (record) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_index_field_classificationstore'),
                name: 'classificationStoreField',
                length: 255,
                value: record.data.getterConfig ? record.data.getterConfig.classificationStoreField : null,
                allowBlank: false
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.getters.fieldcollection');

coreshop.index.getters.fieldcollection = Class.create(coreshop.index.getters.abstract, {

    getLayout: function (record) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_index_field_collectionfield'),
                name: 'collectionField',
                length: 255,
                value: record.data.getterConfig ? record.data.getterConfig.collectionField : null,
                allowBlank: false
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.interpreters');
pimcore.registerNS('coreshop.index.interpreters.abstract');

coreshop.index.interpreters.abstract = Class.create({

    getLayout: function (record, interpreterConfig) {
        return [];
    },

    getForm: function(record, interpreterConfig) {
        if (!this.form) {
            this.form = new Ext.form.FormPanel({
                defaults: {anchor: '90%'},
                layout: 'form',
                items: this.getLayout(record, interpreterConfig)
            });
        }

        return this.form;
    },

    isValid: function() {
        return this.getForm().getForm().isValid()
    },

    getInterpreterData: function() {
        return this.form.getForm().getFieldValues();
    },
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.interpreters.empty');

coreshop.index.interpreters.empty = Class.create(coreshop.index.interpreters.abstract, {

    getLayout: function (record) {
        return [

        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */


pimcore.registerNS('coreshop.index.interpreters.nestedcontainer');

coreshop.index.interpreters.nestedcontainer = Class.create({
    parent: {},
    data: {},
    interpreterItem: null,

    initialize: function (parent, type, interpreterItem) {
        this.parent = parent;
        this.type = type;
        this.interpreterItem = interpreterItem;
    },

    getLayout: function (type, record, config) {
        var myId = Ext.id();

        this.layout = new Ext.panel.Panel({
            xparent: this,
            id: myId,
            style: 'margin: 10px 0 0 0',
            border: true,
            scrollable: true,
            maxHeight: 500,
            tbar: this.getTopBar(type, myId, this.parent, this.data),
            items: [{
                xtype: 'form',
                defaults: { anchor: '100%' },
                layout: 'form',
                items: this.interpreterItem.getForm(record, config)
            }]
        });

        return this.layout;
    },

    getIndex: function (blockElement, container) {
        // detect index
        var index;

        for (var s = 0; s < container.items.items.length; s++) {
            if (container.items.items[s].getId() === blockElement.getId()) {
                index = s;
                break;
            }
        }

        return index;
    },

    /**
     * @param name
     * @param index
     * @param parent
     * @param data
     * @returns {Array}
     */
    getTopBar: function (name, index, parent, data) {
        var namespace = 'conditions';
        var container = parent.interpreterContainer;

        var items = [{
            xtype: 'tbtext',
            text: '<b>' + name + '</b>'
        }, '-', {
            iconCls: 'pimcore_icon_up',
            handler: function (blockId, parent, container, namespace) {

                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.rules[namespace].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                var newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = 0;
                }

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(newIndex, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();
            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }, {
            iconCls: 'pimcore_icon_down',
            handler: function (blockId, parent, container, namespace) {

                var container = container;
                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.rules[namespace].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(index + 1, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();

            }.bind(window, index, parent, container, namespace),
            xtype: 'button'
        }];


        if (Ext.isFunction(this.getTopBarItems)) {
            items.push.apply(items, this.getTopBarItems());
        }

        items.push.apply(items, [
            '->', {
                iconCls: 'pimcore_icon_delete',
                handler: function (index, parent, container, namespace) {
                    container.remove(Ext.getCmp(index));
                }.bind(window, index, parent, container, namespace),
                xtype: 'button'
            }
        ]);

        return items;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */


pimcore.registerNS('coreshop.index.interpreters.nested');

coreshop.index.interpreters.nested = Class.create(coreshop.index.interpreters.abstract, {
    getForm: function (record, interpreterConfig) {
        // init
        var _this = this;
        var addMenu = [];
        var store = pimcore.globalmanager.get('coreshop_index_interpreters').getRange();

        store.clearFilter();

        var records = store.map(function(interpreter) {return interpreter.get('type')});

        Ext.each(records, function (interpreter) {
            if (interpreter === 'abstract')
                return;

            addMenu.push({
                text: interpreter,
                handler: _this.addInterpreter.bind(_this, interpreter, record, {})
            });

        });

        this.interpreterContainer = new Ext.Panel({
            autoScroll: true,
            forceLayout: true,
            tbar: [{
                iconCls: 'pimcore_icon_add',
                menu: addMenu
            }],
            border: false
        });

        if (interpreterConfig && interpreterConfig.interpreters) {
            Ext.each(interpreterConfig.interpreters, function (interpreter) {
                this.addInterpreter(interpreter.type, record, interpreter.interpreterConfig);
            }.bind(this));
        }

        return this.interpreterContainer;
    },

    destroy: function () {
        if (this.interpreterContainer) {
            this.interpreterContainer.destroy();
        }
    },

    getInterpreterClassItem: function (type) {
        if (Object.keys(coreshop.index.interpreters).indexOf(type) >= 0) {
            return coreshop.index.interpreters[type];
        }

        return coreshop.index.interpreters.empty;
    },

    addInterpreter: function (type, record, config) {
        // create condition
        var interpreterClass = this.getInterpreterClassItem(type);
        var item = new interpreterClass();
        var container = new coreshop.index.interpreters.nestedcontainer(this, type, item);

        this.interpreterContainer.add(container.getLayout(type, record, config));
        this.interpreterContainer.updateLayout();
    },

    isValid: function() {
        var interpreters = this.interpreterContainer.items.getRange();
        for (var i = 0; i < interpreters.length; i++) {
            var interpreterItem = interpreters[i];
            var interpreterClass = interpreterItem.xparent.interpreterItem;

            if (!interpreterClass.isValid()) {
                return false;
            }
        }

        return true;
    },

    getInterpreterData: function () {
        // get defined conditions
        var interpreterData = [];
        var interpreters = this.interpreterContainer.items.getRange();
        for (var i = 0; i < interpreters.length; i++) {
            var configuration = {};
            var interpreter = {};

            var interpreterItem = interpreters[i];
            var interpreterClass = interpreterItem.xparent.interpreterItem;

            interpreter['interpreterConfig'] = interpreterClass.getInterpreterData();
            interpreter['type'] = interpreters[i].xparent.type;

            interpreterData.push(interpreter);
        }

        return {
            interpreters: interpreterData
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */


pimcore.registerNS('coreshop.index.interpreters.nestedlocalized');

coreshop.index.interpreters.nestedlocalized = Class.create(coreshop.index.interpreters.nested, {

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.interpreters.nestedrelational');

coreshop.index.interpreters.nestedrelational = Class.create(coreshop.index.interpreters.nested, {

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.interpreters.objectproperty');

coreshop.index.interpreters.objectproperty = Class.create(coreshop.index.interpreters.abstract, {

    getLayout: function (record, interpreterConfig) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_index_interpreter_property'),
                name: 'property',
                length: 255,
                value: interpreterConfig ? interpreterConfig.property : null,
                allowBlank: false
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.interpreters.expression');

coreshop.index.interpreters.expression = Class.create(coreshop.index.interpreters.abstract, {

    getLayout: function (record, interpreterConfig) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_index_interpreter_expression'),
                name: 'expression',
                length: 255,
                value: interpreterConfig ? interpreterConfig.expression : null,
                allowBlank: false
            }
        ];
    }

});



/**
 * Import Definitions.
 *
 * LICENSE
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2016-2018 w-vision AG (https://www.w-vision.ch)
 * @license    https://github.com/w-vision/ImportDefinitions/blob/master/gpl-3.0.txt GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS('coreshop.index.interpreters.iterator');

coreshop.index.interpreters.iterator = Class.create(coreshop.index.interpreters.abstract, {
    getStore: function() {
        return pimcore.globalmanager.get('coreshop_index_interpreters');
    },

    getClassItem: function() {
        return coreshop.index.interpreters;
    },

    getForm: function (record, config) {
        this.interpreterPanel = new Ext.form.FormPanel({
            defaults: { anchor: '90%' },
            layout: 'form',
            title: t('coreshop_index_interpreter_settings'),
            border: true,
            hidden: true
        });

        this.getStore().clearFilter();

        this.interpreterTypeCombo = new Ext.form.ComboBox({
            fieldLabel : t('coreshop_index_field_interpreter'),
            name : 'interpreter',
            length : 255,
            value : config && config.interpreter ? config.interpreter.type : null,
            store : this.getStore(),
            valueField : 'name',
            displayField : 'name',
            queryMode : 'local',
            listeners : {
                change : function (combo, newValue) {
                    this.interpreterPanel.removeAll();

                    this.getInterpreterPanelLayout(newValue, record, config, {});
                }.bind(this)
            }
        });

        this.interpreterContainer = new Ext.Panel({
            autoScroll: true,
            forceLayout: true,
            items: [
                this.interpreterTypeCombo,
                this.interpreterPanel
            ],
            border: false
        });

        if (config && config.interpreter && config.interpreter.type) {
            this.getInterpreterPanelLayout(config.interpreter.type, record, config, config.interpreter.interpreterConfig);
        }

        return this.interpreterContainer;
    },

    destroy: function () {
        if (this.interpreterContainer) {
            this.interpreterContainer.destroy();
        }
    },

    getInterpreterPanelLayout : function (type, record, parentConfig, config) {
        if (type) {
            type = type.toLowerCase();
            var classItem = this.getClassItem();

            if (classItem[type]) {
                this.interpreter = new classItem[type];

                this.interpreterPanel.add(this.interpreter.getForm(record, Ext.isObject(config) ? config : {}, parentConfig));
                this.interpreterPanel.show();
            } else {
                this.interpreterPanel.hide();

                this.interpreter = null;
            }
        } else {
            this.interpreterPanel.hide();
        }
    },

    isValid: function() {
        if (!this.interpreter) {
            return false;
        }

        return this.interpreter.isValid();
    },

    getInterpreterData: function () {
        // get defined conditions
        if (this.interpreter) {
            var interpreterConfig  = {};
            var interpreterForm = this.interpreterPanel.getForm();

            if (Ext.isFunction(this.interpreter.getInterpreterData)) {
                interpreterConfig = this.interpreter.getInterpreterData();
            }
            else {
                Ext.Object.each(interpreterForm.getFieldValues(), function (key, value) {
                    interpreterConfig[key] = value;
                }.bind(this));
            }

            return {
                interpreter: {
                    interpreterConfig: interpreterConfig,
                    type: this.interpreterTypeCombo.getValue()
                }
            };
        }

        return {};
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.objecttype.abstract');

coreshop.index.objecttype.abstract = Class.create({
    parent: null,

    initialize: function (parent) {
        this.parent = parent;
    },

    getObjectTypeItems: function (record) {
        return [new Ext.form.ComboBox({
            fieldLabel: t('coreshop_index_field_type'),
            name: 'columnType',
            length: 255,
            value: record.data.columnType,
            store: pimcore.globalmanager.get('coreshop_index_fieldTypes'),
            valueField: 'type',
            displayField: 'name',
            queryMode: 'local',
            allowBlank: false,
            editable: false
        })];
    },

    getConfigDialog: function (record) {
        this.record = record;

        var fieldSetItems = [];

        fieldSetItems.push(new Ext.form.TextField({
            fieldLabel: t('key'),
            name: 'key',
            length: 255,
            value: record.data.key,
            disabled: true,
            allowBlank: false
        }));

        fieldSetItems.push(new Ext.form.TextField({
            fieldLabel: t('name'),
            name: 'name',
            length: 255,
            value: record.data.name ? record.data.name : record.data.key,
            allowBlank: false
        }));

        var getterDisabled = false;

        if(!record.data.getter && record.data.objectType === 'localizedfields') {
            record.set('getter', 'localizedfield');
            getterDisabled = true;
        } else if(!record.data.getter && record.data.objectType === 'classificationstore') {
            record.set('getter', 'classificationstore');
            getterDisabled = true;
        }

        fieldSetItems.push(new Ext.form.ComboBox({
            fieldLabel: t('coreshop_index_field_getter'),
            name: 'getter',
            length: 255,
            value: record.data.getter,
            disabled: getterDisabled,
            store: pimcore.globalmanager.get('coreshop_index_getters'),
            valueField: 'type',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                change: function (combo, newValue) {
                    this.getGetterPanel().removeAll();
                    this.record.set('getterConfig', null);
                    this.getGetterPanelLayout(newValue);
                }.bind(this)
            }
        }));

        fieldSetItems.push(new Ext.form.ComboBox({
            fieldLabel: t('coreshop_index_field_interpreter'),
            name: 'interpreter',
            length: 255,
            value: record.data.interpreter,
            store: pimcore.globalmanager.get('coreshop_index_interpreters'),
            valueField: 'type',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                afterrender: function(combo) {
                    if(!record.data.interpreter && record.data.objectType === 'localizedfields') {
                        this.setValue('localeMapping');
                    }
                },
                change: function (combo, newValue) {
                    this.getInterpreterPanel().removeAll();
                    this.record.set('interpreterConfig', null)
                    this.getInterpreterPanelLayout(newValue);
                }.bind(this)
            }
        }));

        var nodeTypeItems = this.getObjectTypeItems(record);

        if (nodeTypeItems.length > 0) {
            nodeTypeItems.forEach(function (item) {
                fieldSetItems.push(item);
            });
        }

        this.configForm = new Ext.form.FormPanel({
            items: fieldSetItems,
            layout: 'form',
            defaults: {anchor: '90%'},
            title: t('coreshop_index_field_settings')
        });

        this.configPanel = new Ext.panel.Panel({
            layout: 'form',
            scrollable: true,
            items: [
                this.configForm,
                this.getGetterPanel(),
                this.getInterpreterPanel()
            ],
            buttons: [{
                text: t('apply'),
                iconCls: 'pimcore_icon_apply',
                handler: function () {
                    this.commitData();
                }.bind(this)
            }]
        });

        this.window = new Ext.Window({
            width: 800,
            height: 600,
            resizeable: true,
            modal: false,
            title: t('coreshop_index_field') + ' (' + this.record.data.key + ')',
            layout: 'fit',
            items: [this.configPanel]
        });

        this.getGetterPanelLayout(record.data.getter);
        this.getInterpreterPanelLayout(record.data.interpreter);

        this.window.show();
    },

    commitData: function () {
        var form = this.configForm.getForm();
        var getterForm = this.getGetterPanel().getForm();
        var interpreterPanelClass = this.interpreterPanelClass;

        if (form.isValid() && getterForm.isValid()) {
            if (interpreterPanelClass) {
                if (!interpreterPanelClass.isValid()) {
                    return;
                }

                this.record.set('interpreterConfig', interpreterPanelClass.getInterpreterData());
            }

            if (this.getGetterPanel().isVisible()) {
                this.record.set('getterConfig', getterForm.getFieldValues());
            }

            Ext.Object.each(form.getFieldValues(), function (key, value) {
                this.record.set(key, value);
            }.bind(this));

            if (this.record.data.name !== this.record.data.text) {
                this.record.set('text', this.record.data.name);
            }

            this.parent.selectionPanel.fireEvent('record_changed');
            this.window.close();
        }
    },

    getGetterPanel: function () {
        if (!this.getterPanel) {
            this.getterPanel = new Ext.form.FormPanel({
                defaults: {anchor: '90%'},
                layout: 'form',
                title: t('coreshop_index_getter_settings')
            });
        }

        return this.getterPanel;
    },

    getGetterPanelLayout: function (type) {
        if (type) {
            type = type.toLowerCase();

            //Check if some class for getterPanel is available
            if (coreshop.index.getters[type]) {
                var getter = new coreshop.index.getters[type];

                this.getGetterPanel().add(getter.getLayout(this.record));
                this.getGetterPanel().show();
            } else {
                this.getGetterPanel().hide();
            }
        } else {
            this.getGetterPanel().hide();
        }
    },

    getInterpreterPanel: function () {
        if (!this.interpreterPanel) {
            this.interpreterPanel = new Ext.panel.Panel({
                layout: 'form',
                title: t('coreshop_index_interpreter_settings')
            });
        }

        return this.interpreterPanel;
    },

    getInterpreterPanelLayout: function (type) {
        if (type) {
            type = type.toLowerCase();

            //Check if some class for getterPanel is available
            if (coreshop.index.interpreters[type]) {
                var interpreter = new coreshop.index.interpreters[type];

                this.interpreterPanelClass = interpreter;
                this.getInterpreterPanel().add(interpreter.getForm(this.record, this.record.data.interpreterConfig));
                this.getInterpreterPanel().show();
            } else {
                this.interpreterPanelClass = null;
                this.getInterpreterPanel().hide();
            }
        } else {
            this.interpreterPanelClass = null;
            this.getInterpreterPanel().hide();
        }
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.index.worker');
pimcore.registerNS('coreshop.index.worker.abstract');

coreshop.index.worker.abstract = Class.create({
    parent: null,

    initialize: function (parent) {
        this.parent = parent;
    },

    getForm: function (configuration) {
        return Ext.form.Panel({
            items: this.getFields(configuration)
        });
    },

    getFields: function (configuration) {
        return [];
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.worker.type.mysql');
coreshop.index.worker.mysql = Class.create(coreshop.index.worker.abstract, {
    getFields: function (config) {
        var me = this;

        me.indexesGrid = me.getIndexGrid(false, config);
        me.localizedIndexesGrid = me.getIndexGrid(true, config);

        return {
            xtype: 'panel',
            items: [
                me.indexesGrid,
                me.localizedIndexesGrid
            ]
        };
    },

    getIndexGrid: function (localized, config) {
        var me = this;
        var modelName = 'coreshop.model.index.mysql';

        if (!Ext.ClassManager.get(modelName)) {
            Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['type', 'columns']
                }
            );
        }

        var values = config[localized ? 'localizedIndexes' : 'indexes'];

        if (!Ext.isObject(values)) {
            values = {};
        }

        var store = Ext.create('Ext.data.Store', {
            // destroy the store if the grid is destroyed
            autoDestroy: true,
            proxy: {
                type: 'memory'
            },
            model: modelName,
            data: Object.values(values)
        });

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            listeners: {
                beforeedit: function (editor, context, eOpts) {
                    if (context.colIdx === 1) {
                        context.column.setEditor({
                            xtype: 'combo',
                            store: {
                                data: me.getColumns(localized)
                            },
                            mode: 'local',
                            displayField: 'name',
                            valueField: 'name',
                            forceSelection: true,
                            triggerAction: 'all',
                            allowBlank: false,
                            multiSelect: true
                        });

                    }
                }
            }
        });


        var grid = Ext.create({
            xtype: 'grid',
            store: store,
            minHeight: 200,
            title: t(('coreshop_index_mysql_index' + (localized ? '_localized' : ''))),
            columns: [{
                header: t('type'),
                dataIndex: 'type',
                width: 100,
                editor: {
                    xtype: 'combo',
                    store: [
                        ['INDEX', 'INDEX'],
                        ['UNIQUE', 'UNIQUE']
                    ]
                }
            }, {
                header: t('columns'),
                dataIndex: 'columns',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: {
                        data: me.getColumns(localized)
                    },
                    mode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    forceSelection: true,
                    triggerAction: 'all',
                    allowBlank: false,
                    multiSelect: true
                }
            }],
            tbar: [{
                text: t('add'),
                iconCls: 'pimcore_icon_add',
                handler: function () {
                    rowEditing.cancelEdit();

                    // Create a model instance
                    var r = Ext.create(modelName, {
                        type: 'INDEX',
                        columns: ''
                    });

                    store.insert(0, r);
                    rowEditing.startEdit(r, 0);
                }
            }, {
                itemId: 'removeIndex',
                text: t('delete'),
                iconCls: 'pimcore_icon_delete',
                handler: function () {
                    var sm = grid.getSelectionModel();
                    rowEditing.cancelEdit();
                    store.remove(sm.getSelection());
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                },
                disabled: true
            }],
            plugins: [rowEditing],
            listeners: {
                'selectionchange': function (view, records) {
                    grid.down('#removeIndex').setDisabled(!records.length);
                }
            }
        });

        return grid;
    },

    getColumns: function (localized) {
        var interpreters = this.parent.parentPanel.interpreterStore.getRange().filter(function (rec) {
            return rec.data.localized === true;
        }).map(function (rec) {
            return rec.getId();
        });
        var fields = Ext.Object.getValues(this.parent.fieldsPanel.getData());

        return fields.filter(function (field) {
            var result = false;

            if (field.objectType === 'localizedfield') {
                result = true;
            }
            else if (field.hasOwnProperty('interpreter') && interpreters.indexOf(field.interpreter) >= 0) {
                result = true;
            }

            return localized ? result : !result;
        });
    },

    getIndexData: function (localized) {
        var me = this,
            grid = localized ? me.localizedIndexesGrid : me.indexesGrid,
            availableFields = me.getColumns(localized).map(function (col) {
                return col.name;
            }),
            indexes = grid.getStore().getRange().map(function (rec) {
                return {
                    type: rec.data.type,
                    columns: rec.data.columns
                };
            }),
            indexesForServer = {};

        indexes.forEach(function (index) {
            index.columns = index.columns.filter(function (col) {
                return availableFields.indexOf(col) >= 0;
            });
            var cols = index.columns.join('');

            indexesForServer[cols] = index;
        });

        return indexesForServer;
    },

    getData: function () {
        return {
            indexes: this.getIndexData(false),
            localizedIndexes: this.getIndexData(true)
        };
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.item');

coreshop.filter.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_filters',

    url: {
        save: '/admin/coreshop/filters/save'
    },

    indexFieldsStore: null,

    getPanel: function () {
        panel = new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: this.getItems()
        });

        return panel;
    },

    getItems: function () {
        this.preConditions = new coreshop.filter.condition(this, this.parentPanel.conditions, 'preConditions', 'pre_conditions');
        this.conditions = new coreshop.filter.condition(this, this.parentPanel.conditions, 'conditions');
        //this.similarities = new coreshop.filter.similarity(this, this.parentPanel.similarities);

        var items = [
            this.getSettings(),
            this.preConditions.getLayout(),
            this.conditions.getLayout()
            //this.similarities.getLayout()
        ];

        // add saved conditions
        if (this.data.preConditions) {
            Ext.each(this.data.preConditions, function (condition, index) {
                this.preConditions.addCondition(condition.type, condition, index);
            }.bind(this));
        }

        if (this.data.conditions) {
            Ext.each(this.data.conditions, function (condition, index) {
                this.conditions.addCondition(condition.type, condition, index);
            }.bind(this));
        }

        /*if (this.data.similarities) {
         Ext.each(this.data.similarities, function (similarity) {
         this.similarities.addSimilarity(similarity.type, similarity);
         }.bind(this));
         }*/

        this.indexCombo.setValue(this.data.index);

        if (!this.data.index) {
            this.preConditions.disable();
            this.conditions.disable();
        }

        return items;
    },

    getFieldsForIndex: function (forceReload) {
        if (!this.indexFieldsStore) {
            var proxy = new Ext.data.HttpProxy({
                url: '/admin/coreshop/filters/get-fields-for-index'
            });

            var reader = new Ext.data.JsonReader({}, [
                {name: 'name'}
            ]);

            this.indexFieldsStore = new Ext.data.Store({
                restful: false,
                proxy: proxy,
                reader: reader,
                autoload: true
            });
        }

        if (forceReload || !this.indexFieldsStore.isLoaded()) {
            this.indexFieldsStore.proxy.extraParams = {index: this.indexCombo.getValue()};
            this.indexFieldsStore.load({
                params: {
                    index: this.indexCombo.getValue()
                }
            });
        }

        return this.indexFieldsStore;
    },

    getSettings: function () {
        var data = this.data;

        this.indexCombo = Ext.create({
            xtype: 'combo',
            fieldLabel: t('coreshop_filters_index'),
            typeAhead: true,
            listWidth: 100,
            width: 250,
            store: pimcore.globalmanager.get('coreshop_indexes'),
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            triggerAction: 'all',
            name: 'index',
            value: data.index,
            listeners: {
                change: function (combo, value) {
                    if (value) {
                        this.conditions.enable();
                        this.preConditions.enable();

                        this.getFieldsForIndex();
                    } else {
                        this.conditions.disable();
                        this.preConditions.disable();
                    }
                }.bind(this)
            }
        });

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: t('name'),
                width: 250,
                value: data.name
            }, this.indexCombo, {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_order'),
                name: 'orderDirection',
                value: data.orderDirection,
                width: 250,
                store: [['desc', t('coreshop_filters_order_desc')], ['asc', t('coreshop_filters_order_asc')]],
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                name: 'orderKey',
                fieldLabel: t('coreshop_filters_orderKey'),
                width: 250,
                value: data.orderKey
            }, {
                xtype: 'numberfield',
                fieldLabel: t('coreshop_filters_resultsPerPage'),
                name: 'resultsPerPage',
                value: data.resultsPerPage,
                minValue: 1,
                decimalPrecision: 0,
                step: 1
            }]
        });

        return this.settingsForm;
    },

    getSaveData: function () {
        var saveData = this.settingsForm.getForm().getFieldValues();

        saveData['preConditions'] = this.preConditions.getData();
        saveData['conditions'] = this.conditions.getData();
        //saveData['similarities'] = this.similarities.getData();

        return saveData;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.panel');

coreshop.filter.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_filters_panel',
    storeId: 'coreshop_filters',
    iconCls: 'coreshop_icon_filters',
    type: 'coreshop_filters',

    url: {
        add: '/admin/coreshop/filters/add',
        delete: '/admin/coreshop/filters/delete',
        get: '/admin/coreshop/filters/get',
        list: '/admin/coreshop/filters/list'
    },

    /**
     * @var array
     */
    conditions: [],

    /**
     * constructor
     */
    initialize: function () {
        var me = this;

        pimcore.globalmanager.get('coreshop_indexes').load();

        Ext.Ajax.request({
            url: '/admin/coreshop/filters/get-config',
            method: 'GET',
            success: function (result) {
                var config = Ext.decode(result.responseText);

                me.conditions = config.conditions;
                //me.similarities = config.similarities;
            }
        });

        // create layout
        this.getLayout();

        this.panels = [];
    },

    getItemClass: function() {
        return coreshop.filter.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.abstract');

coreshop.filter.abstract = Class.create({

    /**
     * coreshop.filter.item
     */
    parent: {},
    data: {},

    type: 'abstract',
    elementType: 'abstract',

    form: null,

    initialize: function (parent, data, index) {
        this.parent = parent;
        this.data = data;

        if (!data.hasOwnProperty('configuration')) {
            data.configuration = {};
        }
    },

    getLayout: function () {
        var myId = Ext.id();

        var items = this.getDefaultItems();

        this.form = new Ext.form.Panel({
            items: items
        });

        this.configurationForm = new Ext.form.Panel({
            items: this.getItems()
        });

        return new Ext.panel.Panel({
            xparent: this,
            bodyPadding: 10,
            id: myId,
            style: 'margin: 10px 0 0 0',
            tbar: this.getTopBar(t('coreshop_filters_' + this.type), myId, this.parent, this.data, 'coreshop_filters_icon_' + this.elementType + '_' + this.type),
            border: true,
            items: [
                this.form,
                this.configurationForm
            ]
        });
    },

    getData: function () {
        var data = this.form.getForm().getFieldValues();

        data['configuration'] = this.configurationForm.getForm().getFieldValues();

        return data;
    },

    getFieldsComboBox: function (fieldName) {
        fieldName = Ext.isDefined(fieldName) ? fieldName : 'field';
        var comboName = fieldName + 'sCombo';

        if (!this[comboName]) {

            this.valueStore = new Ext.data.ArrayStore({
                proxy: new Ext.data.HttpProxy({
                    url: '/admin/coreshop/filters/get-values-for-filter-field'
                }),
                reader: new Ext.data.JsonReader({}, [
                    {name: 'value'},
                    {name: 'key'}
                ])
            });

            this[comboName] = Ext.create({
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_' + fieldName),
                name: fieldName,
                width: 400,
                store: this.parent.getFieldsStore(),
                displayField: 'name',
                valueField: 'name',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.hasOwnProperty(fieldName) ? this.data.configuration[fieldName] : null,
                listeners: {
                    change: function (combo, newValue) {
                        this.onFieldChange.call(this, combo, newValue);
                    }.bind(this)
                }
            });
        }

        if (this.data.configuration.hasOwnProperty(fieldName) && this.data.configuration[fieldName]) {
            this.onFieldChange(this[comboName], this.data.configuration[fieldName]);
        }

        return this[comboName];
    },

    onFieldChange: function (combo, newValue) {
        this.valueStore.proxy.extraParams = {
            field: newValue,
            index: combo.getStore().proxy.extraParams['index']
        };

        this.valueStore.load({
            params: this.valueStore.proxy.extraParams
        });
    },

    getIndex: function (blockElement, container) {
        // detect index
        var index;

        for (var s = 0; s < container.items.items.length; s++) {
            if (container.items.items[s].getId() == blockElement.getId()) {
                index = s;
                break;
            }
        }

        return index;
    },

    /**
     * @param name
     * @param index
     * @param parent
     * @param data
     * @param iconCls
     * @returns {Array}
     */
    getTopBar: function (name, index, parent, data, iconCls) {
        var container = parent.fieldsContainer;

        return [{
            iconCls: iconCls,
            disabled: true,
            xtype: 'button'
        }, {
            xtype: 'tbtext',
            text: '<b>' + name + '</b>'
        }, '-', {
            iconCls: 'pimcore_icon_up',
            handler: function (blockId, parent, container) {

                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.filter[this.elementType].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                var newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = 0;
                }

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(newIndex, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();
            }.bind(this, index, parent, container),
            xtype: 'button'
        }, {
            iconCls: 'pimcore_icon_down',
            handler: function (blockId, parent, container) {

                var container = container;
                var blockElement = Ext.getCmp(blockId);
                var index = coreshop.filter[this.elementType].abstract.prototype.getIndex(blockElement, container);
                var tmpContainer = pimcore.viewport;

                // move this node temorary to an other so ext recognizes a change
                container.remove(blockElement, false);
                tmpContainer.add(blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                // move the element to the right position
                tmpContainer.remove(blockElement, false);
                container.insert(index + 1, blockElement);
                container.updateLayout();
                tmpContainer.updateLayout();

                pimcore.layout.refresh();

            }.bind(this, index, parent, container),
            xtype: 'button'
        }, '->', {
            iconCls: 'pimcore_icon_delete',
            handler: function (index, parent, container) {
                container.remove(Ext.getCmp(index));
            }.bind(this, index, parent, container),
            xtype: 'button'
        }];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.condition');

coreshop.filter.condition = Class.create({

    type: null,

    initialize: function (parent, conditions, type, label) {
        this.parent = parent;
        this.conditions = conditions;
        this.type = type;
        this.label = label ? label : type;
    },

    getFieldsStore: function () {
        return this.parent.getFieldsForIndex();
    },

    getLayout: function () {
        // init
        var _this = this;
        var addMenu = [];

        // show only defined conditions
        Ext.each(this.conditions, function (condition) {
            addMenu.push({
                iconCls: 'coreshop_filters_icon_conditions_' + condition,
                text: t('coreshop_filters_' + condition),
                handler: _this.addCondition.bind(_this, condition, {})
            });

        });

        this.fieldsContainer = new Ext.Panel({
            iconCls: 'coreshop_filters_' + this.type,
            title: t('coreshop_filters_' + this.label),
            autoScroll: true,
            style: 'padding: 10px',
            forceLayout: true,
            tbar: [{
                iconCls: 'pimcore_icon_add',
                menu: addMenu
            }],
            border: false
        });

        return this.fieldsContainer;
    },

    disable: function () {
        this.fieldsContainer.disable();
    },

    enable: function () {
        this.fieldsContainer.enable();
    },

    addCondition: function (type, data) {
        if (Object.keys(coreshop.filter.conditions).indexOf(type) >= 0) {
            // create condition
            var item = new coreshop.filter.conditions[type](this, data);

            // add logic for brackets
            var tab = this;

            this.fieldsContainer.add(item.getLayout());
            this.fieldsContainer.updateLayout();
        }
    },

    getData: function () {
        // get defined conditions
        var conditionsData = [];
        var conditions = this.fieldsContainer.items.getRange();
        for (var i = 0; i < conditions.length; i++) {
            var conditionItem = conditions[i];
            var conditionClass = conditionItem.xparent;
            var form = conditionClass.form;

            var condition = {};

            if (Ext.isFunction(conditionClass.getData)) {
                condition = conditionClass.getData();
            }
            else {
                condition = form.form.getFieldValues();
            }

            if (conditionClass.data.id) {
                condition['id'] = conditionClass.data.id;
            }

            condition['type'] = conditions[i].xparent.type;

            conditionsData.push(condition);
        }

        return conditionsData;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.similarity');

coreshop.filter.similarity = Class.create({

    type: null,

    initialize: function (parent, similarities) {
        this.parent = parent;
        this.similarities = similarities;
    },

    getFieldsStore: function () {
        return this.parent.getFieldsForIndex();
    },

    getLayout: function () {
        // init
        var _this = this;
        var addMenu = [];

        Ext.each(this.similarities, function (similarity) {

            if (similarity === 'abstract')
                return;

            addMenu.push({
                iconCls: 'coreshop_filters_icon_similarities_' + similarity,
                text: t('coreshop_filters_' + similarity),
                handler: _this.addSimilarity.bind(_this, similarity, {})
            });

        });

        this.fieldsContainer = new Ext.Panel({
            iconCls: 'coreshop_product_similarity',
            title: t('coreshop_product_similarity'),
            autoScroll: true,
            style: 'padding: 10px',
            forceLayout: true,
            tbar: [{
                iconCls: 'pimcore_icon_add',
                menu: addMenu
            }],
            border: false
        });

        return this.fieldsContainer;
    },

    disable: function () {
        this.fieldsContainer.disable();
    },

    enable: function () {
        this.fieldsContainer.enable();
    },

    addSimilarity: function (type, data) {
        if (Object.keys(coreshop.filter.similarities).indexOf(type) >= 0) {
            // create similarity
            var item = new coreshop.filter.similarities[type](this, data);

            // add logic for brackets
            var tab = this;

            this.fieldsContainer.add(item.getLayout());
            this.fieldsContainer.updateLayout();
        }
    },

    getData: function () {
        // get defined similarities
        var similarityData = [];
        var similarities = this.fieldsContainer.items.getRange();
        for (var i = 0; i < similarities.length; i++) {
            var similarityItem = similarities[i];
            var similarityClass = similarityItem.xparent;
            var form = similarityClass.form;

            var similarity = form.form.getFieldValues();
            similarity['type'] = similarities[i].xparent.type;

            similarityData.push(similarity);
        }

        return similarityData;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions');
pimcore.registerNS('coreshop.filter.conditions.abstract');

coreshop.filter.conditions.abstract = Class.create(coreshop.filter.abstract, {
    elementType: 'conditions',

    getDefaultItems: function () {
        var quantityUnitStore = pimcore.helpers.quantityValue.getClassDefinitionStore();
        quantityUnitStore.on("load", function (store) {
            store.insert(0,
                {
                    'abbreviation': t('empty'),
                    'id': 0
                }
            )
        });

        return [
            {
                xtype: 'textfield',
                name: 'label',
                width: 400,
                fieldLabel: t('label'),
                value: this.data.label
            },
            {
                xtype: 'combobox',
                name: 'quantityUnit',
                triggerAction: "all",
                editable: false,
                width: 400,
                fieldLabel: t('coreshop_filters_quantityUnit'),
                store: quantityUnitStore,
                value: this.data.quantityUnit ? this.data.quantityUnit : 0,
                displayField: 'abbreviation',
                valueField: 'id'
            }
        ];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.nested');
coreshop.filter.conditions.nested = Class.create(coreshop.filter.conditions.abstract, {

    type: 'nested',

    operatorCombo: null,
    conditions: null,

    getDefaultItems: function () {
        this.labelField = Ext.create({
            xtype: 'textfield',
            name: 'label',
            width: 400,
            fieldLabel: t('label'),
            value: this.data.label
        });

        return [
            this.labelField
        ];
    },

    getItems: function () {
        this.conditions = new this.parent.__proto__.constructor(this.parent.parent, this.parent.conditions, 'nested');

        var layout = this.conditions.getLayout();
        layout.setTitle(null);
        layout.setIconCls(null);

        // add saved conditions
        if (this.data && this.data.configuration.conditions) {
            Ext.each(this.data.configuration.conditions, function (condition) {
                this.conditions.addCondition(condition.type, condition);
            }.bind(this));
        }

        return [new Ext.panel.Panel({
            items: [
                layout
            ]
        })];
    },

    getData: function () {
        var conditions = this.conditions.getData();

        Ext.Object.each(conditions, function(key, cond) {
            if (!cond.id) {
                cond.id = Ext.id(null, 'cs-');
            }
        });

        return {
            configuration: {
                conditions: conditions,
            },
            label: this.labelField.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.multiselect');

coreshop.filter.conditions.multiselect = Class.create(coreshop.filter.conditions.abstract, {

    type: 'multiselect',

    getItems: function () {
        return [
            this.getFieldsComboBox(),
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_values'),
                name: 'preSelects',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                multiSelect: true,
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelects
            }
        ];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.range');

coreshop.filter.conditions.range = Class.create(coreshop.filter.conditions.abstract, {

    type: 'range',

    getItems: function () {
        return [
            this.getFieldsComboBox(),
            {
                fieldLabel: t('coreshop_filters_step_count'),
                xtype: 'numberfield',
                name: 'stepCount',
                value: this.data.configuration.stepCount,
                width: 400,
                decimalPrecision: 2
            },
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_value_min'),
                name: 'preSelectMin',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelectMin
            },
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_value_max'),
                name: 'preSelectMax',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelectMax
            }
        ];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.select');

coreshop.filter.conditions.select = Class.create(coreshop.filter.conditions.abstract, {

    type: 'select',

    getItems: function () {
        return [
            this.getFieldsComboBox(),
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_value'),
                name: 'preSelect',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelect
            }
        ];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.relational_multiselect');

coreshop.filter.conditions.relational_multiselect = Class.create(coreshop.filter.conditions.abstract, {
    type: 'relational_multiselect',

    getItems: function () {
        return [
            this.getFieldsComboBox(),
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_values'),
                name: 'preSelects',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                multiSelect: true,
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelects
            }
        ];
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.relational_select');

coreshop.filter.conditions.relational_select = Class.create(coreshop.filter.conditions.abstract, {
    type: 'relational_select',

    getItems: function () {
        return [
            this.getFieldsComboBox(),
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_filters_value'),
                name: 'preSelect',
                width: 400,
                store: this.valueStore,
                displayField: 'value',
                valueField: 'key',
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local',
                value: this.data.configuration.preSelects
            }
        ];
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.conditions.category_select');

coreshop.filter.conditions.category_select = Class.create(coreshop.filter.conditions.abstract, {
    type: 'category_select',

    getDefaultItems: function () {
        return [
            {
                xtype: 'textfield',
                name: 'label',
                width: 400,
                fieldLabel: t('label'),
                value: this.data.label
            }
        ];
    },

    getItems: function () {

        var catValue = this.data.configuration.preSelect;
        var categorySelect = new coreshop.object.elementHref({
            id: catValue,
            type: 'object',
            subtype: coreshop.class_map.coreshop.category
        }, {
            objectsAllowed: true,
            classes: [{
                classes: coreshop.class_map.coreshop.category
            }],
            name: 'preSelect',
            title: t('coreshop_filters_category_name')
        });

        return [
            categorySelect.getLayoutEdit(),
            {
                xtype: 'checkbox',
                fieldLabel: t('coreshop_filters_include_subcategories'),
                name: 'includeSubCategories',
                checked: this.data.configuration.includeSubCategories
            }
        ];
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.similarities');
pimcore.registerNS('coreshop.filter.similarities.abstract');

coreshop.filter.similarities.abstract = Class.create(coreshop.filter.abstract, {
    elementType: 'similarities',

    getDefaultItems: function () {
        return [
            this.getFieldsComboBox()
        ];
    },

    getItems: function () {
        return [
            {
                xtype: 'numberfield',
                fieldLabel: t('coreshop_filters_similarity_weight'),
                name: 'weight',
                width: 400,
                value: this.data.weight
            }
        ];
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.filter.similarities.field');

coreshop.filter.similarities.field = Class.create(coreshop.filter.similarities.abstract, {
    type: 'field'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopFilter');
pimcore.object.classes.data.coreShopFilter = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopFilter',

    getTypeName: function () {
        return t('coreshop_filter');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_filters';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopFilter');
pimcore.object.tags.coreShopFilter = Class.create(coreshop.object.tags.select, {

    type: 'coreShopFilter',
    storeName: 'coreshop_filters',
    allowEmpty: true
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shipping.resource');
coreshop.shipping.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_carriers', 'coreshop/carriers', [
            [
                {name: 'id'},
                {name: 'identifier'}
            ]
        ]);
        coreshop.global.addStore('coreshop_carrier_shipping_rules', 'coreshop/shipping_rules');

        pimcore.globalmanager.get('coreshop_carriers').load();
        pimcore.globalmanager.get('coreshop_carrier_shipping_rules').load();

        coreshop.broker.fireEvent('resource.register', 'coreshop.shipping', this);
    },

    openResource: function(item) {
        if (item === 'carrier') {
            this.openCarrierResource();
        } else if (item === 'shipping_rules') {
            this.openShippingRules();
        }
    },

    openCarrierResource: function() {
        try {
            pimcore.globalmanager.get('coreshop_carriers_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_carriers_panel', new coreshop.carrier.panel());
        }
    },

    openShippingRules: function() {
        try {
            pimcore.globalmanager.get('coreshop_carrier_shipping_rule_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_carrier_shipping_rule_panel', new coreshop.shippingrule.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.shipping.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.carrier.item');
coreshop.carrier.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_carrier',

    url: {
        save: '/admin/coreshop/carriers/save'
    },

    initialize: function (parentPanel, data, panelKey, type) {
        this.parentPanel = parentPanel;
        this.data = data;
        this.panelKey = panelKey;
        this.type = type;

        pimcore.globalmanager.get('coreshop_carrier_shipping_rules').load(function () {
            this.initPanel();
        }.bind(this));
    },

    getPanel: function () {
        return new Ext.TabPanel({
            activeTab: 0,
            title: this.data.identifier,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: this.getItems()
        });
    },

    getTitleText: function () {
        return this.data.identifier;
    },

    getItems: function () {
        return [
            this.getSettings(),
            this.getShippingLocationsAndCosts()
        ];
    },

    /**
     * Basic carrier Settings
     * @returns Ext.form.FormPanel
     */
    getSettings: function () {
        var data = this.data,
            langTabs = [];

        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var tab = {
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'translations.' + lang + '.title',
                    fieldLabel: t('title'),
                    value: data.translations && data.translations[lang] ? data.translations[lang].title : '',
                    required: true
                }, {
                    xtype: 'textarea',
                    name: 'translations.' + lang + '.description',
                    fieldLabel: t('description'),
                    width: 400,
                    value: data.translations && data.translations[lang] ? data.translations[lang].description : ''
                }]
            };

            langTabs.push(tab);
        });

        this.settingsForm = new Ext.form.Panel({
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'fieldset',
                autoHeight: true,
                labelWidth: 350,
                defaultType: 'textfield',
                defaults: {width: '100%'},
                items: [
                    {
                        xtype: 'textfield',
                        name: 'identifier',
                        fieldLabel: t('coreshop_identifier'),
                        value: data.identifier,
                        required: true
                    }, {
                        xtype: 'textfield',
                        name: 'trackingUrl',
                        fieldLabel: t('coreshop_carrier_trackingUrl'),
                        value: data.trackingUrl
                    }, {
                        xtype: 'tabpanel',
                        activeTab: 0,
                        defaults: {
                            autoHeight: true,
                            bodyStyle: 'padding:10px;'
                        },
                        items: langTabs
                    }
                ]
            }]
        });

        return this.settingsForm;
    },

    getShippingRulesGrid: function () {
        this.shippingRuleGroupsStore = new Ext.data.Store({
            restful: false,
            idProperty: 'id',
            sorters: 'priority',
            data: this.data.shippingRules
        });

        this.shippingRuleGroupsGrid = Ext.create('Ext.grid.Panel', {
            store: this.shippingRuleGroupsStore,
            columns: [
                {
                    header: t('coreshop_carriers_shipping_rule'),
                    flex: 2,
                    dataIndex: 'shippingRule',
                    editor: new Ext.form.ComboBox({
                        store: pimcore.globalmanager.get('coreshop_carrier_shipping_rules'),
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        required: true
                    }),
                    renderer: function (shippingRule) {
                        var store = pimcore.globalmanager.get('coreshop_carrier_shipping_rules');
                        var pos = store.findExact('id', shippingRule);
                        if (pos >= 0) {
                            return store.getAt(pos).get('name');
                        }

                        return null;
                    }
                },
                {
                    header: t('priority'),
                    width: 200,
                    dataIndex: 'priority',
                    editor: {
                        xtype: 'numberfield',
                        decimalPrecision: 0,
                        required: true
                    }
                },
                {
                    header: t('coreshop_carriers_stop_propagation'),
                    dataIndex: 'stopPropagation',
                    flex: 1,
                    xtype: 'checkcolumn',
                    listeners: {
                        checkchange: function (column, rowIndex, checked, eOpts) {
                            var grid = column.up('grid'),
                                store = grid.getStore();
                            if (checked) {
                                store.each(function (record, index) {
                                    if (rowIndex !== index) {
                                        record.set('stopPropagation', false);
                                    }
                                });
                            }
                        }
                    }
                },
                {
                    xtype: 'actioncolumn',
                    width: 40,
                    items: [{
                        iconCls: 'pimcore_icon_delete',
                        tooltip: t('delete'),
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);

                            grid.getStore().remove(rec);
                        }
                    }]
                }
            ],
            tbar: [
                {
                    text: t('add'),
                    handler: function () {
                        this.shippingRuleGroupsStore.add({
                            id: null,
                            carrier: this.data.id,
                            shippingRule: null,
                            stopPropagation: false,
                            priority: 100
                        });
                    }.bind(this),
                    iconCls: 'pimcore_icon_add'
                }
            ],

            plugins: Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1,
                listeners: {}
            })
        });

        return this.shippingRuleGroupsGrid;
    },

    getShippingLocationsAndCosts: function () {
        //Shipping locations and costs
        this.shippingLocationAndCosts = new Ext.form.Panel({
            iconCls: 'coreshop_carrier_costs_icon',
            title: t('coreshop_carrier_shipping_locations_and_costs'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'checkbox',
                name: 'isFree',
                fieldLabel: t('coreshop_carrier_isFree'),
                width: 250,
                value: parseInt(this.data.isFree)
            }, this.getShippingRulesGrid()]
        });

        return this.shippingLocationAndCosts;
    },

    getSaveData: function () {
        var data = {
            shippingRules: []
        };

        Ext.apply(data, this.settingsForm.getForm().getFieldValues());
        Ext.apply(data, this.shippingLocationAndCosts.getForm().getFieldValues());

        var ruleGroups = this.shippingRuleGroupsStore.getRange();

        Ext.each(ruleGroups, function (group) {
            var rule = {
                priority: group.get('priority'),
                stopPropagation: group.get('stopPropagation'),
                shippingRule: group.get('shippingRule'),
                carrier: this.data.id
            };

            data.shippingRules.push(rule);
        }.bind(this));

        return data;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.carrier.panel');
coreshop.carrier.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_carriers_panel',
    storeId: 'coreshop_carriers',
    iconCls: 'coreshop_icon_carriers',
    type: 'coreshop_carriers',

    url: {
        add: '/admin/coreshop/carriers/add',
        delete: '/admin/coreshop/carriers/delete',
        get: '/admin/coreshop/carriers/get',
        list: '/admin/coreshop/carriers/list'
    },

    getItemClass: function() {
        return coreshop.carrier.item;
    },

    getDefaultGridDisplayColumnName: function() {
        return 'identifier';
    },

    prepareAdd: function (object) {
        object['identifier'] = object.name;
        return object;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.item');

coreshop.shippingrule.item = Class.create(coreshop.rules.item, {

    iconCls: 'coreshop_icon_carrier_shipping_rule',

    url: {
        save: '/admin/coreshop/shipping_rules/save'
    },

    getPanel: function () {
        var items = this.getItems();

        //items.push(this.getUsedByPanel()); TODO!!

        this.panel = new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: items
        });

        return this.panel;
    },

    getSettings: function () {
        var data = this.data;

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: t('name'),
                width: 250,
                value: data.name
            }, {
                xtype: 'checkbox',
                name: 'active',
                fieldLabel: t('active'),
                checked: data.active
            }]
        });

        return this.settingsForm;
    },

    getUsedByPanel: function () {
        this.store = new Ext.data.JsonStore({
            fields: [
                'id',
                'name'
            ],
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/carrier-shipping-rule/get-used-by-carriers',
                reader: {
                    type: 'json',
                    rootProperty: 'carriers'
                },
                extraParams: {
                    id: this.data.id
                }
            }
        });

        var columns = [
            {
                text: t('id'),
                dataIndex: 'id'
            },
            {
                text: t('coreshop_carrier'),
                dataIndex: 'name',
                flex: 1
            }
        ];

        this.grid = Ext.create('Ext.grid.Panel', {
            title: t('coreshop_carriers'),
            iconCls: 'coreshop_icon_carriers',
            store: this.store,
            columns: columns,
            region: 'center'
        });

        this.store.load();

        return this.grid;
    },

    getActionContainerClass: function () {
        return coreshop.shippingrule.action;
    },

    getConditionContainerClass: function () {
        return coreshop.shippingrule.condition;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.panel');
coreshop.shippingrule.panel = Class.create(coreshop.rules.panel, {
    /**
     * @var string
     */
    layoutId: 'coreshop_carrier_shipping_rule_panel',
    storeId: 'coreshop_carrier_shipping_rules',
    iconCls: 'coreshop_icon_carrier_shipping_rule',
    type: 'coreshop_carriers_shipping_rules',

    url: {
        add: '/admin/coreshop/shipping_rules/add',
        delete: '/admin/coreshop/shipping_rules/delete',
        get: '/admin/coreshop/shipping_rules/get',
        list: '/admin/coreshop/shipping_rules/list',
        config: '/admin/coreshop/shipping_rules/get-config'
    },

    getItemClass: function () {
        return coreshop.shippingrule.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.action');

coreshop.shippingrule.action = Class.create(coreshop.rules.action, {
    getActionClassNamespace: function () {
        return coreshop.shippingrule.actions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.condition');

coreshop.shippingrule.condition = Class.create(coreshop.rules.condition, {
    getConditionClassNamespace: function () {
        return coreshop.shippingrule.conditions;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.additionPercent');
coreshop.shippingrule.actions.additionPercent = Class.create(coreshop.rules.actions.abstract, {
    type: 'additionPercent',

    getForm: function () {
        var percentValue = 0;
        var me = this;

        if (this.data) {
            percentValue = this.data.percent;
        }

        var percent = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discountPercent_percent'),
            name: 'percent',
            value: percentValue,
            minValue: 0,
            maxValue: 100,
            decimalPrecision: 0
        });
        this.form = new Ext.form.Panel({
            items: [
                percent
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.discountPercent');
coreshop.shippingrule.actions.discountPercent = Class.create(coreshop.shippingrule.actions.additionPercent, {
    type: 'discountPercent'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.shippingRule');
coreshop.shippingrule.actions.shippingRule = Class.create(coreshop.rules.actions.abstract, {
    type: 'shippingRule',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_carrier_shipping_rules');

        var rule = {
            xtype: 'combo',
            fieldLabel: t('coreshop_action_shippingRule'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'shippingRule',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.shippingRule)
                        this.setValue(me.data.shippingRule);
                }
            }
        };

        if (this.data && this.data.shippingRule) {
            rule.value = this.data.shippingRule;
        }

        this.form = new Ext.form.Panel({
            items: [
                rule
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.amount');
coreshop.shippingrule.conditions.amount = Class.create(coreshop.rules.conditions.abstract, {
    type: 'amount',

    getForm: function () {
        var minAmountValue = 0;
        var maxAmountValue = 0;
        var me = this;

        if (this.data && this.data.minAmount) {
            minAmountValue = this.data.minAmount / 100;
        }

        if (this.data && this.data.maxAmount) {
            maxAmountValue = this.data.maxAmount / 100;
        }

        var minAmount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_amount_minAmount'),
            name: 'minAmount',
            value: minAmountValue,
            minValue: 0,
            decimalPrecision: 2
        });

        var maxAmount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_amount_maxAmount'),
            name: 'maxAmount',
            value: maxAmountValue,
            minValue: 0,
            decimalPrecision: 2
        });

        this.form = Ext.create('Ext.form.Panel', {
            items: [
                minAmount, maxAmount
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.dimension');

coreshop.shippingrule.conditions.dimension = Class.create(coreshop.rules.conditions.abstract, {
    type: 'dimension',

    getForm: function () {

        var heightValue = 0;
        var widthValue = 0;
        var depthValue = 0;
        var me = this;

        if (this.data) {
            if (this.data.height) {
                heightValue = this.data.height;
            }

            if (this.data.width) {
                widthValue = this.data.width;
            }

            if (this.data.depth) {
                depthValue = this.data.depth;
            }
        }

        var height = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_dimension_height'),
            name: 'height',
            value: heightValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        var width = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_dimension_width'),
            name: 'width',
            value: widthValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        var depth = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_dimension_depth'),
            name: 'depth',
            value: depthValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                height, width, depth
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.nested');

coreshop.shippingrule.conditions.nested = Class.create(coreshop.rules.conditions.nested, {

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.postcodes');

coreshop.shippingrule.conditions.postcodes = Class.create(coreshop.rules.conditions.abstract, {
    type: 'postcodes',

    getForm: function () {

        var postCodesValues = '';
        var exclusionValue = false;

        if (this.data) {
            if (this.data.postcodes) {
                postCodesValues = this.data.postcodes;
            }

            if (this.data.exclusion) {
                exclusionValue = this.data.exclusion;
            }
        }

        var info = new Ext.panel.Panel({
            border: false,
            html: t('coreshop_condition_postcodes_info'),
            bodyPadding: '0 0 20px 0'
        });

        var exclusion = new Ext.form.Checkbox({
            fieldLabel: t('coreshop_condition_postcodes_exclusion'),
            name: 'exclusion',
            checked: exclusionValue
        });

        var postcodes = new Ext.form.TextArea({
            fieldLabel: t('coreshop_condition_postcodes'),
            name: 'postcodes',
            value: postCodesValues
        });

        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                info, postcodes, exclusion
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.shippingRule');

coreshop.shippingrule.conditions.shippingRule = Class.create(coreshop.rules.conditions.abstract, {
    type: 'shippingRule',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_carrier_shipping_rules');

        var rule = {
            xtype: 'combo',
            fieldLabel: t('coreshop_condition_shippingRule'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'shippingRule',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.shippingRule)
                        this.setValue(me.data.shippingRule);
                }
            }
        };

        if (this.data && this.data.shippingRule) {
            rule.value = this.data.shippingRule;
        }

        this.form = new Ext.form.Panel({
            items: [
                rule
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.weight');

coreshop.shippingrule.conditions.weight = Class.create(coreshop.rules.conditions.abstract, {
    type: 'weight',

    getForm: function () {
        var minWeightValue = 0;
        var maxWeightValue = 0;

        if (this.data && this.data.minWeight) {
            minWeightValue = this.data.minWeight;
        }

        if (this.data && this.data.maxWeight) {
            maxWeightValue = this.data.maxWeight;
        }

        var minWeight = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_weight_minWeight'),
            name: 'minWeight',
            value: minWeightValue,
            minValue: 0,
            decimalPrecision: 5,
            step: 1
        });

        var maxWeight = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_weight_maxWeight'),
            name: 'maxWeight',
            value: maxWeightValue,
            minValue: 0,
            decimalPrecision: 5,
            step: 1
        });

        this.form = Ext.create('Ext.form.Panel', {
            items: [
                minWeight, maxWeight
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCarrier');
pimcore.object.classes.data.coreShopCarrier = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopCarrier',

    getTypeName: function () {
        return t('coreshop_carrier');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_carrier';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCarrier');
pimcore.object.tags.coreShopCarrier = Class.create(coreshop.object.tags.select, {

    type: 'coreShopCarrier',
    storeName: 'coreshop_carriers',
    displayField: 'identifier'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopCarrierMultiselect');
pimcore.object.classes.data.coreShopCarrierMultiselect = Class.create(coreshop.object.classes.data.dataMultiselect, {

    type: 'coreShopCarrierMultiselect',

    getTypeName: function () {
        return t('coreshop_carrier_multiselect');
    },

    getIconClass: function () {
        return 'coreshop_icon_carrier';
    },

    getGroup: function () {
        return 'coreshop';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopCarrierMultiselect');
pimcore.object.tags.coreShopCarrierMultiselect = Class.create(coreshop.object.tags.multiselect, {

    type: 'coreShopCarrierMultiselect',
    storeName: 'coreshop_carriers',
    displayField: 'identifier'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.payment.resource');
coreshop.payment.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_payment_provider', 'coreshop/payment_providers');

        coreshop.broker.fireEvent('resource.register', 'coreshop.payment', this);
    },

    openResource: function (item) {
        if (item === 'payment_provider') {
            this.openPaymentProvider();
        }
    },

    openPaymentProvider: function () {
        try {
            pimcore.globalmanager.get('coreshop_payment_providers_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_payment_providers_panel', new coreshop.provider.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.payment.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.item');
coreshop.provider.item = Class.create(coreshop.resource.item, {

    iconCls: 'coreshop_icon_payment_provider',

    url: {
        save: '/admin/coreshop/payment_providers/save'
    },

    getItems: function () {
        return [this.getFormPanel()];
    },

    getTitleText: function () {
        return this.data.identifier;
    },

    getFormPanel: function () {
        var data = this.data,
            langTabs = [];

        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var tab = {
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    name: 'translations.' + lang + '.title',
                    fieldLabel: t('title'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].title : ''
                }, {
                    xtype: 'textarea',
                    name: 'translations.' + lang + '.description',
                    fieldLabel: t('description'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].description : ''
                }, {
                    xtype: 'textarea',
                    name: 'translations.' + lang + '.instructions',
                    fieldLabel: t('coreshop_instructions'),
                    width: 400,
                    value: data.translations[lang] ? data.translations[lang].instructions : ''
                }]
            };

            langTabs.push(tab);
        });

        var items = [
            {
                fieldLabel: t('coreshop_identifier'),
                name: 'identifier',
                value: this.data.identifier
            },
            {
                fieldLabel: t('coreshop_position'),
                name: 'position',
                value: this.data.position
            },
            {
                xtype: 'checkbox',
                fieldLabel: t('active'),
                name: 'active',
                checked: this.data.active
            },
            {
                xtype: 'combobox',
                itemId: 'paymentFactory',
                fieldLabel: t('coreshop_payment_provider_factory'),
                name: 'gatewayConfig.factoryName',
                length: 255,
                value: this.data.gatewayConfig ? this.data.gatewayConfig.factoryName : '',
                store: pimcore.globalmanager.get('coreshop_payment_provider_factories'),
                valueField: 'type',
                displayField: 'name',
                queryMode: 'local',
                readOnly: this.data.gatewayConfig && this.data.gatewayConfig.factoryName ? true : false,
                listeners: {
                    change: function (combo, newValue) {
                        this.getGatewayConfigPanel().removeAll();

                        this.getGatewayConfigPanelLayout(newValue);
                    }.bind(this)
                }
            },
            {
                xtype: 'tabpanel',
                activeTab: 0,
                defaults: {
                    autoHeight: true,
                    bodyStyle: 'padding:10px;'
                },
                items: langTabs
            }
        ];

        this.formPanel = new Ext.form.Panel({
            bodyStyle: 'padding:20px 5px 20px 5px;',
            border: false,
            region: 'center',
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true
            },
            buttons: [
                {
                    text: t('save'),
                    handler: this.save.bind(this, function(res) {
                        if (res.success) {
                            this.formPanel.down('#paymentFactory').setReadOnly(true);
                        }
                    }.bind(this)),
                    iconCls: 'pimcore_icon_apply'
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    autoHeight: true,
                    labelWidth: 350,
                    defaultType: 'textfield',
                    defaults: {width: '100%'},
                    items: items
                },
                this.getGatewayConfigPanel()
            ]
        });

        if (this.data.gatewayConfig && this.data.gatewayConfig.factoryName) {
            this.getGatewayConfigPanelLayout(this.data.gatewayConfig.factoryName);
        }

        return this.formPanel;
    },

    getGatewayConfigPanel: function () {
        if (!this.gatewayConfigPanel) {
            this.gatewayConfigPanel = new Ext.form.FieldSet({
                defaults: {anchor: '90%'}
            });
        }

        return this.gatewayConfigPanel;
    },

    getGatewayConfigPanelLayout: function (type) {
        if (type) {
            type = type.toLowerCase();

            //Check if some class for getterPanel is available
            if (coreshop.provider.gateways[type]) {
                var getter = new coreshop.provider.gateways[type];

                this.getGatewayConfigPanel().add(getter.getLayout(this.data.gatewayConfig ? this.data.gatewayConfig.config : []));
                this.getGatewayConfigPanel().show();
            } else {
                this.getGatewayConfigPanel().hide();
            }
        } else {
            this.getGatewayConfigPanel().hide();
        }
    },

    getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();

        if (!values['active']) {
            delete values['active'];
        }

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.panel');
coreshop.provider.panel = Class.create(coreshop.resource.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_payment_providers_panel',
    storeId: 'coreshop_payment_providers',
    iconCls: 'coreshop_icon_payment_provider',
    type: 'coreshop_payment_provider',

    url: {
        add: '/admin/coreshop/payment_providers/add',
        delete: '/admin/coreshop/payment_providers/delete',
        get: '/admin/coreshop/payment_providers/get',
        list: '/admin/coreshop/payment_providers/list',
        config: '/admin/coreshop/payment_providers/get-config'
    },

    factoryTypes: null,

    /**
     * constructor
     */
    initialize: function () {
        this.getConfig();

        this.panels = [];

        this.store = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: this.url.list
            }),
            reader: new Ext.data.JsonReader({
                rootProperty: 'data'
            }, [
                {name: 'id'},
                {name: 'identifier'}
            ]),
            autoload: true
        });
    },

    getTitleText: function () {
        return this.data.identifier;
    },

    getConfig: function () {
        this.factoryTypes = new Ext.data.ArrayStore({
            data: [],
            expandedData: true
        });

        pimcore.globalmanager.add('coreshop_payment_provider_factories', this.factoryTypes);

        Ext.Ajax.request({
            url: this.url.config,
            method: 'get',
            success: function (response) {
                try {
                    var res = Ext.decode(response.responseText);

                    this.factoryTypes.loadData(res.factories);

                    this.getLayout();
                } catch (e) {
                    //pimcore.helpers.showNotification(t('error'), t('coreshop_save_error'), 'error');
                }
            }.bind(this)
        });
    },

    getItemClass: function () {
        return coreshop.payment.provider.item;
    },

    getGridConfiguration: function () {
        return {
            store: this.store
        };
    },

    getDefaultGridDisplayColumnName: function() {
        return 'identifier';
    },

    prepareAdd: function (object) {
        object['identifier'] = object.name;

        return object;
    },

    getItemClass: function() {
        return coreshop.provider.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.gateways');
pimcore.registerNS('coreshop.provider.gateways.abstract');
coreshop.provider.gateways.abstract = Class.create({

    getLayout: function () {
        return [];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.gateways.paypal_express_checkout');
coreshop.provider.gateways.paypal_express_checkout = Class.create(coreshop.provider.gateways.abstract, {

    getLayout: function (config) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_username'),
                name: 'gatewayConfig.config.username',
                length: 255,
                value: config.username ? config.username : ""
            },
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_password'),
                name: 'gatewayConfig.config.password',
                length: 255,
                value: config.password
            },
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_signature'),
                name: 'gatewayConfig.config.signature',
                length: 255,
                value: config.signature
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.provider.gateways.sofort');
coreshop.provider.gateways.sofort = Class.create(coreshop.provider.gateways.abstract, {

    getLayout: function (config) {
        return [
            {
                xtype: 'textfield',
                fieldLabel: t('coreshop_payment_sofort_config_key'),
                name: 'gatewayConfig.config.config_key',
                length: 255,
                value: config.config_key ? config.config_key : ""
            }
        ];
    }

});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.classes.data.coreShopPaymentProvider');
pimcore.object.classes.data.coreShopPaymentProvider = Class.create(coreshop.object.classes.data.select, {

    type: 'coreShopPaymentProvider',

    getTypeName: function () {
        return t('coreshop_payment_provider');
    },

    getGroup: function () {
        return 'coreshop';
    },

    getIconClass: function () {
        return 'coreshop_icon_payment_provider';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.object.tags.coreShopPaymentProvider');
pimcore.object.tags.coreShopPaymentProvider = Class.create(coreshop.object.tags.select, {

    type: 'coreShopPaymentProvider',
    storeName: 'coreshop_payment_provider',
    displayField: 'identifier'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.resource');
coreshop.notification.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.global.addStore('coreshop_notification_rules', 'coreshop/notification_rules');
        pimcore.globalmanager.get('coreshop_notification_rules').sort('sort', 'ASC');

        coreshop.broker.fireEvent('resource.register', 'coreshop.notification', this);
    },

    openResource: function (item) {
        if (item === 'notification_rule') {
            this.openNotificationRule();
        }
    },

    openNotificationRule: function () {
        try {
            pimcore.globalmanager.get('coreshop_notification_rule_panel').activate();
        }
        catch (e) {
            pimcore.globalmanager.add('coreshop_notification_rule_panel', new coreshop.notification.rule.panel());
        }
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.notification.resource();
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.item');

coreshop.notification.rule.item = Class.create(coreshop.rules.item, {

    iconCls: 'coreshop_icon_notification_rule',

    url: {
        save: '/admin/coreshop/notification_rules/save'
    },

    getPanel: function () {
        var items = this.getItems();

        this.panel = new Ext.TabPanel({
            activeTab: 0,
            title: this.data.name,
            closable: true,
            deferredRender: false,
            forceLayout: true,
            iconCls: this.iconCls,
            buttons: [{
                text: t('save'),
                iconCls: 'pimcore_icon_apply',
                handler: this.save.bind(this)
            }],
            items: items
        });

        if (this.data.type) {
            this.reloadTypes(this.data.type);
        }

        return this.panel;
    },

    getSettings: function () {
        var data = this.data;
        var types = [];

        this.parentPanel.getConfig().types.forEach(function (type) {
            types.push([type, t('coreshop_notification_rule_type_' + type)]);
        }.bind(this));

        var typesStore = new Ext.data.ArrayStore({
            data: types,
            fields: ['type', 'typeName'],
            idProperty: 'type'
        });

        this.settingsForm = Ext.create('Ext.form.Panel', {
            iconCls: 'coreshop_icon_settings',
            title: t('settings'),
            bodyStyle: 'padding:10px;',
            autoScroll: true,
            border: false,
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: t('name'),
                    width: 250,
                    value: data.name
                },
                {
                    xtype: 'checkbox',
                    name: 'active',
                    fieldLabel: t('active'),
                    checked: data.active
                },
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_notification_rule_type'),
                    name: 'type',
                    displayField: 'type',
                    valueField: 'type',
                    store: typesStore,
                    value: this.data.type,
                    width: 250,
                    listeners: {
                        change: function (combo, value) {
                            this.reloadTypes(value);
                        }.bind(this)
                    }
                }
            ]
        });

        return this.settingsForm;
    },

    getItems: function () {
        return [
            this.getSettings()
        ];
    },

    reloadTypes: function (type) {
        if (this.actions) {
            this.actions.destroy();
        }

        if (this.conditions) {
            this.conditions.destroy();
        }

        var items = this.getItemsForType(type);

        this.panel.add(items);
    },

    getItemsForType: function (type) {
        var actionContainerClass = this.getActionContainerClass();
        var conditionContainerClass = this.getConditionContainerClass();

        var allowedActions = this.parentPanel.getActionsForType(type);
        var allowedConditions = this.parentPanel.getConditionsForType(type);

        this.actions = new actionContainerClass(allowedActions, type);
        this.conditions = new conditionContainerClass(allowedConditions, type);

        var items = [
            this.conditions.getLayout(),
            this.actions.getLayout()
        ];

        // add saved conditions
        if (this.data.conditions) {
            Ext.each(this.data.conditions, function (condition) {
                var conditionType = condition.type.replace(type + '.', '');

                if (allowedConditions.indexOf(conditionType) >= 0) {
                    this.conditions.addCondition(conditionType, condition);
                }
            }.bind(this));
        }

        // add saved actions
        if (this.data.actions) {
            Ext.each(this.data.actions, function (action) {
                var actionType = action.type.replace(type + '.', '');

                if (allowedActions.indexOf(actionType) >= 0) {
                    this.actions.addAction(actionType, action);
                }
            }.bind(this));
        }

        return items;
    },

    getActionContainerClass: function () {
        return coreshop.notification.rule.action;
    },

    getConditionContainerClass: function () {
        return coreshop.notification.rule.condition;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.panel');

coreshop.notification.rule.panel = Class.create(coreshop.rules.panel, {

    /**
     * @var string
     */
    layoutId: 'coreshop_notification_rule_panel',
    storeId: 'coreshop_notification_rules',
    iconCls: 'coreshop_icon_notification_rule',
    type: 'coreshop_notification_rule',

    url: {
        add: '/admin/coreshop/notification_rules/add',
        delete: '/admin/coreshop/notification_rules/delete',
        get: '/admin/coreshop/notification_rules/get',
        list: '/admin/coreshop/notification_rules/list',
        config: '/admin/coreshop/notification_rules/get-config',
        sort: '/admin/coreshop/notification_rules/sort'
    },

    getItemClass: function () {
        return coreshop.notification.rule.item;
    },

    getActionsForType: function (allowedType) {
        var actions = this.getActions();

        if (actions.hasOwnProperty(allowedType)) {
            return actions[allowedType];
        }

        return [];
    },

    getConditionsForType: function (allowedType) {
        var conditions = this.getConditions();

        if (conditions.hasOwnProperty(allowedType)) {
            return conditions[allowedType];
        }

        return [];
    },

    getGridConfiguration: function () {
        return {
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: t('coreshop_grid_reorder')
                },
                listeners: {
                    drop: function (node, data, dropRec, dropPosition) {
                        this.grid.setLoading(t('loading'));

                        Ext.Ajax.request({
                            url: this.url.sort,
                            method: 'post',
                            params: {
                                rule: data.records[0].getId(),
                                toRule: dropRec.getId(),
                                position: dropPosition
                            },
                            callback: function (request, success, response) {
                                this.grid.setLoading(false);
                                this.grid.getStore().load();
                            }.bind(this)
                        });
                    }.bind(this)
                }
            }
        };
    },

    getItemClass: function() {
        return coreshop.notification.rule.item;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.action');

coreshop.notification.rule.action = Class.create(coreshop.rules.action, {
    initialize: function (actions, type) {
        this.actions = actions;
        this.type = type;
    },

    getActionClassNamespace: function () {
        return coreshop.notification.rule.actions;
    },

    prepareAction: function (action) {
        action['type'] = this.type + '.' + action['type'];

        return action;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.condition');

coreshop.notification.rule.condition = Class.create(coreshop.rules.condition, {
    initialize: function (conditions, type) {
        this.conditions = conditions;
        this.type = type;
    },

    getConditionStyleClass: function (condition) {
        return 'coreshop_rule_icon_condition_' + condition;
    },

    getConditionClassNamespace: function () {
        return coreshop.notification.rule.conditions;
    },

    prepareCondition: function (condition) {
        condition['type'] = this.type + '.' + condition['type'];

        return condition;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.actions.mail');

coreshop.notification.rule.actions.mail = Class.create(coreshop.rules.actions.abstract, {

    type: 'mail',

    fields: {},

    getForm: function () {
        var me = this,
            tabs = [];

        Ext.each(pimcore.settings.websiteLanguages, function (lang) {
            var value = this.data && this.data.mails && this.data.mails.hasOwnProperty(lang) ? this.data.mails[lang] : '';

            this.fields[lang] = new coreshop.object.elementHref({
                id: value,
                type: 'document',
                subtype: 'email'
            }, {
                documentsAllowed: true,
                documentTypes: [{
                    documentTypes: 'email'
                }],
                name: 'mails[' + lang + ']',
                title: t('coreshop_email_document')
            });

            tabs.push({
                title: pimcore.available_languages[lang],
                iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                layout: 'form',
                items: [
                    this.fields[lang].getLayoutEdit()
                ]
            });

        }.bind(this));

        this.doNotSendToDesignatedRecipient = Ext.create({
            fieldLabel: t('coreshop_mail_rule_do_not_send_to_designated_recipient'),
            xtype: 'checkbox',
            name: 'doNotSendToDesignatedRecipient',
            checked: this.data ? this.data.doNotSendToDesignatedRecipient : false
        });

        this.form = new Ext.form.FieldSet({
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    width: '100%',
                    defaults: {
                        autoHeight: true,
                        bodyStyle: 'padding:10px;'
                    },
                    items: tabs
                },
                this.doNotSendToDesignatedRecipient
            ],
            getValues: this.getValues.bind(this)
        });

        return this.form;
    },

    getValues: function () {
        var values = {};

        Ext.Object.each(this.fields, function (key, elementHref) {
            values[key] = elementHref.getValue();
        });

        return {
            mails: values,
            doNotSendToDesignatedRecipient: this.doNotSendToDesignatedRecipient.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.provider.item = Class.create(coreshop.provider.item, {
    getFormPanel: function ($super) {
        var panel = $super(),
            data = this.data;

        panel.down("fieldset").add([
            {
                xtype: 'coreshop.store',
                name: 'stores',
                multiSelect: true,
                typeAhead: false,
                value: data.stores
            }
        ]);

        this.formPanel = panel;

        return this.formPanel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.detail.blocks.carriage');
coreshop.order.order.detail.blocks.carriage = Class.create(coreshop.order.sale.detail.abstractBlock, {
    saleInfo: null,

    initBlock: function () {
        var me = this;

        me.currencyPanel = Ext.create({
            xtype: 'panel',
            style: 'display:block',
            text: t('coreshop_currency')
        });

        me.weightPanel = Ext.create({
            xtype: 'panel',
            style: 'display:block',
            text: t('coreshop_weight')
        });

        me.carrierPanel = Ext.create({
            xtype: 'panel',
            style: 'display:block',
            text: t('coreshop_carrier')
        });

        me.pricePanel = Ext.create({
            xtype: 'panel',
            style: 'display:block',
            text: t('coreshop_price')
        });

        var items = [];

        items.push({
            xtype: 'panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    items: [
                        me.currencyPanel,
                        me.weightPanel
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    items: [
                        me.carrierPanel,
                        me.pricePanel
                    ]
                }
            ]
        });

        this.carrierDetails = Ext.create('Ext.panel.Panel', {
            title: t('coreshop_order') + ': ' + t('coreshop_carrier') + '/' + t('coreshop_paymentProvider'),
            margin: '0 20 20 0',
            border: true,
            flex: 6,
            iconCls: 'coreshop_icon_carrier',
            items: items
        });
    },

    getPriority: function () {
        return 5;
    },

    getPosition: function () {
        return 'left';
    },

    getPanel: function () {
        return this.carrierDetails;
    },

    updateSale: function () {
        var me = this;

        me.currencyPanel.setHtml('<span style="font-weight:bold;">' + t('coreshop_currency') + ': </span>' + me.sale.currency.name);
        me.weightPanel.setHtml('<span style="font-weight:bold;">' + t('coreshop_weight') + ': </span>' + (me.sale.shippingPayment.weight ? me.sale.shippingPayment.weight : 0));
        me.carrierPanel.setHtml('<span style="font-weight:bold;">' + t('coreshop_carrier') + ': </span>' + me.sale.shippingPayment.carrier);
        me.pricePanel.setHtml('<span style="font-weight:bold;">' + t('coreshop_price') + ': </span>' + coreshop.util.format.currency(me.sale.currency.symbol, me.sale.shippingPayment.cost));
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.order.order.shipment = Class.create(coreshop.order.order.shipment, {
    order: null,
    cb: null,

    createWindow: function ($super, shipAbleItems) {
        pimcore.globalmanager.get('coreshop_carriers').load();

        var window = $super(shipAbleItems),
            store = pimcore.globalmanager.get('coreshop_carriers'),
            hasCarrier = this.order.shippingPayment.carrier !== null,
            orderCarrierId = parseInt(this.order.carrier),
            orderCarrierName = this.order.shippingPayment.carrier,
            showToolTip = true;

        var carrier = Ext.create('Ext.form.ComboBox', {
            xtype: 'combo',
            fieldLabel: t('coreshop_carrier'),
            mode: 'local',
            store: store,
            displayField: 'identifier',
            valueField: 'id',
            forceSelection: true,
            triggerAction: 'all',
            name: 'carrier',
            value: orderCarrierId,
            afterLabelTextTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
            ],
            allowBlank: false,
            required: true,
            listeners: {
                render: function (c) {
                    if (hasCarrier === true) {
                        new Ext.ToolTip({
                            target: c.getEl(),
                            html: t('coreshop_carrier_based_on_order').format(orderCarrierName),
                            listeners: {
                                beforeshow: {
                                    fn: function (el) {
                                        if (showToolTip === false) {
                                            return false;
                                        }
                                    }
                                }
                            }
                        });
                    }
                },
                change: function() {
                    showToolTip = false;
                },
                afterrender: function () {
                    if (hasCarrier === true) {
                        var orderCarrierIndex;
                        if (store.isLoaded()) {
                            orderCarrierIndex = store.findExact('id', orderCarrierId);
                            if (orderCarrierIndex !== -1) {
                                this.setValue(store.getAt(orderCarrierIndex));
                            }
                        } else {
                            store.load();
                            store.on('load', function (store, records, options) {
                                orderCarrierIndex = store.findExact('id', orderCarrierId);
                                if (orderCarrierIndex !== -1) {
                                    this.setValue(store.getAt(orderCarrierIndex));
                                }
                            }.bind(this));
                        }
                    }
                }
            }
        });

        window.down('form').insert(0, carrier);

        return window;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.sale.create.step.shipping');
coreshop.order.sale.create.step.shipping = Class.create(coreshop.order.sale.create.abstractStep, {
    carriersStore: null,

    initStep: function () {
        var me = this;

        me.eventManager.on('products.changed', function () {
            me.reloadCarriers();
        });
        me.eventManager.on('address.changed', function () {
            me.reloadCarriers();
        });

        this.carriersStore = new Ext.data.JsonStore({
            data: []
        });
    },

    isValid: function (parent) {
        var values = this.getValues();

        return values.carrier;
    },

    getPriority: function () {
        return 60;
    },

    reset: function() {
        this.panel.getForm().reset();
        this.layout.hide();
    },

    getValues: function (parent) {
        return this.panel.getForm().getFieldValues();
    },

    getPanel: function () {
        var deliveryCarrierChoose = Ext.create({
            xtype: 'combo',
            fieldLabel: t('coreshop_carrier'),
            name: 'carrier',
            store: this.carriersStore,
            editable: false,
            triggerAction: 'all',
            queryMode: 'local',
            width: 500,
            displayField: 'name',
            valueField: 'id',
            listeners: {
                change: function (combo, value) {
                    var carrier = this.carriersStore.getById(value);

                    if (carrier) {
                        deliveryPriceField.setValue(carrier.get('priceFormatted'));
                    }

                    this.eventManager.fireEvent('carrier.changed');
                    this.eventManager.fireEvent('totals.reload');
                    this.eventManager.fireEvent('validation');
                }.bind(this)
            }
        });

        var deliveryPriceField = Ext.create({
            xtype: 'textfield',
            value: 0,
            disabled: true,
            fieldLabel: t('coreshop_price')
        });

        this.panel = Ext.create('Ext.form.Panel', {
            items: [
                deliveryCarrierChoose,
                deliveryPriceField
            ]
        });

        return this.panel;
    },

    getName: function () {
        return t('coreshop_order_create_shipping');
    },

    getIconCls: function () {
        return 'coreshop_icon_shipping';
    },

    getLayout: function ($super) {
        var layout = $super();

        layout.hide();

        return layout;
    },

    reloadCarriers: function () {
        var values = this.creationPanel.getValues();

        if (values.shippingAddress && values.invoiceAddress && values.products.length > 0) {
            this.layout.show();
            this.layout.setLoading(t("loading"));

            Ext.Ajax.request({
                url: '/admin/coreshop/' + this.creationPanel.type + '-creation/get-carrier-details',
                method: 'post',
                jsonData: values,
                callback: function (request, success, response) {
                    try {
                        response = Ext.decode(response.responseText);

                        if (response.success) {
                            this.carriersStore.loadData(response.carriers);
                        } else {
                            Ext.Msg.alert(t('error'), response.message);
                        }
                    }
                    catch (e) {
                        Ext.Msg.alert(t('error'), e);
                    }

                    this.layout.setLoading(false);
                }.bind(this)
            });
        } else {
            this.layout.hide();
        }
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.order.quote.list');
coreshop.order.quote.list = Class.create(coreshop.order.quote.list, {
    storeRenderer: function (val) {
        var stores = pimcore.globalmanager.get('coreshop_stores');
        var store = stores.getById('id', String(val));
        if (store) {
            return store.get('name');
        }

        return null;
    }
});




/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.store.item = Class.create(coreshop.store.item, {

    getFormPanel: function ($super) {
        var me = this,
            store = pimcore.globalmanager.get('coreshop_countries'),
            panel = $super();

        panel.down('fieldset').add(
            [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_base_country'),
                    typeAhead: true,
                    value: this.data.baseCountry,
                    mode: 'local',
                    listWidth: 100,
                    store: pimcore.globalmanager.get('coreshop_countries_active'),
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    triggerAction: 'all',
                    name: 'baseCountry'
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: t('coreshop_base_use_gross_prices'),
                    value: this.data.useGrossPrice,
                    name: 'useGrossPrice'
                },
                {
                    xtype: 'multiselect',
                    fieldLabel: t('coreshop_allowed_countries'),
                    typeAhead: true,
                    listWidth: 100,
                    width: 500,
                    store: store,
                    displayField: 'name',
                    valueField: 'id',
                    forceSelection: true,
                    multiselect: true,
                    triggerAction: 'all',
                    name: 'countries',
                    height: 400,
                    delimiter: false,
                    listeners: {
                        beforerender: function () {
                            if (!store.isLoaded() && !store.isLoading())
                                store.load();

                            if (me.data && me.data.countries)
                                this.setValue(me.data.countries);
                        }
                    }
                }
            ]
        );

        return this.formPanel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.country.item = Class.create(coreshop.country.item, {
    getFormPanel: function ($super) {
        var panel = $super(),
            data = this.data;

        panel.down("fieldset").add([
            {
                xtype: 'coreshop.currency',
                value: data.currency
            }
        ]);

        this.formPanel = panel;

        return this.formPanel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.abstract');
coreshop.report.abstract = Class.create(pimcore.report.abstract, {

    reportType: 'abstract',
    remoteSort: false,

    matchType: function (type) {
        var types = ['global'];
        return !!pimcore.report.abstract.prototype.matchTypeValidate(type, types);
    },

    getName: function () {
        return 'coreshop';
    },

    getIconCls: function () {
        return 'coreshop_icon_report';
    },

    getGrid: function () {
        return false;
    },

    getStoreField: function () {
        return this.panel.down('[name=store]');
    },

    getFromField: function () {
        return this.panel.down('[name=from]');
    },

    getToField: function () {
        return this.panel.down('[name=to]');
    },

    getFromStartDate: function () {
        return new Date(new Date().getFullYear(), 0, 1);
    },

    getToStartDate: function () {
        return new Date(new Date().getFullYear(), 11, 31);
    },

    showPaginator: function () {
        return false;
    },

    getDocketItemsForPanel: function () {

        return [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: this.getFilterFields()
            }
        ];
    },

    getPanel: function () {

        var grid;

        if (!this.panel) {

            var bbar = null;

            if (this.showPaginator() !== false) {
                bbar = pimcore.helpers.grid.buildDefaultPagingToolbar(this.getStore());
            }

            this.panel = new Ext.Panel({
                title: this.getName(),
                layout: 'fit',
                border: false,
                items: [],
                bbar: bbar,
                dockedItems: this.getDocketItemsForPanel()
            });

            grid = this.getGrid();

            if (grid) {
                this.panel.add(grid);
            }

            this.filter();
        }

        return this.panel;
    },

    getFilterFields: function () {
        var _ = this;

        return [
            {
                xtype: 'button',
                text: t('coreshop_report_day'),
                flex: 1,
                handler: function () {
                    var today = new Date();
                    var yesterday = new Date();

                    yesterday.setDate(today.getDate() - 1);

                    this.getFromField().setValue(yesterday);
                    this.getToField().setValue(today);

                    this.filter();
                }.bind(this)
            },
            {
                xtype: 'button',
                text: t('coreshop_report_month'),
                flex: 1,
                handler: function () {
                    var now = new Date();

                    this.getFromField().setValue(new Date(now.getFullYear(), now.getMonth(), 1));
                    this.getToField().setValue(new Date(now.getFullYear(), now.getMonth() + 1, 0));

                    this.filter();
                }.bind(this)
            },
            {
                xtype: 'button',
                text: t('coreshop_report_year'),
                flex: 1,
                handler: function () {
                    var now = new Date();

                    this.getFromField().setValue(new Date(now.getFullYear(), 0, 1));
                    this.getToField().setValue(new Date(now.getFullYear(), 11, 31));

                    this.filter();
                }.bind(this)
            },
            {
                xtype: 'button',
                text: t('coreshop_report_day_minus'),
                flex: 1,
                handler: function () {
                    var today = new Date();
                    var yesterday = new Date();

                    today.setDate(today.getDate() - 1);
                    yesterday.setDate(today.getDate() - 1);

                    this.getFromField().setValue(yesterday);
                    this.getToField().setValue(today);

                    this.filter();
                }.bind(this)
            },
            {
                xtype: 'button',
                text: t('coreshop_report_month_minus'),
                flex: 1,
                handler: function () {
                    var now = new Date();

                    this.getFromField().setValue(new Date(now.getFullYear(), now.getMonth() - 1, 1));
                    this.getToField().setValue(new Date(now.getFullYear(), now.getMonth(), 0));

                    this.filter();
                }.bind(this)
            },
            {
                xtype: 'button',
                text: t('coreshop_report_year_minus'),
                flex: 1,
                handler: function () {
                    var now = new Date();

                    this.getFromField().setValue(new Date(now.getFullYear() - 1, 0, 1));
                    this.getToField().setValue(new Date(now.getFullYear() - 1, 11, 31));

                    this.filter();
                }.bind(this)
            },
            '->',
            {
                xtype: 'datefield',
                fieldLabel: t('coreshop_report_year_from'),
                flex: 3,
                name: 'from',
                labelWidth: false,
                labelStyle: 'width: 70px;',
                value: this.getFromStartDate()
            },
            {
                xtype: 'datefield',
                fieldLabel: t('coreshop_report_year_to'),
                flex: 3,
                name: 'to',
                labelWidth: false,
                labelStyle: 'width: 70px;',
                value: this.getToStartDate()
            },
            {
                xtype: 'button',
                flex: 1,
                text: t('coreshop_report_filter'),
                handler: function () {
                    this.filter();
                }.bind(this)
            }
            ,
            {
                xtype: 'button',
                flex: 1,
                text: t('coreshop_report_export'),
                iconCls: 'pimcore_icon_download',
                handler: function () {
                    this.download();
                }.bind(this)
            }
        ];
    },

    filter: function () {
        this.getStore().load();
    },

    download: function () {
        var me = this;

        var url = '/admin/coreshop/report/export?report=' + me.reportType;
        var filterParams = me.getFilterParams();

        url += '&' + Ext.urlEncode(filterParams);

        pimcore.helpers.download(url);
    },

    getStore: function () {
        if (!this.store) {
            var me = this,
                fields = ['timestamp', 'text', 'data'];

            if (Ext.isFunction(this.getStoreFields)) {
                fields = Ext.apply(fields, this.getStoreFields());
            }

            this.store = new Ext.data.Store({
                autoDestroy: true,
                remoteSort: this.remoteSort,
                proxy: {
                    type: 'ajax',
                    url: '/admin/coreshop/report/get-data?report=' + this.reportType,
                    actionMethods: {
                        read: 'GET'
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'total'
                    }
                },
                fields: fields
            });

            this.store.on('beforeload', function (store, operation) {
                store.getProxy().setExtraParams(me.getFilterParams());
            });
        }

        return this.store;
    },

    getFilterParams: function () {
        return {
            'from': this.getFromField().getValue().getTime() / 1000,
            'to': this.getToField().getValue().getTime() / 1000
        };
    }
});




/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.abstractStore');
coreshop.report.abstractStore = Class.create(coreshop.report.abstract, {
    reportType: 'abstractStoreReport',

    getFilterFields: function ($super) {
        var me = this,
            store = pimcore.globalmanager.get('coreshop_stores').valueOf(),
            filter = $super();

        filter.splice(0, 0, {
            xtype: 'combo',
            fieldLabel: null,
            listWidth: 100,
            width: 200,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: false,
            triggerAction: 'all',
            name: 'store',
            queryMode: 'remote',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                afterrender: function () {
                    var first;
                    if (this.store.isLoaded()) {
                        first = this.store.getAt(0);
                        this.setValue(first);
                    } else {
                        this.store.load();
                        this.store.on('load', function (store, records, options) {
                            first = store.getAt(0);
                            this.setValue(first);
                        }.bind(this));
                    }
                },
                change: function (combo, value) {
                    this.getStoreField().setValue(value);
                    this.filter();
                }.bind(this)
            }
        });

        return filter;
    },

    getFilterParams: function ($super) {
        var params = $super();
        params['store'] = this.getStoreField().getValue();

        return params;
    }
});




/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.monitoring.abstract');
coreshop.report.monitoring.abstract = Class.create(coreshop.report.abstract, {

    url: '',

    getName: function () {
        return 'coreshop_monitoring';
    },

    getIconCls: function () {
        return 'coreshop_icon_monitoring';
    },

    getGrid: function () {
        return false;
    },

    getPanel: function () {

        if (!this.panel) {
            this.panel = new Ext.Panel({
                title: this.getName(),
                layout: 'fit',
                border: false,
                items: [],
                dockedItems: {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: this.getFilterFields()
                }
            });

            grid = this.getGrid();

            if (grid) {
                this.panel.add(grid);
            }

            this.filter();
        }

        return this.panel;
    },

    getFilterFields: function () {
        return [];
    },

    getStore: function () {
        if (!this.store) {
            this.store = new Ext.data.Store({
                autoDestroy: true,
                proxy: {
                    type: 'ajax',
                    url: this.url,
                    actionMethods: {
                        read: 'POST'
                    },
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                },
                fields: ['timestamp', 'text', 'data']
            });
        }

        return this.store;
    },

    filter: function () {
        this.getStore().load({
            params: this.getFilterParams()
        });
    },

    getFilterParams: function () {
        return {};
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.monitoring.reports.disabledProducts');
coreshop.report.monitoring.reports.disabledProducts = Class.create(coreshop.report.monitoring.abstract, {

    url: '/admin/coreshop/reports/get-disabled-products-monitoring',

    getName: function () {
        return t('coreshop_monitoring_disableProducts');
    },

    getIconCls: function () {
        return 'coreshop_icon_product';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('id'),
                        dataIndex: 'id',
                        width: 100
                    },
                    {
                        text: t('name'),
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        text: t('coreshop_monitoring_disableProducts_enabled'),
                        dataIndex: 'enabled',
                        width: 100
                    }
                ],
                listeners: {
                    rowclick: function (grid, record) {
                        var d = record.data;

                        pimcore.helpers.openObject(d.id, 'object');
                    }
                }
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.monitoring.reports.emptyCategories');
coreshop.report.monitoring.reports.emptyCategories = Class.create(coreshop.report.monitoring.abstract, {

    url: '/admin/coreshop/reports/get-empty-categories-monitoring',

    getName: function () {
        return t('coreshop_monitoring_emptyCategories');
    },

    getIconCls: function () {
        return 'coreshop_icon_category';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('id'),
                        dataIndex: 'id',
                        width: 100
                    },
                    {
                        text: t('name'),
                        dataIndex: 'name',
                        flex: 1
                    }
                ],
                listeners: {
                    rowclick: function (grid, record) {
                        var d = record.data;

                        pimcore.helpers.openObject(d.id, 'object');
                    }
                }
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.monitoring.reports.outOfStockProducts');
coreshop.report.monitoring.reports.outOfStockProducts = Class.create(coreshop.report.monitoring.abstract, {

    url: '/admin/coreshop/reports/get-out-of-stock-products-monitoring',

    getName: function () {
        return t('coreshop_monitoring_outOfStockProducts');
    },

    getIconCls: function () {
        return 'coreshop_icon_product';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('id'),
                        dataIndex: 'id',
                        width: 100
                    },
                    {
                        text: t('name'),
                        dataIndex: 'name',
                        flex: 1
                    },
                    {
                        text: t('coreshop_monitoring_outOfStockProducts_quantity'),
                        dataIndex: 'quantity',
                        width: 100
                    },
                    {
                        text: t('coreshop_monitoring_outOfStockProducts_out_of_stock_behaviour'),
                        dataIndex: 'outOfStockBehaviour',
                        width: 100,
                        renderer: function (value) {
                            return t('coreshop_stock_' + value + '_order');
                        }
                    }
                ],
                listeners: {
                    rowclick: function (grid, record) {
                        var d = record.data;

                        pimcore.helpers.openObject(d.id, 'object');
                    }
                }
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.carriers');
coreshop.report.reports.carriers = Class.create(coreshop.report.abstractStore, {

    reportType: 'carriers',

    getName: function () {
        return t('coreshop_report_carriers');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_carriers';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'polar',
                reference: 'chart',
                theme: 'default-gradients',
                width: '100%',
                height: 500,
                insetPadding: 50,
                innerPadding: 20,
                store: this.getStore(),
                legend: {
                    docked: 'bottom'
                },
                interactions: ['rotate'],
                series: [{
                    type: 'pie',
                    angleField: 'data',
                    label: {
                        field: 'carrier',
                        calloutLine: {
                            length: 60,
                            width: 3
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record, item) {
                            tooltip.setHtml(record.get('carrier') + ': ' + record.get('data') + '%');
                        }
                    }
                }]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.carts');
coreshop.report.reports.carts = Class.create(coreshop.report.abstractStore, {

    reportType: 'carts',

    getName: function () {
        return t('coreshop_report_carts');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_carts';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'cartesian',
                store: this.getStore(),
                legend: {
                    docked: 'right'
                },
                interactions: ['itemhighlight',
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: true
                    }
                ],
                axes: [{
                    type: 'numeric',
                    fields: ['carts', 'orders'],
                    position: 'left',
                    grid: true,
                    minimum: 0
                }, {
                    type: 'category',
                    fields: 'timestamp',
                    position: 'bottom'
                }
                ],
                series: [
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_cart'),
                        xField: 'timestamp',
                        yField: 'carts',
                        colors: ['#01841c'],
                        style: {
                            lineWidth: 2,
                            stroke: '#01841c'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#01841c'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #01841c',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get(item.series.getYField()));
                            }
                        }
                    },
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_order'),
                        xField: 'timestamp',
                        yField: 'orders',
                        colors: ['#15428B'],
                        style: {
                            lineWidth: 2,
                            stroke: '#15428B'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#15428B'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #00bfff',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get(item.series.getYField()));
                            }
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.carts_abandoned');
coreshop.report.reports.carts_abandoned = Class.create(coreshop.report.abstractStore, {

    reportType: 'carts_abandoned',

    getName: function () {
        return t('coreshop_report_carts_abandoned');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_carts_abandoned';
    },

    getFromStartDate: function () {
        var d = new Date();
        d.setMonth(d.getMonth() - 2);
        return d;
    },

    getToStartDate: function () {
        var d = new Date();
        d.setDate(d.getDate() - 2);
        return d;
    },

    showPaginator: function () {
        return true;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('coreshop_report_user_name'),
                        dataIndex: 'userName',
                        flex: 2
                    },
                    {
                        text: t('coreshop_report_user_email'),
                        dataIndex: 'email',
                        flex: 2
                    },
                    {
                        text: t('coreshop_report_selected_payment'),
                        dataIndex: 'selectedPayment',
                        flex: 2
                    },
                    {
                        text: t('coreshop_report_creation_date'),
                        dataIndex: 'creationDate',
                        flex: 2,
                        renderer: function (val) {
                            if (val) {
                                return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                            }
                            return '';
                        }
                    },
                    {
                        text: t('coreshop_report_modifiction_date'),
                        dataIndex: 'modificationDate',
                        flex: 2,
                        renderer: function (val) {
                            if (val) {
                                return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                            }
                            return '';
                        }
                    },
                    {
                        text: t('coreshop_report_items_in_cart'),
                        dataIndex: 'itemsInCart',
                        flex: 2
                    },
                    {
                        menuDisabled: true,
                        sortable: false,
                        xtype: 'actioncolumn',
                        flex: 1,
                        items: [{
                            iconCls: 'pimcore_icon_open',
                            tooltip: t('open'),
                            handler: function (grid, rowIndex) {
                                var record = grid.getStore().getAt(rowIndex);
                                pimcore.helpers.openObject(record.get('cartId'));
                            }
                        }]
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.manufacturer');
coreshop.report.reports.manufacturer = Class.create(coreshop.report.abstractStore, {

    reportType: 'manufacturer',

    getName: function () {
        return t('coreshop_report_manufacturer');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_manufacturer';
    },

    getStoreFields: function () {
        return [
            {name: 'name', type: 'string'},
            {name: 'manufacturerName', type: 'string'},
            {name: 'orderCount', type: 'integer'},
            {name: 'quantityCount', type: 'integer'},
            {name: 'sales', type: 'number'},
            {name: 'profit', type: 'number'}
        ];
    },

    showPaginator: function () {
        return true;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('name'),
                        dataIndex: 'manufacturerName',
                        flex: 3,
                        renderer: function (value, metadata, record) {
                            return record.get('name');
                        }
                    },
                    {
                        text: t('coreshop_report_products_order_count'),
                        dataIndex: 'orderCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_products_quantity_count'),
                        dataIndex: 'quantityCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_manufacturer_sales'),
                        dataIndex: 'sales',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('salesFormatted');
                        }
                    },
                    {
                        text: t('coreshop_report_manufacturer_profit'),
                        dataIndex: 'profit',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('profitFormatted');
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.vouchers');
coreshop.report.reports.vouchers = Class.create(coreshop.report.abstractStore, {

    reportType: 'vouchers',

    getName: function () {
        return t('coreshop_report_vouchers');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_vouchers';
    },

    getFromStartDate: function () {
        var d = new Date();
        d.setMonth(d.getMonth() - 2);
        return d;
    },

    getToStartDate: function () {
        var d = new Date();
        d.setDate(d.getDate() - 2);
        return d;
    },

    showPaginator: function () {
        return true;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('coreshop_report_voucher_code'),
                        dataIndex: 'code',
                        flex: 3
                    },
                    {
                        text: t('coreshop_report_voucher_discount'),
                        dataIndex: 'discount',
                        flex: 2
                    },
                    {
                        text: t('coreshop_report_voucher_pricerule'),
                        dataIndex: 'rule',
                        flex: 2
                    },
                    {
                        text: t('coreshop_report_voucher_applied_date'),
                        dataIndex: 'usedDate',
                        flex: 2,
                        renderer: function (val) {
                            if (val) {
                                return Ext.Date.format(new Date(val * 1000), t('coreshop_date_time_format'));
                            }
                            return '';
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.categories');
coreshop.report.reports.categories = Class.create(coreshop.report.abstractStore, {

    reportType: 'categories',

    getName: function () {
        return t('coreshop_report_categories');
    },

    getIconCls: function () {
        return 'coreshop_icon_category';
    },

    getStoreFields: function () {
        return [
            {name: 'name', type: 'string'},
            {name: 'categoryName', type: 'string'},
            {name: 'orderCount', type: 'integer'},
            {name: 'quantityCount', type: 'integer'},
            {name: 'sales', type: 'number'},
            {name: 'profit', type: 'number'}
        ];
    },

    showPaginator: function () {
        return true;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('name'),
                        dataIndex: 'categoryName',
                        flex: 3,
                        renderer: function (value, metadata, record) {
                            return record.get('name');
                        }
                    },
                    {
                        text: t('coreshop_report_products_order_count'),
                        dataIndex: 'orderCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_products_quantity_count'),
                        dataIndex: 'quantityCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_categories_sales'),
                        dataIndex: 'sales',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('salesFormatted');
                        }
                    },
                    {
                        text: t('coreshop_report_categories_profit'),
                        dataIndex: 'profit',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('profitFormatted');
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.customers');
coreshop.report.reports.customers = Class.create(coreshop.report.abstract, {

    reportType: 'customers',

    getName: function () {
        return t('coreshop_report_customers');
    },

    getIconCls: function () {
        return 'coreshop_icon_customer';
    },

    getStoreFields: function () {
        return [
            {name: 'emailAddress', type: 'string'},
            {name: 'orderCount', type: 'integer'},
            {name: 'sales', type: 'number'}
        ];
    },

    showPaginator: function () {
        return true;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('email'),
                        dataIndex: 'emailAddress',
                        flex: 3
                    },
                    {
                        text: t('coreshop_report_customers_count'),
                        dataIndex: 'orderCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_customers_sales'),
                        dataIndex: 'sales',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('salesFormatted');
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.payment_providers');
coreshop.report.reports.payment_providers = Class.create(coreshop.report.abstractStore, {

    reportType: 'payment_providers',

    getName: function () {
        return t('coreshop_report_payments');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_payments';
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'polar',
                reference: 'chart',
                theme: 'default-gradients',
                width: '100%',
                height: 500,
                insetPadding: 50,
                innerPadding: 20,
                store: this.getStore(),
                legend: {
                    docked: 'bottom'
                },
                interactions: ['rotate'],
                series: [{
                    type: 'pie',
                    angleField: 'data',
                    label: {
                        field: 'provider',
                        calloutLine: {
                            length: 60,
                            width: 3

                            // specifying 'color' is also possible here
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record, item) {
                            tooltip.setHtml(record.get('provider') + ': ' + record.get('data') + '%');
                        }
                    }
                }]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.products');
coreshop.report.reports.products = Class.create(coreshop.report.abstractStore, {

    reportType: 'products',

    getName: function () {
        return t('coreshop_report_products');
    },

    getIconCls: function () {
        return 'coreshop_icon_product';
    },

    getObjectTypeField: function () {
        return this.panel.down('[name=objectType]');
    },

    getFilterParams: function ($super) {
        var fields = $super();
        fields.objectType = this.getObjectTypeField().getValue();
        return fields;
    },

    showPaginator: function () {
        return true;
    },

    getStoreFields: function () {
        return [
            {name: 'name', type: 'string'},
            {name: 'productName', type: 'string'},
            {name: 'orderCount', type: 'integer'},
            {name: 'quantityCount', type: 'integer'},
            {name: 'sales', type: 'number'},
            {name: 'salesPrice', type: 'number'},
            {name: 'profit', type: 'number'}
        ];
    },

    getDocketItemsForPanel: function ($super) {

        var fields = $super();

        fields.push(
            {
                xtype: 'toolbar',
                dock: 'top',
                items: this.getAdditionalFilterFields()
            }
        );

        return fields;

    },
    getAdditionalFilterFields: function () {

        var fields = [];

        fields.push({
            xtype: 'combo',
            fieldLabel: t('coreshop_report_products_types'),
            name: 'objectType',
            value: 'all',
            width: 350,
            store: [
                ['all', t('coreshop_report_products_types_all')],
                ['object', t('coreshop_report_products_types_objects')],
                ['variant', t('coreshop_report_products_types_variants')],
                ['container', t('coreshop_report_products_types_container')]
            ],
            triggerAction: 'all',
            typeAhead: false,
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                change: function (combo, value) {
                    this.panel.down('[name=objectTypeDescription]').setHidden(value !== 'container');
                }.bind(this)
            }
        });

        fields.push({
            xtype: 'label',
            name: 'objectTypeDescription',
            style: '',
            hidden: true,
            height: 40,
            html: t('coreshop_report_products_types_container_description')
        });

        return fields;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'grid',
                store: this.getStore(),
                columns: [
                    {
                        text: t('name'),
                        dataIndex: 'productName',
                        flex: 3,
                        renderer: function (value, metadata, record) {
                            return record.get('name');
                        }
                    },
                    {
                        text: t('coreshop_report_products_order_count'),
                        dataIndex: 'orderCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_products_quantity_count'),
                        dataIndex: 'quantityCount',
                        flex: 1,
                        align: 'right'
                    },
                    {
                        text: t('coreshop_report_products_salesPrice'),
                        dataIndex: 'salesPrice',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('salesPriceFormatted');
                        }
                    },
                    {
                        text: t('coreshop_report_products_sales'),
                        dataIndex: 'sales',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('salesFormatted');
                        }
                    },
                    {
                        text: t('coreshop_report_products_profit'),
                        dataIndex: 'profit',
                        flex: 1,
                        align: 'right',
                        renderer: function (value, metadata, record) {
                            return record.get('profitFormatted');
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.report.reports.sales');
coreshop.report.reports.sales = Class.create(coreshop.report.abstractStore, {

    reportType: 'sales',

    getName: function () {
        return t('coreshop_report_sales');
    },

    getIconCls: function () {
        return 'coreshop_icon_report_sales';
    },

    getGroupByField: function () {
        return this.panel.down('[name=groupBy]');
    },

    getFilterParams: function ($super) {
        var fields = $super();
        fields.groupBy = this.getGroupByField().getValue();
        return fields;
    },

    getDocketItemsForPanel: function ($super) {

        var fields = $super();

        fields.push(
            {
                xtype: 'toolbar',
                dock: 'top',
                items: this.getAdditionalFilterFields()
            }
        );

        return fields;

    },

    getAdditionalFilterFields: function () {

        var fields = [];

        fields.push(
            {
                xtype: 'combo',
                fieldLabel: t('coreshop_report_groups'),
                name: 'groupBy',
                value: 'day',
                width: 250,
                store: [['day', t('coreshop_report_groups_day')], ['month', t('coreshop_report_groups_month')], ['year', t('coreshop_report_groups_year')]],
                triggerAction: 'all',
                typeAhead: false,
                editable: false,
                forceSelection: true,
                queryMode: 'local'
            }
        );

        return fields;
    },

    getGrid: function () {
        return new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'cartesian',
                store: this.getStore(),
                legend: {
                    docked: 'right'
                },
                interactions: ['itemhighlight',
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: true
                    }
                ],
                axes: [{
                    type: 'numeric',
                    fields: ['sales'],
                    position: 'left',
                    grid: true,
                    minimum: 0,
                    renderer: function(drawing, value, item) {
                        return Ext.util.Format.number((value/100));
                    }
                }, {
                    type: 'category',
                    fields: 'datetext',
                    position: 'bottom'
                }
                ],
                series: [
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_sales'),
                        xField: 'datetext',
                        yField: 'sales',
                        colors: ['#01841c'],
                        style: {
                            lineWidth: 2,
                            stroke: '#01841c'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#01841c'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #01841c',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get('salesFormatted'));
                            }
                        }
                    }
                ]
            }
        });
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.portlet.abstract');
coreshop.portlet.abstract = Class.create(pimcore.layout.portlets.abstract, {
    download: function () {
        var me = this;

        var url = '/admin/coreshop/portlet/export?portlet=' + me.portletType;
        var filterParams = me.getFilterParams();

        url += '&' + Ext.urlEncode(filterParams);

        pimcore.helpers.download(url);
    },

    getFilterParams: function() {
        return {};
    }
});




/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.layout.portlets.coreshop_order_cart');
pimcore.layout.portlets.coreshop_order_cart = Class.create(coreshop.portlet.abstract, {

    portletType: 'order_cart',

    getType: function () {
        return 'pimcore.layout.portlets.coreshop_order_cart';
    },

    getName: function () {
        return t('coreshop_portlet_orders_and_carts');
    },

    getIcon: function () {
        return 'pimcore_icon_portlet_modification_statistic';
    },

    getFilterParams: function() {
        return {
            'from': new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000,
            'to': new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime() / 1000,
            'store': this.config
        };
    },

    getLayout: function (portletId) {
        var me = this;

        this.store = new Ext.data.Store({
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/portlet/get-data?portlet=' + this.portletType,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['timestamp', 'datetext', 'carts', 'orders']
        });

        this.store.on('beforeload', function (store, operation) {
            me.store.getProxy().setExtraParams(me.getFilterParams());
        });

        this.store.load();

        var panel = new Ext.Panel({
            layout: 'fit',

            items: [{
                xtype: 'cartesian',
                height: 245,
                store: this.store,
                legend: {
                    docked: 'right'
                },
                interactions: ['itemhighlight',
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: true
                    }
                ],
                axes: [{
                    type: 'numeric',
                    fields: ['carts', 'orders'],
                    position: 'left',
                    grid: true,
                    minimum: 0
                }, {
                    type: 'category',
                    fields: 'timestamp',
                    position: 'bottom'
                }
                ],
                series: [
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_cart'),
                        xField: 'timestamp',
                        yField: 'carts',
                        colors: ['#01841c'],
                        style: {
                            lineWidth: 2,
                            stroke: '#01841c'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#01841c'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #01841c',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get(item.series.getYField()));
                            }
                        }
                    },
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_order'),
                        xField: 'timestamp',
                        yField: 'orders',
                        colors: ['#15428B'],
                        style: {
                            lineWidth: 2,
                            stroke: '#15428B'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#15428B'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #00bfff',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get(item.series.getYField()));
                            }
                        }
                    }
                ]
            }]
        });

        var defaultConf = this.getDefaultConfig();
        defaultConf.tools = [
            {
                type: 'gear',
                handler: this.editSettings.bind(this)
            },
            {
                type: 'download',
                handler: this.download.bind(this)
            },
            {
                type: 'close',
                handler: this.remove.bind(this)
            }
        ];

        this.layout = Ext.create('Portal.view.Portlet', Object.assign(defaultConf, {
            title: this.getName(),
            iconCls: this.getIcon(),
            height: 275,
            layout: 'fit',
            items: [panel]
        }));

        this.layout.portletId = portletId;
        return this.layout;
    },

    editSettings: function () {

        var coreshopStore = pimcore.globalmanager.get('coreshop_stores');

        var win = new Ext.Window({
            width: 600,
            height: 150,
            modal: true,
            closeAction: 'destroy',
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'padding: 10px',
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: t('coreshop_report_store'),
                            listWidth: 100,
                            width: 300,
                            store: coreshopStore,
                            displayField: 'name',
                            valueField: 'id',
                            forceSelection: true,
                            multiselect: false,
                            triggerAction: 'all',
                            name: 'coreshop_portlet_store',
                            id: 'coreshop_portlet_store',
                            queryMode: 'remote',
                            delimiter: false,
                            value: this.config,
                            listeners: {
                                afterrender: function () {
                                    var first;
                                    if (this.store.isLoaded()) {
                                        first = this.store.getAt(0);

                                        if (!this.getValue()) {
                                            this.setValue(first);
                                        }
                                    } else {
                                        this.store.load();

                                        if (!this.getValue()) {
                                            this.store.on('load', function (store, records, options) {
                                                first = store.getAt(0);
                                                this.setValue(first);
                                            }.bind(this));
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: t('save'),
                            handler: function () {
                                var storeValue = Ext.getCmp('coreshop_portlet_store').getValue();
                                this.config = storeValue;
                                Ext.Ajax.request({
                                    url: '/admin/portal/update-portlet-config',
                                    method: 'PUT',
                                    params: {
                                        key: this.portal.key,
                                        id: this.layout.portletId,
                                        config: storeValue
                                    },
                                    success: function () {
                                        this.store.reload();
                                    }.bind(this)
                                });
                                win.close();
                            }.bind(this)
                        }
                    ]
                }
            ]
        });

        win.show();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('pimcore.layout.portlets.coreshop_sales');
pimcore.layout.portlets.coreshop_sales = Class.create(coreshop.portlet.abstract, {

    portletType: 'sales',

    getType: function () {
        return 'pimcore.layout.portlets.coreshop_sales';
    },

    getName: function () {
        return t('coreshop_portlet_sales');
    },

    getIcon: function () {
        return 'coreshop_carrier_costs_icon';
    },

    getFilterParams: function() {
        return {
            'from': new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000,
            'to': new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime() / 1000,
            'store': this.config
        };
    },

    getLayout: function (portletId) {
        var me = this;

        this.store = new Ext.data.Store({
            autoDestroy: true,
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/portlet/get-data?portlet=' + this.portletType,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['timestamp', 'datetext', 'sales']
        });
        this.store.on('beforeload', function (store, operation) {
            me.store.getProxy().setExtraParams(me.getFilterParams());
        });
        this.store.load();

        var panel = new Ext.Panel({
            layout: 'fit',
            height: 275,
            items: {
                xtype: 'cartesian',
                store: this.store,
                legend: {
                    docked: 'right'
                },
                interactions: ['itemhighlight',
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: true
                    }
                ],
                axes: [{
                    type: 'numeric',
                    fields: ['sales'],
                    position: 'left',
                    grid: true,
                    minimum: 0,
                    renderer: function(drawing, value, item) {
                        return Ext.util.Format.number((value/100));
                    }
                }, {
                    type: 'category',
                    fields: 'datetext',
                    position: 'bottom'
                }
                ],
                series: [
                    {
                        type: 'line',
                        axis: ' left',
                        title: t('coreshop_sales'),
                        xField: 'datetext',
                        yField: 'sales',
                        colors: ['#01841c'],
                        style: {
                            lineWidth: 2,
                            stroke: '#01841c'
                        },
                        marker: {
                            radius: 4,
                            fillStyle: '#01841c'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #01841c',
                            renderer: function (tooltip, storeItem, item) {
                                var title = item.series.getTitle();
                                tooltip.setHtml(title + ' ' + t('coreshop_for') + ' ' + storeItem.get('datetext') + ': ' + storeItem.get('salesFormatted'));
                            }
                        }
                    }
                ]
            }
        });

        var defaultConf = this.getDefaultConfig();
        defaultConf.tools = [
            {
                type: 'gear',
                handler: this.editSettings.bind(this)
            },
            {
                type: 'download',
                handler: this.download.bind(this)
            },
            {
                type: 'close',
                handler: this.remove.bind(this)
            }
        ];

        this.layout = Ext.create('Portal.view.Portlet', Object.assign(defaultConf, {
            title: this.getName(),
            iconCls: this.getIcon(),
            height: 275,
            layout: 'fit',
            items: [panel]
        }));

        this.layout.portletId = portletId;
        return this.layout;
    },

    editSettings: function () {

        var coreshopStore = pimcore.globalmanager.get('coreshop_stores');

        var win = new Ext.Window({
            width: 600,
            height: 150,
            modal: true,
            closeAction: 'destroy',
            items: [
                {
                    xtype: 'form',
                    bodyStyle: 'padding: 10px',
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: t('coreshop_report_store'),
                            listWidth: 100,
                            width: 300,
                            store: coreshopStore,
                            displayField: 'name',
                            valueField: 'id',
                            forceSelection: true,
                            multiselect: false,
                            triggerAction: 'all',
                            name: 'coreshop_portlet_store',
                            id: 'coreshop_portlet_store',
                            queryMode: 'remote',
                            delimiter: false,
                            value: this.config,
                            listeners: {
                                afterrender: function () {
                                    var first;
                                    if (this.store.isLoaded()) {
                                        first = this.store.getAt(0);

                                        if (!this.getValue()) {
                                            this.setValue(first);
                                        }
                                    } else {
                                        this.store.load();

                                        if (!this.getValue()) {
                                            this.store.on('load', function (store, records, options) {
                                                first = store.getAt(0);
                                                this.setValue(first);
                                            }.bind(this));
                                        }
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: t('save'),
                            handler: function () {
                                var storeValue = Ext.getCmp('coreshop_portlet_store').getValue();
                                this.config = storeValue;
                                Ext.Ajax.request({
                                    url: '/admin/portal/update-portlet-config',
                                    method: 'PUT',
                                    params: {
                                        key: this.portal.key,
                                        id: this.layout.portletId,
                                        config: storeValue
                                    },
                                    success: function () {
                                        this.store.reload();
                                    }.bind(this)
                                });
                                win.close();
                            }.bind(this)
                        }
                    ]
                }
            ]
        });

        win.show();
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.carrier.item  = Class.create(coreshop.carrier.item, {
    getSettings: function ($super) {
        var panel = $super(),
            data = this.data;

        panel.down("fieldset").add([
            {
                xtype: 'coreshop.store',
                name: 'stores',
                multiSelect: true,
                typeAhead: false,
                value: data.stores
            },
            {
                xtype: 'coreshop.taxRuleGroup',
                value: data.taxRule
            }
        ]);

        this.formPanel = panel;

        return this.formPanel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.categories');
coreshop.shippingrule.conditions.categories = Class.create(coreshop.rules.conditions.abstract, {

    type: 'categories',
    categories: null,

    getForm: function () {
        this.categories = new coreshop.object.objectMultihref(this.data ? this.data.categories : [], {
            classes: this.getFormattedStackClasses(coreshop.stack.coreshop.category),
            name: 'categories',
            title: '',
            height: 200,
            width: 500,
            columns: [],

            columnType: null,
            datatype: 'data',
            fieldtype: 'objects'
        });

        this.recursive = Ext.create({
            xtype: 'checkbox',
            fieldLabel: t('coreshop_condition_recursive'),
            name: 'recursive',
            checked: this.data ? this.data.recursive : false
        });

        this.form = new Ext.form.Panel({
            items: [
                this.categories.getLayoutEdit(),
                this.recursive
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            categories: this.categories.getValue(),
            recursive: this.recursive.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.countries');
coreshop.shippingrule.conditions.countries = Class.create(coreshop.rules.conditions.abstract, {
    type: 'countries',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_countries');

        var countries = {
            fieldLabel: t('coreshop_condition_countries'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'countries',
            height: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.countries)
                        this.setValue(me.data.countries);
                }
            }
        };


        if (this.data && this.data.countries) {
            countries.value = this.data.countries;
        }

        countries = new Ext.ux.form.MultiSelect(countries);

        this.form = new Ext.form.Panel({
            items: [
                countries
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.currencies');
coreshop.shippingrule.conditions.currencies = Class.create(coreshop.rules.conditions.abstract, {
    type: 'currencies',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_currencies');

        var currencies = {
            fieldLabel: t('coreshop_condition_currencies'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'currencies',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.currencies)
                        this.setValue(me.data.currencies);
                }
            }
        };

        if (this.data && this.data.currencies) {
            currencies.value = this.data.currencies;
        }

        currencies = new Ext.ux.form.MultiSelect(currencies);

        this.form = new Ext.form.Panel({
            items: [
                currencies
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.customerGroups');
coreshop.shippingrule.conditions.customerGroups = Class.create(coreshop.rules.conditions.abstract, {

    type: 'customerGroups',
    customerGroups: null,

    getForm: function () {
        this.customerGroups = new coreshop.object.objectMultihref(this.data ? this.data.customerGroups : [], {
            classes: this.getFormattedStackClasses(coreshop.stack.coreshop.customer_group),
            name: 'customerGroups',
            title: '',
            height: 200,
            width: 500,
            columns: [],

            columnType: null,
            datatype: 'data',
            fieldtype: 'objects'
        });

        this.form = new Ext.form.Panel({
            items: [
                this.customerGroups.getLayoutEdit()
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            customerGroups: this.customerGroups.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.customers');
coreshop.shippingrule.conditions.customers = Class.create(coreshop.rules.conditions.abstract, {

    type: 'customers',
    customers: null,

    getForm: function () {
        this.customers = new coreshop.object.objectMultihref(this.data ? this.data.customers : [], {
            classes: this.getFormattedStackClasses(coreshop.stack.coreshop.customer),
            name: 'customers',
            title: '',
            height: 200,
            width: 500,
            columns: [],

            columnType: null,
            datatype: 'data',
            fieldtype: 'objects'
        });

        this.form = new Ext.form.Panel({
            items: [
                this.customers.getLayoutEdit()
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            customers: this.customers.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.products');
coreshop.shippingrule.conditions.products = Class.create(coreshop.rules.conditions.abstract, {

    type: 'products',
    products: null,

    getForm: function () {
        this.products = new coreshop.object.objectMultihref(this.data ? this.data.products : [], {
            classes: this.getFormattedStackClasses(coreshop.stack.coreshop.product),
            name: 'products',
            title: '',
            height: 200,
            width: 500,
            columns: [],

            columnType: null,
            datatype: 'data',
            fieldtype: 'objects'
        });

        this.includeVariants = Ext.create({
            xtype: 'checkbox',
            fieldLabel: t('coreshop_condition_include_variants'),
            name: 'include_variants',
            checked: this.data ? this.data.include_variants : false
        });


        this.form = new Ext.form.Panel({
            items: [
                this.products.getLayoutEdit(),
                this.includeVariants
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            products: this.products.getValue(),
            include_variants: this.includeVariants.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.stores');
coreshop.shippingrule.conditions.stores = Class.create(coreshop.rules.conditions.abstract, {
    type: 'stores',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_stores');

        var storesSelect = {
            fieldLabel: t('coreshop_condition_stores'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'stores',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.stores)
                        this.setValue(me.data.stores);
                }
            }
        };

        if (this.data && this.data.stores) {
            storesSelect.value = this.data.stores;
        }

        storesSelect = new Ext.ux.form.MultiSelect(storesSelect);

        this.form = new Ext.form.Panel({
            items: [
                storesSelect
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.conditions.zones');
coreshop.shippingrule.conditions.zones = Class.create(coreshop.rules.conditions.abstract, {
    type: 'zones',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_zones');

        var zones = {
            fieldLabel: t('coreshop_condition_zones'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiselect: true,
            triggerAction: 'all',
            name: 'zones',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.zones)
                        this.setValue(me.data.zones);
                }
            }
        };

        if (this.data && this.data.zones) {
            zones.value = this.data.zones;
        }

        zones = new Ext.ux.form.MultiSelect(zones);

        this.form = new Ext.form.Panel({
            items: [
                zones
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.additionAmount');
coreshop.shippingrule.actions.additionAmount = Class.create(coreshop.rules.actions.abstract, {
    type: 'discountAmount',

    getForm: function () {
        var amountValue = 0;
        var currency = null;

        if (this.data) {
            amountValue = this.data.amount / 100;
            currency = this.data.currency;
        }

        var amount = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_discountAmount_amount'),
            name: 'amount',
            value: amountValue,
            decimalPrecision: 2
        });

        this.form = new Ext.form.Panel({
            items: [
                amount,
                {
                    xtype: 'coreshop.currency',
                    value: currency
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.discountAmount');
coreshop.shippingrule.actions.discountAmount = Class.create(coreshop.shippingrule.actions.additionAmount, {
    type: 'discountAmount'
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.shippingrule.actions.price');
coreshop.shippingrule.actions.price = Class.create(coreshop.rules.actions.abstract, {
    type: 'price',

    getForm: function () {
        var priceValue = 0;
        var currency = null;

        if (this.data) {
            priceValue = this.data.price / 100;
            currency = this.data.currency;
        }

        var price = new Ext.form.NumberField({
            fieldLabel: t('coreshop_action_price'),
            name: 'price',
            value: priceValue,
            decimalPrecision: 2
        });

        this.form = new Ext.form.FieldSet({
            items: [
                price,
                {
                    xtype: 'coreshop.currency',
                    value: currency
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.countries');
coreshop.product.pricerule.conditions.countries = Class.create(coreshop.shippingrule.conditions.countries, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.currencies');
coreshop.product.pricerule.conditions.currencies = Class.create(coreshop.shippingrule.conditions.currencies, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.customerGroups');
coreshop.product.pricerule.conditions.customerGroups = Class.create(coreshop.shippingrule.conditions.customerGroups, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.customers');
coreshop.product.pricerule.conditions.customers = Class.create(coreshop.shippingrule.conditions.customers, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.quantity');
coreshop.product.pricerule.conditions.quantity = Class.create(coreshop.rules.conditions.abstract, {
    type: 'quantity',

    getForm: function () {

        var minQuantityValue = null;
        var maxQuantityValue = 0;
        var currencyValue = null;
        var me = this;

        if (this.data && this.data.minQuantity) {
            minQuantityValue = this.data.minQuantity;
        }

        if (this.data && this.data.maxQuantity) {
            maxQuantityValue = this.data.maxQuantity;
        }

        var minQuantity = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_quantity_minQuantity'),
            name: 'minQuantity',
            value: minQuantityValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        var maxQuantity = new Ext.form.NumberField({
            fieldLabel: t('coreshop_condition_quantity_maxQuantity'),
            name: 'maxQuantity',
            value: maxQuantityValue,
            minValue: 0,
            decimalPrecision: 0,
            step: 1
        });

        this.form = Ext.create('Ext.form.Panel', {
            items: [
                minQuantity, maxQuantity
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.stores');
coreshop.product.pricerule.conditions.stores = Class.create(coreshop.shippingrule.conditions.stores, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.zones');
coreshop.product.pricerule.conditions.zones = Class.create(coreshop.shippingrule.conditions.zones, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.categories');
coreshop.product.pricerule.conditions.categories = Class.create(coreshop.shippingrule.conditions.categories, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.pricerule.conditions.products');
coreshop.product.pricerule.conditions.products = Class.create(coreshop.shippingrule.conditions.products, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.countries');
coreshop.product.specificprice.conditions.countries = Class.create(coreshop.product.pricerule.conditions.countries, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.currencies');
coreshop.product.specificprice.conditions.currencies = Class.create(coreshop.product.pricerule.conditions.currencies, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.customerGroups');
coreshop.product.specificprice.conditions.customerGroups = Class.create(coreshop.product.pricerule.conditions.customerGroups, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.customers');
coreshop.product.specificprice.conditions.customers = Class.create(coreshop.product.pricerule.conditions.customers, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.stores');
coreshop.product.specificprice.conditions.stores = Class.create(coreshop.product.pricerule.conditions.stores, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.product.specificprice.conditions.zones');
coreshop.product.specificprice.conditions.zones = Class.create(coreshop.product.pricerule.conditions.zones, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.actions.freeShipping');
coreshop.cart.pricerules.actions.freeShipping = Class.create(coreshop.rules.actions.abstract, {
    type: 'freeShipping',

    getForm: function () {

        this.form = new Ext.form.Panel({
            type: 'FreeShipping',
            forceLayout: true
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.actions.giftProduct');
coreshop.cart.pricerules.actions.giftProduct = Class.create(coreshop.rules.actions.abstract, {
    type: 'giftProduct',

    getForm: function () {
        this.product = new coreshop.object.elementHref({
            id: this.data ? this.data.product : null,
            type: 'object',
            subtype: coreshop.class_map.coreshop.product
        }, {
            objectsAllowed: true,
            classes: [{
                classes: coreshop.class_map.coreshop.product
            }],
            name: 'product',
            title: t('coreshop_action_giftProduct')
        });

        this.form = new Ext.form.Panel({
            items: [
                this.product.getLayoutEdit()
            ]
        });

        return this.form;
    },

    getValues: function () {
        return {
            product: this.product.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.carriers');
coreshop.cart.pricerules.conditions.carriers = Class.create(coreshop.rules.conditions.abstract, {
    type: 'carriers',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_carriers');

        var carriers = {
            fieldLabel: t('coreshop_carrier'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'identifier',
            valueField: 'id',
            forceSelection: true,
            multiSelect: true,
            triggerAction: 'all',
            name: 'carriers',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.carriers)
                        this.setValue(me.data.carriers);
                }
            }
        };

        if (this.data && this.data.carriers) {
            carriers.value = this.data.carriers;
        }

        carriers = new Ext.ux.form.MultiSelect(carriers);

        this.form = new Ext.form.Panel({
            items: [
                carriers
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.categories');
coreshop.cart.pricerules.conditions.categories = Class.create(coreshop.shippingrule.conditions.categories, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.countries');
coreshop.cart.pricerules.conditions.countries = Class.create(coreshop.product.pricerule.conditions.countries, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.currencies');
coreshop.cart.pricerules.conditions.currencies = Class.create(coreshop.product.pricerule.conditions.currencies, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.customerGroups');
coreshop.cart.pricerules.conditions.customerGroups = Class.create(coreshop.product.pricerule.conditions.customerGroups, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.customers');
coreshop.cart.pricerules.conditions.customers = Class.create(coreshop.product.pricerule.conditions.customers, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.products');
coreshop.cart.pricerules.conditions.products = Class.create(coreshop.shippingrule.conditions.products, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.stores');
coreshop.cart.pricerules.conditions.stores = Class.create(coreshop.product.pricerule.conditions.stores, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.cart.pricerules.conditions.zones');
coreshop.cart.pricerules.conditions.zones = Class.create(coreshop.product.pricerule.conditions.zones, {});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.taxrulegroup.item = Class.create(coreshop.taxrulegroup.item, {
    getGrid: function () {
        var listeners = {};

        var modelName = 'coreshop.model.taxrules';

        if (!Ext.ClassManager.get(modelName)) {
            Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'taxRuleGroup', 'country', 'tax', 'behavior']
                }
            );
        }

        this.store = new Ext.data.Store({
            restful: false,
            idProperty: 'id',
            model: modelName,
            listeners: listeners,
            data: this.data.taxRules
        });

        var statesStore = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: '/admin/coreshop/states/list'
            }),
            reader: new Ext.data.JsonReader({}, [
                {name: 'id'},
                {name: 'name'}
            ]),
            listeners: {
                load: function (store) {
                    var rec = {id: 0, name: t('coreshop_all')};
                    store.insert(0, rec);

                    this.grid.getView().refresh()
                }.bind(this)
            }
        });
        statesStore.load();

        var stateEditor = new Ext.form.ComboBox({
            store: statesStore,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            disabled: true
        });

        var countryStore = new Ext.data.Store({
            restful: false,
            proxy: new Ext.data.HttpProxy({
                url: '/admin/coreshop/countries/list'
            }),
            autoLoad: true,
            reader: new Ext.data.JsonReader({}, [
                {name: 'id'},
                {name: 'text'}
            ]),
            listeners: {
                load: function (store) {
                    var rec = {id: 0, name: t('coreshop_all')};
                    store.insert(0, rec);

                    this.grid.getView().refresh()
                }.bind(this)
            }
        });
        countryStore.load();

        var countryEditor = new Ext.form.ComboBox({
            store: countryStore,
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            disabled: false
        });

        var gridColumns = [
            {
                header: t('coreshop_country'),
                width: 200,
                dataIndex: 'country',
                editor: countryEditor,
                renderer: function (country) {
                    var store = countryStore;
                    var pos = store.findExact('id', country);
                    if (pos >= 0) {
                        return store.getAt(pos).get('name');
                    }

                    return t('coreshop_all');
                }
            },
            {
                header: t('coreshop_state'),
                width: 200,
                dataIndex: 'state',
                editor: stateEditor,
                renderer: function (state) {
                    var store = statesStore;
                    var pos = store.findExact('id', state);
                    if (pos >= 0) {
                        return store.getAt(pos).get('name');
                    }

                    return t('coreshop_all');
                }
            },
            {
                header: t('coreshop_tax_rate'),
                width: 200,
                dataIndex: 'taxRate',
                editor: new Ext.form.ComboBox({
                    store: pimcore.globalmanager.get('coreshop_tax_rates'),
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local'
                }),
                renderer: function (taxRate) {
                    var record = pimcore.globalmanager.get('coreshop_tax_rates').getById(taxRate);

                    if (record) {
                        return record.get('name');
                    }

                    return null;
                }
            },
            {
                header: t('coreshop_tax_rule_behavior'),
                width: 300,
                dataIndex: 'behavior',
                editor: new Ext.form.ComboBox({
                    store: [[0, t('coreshop_tax_rule_behavior_disable')], [1, t('coreshop_tax_rule_behavior_combine')], [2, t('coreshop_tax_rule_behavior_on_after_another')]],
                    triggerAction: 'all',
                    editable: false,
                    queryMode: 'local'
                }),
                renderer: function (behavior) {
                    switch (parseInt(behavior)) {
                        case 0:
                            return t('coreshop_tax_rule_behavior_disable');
                            break;

                        case 1:
                            return t('coreshop_tax_rule_behavior_combine');
                            break;

                        case 2:
                            return t('coreshop_tax_rule_behavior_on_after_another');
                            break;
                    }
                }
            },
            {
                xtype: 'actioncolumn',
                width: 40,
                tooltip: t('delete'),
                iconCls: 'pimcore_icon_delete',
                handler: function (grid, rowIndex) {
                    grid.getStore().removeAt(rowIndex);
                }.bind(this)
            }
        ];

        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function (editor, context) {
                    if (context.record) {
                        if (context.record.get('country')) {
                            stateEditor.enable();
                        }
                    }
                }
            }
        });

        var gridConfig = {
            frame: false,
            store: this.store,
            border: true,
            columns: gridColumns,
            loadMask: true,
            columnLines: true,
            stripeRows: true,
            trackMouseOver: true,
            viewConfig: {
                forceFit: false
            },
            selModel: Ext.create('Ext.selection.RowModel', {}),
            tbar: [
                {
                    text: t('add'),
                    handler: function () {
                        this.store.add({
                            id: null,
                            taxRuleGroup: this.data.id,
                            country: null,
                            tax: null,
                            behavior: 0
                        });
                    }.bind(this),
                    iconCls: 'pimcore_icon_add'
                }
            ],
            plugins: [
                this.cellEditing
            ]
        };

        this.grid = Ext.create('Ext.grid.Panel', gridConfig);

        return this.grid;
    },

      getSaveData: function () {
        var values = this.formPanel.getForm().getFieldValues();
        var taxRules = [];

        this.store.getRange().forEach(function (range, index) {
            var data = range.data;

            if (range.phantom) {
                delete data['id'];
            }

            if (data.state === 0) {
                delete data.state;
            }

            if (data.country === 0) {
                delete data.country;
            }

            taxRules.push(data);
        });

        if (!values['active']) {
            delete values['active'];
        }

        values['taxRules'] = taxRules;

        return values;
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.classes.data.coreShopStorePrice");
pimcore.object.classes.data.coreShopStorePrice = Class.create(pimcore.object.classes.data.data, {
    type: "coreShopStorePrice",

    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: false,
        fieldcollection: true,
        localizedfield: true,
        classificationstore: false,
        block: true
    },

    initialize: function (treeNode, initData) {
        this.type = "coreShopStorePrice";

        this.initData(initData);

        this.treeNode = treeNode;
    },

    getTypeName: function () {
        return t("coreshop_store_price");
    },

    getGroup: function () {
        return "coreshop";
    },

    getIconClass: function () {
        return "coreshop_icon_money";
    },

    getLayout: function ($super) {
        $super();

        this.specificPanel.removeAll();
        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("width"),
                name: "width",
                value: this.datax.width
            },
            {
                xtype: "numberfield",
                fieldLabel: t("default_value"),
                name: "defaultValue",
                value: this.datax.defaultValue
            }, {
                xtype: "panel",
                bodyStyle: "padding-top: 3px",
                style: "margin-bottom: 10px",
                html: '<span class="object_field_setting_warning">' + t('default_value_warning') + '</span>'
            }
        ]);

        if (!this.isInCustomLayoutEditor()) {
            this.specificPanel.add([
                {
                    xtype: "numberfield",
                    fieldLabel: t("min_value"),
                    name: "minValue",
                    value: this.datax.minValue
                }, {
                    xtype: "numberfield",
                    fieldLabel: t("max_value"),
                    name: "maxValue",
                    value: this.datax.maxValue
                }
            ]);
        }

        return this.layout;
    },

    applySpecialData: function (source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax = {};
            }

            Ext.apply(this.datax, {
                width: source.datax.width,
                defaultValue: source.datax.defaultValue,
                minValue: source.datax.minValue,
                maxValue: source.datax.maxValue,
            });
        }
    }
});



/**
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.object.tags.coreShopStorePrice");
pimcore.object.tags.coreShopStorePrice = Class.create(pimcore.object.tags.abstract, {

    type: "coreShopStorePrice",
    storeFields: {},

    initialize: function (data, fieldConfig) {
        this.defaultValue = null;
        this.storeFields = {};

        if ((typeof data === "undefined" || data === null) && fieldConfig.defaultValue) {
            data = fieldConfig.defaultValue;
            this.defaultValue = data;
        }

        this.data = data;
        this.fieldConfig = fieldConfig;
        this.eventDispatcherKey = pimcore.eventDispatcher.registerTarget(this.eventDispatcherKey, this);
    },

    getGridColumnEditor: function (field) {
        return false;
    },

    getGridColumnFilter: function (field) {
        return false;
    },

    postSaveObject: function(object, task)
    {
        if (object.id === this.object.id && task === "publish")
        {
            Ext.Object.each(this.storeFields, function(key, value) {
                value.resetOriginalValue();
            });
        }
    },

    getLayoutEdit: function () {
        this.fieldConfig.datatype = "layout";
        this.fieldConfig.fieldtype = "panel";

        var wrapperConfig = {
            border: false,
            layout: "fit"
        };

        if (this.fieldConfig.width) {
            wrapperConfig.width = this.fieldConfig.width;
        }

        if (this.fieldConfig.region) {
            wrapperConfig.region = this.fieldConfig.region;
        }

        if (this.fieldConfig.title) {
            wrapperConfig.title = this.fieldConfig.title;
        }

        if (this.context.containerType === "fieldcollection") {
            this.context.subContainerType = "localizedfield";
        } else {
            this.context.containerType = "localizedfield";
        }

        var stores = pimcore.globalmanager.get('coreshop_stores').getRange();

        var panelConf = {
            monitorResize: true,
            cls: "object_field",
            activeTab: 0,
            height: "auto",
            items: [],
            deferredRender: true,
            forceLayout: true,
            hideMode: "offsets",
            enableTabScroll: true
        };

        if (this.fieldConfig.height) {
            panelConf.height = this.fieldConfig.height;
            panelConf.autoHeight = false;
        }

        for (var i = 0; i < stores.length; i++) {
            var store = stores[i],
                storeData = this.data.hasOwnProperty(store.getId()) ? this.data[store.getId()] : false;

            var input = {
                xtype: 'numberfield',
                fieldLabel: this.fieldConfig.title,
                name: this.fieldConfig.name,
                componentCls: "object_field",
                labelWidth: 250,
                value: this.defaultValue
            };

            if (storeData) {
                input.value = storeData.price;
                input.fieldLabel = input.fieldLabel + " (" + storeData.currencySymbol + ")";
            }

            if (this.fieldConfig.width) {
                input.width = this.fieldConfig.width;
            } else {
                input.width = 350;
            }

            input.width += input.labelWidth;

            if (is_numeric(this.fieldConfig["minValue"])) {
                input.minValue = this.fieldConfig.minValue;
            }

            if (is_numeric(this.fieldConfig["maxValue"])) {
                input.maxValue = this.fieldConfig.maxValue;
            }

            this.storeFields[store.getId()] = Ext.create(input);

            var item = {
                xtype: "panel",
                border: false,
                autoScroll: true,
                padding: "10px",
                deferredRender: true,
                hideMode: "offsets",
                items: this.storeFields[store.getId()]
            };

            item.iconCls = "coreshop_icon_store";
            item.title = store.get('name');

            if (this.fieldConfig.labelWidth) {
                item.labelWidth = this.fieldConfig.labelWidth;
            }

            panelConf.items.push(item);
        }

        this.tabPanel = new Ext.TabPanel(panelConf);

        wrapperConfig.items = [this.tabPanel];

        wrapperConfig.border = true;
        wrapperConfig.style = "margin-bottom: 10px";

        this.component = new Ext.Panel(wrapperConfig);
        this.component.updateLayout();

        this.component.on("destroy", function() {
            pimcore.eventDispatcher.unregisterTarget(this.eventDispatcherKey);
        }.bind(this));

        return this.component;
    },

    getLayoutShow: function () {
        this.component = this.getLayoutEdit(true);

        return this.component;
    },

    getValue: function () {
        var values = {};

        Ext.Object.each(this.storeFields, function (key, input) {
            values[key] = input.getValue();
        });

        return values;
    },

    getName: function () {
        return this.fieldConfig.name;
    },

    isInvalidMandatory: function () {
        if (!this.isRendered() && (!empty(this.getInitialData() || this.getInitialData() === 0) )) {
            return false;
        } else if (!this.isRendered()) {
            return true;
        }

        return this.getValue();
    },

    isDirty: function () {
        if (this.defaultValue) {
            return true;
        }

        if (!this.isRendered()) {
            return false;
        }

        var currentKey, currentInput;
        var keys = Object.keys(this.storeFields);

        for (var i = 0; i < keys.length; i++)
        {
            currentKey = keys[i];
            currentInput = this.storeFields[currentKey];

            if (currentInput.isDirty()) {
                return true;
            }
        }

        return false;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.abstractTransition');

coreshop.notification.rule.conditions.abstractTransition = Class.create(coreshop.rules.conditions.abstract, {
    getRepoName: function() {
        return '';
    },

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_to'),
                    name: 'transition',
                    value: this.data ? this.data.transition : [],
                    width: 250,
                    store: pimcore.globalmanager.get(this.getRepoName()),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.actions.orderMail');

coreshop.notification.rule.actions.orderMail = Class.create(coreshop.notification.rule.actions.mail, {

    type: 'orderMail',

    fields: {},

    getForm: function ($super) {
        var form = $super(),
            me = this;

        this.doNotSendToDesignatedRecipient = Ext.create({
            fieldLabel: t('coreshop_mail_rule_do_not_send_to_designated_recipient'),
            xtype: 'checkbox',
            name: 'doNotSendToDesignatedRecipient',
            checked: this.data ? this.data.doNotSendToDesignatedRecipient : false
        });

        this.sendInvoices = Ext.create({
            fieldLabel: t('coreshop_mail_rule_send_invoices'),
            xtype: 'checkbox',
            name: 'sendInvoices',
            checked: this.data ? this.data.sendInvoices : false
        });

        this.sendShipments = Ext.create({
            fieldLabel: t('coreshop_mail_rule_send_shipments'),
            xtype: 'checkbox',
            name: 'sendShipments',
            checked: this.data ? this.data.sendShipments : false
        });

        form.add([this.sendInvoices, this.sendShipments]);

        return form;
    },

    getValues: function ($super) {
        var values = $super();

        values = Ext.applyIf({
            'sendInvoices': this.sendInvoices.getValue(),
            'sendShipments': this.sendShipments.getValue(),
            'doNotSendToDesignatedRecipient': this.doNotSendToDesignatedRecipient.getValue()
        }, values);

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.actions.storeMail');

coreshop.notification.rule.actions.storeMail = Class.create(coreshop.notification.rule.actions.mail, {
    type: 'storeMail',

    fields: {},

    getForm: function () {
        var me = this,
            tabs = [];

        Ext.each(pimcore.globalmanager.get('coreshop_stores').getRange(), function (storeRecord) {
            var storeTabs = [];
            var storeValues = this.data && this.data.mails && this.data.mails.hasOwnProperty(storeRecord.getId()) ? this.data.mails[storeRecord.getId()] : {};

            this.fields[storeRecord.getId()] = {};

            Ext.each(pimcore.settings.websiteLanguages, function (lang) {
                var value = storeValues.hasOwnProperty(lang) ? storeValues[lang] : '';

                this.fields[storeRecord.getId()][lang] = new coreshop.object.elementHref({
                    id: value,
                    type: 'document',
                    subtype: 'email'
                }, {
                    documentsAllowed: true,
                    documentTypes: [{
                        documentTypes: 'email'
                    }],
                    name: 'mails[' + storeRecord.getId() + '][' + lang + ']',
                    title: t('coreshop_email_document')
                });

                storeTabs.push({
                    title: pimcore.available_languages[lang],
                    iconCls: 'pimcore_icon_language_' + lang.toLowerCase(),
                    layout: 'form',
                    items: [
                        this.fields[storeRecord.getId()][lang].getLayoutEdit()
                    ]
                });

            }.bind(this));

            tabs.push(
                {
                    xtype: 'tabpanel',
                    title: storeRecord.get('name'),
                    iconCls: 'coreshop_icon_store',
                    activeTab: 0,
                    width: '100%',
                    defaults: {
                        autoHeight: true,
                        bodyStyle: 'padding:10px;'
                    },
                    items: storeTabs
                }
            );
        }.bind(this));

        this.doNotSendToDesignatedRecipient = Ext.create({
            fieldLabel: t('coreshop_mail_rule_do_not_send_to_designated_recipient'),
            xtype: 'checkbox',
            name: 'doNotSendToDesignatedRecipient',
            checked: this.data ? this.data.doNotSendToDesignatedRecipient : false
        });

        this.form = new Ext.form.FieldSet({
            items: [
                {
                    xtype: 'tabpanel',
                    activeTab: 0,
                    width: '100%',
                    defaults: {
                        autoHeight: true,
                        bodyStyle: 'padding:10px;'
                    },
                    items: tabs
                },
                this.doNotSendToDesignatedRecipient
            ],
            getValues: this.getValues.bind(this)
        });

        return this.form;
    },

    getValues: function () {
        var values = {};

        Ext.Object.each(this.fields, function (storeId, storeElements) {
            values[storeId] = {};

            Ext.Object.each(storeElements, function(key, elementHref) {
                values[storeId][key] = elementHref.getValue();
            });
        });

        return {
            mails: values,
            doNotSendToDesignatedRecipient: this.doNotSendToDesignatedRecipient.getValue()
        };
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.actions.storeOrderMail');

coreshop.notification.rule.actions.storeOrderMail = Class.create(coreshop.notification.rule.actions.storeMail, {
    type: 'storeOrderMail',

    fields: {},

    getForm: function ($super) {
        var form = $super();

        this.sendInvoices = Ext.create({
            fieldLabel: t('coreshop_mail_rule_send_invoices'),
            xtype: 'checkbox',
            name: 'sendInvoices',
            checked: this.data ? this.data.sendInvoices : false
        });

        this.sendShipments = Ext.create({
            fieldLabel: t('coreshop_mail_rule_send_shipments'),
            xtype: 'checkbox',
            name: 'sendShipments',
            checked: this.data ? this.data.sendShipments : false
        });

        form.add([this.sendInvoices, this.sendShipments]);

        return form;
    },

    getValues: function ($super) {
        var values = $super();

        values = Ext.applyIf({
            'sendInvoices': this.sendInvoices.getValue(),
            'sendShipments': this.sendShipments.getValue()
        }, values);

        return values;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.messageType');

coreshop.notification.rule.conditions.messageType = Class.create(coreshop.rules.conditions.abstract, {
    type: 'messageType',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_condition_messageType'),
                    name: 'messageType',
                    value: this.data ? this.data.messageType : null,
                    width: 250,
                    store: [['customer', t('coreshop_message_type_customer')], ['customer-reply', t('coreshop_message_type_customer_reply')], ['contact', t('coreshop_message_type_contact')]],
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.carriers');

coreshop.notification.rule.conditions.carriers = Class.create(coreshop.rules.conditions.abstract, {
    type: 'carriers',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_carriers');

        var carriers = {
            fieldLabel: t('coreshop_carrier'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'identifier',
            valueField: 'id',
            forceSelection: true,
            multiSelect: true,
            triggerAction: 'all',
            name: 'carriers',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.carriers)
                        this.setValue(me.data.carriers);
                }
            }
        };

        if (this.data && this.data.carriers) {
            carriers.value = this.data.carriers;
        }

        carriers = new Ext.ux.form.MultiSelect(carriers);

        this.form = new Ext.form.Panel({
            items: [
                carriers
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.comment');

coreshop.notification.rule.conditions.comment = Class.create(coreshop.rules.conditions.abstract, {
    type: 'comment',
    getForm: function () {
        this.form = new Ext.form.Panel({
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_condition_comment_action'),
                    typeAhead: false,
                    editable: false,
                    width: 500,
                    value: this.data ? this.data.commentAction : null,
                    store: [['create', t('coreshop_condition_comment_action_create')]],
                    forceSelection: true,
                    triggerAction: 'all',
                    name: 'commentAction',
                    queryMode: 'local'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.backendCreated');

coreshop.notification.rule.conditions.backendCreated = Class.create(coreshop.rules.conditions.abstract, {
    type: 'backendCreated',

    getForm: function () {
        this.form = new Ext.form.Panel({
            items: [
                {
                    xtype: 'checkbox',
                    fieldLabel: t('coreshop_condition_backendCreated'),
                    name: 'backendCreated',
                    checked: this.data ? this.data.backendCreatedbackendCreated : false
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderState');

coreshop.notification.rule.conditions.orderState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'orderState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'orderState',
                    value: this.data ? this.data.orderState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_order'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderTransition');

coreshop.notification.rule.conditions.orderTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'orderTransition',

    getRepoName: function() {
        return 'coreshop_transitions_order';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.payment');

coreshop.notification.rule.conditions.payment = Class.create(coreshop.rules.conditions.abstract, {
    type: 'payment',

    getForm: function () {
        var paymentProvidersStore = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: '/admin/coreshop/payment_providers/list',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            fields: ['id', 'identifier']
        });
        paymentProvidersStore.load();

        var providers = new Ext.ux.form.MultiSelect({
            typeAhead: true,
            listWidth: 100,
            width: 500,
            forceSelection: true,
            maxHeight: 400,
            delimiter: false,
            labelWidth: 150,
            fieldLabel: t('coreshop_paymentProvider'),
            mode: 'local',
            store: paymentProvidersStore,
            displayField: 'identifier',
            valueField: 'id',
            triggerAction: 'all',
            name: 'providers',
            multiSelect: true,
            value: this.data ? this.data.providers : []
        });

        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                providers
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderPaymentState');

coreshop.notification.rule.conditions.orderPaymentState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'orderPaymentState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'orderPaymentState',
                    value: this.data ? this.data.orderPaymentState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_order_payment'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderPaymentTransition');

coreshop.notification.rule.conditions.orderPaymentTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'orderPaymentTransition ',

    getRepoName: function() {
        return 'coreshop_transitions_order_payment';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderShippingState');

coreshop.notification.rule.conditions.orderShippingState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'shippingState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'orderShippingState',
                    value: this.data ? this.data.orderShippingState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_order_shipment'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderShippingTransition');

coreshop.notification.rule.conditions.orderShippingTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'orderShippingTransition ',

    getRepoName: function() {
        return 'coreshop_transitions_order_shipment';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderInvoiceState');

coreshop.notification.rule.conditions.orderInvoiceState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'invoiceState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'orderInvoiceState',
                    value: this.data ? this.data.orderInvoiceState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_order_invoice'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.orderInvoiceTransition');

coreshop.notification.rule.conditions.orderInvoiceTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'orderInvoiceTransition ',

    getRepoName: function() {
        return 'coreshop_transitions_order_invoice';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.paymentState');

coreshop.notification.rule.conditions.paymentState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'paymentState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'paymentState',
                    value: this.data ? this.data.paymentState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_payment'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.paymentTransition');

coreshop.notification.rule.conditions.paymentTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'paymentTransition',

    getRepoName: function() {
        return 'coreshop_transitions_payment';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.shipmentState');

coreshop.notification.rule.conditions.shipmentState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'shipmentState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'shipmentState',
                    value: this.data ? this.data.shipmentState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_shipment'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.shipmentTransition');

coreshop.notification.rule.conditions.shipmentTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'shipmentTransition',

    getRepoName: function() {
        return 'coreshop_transitions_shipment';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.invoiceState');

coreshop.notification.rule.conditions.invoiceState = Class.create(coreshop.rules.conditions.abstract, {
    type: 'invoiceState',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_transition_direction_state'),
                    name: 'invoiceState',
                    value: this.data ? this.data.invoiceState : [],
                    width: 250,
                    store: pimcore.globalmanager.get('coreshop_states_invoice'),
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local',
                    displayField: 'label',
                    valueField: 'state'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.invoiceTransition');

coreshop.notification.rule.conditions.invoiceTransition = Class.create(coreshop.notification.rule.conditions.abstractTransition, {
    type: 'invoiceTransition',

    getRepoName: function() {
        return 'coreshop_transitions_invoice';
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.userType');

coreshop.notification.rule.conditions.userType = Class.create(coreshop.rules.conditions.abstract, {
    type: 'userType',

    getForm: function () {
        this.form = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: t('coreshop_condition_userType'),
                    name: 'userType',
                    value: this.data ? this.data.userType : null,
                    width: 250,
                    store: [
                        ['register', t('coreshop_user_type_new')],
                        ['password-reset', t('coreshop_user_type_password')],
                        ['newsletter-double-opt-in', t('coreshop_user_type_newsletter_double_opt_in')],
                        ['newsletter-confirmed', t('coreshop_user_type_newsletter_confirmed')]
                    ],
                    triggerAction: 'all',
                    typeAhead: false,
                    editable: false,
                    forceSelection: true,
                    queryMode: 'local'
                }
            ]
        });

        return this.form;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.notification.rule.conditions.stores');

coreshop.notification.rule.conditions.stores = Class.create(coreshop.rules.conditions.abstract, {
    type: 'stores',

    getForm: function () {
        var me = this;
        var store = pimcore.globalmanager.get('coreshop_stores');

        var stores = {
            fieldLabel: t('coreshop_store'),
            typeAhead: true,
            listWidth: 100,
            width: 500,
            store: store,
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
            multiSelect: true,
            triggerAction: 'all',
            name: 'stores',
            maxHeight: 400,
            delimiter: false,
            listeners: {
                beforerender: function () {
                    if (!store.isLoaded() && !store.isLoading())
                        store.load();

                    if (me.data && me.data.stores)
                        this.setValue(me.data.stores);
                }
            }
        };

        if (this.data && this.data.stores) {
            stores.value = this.data.stores;
        }

        stores = new Ext.ux.form.MultiSelect(stores);

        this.form = new Ext.form.Panel({
            items: [
                stores
            ]
        });

        return this.form;
    }
});



pimcore.registerNS('pimcore.object.gridcolumn.operator.storeprice');

pimcore.object.gridcolumn.operator.storeprice = Class.create(pimcore.object.gridcolumn.Abstract, {
    type: 'operator',
    class: 'StorePrice',
    iconCls: 'coreshop_icon_operator_store_price',
    defaultText: 'coreshop_operator_store_price',
    group: 'coreshop',

    getConfigTreeNode: function (configAttributes) {
        var node;

        if (configAttributes) {
            var nodeLabel = this.getNodeLabel(configAttributes);
            node = {
                draggable: true,
                iconCls: this.iconCls,
                text: nodeLabel,
                configAttributes: configAttributes,
                isTarget: true,
                isChildAllowed: this.allowChild,
                expanded: true,
                leaf: false,
                expandable: false
            };
        } else {
            //For building up operator list
            configAttributes = {type: this.type, class: this.class};

            node = {
                draggable: true,
                iconCls: this.iconCls,
                text: t(this.defaultText),
                configAttributes: configAttributes,
                isTarget: true,
                leaf: true,
                isChildAllowed: this.allowChild
            };
        }

        node.isOperator = true;
        return node;
    },

    getCopyNode: function (source) {
        return source.createNode({
            iconCls: this.iconCls,
            text: source.data.text,
            isTarget: true,
            leaf: false,
            expandable: false,
            isOperator: true,
            isChildAllowed: this.allowChild,
            configAttributes: {
                label: source.data.text,
                type: this.type,
                class: this.class
            }
        });
    },

    getConfigDialog: function (node) {
        this.node = node;

        this.textField = new Ext.form.TextField({
            fieldLabel: t('label'),
            length: 255,
            width: 200,
            value: this.node.data.configAttributes.label
        });

        this.storeField = Ext.create({
            xtype: 'coreshop.store',
            value: this.node.data.configAttributes.storeId
        });

        this.configPanel = new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding: 10px;',
            items: [
                this.textField,
                this.storeField
            ],
            buttons: [{
                text: t('apply'),
                iconCls: 'pimcore_icon_apply',
                handler: function () {
                    this.commitData();
                }.bind(this)
            }]
        });

        this.window = new Ext.Window({
            width: 400,
            height: 200,
            modal: true,
            title: t('coreshop_operator_store_price_settings'),
            layout: 'fit',
            items: [this.configPanel]
        });

        this.window.show();
        return this.window;
    },

    commitData: function () {
        this.node.data.configAttributes.label = this.textField.getValue();
        this.node.data.configAttributes.storeId = this.storeField.getValue();

        var nodeLabel = this.getNodeLabel(this.node.data.configAttributes);
        this.node.set('text', nodeLabel);
        this.node.set('isOperator', true);

        this.window.close();
    },

    allowChild: function (targetNode, dropNode) {
        return false;
    },

    getNodeLabel: function (configAttributes) {
        return configAttributes.label;
    }
});


/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

pimcore.registerNS('coreshop.core.settings');
coreshop.core.settings = Class.create({

    shopPanels: {},

    initialize: function () {

        this.getData();
    },

    getData: function () {
        Ext.Ajax.request({
            url: '/admin/coreshop/configurations/get-all',
            success: function (response) {

                this.data = Ext.decode(response.responseText).data;

                this.getTabPanel();

            }.bind(this)
        });
    },

    getValue: function (shopId, key) {
        var current = null;

        if (this.data.hasOwnProperty(shopId)) {
            var shopValues = this.data[shopId];

            if (shopValues.hasOwnProperty(key)) {
                current = shopValues[key];
            }
        }

        if (current !== null && typeof current !== 'function') {
            return current;
        }

        return '';
    },

    getClass: function (key, fromCurrentValues) {
        var lastValue = null;
        var firstLoop = true;

        if (fromCurrentValues === undefined) {
            fromCurrentValues = false;
        }

        for (var shopId in this.data) {
            if (!this.data.hasOwnProperty(shopId)) {
                return;
            }

            var value = this.getValue(shopId, key);

            if (fromCurrentValues) {
                value = this.shopPanels[shopId].down('[name="' + key + '"]').getValue();
            }

            if (firstLoop) {
                lastValue = value;
            } else {
                if (Ext.isArray(value) && Ext.isArray(lastValue)) {
                    var diff = Ext.Array.difference(lastValue, value);

                    if (Ext.isArray(diff) && diff.length > 0) {
                        return '';
                    }
                }
                else if (lastValue !== value) {
                    return '';
                }
            }

            firstLoop = false;
        }

        return this.getInheritanceClass();
    },

    getInheritanceClass: function () {
        return 'coreshop_settings_inherited';
    },

    getTabPanel: function () {

        if (!this.panel) {

            var me = this;

            this.panel = Ext.create('Ext.panel.Panel', {
                id: 'coreshop_settings',
                title: t('coreshop_settings'),
                iconCls: 'coreshop_icon_settings',
                border: false,
                layout: 'fit',
                closable: true
            });

            var tabPanel = Ext.getCmp('pimcore_panel_tabs');
            tabPanel.add(this.panel);
            tabPanel.setActiveItem('coreshop_settings');

            this.panel.on('destroy', function () {
                pimcore.globalmanager.remove('coreshop_settings');
            }.bind(this));

            /*this.exchangeRatesStore = new Ext.data.Store({
             proxy: {
             type: 'ajax',
             url : '/admin/coreshop/currency/get-exchange-rate-providers',
             reader: {
             type: 'json',
             rootProperty : 'data'
             }
             }
             });

             this.exchangeRatesStore.load();*/

            /*this.messagingContactStore = pimcore.globalmanager.get('coreshop_messaging_contacts');
             this.messagingContactStore.load();*/

            this.layout = Ext.create('Ext.tab.Panel', {
                bodyStyle: 'padding:20px 5px 20px 5px;',
                border: false,
                autoScroll: true,
                forceLayout: true,
                defaults: {
                    forceLayout: true
                },
                buttons: [
                    {
                        text: t('save'),
                        handler: this.save.bind(this),
                        iconCls: 'pimcore_icon_apply'
                    }
                ]
            });

            for (var shopId in this.data) {
                if (!this.data.hasOwnProperty(shopId)) {
                    return;
                }

                this.shopPanels[shopId] = this.getConfigFormForShop(shopId);
                this.layout.add(this.shopPanels[shopId]);
            }

            this.panel.add(this.layout);

            this.layout.setActiveItem(0);

            pimcore.layout.refresh();
        }

        return this.panel;
    },

    activate: function () {
        var tabPanel = Ext.getCmp('pimcore_panel_tabs');
        tabPanel.setActiveItem('coreshop_settings');
    },

    save: function () {
        var values = {};

        for (var shopId in this.shopPanels) {
            if (this.shopPanels.hasOwnProperty(shopId)) {
                values[shopId] = this.shopPanels[shopId].getForm().getFieldValues();
            }
        }

        Ext.Ajax.request({
            url: '/admin/coreshop/configurations/save-all',
            method: 'post',
            params: {
                values: Ext.encode(values),
            },
            success: function (response) {
                try {
                    var res = Ext.decode(response.responseText);
                    if (res.success) {
                        pimcore.helpers.showNotification(t('success'), t('coreshop_settings_save_success'), 'success');

                        Ext.MessageBox.confirm(t('info'), t('reload_pimcore_changes'), function (buttonValue) {
                            if (buttonValue === 'yes') {
                                window.location.reload();
                            }
                        }.bind(this));

                    } else {
                        pimcore.helpers.showNotification(t('error'), t('coreshop_settings_save_error'),
                            'error', t(res.message));
                    }
                } catch (e) {
                    pimcore.helpers.showNotification(t('error'), t('coreshop_settings_save_error'), 'error');
                }
            }
        });
    },

    elementChanged: function (el, newValue, oldValue, eOpts) {
        var elements = this.panel.query('[name="' + el.getName() + '"]');

        if (elements) {
            Ext.each(elements, function (element) {
                element.removeCls(this.getInheritanceClass());
                element.addCls(this.getClass(el.getName(), true));
            }.bind(this));
        }
    },

    checkForInheritance: function (element) {
        var me = this;

        if (coreshop.settings.multishop) {
            if (element['items']) {
                Ext.each(element.items.items, function (item) {
                    if (item['getName']) {
                        item.addCls(me.getClass(item.getName()));
                        item.removeListener('change', me.elementChanged.bind(me));
                        item.addListener('change', me.elementChanged.bind(me));
                    }

                    if (item['items']) {
                        me.checkForInheritance(item);
                    }
                });
            }
        }
    },

    getConfigFormForShop: function (shopId) {

        var me = this,
            shopPanel,
            store = pimcore.globalmanager.get('coreshop_stores'),
            shop = store.getById(shopId);

        if (!shop) {
            alert('STORE NOT FOUND!');
            return;
        }
        shopPanel = Ext.create('Ext.form.Panel', {
            title: shop.get('name'),
            border: false,
            autoScroll: true,
            forceLayout: true,
            defaults: {
                forceLayout: true,
                listeners: {
                    render: function (el) {
                        me.checkForInheritance(el);
                    }
                }
            },
            fieldDefaults: {
                labelWidth: 250
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: t('coreshop_base'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_base_guestcheckout'),
                            xtype: 'checkbox',
                            name: 'system.guest.checkout',
                            checked: this.getValue(shopId, 'system.guest.checkout')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: t('coreshop_category'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {minWidth: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_category_list_mode'),
                            name: 'system.category.list.mode',
                            value: this.getValue(shopId, 'system.category.list.mode'),
                            width: 500,
                            xtype: 'combo',
                            store: [['list', t('coreshop_category_list_mode_list')], ['grid', t('coreshop_category_list_mode_grid')]],
                            triggerAction: 'all',
                            typeAhead: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local'
                        },
                        {
                            xtype: 'tagfield',
                            fieldLabel: t('coreshop_category_list_per_page'),
                            store: new Ext.data.ArrayStore({
                                fields: [
                                    'perPage'
                                ],
                                data: []
                            }),
                            value: this.getValue(shopId, 'system.category.list.per_page'),
                            name: 'system.category.list.per_page',
                            createNewOnEnter: true,
                            createNewOnBlur: true,
                            queryMode: 'local',
                            displayField: 'perPage',
                            valueField: 'perPage',
                            hideTrigger: true
                        },
                        {
                            fieldLabel: t('coreshop_category_list_per_page_default'),
                            name: 'system.category.list.per_page.default',
                            xtype: 'numberfield',
                            minValue: 1,
                            value: this.getValue(shopId, 'system.category.list.per_page.default')
                        },
                        {
                            fieldLabel: t('coreshop_category_list_include_subcategories'),
                            name: 'system.category.list.include_subcategories',
                            xtype: 'checkbox',
                            checked: this.getValue(shopId, 'system.category.list.include_subcategories')
                        },
                        {
                            xtype: 'tagfield',
                            fieldLabel: t('coreshop_category_grid_per_page'),
                            store: new Ext.data.ArrayStore({
                                fields: [
                                    'perPage'
                                ],
                                data: []
                            }),
                            value: this.getValue(shopId, 'system.category.grid.per_page'),
                            name: 'system.category.grid.per_page',
                            createNewOnEnter: true,
                            createNewOnBlur: true,
                            queryMode: 'local',
                            displayField: 'perPage',
                            valueField: 'perPage',
                            hideTrigger: true
                        },
                        {
                            fieldLabel: t('coreshop_category_grid_per_page_default'),
                            name: 'system.category.grid.per_page.default',
                            xtype: 'numberfield',
                            minValue: 1,
                            value: this.getValue(shopId, 'system.category.grid.per_page.default')
                        },
                        {
                            fieldLabel: t('coreshop_category_variant_mode'),
                            name: 'system.category.variant_mode',
                            value: this.getValue(shopId, 'system.category.variant_mode'),
                            width: 500,
                            xtype: 'combo',
                            store: [['hide', t('coreshop_category_variant_mode_hide')], ['include', t('coreshop_category_variant_mode_include')], ['include_parent_object', t('coreshop_category_variant_mode_include_parent_object')]],
                            triggerAction: 'all',
                            typeAhead: false,
                            editable: false,
                            forceSelection: true,
                            queryMode: 'local'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: t('coreshop_quote'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_prefix'),
                            name: 'system.quote.prefix',
                            value: this.getValue(shopId, 'system.quote.prefix')
                        },
                        {
                            fieldLabel: t('coreshop_suffix'),
                            name: 'system.quote.suffix',
                            value: this.getValue(shopId, 'system.quote.suffix')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: t('coreshop_order'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_prefix'),
                            name: 'system.order.prefix',
                            value: this.getValue(shopId, 'system.order.prefix')
                        },
                        {
                            fieldLabel: t('coreshop_suffix'),
                            name: 'system.order.suffix',
                            value: this.getValue(shopId, 'system.order.suffix')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: t('coreshop_invoice'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_prefix'),
                            name: 'system.invoice.prefix',
                            value: this.getValue(shopId, 'system.invoice.prefix')
                        },
                        {
                            fieldLabel: t('coreshop_suffix'),
                            name: 'system.invoice.suffix',
                            value: this.getValue(shopId, 'system.invoice.suffix')
                        },
                        {
                            fieldLabel: t('coreshop_wkhtmltopdf_params'),
                            name: 'system.invoice.wkhtml',
                            value: this.getValue(shopId, 'system.invoice.wkhtml')
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: t('coreshop_shipping'),
                    collapsible: true,
                    collapsed: true,
                    autoHeight: true,
                    labelWidth: 250,
                    defaultType: 'textfield',
                    defaults: {width: 600},
                    items: [
                        {
                            fieldLabel: t('coreshop_prefix'),
                            name: 'system.shipment.prefix',
                            value: this.getValue(shopId, 'system.shipment.prefix')
                        },
                        {
                            fieldLabel: t('coreshop_suffix'),
                            name: 'system.shipment.suffix',
                            value: this.getValue(shopId, 'system.shipment.suffix')
                        },
                        {
                            fieldLabel: t('coreshop_wkhtmltopdf_params'),
                            name: 'system.shipment.wkhtml',
                            value: this.getValue(shopId, 'system.shipment.wkhtml')
                        }
                    ]
                }
            ]
        });

        coreshop.broker.fireEvent('coreShop.settings.store', this, shopId, shopPanel);

        return shopPanel;
    }
});



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */

coreshop.helpers.createOrder = function () {
    pimcore.helpers.itemselector(
        false,
        function (customer) {
            new pimcore.plugin.coreshop.orders.create.order(customer.id);
        }.bind(this),
        {
            type: ['object'],
            subtype: {
                object: ['object']
            },
            specific: {
                classes: [coreshop.class_map.coreshop.customer]
            }
        }
    );
};

coreshop.util.format.currency = function (currency, v) {
    v = (Math.round(((v / 100) - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + '.00' : ((v * 10 == Math.floor(v * 10)) ? v + '0' : v);
    v = String(v);
    var ps = v.split('.'),
        whole = ps[0],
        sub = ps[1] ? '.' + ps[1] : '.00',
        r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, '$1' + ',' + '$2');
    }

    v = whole + sub;
    if (v.charAt(0) == '-') {
        return '-' + currency + v.substr(1);
    }

    return currency + ' ' + v;
};

coreshop.helpers.showAbout = function () {

    var html = '<div class="pimcore_about_window">';
    html += '<br><img src="/bundles/coreshopcore/pimcore/img/logo.svg" style="width: 60px;"><br>';
    html += '<br><b>Version: ' + coreshop.settings.bundle.version + '</b>';
    html += '<br><br>&copy; by Dominik Pfaffenbauer, Wels, Austria (<a href="https://www.coreshop.org/" target="_blank">coreshop.org</a>)';
    html += '<br><br><a href="https://github.com/coreshop/coreshop/blob/master/LICENSE.md" target="_blank">License</a> | ';
    html += '<a href="https://www.coreshop.org/contact.html" target="_blank">Contact</a>';
    html += '</div>';

    var win = new Ext.Window({
        title: t('about'),
        width: 500,
        height: 300,
        bodyStyle: 'padding: 10px;',
        modal: true,
        html: html
    });

    win.show();
};



/*
 * CoreShop.
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2015-2019 Dominik Pfaffenbauer (https://www.pfaffenbauer.at)
 * @license    https://www.coreshop.org/license     GNU General Public License version 3 (GPLv3)
 *
 */
pimcore.registerNS('coreshop.core');
pimcore.registerNS('coreshop.core.resource');
coreshop.core.resource = Class.create(coreshop.resource, {
    initialize: function () {
        coreshop.broker.addListener('pimcore.ready', this.pimcoreReady, this);
        coreshop.broker.addListener('pimcore.postOpenObject', this.postOpenObject, this);
    },

    pimcoreReady: function (params, broker) {
        Ext.get('pimcore_status').insertHtml('beforeEnd', '<div id="coreshop_status" class="loading" data-menu-tooltip="' + t('coreshop_loading') + '"></div>');

        Ext.Ajax.request({
            url: '/admin/coreshop/settings/get-settings',
            success: function (response) {
                resp = Ext.decode(response.responseText);

                this.settings = resp;
                coreshop.settings = this.settings;

                this.initializeCoreShop();
            }.bind(this)
        });
    },

    initializeCoreShop: function () {
        var self = this;
        var coreShopMenuItems = [];
        var user = pimcore.globalmanager.get('user');

        var toolbar = pimcore.globalmanager.get('layout_toolbar');

        if (user.isAllowed('coreshop_permission_order_detail')) {
            coreShopMenuItems.push({
                text: t('coreshop_order_by_number'),
                iconCls: 'coreshop_icon_order',
                handler: coreshop.order.helper.openSaleByNumberDialog.bind(this, 'order')
            });
        }

        if (user.isAllowed('coreshop_permission_quote_detail')) {
            coreShopMenuItems.push({
                text: t('coreshop_quote_by_number'),
                iconCls: 'coreshop_icon_quote',
                handler: coreshop.order.helper.openSaleByNumberDialog.bind(this, 'quote')
            });
        }

        if (user.isAllowed('coreshop_permission_settings')) {
            coreShopMenuItems.push({
                text: t('coreshop_settings'),
                iconCls: 'coreshop_icon_settings',
                handler: this.openSettings
            });
        }

        var priceRulesMenu = [];

        if (user.isAllowed('coreshop_permission_cart_price_rule')) {
            priceRulesMenu.push({
                text: t('coreshop_cart_pricerules'),
                iconCls: 'coreshop_icon_price_rule',
                handler: this.openPriceRules
            });
        }

        if (user.isAllowed('coreshop_permission_product_price_rule')) {
            priceRulesMenu.push({
                text: t('coreshop_product_pricerules'),
                iconCls: 'coreshop_icon_price_rule',
                handler: this.openProductPriceRules
            });
        }

        if (priceRulesMenu.length > 0) {
            coreShopMenuItems.push({
                text: t('coreshop_pricerules'),
                iconCls: 'coreshop_icon_price_rule',
                hideOnClick: false,
                menu: {
                    cls: 'pimcore_navigation_flyout',
                    shadow: false,
                    items: priceRulesMenu
                }
            });
        }

        var localizationMenu = [];

        if (user.isAllowed('coreshop_permission_country')) {
            localizationMenu.push({
                text: t('coreshop_countries'),
                iconCls: 'coreshop_icon_country',
                handler: this.openCountryList
            });
        }

        if (user.isAllowed('coreshop_permission_state')) {
            localizationMenu.push({
                text: t('coreshop_states'),
                iconCls: 'coreshop_icon_state',
                handler: this.openStateList
            });
        }

        if (user.isAllowed('coreshop_permission_currency')) {
            localizationMenu.push({
                text: t('coreshop_currencies'),
                iconCls: 'coreshop_icon_currency',
                handler: this.openCurrencyList
            });
        }

        if (user.isAllowed('coreshop_permission_exchange_rate')) {
            localizationMenu.push({
                text: t('coreshop_exchange_rates'),
                iconCls: 'coreshop_icon_exchange_rate',
                handler: this.openExchangeRates
            });
        }

        if (user.isAllowed('coreshop_permission_zone')) {
            localizationMenu.push({
                text: t('coreshop_zones'),
                iconCls: 'coreshop_icon_zone',
                handler: this.openZoneList
            });
        }

        if (user.isAllowed('coreshop_permission_tax_item')) {
            localizationMenu.push({
                text: t('coreshop_taxes'),
                iconCls: 'coreshop_icon_taxes',
                handler: this.openTaxes
            });
        }

        if (user.isAllowed('coreshop_permission_tax_rule_group')) {
            localizationMenu.push({
                text: t('coreshop_taxrulegroups'),
                iconCls: 'coreshop_icon_tax_rule_groups',
                handler: this.openTaxRuleGroups
            });
        }

        if (localizationMenu.length > 0) {
            coreShopMenuItems.push({
                text: t('coreshop_localization'),
                iconCls: 'coreshop_icon_localization',
                hideOnClick: false,
                menu: {
                    cls: 'pimcore_navigation_flyout',
                    shadow: false,
                    items: localizationMenu
                }
            });
        }

        var ordersMenu = [];

        if (user.isAllowed('coreshop_permission_order_list')) {
            ordersMenu.push({
                text: t('coreshop_orders'),
                iconCls: 'coreshop_icon_orders',
                handler: this.openOrders
            });
        }

        if (user.isAllowed('coreshop_permission_order_create')) {
            ordersMenu.push({
                text: t('coreshop_order_create'),
                iconCls: 'coreshop_icon_order_create',
                handler: this.openCreateOrder
            });
        }

        if (user.isAllowed('coreshop_permission_quote_list')) {
            ordersMenu.push({
                text: t('coreshop_quotes'),
                iconCls: 'coreshop_icon_quotes',
                handler: this.openQuotes
            });
        }

        if (user.isAllowed('coreshop_permission_quote_create')) {
            ordersMenu.push({
                text: t('coreshop_quote_create'),
                iconCls: 'coreshop_icon_quote_create',
                handler: this.openCreateQuote
            });
        }

        if (ordersMenu.length > 0) {
            coreShopMenuItems.push({
                text: t('coreshop_order'),
                iconCls: 'coreshop_icon_order',
                hideOnClick: false,
                menu: {
                    cls: 'pimcore_navigation_flyout',
                    shadow: false,
                    items: ordersMenu
                }
            });
        }

        var carriersMenu = [];

        if (user.isAllowed('coreshop_permission_carrier')) {
            carriersMenu.push({
                text: t('coreshop_carriers'),
                iconCls: 'coreshop_icon_carriers',
                handler: this.openCarriersList
            });
        }

        if (user.isAllowed('coreshop_permission_shipping_rule')) {
            carriersMenu.push({
                text: t('coreshop_carriers_shipping_rules'),
                iconCls: 'coreshop_icon_carrier_shipping_rule',
                handler: this.openCarriersShippingRules
            });
        }

        if (carriersMenu.length > 0) {
            coreShopMenuItems.push({
                text: t('coreshop_shipping'),
                iconCls: 'coreshop_icon_shipping',
                hideOnClick: false,
                menu: {
                    shadow: false,
                    cls: 'pimcore_navigation_flyout',
                    items: carriersMenu
                }
            });
        }

        var productsMenu = [];

        if (user.isAllowed('coreshop_permission_index')) {
            productsMenu.push({
                text: t('coreshop_indexes'),
                iconCls: 'coreshop_icon_indexes',
                handler: this.openIndexes
            });
        }

        if (user.isAllowed('coreshop_permission_filter')) {
            productsMenu.push({
                text: t('coreshop_filters'),
                iconCls: 'coreshop_icon_filters',
                handler: this.openProductFilters
            });
        }

        if (productsMenu.length > 0) {
            coreShopMenuItems.push({
                text: t('coreshop_product'),
                iconCls: 'coreshop_icon_product',
                hideOnClick: false,
                menu: {
                    cls: 'pimcore_navigation_flyout',
                    shadow: false,
                    items: productsMenu
                }
            });
        }

        /*var messagingMenu = [];

         if (user.isAllowed('coreshop_permission_messaging_thread')) {
         messagingMenu.push({
         text: t('coreshop_messaging_thread'),
         iconCls: 'coreshop_icon_messaging_thread',
         handler: this.openMessagingThread
         });
         }

         if (user.isAllowed('coreshop_permission_messaging_contact')) {
         messagingMenu.push({
         text: t('coreshop_messaging_contact'),
         iconCls: 'coreshop_icon_messaging_contact',
         handler: this.openMessagingContact
         });
         }

         if (user.isAllowed('coreshop_permission_messaging_thread_state')) {
         messagingMenu.push({
         text: t('coreshop_messaging_threadstate'),
         iconCls: 'coreshop_icon_messaging_thread_state',
         handler: this.openMessagingThreadState
         });
         }

         if (messagingMenu.length > 0) {
         coreShopMenuItems.push({
         text: t('coreshop_messaging'),
         iconCls: 'coreshop_icon_messaging',
         hideOnClick: false,
         menu: {
         cls: 'pimcore_navigation_flyout',
         shadow: false,
         items: messagingMenu
         }
         });
         }*/

        if (user.isAllowed('coreshop_permission_notification')) {
            coreShopMenuItems.push({
                text: t('coreshop_notification_rules'),
                iconCls: 'coreshop_icon_notification_rule',
                handler: this.openNotificationRules
            });
        }

        if (user.isAllowed('coreshop_permission_payment_provider')) {
            coreShopMenuItems.push({
                text: t('coreshop_payment_providers'),
                iconCls: 'coreshop_icon_payment_provider',
                handler: this.openPaymentProviders
            });
        }

        if (user.isAllowed('coreshop_permission_store')) {
            coreShopMenuItems.push({
                text: t('coreshop_stores'),
                iconCls: 'coreshop_icon_store',
                handler: this.openStores
            });
        }

        coreShopMenuItems.push({
            text: 'ABOUT CoreShop &reg;',
            iconCls: 'coreshop_icon_logo',
            handler: function () {
                coreshop.helpers.showAbout();
            }
        });

        if (coreShopMenuItems.length > 0) {
            this._menu = new Ext.menu.Menu({
                items: coreShopMenuItems,
                shadow: false,
                cls: 'pimcore_navigation_flyout'
            });

            Ext.get('pimcore_navigation').down('ul').insertHtml('beforeEnd', '<li id="pimcore_menu_coreshop" data-menu-tooltip="' + t('coreshop') + '" class="pimcore_menu_item pimcore_menu_needs_children">' +
                '<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"' +
                     'width="61.3" height="84.6" viewBox="0 0 61.3 84.6" enable-background="new 0 0 61.3 84.6" xml:space="preserve">' +
                '<style type="text/css">' +
                    '.st0{display:none;}' +
                    '.st1{display:inline;fill:#969696;}' +
                    '.st2{display:inline;fill:white;}' +
                    '.st3{fill:#969696;}' +
                    '.st4{fill:white;}' +
                '</style>' +
                '<g>' +
                    '<g class="st0">' +
                        '<path class="st1" d="M7.4,113.2c1.6,0,2.9-0.6,3.8-1.9l2,2.1c-1.6,1.8-3.5,2.7-5.7,2.7c-2.2,0-4-0.7-5.4-2.1' +
                            'C0.7,112.7,0,111,0,108.8c0-2.1,0.7-3.9,2.2-5.3c1.5-1.4,3.2-2.1,5.3-2.1c2.3,0,4.3,0.9,5.9,2.7l-2,2.3c-1-1.3-2.3-1.9-3.8-1.9' +
                            'c-1.2,0-2.2,0.4-3.1,1.2c-0.9,0.8-1.3,1.8-1.3,3.2c0,1.3,0.4,2.4,1.2,3.2C5.3,112.8,6.3,113.2,7.4,113.2z"/>' +
                        '<path class="st1" d="M26.1,110.5c0,1.6-0.6,2.9-1.7,4c-1.1,1.1-2.5,1.6-4.2,1.6s-3.1-0.5-4.2-1.6c-1.1-1.1-1.7-2.4-1.7-4' +
                            'c0-1.6,0.6-2.9,1.7-4c1.1-1.1,2.5-1.6,4.2-1.6s3.1,0.5,4.2,1.6C25.6,107.6,26.1,108.9,26.1,110.5z M17.6,110.5' +
                            'c0,0.9,0.3,1.6,0.8,2.2c0.5,0.6,1.2,0.8,2,0.8s1.5-0.3,2-0.8c0.5-0.6,0.8-1.3,0.8-2.2c0-0.9-0.3-1.6-0.8-2.2' +
                            'c-0.5-0.6-1.2-0.9-2-0.9s-1.5,0.3-2,0.9C17.8,108.9,17.6,109.6,17.6,110.5z"/>' +
                        '<path class="st1" d="M34.2,107.7c-0.9,0-1.6,0.3-2,1c-0.5,0.6-0.7,1.5-0.7,2.6v4.8h-3.1v-11h3.1v1.5c0.4-0.5,0.109-0.8,1.5-1.1' +
                            'c0.6-0.3,1.2-0.5,1.8-0.5l0,2.9H34.2z"/>' +
                        '<path class="st1" d="M46.3,114.4c-1.2,1.2-2.7,1.8-4.4,1.8s-3.1-0.5-4.1-1.5c-1.1-1-1.6-2.4-1.6-4.1c0-1.7,0.6-3.1,1.7-4.1' +
                            'c1.1-1,2.4-1.5,3.9-1.5c1.5,0,2.8,0.5,3.9,1.4c1.1,0.9,1.6,2.2,1.6,3.8v1.6h-8c0.1,0.6,0.4,1.1,0.9,1.5c0.5,0.4,1.1,0.6,1.8,0.6' +
                            'c1.1,0,2-0.4,2.7-1.1L46.3,114.4z M43.4,107.9c-0.4-0.4-0.9-0.5-1.5-0.5c-0.6,0-1.2,0.2-1.7,0.6c-0.5,0.4-0.8,0.9-0.9,1.5h4.8' +
                            'C44,108.8,43.8,108.3,43.4,107.9z"/>' +
                        '<path class="st2" d="M52.9,104.6c-0.3,0.3-0.5,0.6-0.5,1s0.2,0.7,0.6,1c0.4,0.2,1.2,0.5,2.6,0.9c1.4,0.3,2.4,0.8,3.2,1.5' +
                            'c0.8,0.7,1.1,1.6,1.1,2.9c0,1.3-0.5,2.3-1.4,3.1c-1,0.8-2.2,1.2-3.8,1.2c-2.3,0-4.3-0.8-6.1-2.5l1.9-2.3c1.5,1.3,3,2,4.3,2' +
                            'c0.6,0,1-0.1,1.4-0.4c0.3-0.3,0.5-0.6,0.5-1c0-0.4-0.2-0.8-0.5-1c-0.4-0.3-1.1-0.5-2.1-0.8c-1.7-0.4-2.9-0.9-3.7-1.5' +
                            'c-0.8-0.6-1.2-1.6-1.2-3c0-1.4,0.5-2.4,1.5-3.1c1-0.7,2.2-1.1,3.7-1.1c1,0,1.9,0.2,2.9,0.5c1,0.3,1.8,0.8,2.5,1.4l-1.6,2.3' +
                            'c-1.2-0.9-2.5-1.4-3.8-1.4C53.6,104.2,53.2,104.3,52.9,104.6z"/>' +
                        '<path class="st2" d="M65.4,110.1v5.9h-3.1v-15.2h3.1v5.4c0.9-0.9,2-1.4,3.1-1.4s2.1,0.4,2.9,1.2c0.8,0.8,1.2,1.9,1.2,3.3v6.7h-3.1' +
                            'v-6c0-1.7-0.6-2.5-1.9-2.5c-0.6,0-1.1,0.2-1.6,0.7C65.6,108.6,65.4,109.2,65.4,110.1z"/>' +
                        '<path class="st2" d="M86.4,110.5c0,1.6-0.6,2.9-1.7,4c-1.1,1.1-2.5,1.6-4.2,1.6c-1.7,0-3.1-0.5-4.2-1.6c-1.1-1.1-1.7-2.4-1.7-4' +
                            'c0-1.6,0.6-2.9,1.7-4c1.1-1.1,2.5-1.6,4.2-1.6c1.7,0,3.1,0.5,4.2,1.6C85.8,107.6,86.4,108.9,86.4,110.5z M77.8,110.5' +
                            'c0,0.9,0.3,1.6,0.8,2.2c0.5,0.6,1.2,0.8,2,0.8s1.5-0.3,2-0.8c0.5-0.6,0.8-1.3,0.8-2.2c0-0.9-0.3-1.6-0.8-2.2' +
                            'c-0.5-0.6-1.2-0.9-2-0.9s-1.5,0.3-2,0.9C78.1,108.9,77.8,109.6,77.8,110.5z"/>' +
                        '<path class="st2" d="M95.1,104.8c1.3,0,2.4,0.5,3.4,1.6c1,1.1,1.5,2.4,1.5,4c0,1.6-0.5,3-1.5,4.1c-1,1.1-2.2,1.6-3.5,1.6' +
                            'c-1.3,0-2.4-0.5-3.2-1.6v5.4h-3.1v-15h3.1v1.2C92.7,105.3,93.8,104.8,95.1,104.8z M91.7,110.5c0,0.9,0.2,1.6,0.7,2.2' +
                            'c0.5,0.6,1.1,0.8,1.8,0.8c0.7,0,1.3-0.3,1.9-0.8c0.5-0.6,0.8-1.3,0.8-2.2c0-0.9-0.3-1.6-0.8-2.2c-0.5-0.6-1.1-0.9-1.9-0.9' +
                            's-1.3,0.3-1.8,0.9C91.9,108.9,91.7,109.6,91.7,110.5z"/>' +
                    '</g>' +
                    '<g>' +
                        '<path id="Shake" class="st3" d="M60.8,33.7c0-0.1-8.8-20.3-8.8-20.3c-0.7-1.3-1.4-2-2.7-2.5c-1.3-0.6-2.2-0.7-3.7-0.4l-2.9,0.9' +
                            'c0,1.7,0.2,3.4,0.6,4.7c0,0.1,0.1,0.2,0.1,0.3c0.8-1.3,2.5-1.9,4-1.2c1.6,0.7,2.3,2.6,1.6,4.2c-0.7,1.6-2.6,2.3-4.2,1.5' +
                            'c-1-0.5-1.7-1.4-1.8-2.4c0,0,0,0,0,0c-1.3-2.2-1.4-5.6-1.4-6.7l-16.7,5.2c-2.3,1.1-4.1,2-5.2,4.3c-0.8,1.8-4.2,9.1-7.9,17.2' +
                            'L3.3,56.8C1.5,60.5,0.4,63,0.4,63c-1,2.3,0,5,2.2,6c0,0,29.8,13.7,33,15.2c2.3,1,5,0,6-2.2l9.9-21.6l0.8-1.7l8.5-18.5' +
                            'c0.8-1.8,0.7-3.4,0.3-5.1"/>' +
                        '<g>' +
                            '<path class="st4" d="M47.5,0c-1.8-0.1-2.9,1.8-3.4,3.3c-0.8,2-1.2,4.1-1.3,6.3c-0.2,2.4,0,4.7,0.5,6.5c0.4,1.3,1.1,3.1,2.6,3.4' +
                                'c0.7,0.2,1.5-0.1,2-0.5c0.5-0.4,0.9-1,1.1-1.3c0.1-0.1,0.1-0.2,0.1-0.2c-0.1-0.9-0.7-1.7-1.5-2.2c-0.2,0.4-0.3,0.8-0.5,1.1' +
                                'c-0.1,0.2-0.5,1-0.9,0.8c-0.5-0.2-0.8-1.7-1-2.3c-0.3-1.3-0.5-3-0.3-5.2c0.3-4.4,1.6-7.1,2.3-7.4c0.5,0.2,1.6,2.5,1.4,6.9' +
                                'c0,0,1.1,0.3,2.2,1c0-0.1,0.2-2-0.1-4.2c-0.2-1.8-0.5-3.9-1.9-5.3C48.6,0.3,48.1,0,47.5,0z"/>' +
                        '</g>' +
                    '</g>' +
                '</g>' +
                '</svg>' +
                '</li>');
            Ext.get('pimcore_menu_coreshop').on('mousedown', function (e, el) {
                toolbar.showSubMenu.call(this._menu, e, el);
            }.bind(this));

            coreshop.broker.fireEvent('coreShop.menu.initialized', this, this._menu);
        }

        Ext.get('coreshop_status').set(
            {
                'data-menu-tooltip': t('coreshop_loaded').format(coreshop.settings.bundle.version),
                class: ''
            }
        );

        pimcore.helpers.initMenuTooltips();

        //Add Report Definition
        pimcore.report.broker.addGroup('coreshop', 'coreshop_reports', 'coreshop_icon_report');
        //pimcore.report.broker.addGroup('coreshop_monitoring', 'coreshop_monitoring', 'coreshop_icon_monitoring');

        Ext.each(coreshop.settings.reports, function(report) {
            if (coreshop.report.reports.hasOwnProperty(report)) {
                report = coreshop.report.reports[report];

                pimcore.report.broker.addReport(report, 'coreshop', {
                    name: report.prototype.getName(),
                    text: report.prototype.getName(),
                    niceName: report.prototype.getName(),
                    iconCls: report.prototype.getIconCls()
                });
            }
        });
    },

    addPluginMenu: function (menu) {
        if (!this._pluginsMenu) {
            this._pluginsMenu = this._menu.add({
                text: t('coreshop_plugins'),
                iconCls: 'coreshop_icon_plugins',
                hideOnClick: false,
                menu: {
                    shadow: false,
                    cls: 'pimcore_navigation_flyout',
                    items: []
                }
            });
        }

        this._pluginsMenu.menu.add(menu);
    },

    postOpenObject: function (tab, type) {
         if (tab.data.general.o_className === coreshop.class_map.coreshop.order) {
            var orderMoreButtons = [];

            orderMoreButtons.push(
                {
                    text: t('coreshop_add_payment'),
                    scale: 'medium',
                    iconCls: 'coreshop_icon_currency',
                    handler: function () {
                        coreshop.order.order.createPayment.showWindow(tab.id, tab.data.data, function () {
                            tab.reload(tab.data.currentLayoutId);
                        });
                    }.bind(this, tab)
                }
            );

            orderMoreButtons.push({
                text: t('open'),
                scale: 'medium',
                iconCls: 'coreshop_icon_order',
                handler: function () {
                    coreshop.order.helper.openOrder(tab.id);
                }.bind(this, tab)
            });

            if (orderMoreButtons.length > 0) {
                tab.toolbar.insert(tab.toolbar.items.length,
                    '-'
                );

                tab.toolbar.insert(tab.toolbar.items.length,
                    {
                        text: t('coreshop_more'),
                        scale: 'medium',
                        iconCls: 'coreshop_icon_logo',
                        menu: orderMoreButtons
                    }
                );
            }
        } else if (tab.data.general.o_className === coreshop.class_map.coreshop.order_invoice) {
            var resetChangesFunction = tab.resetChanges;

            var renderTab = new coreshop.invoice.render(tab);

            tab.tabbar.add(renderTab.getLayout());

            tab.resetChanges = function () {
                resetChangesFunction.call(tab);

                renderTab.reload();
            };
        } else if (tab.data.general.o_className === coreshop.class_map.coreshop.order_shipment) {
            var resetChangesFunction = tab.resetChanges;

            var renderTab = new coreshop.shipment.render(tab);

            tab.tabbar.add(renderTab.getLayout());

            tab.resetChanges = function () {
                resetChangesFunction.call(tab);

                renderTab.reload();
            };
        }

        pimcore.layout.refresh();
    },

    openSettings: function () {
        try {
            pimcore.globalmanager.get('coreshop_settings').activate();
        }
        catch (e) {
            //console.log(e);
            pimcore.globalmanager.add('coreshop_settings', new coreshop.core.settings());
        }
    },

    openCurrencyList: function () {
        coreshop.global.resource.open('coreshop.currency', 'currency');
    },

    openExchangeRates: function () {
        coreshop.global.resource.open('coreshop.currency', 'exchange_rate');
    },

    openZoneList: function () {
        coreshop.global.resource.open('coreshop.address', 'zone');
    },

    openCountryList: function () {
        coreshop.global.resource.open('coreshop.address', 'country');
    },

    openStateList: function () {
        coreshop.global.resource.open('coreshop.address', 'state');
    },

    openCarriersList: function () {
        coreshop.global.resource.open('coreshop.shipping', 'carrier');
    },

    openCarriersShippingRules: function () {
        coreshop.global.resource.open('coreshop.shipping', 'shipping_rules');
    },

    openTaxes: function () {
        coreshop.global.resource.open('coreshop.taxation', 'tax_item');
    },

    openTaxRuleGroups: function () {
        coreshop.global.resource.open('coreshop.taxation', 'tax_rule_group');
    },

    openOrders: function () {
        coreshop.global.resource.open('coreshop.order', 'orders');
    },

    openCreateOrder: function () {
        coreshop.global.resource.open('coreshop.order', 'create_order');
    },

    openQuotes: function () {
        coreshop.global.resource.open('coreshop.order', 'quotes');
    },

    openCreateQuote: function () {
        coreshop.global.resource.open('coreshop.order', 'create_quote');
    },

    openPriceRules: function () {
        coreshop.global.resource.open('coreshop.order', 'cart_price_rule');
    },

    openIndexes: function () {
        coreshop.global.resource.open('coreshop.index', 'index');
    },

    openProductFilters: function () {
        coreshop.global.resource.open('coreshop.index', 'filter');
    },

    /*openMessagingContact: function () {
     try {
     pimcore.globalmanager.get('coreshop_messaging_contacts_panel').activate();
     }
     catch (e) {
     pimcore.globalmanager.add('coreshop_messaging_contacts_panel', new pimcore.plugin.coreshop.messaging.contact.panel());
     }
     },

     openMessagingThreadState: function () {
     try {
     pimcore.globalmanager.get('coreshop_messaging_thread_state_panel').activate();
     }
     catch (e) {
     pimcore.globalmanager.add('coreshop_messaging_thread_state_panel', new pimcore.plugin.coreshop.messaging.threadstate.panel());
     }
     },

     openMessagingThread: function () {
     try {
     pimcore.globalmanager.get('coreshop_messaging_thread_panel').activate();
     }
     catch (e) {
     pimcore.globalmanager.add('coreshop_messaging_thread_panel', new pimcore.plugin.coreshop.messaging.thread.panel());
     }
     },*/

    openProductPriceRules: function () {
        coreshop.global.resource.open('coreshop.product', 'product_price_rule');
    },

    openStores: function () {
        coreshop.global.resource.open('coreshop.store', 'store');
    },

    openNotificationRules: function () {
        coreshop.global.resource.open('coreshop.notification', 'notification_rule');
    },

    openPaymentProviders: function () {
        coreshop.global.resource.open('coreshop.payment', 'payment_provider');
    }
});

coreshop.broker.addListener('pimcore.ready', function() {
    new coreshop.core.resource();
});



