<?php 

/** 
* Generated at: 2019-03-21T10:28:32+01:00


Fields Summary: 
 - typeIdentifier [input]
 - label [input]
 - pimcoreAmountNet [coreShopMoney]
 - pimcoreAmountGross [coreShopMoney]
 - pimcoreNeutral [checkbox]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class CoreShopAdjustment extends \CoreShop\Component\Order\Model\Adjustment implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "CoreShopAdjustment";
protected $typeIdentifier;
protected $label;
protected $pimcoreAmountNet;
protected $pimcoreAmountGross;
protected $pimcoreNeutral;


/**
* Get typeIdentifier - Type
* @return string
*/
public function getTypeIdentifier () {
	$data = $this->typeIdentifier;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set typeIdentifier - Type
* @param string $typeIdentifier
* @return \Pimcore\Model\DataObject\CoreShopAdjustment
*/
public function setTypeIdentifier ($typeIdentifier) {
	$fd = $this->getDefinition()->getFieldDefinition("typeIdentifier");
	$this->typeIdentifier = $typeIdentifier;
	return $this;
}

/**
* Get label - Label
* @return string
*/
public function getLabel () {
	$data = $this->label;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set label - Label
* @param string $label
* @return \Pimcore\Model\DataObject\CoreShopAdjustment
*/
public function setLabel ($label) {
	$fd = $this->getDefinition()->getFieldDefinition("label");
	$this->label = $label;
	return $this;
}

/**
* Get pimcoreAmountNet - Amount Net
* @return int
*/
public function getPimcoreAmountNet () {
	$data = $this->pimcoreAmountNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set pimcoreAmountNet - Amount Net
* @param int $pimcoreAmountNet
* @return \Pimcore\Model\DataObject\CoreShopAdjustment
*/
public function setPimcoreAmountNet ($pimcoreAmountNet) {
	$fd = $this->getDefinition()->getFieldDefinition("pimcoreAmountNet");
	$this->pimcoreAmountNet = $pimcoreAmountNet;
	return $this;
}

/**
* Get pimcoreAmountGross - Amount Gross
* @return int
*/
public function getPimcoreAmountGross () {
	$data = $this->pimcoreAmountGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set pimcoreAmountGross - Amount Gross
* @param int $pimcoreAmountGross
* @return \Pimcore\Model\DataObject\CoreShopAdjustment
*/
public function setPimcoreAmountGross ($pimcoreAmountGross) {
	$fd = $this->getDefinition()->getFieldDefinition("pimcoreAmountGross");
	$this->pimcoreAmountGross = $pimcoreAmountGross;
	return $this;
}

/**
* Get pimcoreNeutral - Neutral
* @return boolean
*/
public function getPimcoreNeutral () {
	$data = $this->pimcoreNeutral;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set pimcoreNeutral - Neutral
* @param boolean $pimcoreNeutral
* @return \Pimcore\Model\DataObject\CoreShopAdjustment
*/
public function setPimcoreNeutral ($pimcoreNeutral) {
	$fd = $this->getDefinition()->getFieldDefinition("pimcoreNeutral");
	$this->pimcoreNeutral = $pimcoreNeutral;
	return $this;
}

}

