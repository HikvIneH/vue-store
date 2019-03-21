<?php 

/** 
* Generated at: 2019-03-21T10:28:33+01:00
* Inheritance: no
* Variants: no
* Changed by: system (0)


Fields Summary: 
- name [input]
- customIdentifier [input]
- store [coreShopStore]
- localeCode [language]
- carrier [coreShopCarrier]
- paymentProvider [coreShopPaymentProvider]
- paymentSettings [coreShopSerializedData]
- order [manyToOneRelation]
- currency [coreShopCurrency]
- comment [textarea]
- additionalData [objectbricks]
- priceRuleItems [fieldcollections]
- items [manyToManyRelation]
- needsRecalculation [checkbox]
- customer [manyToOneRelation]
- shippingAddress [manyToOneRelation]
- invoiceAddress [manyToOneRelation]
- shippingTaxRate [numeric]
- taxes [fieldcollections]
- pimcoreAdjustmentTotalNet [coreShopMoney]
- pimcoreAdjustmentTotalGross [coreShopMoney]
- adjustmentItems [fieldcollections]
*/ 


return Pimcore\Model\DataObject\ClassDefinition::__set_state(array(
   'id' => 42,
   'name' => 'CoreShopCart',
   'description' => NULL,
   'creationDate' => NULL,
   'modificationDate' => 1553160512,
   'userOwner' => 0,
   'userModification' => 0,
   'parentClass' => 'CoreShop\\Component\\Core\\Model\\Cart',
   'listingParentClass' => '',
   'useTraits' => '',
   'listingUseTraits' => '',
   'encryption' => false,
   'encryptedTables' => 
  array (
  ),
   'allowInherit' => false,
   'allowVariants' => NULL,
   'showVariants' => false,
   'layoutDefinitions' => 
  Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
     'fieldtype' => 'panel',
     'labelWidth' => 100,
     'layout' => NULL,
     'name' => 'pimcore_root',
     'type' => NULL,
     'region' => NULL,
     'title' => NULL,
     'width' => NULL,
     'height' => NULL,
     'collapsible' => false,
     'collapsed' => false,
     'bodyStyle' => NULL,
     'datatype' => 'layout',
     'permissions' => NULL,
     'childs' => 
    array (
      0 => 
      Pimcore\Model\DataObject\ClassDefinition\Layout\Tabpanel::__set_state(array(
         'fieldtype' => 'tabpanel',
         'name' => 'Layout',
         'type' => NULL,
         'region' => NULL,
         'title' => NULL,
         'width' => NULL,
         'height' => NULL,
         'collapsible' => false,
         'collapsed' => false,
         'bodyStyle' => NULL,
         'datatype' => 'layout',
         'permissions' => NULL,
         'childs' => 
        array (
          0 => 
          Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
             'fieldtype' => 'panel',
             'labelWidth' => 100,
             'layout' => NULL,
             'name' => 'Items',
             'type' => NULL,
             'region' => NULL,
             'title' => 'Items',
             'width' => NULL,
             'height' => NULL,
             'collapsible' => false,
             'collapsed' => false,
             'bodyStyle' => '',
             'datatype' => 'layout',
             'permissions' => NULL,
             'childs' => 
            array (
              0 => 
              Pimcore\Model\DataObject\ClassDefinition\Layout\Fieldset::__set_state(array(
                 'fieldtype' => 'fieldset',
                 'labelWidth' => 100,
                 'name' => 'Layout',
                 'type' => NULL,
                 'region' => NULL,
                 'title' => NULL,
                 'width' => NULL,
                 'height' => NULL,
                 'collapsible' => false,
                 'collapsed' => false,
                 'bodyStyle' => NULL,
                 'datatype' => 'layout',
                 'permissions' => NULL,
                 'childs' => 
                array (
                  0 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\Input::__set_state(array(
                     'fieldtype' => 'input',
                     'width' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'phpdocType' => 'string',
                     'regex' => '',
                     'unique' => NULL,
                     'showCharCount' => NULL,
                     'name' => 'name',
                     'title' => 'Name',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  1 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\Input::__set_state(array(
                     'fieldtype' => 'input',
                     'width' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'phpdocType' => 'string',
                     'regex' => '',
                     'unique' => NULL,
                     'showCharCount' => NULL,
                     'name' => 'customIdentifier',
                     'title' => 'Custom Identifier',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => true,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  2 => 
                  CoreShop\Bundle\StoreBundle\CoreExtension\Store::__set_state(array(
                     'fieldtype' => 'coreShopStore',
                     'allowEmpty' => false,
                     'options' => NULL,
                     'width' => '',
                     'defaultValue' => NULL,
                     'optionsProviderClass' => NULL,
                     'optionsProviderData' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'phpdocType' => 'string',
                     'name' => 'store',
                     'title' => 'Store',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  3 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\Language::__set_state(array(
                     'fieldtype' => 'language',
                     'onlySystemLanguages' => false,
                     'options' => 
                    array (
                      0 => 
                      array (
                        'key' => 'Afrikaans',
                        'value' => 'af',
                      ),
                      1 => 
                      array (
                        'key' => 'Afrikaans (Namibia)',
                        'value' => 'af_NA',
                      ),
                      2 => 
                      array (
                        'key' => 'Afrikaans (South Africa)',
                        'value' => 'af_ZA',
                      ),
                      3 => 
                      array (
                        'key' => 'Aghem',
                        'value' => 'agq',
                      ),
                      4 => 
                      array (
                        'key' => 'Aghem (Cameroon)',
                        'value' => 'agq_CM',
                      ),
                      5 => 
                      array (
                        'key' => 'Akan',
                        'value' => 'ak',
                      ),
                      6 => 
                      array (
                        'key' => 'Akan (Ghana)',
                        'value' => 'ak_GH',
                      ),
                      7 => 
                      array (
                        'key' => 'Albanian',
                        'value' => 'sq',
                      ),
                      8 => 
                      array (
                        'key' => 'Albanian (Albania)',
                        'value' => 'sq_AL',
                      ),
                      9 => 
                      array (
                        'key' => 'Albanian (Kosovo)',
                        'value' => 'sq_XK',
                      ),
                      10 => 
                      array (
                        'key' => 'Albanian (Macedonia)',
                        'value' => 'sq_MK',
                      ),
                      11 => 
                      array (
                        'key' => 'Amharic',
                        'value' => 'am',
                      ),
                      12 => 
                      array (
                        'key' => 'Amharic (Ethiopia)',
                        'value' => 'am_ET',
                      ),
                      13 => 
                      array (
                        'key' => 'Arabic',
                        'value' => 'ar',
                      ),
                      14 => 
                      array (
                        'key' => 'Arabic (Algeria)',
                        'value' => 'ar_DZ',
                      ),
                      15 => 
                      array (
                        'key' => 'Arabic (Bahrain)',
                        'value' => 'ar_BH',
                      ),
                      16 => 
                      array (
                        'key' => 'Arabic (Chad)',
                        'value' => 'ar_TD',
                      ),
                      17 => 
                      array (
                        'key' => 'Arabic (Comoros)',
                        'value' => 'ar_KM',
                      ),
                      18 => 
                      array (
                        'key' => 'Arabic (Djibouti)',
                        'value' => 'ar_DJ',
                      ),
                      19 => 
                      array (
                        'key' => 'Arabic (Egypt)',
                        'value' => 'ar_EG',
                      ),
                      20 => 
                      array (
                        'key' => 'Arabic (Eritrea)',
                        'value' => 'ar_ER',
                      ),
                      21 => 
                      array (
                        'key' => 'Arabic (Iraq)',
                        'value' => 'ar_IQ',
                      ),
                      22 => 
                      array (
                        'key' => 'Arabic (Israel)',
                        'value' => 'ar_IL',
                      ),
                      23 => 
                      array (
                        'key' => 'Arabic (Jordan)',
                        'value' => 'ar_JO',
                      ),
                      24 => 
                      array (
                        'key' => 'Arabic (Kuwait)',
                        'value' => 'ar_KW',
                      ),
                      25 => 
                      array (
                        'key' => 'Arabic (Lebanon)',
                        'value' => 'ar_LB',
                      ),
                      26 => 
                      array (
                        'key' => 'Arabic (Libya)',
                        'value' => 'ar_LY',
                      ),
                      27 => 
                      array (
                        'key' => 'Arabic (Mauritania)',
                        'value' => 'ar_MR',
                      ),
                      28 => 
                      array (
                        'key' => 'Arabic (Morocco)',
                        'value' => 'ar_MA',
                      ),
                      29 => 
                      array (
                        'key' => 'Arabic (Oman)',
                        'value' => 'ar_OM',
                      ),
                      30 => 
                      array (
                        'key' => 'Arabic (Palestinian Territories)',
                        'value' => 'ar_PS',
                      ),
                      31 => 
                      array (
                        'key' => 'Arabic (Qatar)',
                        'value' => 'ar_QA',
                      ),
                      32 => 
                      array (
                        'key' => 'Arabic (Saudi Arabia)',
                        'value' => 'ar_SA',
                      ),
                      33 => 
                      array (
                        'key' => 'Arabic (Somalia)',
                        'value' => 'ar_SO',
                      ),
                      34 => 
                      array (
                        'key' => 'Arabic (South Sudan)',
                        'value' => 'ar_SS',
                      ),
                      35 => 
                      array (
                        'key' => 'Arabic (Sudan)',
                        'value' => 'ar_SD',
                      ),
                      36 => 
                      array (
                        'key' => 'Arabic (Syria)',
                        'value' => 'ar_SY',
                      ),
                      37 => 
                      array (
                        'key' => 'Arabic (Tunisia)',
                        'value' => 'ar_TN',
                      ),
                      38 => 
                      array (
                        'key' => 'Arabic (United Arab Emirates)',
                        'value' => 'ar_AE',
                      ),
                      39 => 
                      array (
                        'key' => 'Arabic (Western Sahara)',
                        'value' => 'ar_EH',
                      ),
                      40 => 
                      array (
                        'key' => 'Arabic (World)',
                        'value' => 'ar_001',
                      ),
                      41 => 
                      array (
                        'key' => 'Arabic (Yemen)',
                        'value' => 'ar_YE',
                      ),
                      42 => 
                      array (
                        'key' => 'Armenian',
                        'value' => 'hy',
                      ),
                      43 => 
                      array (
                        'key' => 'Armenian (Armenia)',
                        'value' => 'hy_AM',
                      ),
                      44 => 
                      array (
                        'key' => 'Assamese',
                        'value' => 'as',
                      ),
                      45 => 
                      array (
                        'key' => 'Assamese (India)',
                        'value' => 'as_IN',
                      ),
                      46 => 
                      array (
                        'key' => 'Asu',
                        'value' => 'asa',
                      ),
                      47 => 
                      array (
                        'key' => 'Asu (Tanzania)',
                        'value' => 'asa_TZ',
                      ),
                      48 => 
                      array (
                        'key' => 'Azerbaijani',
                        'value' => 'az_Cyrl',
                      ),
                      49 => 
                      array (
                        'key' => 'Azerbaijani',
                        'value' => 'az',
                      ),
                      50 => 
                      array (
                        'key' => 'Azerbaijani',
                        'value' => 'az_Latn',
                      ),
                      51 => 
                      array (
                        'key' => 'Azerbaijani (Azerbaijan)',
                        'value' => 'az_Cyrl_AZ',
                      ),
                      52 => 
                      array (
                        'key' => 'Azerbaijani (Azerbaijan)',
                        'value' => 'az_Latn_AZ',
                      ),
                      53 => 
                      array (
                        'key' => 'Bafia',
                        'value' => 'ksf',
                      ),
                      54 => 
                      array (
                        'key' => 'Bafia (Cameroon)',
                        'value' => 'ksf_CM',
                      ),
                      55 => 
                      array (
                        'key' => 'Bambara',
                        'value' => 'bm',
                      ),
                      56 => 
                      array (
                        'key' => 'Bambara (Mali)',
                        'value' => 'bm_ML',
                      ),
                      57 => 
                      array (
                        'key' => 'Basaa',
                        'value' => 'bas',
                      ),
                      58 => 
                      array (
                        'key' => 'Basaa (Cameroon)',
                        'value' => 'bas_CM',
                      ),
                      59 => 
                      array (
                        'key' => 'Basque',
                        'value' => 'eu',
                      ),
                      60 => 
                      array (
                        'key' => 'Basque (Spain)',
                        'value' => 'eu_ES',
                      ),
                      61 => 
                      array (
                        'key' => 'Belarusian',
                        'value' => 'be',
                      ),
                      62 => 
                      array (
                        'key' => 'Belarusian (Belarus)',
                        'value' => 'be_BY',
                      ),
                      63 => 
                      array (
                        'key' => 'Bemba',
                        'value' => 'bem',
                      ),
                      64 => 
                      array (
                        'key' => 'Bemba (Zambia)',
                        'value' => 'bem_ZM',
                      ),
                      65 => 
                      array (
                        'key' => 'Bena',
                        'value' => 'bez',
                      ),
                      66 => 
                      array (
                        'key' => 'Bena (Tanzania)',
                        'value' => 'bez_TZ',
                      ),
                      67 => 
                      array (
                        'key' => 'Bengali',
                        'value' => 'bn',
                      ),
                      68 => 
                      array (
                        'key' => 'Bengali (Bangladesh)',
                        'value' => 'bn_BD',
                      ),
                      69 => 
                      array (
                        'key' => 'Bengali (India)',
                        'value' => 'bn_IN',
                      ),
                      70 => 
                      array (
                        'key' => 'Bodo',
                        'value' => 'brx',
                      ),
                      71 => 
                      array (
                        'key' => 'Bodo (India)',
                        'value' => 'brx_IN',
                      ),
                      72 => 
                      array (
                        'key' => 'Bosnian',
                        'value' => 'bs_Latn',
                      ),
                      73 => 
                      array (
                        'key' => 'Bosnian',
                        'value' => 'bs',
                      ),
                      74 => 
                      array (
                        'key' => 'Bosnian',
                        'value' => 'bs_Cyrl',
                      ),
                      75 => 
                      array (
                        'key' => 'Bosnian (Bosnia & Herzegovina)',
                        'value' => 'bs_Latn_BA',
                      ),
                      76 => 
                      array (
                        'key' => 'Bosnian (Bosnia & Herzegovina)',
                        'value' => 'bs_Cyrl_BA',
                      ),
                      77 => 
                      array (
                        'key' => 'Breton',
                        'value' => 'br',
                      ),
                      78 => 
                      array (
                        'key' => 'Breton (France)',
                        'value' => 'br_FR',
                      ),
                      79 => 
                      array (
                        'key' => 'Bulgarian',
                        'value' => 'bg',
                      ),
                      80 => 
                      array (
                        'key' => 'Bulgarian (Bulgaria)',
                        'value' => 'bg_BG',
                      ),
                      81 => 
                      array (
                        'key' => 'Burmese',
                        'value' => 'my',
                      ),
                      82 => 
                      array (
                        'key' => 'Burmese (Myanmar (Burma))',
                        'value' => 'my_MM',
                      ),
                      83 => 
                      array (
                        'key' => 'Catalan',
                        'value' => 'ca',
                      ),
                      84 => 
                      array (
                        'key' => 'Catalan (Andorra)',
                        'value' => 'ca_AD',
                      ),
                      85 => 
                      array (
                        'key' => 'Catalan (France)',
                        'value' => 'ca_FR',
                      ),
                      86 => 
                      array (
                        'key' => 'Catalan (Italy)',
                        'value' => 'ca_IT',
                      ),
                      87 => 
                      array (
                        'key' => 'Catalan (Spain)',
                        'value' => 'ca_ES',
                      ),
                      88 => 
                      array (
                        'key' => 'Central Atlas Tamazight',
                        'value' => 'tzm',
                      ),
                      89 => 
                      array (
                        'key' => 'Central Atlas Tamazight (Morocco)',
                        'value' => 'tzm_MA',
                      ),
                      90 => 
                      array (
                        'key' => 'Chechen',
                        'value' => 'ce',
                      ),
                      91 => 
                      array (
                        'key' => 'Chechen (Russia)',
                        'value' => 'ce_RU',
                      ),
                      92 => 
                      array (
                        'key' => 'Cherokee',
                        'value' => 'chr',
                      ),
                      93 => 
                      array (
                        'key' => 'Cherokee (United States)',
                        'value' => 'chr_US',
                      ),
                      94 => 
                      array (
                        'key' => 'Chiga',
                        'value' => 'cgg',
                      ),
                      95 => 
                      array (
                        'key' => 'Chiga (Uganda)',
                        'value' => 'cgg_UG',
                      ),
                      96 => 
                      array (
                        'key' => 'Chinese',
                        'value' => 'zh_Hans',
                      ),
                      97 => 
                      array (
                        'key' => 'Chinese',
                        'value' => 'zh',
                      ),
                      98 => 
                      array (
                        'key' => 'Chinese',
                        'value' => 'zh_Hant',
                      ),
                      99 => 
                      array (
                        'key' => 'Chinese (China)',
                        'value' => 'zh_Hans_CN',
                      ),
                      100 => 
                      array (
                        'key' => 'Chinese (Hong Kong SAR China)',
                        'value' => 'zh_Hant_HK',
                      ),
                      101 => 
                      array (
                        'key' => 'Chinese (Hong Kong SAR China)',
                        'value' => 'zh_Hans_HK',
                      ),
                      102 => 
                      array (
                        'key' => 'Chinese (Macau SAR China)',
                        'value' => 'zh_Hant_MO',
                      ),
                      103 => 
                      array (
                        'key' => 'Chinese (Macau SAR China)',
                        'value' => 'zh_Hans_MO',
                      ),
                      104 => 
                      array (
                        'key' => 'Chinese (Singapore)',
                        'value' => 'zh_Hans_SG',
                      ),
                      105 => 
                      array (
                        'key' => 'Chinese (Taiwan)',
                        'value' => 'zh_Hant_TW',
                      ),
                      106 => 
                      array (
                        'key' => 'Colognian',
                        'value' => 'ksh',
                      ),
                      107 => 
                      array (
                        'key' => 'Colognian (Germany)',
                        'value' => 'ksh_DE',
                      ),
                      108 => 
                      array (
                        'key' => 'Cornish',
                        'value' => 'kw',
                      ),
                      109 => 
                      array (
                        'key' => 'Cornish (United Kingdom)',
                        'value' => 'kw_GB',
                      ),
                      110 => 
                      array (
                        'key' => 'Croatian',
                        'value' => 'hr',
                      ),
                      111 => 
                      array (
                        'key' => 'Croatian (Bosnia & Herzegovina)',
                        'value' => 'hr_BA',
                      ),
                      112 => 
                      array (
                        'key' => 'Croatian (Croatia)',
                        'value' => 'hr_HR',
                      ),
                      113 => 
                      array (
                        'key' => 'Czech',
                        'value' => 'cs',
                      ),
                      114 => 
                      array (
                        'key' => 'Czech (Czech Republic)',
                        'value' => 'cs_CZ',
                      ),
                      115 => 
                      array (
                        'key' => 'Danish',
                        'value' => 'da',
                      ),
                      116 => 
                      array (
                        'key' => 'Danish (Denmark)',
                        'value' => 'da_DK',
                      ),
                      117 => 
                      array (
                        'key' => 'Danish (Greenland)',
                        'value' => 'da_GL',
                      ),
                      118 => 
                      array (
                        'key' => 'Duala',
                        'value' => 'dua',
                      ),
                      119 => 
                      array (
                        'key' => 'Duala (Cameroon)',
                        'value' => 'dua_CM',
                      ),
                      120 => 
                      array (
                        'key' => 'Dutch',
                        'value' => 'nl',
                      ),
                      121 => 
                      array (
                        'key' => 'Dutch (Aruba)',
                        'value' => 'nl_AW',
                      ),
                      122 => 
                      array (
                        'key' => 'Dutch (Belgium)',
                        'value' => 'nl_BE',
                      ),
                      123 => 
                      array (
                        'key' => 'Dutch (Caribbean Netherlands)',
                        'value' => 'nl_BQ',
                      ),
                      124 => 
                      array (
                        'key' => 'Dutch (Curaçao)',
                        'value' => 'nl_CW',
                      ),
                      125 => 
                      array (
                        'key' => 'Dutch (Netherlands)',
                        'value' => 'nl_NL',
                      ),
                      126 => 
                      array (
                        'key' => 'Dutch (Sint Maarten)',
                        'value' => 'nl_SX',
                      ),
                      127 => 
                      array (
                        'key' => 'Dutch (Suriname)',
                        'value' => 'nl_SR',
                      ),
                      128 => 
                      array (
                        'key' => 'Dzongkha',
                        'value' => 'dz',
                      ),
                      129 => 
                      array (
                        'key' => 'Dzongkha (Bhutan)',
                        'value' => 'dz_BT',
                      ),
                      130 => 
                      array (
                        'key' => 'Embu',
                        'value' => 'ebu',
                      ),
                      131 => 
                      array (
                        'key' => 'Embu (Kenya)',
                        'value' => 'ebu_KE',
                      ),
                      132 => 
                      array (
                        'key' => 'English',
                        'value' => 'en',
                      ),
                      133 => 
                      array (
                        'key' => 'English (American Samoa)',
                        'value' => 'en_AS',
                      ),
                      134 => 
                      array (
                        'key' => 'English (Anguilla)',
                        'value' => 'en_AI',
                      ),
                      135 => 
                      array (
                        'key' => 'English (Antigua & Barbuda)',
                        'value' => 'en_AG',
                      ),
                      136 => 
                      array (
                        'key' => 'English (Australia)',
                        'value' => 'en_AU',
                      ),
                      137 => 
                      array (
                        'key' => 'English (Austria)',
                        'value' => 'en_AT',
                      ),
                      138 => 
                      array (
                        'key' => 'English (Bahamas)',
                        'value' => 'en_BS',
                      ),
                      139 => 
                      array (
                        'key' => 'English (Barbados)',
                        'value' => 'en_BB',
                      ),
                      140 => 
                      array (
                        'key' => 'English (Belgium)',
                        'value' => 'en_BE',
                      ),
                      141 => 
                      array (
                        'key' => 'English (Belize)',
                        'value' => 'en_BZ',
                      ),
                      142 => 
                      array (
                        'key' => 'English (Bermuda)',
                        'value' => 'en_BM',
                      ),
                      143 => 
                      array (
                        'key' => 'English (Botswana)',
                        'value' => 'en_BW',
                      ),
                      144 => 
                      array (
                        'key' => 'English (British Indian Ocean Territory)',
                        'value' => 'en_IO',
                      ),
                      145 => 
                      array (
                        'key' => 'English (British Virgin Islands)',
                        'value' => 'en_VG',
                      ),
                      146 => 
                      array (
                        'key' => 'English (Burundi)',
                        'value' => 'en_BI',
                      ),
                      147 => 
                      array (
                        'key' => 'English (Cameroon)',
                        'value' => 'en_CM',
                      ),
                      148 => 
                      array (
                        'key' => 'English (Canada)',
                        'value' => 'en_CA',
                      ),
                      149 => 
                      array (
                        'key' => 'English (Cayman Islands)',
                        'value' => 'en_KY',
                      ),
                      150 => 
                      array (
                        'key' => 'English (Christmas Island)',
                        'value' => 'en_CX',
                      ),
                      151 => 
                      array (
                        'key' => 'English (Cocos (Keeling) Islands)',
                        'value' => 'en_CC',
                      ),
                      152 => 
                      array (
                        'key' => 'English (Cook Islands)',
                        'value' => 'en_CK',
                      ),
                      153 => 
                      array (
                        'key' => 'English (Cyprus)',
                        'value' => 'en_CY',
                      ),
                      154 => 
                      array (
                        'key' => 'English (Denmark)',
                        'value' => 'en_DK',
                      ),
                      155 => 
                      array (
                        'key' => 'English (Diego Garcia)',
                        'value' => 'en_DG',
                      ),
                      156 => 
                      array (
                        'key' => 'English (Dominica)',
                        'value' => 'en_DM',
                      ),
                      157 => 
                      array (
                        'key' => 'English (Eritrea)',
                        'value' => 'en_ER',
                      ),
                      158 => 
                      array (
                        'key' => 'English (Europe)',
                        'value' => 'en_150',
                      ),
                      159 => 
                      array (
                        'key' => 'English (Falkland Islands)',
                        'value' => 'en_FK',
                      ),
                      160 => 
                      array (
                        'key' => 'English (Fiji)',
                        'value' => 'en_FJ',
                      ),
                      161 => 
                      array (
                        'key' => 'English (Finland)',
                        'value' => 'en_FI',
                      ),
                      162 => 
                      array (
                        'key' => 'English (Gambia)',
                        'value' => 'en_GM',
                      ),
                      163 => 
                      array (
                        'key' => 'English (Germany)',
                        'value' => 'en_DE',
                      ),
                      164 => 
                      array (
                        'key' => 'English (Ghana)',
                        'value' => 'en_GH',
                      ),
                      165 => 
                      array (
                        'key' => 'English (Gibraltar)',
                        'value' => 'en_GI',
                      ),
                      166 => 
                      array (
                        'key' => 'English (Grenada)',
                        'value' => 'en_GD',
                      ),
                      167 => 
                      array (
                        'key' => 'English (Guam)',
                        'value' => 'en_GU',
                      ),
                      168 => 
                      array (
                        'key' => 'English (Guernsey)',
                        'value' => 'en_GG',
                      ),
                      169 => 
                      array (
                        'key' => 'English (Guyana)',
                        'value' => 'en_GY',
                      ),
                      170 => 
                      array (
                        'key' => 'English (Hong Kong SAR China)',
                        'value' => 'en_HK',
                      ),
                      171 => 
                      array (
                        'key' => 'English (India)',
                        'value' => 'en_IN',
                      ),
                      172 => 
                      array (
                        'key' => 'English (Ireland)',
                        'value' => 'en_IE',
                      ),
                      173 => 
                      array (
                        'key' => 'English (Isle of Man)',
                        'value' => 'en_IM',
                      ),
                      174 => 
                      array (
                        'key' => 'English (Israel)',
                        'value' => 'en_IL',
                      ),
                      175 => 
                      array (
                        'key' => 'English (Jamaica)',
                        'value' => 'en_JM',
                      ),
                      176 => 
                      array (
                        'key' => 'English (Jersey)',
                        'value' => 'en_JE',
                      ),
                      177 => 
                      array (
                        'key' => 'English (Kenya)',
                        'value' => 'en_KE',
                      ),
                      178 => 
                      array (
                        'key' => 'English (Kiribati)',
                        'value' => 'en_KI',
                      ),
                      179 => 
                      array (
                        'key' => 'English (Lesotho)',
                        'value' => 'en_LS',
                      ),
                      180 => 
                      array (
                        'key' => 'English (Liberia)',
                        'value' => 'en_LR',
                      ),
                      181 => 
                      array (
                        'key' => 'English (Macau SAR China)',
                        'value' => 'en_MO',
                      ),
                      182 => 
                      array (
                        'key' => 'English (Madagascar)',
                        'value' => 'en_MG',
                      ),
                      183 => 
                      array (
                        'key' => 'English (Malawi)',
                        'value' => 'en_MW',
                      ),
                      184 => 
                      array (
                        'key' => 'English (Malaysia)',
                        'value' => 'en_MY',
                      ),
                      185 => 
                      array (
                        'key' => 'English (Malta)',
                        'value' => 'en_MT',
                      ),
                      186 => 
                      array (
                        'key' => 'English (Marshall Islands)',
                        'value' => 'en_MH',
                      ),
                      187 => 
                      array (
                        'key' => 'English (Mauritius)',
                        'value' => 'en_MU',
                      ),
                      188 => 
                      array (
                        'key' => 'English (Micronesia)',
                        'value' => 'en_FM',
                      ),
                      189 => 
                      array (
                        'key' => 'English (Montserrat)',
                        'value' => 'en_MS',
                      ),
                      190 => 
                      array (
                        'key' => 'English (Namibia)',
                        'value' => 'en_NA',
                      ),
                      191 => 
                      array (
                        'key' => 'English (Nauru)',
                        'value' => 'en_NR',
                      ),
                      192 => 
                      array (
                        'key' => 'English (Netherlands)',
                        'value' => 'en_NL',
                      ),
                      193 => 
                      array (
                        'key' => 'English (New Zealand)',
                        'value' => 'en_NZ',
                      ),
                      194 => 
                      array (
                        'key' => 'English (Nigeria)',
                        'value' => 'en_NG',
                      ),
                      195 => 
                      array (
                        'key' => 'English (Niue)',
                        'value' => 'en_NU',
                      ),
                      196 => 
                      array (
                        'key' => 'English (Norfolk Island)',
                        'value' => 'en_NF',
                      ),
                      197 => 
                      array (
                        'key' => 'English (Northern Mariana Islands)',
                        'value' => 'en_MP',
                      ),
                      198 => 
                      array (
                        'key' => 'English (Pakistan)',
                        'value' => 'en_PK',
                      ),
                      199 => 
                      array (
                        'key' => 'English (Palau)',
                        'value' => 'en_PW',
                      ),
                      200 => 
                      array (
                        'key' => 'English (Papua New Guinea)',
                        'value' => 'en_PG',
                      ),
                      201 => 
                      array (
                        'key' => 'English (Philippines)',
                        'value' => 'en_PH',
                      ),
                      202 => 
                      array (
                        'key' => 'English (Pitcairn Islands)',
                        'value' => 'en_PN',
                      ),
                      203 => 
                      array (
                        'key' => 'English (Puerto Rico)',
                        'value' => 'en_PR',
                      ),
                      204 => 
                      array (
                        'key' => 'English (Rwanda)',
                        'value' => 'en_RW',
                      ),
                      205 => 
                      array (
                        'key' => 'English (Samoa)',
                        'value' => 'en_WS',
                      ),
                      206 => 
                      array (
                        'key' => 'English (Seychelles)',
                        'value' => 'en_SC',
                      ),
                      207 => 
                      array (
                        'key' => 'English (Sierra Leone)',
                        'value' => 'en_SL',
                      ),
                      208 => 
                      array (
                        'key' => 'English (Singapore)',
                        'value' => 'en_SG',
                      ),
                      209 => 
                      array (
                        'key' => 'English (Sint Maarten)',
                        'value' => 'en_SX',
                      ),
                      210 => 
                      array (
                        'key' => 'English (Slovenia)',
                        'value' => 'en_SI',
                      ),
                      211 => 
                      array (
                        'key' => 'English (Solomon Islands)',
                        'value' => 'en_SB',
                      ),
                      212 => 
                      array (
                        'key' => 'English (South Africa)',
                        'value' => 'en_ZA',
                      ),
                      213 => 
                      array (
                        'key' => 'English (South Sudan)',
                        'value' => 'en_SS',
                      ),
                      214 => 
                      array (
                        'key' => 'English (St. Helena)',
                        'value' => 'en_SH',
                      ),
                      215 => 
                      array (
                        'key' => 'English (St. Kitts & Nevis)',
                        'value' => 'en_KN',
                      ),
                      216 => 
                      array (
                        'key' => 'English (St. Lucia)',
                        'value' => 'en_LC',
                      ),
                      217 => 
                      array (
                        'key' => 'English (St. Vincent & Grenadines)',
                        'value' => 'en_VC',
                      ),
                      218 => 
                      array (
                        'key' => 'English (Sudan)',
                        'value' => 'en_SD',
                      ),
                      219 => 
                      array (
                        'key' => 'English (Swaziland)',
                        'value' => 'en_SZ',
                      ),
                      220 => 
                      array (
                        'key' => 'English (Sweden)',
                        'value' => 'en_SE',
                      ),
                      221 => 
                      array (
                        'key' => 'English (Switzerland)',
                        'value' => 'en_CH',
                      ),
                      222 => 
                      array (
                        'key' => 'English (Tanzania)',
                        'value' => 'en_TZ',
                      ),
                      223 => 
                      array (
                        'key' => 'English (Tokelau)',
                        'value' => 'en_TK',
                      ),
                      224 => 
                      array (
                        'key' => 'English (Tonga)',
                        'value' => 'en_TO',
                      ),
                      225 => 
                      array (
                        'key' => 'English (Trinidad & Tobago)',
                        'value' => 'en_TT',
                      ),
                      226 => 
                      array (
                        'key' => 'English (Turks & Caicos Islands)',
                        'value' => 'en_TC',
                      ),
                      227 => 
                      array (
                        'key' => 'English (Tuvalu)',
                        'value' => 'en_TV',
                      ),
                      228 => 
                      array (
                        'key' => 'English (U.S. Outlying Islands)',
                        'value' => 'en_UM',
                      ),
                      229 => 
                      array (
                        'key' => 'English (U.S. Virgin Islands)',
                        'value' => 'en_VI',
                      ),
                      230 => 
                      array (
                        'key' => 'English (Uganda)',
                        'value' => 'en_UG',
                      ),
                      231 => 
                      array (
                        'key' => 'English (United Kingdom)',
                        'value' => 'en_GB',
                      ),
                      232 => 
                      array (
                        'key' => 'English (United States)',
                        'value' => 'en_US_POSIX',
                      ),
                      233 => 
                      array (
                        'key' => 'English (United States)',
                        'value' => 'en_US',
                      ),
                      234 => 
                      array (
                        'key' => 'English (Vanuatu)',
                        'value' => 'en_VU',
                      ),
                      235 => 
                      array (
                        'key' => 'English (World)',
                        'value' => 'en_001',
                      ),
                      236 => 
                      array (
                        'key' => 'English (Zambia)',
                        'value' => 'en_ZM',
                      ),
                      237 => 
                      array (
                        'key' => 'English (Zimbabwe)',
                        'value' => 'en_ZW',
                      ),
                      238 => 
                      array (
                        'key' => 'Esperanto',
                        'value' => 'eo',
                      ),
                      239 => 
                      array (
                        'key' => 'Estonian',
                        'value' => 'et',
                      ),
                      240 => 
                      array (
                        'key' => 'Estonian (Estonia)',
                        'value' => 'et_EE',
                      ),
                      241 => 
                      array (
                        'key' => 'Ewe',
                        'value' => 'ee',
                      ),
                      242 => 
                      array (
                        'key' => 'Ewe (Ghana)',
                        'value' => 'ee_GH',
                      ),
                      243 => 
                      array (
                        'key' => 'Ewe (Togo)',
                        'value' => 'ee_TG',
                      ),
                      244 => 
                      array (
                        'key' => 'Ewondo',
                        'value' => 'ewo',
                      ),
                      245 => 
                      array (
                        'key' => 'Ewondo (Cameroon)',
                        'value' => 'ewo_CM',
                      ),
                      246 => 
                      array (
                        'key' => 'Faroese',
                        'value' => 'fo',
                      ),
                      247 => 
                      array (
                        'key' => 'Faroese (Denmark)',
                        'value' => 'fo_DK',
                      ),
                      248 => 
                      array (
                        'key' => 'Faroese (Faroe Islands)',
                        'value' => 'fo_FO',
                      ),
                      249 => 
                      array (
                        'key' => 'Filipino',
                        'value' => 'fil',
                      ),
                      250 => 
                      array (
                        'key' => 'Filipino (Philippines)',
                        'value' => 'fil_PH',
                      ),
                      251 => 
                      array (
                        'key' => 'Finnish',
                        'value' => 'fi',
                      ),
                      252 => 
                      array (
                        'key' => 'Finnish (Finland)',
                        'value' => 'fi_FI',
                      ),
                      253 => 
                      array (
                        'key' => 'French',
                        'value' => 'fr',
                      ),
                      254 => 
                      array (
                        'key' => 'French (Algeria)',
                        'value' => 'fr_DZ',
                      ),
                      255 => 
                      array (
                        'key' => 'French (Belgium)',
                        'value' => 'fr_BE',
                      ),
                      256 => 
                      array (
                        'key' => 'French (Benin)',
                        'value' => 'fr_BJ',
                      ),
                      257 => 
                      array (
                        'key' => 'French (Burkina Faso)',
                        'value' => 'fr_BF',
                      ),
                      258 => 
                      array (
                        'key' => 'French (Burundi)',
                        'value' => 'fr_BI',
                      ),
                      259 => 
                      array (
                        'key' => 'French (Cameroon)',
                        'value' => 'fr_CM',
                      ),
                      260 => 
                      array (
                        'key' => 'French (Canada)',
                        'value' => 'fr_CA',
                      ),
                      261 => 
                      array (
                        'key' => 'French (Central African Republic)',
                        'value' => 'fr_CF',
                      ),
                      262 => 
                      array (
                        'key' => 'French (Chad)',
                        'value' => 'fr_TD',
                      ),
                      263 => 
                      array (
                        'key' => 'French (Comoros)',
                        'value' => 'fr_KM',
                      ),
                      264 => 
                      array (
                        'key' => 'French (Congo - Brazzaville)',
                        'value' => 'fr_CG',
                      ),
                      265 => 
                      array (
                        'key' => 'French (Congo - Kinshasa)',
                        'value' => 'fr_CD',
                      ),
                      266 => 
                      array (
                        'key' => 'French (Côte d’Ivoire)',
                        'value' => 'fr_CI',
                      ),
                      267 => 
                      array (
                        'key' => 'French (Djibouti)',
                        'value' => 'fr_DJ',
                      ),
                      268 => 
                      array (
                        'key' => 'French (Equatorial Guinea)',
                        'value' => 'fr_GQ',
                      ),
                      269 => 
                      array (
                        'key' => 'French (France)',
                        'value' => 'fr_FR',
                      ),
                      270 => 
                      array (
                        'key' => 'French (French Guiana)',
                        'value' => 'fr_GF',
                      ),
                      271 => 
                      array (
                        'key' => 'French (French Polynesia)',
                        'value' => 'fr_PF',
                      ),
                      272 => 
                      array (
                        'key' => 'French (Gabon)',
                        'value' => 'fr_GA',
                      ),
                      273 => 
                      array (
                        'key' => 'French (Guadeloupe)',
                        'value' => 'fr_GP',
                      ),
                      274 => 
                      array (
                        'key' => 'French (Guinea)',
                        'value' => 'fr_GN',
                      ),
                      275 => 
                      array (
                        'key' => 'French (Haiti)',
                        'value' => 'fr_HT',
                      ),
                      276 => 
                      array (
                        'key' => 'French (Luxembourg)',
                        'value' => 'fr_LU',
                      ),
                      277 => 
                      array (
                        'key' => 'French (Madagascar)',
                        'value' => 'fr_MG',
                      ),
                      278 => 
                      array (
                        'key' => 'French (Mali)',
                        'value' => 'fr_ML',
                      ),
                      279 => 
                      array (
                        'key' => 'French (Martinique)',
                        'value' => 'fr_MQ',
                      ),
                      280 => 
                      array (
                        'key' => 'French (Mauritania)',
                        'value' => 'fr_MR',
                      ),
                      281 => 
                      array (
                        'key' => 'French (Mauritius)',
                        'value' => 'fr_MU',
                      ),
                      282 => 
                      array (
                        'key' => 'French (Mayotte)',
                        'value' => 'fr_YT',
                      ),
                      283 => 
                      array (
                        'key' => 'French (Monaco)',
                        'value' => 'fr_MC',
                      ),
                      284 => 
                      array (
                        'key' => 'French (Morocco)',
                        'value' => 'fr_MA',
                      ),
                      285 => 
                      array (
                        'key' => 'French (New Caledonia)',
                        'value' => 'fr_NC',
                      ),
                      286 => 
                      array (
                        'key' => 'French (Niger)',
                        'value' => 'fr_NE',
                      ),
                      287 => 
                      array (
                        'key' => 'French (Rwanda)',
                        'value' => 'fr_RW',
                      ),
                      288 => 
                      array (
                        'key' => 'French (Réunion)',
                        'value' => 'fr_RE',
                      ),
                      289 => 
                      array (
                        'key' => 'French (Senegal)',
                        'value' => 'fr_SN',
                      ),
                      290 => 
                      array (
                        'key' => 'French (Seychelles)',
                        'value' => 'fr_SC',
                      ),
                      291 => 
                      array (
                        'key' => 'French (St. Barthélemy)',
                        'value' => 'fr_BL',
                      ),
                      292 => 
                      array (
                        'key' => 'French (St. Martin)',
                        'value' => 'fr_MF',
                      ),
                      293 => 
                      array (
                        'key' => 'French (St. Pierre & Miquelon)',
                        'value' => 'fr_PM',
                      ),
                      294 => 
                      array (
                        'key' => 'French (Switzerland)',
                        'value' => 'fr_CH',
                      ),
                      295 => 
                      array (
                        'key' => 'French (Syria)',
                        'value' => 'fr_SY',
                      ),
                      296 => 
                      array (
                        'key' => 'French (Togo)',
                        'value' => 'fr_TG',
                      ),
                      297 => 
                      array (
                        'key' => 'French (Tunisia)',
                        'value' => 'fr_TN',
                      ),
                      298 => 
                      array (
                        'key' => 'French (Vanuatu)',
                        'value' => 'fr_VU',
                      ),
                      299 => 
                      array (
                        'key' => 'French (Wallis & Futuna)',
                        'value' => 'fr_WF',
                      ),
                      300 => 
                      array (
                        'key' => 'Friulian',
                        'value' => 'fur',
                      ),
                      301 => 
                      array (
                        'key' => 'Friulian (Italy)',
                        'value' => 'fur_IT',
                      ),
                      302 => 
                      array (
                        'key' => 'Fulah',
                        'value' => 'ff',
                      ),
                      303 => 
                      array (
                        'key' => 'Fulah (Cameroon)',
                        'value' => 'ff_CM',
                      ),
                      304 => 
                      array (
                        'key' => 'Fulah (Guinea)',
                        'value' => 'ff_GN',
                      ),
                      305 => 
                      array (
                        'key' => 'Fulah (Mauritania)',
                        'value' => 'ff_MR',
                      ),
                      306 => 
                      array (
                        'key' => 'Fulah (Senegal)',
                        'value' => 'ff_SN',
                      ),
                      307 => 
                      array (
                        'key' => 'Galician',
                        'value' => 'gl',
                      ),
                      308 => 
                      array (
                        'key' => 'Galician (Spain)',
                        'value' => 'gl_ES',
                      ),
                      309 => 
                      array (
                        'key' => 'Ganda',
                        'value' => 'lg',
                      ),
                      310 => 
                      array (
                        'key' => 'Ganda (Uganda)',
                        'value' => 'lg_UG',
                      ),
                      311 => 
                      array (
                        'key' => 'Georgian',
                        'value' => 'ka',
                      ),
                      312 => 
                      array (
                        'key' => 'Georgian (Georgia)',
                        'value' => 'ka_GE',
                      ),
                      313 => 
                      array (
                        'key' => 'German',
                        'value' => 'de',
                      ),
                      314 => 
                      array (
                        'key' => 'German (Austria)',
                        'value' => 'de_AT',
                      ),
                      315 => 
                      array (
                        'key' => 'German (Belgium)',
                        'value' => 'de_BE',
                      ),
                      316 => 
                      array (
                        'key' => 'German (Germany)',
                        'value' => 'de_DE',
                      ),
                      317 => 
                      array (
                        'key' => 'German (Liechtenstein)',
                        'value' => 'de_LI',
                      ),
                      318 => 
                      array (
                        'key' => 'German (Luxembourg)',
                        'value' => 'de_LU',
                      ),
                      319 => 
                      array (
                        'key' => 'German (Switzerland)',
                        'value' => 'de_CH',
                      ),
                      320 => 
                      array (
                        'key' => 'Greek',
                        'value' => 'el',
                      ),
                      321 => 
                      array (
                        'key' => 'Greek (Cyprus)',
                        'value' => 'el_CY',
                      ),
                      322 => 
                      array (
                        'key' => 'Greek (Greece)',
                        'value' => 'el_GR',
                      ),
                      323 => 
                      array (
                        'key' => 'Gujarati',
                        'value' => 'gu',
                      ),
                      324 => 
                      array (
                        'key' => 'Gujarati (India)',
                        'value' => 'gu_IN',
                      ),
                      325 => 
                      array (
                        'key' => 'Gusii',
                        'value' => 'guz',
                      ),
                      326 => 
                      array (
                        'key' => 'Gusii (Kenya)',
                        'value' => 'guz_KE',
                      ),
                      327 => 
                      array (
                        'key' => 'Hausa',
                        'value' => 'ha',
                      ),
                      328 => 
                      array (
                        'key' => 'Hausa (Ghana)',
                        'value' => 'ha_GH',
                      ),
                      329 => 
                      array (
                        'key' => 'Hausa (Niger)',
                        'value' => 'ha_NE',
                      ),
                      330 => 
                      array (
                        'key' => 'Hausa (Nigeria)',
                        'value' => 'ha_NG',
                      ),
                      331 => 
                      array (
                        'key' => 'Hawaiian',
                        'value' => 'haw',
                      ),
                      332 => 
                      array (
                        'key' => 'Hawaiian (United States)',
                        'value' => 'haw_US',
                      ),
                      333 => 
                      array (
                        'key' => 'Hebrew',
                        'value' => 'he',
                      ),
                      334 => 
                      array (
                        'key' => 'Hebrew (Israel)',
                        'value' => 'he_IL',
                      ),
                      335 => 
                      array (
                        'key' => 'Hindi',
                        'value' => 'hi',
                      ),
                      336 => 
                      array (
                        'key' => 'Hindi (India)',
                        'value' => 'hi_IN',
                      ),
                      337 => 
                      array (
                        'key' => 'Hungarian',
                        'value' => 'hu',
                      ),
                      338 => 
                      array (
                        'key' => 'Hungarian (Hungary)',
                        'value' => 'hu_HU',
                      ),
                      339 => 
                      array (
                        'key' => 'Icelandic',
                        'value' => 'is',
                      ),
                      340 => 
                      array (
                        'key' => 'Icelandic (Iceland)',
                        'value' => 'is_IS',
                      ),
                      341 => 
                      array (
                        'key' => 'Igbo',
                        'value' => 'ig',
                      ),
                      342 => 
                      array (
                        'key' => 'Igbo (Nigeria)',
                        'value' => 'ig_NG',
                      ),
                      343 => 
                      array (
                        'key' => 'Inari Sami',
                        'value' => 'smn',
                      ),
                      344 => 
                      array (
                        'key' => 'Inari Sami (Finland)',
                        'value' => 'smn_FI',
                      ),
                      345 => 
                      array (
                        'key' => 'Indonesian',
                        'value' => 'id',
                      ),
                      346 => 
                      array (
                        'key' => 'Indonesian (Indonesia)',
                        'value' => 'id_ID',
                      ),
                      347 => 
                      array (
                        'key' => 'Irish',
                        'value' => 'ga',
                      ),
                      348 => 
                      array (
                        'key' => 'Irish (Ireland)',
                        'value' => 'ga_IE',
                      ),
                      349 => 
                      array (
                        'key' => 'Italian',
                        'value' => 'it',
                      ),
                      350 => 
                      array (
                        'key' => 'Italian (Italy)',
                        'value' => 'it_IT',
                      ),
                      351 => 
                      array (
                        'key' => 'Italian (San Marino)',
                        'value' => 'it_SM',
                      ),
                      352 => 
                      array (
                        'key' => 'Italian (Switzerland)',
                        'value' => 'it_CH',
                      ),
                      353 => 
                      array (
                        'key' => 'Japanese',
                        'value' => 'ja',
                      ),
                      354 => 
                      array (
                        'key' => 'Japanese (Japan)',
                        'value' => 'ja_JP',
                      ),
                      355 => 
                      array (
                        'key' => 'Jola-Fonyi',
                        'value' => 'dyo',
                      ),
                      356 => 
                      array (
                        'key' => 'Jola-Fonyi (Senegal)',
                        'value' => 'dyo_SN',
                      ),
                      357 => 
                      array (
                        'key' => 'Kabuverdianu',
                        'value' => 'kea',
                      ),
                      358 => 
                      array (
                        'key' => 'Kabuverdianu (Cape Verde)',
                        'value' => 'kea_CV',
                      ),
                      359 => 
                      array (
                        'key' => 'Kabyle',
                        'value' => 'kab',
                      ),
                      360 => 
                      array (
                        'key' => 'Kabyle (Algeria)',
                        'value' => 'kab_DZ',
                      ),
                      361 => 
                      array (
                        'key' => 'Kako',
                        'value' => 'kkj',
                      ),
                      362 => 
                      array (
                        'key' => 'Kako (Cameroon)',
                        'value' => 'kkj_CM',
                      ),
                      363 => 
                      array (
                        'key' => 'Kalaallisut',
                        'value' => 'kl',
                      ),
                      364 => 
                      array (
                        'key' => 'Kalaallisut (Greenland)',
                        'value' => 'kl_GL',
                      ),
                      365 => 
                      array (
                        'key' => 'Kalenjin',
                        'value' => 'kln',
                      ),
                      366 => 
                      array (
                        'key' => 'Kalenjin (Kenya)',
                        'value' => 'kln_KE',
                      ),
                      367 => 
                      array (
                        'key' => 'Kamba',
                        'value' => 'kam',
                      ),
                      368 => 
                      array (
                        'key' => 'Kamba (Kenya)',
                        'value' => 'kam_KE',
                      ),
                      369 => 
                      array (
                        'key' => 'Kannada',
                        'value' => 'kn',
                      ),
                      370 => 
                      array (
                        'key' => 'Kannada (India)',
                        'value' => 'kn_IN',
                      ),
                      371 => 
                      array (
                        'key' => 'Kashmiri',
                        'value' => 'ks',
                      ),
                      372 => 
                      array (
                        'key' => 'Kashmiri (India)',
                        'value' => 'ks_IN',
                      ),
                      373 => 
                      array (
                        'key' => 'Kazakh',
                        'value' => 'kk',
                      ),
                      374 => 
                      array (
                        'key' => 'Kazakh (Kazakhstan)',
                        'value' => 'kk_KZ',
                      ),
                      375 => 
                      array (
                        'key' => 'Khmer',
                        'value' => 'km',
                      ),
                      376 => 
                      array (
                        'key' => 'Khmer (Cambodia)',
                        'value' => 'km_KH',
                      ),
                      377 => 
                      array (
                        'key' => 'Kikuyu',
                        'value' => 'ki',
                      ),
                      378 => 
                      array (
                        'key' => 'Kikuyu (Kenya)',
                        'value' => 'ki_KE',
                      ),
                      379 => 
                      array (
                        'key' => 'Kinyarwanda',
                        'value' => 'rw',
                      ),
                      380 => 
                      array (
                        'key' => 'Kinyarwanda (Rwanda)',
                        'value' => 'rw_RW',
                      ),
                      381 => 
                      array (
                        'key' => 'Konkani',
                        'value' => 'kok',
                      ),
                      382 => 
                      array (
                        'key' => 'Konkani (India)',
                        'value' => 'kok_IN',
                      ),
                      383 => 
                      array (
                        'key' => 'Korean',
                        'value' => 'ko',
                      ),
                      384 => 
                      array (
                        'key' => 'Korean (North Korea)',
                        'value' => 'ko_KP',
                      ),
                      385 => 
                      array (
                        'key' => 'Korean (South Korea)',
                        'value' => 'ko_KR',
                      ),
                      386 => 
                      array (
                        'key' => 'Koyra Chiini',
                        'value' => 'khq',
                      ),
                      387 => 
                      array (
                        'key' => 'Koyra Chiini (Mali)',
                        'value' => 'khq_ML',
                      ),
                      388 => 
                      array (
                        'key' => 'Koyraboro Senni',
                        'value' => 'ses',
                      ),
                      389 => 
                      array (
                        'key' => 'Koyraboro Senni (Mali)',
                        'value' => 'ses_ML',
                      ),
                      390 => 
                      array (
                        'key' => 'Kwasio',
                        'value' => 'nmg',
                      ),
                      391 => 
                      array (
                        'key' => 'Kwasio (Cameroon)',
                        'value' => 'nmg_CM',
                      ),
                      392 => 
                      array (
                        'key' => 'Kyrgyz',
                        'value' => 'ky',
                      ),
                      393 => 
                      array (
                        'key' => 'Kyrgyz (Kyrgyzstan)',
                        'value' => 'ky_KG',
                      ),
                      394 => 
                      array (
                        'key' => 'Lakota',
                        'value' => 'lkt',
                      ),
                      395 => 
                      array (
                        'key' => 'Lakota (United States)',
                        'value' => 'lkt_US',
                      ),
                      396 => 
                      array (
                        'key' => 'Langi',
                        'value' => 'lag',
                      ),
                      397 => 
                      array (
                        'key' => 'Langi (Tanzania)',
                        'value' => 'lag_TZ',
                      ),
                      398 => 
                      array (
                        'key' => 'Lao',
                        'value' => 'lo',
                      ),
                      399 => 
                      array (
                        'key' => 'Lao (Laos)',
                        'value' => 'lo_LA',
                      ),
                      400 => 
                      array (
                        'key' => 'Latvian',
                        'value' => 'lv',
                      ),
                      401 => 
                      array (
                        'key' => 'Latvian (Latvia)',
                        'value' => 'lv_LV',
                      ),
                      402 => 
                      array (
                        'key' => 'Lingala',
                        'value' => 'ln',
                      ),
                      403 => 
                      array (
                        'key' => 'Lingala (Angola)',
                        'value' => 'ln_AO',
                      ),
                      404 => 
                      array (
                        'key' => 'Lingala (Central African Republic)',
                        'value' => 'ln_CF',
                      ),
                      405 => 
                      array (
                        'key' => 'Lingala (Congo - Brazzaville)',
                        'value' => 'ln_CG',
                      ),
                      406 => 
                      array (
                        'key' => 'Lingala (Congo - Kinshasa)',
                        'value' => 'ln_CD',
                      ),
                      407 => 
                      array (
                        'key' => 'Lithuanian',
                        'value' => 'lt',
                      ),
                      408 => 
                      array (
                        'key' => 'Lithuanian (Lithuania)',
                        'value' => 'lt_LT',
                      ),
                      409 => 
                      array (
                        'key' => 'Lower Sorbian',
                        'value' => 'dsb',
                      ),
                      410 => 
                      array (
                        'key' => 'Lower Sorbian (Germany)',
                        'value' => 'dsb_DE',
                      ),
                      411 => 
                      array (
                        'key' => 'Luba-Katanga',
                        'value' => 'lu',
                      ),
                      412 => 
                      array (
                        'key' => 'Luba-Katanga (Congo - Kinshasa)',
                        'value' => 'lu_CD',
                      ),
                      413 => 
                      array (
                        'key' => 'Luo',
                        'value' => 'luo',
                      ),
                      414 => 
                      array (
                        'key' => 'Luo (Kenya)',
                        'value' => 'luo_KE',
                      ),
                      415 => 
                      array (
                        'key' => 'Luxembourgish',
                        'value' => 'lb',
                      ),
                      416 => 
                      array (
                        'key' => 'Luxembourgish (Luxembourg)',
                        'value' => 'lb_LU',
                      ),
                      417 => 
                      array (
                        'key' => 'Luyia',
                        'value' => 'luy',
                      ),
                      418 => 
                      array (
                        'key' => 'Luyia (Kenya)',
                        'value' => 'luy_KE',
                      ),
                      419 => 
                      array (
                        'key' => 'Macedonian',
                        'value' => 'mk',
                      ),
                      420 => 
                      array (
                        'key' => 'Macedonian (Macedonia)',
                        'value' => 'mk_MK',
                      ),
                      421 => 
                      array (
                        'key' => 'Machame',
                        'value' => 'jmc',
                      ),
                      422 => 
                      array (
                        'key' => 'Machame (Tanzania)',
                        'value' => 'jmc_TZ',
                      ),
                      423 => 
                      array (
                        'key' => 'Makhuwa-Meetto',
                        'value' => 'mgh',
                      ),
                      424 => 
                      array (
                        'key' => 'Makhuwa-Meetto (Mozambique)',
                        'value' => 'mgh_MZ',
                      ),
                      425 => 
                      array (
                        'key' => 'Makonde',
                        'value' => 'kde',
                      ),
                      426 => 
                      array (
                        'key' => 'Makonde (Tanzania)',
                        'value' => 'kde_TZ',
                      ),
                      427 => 
                      array (
                        'key' => 'Malagasy',
                        'value' => 'mg',
                      ),
                      428 => 
                      array (
                        'key' => 'Malagasy (Madagascar)',
                        'value' => 'mg_MG',
                      ),
                      429 => 
                      array (
                        'key' => 'Malay',
                        'value' => 'ms',
                      ),
                      430 => 
                      array (
                        'key' => 'Malay (Brunei)',
                        'value' => 'ms_BN',
                      ),
                      431 => 
                      array (
                        'key' => 'Malay (Malaysia)',
                        'value' => 'ms_MY',
                      ),
                      432 => 
                      array (
                        'key' => 'Malay (Singapore)',
                        'value' => 'ms_SG',
                      ),
                      433 => 
                      array (
                        'key' => 'Malayalam',
                        'value' => 'ml',
                      ),
                      434 => 
                      array (
                        'key' => 'Malayalam (India)',
                        'value' => 'ml_IN',
                      ),
                      435 => 
                      array (
                        'key' => 'Maltese',
                        'value' => 'mt',
                      ),
                      436 => 
                      array (
                        'key' => 'Maltese (Malta)',
                        'value' => 'mt_MT',
                      ),
                      437 => 
                      array (
                        'key' => 'Manx',
                        'value' => 'gv',
                      ),
                      438 => 
                      array (
                        'key' => 'Manx (Isle of Man)',
                        'value' => 'gv_IM',
                      ),
                      439 => 
                      array (
                        'key' => 'Marathi',
                        'value' => 'mr',
                      ),
                      440 => 
                      array (
                        'key' => 'Marathi (India)',
                        'value' => 'mr_IN',
                      ),
                      441 => 
                      array (
                        'key' => 'Masai',
                        'value' => 'mas',
                      ),
                      442 => 
                      array (
                        'key' => 'Masai (Kenya)',
                        'value' => 'mas_KE',
                      ),
                      443 => 
                      array (
                        'key' => 'Masai (Tanzania)',
                        'value' => 'mas_TZ',
                      ),
                      444 => 
                      array (
                        'key' => 'Mazanderani',
                        'value' => 'mzn',
                      ),
                      445 => 
                      array (
                        'key' => 'Mazanderani (Iran)',
                        'value' => 'mzn_IR',
                      ),
                      446 => 
                      array (
                        'key' => 'Meru',
                        'value' => 'mer',
                      ),
                      447 => 
                      array (
                        'key' => 'Meru (Kenya)',
                        'value' => 'mer_KE',
                      ),
                      448 => 
                      array (
                        'key' => 'Metaʼ',
                        'value' => 'mgo',
                      ),
                      449 => 
                      array (
                        'key' => 'Metaʼ (Cameroon)',
                        'value' => 'mgo_CM',
                      ),
                      450 => 
                      array (
                        'key' => 'Mongolian',
                        'value' => 'mn',
                      ),
                      451 => 
                      array (
                        'key' => 'Mongolian (Mongolia)',
                        'value' => 'mn_MN',
                      ),
                      452 => 
                      array (
                        'key' => 'Morisyen',
                        'value' => 'mfe',
                      ),
                      453 => 
                      array (
                        'key' => 'Morisyen (Mauritius)',
                        'value' => 'mfe_MU',
                      ),
                      454 => 
                      array (
                        'key' => 'Mundang',
                        'value' => 'mua',
                      ),
                      455 => 
                      array (
                        'key' => 'Mundang (Cameroon)',
                        'value' => 'mua_CM',
                      ),
                      456 => 
                      array (
                        'key' => 'Nama',
                        'value' => 'naq',
                      ),
                      457 => 
                      array (
                        'key' => 'Nama (Namibia)',
                        'value' => 'naq_NA',
                      ),
                      458 => 
                      array (
                        'key' => 'Nepali',
                        'value' => 'ne',
                      ),
                      459 => 
                      array (
                        'key' => 'Nepali (India)',
                        'value' => 'ne_IN',
                      ),
                      460 => 
                      array (
                        'key' => 'Nepali (Nepal)',
                        'value' => 'ne_NP',
                      ),
                      461 => 
                      array (
                        'key' => 'Ngiemboon',
                        'value' => 'nnh',
                      ),
                      462 => 
                      array (
                        'key' => 'Ngiemboon (Cameroon)',
                        'value' => 'nnh_CM',
                      ),
                      463 => 
                      array (
                        'key' => 'Ngomba',
                        'value' => 'jgo',
                      ),
                      464 => 
                      array (
                        'key' => 'Ngomba (Cameroon)',
                        'value' => 'jgo_CM',
                      ),
                      465 => 
                      array (
                        'key' => 'North Ndebele',
                        'value' => 'nd',
                      ),
                      466 => 
                      array (
                        'key' => 'North Ndebele (Zimbabwe)',
                        'value' => 'nd_ZW',
                      ),
                      467 => 
                      array (
                        'key' => 'Northern Luri',
                        'value' => 'lrc',
                      ),
                      468 => 
                      array (
                        'key' => 'Northern Luri (Iran)',
                        'value' => 'lrc_IR',
                      ),
                      469 => 
                      array (
                        'key' => 'Northern Luri (Iraq)',
                        'value' => 'lrc_IQ',
                      ),
                      470 => 
                      array (
                        'key' => 'Northern Sami',
                        'value' => 'se',
                      ),
                      471 => 
                      array (
                        'key' => 'Northern Sami (Finland)',
                        'value' => 'se_FI',
                      ),
                      472 => 
                      array (
                        'key' => 'Northern Sami (Norway)',
                        'value' => 'se_NO',
                      ),
                      473 => 
                      array (
                        'key' => 'Northern Sami (Sweden)',
                        'value' => 'se_SE',
                      ),
                      474 => 
                      array (
                        'key' => 'Norwegian Bokmål',
                        'value' => 'nb',
                      ),
                      475 => 
                      array (
                        'key' => 'Norwegian Bokmål (Norway)',
                        'value' => 'nb_NO',
                      ),
                      476 => 
                      array (
                        'key' => 'Norwegian Bokmål (Svalbard & Jan Mayen)',
                        'value' => 'nb_SJ',
                      ),
                      477 => 
                      array (
                        'key' => 'Norwegian Nynorsk',
                        'value' => 'nn',
                      ),
                      478 => 
                      array (
                        'key' => 'Norwegian Nynorsk (Norway)',
                        'value' => 'nn_NO',
                      ),
                      479 => 
                      array (
                        'key' => 'Nuer',
                        'value' => 'nus',
                      ),
                      480 => 
                      array (
                        'key' => 'Nuer (South Sudan)',
                        'value' => 'nus_SS',
                      ),
                      481 => 
                      array (
                        'key' => 'Nyankole',
                        'value' => 'nyn',
                      ),
                      482 => 
                      array (
                        'key' => 'Nyankole (Uganda)',
                        'value' => 'nyn_UG',
                      ),
                      483 => 
                      array (
                        'key' => 'Oriya',
                        'value' => 'or',
                      ),
                      484 => 
                      array (
                        'key' => 'Oriya (India)',
                        'value' => 'or_IN',
                      ),
                      485 => 
                      array (
                        'key' => 'Oromo',
                        'value' => 'om',
                      ),
                      486 => 
                      array (
                        'key' => 'Oromo (Ethiopia)',
                        'value' => 'om_ET',
                      ),
                      487 => 
                      array (
                        'key' => 'Oromo (Kenya)',
                        'value' => 'om_KE',
                      ),
                      488 => 
                      array (
                        'key' => 'Ossetic',
                        'value' => 'os',
                      ),
                      489 => 
                      array (
                        'key' => 'Ossetic (Georgia)',
                        'value' => 'os_GE',
                      ),
                      490 => 
                      array (
                        'key' => 'Ossetic (Russia)',
                        'value' => 'os_RU',
                      ),
                      491 => 
                      array (
                        'key' => 'Pashto',
                        'value' => 'ps',
                      ),
                      492 => 
                      array (
                        'key' => 'Pashto (Afghanistan)',
                        'value' => 'ps_AF',
                      ),
                      493 => 
                      array (
                        'key' => 'Persian',
                        'value' => 'fa',
                      ),
                      494 => 
                      array (
                        'key' => 'Persian (Afghanistan)',
                        'value' => 'fa_AF',
                      ),
                      495 => 
                      array (
                        'key' => 'Persian (Iran)',
                        'value' => 'fa_IR',
                      ),
                      496 => 
                      array (
                        'key' => 'Polish',
                        'value' => 'pl',
                      ),
                      497 => 
                      array (
                        'key' => 'Polish (Poland)',
                        'value' => 'pl_PL',
                      ),
                      498 => 
                      array (
                        'key' => 'Portuguese',
                        'value' => 'pt',
                      ),
                      499 => 
                      array (
                        'key' => 'Portuguese (Angola)',
                        'value' => 'pt_AO',
                      ),
                      500 => 
                      array (
                        'key' => 'Portuguese (Brazil)',
                        'value' => 'pt_BR',
                      ),
                      501 => 
                      array (
                        'key' => 'Portuguese (Cape Verde)',
                        'value' => 'pt_CV',
                      ),
                      502 => 
                      array (
                        'key' => 'Portuguese (Guinea-Bissau)',
                        'value' => 'pt_GW',
                      ),
                      503 => 
                      array (
                        'key' => 'Portuguese (Macau SAR China)',
                        'value' => 'pt_MO',
                      ),
                      504 => 
                      array (
                        'key' => 'Portuguese (Mozambique)',
                        'value' => 'pt_MZ',
                      ),
                      505 => 
                      array (
                        'key' => 'Portuguese (Portugal)',
                        'value' => 'pt_PT',
                      ),
                      506 => 
                      array (
                        'key' => 'Portuguese (São Tomé & Príncipe)',
                        'value' => 'pt_ST',
                      ),
                      507 => 
                      array (
                        'key' => 'Portuguese (Timor-Leste)',
                        'value' => 'pt_TL',
                      ),
                      508 => 
                      array (
                        'key' => 'Punjabi',
                        'value' => 'pa',
                      ),
                      509 => 
                      array (
                        'key' => 'Punjabi',
                        'value' => 'pa_Guru',
                      ),
                      510 => 
                      array (
                        'key' => 'Punjabi',
                        'value' => 'pa_Arab',
                      ),
                      511 => 
                      array (
                        'key' => 'Punjabi (India)',
                        'value' => 'pa_Guru_IN',
                      ),
                      512 => 
                      array (
                        'key' => 'Punjabi (Pakistan)',
                        'value' => 'pa_Arab_PK',
                      ),
                      513 => 
                      array (
                        'key' => 'Quechua',
                        'value' => 'qu',
                      ),
                      514 => 
                      array (
                        'key' => 'Quechua (Bolivia)',
                        'value' => 'qu_BO',
                      ),
                      515 => 
                      array (
                        'key' => 'Quechua (Ecuador)',
                        'value' => 'qu_EC',
                      ),
                      516 => 
                      array (
                        'key' => 'Quechua (Peru)',
                        'value' => 'qu_PE',
                      ),
                      517 => 
                      array (
                        'key' => 'Romanian',
                        'value' => 'ro',
                      ),
                      518 => 
                      array (
                        'key' => 'Romanian (Moldova)',
                        'value' => 'ro_MD',
                      ),
                      519 => 
                      array (
                        'key' => 'Romanian (Romania)',
                        'value' => 'ro_RO',
                      ),
                      520 => 
                      array (
                        'key' => 'Romansh',
                        'value' => 'rm',
                      ),
                      521 => 
                      array (
                        'key' => 'Romansh (Switzerland)',
                        'value' => 'rm_CH',
                      ),
                      522 => 
                      array (
                        'key' => 'Rombo',
                        'value' => 'rof',
                      ),
                      523 => 
                      array (
                        'key' => 'Rombo (Tanzania)',
                        'value' => 'rof_TZ',
                      ),
                      524 => 
                      array (
                        'key' => 'Rundi',
                        'value' => 'rn',
                      ),
                      525 => 
                      array (
                        'key' => 'Rundi (Burundi)',
                        'value' => 'rn_BI',
                      ),
                      526 => 
                      array (
                        'key' => 'Russian',
                        'value' => 'ru',
                      ),
                      527 => 
                      array (
                        'key' => 'Russian (Belarus)',
                        'value' => 'ru_BY',
                      ),
                      528 => 
                      array (
                        'key' => 'Russian (Kazakhstan)',
                        'value' => 'ru_KZ',
                      ),
                      529 => 
                      array (
                        'key' => 'Russian (Kyrgyzstan)',
                        'value' => 'ru_KG',
                      ),
                      530 => 
                      array (
                        'key' => 'Russian (Moldova)',
                        'value' => 'ru_MD',
                      ),
                      531 => 
                      array (
                        'key' => 'Russian (Russia)',
                        'value' => 'ru_RU',
                      ),
                      532 => 
                      array (
                        'key' => 'Russian (Ukraine)',
                        'value' => 'ru_UA',
                      ),
                      533 => 
                      array (
                        'key' => 'Rwa',
                        'value' => 'rwk',
                      ),
                      534 => 
                      array (
                        'key' => 'Rwa (Tanzania)',
                        'value' => 'rwk_TZ',
                      ),
                      535 => 
                      array (
                        'key' => 'Sakha',
                        'value' => 'sah',
                      ),
                      536 => 
                      array (
                        'key' => 'Sakha (Russia)',
                        'value' => 'sah_RU',
                      ),
                      537 => 
                      array (
                        'key' => 'Samburu',
                        'value' => 'saq',
                      ),
                      538 => 
                      array (
                        'key' => 'Samburu (Kenya)',
                        'value' => 'saq_KE',
                      ),
                      539 => 
                      array (
                        'key' => 'Sango',
                        'value' => 'sg',
                      ),
                      540 => 
                      array (
                        'key' => 'Sango (Central African Republic)',
                        'value' => 'sg_CF',
                      ),
                      541 => 
                      array (
                        'key' => 'Sangu',
                        'value' => 'sbp',
                      ),
                      542 => 
                      array (
                        'key' => 'Sangu (Tanzania)',
                        'value' => 'sbp_TZ',
                      ),
                      543 => 
                      array (
                        'key' => 'Scottish Gaelic',
                        'value' => 'gd',
                      ),
                      544 => 
                      array (
                        'key' => 'Scottish Gaelic (United Kingdom)',
                        'value' => 'gd_GB',
                      ),
                      545 => 
                      array (
                        'key' => 'Sena',
                        'value' => 'seh',
                      ),
                      546 => 
                      array (
                        'key' => 'Sena (Mozambique)',
                        'value' => 'seh_MZ',
                      ),
                      547 => 
                      array (
                        'key' => 'Serbian',
                        'value' => 'sr_Cyrl',
                      ),
                      548 => 
                      array (
                        'key' => 'Serbian',
                        'value' => 'sr_Latn',
                      ),
                      549 => 
                      array (
                        'key' => 'Serbian',
                        'value' => 'sr',
                      ),
                      550 => 
                      array (
                        'key' => 'Serbian (Bosnia & Herzegovina)',
                        'value' => 'sr_Latn_BA',
                      ),
                      551 => 
                      array (
                        'key' => 'Serbian (Bosnia & Herzegovina)',
                        'value' => 'sr_Cyrl_BA',
                      ),
                      552 => 
                      array (
                        'key' => 'Serbian (Kosovo)',
                        'value' => 'sr_Cyrl_XK',
                      ),
                      553 => 
                      array (
                        'key' => 'Serbian (Kosovo)',
                        'value' => 'sr_Latn_XK',
                      ),
                      554 => 
                      array (
                        'key' => 'Serbian (Montenegro)',
                        'value' => 'sr_Cyrl_ME',
                      ),
                      555 => 
                      array (
                        'key' => 'Serbian (Montenegro)',
                        'value' => 'sr_Latn_ME',
                      ),
                      556 => 
                      array (
                        'key' => 'Serbian (Serbia)',
                        'value' => 'sr_Cyrl_RS',
                      ),
                      557 => 
                      array (
                        'key' => 'Serbian (Serbia)',
                        'value' => 'sr_Latn_RS',
                      ),
                      558 => 
                      array (
                        'key' => 'Shambala',
                        'value' => 'ksb',
                      ),
                      559 => 
                      array (
                        'key' => 'Shambala (Tanzania)',
                        'value' => 'ksb_TZ',
                      ),
                      560 => 
                      array (
                        'key' => 'Shona',
                        'value' => 'sn',
                      ),
                      561 => 
                      array (
                        'key' => 'Shona (Zimbabwe)',
                        'value' => 'sn_ZW',
                      ),
                      562 => 
                      array (
                        'key' => 'Sichuan Yi',
                        'value' => 'ii',
                      ),
                      563 => 
                      array (
                        'key' => 'Sichuan Yi (China)',
                        'value' => 'ii_CN',
                      ),
                      564 => 
                      array (
                        'key' => 'Sinhala',
                        'value' => 'si',
                      ),
                      565 => 
                      array (
                        'key' => 'Sinhala (Sri Lanka)',
                        'value' => 'si_LK',
                      ),
                      566 => 
                      array (
                        'key' => 'Slovak',
                        'value' => 'sk',
                      ),
                      567 => 
                      array (
                        'key' => 'Slovak (Slovakia)',
                        'value' => 'sk_SK',
                      ),
                      568 => 
                      array (
                        'key' => 'Slovenian',
                        'value' => 'sl',
                      ),
                      569 => 
                      array (
                        'key' => 'Slovenian (Slovenia)',
                        'value' => 'sl_SI',
                      ),
                      570 => 
                      array (
                        'key' => 'Soga',
                        'value' => 'xog',
                      ),
                      571 => 
                      array (
                        'key' => 'Soga (Uganda)',
                        'value' => 'xog_UG',
                      ),
                      572 => 
                      array (
                        'key' => 'Somali',
                        'value' => 'so',
                      ),
                      573 => 
                      array (
                        'key' => 'Somali (Djibouti)',
                        'value' => 'so_DJ',
                      ),
                      574 => 
                      array (
                        'key' => 'Somali (Ethiopia)',
                        'value' => 'so_ET',
                      ),
                      575 => 
                      array (
                        'key' => 'Somali (Kenya)',
                        'value' => 'so_KE',
                      ),
                      576 => 
                      array (
                        'key' => 'Somali (Somalia)',
                        'value' => 'so_SO',
                      ),
                      577 => 
                      array (
                        'key' => 'Spanish',
                        'value' => 'es',
                      ),
                      578 => 
                      array (
                        'key' => 'Spanish (Argentina)',
                        'value' => 'es_AR',
                      ),
                      579 => 
                      array (
                        'key' => 'Spanish (Bolivia)',
                        'value' => 'es_BO',
                      ),
                      580 => 
                      array (
                        'key' => 'Spanish (Canary Islands)',
                        'value' => 'es_IC',
                      ),
                      581 => 
                      array (
                        'key' => 'Spanish (Ceuta & Melilla)',
                        'value' => 'es_EA',
                      ),
                      582 => 
                      array (
                        'key' => 'Spanish (Chile)',
                        'value' => 'es_CL',
                      ),
                      583 => 
                      array (
                        'key' => 'Spanish (Colombia)',
                        'value' => 'es_CO',
                      ),
                      584 => 
                      array (
                        'key' => 'Spanish (Costa Rica)',
                        'value' => 'es_CR',
                      ),
                      585 => 
                      array (
                        'key' => 'Spanish (Cuba)',
                        'value' => 'es_CU',
                      ),
                      586 => 
                      array (
                        'key' => 'Spanish (Dominican Republic)',
                        'value' => 'es_DO',
                      ),
                      587 => 
                      array (
                        'key' => 'Spanish (Ecuador)',
                        'value' => 'es_EC',
                      ),
                      588 => 
                      array (
                        'key' => 'Spanish (El Salvador)',
                        'value' => 'es_SV',
                      ),
                      589 => 
                      array (
                        'key' => 'Spanish (Equatorial Guinea)',
                        'value' => 'es_GQ',
                      ),
                      590 => 
                      array (
                        'key' => 'Spanish (Guatemala)',
                        'value' => 'es_GT',
                      ),
                      591 => 
                      array (
                        'key' => 'Spanish (Honduras)',
                        'value' => 'es_HN',
                      ),
                      592 => 
                      array (
                        'key' => 'Spanish (Latin America)',
                        'value' => 'es_419',
                      ),
                      593 => 
                      array (
                        'key' => 'Spanish (Mexico)',
                        'value' => 'es_MX',
                      ),
                      594 => 
                      array (
                        'key' => 'Spanish (Nicaragua)',
                        'value' => 'es_NI',
                      ),
                      595 => 
                      array (
                        'key' => 'Spanish (Panama)',
                        'value' => 'es_PA',
                      ),
                      596 => 
                      array (
                        'key' => 'Spanish (Paraguay)',
                        'value' => 'es_PY',
                      ),
                      597 => 
                      array (
                        'key' => 'Spanish (Peru)',
                        'value' => 'es_PE',
                      ),
                      598 => 
                      array (
                        'key' => 'Spanish (Philippines)',
                        'value' => 'es_PH',
                      ),
                      599 => 
                      array (
                        'key' => 'Spanish (Puerto Rico)',
                        'value' => 'es_PR',
                      ),
                      600 => 
                      array (
                        'key' => 'Spanish (Spain)',
                        'value' => 'es_ES',
                      ),
                      601 => 
                      array (
                        'key' => 'Spanish (United States)',
                        'value' => 'es_US',
                      ),
                      602 => 
                      array (
                        'key' => 'Spanish (Uruguay)',
                        'value' => 'es_UY',
                      ),
                      603 => 
                      array (
                        'key' => 'Spanish (Venezuela)',
                        'value' => 'es_VE',
                      ),
                      604 => 
                      array (
                        'key' => 'Standard Moroccan Tamazight',
                        'value' => 'zgh',
                      ),
                      605 => 
                      array (
                        'key' => 'Standard Moroccan Tamazight (Morocco)',
                        'value' => 'zgh_MA',
                      ),
                      606 => 
                      array (
                        'key' => 'Swahili',
                        'value' => 'sw',
                      ),
                      607 => 
                      array (
                        'key' => 'Swahili (Congo - Kinshasa)',
                        'value' => 'sw_CD',
                      ),
                      608 => 
                      array (
                        'key' => 'Swahili (Kenya)',
                        'value' => 'sw_KE',
                      ),
                      609 => 
                      array (
                        'key' => 'Swahili (Tanzania)',
                        'value' => 'sw_TZ',
                      ),
                      610 => 
                      array (
                        'key' => 'Swahili (Uganda)',
                        'value' => 'sw_UG',
                      ),
                      611 => 
                      array (
                        'key' => 'Swedish',
                        'value' => 'sv',
                      ),
                      612 => 
                      array (
                        'key' => 'Swedish (Finland)',
                        'value' => 'sv_FI',
                      ),
                      613 => 
                      array (
                        'key' => 'Swedish (Sweden)',
                        'value' => 'sv_SE',
                      ),
                      614 => 
                      array (
                        'key' => 'Swedish (Åland Islands)',
                        'value' => 'sv_AX',
                      ),
                      615 => 
                      array (
                        'key' => 'Swiss German',
                        'value' => 'gsw',
                      ),
                      616 => 
                      array (
                        'key' => 'Swiss German (France)',
                        'value' => 'gsw_FR',
                      ),
                      617 => 
                      array (
                        'key' => 'Swiss German (Liechtenstein)',
                        'value' => 'gsw_LI',
                      ),
                      618 => 
                      array (
                        'key' => 'Swiss German (Switzerland)',
                        'value' => 'gsw_CH',
                      ),
                      619 => 
                      array (
                        'key' => 'Tachelhit',
                        'value' => 'shi_Tfng',
                      ),
                      620 => 
                      array (
                        'key' => 'Tachelhit',
                        'value' => 'shi',
                      ),
                      621 => 
                      array (
                        'key' => 'Tachelhit',
                        'value' => 'shi_Latn',
                      ),
                      622 => 
                      array (
                        'key' => 'Tachelhit (Morocco)',
                        'value' => 'shi_Tfng_MA',
                      ),
                      623 => 
                      array (
                        'key' => 'Tachelhit (Morocco)',
                        'value' => 'shi_Latn_MA',
                      ),
                      624 => 
                      array (
                        'key' => 'Taita',
                        'value' => 'dav',
                      ),
                      625 => 
                      array (
                        'key' => 'Taita (Kenya)',
                        'value' => 'dav_KE',
                      ),
                      626 => 
                      array (
                        'key' => 'Tamil',
                        'value' => 'ta',
                      ),
                      627 => 
                      array (
                        'key' => 'Tamil (India)',
                        'value' => 'ta_IN',
                      ),
                      628 => 
                      array (
                        'key' => 'Tamil (Malaysia)',
                        'value' => 'ta_MY',
                      ),
                      629 => 
                      array (
                        'key' => 'Tamil (Singapore)',
                        'value' => 'ta_SG',
                      ),
                      630 => 
                      array (
                        'key' => 'Tamil (Sri Lanka)',
                        'value' => 'ta_LK',
                      ),
                      631 => 
                      array (
                        'key' => 'Tasawaq',
                        'value' => 'twq',
                      ),
                      632 => 
                      array (
                        'key' => 'Tasawaq (Niger)',
                        'value' => 'twq_NE',
                      ),
                      633 => 
                      array (
                        'key' => 'Telugu',
                        'value' => 'te',
                      ),
                      634 => 
                      array (
                        'key' => 'Telugu (India)',
                        'value' => 'te_IN',
                      ),
                      635 => 
                      array (
                        'key' => 'Teso',
                        'value' => 'teo',
                      ),
                      636 => 
                      array (
                        'key' => 'Teso (Kenya)',
                        'value' => 'teo_KE',
                      ),
                      637 => 
                      array (
                        'key' => 'Teso (Uganda)',
                        'value' => 'teo_UG',
                      ),
                      638 => 
                      array (
                        'key' => 'Thai',
                        'value' => 'th',
                      ),
                      639 => 
                      array (
                        'key' => 'Thai (Thailand)',
                        'value' => 'th_TH',
                      ),
                      640 => 
                      array (
                        'key' => 'Tibetan',
                        'value' => 'bo',
                      ),
                      641 => 
                      array (
                        'key' => 'Tibetan (China)',
                        'value' => 'bo_CN',
                      ),
                      642 => 
                      array (
                        'key' => 'Tibetan (India)',
                        'value' => 'bo_IN',
                      ),
                      643 => 
                      array (
                        'key' => 'Tigrinya',
                        'value' => 'ti',
                      ),
                      644 => 
                      array (
                        'key' => 'Tigrinya (Eritrea)',
                        'value' => 'ti_ER',
                      ),
                      645 => 
                      array (
                        'key' => 'Tigrinya (Ethiopia)',
                        'value' => 'ti_ET',
                      ),
                      646 => 
                      array (
                        'key' => 'Tongan',
                        'value' => 'to',
                      ),
                      647 => 
                      array (
                        'key' => 'Tongan (Tonga)',
                        'value' => 'to_TO',
                      ),
                      648 => 
                      array (
                        'key' => 'Turkish',
                        'value' => 'tr',
                      ),
                      649 => 
                      array (
                        'key' => 'Turkish (Cyprus)',
                        'value' => 'tr_CY',
                      ),
                      650 => 
                      array (
                        'key' => 'Turkish (Turkey)',
                        'value' => 'tr_TR',
                      ),
                      651 => 
                      array (
                        'key' => 'Ukrainian',
                        'value' => 'uk',
                      ),
                      652 => 
                      array (
                        'key' => 'Ukrainian (Ukraine)',
                        'value' => 'uk_UA',
                      ),
                      653 => 
                      array (
                        'key' => 'Upper Sorbian',
                        'value' => 'hsb',
                      ),
                      654 => 
                      array (
                        'key' => 'Upper Sorbian (Germany)',
                        'value' => 'hsb_DE',
                      ),
                      655 => 
                      array (
                        'key' => 'Urdu',
                        'value' => 'ur',
                      ),
                      656 => 
                      array (
                        'key' => 'Urdu (India)',
                        'value' => 'ur_IN',
                      ),
                      657 => 
                      array (
                        'key' => 'Urdu (Pakistan)',
                        'value' => 'ur_PK',
                      ),
                      658 => 
                      array (
                        'key' => 'Uyghur',
                        'value' => 'ug',
                      ),
                      659 => 
                      array (
                        'key' => 'Uyghur (China)',
                        'value' => 'ug_CN',
                      ),
                      660 => 
                      array (
                        'key' => 'Uzbek',
                        'value' => 'uz_Cyrl',
                      ),
                      661 => 
                      array (
                        'key' => 'Uzbek',
                        'value' => 'uz',
                      ),
                      662 => 
                      array (
                        'key' => 'Uzbek',
                        'value' => 'uz_Arab',
                      ),
                      663 => 
                      array (
                        'key' => 'Uzbek',
                        'value' => 'uz_Latn',
                      ),
                      664 => 
                      array (
                        'key' => 'Uzbek (Afghanistan)',
                        'value' => 'uz_Arab_AF',
                      ),
                      665 => 
                      array (
                        'key' => 'Uzbek (Uzbekistan)',
                        'value' => 'uz_Latn_UZ',
                      ),
                      666 => 
                      array (
                        'key' => 'Uzbek (Uzbekistan)',
                        'value' => 'uz_Cyrl_UZ',
                      ),
                      667 => 
                      array (
                        'key' => 'Vai',
                        'value' => 'vai_Vaii',
                      ),
                      668 => 
                      array (
                        'key' => 'Vai',
                        'value' => 'vai',
                      ),
                      669 => 
                      array (
                        'key' => 'Vai',
                        'value' => 'vai_Latn',
                      ),
                      670 => 
                      array (
                        'key' => 'Vai (Liberia)',
                        'value' => 'vai_Latn_LR',
                      ),
                      671 => 
                      array (
                        'key' => 'Vai (Liberia)',
                        'value' => 'vai_Vaii_LR',
                      ),
                      672 => 
                      array (
                        'key' => 'Vietnamese',
                        'value' => 'vi',
                      ),
                      673 => 
                      array (
                        'key' => 'Vietnamese (Vietnam)',
                        'value' => 'vi_VN',
                      ),
                      674 => 
                      array (
                        'key' => 'Vunjo',
                        'value' => 'vun',
                      ),
                      675 => 
                      array (
                        'key' => 'Vunjo (Tanzania)',
                        'value' => 'vun_TZ',
                      ),
                      676 => 
                      array (
                        'key' => 'Walser',
                        'value' => 'wae',
                      ),
                      677 => 
                      array (
                        'key' => 'Walser (Switzerland)',
                        'value' => 'wae_CH',
                      ),
                      678 => 
                      array (
                        'key' => 'Welsh',
                        'value' => 'cy',
                      ),
                      679 => 
                      array (
                        'key' => 'Welsh (United Kingdom)',
                        'value' => 'cy_GB',
                      ),
                      680 => 
                      array (
                        'key' => 'Western Frisian',
                        'value' => 'fy',
                      ),
                      681 => 
                      array (
                        'key' => 'Western Frisian (Netherlands)',
                        'value' => 'fy_NL',
                      ),
                      682 => 
                      array (
                        'key' => 'Yangben',
                        'value' => 'yav',
                      ),
                      683 => 
                      array (
                        'key' => 'Yangben (Cameroon)',
                        'value' => 'yav_CM',
                      ),
                      684 => 
                      array (
                        'key' => 'Yiddish',
                        'value' => 'yi',
                      ),
                      685 => 
                      array (
                        'key' => 'Yiddish (World)',
                        'value' => 'yi_001',
                      ),
                      686 => 
                      array (
                        'key' => 'Yoruba',
                        'value' => 'yo',
                      ),
                      687 => 
                      array (
                        'key' => 'Yoruba (Benin)',
                        'value' => 'yo_BJ',
                      ),
                      688 => 
                      array (
                        'key' => 'Yoruba (Nigeria)',
                        'value' => 'yo_NG',
                      ),
                      689 => 
                      array (
                        'key' => 'Zarma',
                        'value' => 'dje',
                      ),
                      690 => 
                      array (
                        'key' => 'Zarma (Niger)',
                        'value' => 'dje_NE',
                      ),
                      691 => 
                      array (
                        'key' => 'Zulu',
                        'value' => 'zu',
                      ),
                      692 => 
                      array (
                        'key' => 'Zulu (South Africa)',
                        'value' => 'zu_ZA',
                      ),
                    ),
                     'width' => '',
                     'defaultValue' => NULL,
                     'optionsProviderClass' => NULL,
                     'optionsProviderData' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'phpdocType' => 'string',
                     'name' => 'localeCode',
                     'title' => 'Locale',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  4 => 
                  CoreShop\Bundle\ShippingBundle\CoreExtension\Carrier::__set_state(array(
                     'fieldtype' => 'coreShopCarrier',
                     'phpdocType' => 'CoreShop\\Component\\Shipping\\Model\\CarrierInterface',
                     'allowEmpty' => false,
                     'options' => NULL,
                     'width' => '',
                     'defaultValue' => NULL,
                     'optionsProviderClass' => NULL,
                     'optionsProviderData' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'name' => 'carrier',
                     'title' => 'Carrier',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  5 => 
                  CoreShop\Bundle\PaymentBundle\CoreExtension\PaymentProvider::__set_state(array(
                     'fieldtype' => 'coreShopPaymentProvider',
                     'phpdocType' => 'CoreShop\\Component\\Payment\\Model\\PaymentProvider',
                     'allowEmpty' => false,
                     'options' => NULL,
                     'width' => '',
                     'defaultValue' => NULL,
                     'optionsProviderClass' => NULL,
                     'optionsProviderData' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'name' => 'paymentProvider',
                     'title' => 'Payment Provider',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  6 => 
                  CoreShop\Bundle\PimcoreBundle\CoreExtension\SerializedData::__set_state(array(
                     'fieldtype' => 'coreShopSerializedData',
                     'phpdocType' => NULL,
                     'name' => 'paymentSettings',
                     'title' => 'Payment Settings',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  7 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\ManyToOneRelation::__set_state(array(
                     'fieldtype' => 'manyToOneRelation',
                     'width' => '',
                     'assetUploadPath' => '',
                     'relationType' => true,
                     'queryColumnType' => 
                    array (
                      'id' => 'int(11)',
                      'type' => 'enum(\'document\',\'asset\',\'object\')',
                    ),
                     'phpdocType' => '\\Pimcore\\Model\\Document\\Page | \\Pimcore\\Model\\Document\\Snippet | \\Pimcore\\Model\\Document | \\Pimcore\\Model\\Asset | \\Pimcore\\Model\\DataObject\\AbstractObject',
                     'objectsAllowed' => true,
                     'assetsAllowed' => false,
                     'assetTypes' => 
                    array (
                    ),
                     'documentsAllowed' => false,
                     'documentTypes' => 
                    array (
                    ),
                     'lazyLoading' => false,
                     'classes' => 
                    array (
                      0 => 
                      array (
                        'classes' => 'CoreShopOrder',
                      ),
                    ),
                     'pathFormatterClass' => '',
                     'name' => 'order',
                     'title' => 'Order',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  8 => 
                  CoreShop\Bundle\CurrencyBundle\CoreExtension\Currency::__set_state(array(
                     'fieldtype' => 'coreShopCurrency',
                     'allowEmpty' => false,
                     'options' => NULL,
                     'width' => '',
                     'defaultValue' => NULL,
                     'optionsProviderClass' => NULL,
                     'optionsProviderData' => NULL,
                     'queryColumnType' => 'varchar',
                     'columnType' => 'varchar',
                     'columnLength' => 190,
                     'phpdocType' => 'string',
                     'name' => 'currency',
                     'title' => 'Currency',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  9 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\Textarea::__set_state(array(
                     'fieldtype' => 'textarea',
                     'width' => 350,
                     'height' => '',
                     'maxLength' => NULL,
                     'showCharCount' => NULL,
                     'excludeFromSearchIndex' => false,
                     'queryColumnType' => 'longtext',
                     'columnType' => 'longtext',
                     'phpdocType' => 'string',
                     'name' => 'comment',
                     'title' => 'Comment',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                  10 => 
                  Pimcore\Model\DataObject\ClassDefinition\Data\Objectbricks::__set_state(array(
                     'fieldtype' => 'objectbricks',
                     'phpdocType' => '\\Pimcore\\Model\\DataObject\\Objectbrick',
                     'allowedTypes' => 
                    array (
                    ),
                     'maxItems' => '',
                     'name' => 'additionalData',
                     'title' => 'Additional Data',
                     'tooltip' => '',
                     'mandatory' => false,
                     'noteditable' => true,
                     'index' => false,
                     'locked' => false,
                     'style' => '',
                     'permissions' => NULL,
                     'datatype' => 'data',
                     'relationType' => false,
                     'invisible' => false,
                     'visibleGridView' => false,
                     'visibleSearch' => false,
                  )),
                ),
                 'locked' => false,
              )),
            ),
             'locked' => false,
          )),
          1 => 
          Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
             'fieldtype' => 'panel',
             'labelWidth' => 100,
             'layout' => NULL,
             'name' => 'Rules',
             'type' => NULL,
             'region' => NULL,
             'title' => 'Rules',
             'width' => NULL,
             'height' => NULL,
             'collapsible' => false,
             'collapsed' => false,
             'bodyStyle' => '',
             'datatype' => 'layout',
             'permissions' => NULL,
             'childs' => 
            array (
              0 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\Fieldcollections::__set_state(array(
                 'fieldtype' => 'fieldcollections',
                 'phpdocType' => '\\Pimcore\\Model\\DataObject\\Fieldcollection',
                 'allowedTypes' => 
                array (
                  0 => 'CoreShopProposalCartPriceRuleItem',
                ),
                 'lazyLoading' => false,
                 'maxItems' => '',
                 'disallowAddRemove' => false,
                 'disallowReorder' => false,
                 'collapsed' => false,
                 'collapsible' => false,
                 'name' => 'priceRuleItems',
                 'title' => 'Rules',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
            ),
             'locked' => false,
          )),
          2 => 
          Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
             'fieldtype' => 'panel',
             'labelWidth' => 100,
             'layout' => NULL,
             'name' => 'Items',
             'type' => NULL,
             'region' => NULL,
             'title' => 'Items',
             'width' => NULL,
             'height' => NULL,
             'collapsible' => false,
             'collapsed' => false,
             'bodyStyle' => '',
             'datatype' => 'layout',
             'permissions' => NULL,
             'childs' => 
            array (
              0 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\ManyToManyRelation::__set_state(array(
                 'fieldtype' => 'manyToManyRelation',
                 'width' => '',
                 'height' => '',
                 'maxItems' => '',
                 'assetUploadPath' => '',
                 'queryColumnType' => 'text',
                 'phpdocType' => 'array',
                 'relationType' => true,
                 'objectsAllowed' => true,
                 'assetsAllowed' => false,
                 'assetTypes' => 
                array (
                ),
                 'documentsAllowed' => false,
                 'documentTypes' => 
                array (
                ),
                 'lazyLoading' => false,
                 'classes' => 
                array (
                  0 => 
                  array (
                    'classes' => 'CoreShopCartItem',
                  ),
                ),
                 'pathFormatterClass' => '',
                 'name' => 'items',
                 'title' => 'Items',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              1 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\Checkbox::__set_state(array(
                 'fieldtype' => 'checkbox',
                 'defaultValue' => 0,
                 'queryColumnType' => 'tinyint(1)',
                 'columnType' => 'tinyint(1)',
                 'phpdocType' => 'boolean',
                 'name' => 'needsRecalculation',
                 'title' => 'Needs Recalculation',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => true,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
            ),
             'locked' => false,
          )),
          3 => 
          Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
             'fieldtype' => 'panel',
             'labelWidth' => 100,
             'layout' => NULL,
             'name' => 'Customer',
             'type' => NULL,
             'region' => NULL,
             'title' => 'Customer',
             'width' => NULL,
             'height' => NULL,
             'collapsible' => false,
             'collapsed' => false,
             'bodyStyle' => '',
             'datatype' => 'layout',
             'permissions' => NULL,
             'childs' => 
            array (
              0 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\ManyToOneRelation::__set_state(array(
                 'fieldtype' => 'manyToOneRelation',
                 'width' => '',
                 'assetUploadPath' => '',
                 'relationType' => true,
                 'queryColumnType' => 
                array (
                  'id' => 'int(11)',
                  'type' => 'enum(\'document\',\'asset\',\'object\')',
                ),
                 'phpdocType' => '\\Pimcore\\Model\\Document\\Page | \\Pimcore\\Model\\Document\\Snippet | \\Pimcore\\Model\\Document | \\Pimcore\\Model\\Asset | \\Pimcore\\Model\\DataObject\\AbstractObject',
                 'objectsAllowed' => true,
                 'assetsAllowed' => false,
                 'assetTypes' => 
                array (
                ),
                 'documentsAllowed' => false,
                 'documentTypes' => 
                array (
                ),
                 'lazyLoading' => false,
                 'classes' => 
                array (
                  0 => 
                  array (
                    'classes' => 'CoreShopCustomer',
                  ),
                ),
                 'pathFormatterClass' => '',
                 'name' => 'customer',
                 'title' => 'Customer',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              1 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\ManyToOneRelation::__set_state(array(
                 'fieldtype' => 'manyToOneRelation',
                 'width' => '',
                 'assetUploadPath' => '',
                 'relationType' => true,
                 'queryColumnType' => 
                array (
                  'id' => 'int(11)',
                  'type' => 'enum(\'document\',\'asset\',\'object\')',
                ),
                 'phpdocType' => '\\Pimcore\\Model\\Document\\Page | \\Pimcore\\Model\\Document\\Snippet | \\Pimcore\\Model\\Document | \\Pimcore\\Model\\Asset | \\Pimcore\\Model\\DataObject\\AbstractObject',
                 'objectsAllowed' => true,
                 'assetsAllowed' => false,
                 'assetTypes' => 
                array (
                ),
                 'documentsAllowed' => false,
                 'documentTypes' => 
                array (
                ),
                 'lazyLoading' => false,
                 'classes' => 
                array (
                  0 => 
                  array (
                    'classes' => 'CoreShopAddress',
                  ),
                ),
                 'pathFormatterClass' => '',
                 'name' => 'shippingAddress',
                 'title' => 'Shipping Address',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              2 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\ManyToOneRelation::__set_state(array(
                 'fieldtype' => 'manyToOneRelation',
                 'width' => '',
                 'assetUploadPath' => '',
                 'relationType' => true,
                 'queryColumnType' => 
                array (
                  'id' => 'int(11)',
                  'type' => 'enum(\'document\',\'asset\',\'object\')',
                ),
                 'phpdocType' => '\\Pimcore\\Model\\Document\\Page | \\Pimcore\\Model\\Document\\Snippet | \\Pimcore\\Model\\Document | \\Pimcore\\Model\\Asset | \\Pimcore\\Model\\DataObject\\AbstractObject',
                 'objectsAllowed' => true,
                 'assetsAllowed' => false,
                 'assetTypes' => 
                array (
                ),
                 'documentsAllowed' => false,
                 'documentTypes' => 
                array (
                ),
                 'lazyLoading' => false,
                 'classes' => 
                array (
                  0 => 
                  array (
                    'classes' => 'CoreShopAddress',
                  ),
                ),
                 'pathFormatterClass' => '',
                 'name' => 'invoiceAddress',
                 'title' => 'Invoice Address',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
            ),
             'locked' => false,
          )),
          4 => 
          Pimcore\Model\DataObject\ClassDefinition\Layout\Panel::__set_state(array(
             'fieldtype' => 'panel',
             'labelWidth' => 100,
             'layout' => NULL,
             'name' => 'Shipping/Payment/Discount',
             'type' => NULL,
             'region' => NULL,
             'title' => 'Shipping/Payment/Discount',
             'width' => NULL,
             'height' => NULL,
             'collapsible' => false,
             'collapsed' => false,
             'bodyStyle' => '',
             'datatype' => 'layout',
             'permissions' => NULL,
             'childs' => 
            array (
              0 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\Numeric::__set_state(array(
                 'fieldtype' => 'numeric',
                 'width' => '',
                 'defaultValue' => NULL,
                 'queryColumnType' => 'double',
                 'columnType' => 'double',
                 'phpdocType' => 'float',
                 'integer' => false,
                 'unsigned' => false,
                 'minValue' => NULL,
                 'maxValue' => NULL,
                 'unique' => NULL,
                 'decimalSize' => NULL,
                 'decimalPrecision' => NULL,
                 'name' => 'shippingTaxRate',
                 'title' => 'Shipping Tax Rate',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              1 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\Fieldcollections::__set_state(array(
                 'fieldtype' => 'fieldcollections',
                 'phpdocType' => '\\Pimcore\\Model\\DataObject\\Fieldcollection',
                 'allowedTypes' => 
                array (
                  0 => 'CoreShopTaxItem',
                ),
                 'lazyLoading' => true,
                 'maxItems' => '',
                 'disallowAddRemove' => false,
                 'disallowReorder' => false,
                 'collapsed' => false,
                 'collapsible' => false,
                 'name' => 'taxes',
                 'title' => 'Taxes',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              2 => 
              CoreShop\Bundle\MoneyBundle\CoreExtension\Money::__set_state(array(
                 'fieldtype' => 'coreShopMoney',
                 'width' => '',
                 'defaultValue' => NULL,
                 'phpdocType' => 'int',
                 'minValue' => NULL,
                 'maxValue' => NULL,
                 'name' => 'pimcoreAdjustmentTotalNet',
                 'title' => 'Adjustments Total Net',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              3 => 
              CoreShop\Bundle\MoneyBundle\CoreExtension\Money::__set_state(array(
                 'fieldtype' => 'coreShopMoney',
                 'width' => '',
                 'defaultValue' => NULL,
                 'phpdocType' => 'int',
                 'minValue' => NULL,
                 'maxValue' => NULL,
                 'name' => 'pimcoreAdjustmentTotalGross',
                 'title' => 'Adjustments Total Gross',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
              4 => 
              Pimcore\Model\DataObject\ClassDefinition\Data\Fieldcollections::__set_state(array(
                 'fieldtype' => 'fieldcollections',
                 'phpdocType' => '\\Pimcore\\Model\\DataObject\\Fieldcollection',
                 'allowedTypes' => 
                array (
                  0 => 'CoreShopAdjustment',
                ),
                 'lazyLoading' => true,
                 'maxItems' => '',
                 'disallowAddRemove' => false,
                 'disallowReorder' => false,
                 'collapsed' => false,
                 'collapsible' => false,
                 'name' => 'adjustmentItems',
                 'title' => 'Adjustments',
                 'tooltip' => '',
                 'mandatory' => false,
                 'noteditable' => true,
                 'index' => false,
                 'locked' => false,
                 'style' => '',
                 'permissions' => NULL,
                 'datatype' => 'data',
                 'relationType' => false,
                 'invisible' => false,
                 'visibleGridView' => false,
                 'visibleSearch' => false,
              )),
            ),
             'locked' => false,
          )),
        ),
         'locked' => false,
      )),
    ),
     'locked' => false,
  )),
   'icon' => NULL,
   'previewUrl' => NULL,
   'group' => 'CoreShop',
   'showAppLoggerTab' => false,
   'linkGeneratorReference' => NULL,
   'propertyVisibility' => 
  array (
    'grid' => 
    array (
      'id' => true,
      'path' => true,
      'published' => true,
      'modificationDate' => true,
      'creationDate' => true,
    ),
    'search' => 
    array (
      'id' => true,
      'path' => true,
      'published' => true,
      'modificationDate' => true,
      'creationDate' => true,
    ),
  ),
   'dao' => NULL,
));
