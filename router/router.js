const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')
const Auth = require('../auth/auth')
const  Validation  = require("../validators/validation");

router.post('/register', Validation.register,Controller.register)
router.post('/login', Controller.login, Validation.login)
router.post('/logout', Auth.verifyToken, Controller.logout)
router.post('/verify', Auth.verifyToken, Controller.verify)
router.post('/lombakelompok', Controller.lombaKelompok, Validation.lombakelompok)
router.post('/lombaindividu', Controller.lombaIndividu, Validation.lombaindividu)
router.post('/insertanggotasatu', Controller.insertAnggotaSatu)
router.post('insertanggotadua', Controller.insertAnggotaDua)
router.post('/nomorurutindividu', Controller.nomorUrutIndividu)
router.post('/nomorurutkelompok', Controller.nomorUrutKelompok)
router.post('/cekemailterdaftar', Controller.cekEmailTerdaftar)
module.exports = router