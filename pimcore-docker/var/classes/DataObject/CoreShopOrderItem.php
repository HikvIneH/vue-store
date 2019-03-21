<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- localizedfields [localizedfields]
-- name [input]
- isGiftItem [checkbox]
- digitalProduct [checkbox]
- quantity [numeric]
- product [manyToOneRelation]
- objectId [numeric]
- mainObjectId [numeric]
- itemWeight [numeric]
- totalWeight [numeric]
- itemDiscountNet [coreShopMoney]
- itemDiscountGross [coreShopMoney]
- itemDiscountPriceNet [coreShopMoney]
- itemDiscountPriceGross [coreShopMoney]
- itemWholesalePrice [coreShopMoney]
- itemPriceNet [coreShopMoney]
- itemPriceGross [coreShopMoney]
- itemRetailPriceNet [coreShopMoney]
- itemRetailPriceGross [coreShopMoney]
- totalNet [coreShopMoney]
- totalGross [coreShopMoney]
- itemTax [coreShopMoney]
- taxes [fieldcollections]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
- baseItemPriceNet [coreShopMoney]
- baseItemPriceGross [coreShopMoney]
- baseItemRetailPriceNet [coreShopMoney]
- baseItemRetailPriceGross [coreShopMoney]
- baseTotalNet [coreShopMoney]
- baseTotalGross [coreShopMoney]
- baseItemTax [coreShopMoney]
- baseTaxes [fieldcollections]
- basePimcoreAdjustmentTotalNet [coreShopMoney]
- basePimcoreAdjustmentTotalGross [coreShopMoney]
- basePdjustmentItems [fieldcollections]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByIsGiftItem ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByDigitalProduct ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByQuantity ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByProduct ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByObjectId ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByMainObjectId ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemWeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByTotalWeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemDiscountNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemDiscountGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemDiscountPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemDiscountPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemWholesalePrice ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemRetailPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemRetailPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByItemTax ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByPimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByPimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByAdjustmentItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseItemPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseItemPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseItemRetailPriceNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseItemRetailPriceGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseItemTax ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBaseTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBasePimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBasePimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderItem\Listing getByBasePdjustmentItems ($value, $limit = 0) 
*/

class CoreShopOrderItem extends \CoreShop\Component\Core\Model\OrderItem implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "45";
protected $o_className = "CoreShopOrderItem";
protected $localizedfields;
protected $isGiftItem;
protected $digitalProduct;
protected $quantity;
protected $product;
protected $objectId;
protected $mainObjectId;
protected $itemWeight;
protected $totalWeight;
protected $itemDiscountNet;
protected $itemDiscountGross;
protected $itemDiscountPriceNet;
protected $itemDiscountPriceGross;
protected $itemWholesalePrice;
protected $itemPriceNet;
protected $itemPriceGross;
protected $itemRetailPriceNet;
protected $itemRetailPriceGross;
protected $totalNet;
protected $totalGross;
protected $itemTax;
protected $taxes;
protected $pimcoreAdjustmentTotalNet;
protected $pimcoreAdjustmentTotalGross;
protected $adjustmentItems;
protected $baseItemPriceNet;
protected $baseItemPriceGross;
protected $baseItemRetailPriceNet;
protected $baseItemRetailPriceGross;
protected $baseTotalNet;
protected $baseTotalGross;
protected $baseItemTax;
protected $baseTaxes;
protected $basePimcoreAdjustmentTotalNet;
protected $basePimcoreAdjustmentTotalGross;
protected $basePdjustmentItems;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get localizedfields - 
* @return \Pimcore\Model\DataObject\Localizedfield
*/
public function getLocalizedfields () {
	$preValue = $this->preGetValue("localizedfields"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("localizedfields")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Get name - Name
* @return string
*/
public function getName ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("name", $language);
	$preValue = $this->preGetValue("name"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set localizedfields - 
* @param \Pimcore\Model\DataObject\Localizedfield $localizedfields
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setLocalizedfields ($localizedfields) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields");
	$currentData = $this->getLocalizedfields();
	$isEqual = $fd->isEqual($currentData, $localizedfields);
	if (!$isEqual) {
		$this->markFieldDirty("localizedfields", true);
	}
	$this->localizedfields = $localizedfields;
	return $this;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setDigitalProduct ($digitalProduct) {
	$fd = $this->getClass()->getFieldDefinition("digitalProduct");
	$this->digitalProduct = $digitalProduct;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setQuantity ($quantity) {
	$fd = $this->getClass()->getFieldDefinition("quantity");
	$this->quantity = $quantity;
	return $this;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* Get objectId - Object Id
* @return float
*/
public function getObjectId () {
	$preValue = $this->preGetValue("objectId"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->objectId;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set objectId - Object Id
* @param float $objectId
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setObjectId ($objectId) {
	$fd = $this->getClass()->getFieldDefinition("objectId");
	$this->objectId = $objectId;
	return $this;
}

/**
* Get mainObjectId - Main Object Id
* @return float
*/
public function getMainObjectId () {
	$preValue = $this->preGetValue("mainObjectId"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->mainObjectId;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set mainObjectId - Main Object Id
* @param float $mainObjectId
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setMainObjectId ($mainObjectId) {
	$fd = $this->getClass()->getFieldDefinition("mainObjectId");
	$this->mainObjectId = $mainObjectId;
	return $this;
}

/**
* Get itemWeight - Item Weight
* @return float
*/
public function getItemWeight () {
	$preValue = $this->preGetValue("itemWeight"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->itemWeight;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set itemWeight - Item Weight
* @param float $itemWeight
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemWeight ($itemWeight) {
	$fd = $this->getClass()->getFieldDefinition("itemWeight");
	$this->itemWeight = $itemWeight;
	return $this;
}

/**
* Get totalWeight - Total Weight
* @return float
*/
public function getTotalWeight () {
	$preValue = $this->preGetValue("totalWeight"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->totalWeight;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set totalWeight - Total Weight
* @param float $totalWeight
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setTotalWeight ($totalWeight) {
	$fd = $this->getClass()->getFieldDefinition("totalWeight");
	$this->totalWeight = $totalWeight;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemDiscountPriceGross ($itemDiscountPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemDiscountPriceGross");
	$this->itemDiscountPriceGross = $itemDiscountPriceGross;
	return $this;
}

/**
* Get itemWholesalePrice - Item Wholesale Price
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
* Set itemWholesalePrice - Item Wholesale Price
* @param int $itemWholesalePrice
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemWholesalePrice ($itemWholesalePrice) {
	$fd = $this->getClass()->getFieldDefinition("itemWholesalePrice");
	$this->itemWholesalePrice = $itemWholesalePrice;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemPriceGross ($itemPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemPriceGross");
	$this->itemPriceGross = $itemPriceGross;
	return $this;
}

/**
* Get itemRetailPriceNet - Item Retail Price Net
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
* Set itemRetailPriceNet - Item Retail Price Net
* @param int $itemRetailPriceNet
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemRetailPriceNet ($itemRetailPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("itemRetailPriceNet");
	$this->itemRetailPriceNet = $itemRetailPriceNet;
	return $this;
}

/**
* Get itemRetailPriceGross - Item Retail Price Gross
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
* Set itemRetailPriceGross - Item Retail Price Gross
* @param int $itemRetailPriceGross
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setItemRetailPriceGross ($itemRetailPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("itemRetailPriceGross");
	$this->itemRetailPriceGross = $itemRetailPriceGross;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setTotalGross ($totalGross) {
	$fd = $this->getClass()->getFieldDefinition("totalGross");
	$this->totalGross = $totalGross;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setAdjustmentItems ($adjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("adjustmentItems");
	$this->adjustmentItems = $fd->preSetData($this, $adjustmentItems);
	return $this;
}

/**
* Get baseItemPriceNet - Base Item Price Net
* @return int
*/
public function getBaseItemPriceNet () {
	$preValue = $this->preGetValue("baseItemPriceNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseItemPriceNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseItemPriceNet - Base Item Price Net
* @param int $baseItemPriceNet
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseItemPriceNet ($baseItemPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("baseItemPriceNet");
	$this->baseItemPriceNet = $baseItemPriceNet;
	return $this;
}

/**
* Get baseItemPriceGross - Base Item Price Gross
* @return int
*/
public function getBaseItemPriceGross () {
	$preValue = $this->preGetValue("baseItemPriceGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseItemPriceGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseItemPriceGross - Base Item Price Gross
* @param int $baseItemPriceGross
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseItemPriceGross ($baseItemPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("baseItemPriceGross");
	$this->baseItemPriceGross = $baseItemPriceGross;
	return $this;
}

/**
* Get baseItemRetailPriceNet - Base Item Retail Price Net
* @return int
*/
public function getBaseItemRetailPriceNet () {
	$preValue = $this->preGetValue("baseItemRetailPriceNet"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseItemRetailPriceNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseItemRetailPriceNet - Base Item Retail Price Net
* @param int $baseItemRetailPriceNet
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseItemRetailPriceNet ($baseItemRetailPriceNet) {
	$fd = $this->getClass()->getFieldDefinition("baseItemRetailPriceNet");
	$this->baseItemRetailPriceNet = $baseItemRetailPriceNet;
	return $this;
}

/**
* Get baseItemRetailPriceGross - Base Item Retail Price Gross
* @return int
*/
public function getBaseItemRetailPriceGross () {
	$preValue = $this->preGetValue("baseItemRetailPriceGross"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseItemRetailPriceGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseItemRetailPriceGross - Base Item Retail Price Gross
* @param int $baseItemRetailPriceGross
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseItemRetailPriceGross ($baseItemRetailPriceGross) {
	$fd = $this->getClass()->getFieldDefinition("baseItemRetailPriceGross");
	$this->baseItemRetailPriceGross = $baseItemRetailPriceGross;
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
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
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseTotalGross ($baseTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("baseTotalGross");
	$this->baseTotalGross = $baseTotalGross;
	return $this;
}

/**
* Get baseItemTax - Base Item Tax
* @return int
*/
public function getBaseItemTax () {
	$preValue = $this->preGetValue("baseItemTax"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->baseItemTax;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseItemTax - Base Item Tax
* @param int $baseItemTax
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseItemTax ($baseItemTax) {
	$fd = $this->getClass()->getFieldDefinition("baseItemTax");
	$this->baseItemTax = $baseItemTax;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getBaseTaxes () {
	$preValue = $this->preGetValue("baseTaxes"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("baseTaxes")->preGetData($this);
	 return $data;
}

/**
* Set baseTaxes - Base Taxes
* @param \Pimcore\Model\DataObject\Fieldcollection $baseTaxes
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBaseTaxes ($baseTaxes) {
	$fd = $this->getClass()->getFieldDefinition("baseTaxes");
	$this->baseTaxes = $fd->preSetData($this, $baseTaxes);
	return $this;
}

/**
* Get basePimcoreAdjustmentTotalNet - Adjustments Total Net
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
* Set basePimcoreAdjustmentTotalNet - Adjustments Total Net
* @param int $basePimcoreAdjustmentTotalNet
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBasePimcoreAdjustmentTotalNet ($basePimcoreAdjustmentTotalNet) {
	$fd = $this->getClass()->getFieldDefinition("basePimcoreAdjustmentTotalNet");
	$this->basePimcoreAdjustmentTotalNet = $basePimcoreAdjustmentTotalNet;
	return $this;
}

/**
* Get basePimcoreAdjustmentTotalGross - Adjustments Total Gross
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
* Set basePimcoreAdjustmentTotalGross - Adjustments Total Gross
* @param int $basePimcoreAdjustmentTotalGross
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBasePimcoreAdjustmentTotalGross ($basePimcoreAdjustmentTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("basePimcoreAdjustmentTotalGross");
	$this->basePimcoreAdjustmentTotalGross = $basePimcoreAdjustmentTotalGross;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getBasePdjustmentItems () {
	$preValue = $this->preGetValue("basePdjustmentItems"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("basePdjustmentItems")->preGetData($this);
	 return $data;
}

/**
* Set basePdjustmentItems - Adjustments
* @param \Pimcore\Model\DataObject\Fieldcollection $basePdjustmentItems
* @return \Pimcore\Model\DataObject\CoreShopOrderItem
*/
public function setBasePdjustmentItems ($basePdjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("basePdjustmentItems");
	$this->basePdjustmentItems = $fd->preSetData($this, $basePdjustmentItems);
	return $this;
}

protected static $_relationFields = array (
  'product' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'product',
  1 => 'taxes',
  2 => 'adjustmentItems',
  3 => 'baseTaxes',
  4 => 'basePdjustmentItems',
);

}

