<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - count [numeric]
 - prefix [input]
 - length [numeric]
 - characterType [select]
 - separator [input]
 - separatorCount [numeric]
 - allowOncePerCart [checkbox]
 - onlyTokenPerCart [checkbox]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class VoucherTokenTypePattern extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\AbstractVoucherTokenType implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "VoucherTokenTypePattern";
protected $count;
protected $prefix;
protected $length;
protected $characterType;
protected $separator;
protected $separatorCount;
protected $allowOncePerCart;
protected $onlyTokenPerCart;


/**
* Get count - Token Count
* @return float
*/
public function getCount () {
	$data = $this->count;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set count - Token Count
* @param float $count
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setCount ($count) {
	$fd = $this->getDefinition()->getFieldDefinition("count");
	$this->count = $count;
	return $this;
}

/**
* Get prefix - Prefix
* @return string
*/
public function getPrefix () {
	$data = $this->prefix;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set prefix - Prefix
* @param string $prefix
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setPrefix ($prefix) {
	$fd = $this->getDefinition()->getFieldDefinition("prefix");
	$this->prefix = $prefix;
	return $this;
}

/**
* Get length - Length
* @return float
*/
public function getLength () {
	$data = $this->length;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set length - Length
* @param float $length
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setLength ($length) {
	$fd = $this->getDefinition()->getFieldDefinition("length");
	$this->length = $length;
	return $this;
}

/**
* Get characterType - Character Type
* @return string
*/
public function getCharacterType () {
	$data = $this->characterType;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set characterType - Character Type
* @param string $characterType
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setCharacterType ($characterType) {
	$fd = $this->getDefinition()->getFieldDefinition("characterType");
	$this->characterType = $characterType;
	return $this;
}

/**
* Get separator - Separator
* @return string
*/
public function getSeparator () {
	$data = $this->separator;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set separator - Separator
* @param string $separator
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setSeparator ($separator) {
	$fd = $this->getDefinition()->getFieldDefinition("separator");
	$this->separator = $separator;
	return $this;
}

/**
* Get separatorCount - Every x character 
* @return string
*/
public function getSeparatorCount () {
	$data = $this->separatorCount;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set separatorCount - Every x character 
* @param string $separatorCount
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setSeparatorCount ($separatorCount) {
	$fd = $this->getDefinition()->getFieldDefinition("separatorCount");
	$this->separatorCount = $separatorCount;
	return $this;
}

/**
* Get allowOncePerCart - Only allow one token of this type per cart
* @return boolean
*/
public function getAllowOncePerCart () {
	$data = $this->allowOncePerCart;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set allowOncePerCart - Only allow one token of this type per cart
* @param boolean $allowOncePerCart
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setAllowOncePerCart ($allowOncePerCart) {
	$fd = $this->getDefinition()->getFieldDefinition("allowOncePerCart");
	$this->allowOncePerCart = $allowOncePerCart;
	return $this;
}

/**
* Get onlyTokenPerCart - Only token of a cart
* @return boolean
*/
public function getOnlyTokenPerCart () {
	$data = $this->onlyTokenPerCart;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set onlyTokenPerCart - Only token of a cart
* @param boolean $onlyTokenPerCart
* @return \Pimcore\Model\DataObject\VoucherTokenTypePattern
*/
public function setOnlyTokenPerCart ($onlyTokenPerCart) {
	$fd = $this->getDefinition()->getFieldDefinition("onlyTokenPerCart");
	$this->onlyTokenPerCart = $onlyTokenPerCart;
	return $this;
}

}

