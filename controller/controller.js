const express = require('express')
const db = require('../config/config')
const jwt = require('jsonwebtoken');
const helper = require('../helper/helper')
const service = require('../sevices/Service')

require("dotenv").config();
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
SECRET = process.env.SECRET;

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await service.register(username, email, password);
        if (user instanceof Error) {
            throw new Error(user)
        }
        res.status(helper.status.success).json(helper.successMessage)
    } catch (error) {
        res.status(helper.status.error).json(helper.errorMessage)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await service.login(email)
//         const  user = await db.query('SELECT * FROM users WHERE email=$1;', [email])
        console.log(user.rowCount)
        if (user.rowCount > 0) {
            const validPass = await bcrypt.compare(password, user.rows[0].password)
            if (validPass) {
                let jwtSecretKey = process.env.SECRET;
                let data = {
                    id: user.rows[0].id,
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    password: user.rows[0].password
                }
                const token = jwt.sign(data, jwtSecretKey);
                res.cookie("JWT", token, { httpOnly: true, sameSite: "strict" }).status(200).json({
                    id: user.rows[0].id,
                    username: user.rows[0].username,
                    email: user.rows[0].email,
                    token: token
                });
            } else {
                return res.status(helper.status.error).json(helper.errorMessage)
            }
        } else {
            return res.status(helper.status.error).json(helper.errorMessage)
        }
    } catch (error) {
        res.status(helper.status.error).json(helper.errorMessage)

    }
}


const logout = async (req, res) => {
    try {
        return res.clearCookie('JWT', 'terdaftar').send('Berhasil Log Out')
    } catch (err) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}

const verify = async (req, res) => {
    const { email } = req.body;
    try {
        user = service.verify(email)
        if (user instanceof Error) {
            throw new Error(user)
        }
        return res.status(helper.status.success).json(helper.successMessage)
    } catch (err) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}
const insertAnggotaSatu = async (req,res) => {
        try {
            const { nama_satu, nim_satu, email_satu } = req.body
            user = service.insertAnggotaSatu(nama_satu, nim_satu, email_satu)
            if (user instanceof Error) {
                throw new Error(user)
            }
            try {
                const { nama_dua, nim_dua, email_dua } = req.body
                user = service.insertAnggotaDua(nama_dua, nim_dua, email_dua)
                if (user instanceof Error) {
                    throw new Error(user)
                }
            } catch (err) {
                return res.status(helper.status.error).json(helper.errorMessage)
            }
        } catch (err) {
            return res.status(helper.status.error).json(helper.errorMessage)
        }
        res.send(helper.status.success).json(helper.successMessage)
}
const insertAnggotaDua = async (req,res) => {
        try {
            const { nama_dua, nim_dua, email_dua } = req.body
            user = service.insertAnggotaDua(nama_dua, nim_dua, email_dua)
            if (user instanceof Error) {
                throw new Error(user)
            }
        } catch (err) {
            return res.status(helper.status.error).json(helper.errorMessage)
        }
        res.send(helper.status.success).json(helper.successMessage)
}
const lombaKelompok = async (req,res) => {
        try {
            const { bidang_lomba, nama_team, ketua, nim, email, asal_universitas, kontak, alamat, nama_satu, nim_satu, email_satu, nama_dua, nim_dua, email_dua} = req.body
            user = service.insertKelompok(bidang_lomba, nama_team, ketua, nim, email, asal_universitas, kontak, alamat, nama_satu, nim_satu, email_satu, nama_dua, nim_dua, email_dua)
            if (user instanceof Error) {
                throw new Error(user)
            }
            try {
                user = service.updateDaftar(email)
                if (user instanceof Error) {
                    throw new Error(user)
                }
                try {
                    user = service.nomorUrutKelompok(email)
                    if (user instanceof Error) {
                        throw new Error(user)
                    }
                } catch {
                    return res.status(helper.status.error).json(helper.errorMessage)
                }
            } catch {
                return res.status(helper.status.error).json(helper.errorMessage)
            }

        } catch (error) {
            return res.status(helper.status.error).json(helper.errorMessage)
        }
        res.send(helper.status.success).json(helper.successMessage)
}
// const lombaKelompok = async (req, res) => {
//     try {
//         try {
//             const { nama_satu, nim_satu, email_satu } = req.body
//             user = service.insertAnggotaSatu(nama_satu, nim_satu, email_satu)
//             if (user instanceof Error) {
//                 throw new Error(user)
//             }
//         } catch (err) {
//             return res.status(helper.status.error).json(helper.errorMessage)
//         }
//         try {
//             const { nama_dua, nim_dua, email_dua } = req.body
//             user = service.insertAnggotaDua(nama_dua, nim_dua, email_dua)
//             if (user instanceof Error) {
//                 throw new Error(user)
//             }
//         } catch (err) {
//             return res.status(helper.status.error).json(helper.errorMessage)
//         }
//         try {
//             const { bidang_lomba, nama_team, ketua, nim, email, asal_universitas, kontak, alamat, nama_satu, nama_dua } = req.body
//             user = service.insertKelompok(bidang_lomba, nama_team, ketua, nim, email, asal_universitas, kontak, alamat, nama_satu, nama_dua)
//             if (user instanceof Error) {
//                 throw new Error(user)
//             }
//             try {
//                 user = service.updateDaftar(email)
//                 if (user instanceof Error) {
//                     throw new Error(user)
//                 }
//             } catch {
//                 return res.status(helper.status.error).json(helper.errorMessage)
//             }
//         } catch (error) {
//             return res.status(helper.status.error).json(helper.errorMessage)
//         }
//         res.send(helper.status.success).json(helper.successMessage)
//     } catch (error) {
//         return res.status(helper.status.error).json(helper.errorMessage)
//     }
// }
const lombaIndividu = (req, res) => {
    const { bidang_lomba, nama, nim, email, asal_universitas, kontak, alamat} = req.body;
    try {
        user = service.insertIndividu(bidang_lomba, nama, nim, email, asal_universitas, kontak, alamat)
        if (user instanceof Error) {
            throw new Error(user)
        }
        try {
            user = service.updateDaftar(email)
            if (user instanceof Error) {
                throw new Error(user)
            }
            try {
                user = service.nomorUrutIndividu(email)
                if (user instanceof Error) {
                    throw new Error(user)
                }
            } catch {
                return res.status(helper.status.error).json(helper.errorMessage)
            }
        } catch {
            return res.status(helper.status.error).json(helper.errorMessage)
        }
        res.status(helper.status.success).json(helper.successMessage)
    } catch (error) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}
const nomorUrutKelompok = async (req, res) => {
    const { email } = req.body
    try {
        user = service.nomorUrutKelompok(email)
        if (user instanceof Error) {
            throw new Error(user)
        }
    } catch {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}
const nomorUrutIndividu = async (req, res) => {
    const { email } = req.body
    try {
        user = service.nomorUrutIndividu(email)
        if (user instanceof Error) {
            throw new Error(user)
        }
        res.status(helper.status.success).json(helper.successMessage)
    } catch (error) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}
const cekEmailTerdaftar = async (req, res) => {
    const { email } = req.body
    try {
        user = await service.cekDaftar(email);
        if (user instanceof Error) {
            throw new Error(user)
        }
        res.cookie("terdaftar", "terdaftar", { httpOnly: true, sameSite: "strict" })
    } catch (error) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
    try {
        user = await service.cekEmailAnggotaSatu(email);
        if (user instanceof Error) {
            throw new Error(user)
        }
        res.cookie("terdaftar", "terdaftar", { httpOnly: true, sameSite: "strict" })
    } catch (error) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
    try {
        user = await service.cekEmailAnggotaDua(email);
        if (user instanceof Error) {
            throw new Error(user)
        }
        res.cookie("terdaftar", "terdaftar", { httpOnly: true, sameSite: "strict" })
    } catch (error) {
        return res.status(helper.status.error).json(helper.errorMessage)
    }
}
module.exports = {
    register,
    login,
    logout,
    verify,
    lombaKelompok,
    lombaIndividu,
    cekEmailTerdaftar,
    nomorUrutKelompok,
    nomorUrutIndividu,
    insertAnggotaSatu,
    insertAnggotaDua
}
