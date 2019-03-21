**commerce app with vue-storefront and pimcore**

---

## Vue-Storefront
```
#run backend localhost:8080
cd katrin-frontend/backend-api
docker-compose up -d

it will start
1. elasticsearch `http://localhost:9200/` 
2. kibana  `http://localhost:5601/`

#run dev
npm run dev
```
```
#run frontend localhost:3000
cd ..

npm run build
npm run dev
```
---

## Pimcore
```
cd pimcore-docker
```
```
docker-compose up -d
```
`http://localhost:2000/admin`

---


## Install Pimcore

```
cd pimcore-docker
```
```
docker-compose up -d
```
```
# get shell in running container
docker exec -it pimcore-php bash

# replace <yourpackage> with the package you with to install
# for example COMPOSER_MEMORY_LIMIT=-1 composer create-project pimcore/demo-ecommerce tmp
COMPOSER_MEMORY_LIMIT=-1 composer create-project pimcore/<yourpackage> tmp
mv tmp/* .  

#increase the memory_limit to >= 512MB as required by pimcore-install
echo 'memory_limit = 512M' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;
service apache2 reload

#run installer
./vendor/bin/pimcore-install --mysql-host-socket=db --mysql-username=pimcore 

```
---
