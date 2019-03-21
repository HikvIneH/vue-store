<?php 

/** 
* Generated at: 2019-03-21T10:06:49+01:00
* Inheritance: no
* Variants: no


Fields Summary: 
- tokenId [numeric]
- token [input]
- voucherSeries [manyToOneRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\OnlineShopVoucherToken\Listing getByTokenId ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OnlineShopVoucherToken\Listing getByToken ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\OnlineShopVoucherToken\Listing getByVoucherSeries ($value, $limit = 0) 
*/

class OnlineShopVoucherToken extends Concrete implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "34";
protected $o_className = "OnlineShopVoucherToken";
protected $tokenId;
protected $token;
protected $voucherSeries;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\OnlineShopVoucherToken
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get tokenId - Token ID
* @return float
*/
public function getTokenId () {
	$preValue = $this->preGetValue("tokenId"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->tokenId;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set tokenId - Token ID
* @param float $tokenId
* @return \Pimcore\Model\DataObject\OnlineShopVoucherToken
*/
public function setTokenId ($tokenId) {
	$fd = $this->getClass()->getFieldDefinition("tokenId");
	$this->tokenId = $tokenId;
	return $this;
}

/**
* Get token - Token
* @return string
*/
public function getToken () {
	$preValue = $this->preGetValue("token"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->token;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set token - Token
* @param string $token
* @return \Pimcore\Model\DataObject\OnlineShopVoucherToken
*/
public function setToken ($token) {
	$fd = $this->getClass()->getFieldDefinition("token");
	$this->token = $token;
	return $this;
}

/**
* Get voucherSeries - Voucher Series
* @return \Pimcore\Model\DataObject\OnlineShopVoucherSeries
*/
public function getVoucherSeries () {
	$preValue = $this->preGetValue("voucherSeries"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("voucherSeries")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set voucherSeries - Voucher Series
* @param \Pimcore\Model\DataObject\OnlineShopVoucherSeries $voucherSeries
* @return \Pimcore\Model\DataObject\OnlineShopVoucherToken
*/
public function setVoucherSeries ($voucherSeries) {
	$fd = $this->getClass()->getFieldDefinition("voucherSeries");
	$currentData = $this->getVoucherSeries();
	$isEqual = $fd->isEqual($currentData, $voucherSeries);
	if (!$isEqual) {
		$this->markFieldDirty("voucherSeries", true);
	}
	$this->voucherSeries = $fd->preSetData($this, $voucherSeries);
	return $this;
}

protected static $_relationFields = array (
  'voucherSeries' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
);

}

