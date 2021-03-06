<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - name [input]
 - netAmount [numeric]
 - amount [numeric]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class OrderPriceModifications extends DataObject\Fieldcollection\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "OrderPriceModifications";
protected $name;
protected $netAmount;
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
* @return \Pimcore\Model\DataObject\OrderPriceModifications
*/
public function setName ($name) {
	$fd = $this->getDefinition()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

/**
* Get netAmount - NetAmount
* @return string
*/
public function getNetAmount () {
	$data = $this->netAmount;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set netAmount - NetAmount
* @param string $netAmount
* @return \Pimcore\Model\DataObject\OrderPriceModifications
*/
public function setNetAmount ($netAmount) {
	$fd = $this->getDefinition()->getFieldDefinition("netAmount");
	$this->netAmount = $netAmount;
	return $this;
}

/**
* Get amount - Amount
* @return string
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
* @param string $amount
* @return \Pimcore\Model\DataObject\OrderPriceModifications
*/
public function setAmount ($amount) {
	$fd = $this->getDefinition()->getFieldDefinition("amount");
	$this->amount = $amount;
	return $this;
}

}

