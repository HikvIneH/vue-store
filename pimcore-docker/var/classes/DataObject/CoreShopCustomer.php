<?php 

/** 
* Generated at: 2019-03-21T10:28:34+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- salutation [input]
- firstname [firstname]
- lastname [lastname]
- email [email]
- password [password]
- newsletterActive [newsletterActive]
- newsletterConfirmed [newsletterConfirmed]
- newsletterToken [input]
- isGuest [checkbox]
- gender [gender]
- passwordResetHash [input]
- localeCode [input]
- addresses [manyToManyRelation]
- defaultAddress [manyToOneRelation]
- customerGroups [manyToManyRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getBySalutation ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByFirstname ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByLastname ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByEmail ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByPassword ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByNewsletterActive ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByNewsletterConfirmed ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByNewsletterToken ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByIsGuest ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByGender ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByPasswordResetHash ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByLocaleCode ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByAddresses ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByDefaultAddress ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopCustomer\Listing getByCustomerGroups ($value, $limit = 0) 
*/

class CoreShopCustomer extends \CoreShop\Component\Core\Model\Customer implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "53";
protected $o_className = "CoreShopCustomer";
protected $salutation;
protected $firstname;
protected $lastname;
protected $email;
protected $password;
protected $newsletterActive;
protected $newsletterConfirmed;
protected $newsletterToken;
protected $isGuest;
protected $gender;
protected $passwordResetHash;
protected $localeCode;
protected $addresses;
protected $defaultAddress;
protected $customerGroups;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get salutation - Salutation
* @return string
*/
public function getSalutation () {
	$preValue = $this->preGetValue("salutation"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->salutation;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set salutation - Salutation
* @param string $salutation
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setSalutation ($salutation) {
	$fd = $this->getClass()->getFieldDefinition("salutation");
	$this->salutation = $salutation;
	return $this;
}

/**
* Get firstname - Firstname
* @return string
*/
public function getFirstname () {
	$preValue = $this->preGetValue("firstname"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->firstname;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set firstname - Firstname
* @param string $firstname
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setFirstname ($firstname) {
	$fd = $this->getClass()->getFieldDefinition("firstname");
	$this->firstname = $firstname;
	return $this;
}

/**
* Get lastname - Lastname
* @return string
*/
public function getLastname () {
	$preValue = $this->preGetValue("lastname"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->lastname;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set lastname - Lastname
* @param string $lastname
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setLastname ($lastname) {
	$fd = $this->getClass()->getFieldDefinition("lastname");
	$this->lastname = $lastname;
	return $this;
}

/**
* Get email - Email
* @return string
*/
public function getEmail () {
	$preValue = $this->preGetValue("email"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->email;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set email - Email
* @param string $email
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setEmail ($email) {
	$fd = $this->getClass()->getFieldDefinition("email");
	$this->email = $email;
	return $this;
}

/**
* Get password - Password
* @return string
*/
public function getPassword () {
	$preValue = $this->preGetValue("password"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->password;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set password - Password
* @param string $password
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setPassword ($password) {
	$fd = $this->getClass()->getFieldDefinition("password");
	$this->password = $password;
	return $this;
}

/**
* Get newsletterActive - Newsletter Active
* @return boolean
*/
public function getNewsletterActive () {
	$preValue = $this->preGetValue("newsletterActive"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->newsletterActive;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set newsletterActive - Newsletter Active
* @param boolean $newsletterActive
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setNewsletterActive ($newsletterActive) {
	$fd = $this->getClass()->getFieldDefinition("newsletterActive");
	$this->newsletterActive = $newsletterActive;
	return $this;
}

/**
* Get newsletterConfirmed - Newsletter Confirmed
* @return boolean
*/
public function getNewsletterConfirmed () {
	$preValue = $this->preGetValue("newsletterConfirmed"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->newsletterConfirmed;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set newsletterConfirmed - Newsletter Confirmed
* @param boolean $newsletterConfirmed
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setNewsletterConfirmed ($newsletterConfirmed) {
	$fd = $this->getClass()->getFieldDefinition("newsletterConfirmed");
	$this->newsletterConfirmed = $newsletterConfirmed;
	return $this;
}

/**
* Get newsletterToken - Newsletter Token
* @return string
*/
public function getNewsletterToken () {
	$preValue = $this->preGetValue("newsletterToken"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->newsletterToken;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set newsletterToken - Newsletter Token
* @param string $newsletterToken
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setNewsletterToken ($newsletterToken) {
	$fd = $this->getClass()->getFieldDefinition("newsletterToken");
	$this->newsletterToken = $newsletterToken;
	return $this;
}

/**
* Get isGuest - Is Guest
* @return boolean
*/
public function getIsGuest () {
	$preValue = $this->preGetValue("isGuest"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->isGuest;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set isGuest - Is Guest
* @param boolean $isGuest
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setIsGuest ($isGuest) {
	$fd = $this->getClass()->getFieldDefinition("isGuest");
	$this->isGuest = $isGuest;
	return $this;
}

/**
* Get gender - Gender
* @return string
*/
public function getGender () {
	$preValue = $this->preGetValue("gender"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->gender;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set gender - Gender
* @param string $gender
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setGender ($gender) {
	$fd = $this->getClass()->getFieldDefinition("gender");
	$this->gender = $gender;
	return $this;
}

/**
* Get passwordResetHash - Reset Password Hash
* @return string
*/
public function getPasswordResetHash () {
	$preValue = $this->preGetValue("passwordResetHash"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->passwordResetHash;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set passwordResetHash - Reset Password Hash
* @param string $passwordResetHash
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setPasswordResetHash ($passwordResetHash) {
	$fd = $this->getClass()->getFieldDefinition("passwordResetHash");
	$this->passwordResetHash = $passwordResetHash;
	return $this;
}

/**
* Get localeCode - Locale
* @return string
*/
public function getLocaleCode () {
	$preValue = $this->preGetValue("localeCode"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->localeCode;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set localeCode - Locale
* @param string $localeCode
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setLocaleCode ($localeCode) {
	$fd = $this->getClass()->getFieldDefinition("localeCode");
	$this->localeCode = $localeCode;
	return $this;
}

/**
* Get addresses - Addresses
* @return \Pimcore\Model\DataObject\CoreShopAddress[]
*/
public function getAddresses () {
	$preValue = $this->preGetValue("addresses"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("addresses")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set addresses - Addresses
* @param \Pimcore\Model\DataObject\CoreShopAddress[] $addresses
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setAddresses ($addresses) {
	$fd = $this->getClass()->getFieldDefinition("addresses");
	$currentData = $this->getAddresses();
	$isEqual = $fd->isEqual($currentData, $addresses);
	if (!$isEqual) {
		$this->markFieldDirty("addresses", true);
	}
	$this->addresses = $fd->preSetData($this, $addresses);
	return $this;
}

/**
* Get defaultAddress - Default Address
* @return \Pimcore\Model\DataObject\CoreShopAddress
*/
public function getDefaultAddress () {
	$preValue = $this->preGetValue("defaultAddress"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("defaultAddress")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set defaultAddress - Default Address
* @param \Pimcore\Model\DataObject\CoreShopAddress $defaultAddress
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setDefaultAddress ($defaultAddress) {
	$fd = $this->getClass()->getFieldDefinition("defaultAddress");
	$currentData = $this->getDefaultAddress();
	$isEqual = $fd->isEqual($currentData, $defaultAddress);
	if (!$isEqual) {
		$this->markFieldDirty("defaultAddress", true);
	}
	$this->defaultAddress = $fd->preSetData($this, $defaultAddress);
	return $this;
}

/**
* Get customerGroups - Customer Groups
* @return \Pimcore\Model\DataObject\CoreShopCustomerGroup[]
*/
public function getCustomerGroups () {
	$preValue = $this->preGetValue("customerGroups"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("customerGroups")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set customerGroups - Customer Groups
* @param \Pimcore\Model\DataObject\CoreShopCustomerGroup[] $customerGroups
* @return \Pimcore\Model\DataObject\CoreShopCustomer
*/
public function setCustomerGroups ($customerGroups) {
	$fd = $this->getClass()->getFieldDefinition("customerGroups");
	$currentData = $this->getCustomerGroups();
	$isEqual = $fd->isEqual($currentData, $customerGroups);
	if (!$isEqual) {
		$this->markFieldDirty("customerGroups", true);
	}
	$this->customerGroups = $fd->preSetData($this, $customerGroups);
	return $this;
}

protected static $_relationFields = array (
  'addresses' => 
  array (
    'type' => 'manyToManyRelation',
  ),
  'defaultAddress' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'customerGroups' => 
  array (
    'type' => 'manyToManyRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'defaultAddress',
  1 => 'customerGroups',
);

}

