<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- localizedfields [localizedfields]
-- name [input]
-- description [textarea]
-- pimcoreMetaTitle [input]
-- pimcoreMetaDescription [textarea]
- filter [coreShopFilter]
- stores [coreShopStoreMultiselect]
- parentCategory [manyToOneRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopCategory\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCategory\Listing getByFilter ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCategory\Listing getByStores ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCategory\Listing getByParentCategory ($value, $limit = 0) 
*/

class CoreShopCategory extends \CoreShop\Component\Core\Model\Category implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "54";
protected $o_className = "CoreShopCategory";
protected $localizedfields;
protected $filter;
protected $stores;
protected $parentCategory;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get localizedfields - 
* @return \Pimcore\Model\DataObject\Localizedfield
*/
public function getLocalizedfields () {
	$preValue = $this->preGetValue("localizedfields"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("localizedfields")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Get name - Name
* @return string
*/
public function getName ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("name", $language);
	$preValue = $this->preGetValue("name"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get description - Description
* @return string
*/
public function getDescription ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("description", $language);
	$preValue = $this->preGetValue("description"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get pimcoreMetaTitle - Meta Title
* @return string
*/
public function getPimcoreMetaTitle ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("pimcoreMetaTitle", $language);
	$preValue = $this->preGetValue("pimcoreMetaTitle"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get pimcoreMetaDescription - Meta Description
* @return string
*/
public function getPimcoreMetaDescription ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("pimcoreMetaDescription", $language);
	$preValue = $this->preGetValue("pimcoreMetaDescription"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set localizedfields - 
* @param \Pimcore\Model\DataObject\Localizedfield $localizedfields
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setLocalizedfields ($localizedfields) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields");
	$currentData = $this->getLocalizedfields();
	$isEqual = $fd->isEqual($currentData, $localizedfields);
	if (!$isEqual) {
		$this->markFieldDirty("localizedfields", true);
	}
	$this->localizedfields = $localizedfields;
	return $this;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set description - Description
* @param string $description
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setDescription ($description, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("description", $description, $language, !$isEqual);
	return $this;
}

/**
* Set pimcoreMetaTitle - Meta Title
* @param string $pimcoreMetaTitle
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setPimcoreMetaTitle ($pimcoreMetaTitle, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("pimcoreMetaTitle", $pimcoreMetaTitle, $language, !$isEqual);
	return $this;
}

/**
* Set pimcoreMetaDescription - Meta Description
* @param string $pimcoreMetaDescription
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setPimcoreMetaDescription ($pimcoreMetaDescription, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("pimcoreMetaDescription", $pimcoreMetaDescription, $language, !$isEqual);
	return $this;
}

/**
* Get filter - Filter
* @return CoreShop\Component\Index\Model\Filter
*/
public function getFilter () {
	$preValue = $this->preGetValue("filter"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("filter")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set filter - Filter
* @param CoreShop\Component\Index\Model\Filter $filter
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setFilter ($filter) {
	$fd = $this->getClass()->getFieldDefinition("filter");
	$this->filter = $fd->preSetData($this, $filter);
	return $this;
}

/**
* Get stores - Stores
* @return array
*/
public function getStores () {
	$preValue = $this->preGetValue("stores"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("stores")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set stores - Stores
* @param array $stores
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setStores ($stores) {
	$fd = $this->getClass()->getFieldDefinition("stores");
	$this->stores = $stores;
	return $this;
}

/**
* Get parentCategory - Parent Category
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function getParentCategory () {
	$preValue = $this->preGetValue("parentCategory"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("parentCategory")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set parentCategory - Parent Category
* @param \Pimcore\Model\DataObject\CoreShopCategory $parentCategory
* @return \Pimcore\Model\DataObject\CoreShopCategory
*/
public function setParentCategory ($parentCategory) {
	$fd = $this->getClass()->getFieldDefinition("parentCategory");
	$currentData = $this->getParentCategory();
	$isEqual = $fd->isEqual($currentData, $parentCategory);
	if (!$isEqual) {
		$this->markFieldDirty("parentCategory", true);
	}
	$this->parentCategory = $fd->preSetData($this, $parentCategory);
	return $this;
}

protected static $_relationFields = array (
  'parentCategory' => 
  array (
    'type' => 'manyToOneRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'parentCategory',
);

}

