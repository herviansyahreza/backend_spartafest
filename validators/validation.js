const { body } = require('express-validator');
const { validator } = require('./validator');

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const register = [
    body(`username`).isLength({min:6}).notEmpty(),
    body(`email`).isEmail().notEmpty(),
    body(`password`).isLength({min:8}).matches(passRegex).notEmpty(),
    validator
]
const login = [
    body(`email`).isEmail().notEmpty(),
    body(`password`).isLength({min:8}).matches(passRegex).notEmpty(),
    validator
]

const lombakelompok = [
    body(`nama_tim`).notEmpty(),
    body(`ketua`).isLength({min:6}).isString().notEmpty(),
    body(`kontak`).isLength({min:12}).notEmpty(),
    validator
]
const ketua = [
    body(`ketua`).notEmpty(),
    body(`nim`).notEmpty(),
    body(`email`).isEmail().notEmpty(),
    validator 
]
const anggotasatu = [
    body(`nama_satu`).notEmpty(),
    body(`nim_satu`).notEmpty(),
    body(`email_satu`).isEmail().notEmpty(),
    validator
]
const anggotadua = [
    body(`nama_dua`).notEmpty(),
    body(`nim_dua`).isLength({min:12}).notEmpty(),
    body(`email_dua`).isEmail().notEmpty(),
    validator
]
const lombaindividu = [
    body(`nama`).isLength({min:6}).isString().notEmpty(),
    body(`nim`).isInt().isLength({min:12}).notEmpty(),
    body(`email`).isEmail().notEmpty(),
    body('asal_universitas').notEmpty(),
    body(`alamat`).notEmpty(),
    validator
]
module.exports = {
    register,
    login,
    lombakelompok,
    lombaindividu,
    anggotadua,
    anggotasatu,
    ketua
}