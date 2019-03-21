<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- name [input]
- roles [multiselect]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopCustomerGroup\Listing getByName ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomerGroup\Listing getByRoles ($value, $limit = 0) 
*/

class CoreShopCustomerGroup extends \CoreShop\Component\Customer\Model\CustomerGroup implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "52";
protected $o_className = "CoreShopCustomerGroup";
protected $name;
protected $roles;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopCustomerGroup
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
* @return \Pimcore\Model\DataObject\CoreShopCustomerGroup
*/
public function setName ($name) {
	$fd = $this->getClass()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

/**
* Get roles - roles
* @return array
*/
public function getRoles () {
	$preValue = $this->preGetValue("roles"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->roles;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set roles - roles
* @param array $roles
* @return \Pimcore\Model\DataObject\CoreShopCustomerGroup
*/
public function setRoles ($roles) {
	$fd = $this->getClass()->getFieldDefinition("roles");
	$this->roles = $roles;
	return $this;
}

protected static $_relationFields = array (
);

protected $lazyLoadedFields = array (
);

}

