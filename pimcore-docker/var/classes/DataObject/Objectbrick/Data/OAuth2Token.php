<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - accessToken [textarea]
 - tokenType [input]
 - expiresAt [input]
 - refreshToken [textarea]
 - scope [input]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class OAuth2Token extends \CustomerManagementFrameworkBundle\Model\Objectbrick\AbstractOAuth2Token implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "OAuth2Token";
protected $accessToken;
protected $tokenType;
protected $expiresAt;
protected $refreshToken;
protected $scope;


/**
* OAuth2Token constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get accessToken - accessToken
* @return string
*/
public function getAccessToken () {
	$data = $this->accessToken;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("accessToken")->isEmpty($data)) {
		return $this->getValueFromParent("accessToken");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set accessToken - accessToken
* @param string $accessToken
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth2Token
*/
public function setAccessToken ($accessToken) {
	$fd = $this->getDefinition()->getFieldDefinition("accessToken");
	$this->accessToken = $accessToken;
	return $this;
}

/**
* Get tokenType - tokenType
* @return string
*/
public function getTokenType () {
	$data = $this->tokenType;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("tokenType")->isEmpty($data)) {
		return $this->getValueFromParent("tokenType");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set tokenType - tokenType
* @param string $tokenType
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth2Token
*/
public function setTokenType ($tokenType) {
	$fd = $this->getDefinition()->getFieldDefinition("tokenType");
	$this->tokenType = $tokenType;
	return $this;
}

/**
* Get expiresAt - expiresAt
* @return string
*/
public function getExpiresAt () {
	$data = $this->expiresAt;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("expiresAt")->isEmpty($data)) {
		return $this->getValueFromParent("expiresAt");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set expiresAt - expiresAt
* @param string $expiresAt
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth2Token
*/
public function setExpiresAt ($expiresAt) {
	$fd = $this->getDefinition()->getFieldDefinition("expiresAt");
	$this->expiresAt = $expiresAt;
	return $this;
}

/**
* Get refreshToken - refreshToken
* @return string
*/
public function getRefreshToken () {
	$data = $this->refreshToken;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("refreshToken")->isEmpty($data)) {
		return $this->getValueFromParent("refreshToken");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set refreshToken - refreshToken
* @param string $refreshToken
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth2Token
*/
public function setRefreshToken ($refreshToken) {
	$fd = $this->getDefinition()->getFieldDefinition("refreshToken");
	$this->refreshToken = $refreshToken;
	return $this;
}

/**
* Get scope - scope
* @return string
*/
public function getScope () {
	$data = $this->scope;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("scope")->isEmpty($data)) {
		return $this->getValueFromParent("scope");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set scope - scope
* @param string $scope
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth2Token
*/
public function setScope ($scope) {
	$fd = $this->getDefinition()->getFieldDefinition("scope");
	$this->scope = $scope;
	return $this;
}

}

