const express = require('express')
const router = express.Router()
const Controller = require('../controller/controller')
const Auth = require('../auth/auth')
const  Validation  = require("../validators/validation");

router.post('/register', Validation.register, Controller.register)
router.post('/login',Validation.login, Controller.login, )
router.post('/logout', Auth.verifyToken, Controller.logout)
router.post('/verify', Auth.verifyToken, Controller.verify)
router.post('/lombakelompok', Validation.lombakelompok, Controller.lombaKelompok)
router.post('/lombaindividu', Validation.lombaindividu, Controller.lombaIndividu )
router.post('/insertketua', Controller.ketua)
router.post('/cekdaftar', Controller.cekEmailTerdaftar)
router.post('/insertanggotasatu', Controller.insertAnggotaSatu)
router.post('/insertanggotadua', Controller.insertAnggotaDua)
router.post('/nomorurutindividu', Controller.nomorUrutIndividu)
router.post('/nomorurutkelompok', Controller.nomorUrutKelompok)
module.exports = router