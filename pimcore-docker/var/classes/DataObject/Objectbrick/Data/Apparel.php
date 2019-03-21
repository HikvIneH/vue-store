<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - styles [manyToManyRelation]
 - fittings [multiselect]
 - zips [select]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class Apparel extends DataObject\Objectbrick\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "apparel";
protected $styles;
protected $fittings;
protected $zips;


/**
* Apparel constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get styles - Styles
* @return \Pimcore\Model\DataObject\ProductTechnology[]
*/
public function getStyles () {
	$data = $this->getDefinition()->getFieldDefinition("styles")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("styles")->isEmpty($data)) {
		return $this->getValueFromParent("styles");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set styles - Styles
* @param \Pimcore\Model\DataObject\ProductTechnology[] $styles
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Apparel
*/
public function setStyles ($styles) {
	$fd = $this->getDefinition()->getFieldDefinition("styles");
	$currentData = $this->getStyles();
	$isEqual = $fd->isEqual($currentData, $styles);
	if (!$isEqual) {
		$this->markFieldDirty("styles", true);
	}
	$this->styles = $fd->preSetData($this, $styles);
	return $this;
}

/**
* Get fittings - Fittings
* @return array
*/
public function getFittings () {
	$data = $this->fittings;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("fittings")->isEmpty($data)) {
		return $this->getValueFromParent("fittings");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set fittings - Fittings
* @param array $fittings
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Apparel
*/
public function setFittings ($fittings) {
	$fd = $this->getDefinition()->getFieldDefinition("fittings");
	$this->fittings = $fittings;
	return $this;
}

/**
* Get zips - Zips
* @return string
*/
public function getZips () {
	$data = $this->zips;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("zips")->isEmpty($data)) {
		return $this->getValueFromParent("zips");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set zips - Zips
* @param string $zips
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Apparel
*/
public function setZips ($zips) {
	$fd = $this->getDefinition()->getFieldDefinition("zips");
	$this->zips = $zips;
	return $this;
}

}

