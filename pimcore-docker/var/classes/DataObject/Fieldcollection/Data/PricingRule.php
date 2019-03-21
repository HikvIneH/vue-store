<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - ruleId [numeric]
 - name [input]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class PricingRule extends DataObject\Fieldcollection\Data\AbstractData implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "PricingRule";
protected $ruleId;
protected $name;


/**
* Get ruleId - Rule Id
* @return float
*/
public function getRuleId () {
	$data = $this->ruleId;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set ruleId - Rule Id
* @param float $ruleId
* @return \Pimcore\Model\DataObject\PricingRule
*/
public function setRuleId ($ruleId) {
	$fd = $this->getDefinition()->getFieldDefinition("ruleId");
	$this->ruleId = $ruleId;
	return $this;
}

/**
* Get name - Name
* @return string
*/
public function getName () {
	$data = $this->name;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\PricingRule
*/
public function setName ($name) {
	$fd = $this->getDefinition()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

}

