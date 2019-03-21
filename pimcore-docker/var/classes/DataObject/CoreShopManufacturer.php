<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- name [input]
- image [image]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopManufacturer\Listing getByName ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopManufacturer\Listing getByImage ($value, $limit = 0) 
*/

class CoreShopManufacturer extends \CoreShop\Component\Product\Model\Manufacturer implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "56";
protected $o_className = "CoreShopManufacturer";
protected $name;
protected $image;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopManufacturer
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get name - Name
* @return string
*/
public function getName () {
	$preValue = $this->preGetValue("name"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->name;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\CoreShopManufacturer
*/
public function setName ($name) {
	$fd = $this->getClass()->getFieldDefinition("name");
	$this->name = $name;
	return $this;
}

/**
* Get image - Image
* @return \Pimcore\Model\Asset\Image
*/
public function getImage () {
	$preValue = $this->preGetValue("image"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->image;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set image - Image
* @param \Pimcore\Model\Asset\Image $image
* @return \Pimcore\Model\DataObject\CoreShopManufacturer
*/
public function setImage ($image) {
	$fd = $this->getClass()->getFieldDefinition("image");
	$this->image = $image;
	return $this;
}

protected static $_relationFields = array (
);

protected $lazyLoadedFields = array (
);

}

