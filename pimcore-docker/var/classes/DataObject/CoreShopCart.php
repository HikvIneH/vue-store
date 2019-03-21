<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- name [input]
- customIdentifier [input]
- store [coreShopStore]
- localeCode [language]
- carrier [coreShopCarrier]
- paymentProvider [coreShopPaymentProvider]
- paymentSettings [coreShopSerializedData]
- order [manyToOneRelation]
- currency [coreShopCurrency]
- comment [textarea]
- additionalData [objectbricks]
- priceRuleItems [fieldcollections]
- items [manyToManyRelation]
- needsRecalculation [checkbox]
- customer [manyToOneRelation]
- shippingAddress [manyToOneRelation]
- invoiceAddress [manyToOneRelation]
- shippingTaxRate [numeric]
- taxes [fieldcollections]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByName ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByCustomIdentifier ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByStore ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByLocaleCode ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByCarrier ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByPaymentProvider ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByPaymentSettings ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByOrder ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByCurrency ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByComment ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByAdditionalData ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByPriceRuleItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByNeedsRecalculation ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByCustomer ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByShippingAddress ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByInvoiceAddress ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByShippingTaxRate ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByTaxes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByPimcoreAdjustmentTotalNet ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByPimcoreAdjustmentTotalGross ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCart\Listing getByAdjustmentItems ($value, $limit = 0) 
*/

class CoreShopCart extends \CoreShop\Component\Core\Model\Cart implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "42";
protected $o_className = "CoreShopCart";
protected $name;
protected $customIdentifier;
protected $store;
protected $localeCode;
protected $carrier;
protected $paymentProvider;
protected $paymentSettings;
protected $order;
protected $currency;
protected $comment;
protected $additionalData;
protected $priceRuleItems;
protected $items;
protected $needsRecalculation;
protected $customer;
protected $shippingAddress;
protected $invoiceAddress;
protected $shippingTaxRate;
protected $taxes;
protected $pimcoreAdjustmentTotalNet;
protected $pimcoreAdjustmentTotalGross;
protected $adjustmentItems;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get name - Name
* @return string
*/
public function getName () {
	$preValue = $this->preGetValue("name"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->name;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setName ($name) {
	$fd = $this->getClass()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

/**
* Get customIdentifier - Custom Identifier
* @return string
*/
public function getCustomIdentifier () {
	$preValue = $this->preGetValue("customIdentifier"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->customIdentifier;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set customIdentifier - Custom Identifier
* @param string $customIdentifier
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setCustomIdentifier ($customIdentifier) {
	$fd = $this->getClass()->getFieldDefinition("customIdentifier");
	$this->customIdentifier = $customIdentifier;
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
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setStore ($store) {
	$fd = $this->getClass()->getFieldDefinition("store");
	$this->store = $fd->preSetData($this, $store);
	return $this;
}

/**
* Get localeCode - Locale
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
* Set localeCode - Locale
* @param string $localeCode
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setCarrier ($carrier) {
	$fd = $this->getClass()->getFieldDefinition("carrier");
	$this->carrier = $fd->preSetData($this, $carrier);
	return $this;
}

/**
* Get paymentProvider - Payment Provider
* @return CoreShop\Component\Payment\Model\PaymentProvider
*/
public function getPaymentProvider () {
	$preValue = $this->preGetValue("paymentProvider"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("paymentProvider")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set paymentProvider - Payment Provider
* @param CoreShop\Component\Payment\Model\PaymentProvider $paymentProvider
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setPaymentProvider ($paymentProvider) {
	$fd = $this->getClass()->getFieldDefinition("paymentProvider");
	$this->paymentProvider = $fd->preSetData($this, $paymentProvider);
	return $this;
}

/**
* Get paymentSettings - Payment Settings
* @return 
*/
public function getPaymentSettings () {
	$preValue = $this->preGetValue("paymentSettings"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->paymentSettings;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set paymentSettings - Payment Settings
* @param  $paymentSettings
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setPaymentSettings ($paymentSettings) {
	$fd = $this->getClass()->getFieldDefinition("paymentSettings");
	$this->paymentSettings = $paymentSettings;
	return $this;
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setCurrency ($currency) {
	$fd = $this->getClass()->getFieldDefinition("currency");
	$this->currency = $fd->preSetData($this, $currency);
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
		if(\Pimcore\Tool::classExists("\\Pimcore\\Model\\DataObject\\CoreShopCart\\AdditionalData")) { 
			$data = new \Pimcore\Model\DataObject\CoreShopCart\AdditionalData($this, "additionalData");
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
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setAdditionalData ($additionalData) {
	$fd = $this->getClass()->getFieldDefinition("additionalData");
	$this->additionalData = $fd->preSetData($this, $additionalData);
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
* Set priceRuleItems - Rules
* @param \Pimcore\Model\DataObject\Fieldcollection $priceRuleItems
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setPriceRuleItems ($priceRuleItems) {
	$fd = $this->getClass()->getFieldDefinition("priceRuleItems");
	$this->priceRuleItems = $fd->preSetData($this, $priceRuleItems);
	return $this;
}

/**
* Get items - Items
* @return \Pimcore\Model\DataObject\CoreShopCartItem[]
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
* @param \Pimcore\Model\DataObject\CoreShopCartItem[] $items
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* Get needsRecalculation - Needs Recalculation
* @return boolean
*/
public function getNeedsRecalculation () {
	$preValue = $this->preGetValue("needsRecalculation"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->needsRecalculation;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set needsRecalculation - Needs Recalculation
* @param boolean $needsRecalculation
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setNeedsRecalculation ($needsRecalculation) {
	$fd = $this->getClass()->getFieldDefinition("needsRecalculation");
	$this->needsRecalculation = $needsRecalculation;
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
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
* @return \Pimcore\Model\DataObject\CoreShopCart
*/
public function setAdjustmentItems ($adjustmentItems) {
	$fd = $this->getClass()->getFieldDefinition("adjustmentItems");
	$this->adjustmentItems = $fd->preSetData($this, $adjustmentItems);
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
);

}

