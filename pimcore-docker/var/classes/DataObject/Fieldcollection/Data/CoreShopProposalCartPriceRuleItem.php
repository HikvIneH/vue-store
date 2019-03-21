<?php 

/** 
* Generated at: 2019-03-21T10:28:32+01:00


Fields Summary: 
 - cartPriceRule [coreShopCartPriceRule]
 - voucherCode [input]
 - discountNet [coreShopMoney]
 - discountGross [coreShopMoney]
*/ 

namespace Pimcore\Model\DataObject\Fieldcollection\Data;

use Pimcore\Model\DataObject;

class CoreShopProposalCartPriceRuleItem extends \CoreShop\Component\Order\Model\ProposalCartPriceRuleItem implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {

use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $type = "CoreShopProposalCartPriceRuleItem";
protected $cartPriceRule;
protected $voucherCode;
protected $discountNet;
protected $discountGross;


/**
* Get cartPriceRule - Price Rule
* @return CoreShop\Component\Order\Model\CartPriceRule
*/
public function getCartPriceRule () {
	$container = $this;
	$fd = $this->getDefinition()->getFieldDefinition("cartPriceRule");
	$data = $fd->preGetData($container);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set cartPriceRule - Price Rule
* @param CoreShop\Component\Order\Model\CartPriceRule $cartPriceRule
* @return \Pimcore\Model\DataObject\CoreShopProposalCartPriceRuleItem
*/
public function setCartPriceRule ($cartPriceRule) {
	$fd = $this->getDefinition()->getFieldDefinition("cartPriceRule");
	$this->cartPriceRule = $fd->preSetData($this, $cartPriceRule);
	return $this;
}

/**
* Get voucherCode - voucherCode
* @return string
*/
public function getVoucherCode () {
	$data = $this->voucherCode;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set voucherCode - voucherCode
* @param string $voucherCode
* @return \Pimcore\Model\DataObject\CoreShopProposalCartPriceRuleItem
*/
public function setVoucherCode ($voucherCode) {
	$fd = $this->getDefinition()->getFieldDefinition("voucherCode");
	$this->voucherCode = $voucherCode;
	return $this;
}

/**
* Get discountNet - Discount Net
* @return int
*/
public function getDiscountNet () {
	$data = $this->discountNet;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set discountNet - Discount Net
* @param int $discountNet
* @return \Pimcore\Model\DataObject\CoreShopProposalCartPriceRuleItem
*/
public function setDiscountNet ($discountNet) {
	$fd = $this->getDefinition()->getFieldDefinition("discountNet");
	$this->discountNet = $discountNet;
	return $this;
}

/**
* Get discountGross - Discount Gross
* @return int
*/
public function getDiscountGross () {
	$data = $this->discountGross;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	 return $data;
}

/**
* Set discountGross - Discount Gross
* @param int $discountGross
* @return \Pimcore\Model\DataObject\CoreShopProposalCartPriceRuleItem
*/
public function setDiscountGross ($discountGross) {
	$fd = $this->getDefinition()->getFieldDefinition("discountGross");
	$this->discountGross = $discountGross;
	return $this;
}

}

