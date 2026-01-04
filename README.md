# ROLES
## Category
| Permission      	| Route                     	|
|-----------------	|---------------------------	|
| category.create 	| /products/category/create 	|
| category.list   	| /products/category/list   	|
| category.update 	| /products/category/update 	|
| category.delete 	| /products/category/delete 	|

## Company
| Permission      	| Route                     	| HTTPS Method 	|
|-----------------	|---------------------------	|--------------	|
| company.create  	| /users/company/create     	| POST         	|
| company.profile 	| /users/company/update/:id 	| GET          	|
| company.update  	| /users/company/delete/:id 	| PATCH        	|
| company.delete  	| /users/company/profile    	| DELETE       	|

## Customer
| Permission       	| Route                              	| HTTPS Method 	|
|------------------	|------------------------------------	|--------------	|
| customer.create  	| /users/customer/create             	| POST         	|
| customer.profile 	| /users/customer/list               	| GET          	|
| customer.update  	| /users/customer/delete/:customerId 	| DELETE       	|
| customer.delete  	| /users/customer/edit               	| PATCH        	|

## Inventory
| Permission       	| Route             	| HTTPS Method 	|
|------------------	|-------------------	|--------------	|
| inventory.create 	| /inventory/create 	| POST         	|
| inventory.update 	| /inventory/update 	| POST         	|
| inventory.list   	| /inventory/list   	| GET          	|

## Orders
| Permission   	| Route             	| HTTPS Method 	|
|--------------	|-------------------	|--------------	|
| order.create 	| /orders/create    	| POST         	|
| order.list   	| /inventory/update 	| GET          	|
| order.update 	| /orders/update    	| PATCH        	|

## Products
| Permission     	| Route                       	| HTTPS Method 	|
|----------------	|-----------------------------	|--------------	|
| product.create 	| /products/create            	| POST         	|
| product.list   	| /products/list              	| GET          	|
| product.update 	| /products/update            	| PATCH        	|
| product.delete 	| /products/delete/:productId 	| DELETE       	|

## Quotation
| Permission       	| Route                    	| HTTPS Method 	|
|------------------	|--------------------------	|--------------	|
| quotation.create 	| /orders/quotation/create 	| POST         	|
| quotation.update 	| /orders/quotation/upate  	| PATCH        	|
| quotation.list   	| /orders/quotation/list   	| GET          	|

## Templates
| Permission      	| Route                                  	| HTTPS Method 	|
|-----------------	|----------------------------------------	|--------------	|
| template.create 	| /products/templates/create             	| POST         	|
| template.list   	| /products/templates/list               	| GET          	|
| template.delete 	| /products/templates/delete/:templateId 	| DELETE       	|