<?php 

/** 
* Generated at: 2019-03-21T10:06:49+01:00
* Inheritance: no
* Variants: no


Fields Summary: 
- localizedfields [localizedfields]
-- icon [image]
-- name [input]
-- seoname [input]
-- description [wysiwyg]
-- link [link]
-- images [manyToManyRelation]
-- documents [manyToManyRelation]
-- videos [manyToManyRelation]
-- downloads [manyToManyRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\ProductAttribute\Listing getByLocalizedfields ($field, $value, $locale = null, $limit = 0) 
*/

class ProductAttribute extends Concrete implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "23";
protected $o_className = "ProductAttribute";
protected $localizedfields;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get localizedfields - Base
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
* Get link - Further Details Document (read more)
* @return \Pimcore\Model\DataObject\Data\Link
*/
public function getLink ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("link", $language);
	$preValue = $this->preGetValue("link"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get images - Images
* @return \Pimcore\Model\Asset[]
*/
public function getImages ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("images", $language);
	$preValue = $this->preGetValue("images"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get documents - Documents
* @return \Pimcore\Model\Document\Page[] | \Pimcore\Model\Document\Snippet[] | \Pimcore\Model\Document[]
*/
public function getDocuments ($language = null) {
	$data = $this->getLocalizedfields()->getLocalizedValue("documents", $language);
	$preValue = $this->preGetValue("documents"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Get videos - Videos
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
* Get downloads - Downloads
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
* Set localizedfields - Base
* @param \Pimcore\Model\DataObject\Localizedfield $localizedfields
* @return \Pimcore\Model\DataObject\ProductAttribute
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
* Set icon - Icon
* @param \Pimcore\Model\Asset\Image $icon
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setIcon ($icon, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("icon", $icon, $language, !$isEqual);
	return $this;
}

/**
* Set name - Name
* @param string $name
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setName ($name, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("name", $name, $language, !$isEqual);
	return $this;
}

/**
* Set seoname - SEO Name
* @param string $seoname
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setSeoname ($seoname, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("seoname", $seoname, $language, !$isEqual);
	return $this;
}

/**
* Set description - Description
* @param string $description
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setDescription ($description, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("description", $description, $language, !$isEqual);
	return $this;
}

/**
* Set link - Further Details Document (read more)
* @param \Pimcore\Model\DataObject\Data\Link $link
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setLink ($link, $language = null) {
	$isEqual = false;
	$this->getLocalizedfields()->setLocalizedValue("link", $link, $language, !$isEqual);
	return $this;
}

/**
* Set images - Images
* @param \Pimcore\Model\Asset[] $images
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setImages ($images, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("images");
	$currentData = $this->getImages($language);
	$isEqual = $fd->isEqual($currentData, $images);
	$this->getLocalizedfields()->setLocalizedValue("images", $images, $language, !$isEqual);
	return $this;
}

/**
* Set documents - Documents
* @param \Pimcore\Model\Document\Page[] | \Pimcore\Model\Document\Snippet[] | \Pimcore\Model\Document[] $documents
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setDocuments ($documents, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("documents");
	$currentData = $this->getDocuments($language);
	$isEqual = $fd->isEqual($currentData, $documents);
	$this->getLocalizedfields()->setLocalizedValue("documents", $documents, $language, !$isEqual);
	return $this;
}

/**
* Set videos - Videos
* @param \Pimcore\Model\Asset\Video[] $videos
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setVideos ($videos, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("videos");
	$currentData = $this->getVideos($language);
	$isEqual = $fd->isEqual($currentData, $videos);
	$this->getLocalizedfields()->setLocalizedValue("videos", $videos, $language, !$isEqual);
	return $this;
}

/**
* Set downloads - Downloads
* @param \Pimcore\Model\Asset[] $downloads
* @return \Pimcore\Model\DataObject\ProductAttribute
*/
public function setDownloads ($downloads, $language = null) {
	$fd = $this->getClass()->getFieldDefinition("localizedfields")->getFieldDefinition("downloads");
	$currentData = $this->getDownloads($language);
	$isEqual = $fd->isEqual($currentData, $downloads);
	$this->getLocalizedfields()->setLocalizedValue("downloads", $downloads, $language, !$isEqual);
	return $this;
}

protected static $_relationFields = array (
);

protected $lazyLoadedFields = array (
);

}

