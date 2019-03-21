<?php 

/** 
* Generated at: 2019-03-21T10:06:51+01:00


Fields Summary: 
 - label [input]
 - preSelect [manyToOneRelation]
 - rootCategory [manyToOneRelation]
 - includeParentCategories [checkbox]
 - scriptPath [input]
 - availableCategories [manyToManyObjectRelation]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class FilterCategory extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\CategoryFilterDefinitionType implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "FilterCategory";
protected $label;
protected $preSelect;
protected $rootCategory;
protected $includeParentCategories;
protected $scriptPath;
protected $availableCategories;


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
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setLabel ($label) {
	$fd = $this->getDefinition()->getFieldDefinition("label");
	$this->label = $label;
	return $this;
}

/**
* Get preSelect - Pre Select
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function getPreSelect () {
	$container = $this;
	$fd = $this->getDefinition()->getFieldDefinition("preSelect");
	$data = $fd->preGetData($container);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set preSelect - Pre Select
* @param \Pimcore\Model\DataObject\ProductCategory $preSelect
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setPreSelect ($preSelect) {
	$fd = $this->getDefinition()->getFieldDefinition("preSelect");
	$currentData = $this->getPreSelect();
	$isEqual = $fd->isEqual($currentData, $preSelect);
	if (!$isEqual) {
		$this->markFieldDirty("preSelect", true);
	}
	$this->preSelect = $fd->preSetData($this, $preSelect);
	return $this;
}

/**
* Get rootCategory - Root Category
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function getRootCategory () {
	$container = $this;
	$fd = $this->getDefinition()->getFieldDefinition("rootCategory");
	$data = $fd->preGetData($container);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set rootCategory - Root Category
* @param \Pimcore\Model\DataObject\ProductCategory $rootCategory
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setRootCategory ($rootCategory) {
	$fd = $this->getDefinition()->getFieldDefinition("rootCategory");
	$currentData = $this->getRootCategory();
	$isEqual = $fd->isEqual($currentData, $rootCategory);
	if (!$isEqual) {
		$this->markFieldDirty("rootCategory", true);
	}
	$this->rootCategory = $fd->preSetData($this, $rootCategory);
	return $this;
}

/**
* Get includeParentCategories - Include SubCategories
* @return boolean
*/
public function getIncludeParentCategories () {
	$data = $this->includeParentCategories;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set includeParentCategories - Include SubCategories
* @param boolean $includeParentCategories
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setIncludeParentCategories ($includeParentCategories) {
	$fd = $this->getDefinition()->getFieldDefinition("includeParentCategories");
	$this->includeParentCategories = $includeParentCategories;
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
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setScriptPath ($scriptPath) {
	$fd = $this->getDefinition()->getFieldDefinition("scriptPath");
	$this->scriptPath = $scriptPath;
	return $this;
}

/**
* Get availableCategories - Available Categories
* @return \Pimcore\Model\DataObject\ProductCategory[]
*/
public function getAvailableCategories () {
	$container = $this;
	$fd = $this->getDefinition()->getFieldDefinition("availableCategories");
	$data = $fd->preGetData($container);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set availableCategories - Available Categories
* @param \Pimcore\Model\DataObject\ProductCategory[] $availableCategories
* @return \Pimcore\Model\DataObject\FilterCategory
*/
public function setAvailableCategories ($availableCategories) {
	$fd = $this->getDefinition()->getFieldDefinition("availableCategories");
	$currentData = $this->getAvailableCategories();
	$isEqual = $fd->isEqual($currentData, $availableCategories);
	if (!$isEqual) {
		$this->markFieldDirty("availableCategories", true);
	}
	$this->availableCategories = $fd->preSetData($this, $availableCategories);
	return $this;
}

}

