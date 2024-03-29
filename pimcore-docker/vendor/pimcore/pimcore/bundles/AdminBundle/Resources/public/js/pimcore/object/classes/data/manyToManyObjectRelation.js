/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Enterprise License (PEL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GPLv3 and PEL
 */

pimcore.registerNS("pimcore.object.classes.data.manyToManyObjectRelation");
pimcore.object.classes.data.manyToManyObjectRelation = Class.create(pimcore.object.classes.data.data, {

    type: "manyToManyObjectRelation",
    /**
     * define where this datatype is allowed
     */
    allowIn: {
        object: true,
        objectbrick: true,
        fieldcollection: true,
        localizedfield: true,
        classificationstore : false,
        block: true
    },

    initialize: function (treeNode, initData) {
        this.type = "manyToManyObjectRelation";

        this.initData(initData);

        if (typeof this.datax.lazyLoading == "undefined") {
            this.datax.lazyLoading = true;
        }

        pimcore.helpers.sanitizeAllowedTypes(this.datax, "classes");

        // overwrite default settings
        this.availableSettingsFields = ["name","title","tooltip","mandatory","noteditable","invisible",
            "visibleGridView","visibleSearch","style"];

        this.treeNode = treeNode;
    },

    getGroup: function () {
        return "relation";
    },

    getTypeName: function () {
        return t("many_to_many_object_relation");
    },

    getIconClass: function () {
        return "pimcore_icon_objects";
    },

    getLayout: function ($super) {

        $super();

        this.specificPanel.removeAll();

        this.uniqeFieldId = uniqid();

        this.specificPanel.add([
            {
                xtype: "numberfield",
                fieldLabel: t("width"),
                name: "width",
                value: this.datax.width
            },
            {
                xtype: "numberfield",
                fieldLabel: t("height"),
                name: "height",
                value: this.datax.height
            },{
                xtype: "numberfield",
                fieldLabel: t("maximum_items"),
                name: "maxItems",
                value: this.datax.maxItems,
                disabled: this.isInCustomLayoutEditor(),
                minValue: 0
            },
            {
                xtype: "checkbox",
                fieldLabel: t("lazy_loading"),
                name: "lazyLoading",
                checked: this.datax.lazyLoading && !this.lazyLoadingNotPossible(),
                disabled: this.isInCustomLayoutEditor() || this.lazyLoadingNotPossible()
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
                value: t('lazy_loading_warning_block'),
                cls: "pimcore_extra_label_bottom",
                style: "color:red; font-weight: bold;"
            },
            {
                xtype: 'textfield',
                width: 600,
                fieldLabel: t("path_formatter_class"),
                name: 'pathFormatterClass',
                value: this.datax.pathFormatterClass
            }
        ]);

        var classes = [];
        if(typeof this.datax.classes == "object") {
            // this is when it comes from the server
            for(var i=0; i<this.datax.classes.length; i++) {
                classes.push(this.datax.classes[i]);
            }
        } else if(typeof this.datax.classes == "string") {
            // this is when it comes from the local store
            classes = this.datax.classes.split(",");
        }

        var classesStore = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: '/admin/class/get-tree'
            },
            autoDestroy: true,
            fields: ["text"]
        });
        classesStore.load({
            "callback": function (classes, success) {
                if (success) {
                    Ext.getCmp('class_allowed_object_classes_' + this.uniqeFieldId).setValue(classes.join(","));
                }
            }.bind(this, classes)
        });


        this.specificPanel.add(new Ext.ux.form.MultiSelect({
            fieldLabel: t("allowed_classes"),
            id: "class_allowed_object_classes_" + this.uniqeFieldId,
            name: "classes",
            value: classes.join(","),
            displayField: "text",
            valueField: "text",
            store: classesStore,
            width: 600,
            disabled: this.isInCustomLayoutEditor(),
            listeners: {
                change: function(field, classNameValue, oldValue) {
                    this.datax.allowedClassId = classNameValue;
                    if (classNameValue != null) {
                        var submitValue = classNameValue.join(',');
                        this.fieldStore.load({params:{classes:submitValue}});
                    }
                }.bind(this)
            }
        }));

        this.fieldStore = new Ext.data.Store({
            proxy: {
                type: 'ajax',
                url: '/admin/object-helper/get-available-visible-vields',
                extraParams: {
                    // no_brick_columns: "true",
                    // gridtype: 'all',
                    classes: classes
                },
                reader: {
                    type: 'json',
                    rootProperty: "availableFields"
                }
            },
            fields: ['key', 'label'],
            autoLoad: false,
            forceSelection:true,
            listeners: {
                load: function() {
                    this.fieldSelect.setValue(this.datax.visibleFields);
                }.bind(this)

            }
        });
        this.fieldStore.load();

        this.fieldSelect = new Ext.ux.form.MultiSelect({
            name: "visibleFields",
            triggerAction: "all",
            editable: false,
            fieldLabel: t("objectsMetadata_visible_fields"),
            store: this.fieldStore,
            value: this.datax.visibleFields,
            displayField: "key",
            valueField: "key",
            width: 400,
            height: 300
        });
        this.specificPanel.add(this.fieldSelect);


        return this.layout;
    },

    applySpecialData: function(source) {
        if (source.datax) {
            if (!this.datax) {
                this.datax =  {};
            }
            Ext.apply(this.datax,
                {
                    width: source.datax.width,
                    height: source.datax.height,
                    maxItems: source.datax.maxItems,
                    relationType: source.datax.relationType,
                    remoteOwner: source.datax.remoteOwner,
                    lazyLoading: source.datax.lazyLoading,
                    classes: source.datax.classes
                });
        }
    }

});

// @TODO BC layer, to be removed in v6.0
pimcore.object.classes.data.objects = pimcore.object.classes.data.manyToManyObjectRelation;