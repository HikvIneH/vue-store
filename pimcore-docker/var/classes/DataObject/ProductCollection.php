<?php 

/** 
* Generated at: 2019-03-21T10:06:49+01:00
* Inheritance: no
* Variants: no


Fields Summary: 
- localizedfields [localizedfields]
-- name [input]
-- description [wysiwyg]
-- icon [image]
-- usage [select]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\ProductCollection\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
*/

class ProductCollection extends Concrete implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "15";
protected $o_className = "ProductCollection";
protected $localizedfields;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\ProductCollection
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
* Get icon - Icon
* @return \Pimcore\Model\Asset\Image
*/
public function getIcon ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("icon", $language);
	$preValue = $this->preGetValue("icon"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get usage - Type (usage)
* @return string
*/
public function getUsage ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("usage", $language);
	$preValue = $this->preGetValue("usage"); 
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
* @return \Pimcore\Model\DataObject\ProductCollection
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
* @return \Pimcore\Model\DataObject\ProductCollection
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set description - Description
* @param string $description
* @return \Pimcore\Model\DataObject\ProductCollection
*/
public function setDescription ($description, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("description", $description, $language, !$isEqual);
	return $this;
}

/**
* Set icon - Icon
* @param \Pimcore\Model\Asset\Image $icon
* @return \Pimcore\Model\DataObject\ProductCollection
*/
public function setIcon ($icon, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("icon", $icon, $language, !$isEqual);
	return $this;
}

/**
* Set usage - Type (usage)
* @param string $usage
* @return \Pimcore\Model\DataObject\ProductCollection
*/
public function setUsage ($usage, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("usage", $usage, $language, !$isEqual);
	return $this;
}

protected static $_relationFields = array (
);

protected $lazyLoadedFields = array (
);

}

