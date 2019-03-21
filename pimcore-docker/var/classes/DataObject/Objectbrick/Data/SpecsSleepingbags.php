<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - weight [numeric]
 - length [numeric]
 - width [numeric]
 - bodySize [numeric]
 - fabricShell [input]
 - fabricLining [input]
 - filling [input]
 - protection [input]
 - packingSize [input]
 - temperatureComfort [numeric]
 - temperatureLimit [numeric]
 - temperatureExtreme [numeric]
*/ 

namespace Pimcore\Model\DataObject\Objectbrick\Data;

use Pimcore\Model\DataObject;

class SpecsSleepingbags extends DataObject\Objectbrick\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "specsSleepingbags";
protected $weight;
protected $length;
protected $width;
protected $bodySize;
protected $fabricShell;
protected $fabricLining;
protected $filling;
protected $protection;
protected $packingSize;
protected $temperatureComfort;
protected $temperatureLimit;
protected $temperatureExtreme;


/**
* SpecsSleepingbags constructor.
* @param DataObject\Concrete $object
*/
public function __construct(DataObject\Concrete $object) {
	parent::__construct($object);
	$this->markFieldDirty("_self");
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
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setWeight ($weight) {
	$fd = $this->getDefinition()->getFieldDefinition("weight");
	$this->weight = $weight;
	return $this;
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
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
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
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setWidth ($width) {
	$fd = $this->getDefinition()->getFieldDefinition("width");
	$this->width = $width;
	return $this;
}

/**
* Get bodySize - Max Body Size
* @return float
*/
public function getBodySize () {
	$data = $this->bodySize;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("bodySize")->isEmpty($data)) {
		return $this->getValueFromParent("bodySize");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set bodySize - Max Body Size
* @param float $bodySize
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setBodySize ($bodySize) {
	$fd = $this->getDefinition()->getFieldDefinition("bodySize");
	$this->bodySize = $bodySize;
	return $this;
}

/**
* Get fabricShell - Shell fabric
* @return string
*/
public function getFabricShell () {
	$data = $this->fabricShell;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("fabricShell")->isEmpty($data)) {
		return $this->getValueFromParent("fabricShell");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set fabricShell - Shell fabric
* @param string $fabricShell
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setFabricShell ($fabricShell) {
	$fd = $this->getDefinition()->getFieldDefinition("fabricShell");
	$this->fabricShell = $fabricShell;
	return $this;
}

/**
* Get fabricLining - Lining fabric
* @return string
*/
public function getFabricLining () {
	$data = $this->fabricLining;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("fabricLining")->isEmpty($data)) {
		return $this->getValueFromParent("fabricLining");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set fabricLining - Lining fabric
* @param string $fabricLining
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setFabricLining ($fabricLining) {
	$fd = $this->getDefinition()->getFieldDefinition("fabricLining");
	$this->fabricLining = $fabricLining;
	return $this;
}

/**
* Get filling - Filling
* @return string
*/
public function getFilling () {
	$data = $this->filling;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("filling")->isEmpty($data)) {
		return $this->getValueFromParent("filling");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set filling - Filling
* @param string $filling
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setFilling ($filling) {
	$fd = $this->getDefinition()->getFieldDefinition("filling");
	$this->filling = $filling;
	return $this;
}

/**
* Get protection - Protection (Layers)
* @return string
*/
public function getProtection () {
	$data = $this->protection;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("protection")->isEmpty($data)) {
		return $this->getValueFromParent("protection");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set protection - Protection (Layers)
* @param string $protection
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setProtection ($protection) {
	$fd = $this->getDefinition()->getFieldDefinition("protection");
	$this->protection = $protection;
	return $this;
}

/**
* Get packingSize - Packing Size
* @return string
*/
public function getPackingSize () {
	$data = $this->packingSize;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("packingSize")->isEmpty($data)) {
		return $this->getValueFromParent("packingSize");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set packingSize - Packing Size
* @param string $packingSize
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setPackingSize ($packingSize) {
	$fd = $this->getDefinition()->getFieldDefinition("packingSize");
	$this->packingSize = $packingSize;
	return $this;
}

/**
* Get temperatureComfort - Comfort Temp
* @return float
*/
public function getTemperatureComfort () {
	$data = $this->temperatureComfort;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("temperatureComfort")->isEmpty($data)) {
		return $this->getValueFromParent("temperatureComfort");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set temperatureComfort - Comfort Temp
* @param float $temperatureComfort
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setTemperatureComfort ($temperatureComfort) {
	$fd = $this->getDefinition()->getFieldDefinition("temperatureComfort");
	$this->temperatureComfort = $temperatureComfort;
	return $this;
}

/**
* Get temperatureLimit - Limit Temp
* @return float
*/
public function getTemperatureLimit () {
	$data = $this->temperatureLimit;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("temperatureLimit")->isEmpty($data)) {
		return $this->getValueFromParent("temperatureLimit");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set temperatureLimit - Limit Temp
* @param float $temperatureLimit
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setTemperatureLimit ($temperatureLimit) {
	$fd = $this->getDefinition()->getFieldDefinition("temperatureLimit");
	$this->temperatureLimit = $temperatureLimit;
	return $this;
}

/**
* Get temperatureExtreme - Extreme Temp
* @return float
*/
public function getTemperatureExtreme () {
	$data = $this->temperatureExtreme;
	if(\Pimcore\Model\DataObject::doGetInheritedValues($this->getObject()) && $this->getDefinition()->getFieldDefinition("temperatureExtreme")->isEmpty($data)) {
		return $this->getValueFromParent("temperatureExtreme");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		return $data->getPlain();
	}
	 return $data;
}

/**
* Set temperatureExtreme - Extreme Temp
* @param float $temperatureExtreme
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function setTemperatureExtreme ($temperatureExtreme) {
	$fd = $this->getDefinition()->getFieldDefinition("temperatureExtreme");
	$this->temperatureExtreme = $temperatureExtreme;
	return $this;
}

}

