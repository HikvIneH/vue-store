<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - field [indexFieldSelectionCombo]
 - direction [select]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class OrderByFields extends DataObject\Fieldcollection\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "OrderByFields";
protected $field;
protected $direction;


/**
* Get field - Field
* @return string
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
* @param string $field
* @return \Pimcore\Model\DataObject\OrderByFields
*/
public function setField ($field) {
	$fd = $this->getDefinition()->getFieldDefinition("field");
	$this->field = $field;
	return $this;
}

/**
* Get direction - Direction
* @return string
*/
public function getDirection () {
	$data = $this->direction;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set direction - Direction
* @param string $direction
* @return \Pimcore\Model\DataObject\OrderByFields
*/
public function setDirection ($direction) {
	$fd = $this->getDefinition()->getFieldDefinition("direction");
	$this->direction = $direction;
	return $this;
}

}

