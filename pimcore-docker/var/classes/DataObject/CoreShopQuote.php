<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- quoteNumber [input]
- backendCreated [checkbox]
- quoteDate [datetime]
- localeCode [language]
- carrier [coreShopCarrier]
- store [coreShopStore]
- comment [textarea]
- additionalData [objectbricks]
- currency [coreShopCurrency]
- totalNet [coreShopMoney]
- totalGross [coreShopMoney]
- subtotalNet [coreShopMoney]
- subtotalGross [coreShopMoney]
- shippingTaxRate [numeric]
- taxes [fieldcollections]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
- baseCurrency [coreShopCurrency]
- baseTotalNet [coreShopMoney]
- baseTotalGross [coreShopMoney]
- baseSubtotalNet [coreShopMoney]
- baseSubtotalGross [coreShopMoney]
- baseTaxes [fieldcollections]
- basePimcoreAdjustmentTotalNet [coreShopMoney]
- basePimcoreAdjustmentTotalGross [coreShopMoney]
- baseAdjustmentItems [fieldcollections]
- weight [numeric]
- priceRuleItems [fieldcollections]
- items [manyToManyRelation]
- customer [manyToOneRelation]
- shippingAddress [manyToOneRelation]
- invoiceAddress [manyToOneRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByQuoteNumber ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBackendCreated ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByQuoteDate ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByLocaleCode ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByCarrier ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByStore ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByComment ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByAdditionalData ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByCurrency ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getBySubtotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getBySubtotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByShippingTaxRate ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByPimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByPimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByAdjustmentItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseCurrency ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseSubtotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseSubtotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBasePimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBasePimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByBaseAdjustmentItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByWeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByPriceRuleItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByCustomer ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByShippingAddress ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopQuote\Listing getByInvoiceAddress ($value, $limit = 0) 
*/

class CoreShopQuote extends \CoreShop\Component\Core\Model\Quote implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "47";
protected $o_className = "CoreShopQuote";
protected $quoteNumber;
protected $backendCreated;
protected $quoteDate;
protected $localeCode;
protected $carrier;
protected $store;
protected $comment;
protected $additionalData;
protected $currency;
protected $totalNet;
protected $totalGross;
protected $subtotalNet;
protected $subtotalGross;
protected $shippingTaxRate;
protected $taxes;
protected $pimcoreAdjustmentTotalNet;
protected $pimcoreAdjustmentTotalGross;
protected $adjustmentItems;
protected $baseCurrency;
protected $baseTotalNet;
protected $baseTotalGross;
protected $baseSubtotalNet;
protected $baseSubtotalGross;
protected $baseTaxes;
protected $basePimcoreAdjustmentTotalNet;
protected $basePimcoreAdjustmentTotalGross;
protected $baseAdjustmentItems;
protected $weight;
protected $priceRuleItems;
protected $items;
protected $customer;
protected $shippingAddress;
protected $invoiceAddress;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get quoteNumber - Quote Number
* @return string
*/
public function getQuoteNumber () {
	$preValue = $this->preGetValue("quoteNumber"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->quoteNumber;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set quoteNumber - Quote Number
* @param string $quoteNumber
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setQuoteNumber ($quoteNumber) {
	$fd = $this->getClass()->getFieldDefinition("quoteNumber");
	$this->quoteNumber = $quoteNumber;
	return $this;
}

/**
* Get backendCreated - Backend Created
* @return boolean
*/
public function getBackendCreated () {
	$preValue = $this->preGetValue("backendCreated"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->backendCreated;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set backendCreated - Backend Created
* @param boolean $backendCreated
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setBackendCreated ($backendCreated) {
	$fd = $this->getClass()->getFieldDefinition("backendCreated");
	$this->backendCreated = $backendCreated;
	return $this;
}

/**
* Get quoteDate - Quote Date
* @return \Carbon\Carbon
*/
public function getQuoteDate () {
	$preValue = $this->preGetValue("quoteDate"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->quoteDate;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set quoteDate - Quote Date
* @param \Carbon\Carbon $quoteDate
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setQuoteDate ($quoteDate) {
	$fd = $this->getClass()->getFieldDefinition("quoteDate");
	$this->quoteDate = $quoteDate;
	return $this;
}

/**
* Get localeCode - Locale Code
* @return string
*/
public function getLocaleCode () {
	$preValue = $this->preGetValue("localeCode"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->localeCode;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set localeCode - Locale Code
* @param string $localeCode
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setLocaleCode ($localeCode) {
	$fd = $this->getClass()->getFieldDefinition("localeCode");
	$this->localeCode = $localeCode;
	return $this;
}

/**
* Get carrier - Carrier
* @return CoreShop\Component\Shipping\Model\CarrierInterface
*/
public function getCarrier () {
	$preValue = $this->preGetValue("carrier"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("carrier")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set carrier - Carrier
* @param CoreShop\Component\Shipping\Model\CarrierInterface $carrier
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setCarrier ($carrier) {
	$fd = $this->getClass()->getFieldDefinition("carrier");
	$this->carrier = $fd->preSetData($this, $carrier);
	return $this;
}

/**
* Get store - Store
* @return string
*/
public function getStore () {
	$preValue = $this->preGetValue("store"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("store")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set store - Store
* @param string $store
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setStore ($store) {
	$fd = $this->getClass()->getFieldDefinition("store");
	$this->store = $fd->preSetData($this, $store);
	return $this;
}

/**
* Get comment - Comment
* @return string
*/
public function getComment () {
	$preValue = $this->preGetValue("comment"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->comment;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set comment - Comment
* @param string $comment
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setComment ($comment) {
	$fd = $this->getClass()->getFieldDefinition("comment");
	$this->comment = $comment;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Objectbrick
*/
public function getAdditionalData () {
	$data = $this->additionalData;
	if(!$data) { 
		if(\Pimcore\Tool::classExists("\\Pimcore\\Model\\DataObject\\CoreShopQuote\\AdditionalData")) { 
			$data = new \Pimcore\Model\DataObject\CoreShopQuote\AdditionalData($this, "additionalData");
			$this->additionalData = $data;
		} else {
			return null;
		}
	}
	$preValue = $this->preGetValue("additionalData"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	 return $data;
}

/**
* Set additionalData - Additional Data
* @param \Pimcore\Model\DataObject\Objectbrick $additionalData
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setAdditionalData ($additionalData) {
	$fd = $this->getClass()->getFieldDefinition("additionalData");
	$this->additionalData = $fd->preSetData($this, $additionalData);
	return $this;
}

/**
* Get currency - Currency
* @return string
*/
public function getCurrency () {
	$preValue = $this->preGetValue("currency"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("currency")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set currency - Currency
* @param string $currency
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setCurrency ($currency) {
	$fd = $this->getClass()->getFieldDefinition("currency");
	$this->currency = $fd->preSetData($this, $currency);
	return $this;
}

/**
* Get totalNet - totalNet
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
* Set totalNet - totalNet
* @param int $totalNet
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setSubtotalNet ($subtotalNet) {
	$fd = $this->getClass()->getFieldDefinition("subtotalNet");
	$this->subtotalNet = $subtotalNet;
	return $this;
}

/**
* Get subtotalGross - subtotal Gross
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
* Set subtotalGross - subtotal Gross
* @param int $subtotalGross
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setSubtotalGross ($subtotalGross) {
	$fd = $this->getClass()->getFieldDefinition("subtotalGross");
	$this->subtotalGross = $subtotalGross;
	return $this;
}

/**
* Get shippingTaxRate - Shipping Tax Rate
* @return float
*/
public function getShippingTaxRate () {
	$preValue = $this->preGetValue("shippingTaxRate"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->shippingTaxRate;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set shippingTaxRate - Shipping Tax Rate
* @param float $shippingTaxRate
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setShippingTaxRate ($shippingTaxRate) {
	$fd = $this->getClass()->getFieldDefinition("shippingTaxRate");
	$this->shippingTaxRate = $shippingTaxRate;
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setAdjustmentItems ($adjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("adjustmentItems");
	$this->adjustmentItems = $fd->preSetData($this, $adjustmentItems);
	return $this;
}

/**
* Get baseCurrency - Base Currency
* @return string
*/
public function getBaseCurrency () {
	$preValue = $this->preGetValue("baseCurrency"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("baseCurrency")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set baseCurrency - Base Currency
* @param string $baseCurrency
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setBaseCurrency ($baseCurrency) {
	$fd = $this->getClass()->getFieldDefinition("baseCurrency");
	$this->baseCurrency = $fd->preSetData($this, $baseCurrency);
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setBaseSubtotalGross ($baseSubtotalGross) {
	$fd = $this->getClass()->getFieldDefinition("baseSubtotalGross");
	$this->baseSubtotalGross = $baseSubtotalGross;
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
* Set baseTaxes - Taxes
* @param \Pimcore\Model\DataObject\Fieldcollection $baseTaxes
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setBasePimcoreAdjustmentTotalGross ($basePimcoreAdjustmentTotalGross) {
	$fd = $this->getClass()->getFieldDefinition("basePimcoreAdjustmentTotalGross");
	$this->basePimcoreAdjustmentTotalGross = $basePimcoreAdjustmentTotalGross;
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
* Set baseAdjustmentItems - Adjustments
* @param \Pimcore\Model\DataObject\Fieldcollection $baseAdjustmentItems
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setBaseAdjustmentItems ($baseAdjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("baseAdjustmentItems");
	$this->baseAdjustmentItems = $fd->preSetData($this, $baseAdjustmentItems);
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
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setWeight ($weight) {
	$fd = $this->getClass()->getFieldDefinition("weight");
	$this->weight = $weight;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getPriceRuleItems () {
	$preValue = $this->preGetValue("priceRuleItems"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("priceRuleItems")->preGetData($this);
	 return $data;
}

/**
* Set priceRuleItems - Price Rule Items
* @param \Pimcore\Model\DataObject\Fieldcollection $priceRuleItems
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setPriceRuleItems ($priceRuleItems) {
	$fd = $this->getClass()->getFieldDefinition("priceRuleItems");
	$this->priceRuleItems = $fd->preSetData($this, $priceRuleItems);
	return $this;
}

/**
* Get items - Items
* @return \Pimcore\Model\DataObject\CoreShopQuoteItem[]
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
* @param \Pimcore\Model\DataObject\CoreShopQuoteItem[] $items
* @return \Pimcore\Model\DataObject\CoreShopQuote
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

/**
* Get customer - Customer
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function getCustomer () {
	$preValue = $this->preGetValue("customer"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("customer")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set customer - Customer
* @param \Pimcore\Model\DataObject\CoreShopCustomer $customer
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setCustomer ($customer) {
	$fd = $this->getClass()->getFieldDefinition("customer");
	$currentData = $this->getCustomer();
	$isEqual = $fd->isEqual($currentData, $customer);
	if (!$isEqual) {
		$this->markFieldDirty("customer", true);
	}
	$this->customer = $fd->preSetData($this, $customer);
	return $this;
}

/**
* Get shippingAddress - Shipping Address
* @return \Pimcore\Model\DataObject\CoreShopAddress
*/
public function getShippingAddress () {
	$preValue = $this->preGetValue("shippingAddress"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("shippingAddress")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set shippingAddress - Shipping Address
* @param \Pimcore\Model\DataObject\CoreShopAddress $shippingAddress
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setShippingAddress ($shippingAddress) {
	$fd = $this->getClass()->getFieldDefinition("shippingAddress");
	$currentData = $this->getShippingAddress();
	$isEqual = $fd->isEqual($currentData, $shippingAddress);
	if (!$isEqual) {
		$this->markFieldDirty("shippingAddress", true);
	}
	$this->shippingAddress = $fd->preSetData($this, $shippingAddress);
	return $this;
}

/**
* Get invoiceAddress - Invoice Address
* @return \Pimcore\Model\DataObject\CoreShopAddress
*/
public function getInvoiceAddress () {
	$preValue = $this->preGetValue("invoiceAddress"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("invoiceAddress")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set invoiceAddress - Invoice Address
* @param \Pimcore\Model\DataObject\CoreShopAddress $invoiceAddress
* @return \Pimcore\Model\DataObject\CoreShopQuote
*/
public function setInvoiceAddress ($invoiceAddress) {
	$fd = $this->getClass()->getFieldDefinition("invoiceAddress");
	$currentData = $this->getInvoiceAddress();
	$isEqual = $fd->isEqual($currentData, $invoiceAddress);
	if (!$isEqual) {
		$this->markFieldDirty("invoiceAddress", true);
	}
	$this->invoiceAddress = $fd->preSetData($this, $invoiceAddress);
	return $this;
}

protected static $_relationFields = array (
  'items' => 
  array (
    'type' => 'manyToManyRelation',
  ),
  'customer' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'shippingAddress' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'invoiceAddress' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'taxes',
  1 => 'adjustmentItems',
  2 => 'baseTaxes',
  3 => 'baseAdjustmentItems',
  4 => 'priceRuleItems',
);

}

