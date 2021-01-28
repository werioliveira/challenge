const express = require('express');
const router = express.Router();

const SessionMiddlware = require('../app/Middlware/session')
const UserController = require('./Controller/UserController')
const ItemController = require('./Controller/ItemController')
const UserValidator = require('./validators/userValidator')
const ItemValidator = require('./validators/itemValidator')
const jwt = require('../config/auth')


router.post('/api/v1/auth/sign_in',UserValidator.signIn, UserController.signIn)
router.get('/api/v1/auth/sign_out', UserController.logout)
router.use(jwt.authorize)
router.use(SessionMiddlware.isLogged)
router.get('/api/v1/user/:id', UserValidator.getUser,UserController.getUser)
router.post('/api/v1/user', UserValidator.postUser,UserValidator.checkCnpj,UserController.postUser)
/// Items
router.get('/api/v1/user/:id/item',ItemController.showAll);
router.get('/api/v1/user/:id/item/:itemId',ItemValidator.getItem,UserValidator.checkUser, ItemController.get)
router.post('/api/v1/user/:id/item',ItemValidator.postItem, UserValidator.checkUser,ItemController.postItem)
router.put('/api/v1/user/:id/item/:itemId',ItemValidator.getItem, UserValidator.checkUser,ItemController.update)
router.delete('/api/v1/user/:id/item/:itemId',ItemValidator.postItem, UserValidator.checkUser, ItemController.delete)




module.exports = router;