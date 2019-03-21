<?php 

/** 
* Generated at: 2019-03-21T10:06:50+01:00
* Inheritance: yes
* Variants: yes
* Changed by: kopilogi (19)


Fields Summary: 
- localizedfields [localizedfields]
-- name [input]
-- seoname [input]
-- colorName [input]
-- price [numeric]
-- priceOld [numeric]
-- fromPrice [checkbox]
-- description [wysiwyg]
-- material [wysiwyg]
-- downloads [manyToManyRelation]
-- videos [manyToManyRelation]
-- rotation [manyToOneRelation]
-- youtubeVideo [input]
-- textsAvailable [calculatedValue]
- artno [input]
- ean [input]
- size [input]
- brand [manyToOneRelation]
- gender [multiselect]
- categories [manyToManyObjectRelation]
- features [manyToManyObjectRelation]
- technologies [manyToManyObjectRelation]
- attributes [manyToManyObjectRelation]
- collection [manyToManyObjectRelation]
- color [multiselect]
- materialComposition [advancedManyToManyObjectRelation]
- secondaryMaterialComposition [advancedManyToManyObjectRelation]
- imagesInheritance [select]
- images [fieldcollections]
- specificAttributes [objectbricks]
- relatedProducts [manyToManyObjectRelation]
- attributesAvailable [calculatedValue]
- variantsAvailable [calculatedValue]
- wfstate [multiselect]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\Product\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByArtno ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByEan ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getBySize ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByBrand ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByGender ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByCategories ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByFeatures ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByTechnologies ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByAttributes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByCollection ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByColor ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByMaterialComposition ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getBySecondaryMaterialComposition ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByImagesInheritance ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByImages ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getBySpecificAttributes ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByRelatedProducts ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByAttributesAvailable ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByVariantsAvailable ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\Product\Listing getByWfstate ($value, $limit = 0) 
*/

class Product extends \Pimcore\Bundle\EcommerceFrameworkBundle\Model\AbstractProduct implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "12";
protected $o_className = "Product";
protected $localizedfields;
protected $artno;
protected $ean;
protected $size;
protected $brand;
protected $gender;
protected $categories;
protected $features;
protected $technologies;
protected $attributes;
protected $collection;
protected $color;
protected $materialComposition;
protected $secondaryMaterialComposition;
protected $imagesInheritance;
protected $images;
protected $specificAttributes;
protected $relatedProducts;
protected $wfstate;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\Product
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get localizedfields - Attributes
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
* Get colorName - Color Name
* @return string
*/
public function getColorName ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("colorName", $language);
	$preValue = $this->preGetValue("colorName"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get price - Regular Price
* @return string
*/
public function getPrice ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("price", $language);
	$preValue = $this->preGetValue("price"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get priceOld - Price (old)
* @return string
*/
public function getPriceOld ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("priceOld", $language);
	$preValue = $this->preGetValue("priceOld"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get fromPrice - Price is from
* @return boolean
*/
public function getFromPrice ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("fromPrice", $language);
	$preValue = $this->preGetValue("fromPrice"); 
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
* Get material - Material
* @return string
*/
public function getMaterial ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("material", $language);
	$preValue = $this->preGetValue("material"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get downloads - Downloads (PDFs for Instructions etc)
* @return \Pimcore\Model\Asset[]
*/
public function getDownloads ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("downloads", $language);
	$preValue = $this->preGetValue("downloads"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get videos - Videos (f4v)
* @return \Pimcore\Model\Asset\Video[]
*/
public function getVideos ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("videos", $language);
	$preValue = $this->preGetValue("videos"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get rotation - 360° Rotation
* @return \Pimcore\Model\Document\Link | \Pimcore\Model\Asset
*/
public function getRotation ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("rotation", $language);
	$preValue = $this->preGetValue("rotation"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get youtubeVideo - YouTube Video
* @return string
*/
public function getYoutubeVideo ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("youtubeVideo", $language);
	$preValue = $this->preGetValue("youtubeVideo"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get textsAvailable -   Texts Available
* @return \Pimcore\Model\DataObject\Data\CalculatedValue
*/
public function getTextsAvailable ($language = null) {
	if (!$language) {
		try {
			$locale = \Pimcore::getContainer()->get("pimcore.locale")->findLocale();
			if (\Pimcore\Tool::isValidLanguage($locale)) {
				$language = (string) $locale;
			} else {
				throw new \Exception("Not supported language");
			}
		} catch (\Exception $e) {
			$language = \Pimcore\Tool::getDefaultLanguage();
		}
	}
	$data = new \Pimcore\Model\DataObject\Data\CalculatedValue('textsAvailable');
	$data->setContextualData("localizedfield", "localizedfields", null, $language);
	$data = Service::getCalculatedFieldValue($this, $data);
	return $data;
	}

/**
* Set localizedfields - Attributes
* @param \Pimcore\Model\DataObject\Localizedfield $localizedfields
* @return \Pimcore\Model\DataObject\Product
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
* @return \Pimcore\Model\DataObject\Product
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set seoname - SEO Name
* @param string $seoname
* @return \Pimcore\Model\DataObject\Product
*/
public function setSeoname ($seoname, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("seoname", $seoname, $language, !$isEqual);
	return $this;
}

/**
* Set colorName - Color Name
* @param string $colorName
* @return \Pimcore\Model\DataObject\Product
*/
public function setColorName ($colorName, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("colorName", $colorName, $language, !$isEqual);
	return $this;
}

/**
* Set price - Regular Price
* @param string $price
* @return \Pimcore\Model\DataObject\Product
*/
public function setPrice ($price, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("price", $price, $language, !$isEqual);
	return $this;
}

/**
* Set priceOld - Price (old)
* @param string $priceOld
* @return \Pimcore\Model\DataObject\Product
*/
public function setPriceOld ($priceOld, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("priceOld", $priceOld, $language, !$isEqual);
	return $this;
}

/**
* Set fromPrice - Price is from
* @param boolean $fromPrice
* @return \Pimcore\Model\DataObject\Product
*/
public function setFromPrice ($fromPrice, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("fromPrice", $fromPrice, $language, !$isEqual);
	return $this;
}

/**
* Set description - Description
* @param string $description
* @return \Pimcore\Model\DataObject\Product
*/
public function setDescription ($description, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("description", $description, $language, !$isEqual);
	return $this;
}

/**
* Set material - Material
* @param string $material
* @return \Pimcore\Model\DataObject\Product
*/
public function setMaterial ($material, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("material", $material, $language, !$isEqual);
	return $this;
}

/**
* Set downloads - Downloads (PDFs for Instructions etc)
* @param \Pimcore\Model\Asset[] $downloads
* @return \Pimcore\Model\DataObject\Product
*/
public function setDownloads ($downloads, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("downloads");
	$currentData = $this->getDownloads($language);
	$isEqual = $fd->isEqual($currentData, $downloads);
	$this->getLocalizedfields()->setLocalizedValue("downloads", $downloads, $language, !$isEqual);
	return $this;
}

/**
* Set videos - Videos (f4v)
* @param \Pimcore\Model\Asset\Video[] $videos
* @return \Pimcore\Model\DataObject\Product
*/
public function setVideos ($videos, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("videos");
	$currentData = $this->getVideos($language);
	$isEqual = $fd->isEqual($currentData, $videos);
	$this->getLocalizedfields()->setLocalizedValue("videos", $videos, $language, !$isEqual);
	return $this;
}

/**
* Set rotation - 360° Rotation
* @param \Pimcore\Model\Document\Link | \Pimcore\Model\Asset $rotation
* @return \Pimcore\Model\DataObject\Product
*/
public function setRotation ($rotation, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("rotation");
	$currentData = $this->getRotation($language);
	$isEqual = $fd->isEqual($currentData, $rotation);
	$this->getLocalizedfields()->setLocalizedValue("rotation", $rotation, $language, !$isEqual);
	return $this;
}

/**
* Set youtubeVideo - YouTube Video
* @param string $youtubeVideo
* @return \Pimcore\Model\DataObject\Product
*/
public function setYoutubeVideo ($youtubeVideo, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("youtubeVideo", $youtubeVideo, $language, !$isEqual);
	return $this;
}

/**
* Set textsAvailable -   Texts Available
* @param \Pimcore\Model\DataObject\Data\CalculatedValue $textsAvailable
* @return \Pimcore\Model\DataObject\Product
*/
public function setTextsAvailable ($textsAvailable, $language = null) {
	return $this;
}

/**
* Get artno - Article Number
* @return string
*/
public function getArtno () {
	$preValue = $this->preGetValue("artno"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->artno;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("artno")->isEmpty($data)) {
		return $this->getValueFromParent("artno");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set artno - Article Number
* @param string $artno
* @return \Pimcore\Model\DataObject\Product
*/
public function setArtno ($artno) {
	$fd = $this->getClass()->getFieldDefinition("artno");
	$this->artno = $artno;
	return $this;
}

/**
* Get ean - EAN-Code
* @return string
*/
public function getEan () {
	$preValue = $this->preGetValue("ean"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->ean;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("ean")->isEmpty($data)) {
		return $this->getValueFromParent("ean");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set ean - EAN-Code
* @param string $ean
* @return \Pimcore\Model\DataObject\Product
*/
public function setEan ($ean) {
	$fd = $this->getClass()->getFieldDefinition("ean");
	$this->ean = $ean;
	return $this;
}

/**
* Get size - Size
* @return string
*/
public function getSize () {
	$preValue = $this->preGetValue("size"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->size;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("size")->isEmpty($data)) {
		return $this->getValueFromParent("size");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set size - Size
* @param string $size
* @return \Pimcore\Model\DataObject\Product
*/
public function setSize ($size) {
	$fd = $this->getClass()->getFieldDefinition("size");
	$this->size = $size;
	return $this;
}

/**
* Get brand - Brand
* @return \Pimcore\Model\DataObject\ProductBrand
*/
public function getBrand () {
	$preValue = $this->preGetValue("brand"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("brand")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("brand")->isEmpty($data)) {
		return $this->getValueFromParent("brand");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set brand - Brand
* @param \Pimcore\Model\DataObject\ProductBrand $brand
* @return \Pimcore\Model\DataObject\Product
*/
public function setBrand ($brand) {
	$fd = $this->getClass()->getFieldDefinition("brand");
	$currentData = $this->getBrand();
	$isEqual = $fd->isEqual($currentData, $brand);
	if (!$isEqual) {
		$this->markFieldDirty("brand", true);
	}
	$this->brand = $fd->preSetData($this, $brand);
	return $this;
}

/**
* Get gender - Gender
* @return array
*/
public function getGender () {
	$preValue = $this->preGetValue("gender"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->gender;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("gender")->isEmpty($data)) {
		return $this->getValueFromParent("gender");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set gender - Gender
* @param array $gender
* @return \Pimcore\Model\DataObject\Product
*/
public function setGender ($gender) {
	$fd = $this->getClass()->getFieldDefinition("gender");
	$this->gender = $gender;
	return $this;
}

/**
* Get categories - Categories
* @return \Pimcore\Model\DataObject\ProductCategory[]
*/
public function getCategories () {
	$preValue = $this->preGetValue("categories"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("categories")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("categories")->isEmpty($data)) {
		return $this->getValueFromParent("categories");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set categories - Categories
* @param \Pimcore\Model\DataObject\ProductCategory[] $categories
* @return \Pimcore\Model\DataObject\Product
*/
public function setCategories ($categories) {
	$fd = $this->getClass()->getFieldDefinition("categories");
	$currentData = $this->getCategories();
	$isEqual = $fd->isEqual($currentData, $categories);
	if (!$isEqual) {
		$this->markFieldDirty("categories", true);
	}
	$this->categories = $fd->preSetData($this, $categories);
	return $this;
}

/**
* Get features - Features
* @return \Pimcore\Model\DataObject\ProductAttribute[] | \Pimcore\Model\DataObject\ProductTechnology[]
*/
public function getFeatures () {
	$preValue = $this->preGetValue("features"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("features")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("features")->isEmpty($data)) {
		return $this->getValueFromParent("features");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set features - Features
* @param \Pimcore\Model\DataObject\ProductAttribute[] | \Pimcore\Model\DataObject\ProductTechnology[] $features
* @return \Pimcore\Model\DataObject\Product
*/
public function setFeatures ($features) {
	$fd = $this->getClass()->getFieldDefinition("features");
	$currentData = $this->getFeatures();
	$isEqual = $fd->isEqual($currentData, $features);
	if (!$isEqual) {
		$this->markFieldDirty("features", true);
	}
	$this->features = $fd->preSetData($this, $features);
	return $this;
}

/**
* Get technologies - Technologies
* @return \Pimcore\Model\DataObject\ProductTechnology[] | \Pimcore\Model\DataObject\ProductAttribute[]
*/
public function getTechnologies () {
	$preValue = $this->preGetValue("technologies"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("technologies")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("technologies")->isEmpty($data)) {
		return $this->getValueFromParent("technologies");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set technologies - Technologies
* @param \Pimcore\Model\DataObject\ProductTechnology[] | \Pimcore\Model\DataObject\ProductAttribute[] $technologies
* @return \Pimcore\Model\DataObject\Product
*/
public function setTechnologies ($technologies) {
	$fd = $this->getClass()->getFieldDefinition("technologies");
	$currentData = $this->getTechnologies();
	$isEqual = $fd->isEqual($currentData, $technologies);
	if (!$isEqual) {
		$this->markFieldDirty("technologies", true);
	}
	$this->technologies = $fd->preSetData($this, $technologies);
	return $this;
}

/**
* Get attributes - Attributes
* @return \Pimcore\Model\DataObject\AbstractObject[]
*/
public function getAttributes () {
	$preValue = $this->preGetValue("attributes"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("attributes")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("attributes")->isEmpty($data)) {
		return $this->getValueFromParent("attributes");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set attributes - Attributes
* @param \Pimcore\Model\DataObject\AbstractObject[] $attributes
* @return \Pimcore\Model\DataObject\Product
*/
public function setAttributes ($attributes) {
	$fd = $this->getClass()->getFieldDefinition("attributes");
	$currentData = $this->getAttributes();
	$isEqual = $fd->isEqual($currentData, $attributes);
	if (!$isEqual) {
		$this->markFieldDirty("attributes", true);
	}
	$this->attributes = $fd->preSetData($this, $attributes);
	return $this;
}

/**
* Get collection - Collection
* @return \Pimcore\Model\DataObject\AbstractObject[]
*/
public function getCollection () {
	$preValue = $this->preGetValue("collection"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("collection")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("collection")->isEmpty($data)) {
		return $this->getValueFromParent("collection");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set collection - Collection
* @param \Pimcore\Model\DataObject\AbstractObject[] $collection
* @return \Pimcore\Model\DataObject\Product
*/
public function setCollection ($collection) {
	$fd = $this->getClass()->getFieldDefinition("collection");
	$currentData = $this->getCollection();
	$isEqual = $fd->isEqual($currentData, $collection);
	if (!$isEqual) {
		$this->markFieldDirty("collection", true);
	}
	$this->collection = $fd->preSetData($this, $collection);
	return $this;
}

/**
* Get color - Color(s)
* @return array
*/
public function getColor () {
	$preValue = $this->preGetValue("color"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->color;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("color")->isEmpty($data)) {
		return $this->getValueFromParent("color");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set color - Color(s)
* @param array $color
* @return \Pimcore\Model\DataObject\Product
*/
public function setColor ($color) {
	$fd = $this->getClass()->getFieldDefinition("color");
	$this->color = $color;
	return $this;
}

/**
* Get materialComposition - Material Composition
* @return \Pimcore\Model\DataObject\AbstractObject[]
*/
public function getMaterialComposition () {
	$preValue = $this->preGetValue("materialComposition"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("materialComposition")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("materialComposition")->isEmpty($data)) {
		return $this->getValueFromParent("materialComposition");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set materialComposition - Material Composition
* @param \Pimcore\Model\DataObject\AbstractObject[] $materialComposition
* @return \Pimcore\Model\DataObject\Product
*/
public function setMaterialComposition ($materialComposition) {
	$fd = $this->getClass()->getFieldDefinition("materialComposition");
	$currentData = $this->getMaterialComposition();
	$isEqual = $fd->isEqual($currentData, $materialComposition);
	if (!$isEqual) {
		$this->markFieldDirty("materialComposition", true);
	}
	$this->materialComposition = $fd->preSetData($this, $materialComposition);
	return $this;
}

/**
* Get secondaryMaterialComposition - Secondary Material Composition
* @return \Pimcore\Model\DataObject\AbstractObject[]
*/
public function getSecondaryMaterialComposition () {
	$preValue = $this->preGetValue("secondaryMaterialComposition"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("secondaryMaterialComposition")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("secondaryMaterialComposition")->isEmpty($data)) {
		return $this->getValueFromParent("secondaryMaterialComposition");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set secondaryMaterialComposition - Secondary Material Composition
* @param \Pimcore\Model\DataObject\AbstractObject[] $secondaryMaterialComposition
* @return \Pimcore\Model\DataObject\Product
*/
public function setSecondaryMaterialComposition ($secondaryMaterialComposition) {
	$fd = $this->getClass()->getFieldDefinition("secondaryMaterialComposition");
	$currentData = $this->getSecondaryMaterialComposition();
	$isEqual = $fd->isEqual($currentData, $secondaryMaterialComposition);
	if (!$isEqual) {
		$this->markFieldDirty("secondaryMaterialComposition", true);
	}
	$this->secondaryMaterialComposition = $fd->preSetData($this, $secondaryMaterialComposition);
	return $this;
}

/**
* Get imagesInheritance - Inheritance
* @return string
*/
public function getImagesInheritance () {
	$preValue = $this->preGetValue("imagesInheritance"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->imagesInheritance;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("imagesInheritance")->isEmpty($data)) {
		return $this->getValueFromParent("imagesInheritance");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set imagesInheritance - Inheritance
* @param string $imagesInheritance
* @return \Pimcore\Model\DataObject\Product
*/
public function setImagesInheritance ($imagesInheritance) {
	$fd = $this->getClass()->getFieldDefinition("imagesInheritance");
	$this->imagesInheritance = $imagesInheritance;
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Fieldcollection
*/
public function getImages () {
	$preValue = $this->preGetValue("images"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	$data = $this->getClass()->getFieldDefinition("images")->preGetData($this);
	 return $data;
}

/**
* Set images - Images
* @param \Pimcore\Model\DataObject\Fieldcollection $images
* @return \Pimcore\Model\DataObject\Product
*/
public function setImages ($images) {
	$fd = $this->getClass()->getFieldDefinition("images");
	$this->images = $fd->preSetData($this, $images);
	return $this;
}

/**
* @return \Pimcore\Model\DataObject\Objectbrick
*/
public function getSpecificAttributes () {
	$data = $this->specificAttributes;
	if(!$data) { 
		if(\Pimcore\Tool::classExists("\\Pimcore\\Model\\DataObject\\Product\\SpecificAttributes")) { 
			$data = new \Pimcore\Model\DataObject\Product\SpecificAttributes($this, "specificAttributes");
			$this->specificAttributes = $data;
		} else {
			return null;
		}
	}
	$preValue = $this->preGetValue("specificAttributes"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { return $preValue;}
	 return $data;
}

/**
* Set specificAttributes - Attributes
* @param \Pimcore\Model\DataObject\Objectbrick $specificAttributes
* @return \Pimcore\Model\DataObject\Product
*/
public function setSpecificAttributes ($specificAttributes) {
	$fd = $this->getClass()->getFieldDefinition("specificAttributes");
	$this->specificAttributes = $fd->preSetData($this, $specificAttributes);
	return $this;
}

/**
* Get relatedProducts - Related Products
* @return \Pimcore\Model\DataObject\Product[]
*/
public function getRelatedProducts () {
	$preValue = $this->preGetValue("relatedProducts"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("relatedProducts")->preGetData($this);
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("relatedProducts")->isEmpty($data)) {
		return $this->getValueFromParent("relatedProducts");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set relatedProducts - Related Products
* @param \Pimcore\Model\DataObject\Product[] $relatedProducts
* @return \Pimcore\Model\DataObject\Product
*/
public function setRelatedProducts ($relatedProducts) {
	$fd = $this->getClass()->getFieldDefinition("relatedProducts");
	$currentData = $this->getRelatedProducts();
	$isEqual = $fd->isEqual($currentData, $relatedProducts);
	if (!$isEqual) {
		$this->markFieldDirty("relatedProducts", true);
	}
	$this->relatedProducts = $fd->preSetData($this, $relatedProducts);
	return $this;
}

/**
* Get attributesAvailable -   Attributes Available
* @return \Pimcore\Model\DataObject\Data\CalculatedValue
*/
public function getAttributesAvailable () {
	$data = new \Pimcore\Model\DataObject\Data\CalculatedValue('attributesAvailable');
	$data->setContextualData("object", null, null, null);
	$data = Service::getCalculatedFieldValue($this, $data);
	return $data;
	}

/**
* Set attributesAvailable -   Attributes Available
* @param \Pimcore\Model\DataObject\Data\CalculatedValue $attributesAvailable
* @return \Pimcore\Model\DataObject\Product
*/
public function setAttributesAvailable ($attributesAvailable) {
	return $this;
}

/**
* Get variantsAvailable -   Variants Available
* @return \Pimcore\Model\DataObject\Data\CalculatedValue
*/
public function getVariantsAvailable () {
	$data = new \Pimcore\Model\DataObject\Data\CalculatedValue('variantsAvailable');
	$data->setContextualData("object", null, null, null);
	$data = Service::getCalculatedFieldValue($this, $data);
	return $data;
	}

/**
* Set variantsAvailable -   Variants Available
* @param \Pimcore\Model\DataObject\Data\CalculatedValue $variantsAvailable
* @return \Pimcore\Model\DataObject\Product
*/
public function setVariantsAvailable ($variantsAvailable) {
	return $this;
}

/**
* Get wfstate - wfstate
* @return array
*/
public function getWfstate () {
	$preValue = $this->preGetValue("wfstate"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->wfstate;
	if(\Pimcore\Model\DataObject::doGetInheritedValues() && $this->getClass()->getFieldDefinition("wfstate")->isEmpty($data)) {
		return $this->getValueFromParent("wfstate");
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set wfstate - wfstate
* @param array $wfstate
* @return \Pimcore\Model\DataObject\Product
*/
public function setWfstate ($wfstate) {
	$fd = $this->getClass()->getFieldDefinition("wfstate");
	$this->wfstate = $wfstate;
	return $this;
}

protected static $_relationFields = array (
  'brand' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'categories' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'features' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'technologies' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'attributes' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'collection' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
  'materialComposition' => 
  array (
    'type' => 'advancedManyToManyObjectRelation',
  ),
  'secondaryMaterialComposition' => 
  array (
    'type' => 'advancedManyToManyObjectRelation',
  ),
  'relatedProducts' => 
  array (
    'type' => 'manyToManyObjectRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'brand',
  1 => 'features',
  2 => 'technologies',
  3 => 'attributes',
  4 => 'collection',
  5 => 'materialComposition',
  6 => 'secondaryMaterialComposition',
  7 => 'relatedProducts',
);

}

