<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- localizedfields [localizedfields]
-- name [input]
-- shortDescription [textarea]
-- pimcoreMetaTitle [input]
-- pimcoreMetaDescription [textarea]
-- description [wysiwyg]
- sku [input]
- ean [input]
- active [checkbox]
- digitalProduct [booleanSelect]
- manufacturer [manyToOneRelation]
- stores [coreShopStoreMultiselect]
- categories [manyToManyRelation]
- images [manyToManyRelation]
- onHold [numeric]
- onHand [numeric]
- isTracked [booleanSelect]
- storePrice [coreShopStorePrice]
- wholesalePrice [coreShopMoney]
- taxRule [coreShopTaxRuleGroup]
- specificPriceRules [coreShopProductSpecificPriceRules]
- weight [numeric]
- height [numeric]
- width [numeric]
- depth [numeric]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getBySku ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByEan ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByActive ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByDigitalProduct ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByManufacturer ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByStores ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByCategories ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByImages ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByOnHold ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByOnHand ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByIsTracked ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByStorePrice ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByWholesalePrice ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByTaxRule ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getBySpecificPriceRules ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByWeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByHeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByWidth ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopProduct\Listing getByDepth ($value, $limit = 0) 
*/

class CoreShopProduct extends \CoreShop\Component\Core\Model\Product implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "55";
protected $o_className = "CoreShopProduct";
protected $localizedfields;
protected $sku;
protected $ean;
protected $active;
protected $digitalProduct;
protected $manufacturer;
protected $stores;
protected $categories;
protected $images;
protected $onHold;
protected $onHand;
protected $isTracked;
protected $storePrice;
protected $wholesalePrice;
protected $taxRule;
protected $specificPriceRules;
protected $weight;
protected $height;
protected $width;
protected $depth;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopProduct
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
* Get shortDescription - Short Description
* @return string
*/
public function getShortDescription ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("shortDescription", $language);
	$preValue = $this->preGetValue("shortDescription"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get pimcoreMetaTitle - Meta Title
* @return string
*/
public function getPimcoreMetaTitle ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("pimcoreMetaTitle", $language);
	$preValue = $this->preGetValue("pimcoreMetaTitle"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get pimcoreMetaDescription - Meta Description
* @return string
*/
public function getPimcoreMetaDescription ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("pimcoreMetaDescription", $language);
	$preValue = $this->preGetValue("pimcoreMetaDescription"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get description - Description
* @return string
*/
public function getDescription ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("description", $language);
	$preValue = $this->preGetValue("description"); 
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
* @return \Pimcore\Model\DataObject\CoreShopProduct
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
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set shortDescription - Short Description
* @param string $shortDescription
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setShortDescription ($shortDescription, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("shortDescription", $shortDescription, $language, !$isEqual);
	return $this;
}

/**
* Set pimcoreMetaTitle - Meta Title
* @param string $pimcoreMetaTitle
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setPimcoreMetaTitle ($pimcoreMetaTitle, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("pimcoreMetaTitle", $pimcoreMetaTitle, $language, !$isEqual);
	return $this;
}

/**
* Set pimcoreMetaDescription - Meta Description
* @param string $pimcoreMetaDescription
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setPimcoreMetaDescription ($pimcoreMetaDescription, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("pimcoreMetaDescription", $pimcoreMetaDescription, $language, !$isEqual);
	return $this;
}

/**
* Set description - Description
* @param string $description
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setDescription ($description, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("description", $description, $language, !$isEqual);
	return $this;
}

/**
* Get sku - SKU
* @return string
*/
public function getSku () {
	$preValue = $this->preGetValue("sku"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->sku;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set sku - SKU
* @param string $sku
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setSku ($sku) {
	$fd = $this->getClass()->getFieldDefinition("sku");
	$this->sku = $sku;
	return $this;
}

/**
* Get ean - EAN
* @return string
*/
public function getEan () {
	$preValue = $this->preGetValue("ean"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->ean;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set ean - EAN
* @param string $ean
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setEan ($ean) {
	$fd = $this->getClass()->getFieldDefinition("ean");
	$this->ean = $ean;
	return $this;
}

/**
* Get active - Active
* @return boolean
*/
public function getActive () {
	$preValue = $this->preGetValue("active"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->active;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set active - Active
* @param boolean $active
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setActive ($active) {
	$fd = $this->getClass()->getFieldDefinition("active");
	$this->active = $active;
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
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setDigitalProduct ($digitalProduct) {
	$fd = $this->getClass()->getFieldDefinition("digitalProduct");
	$this->digitalProduct = $digitalProduct;
	return $this;
}

/**
* Get manufacturer - Manufacturer
* @return \Pimcore\Model\DataObject\AbstractObject
*/
public function getManufacturer () {
	$preValue = $this->preGetValue("manufacturer"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("manufacturer")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set manufacturer - Manufacturer
* @param \Pimcore\Model\DataObject\AbstractObject $manufacturer
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setManufacturer ($manufacturer) {
	$fd = $this->getClass()->getFieldDefinition("manufacturer");
	$currentData = $this->getManufacturer();
	$isEqual = $fd->isEqual($currentData, $manufacturer);
	if (!$isEqual) {
		$this->markFieldDirty("manufacturer", true);
	}
	$this->manufacturer = $fd->preSetData($this, $manufacturer);
	return $this;
}

/**
* Get stores - Stores
* @return array
*/
public function getStores () {
	$preValue = $this->preGetValue("stores"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("stores")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set stores - Stores
* @param array $stores
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setStores ($stores) {
	$fd = $this->getClass()->getFieldDefinition("stores");
	$this->stores = $stores;
	return $this;
}

/**
* Get categories - Categories
* @return \Pimcore\Model\DataObject\CoreShopCategory[]
*/
public function getCategories () {
	$preValue = $this->preGetValue("categories"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("categories")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set categories - Categories
* @param \Pimcore\Model\DataObject\CoreShopCategory[] $categories
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setCategories ($categories) {
	$fd = $this->getClass()->getFieldDefinition("categories");
	$currentData = $this->getCategories();
	$isEqual = $fd->isEqual($currentData, $categories);
	if (!$isEqual) {
		$this->markFieldDirty("categories", true);
	}
	$this->categories = $fd->preSetData($this, $categories);
	return $this;
}

/**
* Get images - Images
* @return \Pimcore\Model\Asset\Image[]
*/
public function getImages () {
	$preValue = $this->preGetValue("images"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("images")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set images - Images
* @param \Pimcore\Model\Asset\Image[] $images
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setImages ($images) {
	$fd = $this->getClass()->getFieldDefinition("images");
	$currentData = $this->getImages();
	$isEqual = $fd->isEqual($currentData, $images);
	if (!$isEqual) {
		$this->markFieldDirty("images", true);
	}
	$this->images = $fd->preSetData($this, $images);
	return $this;
}

/**
* Get onHold - On Hold
* @return int
*/
public function getOnHold () {
	$preValue = $this->preGetValue("onHold"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->onHold;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set onHold - On Hold
* @param int $onHold
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setOnHold ($onHold) {
	$fd = $this->getClass()->getFieldDefinition("onHold");
	$this->onHold = $onHold;
	return $this;
}

/**
* Get onHand - On Hand
* @return int
*/
public function getOnHand () {
	$preValue = $this->preGetValue("onHand"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->onHand;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set onHand - On Hand
* @param int $onHand
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setOnHand ($onHand) {
	$fd = $this->getClass()->getFieldDefinition("onHand");
	$this->onHand = $onHand;
	return $this;
}

/**
* Get isTracked - Is Tracked
* @return boolean
*/
public function getIsTracked () {
	$preValue = $this->preGetValue("isTracked"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->isTracked;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set isTracked - Is Tracked
* @param boolean $isTracked
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setIsTracked ($isTracked) {
	$fd = $this->getClass()->getFieldDefinition("isTracked");
	$this->isTracked = $isTracked;
	return $this;
}

/**
* Get storePrice - Store Price
* @return array
*/
public function getStorePrice (\CoreShop\Component\Store\Model\StoreInterface $store = null) {
	$this->storePrice = $this->getClass()->getFieldDefinition("storePrice")->preGetData($this);
	if (is_null($store)) {
		return $this->storePrice;
	}
	$data = $this->storePrice;
	if (is_array($data) && array_key_exists($store->getId(), $data) && is_numeric($data[$store->getId()])) {
		return (int)$data[$store->getId()];
	}
	 return null;
}

/**
* Get storePrice - Store Price
* @return static
*/
public function setStorePrice ($storePrice, \CoreShop\Component\Store\Model\StoreInterface $store = null) {
	$fd = $this->getClass()->getFieldDefinition("storePrice");
	$currentData = $this->getStorePrice();
	if (is_null($storePrice)) {
		return $this;
	}
	
	if (!is_int($storePrice) && !is_array($storePrice)) {
		throw new \InvalidArgumentException(sprintf('Expected value to either be an array or an int, "%s" given', gettype($storePrice)));
	}
	if (is_array($storePrice)) {
		$currentData = $storePrice;
	}
	else if (!is_null($store)) {
		$currentData[$store->getId()] = $storePrice;
	}
	$isEqual = $fd->isEqual($currentData, $storePrice);
	if (!$isEqual) {
		$this->markFieldDirty("storePrice", true);
	}
	$this->storePrice = $this->getClass()->getFieldDefinition("storePrice")->preSetData($this, $currentData);
	return $this;
}

/**
* Get wholesalePrice - Wholesale Price
* @return int
*/
public function getWholesalePrice () {
	$preValue = $this->preGetValue("wholesalePrice"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->wholesalePrice;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set wholesalePrice - Wholesale Price
* @param int $wholesalePrice
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setWholesalePrice ($wholesalePrice) {
	$fd = $this->getClass()->getFieldDefinition("wholesalePrice");
	$this->wholesalePrice = $wholesalePrice;
	return $this;
}

/**
* Get taxRule - Tax Rule
* @return CoreShop\Component\Taxation\Model\TaxRuleGroupInterface
*/
public function getTaxRule () {
	$preValue = $this->preGetValue("taxRule"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("taxRule")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set taxRule - Tax Rule
* @param CoreShop\Component\Taxation\Model\TaxRuleGroupInterface $taxRule
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setTaxRule ($taxRule) {
	$fd = $this->getClass()->getFieldDefinition("taxRule");
	$this->taxRule = $fd->preSetData($this, $taxRule);
	return $this;
}

/**
* Get specificPriceRules - Specific Price Rules
* @return 
*/
public function getSpecificPriceRules () {
	$preValue = $this->preGetValue("specificPriceRules"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("specificPriceRules")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set specificPriceRules - Specific Price Rules
* @param  $specificPriceRules
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setSpecificPriceRules ($specificPriceRules) {
	$fd = $this->getClass()->getFieldDefinition("specificPriceRules");
	$this->specificPriceRules = $fd->preSetData($this, $specificPriceRules);
	return $this;
}

/**
* Get weight - Weight
* @return float
*/
public function getWeight () {
	$preValue = $this->preGetValue("weight"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->weight;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set weight - Weight
* @param float $weight
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setWeight ($weight) {
	$fd = $this->getClass()->getFieldDefinition("weight");
	$this->weight = $weight;
	return $this;
}

/**
* Get height - Height
* @return float
*/
public function getHeight () {
	$preValue = $this->preGetValue("height"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->height;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set height - Height
* @param float $height
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setHeight ($height) {
	$fd = $this->getClass()->getFieldDefinition("height");
	$this->height = $height;
	return $this;
}

/**
* Get width - Width
* @return float
*/
public function getWidth () {
	$preValue = $this->preGetValue("width"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->width;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set width - Width
* @param float $width
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setWidth ($width) {
	$fd = $this->getClass()->getFieldDefinition("width");
	$this->width = $width;
	return $this;
}

/**
* Get depth - Depth
* @return float
*/
public function getDepth () {
	$preValue = $this->preGetValue("depth"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->depth;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set depth - Depth
* @param float $depth
* @return \Pimcore\Model\DataObject\CoreShopProduct
*/
public function setDepth ($depth) {
	$fd = $this->getClass()->getFieldDefinition("depth");
	$this->depth = $depth;
	return $this;
}

protected static $_relationFields = array (
  'manufacturer' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'categories' => 
  array (
    'type' => 'manyToManyRelation',
  ),
  'images' => 
  array (
    'type' => 'manyToManyRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'manufacturer',
  1 => 'images',
  2 => 'storePrice',
);

}

