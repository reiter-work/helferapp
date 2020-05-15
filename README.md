# Helfer App

**Author:** Johannes Reiter

**Year:** 2020

**Tech-Stack**: Laravel/Angular

## Basic Credentials

**GitHub:** [https://github.com/joworeiter/helferapp](https://github.com/joworeiter/helferapp) 

**URL-BE:** [app.s1710456027.student.kwmhgb.at](app.s1710456027.student.kwmhgb.at) 

**URL-FE:** [helferapp.castingcouch.agency](elferapp.castingcouch.agency) 

**Login Helper:** test@test.at **PW:** 123
 
**Login User:** test@test.work **PW:** 123 

## Database-Schema

![DB-Schema](https://screentocloud.com/images/85746282-63ee-48f6-98bb-9033fbf6d48d.png "Initial DB-Schema")

## API-Methods:

Every api-Route is prefixed with '[BASEURL]/api/'

|route | method | desc | response |
|---|---|---|---|
|auth/login | post | needs User and PW as JSON | JWT Token |
|auth/logout | post | logging out the user | |
|/getUser/{userID} | get | get the Userinformation | JSON UserObject |
|/comment/{id}| get |get the Comments for a Shoppinglist by ID| JSON CommentObjects |
|/comment| post | creates new Comment| JSON - Comment |
|/shoppinglist/user|get| get all Shoppingslist for [user_id]| JSON ShoppinglistObjects |
|/shoppinglist|post| creates new Shoppinglist | JSON ShoppinglistObject |
|/shoppinglist|put| updates Shoppinglist | JSON ShoppinglistObject |
|/shoppinglist/{id}|delete| deletes the Shoppinglist width [id]| 'deleted' 204 |
|/shoppinglist/claimed|get| get Shoppinglists which are claimed by a User | JSON ShoppinglistObjects |
|/shoppinglist/toClaim|get| get Shoppinglists which are not claimed by a User| JSON ShoppinglistObjects |
|/shoppinglist/claim/{id}|put| claim the Shoppinglist by [shoppinglist_id] | JSON ShoppinglistObject |
|/shoppinglist/item|post| create new Item | JSON ShoppingItemObject |
|/shoppinglist/item|put| updates Item | JSON ShoppingItemObject |
|/shoppinglist/item/{id}|put| set Item to !isDone by [item_id] | JSON ShoppingItemObject |
|/shoppinglist/deleteItem/{id}| delete | delte Item by ID | 'deleted' 204 |



