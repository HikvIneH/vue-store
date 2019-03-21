<?php 

/** 
* Generated at: 2019-03-21T10:28:32+01:00


Fields Summary: 
 - name [input]
 - rate [numeric]
 - amount [coreShopMoney]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class CoreShopTaxItem extends \CoreShop\Component\Taxation\Model\TaxItem implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "CoreShopTaxItem";
protected $name;
protected $rate;
protected $amount;


/**
* Get name - Name
* @return string
*/
public function getName () {
	$data = $this->name;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\CoreShopTaxItem
*/
public function setName ($name) {
	$fd = $this->getDefinition()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

/**
* Get rate - Rate
* @return float
*/
public function getRate () {
	$data = $this->rate;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set rate - Rate
* @param float $rate
* @return \Pimcore\Model\DataObject\CoreShopTaxItem
*/
public function setRate ($rate) {
	$fd = $this->getDefinition()->getFieldDefinition("rate");
	$this->rate = $rate;
	return $this;
}

/**
* Get amount - Amount
* @return int
*/
public function getAmount () {
	$data = $this->amount;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set amount - Amount
* @param int $amount
* @return \Pimcore\Model\DataObject\CoreShopTaxItem
*/
public function setAmount ($amount) {
	$fd = $this->getDefinition()->getFieldDefinition("amount");
	$this->amount = $amount;
	return $this;
}

}

