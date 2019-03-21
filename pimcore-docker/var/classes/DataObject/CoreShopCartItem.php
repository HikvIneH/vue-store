<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- product [manyToOneRelation]
- quantity [numeric]
- isGiftItem [checkbox]
- digitalProduct [checkbox]
- totalGross [coreShopMoney]
- totalNet [coreShopMoney]
- itemPriceNet [coreShopMoney]
- itemPriceGross [coreShopMoney]
- itemRetailPriceNet [coreShopMoney]
- itemRetailPriceGross [coreShopMoney]
- itemDiscountNet [coreShopMoney]
- itemDiscountGross [coreShopMoney]
- itemDiscountPriceNet [coreShopMoney]
- itemDiscountPriceGross [coreShopMoney]
- itemWholesalePrice [coreShopMoney]
- itemTax [coreShopMoney]
- taxes [fieldcollections]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByProduct ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByQuantity ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByIsGiftItem ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByDigitalProduct ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemRetailPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemRetailPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemDiscountNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemDiscountGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemDiscountPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemDiscountPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemWholesalePrice ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByItemTax ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByPimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByPimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCartItem\Listing getByAdjustmentItems ($value, $limit = 0) 
*/

class CoreShopCartItem extends \CoreShop\Component\Core\Model\CartItem implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "43";
protected $o_className = "CoreShopCartItem";
protected $product;
protected $quantity;
protected $isGiftItem;
protected $digitalProduct;
protected $totalGross;
protected $totalNet;
protected $itemPriceNet;
protected $itemPriceGross;
protected $itemRetailPriceNet;
protected $itemRetailPriceGross;
protected $itemDiscountNet;
protected $itemDiscountGross;
protected $itemDiscountPriceNet;
protected $itemDiscountPriceGross;
protected $itemWholesalePrice;
protected $itemTax;
protected $taxes;
protected $pimcoreAdjustmentTotalNet;
protected $pimcoreAdjustmentTotalGross;
protected $adjustmentItems;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get product - Product
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function getProduct () {
	$preValue = $this->preGetValue("product"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("product")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set product - Product
* @param \Pimcore\Model\DataObject\CoreShopProduct $product
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setProduct ($product) {
	$fd = $this->getClass()->getFieldDefinition("product");
	$currentData = $this->getProduct();
	$isEqual = $fd->isEqual($currentData, $product);
	if (!$isEqual) {
		$this->markFieldDirty("product", true);
	}
	$this->product = $fd->preSetData($this, $product);
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
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setQuantity ($quantity) {
	$fd = $this->getClass()->getFieldDefinition("quantity");
	$this->quantity = $quantity;
	return $this;
}

/**
* Get isGiftItem - Is Gift Item
* @return boolean
*/
public function getIsGiftItem () {
	$preValue = $this->preGetValue("isGiftItem"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->isGiftItem;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set isGiftItem - Is Gift Item
* @param boolean $isGiftItem
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setIsGiftItem ($isGiftItem) {
	$fd = $this->getClass()->getFieldDefinition("isGiftItem");
	$this->isGiftItem = $isGiftItem;
	return $this;
}

/**
* Get digitalProduct - Digital Product
* @return boolean
*/
public function getDigitalProduct () {
	$preValue = $this->preGetValue("digitalProduct"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->digitalProduct;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set digitalProduct - Digital Product
* @param boolean $digitalProduct
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setDigitalProduct ($digitalProduct) {
	$fd = $this->getClass()->getFieldDefinition("digitalProduct");
	$this->digitalProduct = $digitalProduct;
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
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setTotalGross ($totalGross) {
	$fd = $this->getClass()->getFieldDefinition("totalGross");
	$this->totalGross = $totalGross;
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
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setTotalNet ($totalNet) {
	$fd = $this->getClass()->getFieldDefinition("totalNet");
	$this->totalNet = $totalNet;
	return $this;
}

/**
* Get itemPriceNet - Item Price Net
* @return int
*/
public function getItemPriceNet () {
	$preValue = $this->preGetValue("itemPriceNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemPriceNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemPriceNet - Item Price Net
* @param int $itemPriceNet
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemPriceNet ($itemPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("itemPriceNet");
	$this->itemPriceNet = $itemPriceNet;
	return $this;
}

/**
* Get itemPriceGross - Item Price Gross
* @return int
*/
public function getItemPriceGross () {
	$preValue = $this->preGetValue("itemPriceGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemPriceGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemPriceGross - Item Price Gross
* @param int $itemPriceGross
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemPriceGross ($itemPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemPriceGross");
	$this->itemPriceGross = $itemPriceGross;
	return $this;
}

/**
* Get itemRetailPriceNet - Retail Price Net
* @return int
*/
public function getItemRetailPriceNet () {
	$preValue = $this->preGetValue("itemRetailPriceNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemRetailPriceNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemRetailPriceNet - Retail Price Net
* @param int $itemRetailPriceNet
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemRetailPriceNet ($itemRetailPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("itemRetailPriceNet");
	$this->itemRetailPriceNet = $itemRetailPriceNet;
	return $this;
}

/**
* Get itemRetailPriceGross - Retail Price Gross
* @return int
*/
public function getItemRetailPriceGross () {
	$preValue = $this->preGetValue("itemRetailPriceGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemRetailPriceGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemRetailPriceGross - Retail Price Gross
* @param int $itemRetailPriceGross
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemRetailPriceGross ($itemRetailPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemRetailPriceGross");
	$this->itemRetailPriceGross = $itemRetailPriceGross;
	return $this;
}

/**
* Get itemDiscountNet - Item Discount Price Net
* @return int
*/
public function getItemDiscountNet () {
	$preValue = $this->preGetValue("itemDiscountNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemDiscountNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemDiscountNet - Item Discount Price Net
* @param int $itemDiscountNet
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemDiscountNet ($itemDiscountNet) {
	$fd = $this->getClass()->getFieldDefinition("itemDiscountNet");
	$this->itemDiscountNet = $itemDiscountNet;
	return $this;
}

/**
* Get itemDiscountGross - Item Discount Price Gross
* @return int
*/
public function getItemDiscountGross () {
	$preValue = $this->preGetValue("itemDiscountGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemDiscountGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemDiscountGross - Item Discount Price Gross
* @param int $itemDiscountGross
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemDiscountGross ($itemDiscountGross) {
	$fd = $this->getClass()->getFieldDefinition("itemDiscountGross");
	$this->itemDiscountGross = $itemDiscountGross;
	return $this;
}

/**
* Get itemDiscountPriceNet - Item Discount Price Net
* @return int
*/
public function getItemDiscountPriceNet () {
	$preValue = $this->preGetValue("itemDiscountPriceNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemDiscountPriceNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemDiscountPriceNet - Item Discount Price Net
* @param int $itemDiscountPriceNet
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemDiscountPriceNet ($itemDiscountPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("itemDiscountPriceNet");
	$this->itemDiscountPriceNet = $itemDiscountPriceNet;
	return $this;
}

/**
* Get itemDiscountPriceGross - Item Discount Price Gross
* @return int
*/
public function getItemDiscountPriceGross () {
	$preValue = $this->preGetValue("itemDiscountPriceGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemDiscountPriceGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemDiscountPriceGross - Item Discount Price Gross
* @param int $itemDiscountPriceGross
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemDiscountPriceGross ($itemDiscountPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemDiscountPriceGross");
	$this->itemDiscountPriceGross = $itemDiscountPriceGross;
	return $this;
}

/**
* Get itemWholesalePrice - Wholesale Price
* @return int
*/
public function getItemWholesalePrice () {
	$preValue = $this->preGetValue("itemWholesalePrice"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemWholesalePrice;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemWholesalePrice - Wholesale Price
* @param int $itemWholesalePrice
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemWholesalePrice ($itemWholesalePrice) {
	$fd = $this->getClass()->getFieldDefinition("itemWholesalePrice");
	$this->itemWholesalePrice = $itemWholesalePrice;
	return $this;
}

/**
* Get itemTax - Item Tax
* @return int
*/
public function getItemTax () {
	$preValue = $this->preGetValue("itemTax"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemTax;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemTax - Item Tax
* @param int $itemTax
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setItemTax ($itemTax) {
	$fd = $this->getClass()->getFieldDefinition("itemTax");
	$this->itemTax = $itemTax;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getTaxes () {
	$preValue = $this->preGetValue("taxes"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("taxes")->preGetData($this);
	 return $data;
}

/**
* Set taxes - Taxes
* @param \Pimcore\Model\DataObject\Fieldcollection $taxes
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setTaxes ($taxes) {
	$fd = $this->getClass()->getFieldDefinition("taxes");
	$this->taxes = $fd->preSetData($this, $taxes);
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
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setPimcoreAdjustmentTotalNet ($pimcoreAdjustmentTotalNet) {
	$fd = $this->getClass()->getFieldDefinition("pimcoreAdjustmentTotalNet");
	$this->pimcoreAdjustmentTotalNet = $pimcoreAdjustmentTotalNet;
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
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setPimcoreAdjustmentTotalGross ($pimcoreAdjustmentTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("pimcoreAdjustmentTotalGross");
	$this->pimcoreAdjustmentTotalGross = $pimcoreAdjustmentTotalGross;
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
* Set adjustmentItems - Adjustments
* @param \Pimcore\Model\DataObject\Fieldcollection $adjustmentItems
* @return \Pimcore\Model\DataObject\CoreShopCartItem
*/
public function setAdjustmentItems ($adjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("adjustmentItems");
	$this->adjustmentItems = $fd->preSetData($this, $adjustmentItems);
	return $this;
}

protected static $_relationFields = array (
  'product' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'taxes',
  1 => 'adjustmentItems',
);

}

