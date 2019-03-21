<?php 

/** 
* Generated at: 2019-03-21T10:28:32+01:00


Fields Summary: 
 - cartPriceRule [coreShopCartPriceRule]
 - voucherCode [input]
 - discountNet [coreShopMoney]
 - discountGross [coreShopMoney]
*/ 


return Pimcore\Model\DataObject\Fieldcollection\Definition::__set_state(array(
   'key' => 'CoreShopProposalCartPriceRuleItem',
   'parentClass' => 'CoreShop\\Component\\Order\\Model\\ProposalCartPriceRuleItem',
   'title' => NULL,
   'group' => NULL,
   'layoutDefinitions' => 
  Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
     'fieldtype' => 'panel',
     'labelWidth' => 100,
     'layout' => NULL,
     'name' => NULL,
     'type' => NULL,
     'region' => NULL,
     'title' => NULL,
     'width' => NULL,
     'height' => NULL,
     'collapsible' => false,
     'collapsed' => false,
     'bodyStyle' => NULL,
     'datatype' => 'layout',
     'permissions' => NULL,
     'childs' => 
    array (
      0 => 
      Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
         'fieldtype' => 'panel',
         'labelWidth' => 100,
         'layout' => NULL,
         'name' => 'Layout',
         'type' => NULL,
         'region' => NULL,
         'title' => NULL,
         'width' => NULL,
         'height' => NULL,
         'collapsible' => false,
         'collapsed' => false,
         'bodyStyle' => NULL,
         'datatype' => 'layout',
         'permissions' => NULL,
         'childs' => 
        array (
          0 => 
          CoreShop\Bundle\OrderBundle\CoreExtension\CartPriceRule::__set_state(array(
             'fieldtype' => 'coreShopCartPriceRule',
             'phpdocType' => 'CoreShop\\Component\\Order\\Model\\CartPriceRule',
             'allowEmpty' => false,
             'options' => NULL,
             'width' => '',
             'defaultValue' => NULL,
             'optionsProviderClass' => NULL,
             'optionsProviderData' => NULL,
             'queryColumnType' => 'varchar',
             'columnType' => 'varchar',
             'columnLength' => 190,
             'name' => 'cartPriceRule',
             'title' => 'Price Rule',
             'tooltip' => '',
             'mandatory' => false,
             'noteditable' => false,
             'index' => false,
             'locked' => false,
             'style' => '',
             'permissions' => NULL,
             'datatype' => 'data',
             'relationType' => false,
             'invisible' => false,
             'visibleGridView' => false,
             'visibleSearch' => false,
          )),
          1 => 
          Pimcore\Model\DataObject\ClassDefinition\Data\Input::__set_state(array(
             'fieldtype' => 'input',
             'width' => NULL,
             'queryColumnType' => 'varchar',
             'columnType' => 'varchar',
             'columnLength' => 190,
             'phpdocType' => 'string',
             'regex' => '',
             'unique' => NULL,
             'showCharCount' => NULL,
             'name' => 'voucherCode',
             'title' => 'voucherCode',
             'tooltip' => '',
             'mandatory' => false,
             'noteditable' => false,
             'index' => false,
             'locked' => false,
             'style' => '',
             'permissions' => NULL,
             'datatype' => 'data',
             'relationType' => false,
             'invisible' => false,
             'visibleGridView' => false,
             'visibleSearch' => false,
          )),
          2 => 
          CoreShop\Bundle\MoneyBundle\CoreExtension\Money::__set_state(array(
             'fieldtype' => 'coreShopMoney',
             'width' => '',
             'defaultValue' => NULL,
             'phpdocType' => 'int',
             'minValue' => NULL,
             'maxValue' => NULL,
             'name' => 'discountNet',
             'title' => 'Discount Net',
             'tooltip' => '',
             'mandatory' => false,
             'noteditable' => false,
             'index' => false,
             'locked' => false,
             'style' => '',
             'permissions' => NULL,
             'datatype' => 'data',
             'relationType' => false,
             'invisible' => false,
             'visibleGridView' => false,
             'visibleSearch' => false,
          )),
          3 => 
          CoreShop\Bundle\MoneyBundle\CoreExtension\Money::__set_state(array(
             'fieldtype' => 'coreShopMoney',
             'width' => '',
             'defaultValue' => NULL,
             'phpdocType' => 'int',
             'minValue' => NULL,
             'maxValue' => NULL,
             'name' => 'discountGross',
             'title' => 'Discount Gross',
             'tooltip' => '',
             'mandatory' => false,
             'noteditable' => false,
             'index' => false,
             'locked' => false,
             'style' => '',
             'permissions' => NULL,
             'datatype' => 'data',
             'relationType' => false,
             'invisible' => false,
             'visibleGridView' => false,
             'visibleSearch' => false,
          )),
        ),
         'locked' => false,
      )),
    ),
     'locked' => false,
  )),
   'dao' => NULL,
));
