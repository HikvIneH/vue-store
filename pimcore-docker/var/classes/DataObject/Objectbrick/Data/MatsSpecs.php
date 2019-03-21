<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - length [numeric]
 - width [numeric]
 - height [numeric]
 - materialTop [input]
 - materialBottom [input]
 - weight [numeric]
 - isCFCfree [checkbox]
 - has3partWaveShape [checkbox]
 - structure [multiselect]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class MatsSpecs extends DataObject\Objectbrick\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "matsSpecs";
protected $length;
protected $width;
protected $height;
protected $materialTop;
protected $materialBottom;
protected $weight;
protected $isCFCfree;
protected $has3partWaveShape;
protected $structure;


/**
* MatsSpecs constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
}


/**
* Get length - Length
* @return float
*/
public function getLength () {
	$data = $this->length;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("length")->isEmpty($data)) {
		return $this->getValueFromParent("length");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set length - Length
* @param float $length
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setLength ($length) {
	$fd = $this->getDefinition()->getFieldDefinition("length");
	$this->length = $length;
	return $this;
}

/**
* Get width - Width
* @return float
*/
public function getWidth () {
	$data = $this->width;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("width")->isEmpty($data)) {
		return $this->getValueFromParent("width");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set width - Width
* @param float $width
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setWidth ($width) {
	$fd = $this->getDefinition()->getFieldDefinition("width");
	$this->width = $width;
	return $this;
}

/**
* Get height - Height
* @return float
*/
public function getHeight () {
	$data = $this->height;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("height")->isEmpty($data)) {
		return $this->getValueFromParent("height");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set height - Height
* @param float $height
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setHeight ($height) {
	$fd = $this->getDefinition()->getFieldDefinition("height");
	$this->height = $height;
	return $this;
}

/**
* Get materialTop - Material Top
* @return string
*/
public function getMaterialTop () {
	$data = $this->materialTop;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("materialTop")->isEmpty($data)) {
		return $this->getValueFromParent("materialTop");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set materialTop - Material Top
* @param string $materialTop
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setMaterialTop ($materialTop) {
	$fd = $this->getDefinition()->getFieldDefinition("materialTop");
	$this->materialTop = $materialTop;
	return $this;
}

/**
* Get materialBottom - Material Bottom
* @return string
*/
public function getMaterialBottom () {
	$data = $this->materialBottom;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("materialBottom")->isEmpty($data)) {
		return $this->getValueFromParent("materialBottom");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set materialBottom - Material Bottom
* @param string $materialBottom
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setMaterialBottom ($materialBottom) {
	$fd = $this->getDefinition()->getFieldDefinition("materialBottom");
	$this->materialBottom = $materialBottom;
	return $this;
}

/**
* Get weight - Weight
* @return float
*/
public function getWeight () {
	$data = $this->weight;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("weight")->isEmpty($data)) {
		return $this->getValueFromParent("weight");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set weight - Weight
* @param float $weight
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setWeight ($weight) {
	$fd = $this->getDefinition()->getFieldDefinition("weight");
	$this->weight = $weight;
	return $this;
}

/**
* Get isCFCfree - Fully bonded CFC-free?
* @return boolean
*/
public function getIsCFCfree () {
	$data = $this->isCFCfree;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("isCFCfree")->isEmpty($data)) {
		return $this->getValueFromParent("isCFCfree");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set isCFCfree - Fully bonded CFC-free?
* @param boolean $isCFCfree
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setIsCFCfree ($isCFCfree) {
	$fd = $this->getDefinition()->getFieldDefinition("isCFCfree");
	$this->isCFCfree = $isCFCfree;
	return $this;
}

/**
* Get has3partWaveShape - Got 3part Wave Shape?
* @return boolean
*/
public function getHas3partWaveShape () {
	$data = $this->has3partWaveShape;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("has3partWaveShape")->isEmpty($data)) {
		return $this->getValueFromParent("has3partWaveShape");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set has3partWaveShape - Got 3part Wave Shape?
* @param boolean $has3partWaveShape
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setHas3partWaveShape ($has3partWaveShape) {
	$fd = $this->getDefinition()->getFieldDefinition("has3partWaveShape");
	$this->has3partWaveShape = $has3partWaveShape;
	return $this;
}

/**
* Get structure - Structure
* @return array
*/
public function getStructure () {
	$data = $this->structure;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("structure")->isEmpty($data)) {
		return $this->getValueFromParent("structure");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set structure - Structure
* @param array $structure
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function setStructure ($structure) {
	$fd = $this->getDefinition()->getFieldDefinition("structure");
	$this->structure = $structure;
	return $this;
}

}

