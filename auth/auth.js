const jwt = require('jsonwebtoken');
const db = require('../config/config');
SECRET = process.env.SECRET

const verifyToken = (req, res, next) => {
    token = req.body.token
    if (token) {
        const verified = jwt.verify(token, SECRET)
        if (verified) {
            console.log("Verifikasi Berhasil")
            return next()
        } else {
            return res.status(401).send(error)
        }
    } else {
        res.status(403).send({ message: 'Youre not authenticated, please login first' })
        console.log('Youre not authenticated');
    }
}
// const verifyDaftar = (req, res, next) => {
//     const { email } = req.body
//     const cek = db.query('SELECT cek_daftar FROM users WHERE email = $1', [email])
//     if (cek === 'Terdaftar') {
//         console.log("Sudah Terdaftar")
//         return next()
//     } else {
//         return res.status(403).send('Anda Belum Terdaftar')
//     }
// }
// const verifyAnggotaSatu = (req, res, next) => {
//     const { email } = req.body
//     const cek = db.query('SELECT id FROM anggota_satu WHERE email_satu = $1', [email])
//     if (response.status == 200) {
//         console.log("Sudah Terdaftar")
//         return next()
//     } else {
//         return res.status(403).send('Anda Belum Terdaftar')
//     }
// }
// const verifyAnggotaDua = (req, res, next) => {
//     const { email } = req.body
//     const cek = db.query('SELECT id FROM anggota_dua WHERE email_dua = $1', [email])
//     if (response.status == 200) {
//         console.log("Sudah Terdaftar")
//         return next()
//     } else {
//         return res.status(403).send('Anda Belum Terdaftar')
//     }
// }
module.exports = {
    verifyToken
}