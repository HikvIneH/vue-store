<?php 

/** 
* Generated at: 2019-03-21T10:06:47+01:00
* Inheritance: no
* Variants: no


Fields Summary: 
- offernumber [input]
- dateCreated [datetime]
- dateValidUntil [date]
- totalPriceBeforeDiscount [numeric]
- totalPrice [numeric]
- discountType [select]
- discount [numeric]
- cartId [input]
- items [manyToManyObjectRelation]
- customItems [manyToManyObjectRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByOffernumber ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByDateCreated ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByDateValidUntil ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByTotalPriceBeforeDiscount ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByTotalPrice ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByDiscountType ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByDiscount ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByCartId ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByItems ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OfferToolOffer\Listing getByCustomItems ($value, $limit = 0) 
*/

class OfferToolOffer extends \Pimcore\Bundle\EcommerceFrameworkBundle\OfferTool\AbstractOffer implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "30";
protected $o_className = "OfferToolOffer";
protected $offernumber;
protected $dateCreated;
protected $dateValidUntil;
protected $totalPriceBeforeDiscount;
protected $totalPrice;
protected $discountType;
protected $discount;
protected $cartId;
protected $items;
protected $customItems;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get offernumber - Offernumber
* @return string
*/
public function getOffernumber () {
	$preValue = $this->preGetValue("offernumber"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->offernumber;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set offernumber - Offernumber
* @param string $offernumber
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setOffernumber ($offernumber) {
	$fd = $this->getClass()->getFieldDefinition("offernumber");
	$this->offernumber = $offernumber;
	return $this;
}

/**
* Get dateCreated - CreationDate
* @return \Carbon\Carbon
*/
public function getDateCreated () {
	$preValue = $this->preGetValue("dateCreated"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->dateCreated;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set dateCreated - CreationDate
* @param \Carbon\Carbon $dateCreated
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setDateCreated ($dateCreated) {
	$fd = $this->getClass()->getFieldDefinition("dateCreated");
	$this->dateCreated = $dateCreated;
	return $this;
}

/**
* Get dateValidUntil - Valid Until
* @return \Carbon\Carbon
*/
public function getDateValidUntil () {
	$preValue = $this->preGetValue("dateValidUntil"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->dateValidUntil;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set dateValidUntil - Valid Until
* @param \Carbon\Carbon $dateValidUntil
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setDateValidUntil ($dateValidUntil) {
	$fd = $this->getClass()->getFieldDefinition("dateValidUntil");
	$this->dateValidUntil = $dateValidUntil;
	return $this;
}

/**
* Get totalPriceBeforeDiscount - Total Price Before Discount
* @return string
*/
public function getTotalPriceBeforeDiscount () {
	$preValue = $this->preGetValue("totalPriceBeforeDiscount"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->totalPriceBeforeDiscount;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set totalPriceBeforeDiscount - Total Price Before Discount
* @param string $totalPriceBeforeDiscount
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setTotalPriceBeforeDiscount ($totalPriceBeforeDiscount) {
	$fd = $this->getClass()->getFieldDefinition("totalPriceBeforeDiscount");
	$this->totalPriceBeforeDiscount = $totalPriceBeforeDiscount;
	return $this;
}

/**
* Get totalPrice - TotalPrice
* @return string
*/
public function getTotalPrice () {
	$preValue = $this->preGetValue("totalPrice"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->totalPrice;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set totalPrice - TotalPrice
* @param string $totalPrice
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setTotalPrice ($totalPrice) {
	$fd = $this->getClass()->getFieldDefinition("totalPrice");
	$this->totalPrice = $totalPrice;
	return $this;
}

/**
* Get discountType - Discount Type
* @return string
*/
public function getDiscountType () {
	$preValue = $this->preGetValue("discountType"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->discountType;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set discountType - Discount Type
* @param string $discountType
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setDiscountType ($discountType) {
	$fd = $this->getClass()->getFieldDefinition("discountType");
	$this->discountType = $discountType;
	return $this;
}

/**
* Get discount - Discount
* @return string
*/
public function getDiscount () {
	$preValue = $this->preGetValue("discount"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->discount;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set discount - Discount
* @param string $discount
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setDiscount ($discount) {
	$fd = $this->getClass()->getFieldDefinition("discount");
	$this->discount = $discount;
	return $this;
}

/**
* Get cartId - Cart Id
* @return string
*/
public function getCartId () {
	$preValue = $this->preGetValue("cartId"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->cartId;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set cartId - Cart Id
* @param string $cartId
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setCartId ($cartId) {
	$fd = $this->getClass()->getFieldDefinition("cartId");
	$this->cartId = $cartId;
	return $this;
}

/**
* Get items - Items
* @return \Pimcore\Model\DataObject\OfferToolOfferItem[]
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
* @param \Pimcore\Model\DataObject\OfferToolOfferItem[] $items
* @return \Pimcore\Model\DataObject\OfferToolOffer
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
* Get customItems - Custom Items
* @return \Pimcore\Model\DataObject\OfferToolOfferItem[]
*/
public function getCustomItems () {
	$preValue = $this->preGetValue("customItems"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("customItems")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set customItems - Custom Items
* @param \Pimcore\Model\DataObject\OfferToolOfferItem[] $customItems
* @return \Pimcore\Model\DataObject\OfferToolOffer
*/
public function setCustomItems ($customItems) {
	$fd = $this->getClass()->getFieldDefinition("customItems");
	$currentData = $this->getCustomItems();
	$isEqual = $fd->isEqual($currentData, $customItems);
	if (!$isEqual) {
		$this->markFieldDirty("customItems", true);
	}
	$this->customItems = $fd->preSetData($this, $customItems);
	return $this;
}

protected static $_relationFields = array (
  'items' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'customItems' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
);

protected $lazyLoadedFields = array (
);

}

