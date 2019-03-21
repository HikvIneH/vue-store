<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - configurationKey [input]
 - auth_token [input]
 - auth_PayerID [input]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class PaymentProviderPayPal extends DataObject\Objectbrick\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "PaymentProviderPayPal";
protected $configurationKey;
protected $auth_token;
protected $auth_PayerID;


/**
* PaymentProviderPayPal constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get configurationKey - Configuration Key
* @return string
*/
public function getConfigurationKey () {
	$data = $this->configurationKey;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("configurationKey")->isEmpty($data)) {
		return $this->getValueFromParent("configurationKey");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set configurationKey - Configuration Key
* @param string $configurationKey
* @return \Pimcore\Model\DataObject\Objectbrick\Data\PaymentProviderPayPal
*/
public function setConfigurationKey ($configurationKey) {
	$fd = $this->getDefinition()->getFieldDefinition("configurationKey");
	$this->configurationKey = $configurationKey;
	return $this;
}

/**
* Get auth_token - Token
* @return string
*/
public function getAuth_token () {
	$data = $this->auth_token;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("auth_token")->isEmpty($data)) {
		return $this->getValueFromParent("auth_token");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set auth_token - Token
* @param string $auth_token
* @return \Pimcore\Model\DataObject\Objectbrick\Data\PaymentProviderPayPal
*/
public function setAuth_token ($auth_token) {
	$fd = $this->getDefinition()->getFieldDefinition("auth_token");
	$this->auth_token = $auth_token;
	return $this;
}

/**
* Get auth_PayerID - PayerID
* @return string
*/
public function getAuth_PayerID () {
	$data = $this->auth_PayerID;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("auth_PayerID")->isEmpty($data)) {
		return $this->getValueFromParent("auth_PayerID");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set auth_PayerID - PayerID
* @param string $auth_PayerID
* @return \Pimcore\Model\DataObject\Objectbrick\Data\PaymentProviderPayPal
*/
public function setAuth_PayerID ($auth_PayerID) {
	$fd = $this->getDefinition()->getFieldDefinition("auth_PayerID");
	$this->auth_PayerID = $auth_PayerID;
	return $this;
}

}

