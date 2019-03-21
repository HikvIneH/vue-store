<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - label [input]
 - field [indexFieldSelection]
 - ranges [structuredTable]
 - preSelectFrom [numeric]
 - preSelectTo [numeric]
 - scriptPath [input]
 - unit [input]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class FilterNumberRangeSelection extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\AbstractFilterDefinitionType implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "FilterNumberRangeSelection";
protected $label;
protected $field;
protected $ranges;
protected $preSelectFrom;
protected $preSelectTo;
protected $scriptPath;
protected $unit;


/**
* Get label - Label
* @return string
*/
public function getLabel () {
	$data = $this->label;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set label - Label
* @param string $label
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setLabel ($label) {
	$fd = $this->getDefinition()->getFieldDefinition("label");
	$this->label = $label;
	return $this;
}

/**
* Get field - Field
* @return \Pimcore\Bundle\EcommerceFrameworkBundle\CoreExtensions\ObjectData\IndexFieldSelection
*/
public function getField () {
	$data = $this->field;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set field - Field
* @param \Pimcore\Bundle\EcommerceFrameworkBundle\CoreExtensions\ObjectData\IndexFieldSelection $field
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setField ($field) {
	$fd = $this->getDefinition()->getFieldDefinition("field");
	$this->field = $field;
	return $this;
}

/**
* Get ranges - Ranges
* @return \Pimcore\Model\DataObject\Data\StructuredTable
*/
public function getRanges () {
	$data = $this->ranges;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set ranges - Ranges
* @param \Pimcore\Model\DataObject\Data\StructuredTable $ranges
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setRanges ($ranges) {
	$fd = $this->getDefinition()->getFieldDefinition("ranges");
	$this->ranges = $ranges;
	return $this;
}

/**
* Get preSelectFrom - Pre Select From
* @return float
*/
public function getPreSelectFrom () {
	$data = $this->preSelectFrom;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set preSelectFrom - Pre Select From
* @param float $preSelectFrom
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setPreSelectFrom ($preSelectFrom) {
	$fd = $this->getDefinition()->getFieldDefinition("preSelectFrom");
	$this->preSelectFrom = $preSelectFrom;
	return $this;
}

/**
* Get preSelectTo - Pre Select To
* @return float
*/
public function getPreSelectTo () {
	$data = $this->preSelectTo;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set preSelectTo - Pre Select To
* @param float $preSelectTo
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setPreSelectTo ($preSelectTo) {
	$fd = $this->getDefinition()->getFieldDefinition("preSelectTo");
	$this->preSelectTo = $preSelectTo;
	return $this;
}

/**
* Get scriptPath - Script Path
* @return string
*/
public function getScriptPath () {
	$data = $this->scriptPath;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set scriptPath - Script Path
* @param string $scriptPath
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setScriptPath ($scriptPath) {
	$fd = $this->getDefinition()->getFieldDefinition("scriptPath");
	$this->scriptPath = $scriptPath;
	return $this;
}

/**
* Get unit - Unit
* @return string
*/
public function getUnit () {
	$data = $this->unit;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set unit - Unit
* @param string $unit
* @return \Pimcore\Model\DataObject\FilterNumberRangeSelection
*/
public function setUnit ($unit) {
	$fd = $this->getDefinition()->getFieldDefinition("unit");
	$this->unit = $unit;
	return $this;
}

}

