<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - footTypes [multiselect]
 - gaitTypes [multiselect]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class Shoe extends DataObject\Objectbrick\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "shoe";
protected $footTypes;
protected $gaitTypes;


/**
* Shoe constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get footTypes - Foot Type
* @return array
*/
public function getFootTypes () {
	$data = $this->footTypes;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("footTypes")->isEmpty($data)) {
		return $this->getValueFromParent("footTypes");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set footTypes - Foot Type
* @param array $footTypes
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Shoe
*/
public function setFootTypes ($footTypes) {
	$fd = $this->getDefinition()->getFieldDefinition("footTypes");
	$this->footTypes = $footTypes;
	return $this;
}

/**
* Get gaitTypes - Gait Types
* @return array
*/
public function getGaitTypes () {
	$data = $this->gaitTypes;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("gaitTypes")->isEmpty($data)) {
		return $this->getValueFromParent("gaitTypes");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set gaitTypes - Gait Types
* @param array $gaitTypes
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Shoe
*/
public function setGaitTypes ($gaitTypes) {
	$fd = $this->getDefinition()->getFieldDefinition("gaitTypes");
	$this->gaitTypes = $gaitTypes;
	return $this;
}

}

