<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- orderItem [manyToOneRelation]
- quantity [numeric]
- totalNet [coreShopMoney]
- totalGross [coreShopMoney]
- baseTotalNet [coreShopMoney]
- baseTotalGross [coreShopMoney]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByOrderItem ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByQuantity ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByBaseTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem\Listing getByBaseTotalGross ($value, $limit = 0) 
*/

class CoreShopOrderInvoiceItem extends \CoreShop\Component\Order\Model\OrderInvoiceItem implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "50";
protected $o_className = "CoreShopOrderInvoiceItem";
protected $orderItem;
protected $quantity;
protected $totalNet;
protected $totalGross;
protected $baseTotalNet;
protected $baseTotalGross;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get orderItem - Order Item
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function getOrderItem () {
	$preValue = $this->preGetValue("orderItem"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("orderItem")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set orderItem - Order Item
* @param \Pimcore\Model\DataObject\CoreShopOrderItem $orderItem
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
*/
public function setOrderItem ($orderItem) {
	$fd = $this->getClass()->getFieldDefinition("orderItem");
	$currentData = $this->getOrderItem();
	$isEqual = $fd->isEqual($currentData, $orderItem);
	if (!$isEqual) {
		$this->markFieldDirty("orderItem", true);
	}
	$this->orderItem = $fd->preSetData($this, $orderItem);
	return $this;
}

/**
* Get quantity - Quantity
* @return float
*/
public function getQuantity () {
	$preValue = $this->preGetValue("quantity"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->quantity;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set quantity - Quantity
* @param float $quantity
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
*/
public function setQuantity ($quantity) {
	$fd = $this->getClass()->getFieldDefinition("quantity");
	$this->quantity = $quantity;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
*/
public function setTotalGross ($totalGross) {
	$fd = $this->getClass()->getFieldDefinition("totalGross");
	$this->totalGross = $totalGross;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderInvoiceItem
*/
public function setBaseTotalGross ($baseTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("baseTotalGross");
	$this->baseTotalGross = $baseTotalGross;
	return $this;
}

protected static $_relationFields = array (
  'orderItem' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'orderItem',
);

}

