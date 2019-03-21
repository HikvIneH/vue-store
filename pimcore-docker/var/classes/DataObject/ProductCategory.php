<?php 

/** 
* Generated at: 2019-03-21T10:06:49+01:00
* Inheritance: yes
* Variants: no
* Changed by: kopilogi (19)


Fields Summary: 
- localizedfields [localizedfields]
-- image [image]
-- name [input]
-- seoname [input]
-- seotext [wysiwyg]
-- sortkey [numeric]
- filterdefinition [manyToOneRelation]
- priorityProducts [manyToManyObjectRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\ProductCategory\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
* @method static \Pimcore\Model\DataObject\ProductCategory\Listing getByFilterdefinition ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\ProductCategory\Listing getByPriorityProducts ($value, $limit = 0) 
*/

class ProductCategory extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\AbstractCategory implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "14";
protected $o_className = "ProductCategory";
protected $localizedfields;
protected $filterdefinition;
protected $priorityProducts;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get localizedfields - Basedata
* @return \Pimcore\Model\DataObject\Localizedfield
*/
public function getLocalizedfields () {
	$preValue = $this->preGetValue("localizedfields"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("localizedfields")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("localizedfields")->isEmpty($data)) {
		return $this->getValueFromParent("localizedfields");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Get image - Image
* @return \Pimcore\Model\Asset\Image
*/
public function getImage ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("image", $language);
	$preValue = $this->preGetValue("image"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
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
* Get seoname - SEO Name
* @return string
*/
public function getSeoname ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("seoname", $language);
	$preValue = $this->preGetValue("seoname"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get seotext - SEO Text (fallback)
* @return string
*/
public function getSeotext ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("seotext", $language);
	$preValue = $this->preGetValue("seotext"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get sortkey - Sort Key
* @return float
*/
public function getSortkey ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("sortkey", $language);
	$preValue = $this->preGetValue("sortkey"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set localizedfields - Basedata
* @param \Pimcore\Model\DataObject\Localizedfield $localizedfields
* @return \Pimcore\Model\DataObject\ProductCategory
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
* Set image - Image
* @param \Pimcore\Model\Asset\Image $image
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setImage ($image, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("image", $image, $language, !$isEqual);
	return $this;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set seoname - SEO Name
* @param string $seoname
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setSeoname ($seoname, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("seoname", $seoname, $language, !$isEqual);
	return $this;
}

/**
* Set seotext - SEO Text (fallback)
* @param string $seotext
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setSeotext ($seotext, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("seotext", $seotext, $language, !$isEqual);
	return $this;
}

/**
* Set sortkey - Sort Key
* @param float $sortkey
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setSortkey ($sortkey, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("sortkey", $sortkey, $language, !$isEqual);
	return $this;
}

/**
* Get filterdefinition - Filterdefinition
* @return \Pimcore\Model\DataObject\FilterDefinition
*/
public function getFilterdefinition () {
	$preValue = $this->preGetValue("filterdefinition"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("filterdefinition")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("filterdefinition")->isEmpty($data)) {
		return $this->getValueFromParent("filterdefinition");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set filterdefinition - Filterdefinition
* @param \Pimcore\Model\DataObject\FilterDefinition $filterdefinition
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setFilterdefinition ($filterdefinition) {
	$fd = $this->getClass()->getFieldDefinition("filterdefinition");
	$currentData = $this->getFilterdefinition();
	$isEqual = $fd->isEqual($currentData, $filterdefinition);
	if (!$isEqual) {
		$this->markFieldDirty("filterdefinition", true);
	}
	$this->filterdefinition = $fd->preSetData($this, $filterdefinition);
	return $this;
}

/**
* Get priorityProducts - priorityProducts
* @return \Pimcore\Model\DataObject\Product[]
*/
public function getPriorityProducts () {
	$preValue = $this->preGetValue("priorityProducts"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("priorityProducts")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("priorityProducts")->isEmpty($data)) {
		return $this->getValueFromParent("priorityProducts");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set priorityProducts - priorityProducts
* @param \Pimcore\Model\DataObject\Product[] $priorityProducts
* @return \Pimcore\Model\DataObject\ProductCategory
*/
public function setPriorityProducts ($priorityProducts) {
	$fd = $this->getClass()->getFieldDefinition("priorityProducts");
	$currentData = $this->getPriorityProducts();
	$isEqual = $fd->isEqual($currentData, $priorityProducts);
	if (!$isEqual) {
		$this->markFieldDirty("priorityProducts", true);
	}
	$this->priorityProducts = $fd->preSetData($this, $priorityProducts);
	return $this;
}

protected static $_relationFields = array (
  'filterdefinition' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'priorityProducts' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'priorityProducts',
);

}

