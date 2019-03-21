<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - token [textarea]
 - tokenSecret [textarea]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class OAuth1Token extends \CustomerManagementFrameworkBundle\Model\Objectbrick\AbstractOAuth1Token implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "OAuth1Token";
protected $token;
protected $tokenSecret;


/**
* OAuth1Token constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get token - token
* @return string
*/
public function getToken () {
	$data = $this->token;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("token")->isEmpty($data)) {
		return $this->getValueFromParent("token");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set token - token
* @param string $token
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth1Token
*/
public function setToken ($token) {
	$fd = $this->getDefinition()->getFieldDefinition("token");
	$this->token = $token;
	return $this;
}

/**
* Get tokenSecret - tokenSecret
* @return string
*/
public function getTokenSecret () {
	$data = $this->tokenSecret;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("tokenSecret")->isEmpty($data)) {
		return $this->getValueFromParent("tokenSecret");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set tokenSecret - tokenSecret
* @param string $tokenSecret
* @return \Pimcore\Model\DataObject\Objectbrick\Data\OAuth1Token
*/
public function setTokenSecret ($tokenSecret) {
	$fd = $this->getDefinition()->getFieldDefinition("tokenSecret");
	$this->tokenSecret = $tokenSecret;
	return $this;
}

}

