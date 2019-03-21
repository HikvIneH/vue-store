<?php 

namespace Pimcore\Model\DataObject\Product;

class SpecificAttributes extends \Pimcore\Model\DataObject\Objectbrick {



protected $brickGetters = array('weight','apparel','approvals','featuresBenefitsBackpacks','featuresBenefitsMats','featuresBenefitsShoes','featuresBenefitsSleepingbags','featuresBenefitsTents','featuresHeadlamps','matsSpecs','outdoor','rucksackSpecs','shoeDetails','shoe','snowsport','specsSleepingbags','tentGroundsheet','tentSpecifications');


protected $weight = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Weight
*/
public function getWeight() { 
	if(!$this->weight && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getWeight(); 
		}
	}
   return $this->weight; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Weight $weight
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setWeight ($weight) {
	$this->weight = $weight;
	return $this;
}

protected $apparel = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Apparel
*/
public function getApparel() { 
	if(!$this->apparel && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getApparel(); 
		}
	}
   return $this->apparel; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Apparel $apparel
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setApparel ($apparel) {
	$this->apparel = $apparel;
	return $this;
}

protected $approvals = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Approvals
*/
public function getApprovals() { 
	if(!$this->approvals && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getApprovals(); 
		}
	}
   return $this->approvals; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Approvals $approvals
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setApprovals ($approvals) {
	$this->approvals = $approvals;
	return $this;
}

protected $featuresBenefitsBackpacks = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsBackpacks
*/
public function getFeaturesBenefitsBackpacks() { 
	if(!$this->featuresBenefitsBackpacks && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesBenefitsBackpacks(); 
		}
	}
   return $this->featuresBenefitsBackpacks; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsBackpacks $featuresBenefitsBackpacks
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesBenefitsBackpacks ($featuresBenefitsBackpacks) {
	$this->featuresBenefitsBackpacks = $featuresBenefitsBackpacks;
	return $this;
}

protected $featuresBenefitsMats = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsMats
*/
public function getFeaturesBenefitsMats() { 
	if(!$this->featuresBenefitsMats && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesBenefitsMats(); 
		}
	}
   return $this->featuresBenefitsMats; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsMats $featuresBenefitsMats
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesBenefitsMats ($featuresBenefitsMats) {
	$this->featuresBenefitsMats = $featuresBenefitsMats;
	return $this;
}

protected $featuresBenefitsShoes = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsShoes
*/
public function getFeaturesBenefitsShoes() { 
	if(!$this->featuresBenefitsShoes && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesBenefitsShoes(); 
		}
	}
   return $this->featuresBenefitsShoes; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsShoes $featuresBenefitsShoes
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesBenefitsShoes ($featuresBenefitsShoes) {
	$this->featuresBenefitsShoes = $featuresBenefitsShoes;
	return $this;
}

protected $featuresBenefitsSleepingbags = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsSleepingbags
*/
public function getFeaturesBenefitsSleepingbags() { 
	if(!$this->featuresBenefitsSleepingbags && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesBenefitsSleepingbags(); 
		}
	}
   return $this->featuresBenefitsSleepingbags; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsSleepingbags $featuresBenefitsSleepingbags
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesBenefitsSleepingbags ($featuresBenefitsSleepingbags) {
	$this->featuresBenefitsSleepingbags = $featuresBenefitsSleepingbags;
	return $this;
}

protected $featuresBenefitsTents = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsTents
*/
public function getFeaturesBenefitsTents() { 
	if(!$this->featuresBenefitsTents && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesBenefitsTents(); 
		}
	}
   return $this->featuresBenefitsTents; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesBenefitsTents $featuresBenefitsTents
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesBenefitsTents ($featuresBenefitsTents) {
	$this->featuresBenefitsTents = $featuresBenefitsTents;
	return $this;
}

protected $featuresHeadlamps = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesHeadlamps
*/
public function getFeaturesHeadlamps() { 
	if(!$this->featuresHeadlamps && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getFeaturesHeadlamps(); 
		}
	}
   return $this->featuresHeadlamps; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\FeaturesHeadlamps $featuresHeadlamps
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setFeaturesHeadlamps ($featuresHeadlamps) {
	$this->featuresHeadlamps = $featuresHeadlamps;
	return $this;
}

protected $matsSpecs = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs
*/
public function getMatsSpecs() { 
	if(!$this->matsSpecs && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getMatsSpecs(); 
		}
	}
   return $this->matsSpecs; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\MatsSpecs $matsSpecs
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setMatsSpecs ($matsSpecs) {
	$this->matsSpecs = $matsSpecs;
	return $this;
}

protected $outdoor = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Outdoor
*/
public function getOutdoor() { 
	if(!$this->outdoor && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getOutdoor(); 
		}
	}
   return $this->outdoor; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Outdoor $outdoor
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setOutdoor ($outdoor) {
	$this->outdoor = $outdoor;
	return $this;
}

protected $rucksackSpecs = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\RucksackSpecs
*/
public function getRucksackSpecs() { 
	if(!$this->rucksackSpecs && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getRucksackSpecs(); 
		}
	}
   return $this->rucksackSpecs; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\RucksackSpecs $rucksackSpecs
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setRucksackSpecs ($rucksackSpecs) {
	$this->rucksackSpecs = $rucksackSpecs;
	return $this;
}

protected $shoeDetails = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\ShoeDetails
*/
public function getShoeDetails() { 
	if(!$this->shoeDetails && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getShoeDetails(); 
		}
	}
   return $this->shoeDetails; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\ShoeDetails $shoeDetails
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setShoeDetails ($shoeDetails) {
	$this->shoeDetails = $shoeDetails;
	return $this;
}

protected $shoe = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Shoe
*/
public function getShoe() { 
	if(!$this->shoe && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getShoe(); 
		}
	}
   return $this->shoe; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Shoe $shoe
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setShoe ($shoe) {
	$this->shoe = $shoe;
	return $this;
}

protected $snowsport = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\Snowsport
*/
public function getSnowsport() { 
	if(!$this->snowsport && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getSnowsport(); 
		}
	}
   return $this->snowsport; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\Snowsport $snowsport
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setSnowsport ($snowsport) {
	$this->snowsport = $snowsport;
	return $this;
}

protected $specsSleepingbags = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags
*/
public function getSpecsSleepingbags() { 
	if(!$this->specsSleepingbags && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getSpecsSleepingbags(); 
		}
	}
   return $this->specsSleepingbags; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\SpecsSleepingbags $specsSleepingbags
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setSpecsSleepingbags ($specsSleepingbags) {
	$this->specsSleepingbags = $specsSleepingbags;
	return $this;
}

protected $tentGroundsheet = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\TentGroundsheet
*/
public function getTentGroundsheet() { 
	if(!$this->tentGroundsheet && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getTentGroundsheet(); 
		}
	}
   return $this->tentGroundsheet; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\TentGroundsheet $tentGroundsheet
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setTentGroundsheet ($tentGroundsheet) {
	$this->tentGroundsheet = $tentGroundsheet;
	return $this;
}

protected $tentSpecifications = null;

/**
* @return \Pimcore\Model\DataObject\Objectbrick\Data\TentSpecifications
*/
public function getTentSpecifications() { 
	if(!$this->tentSpecifications && \Pimcore\Model\DataObject\AbstractObject::doGetInheritedValues($this->getObject())) { 
		$brick = $this->getObject()->getValueFromParent("specificAttributes");
		if(!empty($brick)) {
			return $this->getObject()->getValueFromParent("specificAttributes")->getTentSpecifications(); 
		}
	}
   return $this->tentSpecifications; 
}

/**
* @param \Pimcore\Model\DataObject\Objectbrick\Data\TentSpecifications $tentSpecifications
* @return \Pimcore\Model\DataObject\Product\SpecificAttributes
*/
public function setTentSpecifications ($tentSpecifications) {
	$this->tentSpecifications = $tentSpecifications;
	return $this;
}

}

