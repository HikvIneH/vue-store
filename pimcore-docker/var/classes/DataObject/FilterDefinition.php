<?php 

/** 
* Generated at: 2019-03-21T10:06:46+01:00
* Inheritance: yes
* Variants: no
* Changed by: kopilogi (19)


Fields Summary: 
- pageLimit [numeric]
- defaultOrderByInheritance [select]
- defaultOrderBy [fieldcollections]
- orderByAsc [indexFieldSelectionField]
- orderByDesc [indexFieldSelectionField]
- ajaxReload [checkbox]
- infiniteScroll [checkbox]
- limitOnFirstLoad [numeric]
- conditionsInheritance [select]
- conditions [fieldcollections]
- filtersInheritance [select]
- filters [fieldcollections]
- crossSellingCategory [manyToOneRelation]
- similarityFieldsInheritance [select]
- similarityFields [fieldcollections]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByPageLimit ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByDefaultOrderByInheritance ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByDefaultOrderBy ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByOrderByAsc ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByOrderByDesc ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByAjaxReload ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByInfiniteScroll ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByLimitOnFirstLoad ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByConditionsInheritance ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByConditions ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByFiltersInheritance ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByFilters ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getByCrossSellingCategory ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getBySimilarityFieldsInheritance ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\FilterDefinition\Listing getBySimilarityFields ($value, $limit = 0) 
*/

class FilterDefinition extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\AbstractFilterDefinition implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "7";
protected $o_className = "FilterDefinition";
protected $pageLimit;
protected $defaultOrderByInheritance;
protected $defaultOrderBy;
protected $orderByAsc;
protected $orderByDesc;
protected $ajaxReload;
protected $infiniteScroll;
protected $limitOnFirstLoad;
protected $conditionsInheritance;
protected $conditions;
protected $filtersInheritance;
protected $filters;
protected $crossSellingCategory;
protected $similarityFieldsInheritance;
protected $similarityFields;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get pageLimit - Results per Page
* @return float
*/
public function getPageLimit () {
	$preValue = $this->preGetValue("pageLimit"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->pageLimit;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("pageLimit")->isEmpty($data)) {
		return $this->getValueFromParent("pageLimit");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set pageLimit - Results per Page
* @param float $pageLimit
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setPageLimit ($pageLimit) {
	$fd = $this->getClass()->getFieldDefinition("pageLimit");
	$this->pageLimit = $pageLimit;
	return $this;
}

/**
* Get defaultOrderByInheritance - inherit Default OrderBy
* @return string
*/
public function getDefaultOrderByInheritance () {
	$preValue = $this->preGetValue("defaultOrderByInheritance"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->defaultOrderByInheritance;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("defaultOrderByInheritance")->isEmpty($data)) {
		return $this->getValueFromParent("defaultOrderByInheritance");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set defaultOrderByInheritance - inherit Default OrderBy
* @param string $defaultOrderByInheritance
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setDefaultOrderByInheritance ($defaultOrderByInheritance) {
	$fd = $this->getClass()->getFieldDefinition("defaultOrderByInheritance");
	$this->defaultOrderByInheritance = $defaultOrderByInheritance;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getDefaultOrderBy () {
	$preValue = $this->preGetValue("defaultOrderBy"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("defaultOrderBy")->preGetData($this);
	 return $data;
}

/**
* Set defaultOrderBy - Default OrderBy
* @param \Pimcore\Model\DataObject\Fieldcollection $defaultOrderBy
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setDefaultOrderBy ($defaultOrderBy) {
	$fd = $this->getClass()->getFieldDefinition("defaultOrderBy");
	$this->defaultOrderBy = $fd->preSetData($this, $defaultOrderBy);
	return $this;
}

/**
* Get orderByAsc - OrderBy
* @return string
*/
public function getOrderByAsc () {
	$preValue = $this->preGetValue("orderByAsc"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->orderByAsc;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("orderByAsc")->isEmpty($data)) {
		return $this->getValueFromParent("orderByAsc");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set orderByAsc - OrderBy
* @param string $orderByAsc
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setOrderByAsc ($orderByAsc) {
	$fd = $this->getClass()->getFieldDefinition("orderByAsc");
	$this->orderByAsc = $orderByAsc;
	return $this;
}

/**
* Get orderByDesc - OrderBy Descending
* @return string
*/
public function getOrderByDesc () {
	$preValue = $this->preGetValue("orderByDesc"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->orderByDesc;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("orderByDesc")->isEmpty($data)) {
		return $this->getValueFromParent("orderByDesc");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set orderByDesc - OrderBy Descending
* @param string $orderByDesc
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setOrderByDesc ($orderByDesc) {
	$fd = $this->getClass()->getFieldDefinition("orderByDesc");
	$this->orderByDesc = $orderByDesc;
	return $this;
}

/**
* Get ajaxReload - ajaxReload
* @return boolean
*/
public function getAjaxReload () {
	$preValue = $this->preGetValue("ajaxReload"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->ajaxReload;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("ajaxReload")->isEmpty($data)) {
		return $this->getValueFromParent("ajaxReload");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set ajaxReload - ajaxReload
* @param boolean $ajaxReload
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setAjaxReload ($ajaxReload) {
	$fd = $this->getClass()->getFieldDefinition("ajaxReload");
	$this->ajaxReload = $ajaxReload;
	return $this;
}

/**
* Get infiniteScroll - Infinite Scroll
* @return boolean
*/
public function getInfiniteScroll () {
	$preValue = $this->preGetValue("infiniteScroll"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->infiniteScroll;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("infiniteScroll")->isEmpty($data)) {
		return $this->getValueFromParent("infiniteScroll");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set infiniteScroll - Infinite Scroll
* @param boolean $infiniteScroll
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setInfiniteScroll ($infiniteScroll) {
	$fd = $this->getClass()->getFieldDefinition("infiniteScroll");
	$this->infiniteScroll = $infiniteScroll;
	return $this;
}

/**
* Get limitOnFirstLoad - Limit on First Load
* @return float
*/
public function getLimitOnFirstLoad () {
	$preValue = $this->preGetValue("limitOnFirstLoad"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->limitOnFirstLoad;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("limitOnFirstLoad")->isEmpty($data)) {
		return $this->getValueFromParent("limitOnFirstLoad");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set limitOnFirstLoad - Limit on First Load
* @param float $limitOnFirstLoad
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setLimitOnFirstLoad ($limitOnFirstLoad) {
	$fd = $this->getClass()->getFieldDefinition("limitOnFirstLoad");
	$this->limitOnFirstLoad = $limitOnFirstLoad;
	return $this;
}

/**
* Get conditionsInheritance - inherit Conditions
* @return string
*/
public function getConditionsInheritance () {
	$preValue = $this->preGetValue("conditionsInheritance"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->conditionsInheritance;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("conditionsInheritance")->isEmpty($data)) {
		return $this->getValueFromParent("conditionsInheritance");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set conditionsInheritance - inherit Conditions
* @param string $conditionsInheritance
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setConditionsInheritance ($conditionsInheritance) {
	$fd = $this->getClass()->getFieldDefinition("conditionsInheritance");
	$this->conditionsInheritance = $conditionsInheritance;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getConditions () {
	$preValue = $this->preGetValue("conditions"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("conditions")->preGetData($this);
	 return $data;
}

/**
* Set conditions - Conditions
* @param \Pimcore\Model\DataObject\Fieldcollection $conditions
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setConditions ($conditions) {
	$fd = $this->getClass()->getFieldDefinition("conditions");
	$this->conditions = $fd->preSetData($this, $conditions);
	return $this;
}

/**
* Get filtersInheritance - inherit Filters
* @return string
*/
public function getFiltersInheritance () {
	$preValue = $this->preGetValue("filtersInheritance"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->filtersInheritance;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("filtersInheritance")->isEmpty($data)) {
		return $this->getValueFromParent("filtersInheritance");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set filtersInheritance - inherit Filters
* @param string $filtersInheritance
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setFiltersInheritance ($filtersInheritance) {
	$fd = $this->getClass()->getFieldDefinition("filtersInheritance");
	$this->filtersInheritance = $filtersInheritance;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getFilters () {
	$preValue = $this->preGetValue("filters"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("filters")->preGetData($this);
	 return $data;
}

/**
* Set filters - Filters
* @param \Pimcore\Model\DataObject\Fieldcollection $filters
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setFilters ($filters) {
	$fd = $this->getClass()->getFieldDefinition("filters");
	$this->filters = $fd->preSetData($this, $filters);
	return $this;
}

/**
* Get crossSellingCategory - Base category for recommendations
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function getCrossSellingCategory () {
	$preValue = $this->preGetValue("crossSellingCategory"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("crossSellingCategory")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("crossSellingCategory")->isEmpty($data)) {
		return $this->getValueFromParent("crossSellingCategory");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set crossSellingCategory - Base category for recommendations
* @param \Pimcore\Model\DataObject\ProductCategory $crossSellingCategory
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setCrossSellingCategory ($crossSellingCategory) {
	$fd = $this->getClass()->getFieldDefinition("crossSellingCategory");
	$currentData = $this->getCrossSellingCategory();
	$isEqual = $fd->isEqual($currentData, $crossSellingCategory);
	if (!$isEqual) {
		$this->markFieldDirty("crossSellingCategory", true);
	}
	$this->crossSellingCategory = $fd->preSetData($this, $crossSellingCategory);
	return $this;
}

/**
* Get similarityFieldsInheritance - inherit SimilarityFields
* @return string
*/
public function getSimilarityFieldsInheritance () {
	$preValue = $this->preGetValue("similarityFieldsInheritance"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->similarityFieldsInheritance;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("similarityFieldsInheritance")->isEmpty($data)) {
		return $this->getValueFromParent("similarityFieldsInheritance");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set similarityFieldsInheritance - inherit SimilarityFields
* @param string $similarityFieldsInheritance
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setSimilarityFieldsInheritance ($similarityFieldsInheritance) {
	$fd = $this->getClass()->getFieldDefinition("similarityFieldsInheritance");
	$this->similarityFieldsInheritance = $similarityFieldsInheritance;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getSimilarityFields () {
	$preValue = $this->preGetValue("similarityFields"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("similarityFields")->preGetData($this);
	 return $data;
}

/**
* Set similarityFields - SimilarityFields
* @param \Pimcore\Model\DataObject\Fieldcollection $similarityFields
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function setSimilarityFields ($similarityFields) {
	$fd = $this->getClass()->getFieldDefinition("similarityFields");
	$this->similarityFields = $fd->preSetData($this, $similarityFields);
	return $this;
}

protected static $_relationFields = array (
  'crossSellingCategory' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'similarityFields',
);

}

