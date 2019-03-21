<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- order [manyToOneRelation]
- invoiceDate [date]
- invoiceNumber [input]
- state [input]
- totalNet [coreShopMoney]
- totalGross [coreShopMoney]
- subtotalNet [coreShopMoney]
- subtotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- baseTotalNet [coreShopMoney]
- baseTotalGross [coreShopMoney]
- baseSubtotalNet [coreShopMoney]
- baseSubtotalGross [coreShopMoney]
- baseAdjustmentItems [fieldcollections]
- basePimcoreAdjustmentTotalGross [coreShopMoney]
- basePimcoreAdjustmentTotalNet [coreShopMoney]
- items [manyToManyRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByOrder ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByInvoiceDate ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByInvoiceNumber ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByState ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getBySubtotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getBySubtotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByAdjustmentItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByPimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByPimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBaseTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBaseTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBaseSubtotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBaseSubtotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBaseAdjustmentItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBasePimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByBasePimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoice\Listing getByItems ($value, $limit = 0) 
*/

class CoreShopOrderInvoice extends \CoreShop\Component\Order\Model\OrderInvoice implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "49";
protected $o_className = "CoreShopOrderInvoice";
protected $order;
protected $invoiceDate;
protected $invoiceNumber;
protected $state;
protected $totalNet;
protected $totalGross;
protected $subtotalNet;
protected $subtotalGross;
protected $adjustmentItems;
protected $pimcoreAdjustmentTotalGross;
protected $pimcoreAdjustmentTotalNet;
protected $baseTotalNet;
protected $baseTotalGross;
protected $baseSubtotalNet;
protected $baseSubtotalGross;
protected $baseAdjustmentItems;
protected $basePimcoreAdjustmentTotalGross;
protected $basePimcoreAdjustmentTotalNet;
protected $items;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get order - Order
* @return \Pimcore\Model\DataObject\CoreShopOrder
*/
public function getOrder () {
	$preValue = $this->preGetValue("order"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("order")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set order - Order
* @param \Pimcore\Model\DataObject\CoreShopOrder $order
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setOrder ($order) {
	$fd = $this->getClass()->getFieldDefinition("order");
	$currentData = $this->getOrder();
	$isEqual = $fd->isEqual($currentData, $order);
	if (!$isEqual) {
		$this->markFieldDirty("order", true);
	}
	$this->order = $fd->preSetData($this, $order);
	return $this;
}

/**
* Get invoiceDate - Invoice Date
* @return \Carbon\Carbon
*/
public function getInvoiceDate () {
	$preValue = $this->preGetValue("invoiceDate"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->invoiceDate;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set invoiceDate - Invoice Date
* @param \Carbon\Carbon $invoiceDate
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setInvoiceDate ($invoiceDate) {
	$fd = $this->getClass()->getFieldDefinition("invoiceDate");
	$this->invoiceDate = $invoiceDate;
	return $this;
}

/**
* Get invoiceNumber - Invoice Number
* @return string
*/
public function getInvoiceNumber () {
	$preValue = $this->preGetValue("invoiceNumber"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->invoiceNumber;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set invoiceNumber - Invoice Number
* @param string $invoiceNumber
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setInvoiceNumber ($invoiceNumber) {
	$fd = $this->getClass()->getFieldDefinition("invoiceNumber");
	$this->invoiceNumber = $invoiceNumber;
	return $this;
}

/**
* Get state - State
* @return string
*/
public function getState () {
	$preValue = $this->preGetValue("state"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->state;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set state - State
* @param string $state
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setState ($state) {
	$fd = $this->getClass()->getFieldDefinition("state");
	$this->state = $state;
	return $this;
}

/**
* Get totalNet - Total Net
* @return int
*/
public function getTotalNet () {
	$preValue = $this->preGetValue("totalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->totalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set totalNet - Total Net
* @param int $totalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setTotalNet ($totalNet) {
	$fd = $this->getClass()->getFieldDefinition("totalNet");
	$this->totalNet = $totalNet;
	return $this;
}

/**
* Get totalGross - Total Gross
* @return int
*/
public function getTotalGross () {
	$preValue = $this->preGetValue("totalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->totalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set totalGross - Total Gross
* @param int $totalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setTotalGross ($totalGross) {
	$fd = $this->getClass()->getFieldDefinition("totalGross");
	$this->totalGross = $totalGross;
	return $this;
}

/**
* Get subtotalNet - Subtotal Net
* @return int
*/
public function getSubtotalNet () {
	$preValue = $this->preGetValue("subtotalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->subtotalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set subtotalNet - Subtotal Net
* @param int $subtotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setSubtotalNet ($subtotalNet) {
	$fd = $this->getClass()->getFieldDefinition("subtotalNet");
	$this->subtotalNet = $subtotalNet;
	return $this;
}

/**
* Get subtotalGross - Subtotal Gross
* @return int
*/
public function getSubtotalGross () {
	$preValue = $this->preGetValue("subtotalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->subtotalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set subtotalGross - Subtotal Gross
* @param int $subtotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setSubtotalGross ($subtotalGross) {
	$fd = $this->getClass()->getFieldDefinition("subtotalGross");
	$this->subtotalGross = $subtotalGross;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getAdjustmentItems () {
	$preValue = $this->preGetValue("adjustmentItems"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("adjustmentItems")->preGetData($this);
	 return $data;
}

/**
* Set adjustmentItems - Adjustment Items
* @param \Pimcore\Model\DataObject\Fieldcollection $adjustmentItems
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setAdjustmentItems ($adjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("adjustmentItems");
	$this->adjustmentItems = $fd->preSetData($this, $adjustmentItems);
	return $this;
}

/**
* Get pimcoreAdjustmentTotalGross - Adjustments Total Gross
* @return int
*/
public function getPimcoreAdjustmentTotalGross () {
	$preValue = $this->preGetValue("pimcoreAdjustmentTotalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->pimcoreAdjustmentTotalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set pimcoreAdjustmentTotalGross - Adjustments Total Gross
* @param int $pimcoreAdjustmentTotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setPimcoreAdjustmentTotalGross ($pimcoreAdjustmentTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("pimcoreAdjustmentTotalGross");
	$this->pimcoreAdjustmentTotalGross = $pimcoreAdjustmentTotalGross;
	return $this;
}

/**
* Get pimcoreAdjustmentTotalNet - Adjustments Total Net
* @return int
*/
public function getPimcoreAdjustmentTotalNet () {
	$preValue = $this->preGetValue("pimcoreAdjustmentTotalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->pimcoreAdjustmentTotalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set pimcoreAdjustmentTotalNet - Adjustments Total Net
* @param int $pimcoreAdjustmentTotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setPimcoreAdjustmentTotalNet ($pimcoreAdjustmentTotalNet) {
	$fd = $this->getClass()->getFieldDefinition("pimcoreAdjustmentTotalNet");
	$this->pimcoreAdjustmentTotalNet = $pimcoreAdjustmentTotalNet;
	return $this;
}

/**
* Get baseTotalNet - Base Total Net
* @return int
*/
public function getBaseTotalNet () {
	$preValue = $this->preGetValue("baseTotalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseTotalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseTotalNet - Base Total Net
* @param int $baseTotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBaseTotalNet ($baseTotalNet) {
	$fd = $this->getClass()->getFieldDefinition("baseTotalNet");
	$this->baseTotalNet = $baseTotalNet;
	return $this;
}

/**
* Get baseTotalGross - Base Total Gross
* @return int
*/
public function getBaseTotalGross () {
	$preValue = $this->preGetValue("baseTotalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseTotalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseTotalGross - Base Total Gross
* @param int $baseTotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBaseTotalGross ($baseTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("baseTotalGross");
	$this->baseTotalGross = $baseTotalGross;
	return $this;
}

/**
* Get baseSubtotalNet - Base Subtotal Net
* @return int
*/
public function getBaseSubtotalNet () {
	$preValue = $this->preGetValue("baseSubtotalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseSubtotalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseSubtotalNet - Base Subtotal Net
* @param int $baseSubtotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBaseSubtotalNet ($baseSubtotalNet) {
	$fd = $this->getClass()->getFieldDefinition("baseSubtotalNet");
	$this->baseSubtotalNet = $baseSubtotalNet;
	return $this;
}

/**
* Get baseSubtotalGross - Base Subtotal Gross
* @return int
*/
public function getBaseSubtotalGross () {
	$preValue = $this->preGetValue("baseSubtotalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseSubtotalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseSubtotalGross - Base Subtotal Gross
* @param int $baseSubtotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBaseSubtotalGross ($baseSubtotalGross) {
	$fd = $this->getClass()->getFieldDefinition("baseSubtotalGross");
	$this->baseSubtotalGross = $baseSubtotalGross;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getBaseAdjustmentItems () {
	$preValue = $this->preGetValue("baseAdjustmentItems"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("baseAdjustmentItems")->preGetData($this);
	 return $data;
}

/**
* Set baseAdjustmentItems - Base Adjustment Items
* @param \Pimcore\Model\DataObject\Fieldcollection $baseAdjustmentItems
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBaseAdjustmentItems ($baseAdjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("baseAdjustmentItems");
	$this->baseAdjustmentItems = $fd->preSetData($this, $baseAdjustmentItems);
	return $this;
}

/**
* Get basePimcoreAdjustmentTotalGross - Base Adjustments Total Gross
* @return int
*/
public function getBasePimcoreAdjustmentTotalGross () {
	$preValue = $this->preGetValue("basePimcoreAdjustmentTotalGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->basePimcoreAdjustmentTotalGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set basePimcoreAdjustmentTotalGross - Base Adjustments Total Gross
* @param int $basePimcoreAdjustmentTotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBasePimcoreAdjustmentTotalGross ($basePimcoreAdjustmentTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("basePimcoreAdjustmentTotalGross");
	$this->basePimcoreAdjustmentTotalGross = $basePimcoreAdjustmentTotalGross;
	return $this;
}

/**
* Get basePimcoreAdjustmentTotalNet - Base Adjustments Total Net
* @return int
*/
public function getBasePimcoreAdjustmentTotalNet () {
	$preValue = $this->preGetValue("basePimcoreAdjustmentTotalNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->basePimcoreAdjustmentTotalNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set basePimcoreAdjustmentTotalNet - Base Adjustments Total Net
* @param int $basePimcoreAdjustmentTotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setBasePimcoreAdjustmentTotalNet ($basePimcoreAdjustmentTotalNet) {
	$fd = $this->getClass()->getFieldDefinition("basePimcoreAdjustmentTotalNet");
	$this->basePimcoreAdjustmentTotalNet = $basePimcoreAdjustmentTotalNet;
	return $this;
}

/**
* Get items - Items
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem[]
*/
public function getItems () {
	$preValue = $this->preGetValue("items"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("items")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set items - Items
* @param \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem[] $items
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoice
*/
public function setItems ($items) {
	$fd = $this->getClass()->getFieldDefinition("items");
	$currentData = $this->getItems();
	$isEqual = $fd->isEqual($currentData, $items);
	if (!$isEqual) {
		$this->markFieldDirty("items", true);
	}
	$this->items = $fd->preSetData($this, $items);
	return $this;
}

protected static $_relationFields = array (
  'order' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'items' => 
  array (
    'type' => 'manyToManyRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'order',
  1 => 'adjustmentItems',
  2 => 'baseAdjustmentItems',
  3 => 'items',
);

}

