<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- order [manyToOneRelation]
- shipmentDate [date]
- shipmentNumber [input]
- state [input]
- carrier [coreShopCarrier]
- trackingCode [input]
- weight [numeric]
- items [manyToManyRelation]
*/ 

namespace Pimcore\Model\DataObject;



/**
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByOrder ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByShipmentDate ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByShipmentNumber ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByState ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByCarrier ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByTrackingCode ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByWeight ($value, $limit = 0) 
* @method static \Pimcore\Model\DataObject\CoreShopOrderShipment\Listing getByItems ($value, $limit = 0) 
*/

class CoreShopOrderShipment extends \CoreShop\Component\Core\Model\OrderShipment implements \Pimcore\Model\DataObject\DirtyIndicatorInterface {



use \Pimcore\Model\DataObject\Traits\DirtyIndicatorTrait;

protected $o_classId = "46";
protected $o_className = "CoreShopOrderShipment";
protected $order;
protected $shipmentDate;
protected $shipmentNumber;
protected $state;
protected $carrier;
protected $trackingCode;
protected $weight;
protected $items;


/**
* @param array $values
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public static function create($values = array()) {
	$object = new static();
	$object->setValues($values);
	return $object;
}

/**
* Get order - Order
* @return \Pimcore\Model\DataObject\CoreShopOrder
*/
public function getOrder () {
	$preValue = $this->preGetValue("order"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("order")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set order - Order
* @param \Pimcore\Model\DataObject\CoreShopOrder $order
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setOrder ($order) {
	$fd = $this->getClass()->getFieldDefinition("order");
	$currentData = $this->getOrder();
	$isEqual = $fd->isEqual($currentData, $order);
	if (!$isEqual) {
		$this->markFieldDirty("order", true);
	}
	$this->order = $fd->preSetData($this, $order);
	return $this;
}

/**
* Get shipmentDate - Shipment Date
* @return \Carbon\Carbon
*/
public function getShipmentDate () {
	$preValue = $this->preGetValue("shipmentDate"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->shipmentDate;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set shipmentDate - Shipment Date
* @param \Carbon\Carbon $shipmentDate
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setShipmentDate ($shipmentDate) {
	$fd = $this->getClass()->getFieldDefinition("shipmentDate");
	$this->shipmentDate = $shipmentDate;
	return $this;
}

/**
* Get shipmentNumber - Shipment Number
* @return string
*/
public function getShipmentNumber () {
	$preValue = $this->preGetValue("shipmentNumber"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->shipmentNumber;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set shipmentNumber - Shipment Number
* @param string $shipmentNumber
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setShipmentNumber ($shipmentNumber) {
	$fd = $this->getClass()->getFieldDefinition("shipmentNumber");
	$this->shipmentNumber = $shipmentNumber;
	return $this;
}

/**
* Get state - State
* @return string
*/
public function getState () {
	$preValue = $this->preGetValue("state"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->state;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set state - State
* @param string $state
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setState ($state) {
	$fd = $this->getClass()->getFieldDefinition("state");
	$this->state = $state;
	return $this;
}

/**
* Get carrier - Carrier
* @return CoreShop\Component\Shipping\Model\CarrierInterface
*/
public function getCarrier () {
	$preValue = $this->preGetValue("carrier"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("carrier")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set carrier - Carrier
* @param CoreShop\Component\Shipping\Model\CarrierInterface $carrier
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setCarrier ($carrier) {
	$fd = $this->getClass()->getFieldDefinition("carrier");
	$this->carrier = $fd->preSetData($this, $carrier);
	return $this;
}

/**
* Get trackingCode - Tracking Code
* @return string
*/
public function getTrackingCode () {
	$preValue = $this->preGetValue("trackingCode"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->trackingCode;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set trackingCode - Tracking Code
* @param string $trackingCode
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setTrackingCode ($trackingCode) {
	$fd = $this->getClass()->getFieldDefinition("trackingCode");
	$this->trackingCode = $trackingCode;
	return $this;
}

/**
* Get weight - Weight
* @return float
*/
public function getWeight () {
	$preValue = $this->preGetValue("weight"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->weight;
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set weight - Weight
* @param float $weight
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setWeight ($weight) {
	$fd = $this->getClass()->getFieldDefinition("weight");
	$this->weight = $weight;
	return $this;
}

/**
* Get items - Items
* @return \Pimcore\Model\DataObject\CoreShopOrderShipmentItem[]
*/
public function getItems () {
	$preValue = $this->preGetValue("items"); 
	if($preValue !== null && !\Pimcore::inAdmin()) { 
		return $preValue;
	}
	$data = $this->getClass()->getFieldDefinition("items")->preGetData($this);
	if ($data instanceof \Pimcore\Model\DataObject\Data\EncryptedField) {
		    return $data->getPlain();
	}
	return $data;
}

/**
* Set items - Items
* @param \Pimcore\Model\DataObject\CoreShopOrderShipmentItem[] $items
* @return \Pimcore\Model\DataObject\CoreShopOrderShipment
*/
public function setItems ($items) {
	$fd = $this->getClass()->getFieldDefinition("items");
	$currentData = $this->getItems();
	$isEqual = $fd->isEqual($currentData, $items);
	if (!$isEqual) {
		$this->markFieldDirty("items", true);
	}
	$this->items = $fd->preSetData($this, $items);
	return $this;
}

protected static $_relationFields = array (
  'order' => 
  array (
    'type' => 'manyToOneRelation',
  ),
  'items' => 
  array (
    'type' => 'manyToManyRelation',
  ),
);

protected $lazyLoadedFields = array (
  0 => 'order',
  1 => 'items',
);

}

