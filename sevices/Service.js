const db = require('../config/config');
const jwt = require('jsonwebtoken');
const query = require('../config/query')
const bcrypt = require('bcrypt');

const register = async (username, email, password) => {
    const hash_pw = await bcrypt.hash(password, 10);
    try {
        const result = await query.query(`INSERT INTO users(username,email,password) VALUES ($1,$2,$3);`, [username, email, hash_pw])
        if (!result) {
            throw new Error('Error inserting Data');
        }
        return {
            message: 'Data inserred successfully',
        };
    } catch (error) {
        return error;
    }
}
const login = async (email) => {
    try {
        const user = await query.query('SELECT * FROM users where email=$1;', [email])
        return user
    } catch (error) {
        error
    }
}
const verify = async (email) => {
    try {
        const data = await query.query(`SELECT * FROM users where email=$1;`, [email])
    } catch (error) {
        return error
    }
}
const updateDaftar = async(email) => { 
    try{
        await query.query(`UPDATE users SET cek_daftar = 'terdaftar' WHERE email=$1;`, [email])
    } catch (error) {
        return error
    }
    
}
const cekDaftar = async(email) => {
    try{
        const cek_daftar = await query.query('SELECT cek_daftar FROM users WHERE email=$1;', [email])
        let cek = cek_daftar.rows[0].cek_daftar
        if(cek == 'terdaftar') {
            return (true)
        } else 
            return (false)   
    } catch (error){
        return (error)
    }
}
const insertAnggotaSatu = async(nama_satu, nim_satu, email_satu) => {
    try {
        await query.query('INSERT INTO anggota_satu(nama_satu, nim_satu, email_satu) VALUES ($1,$2,$3);', [nama_satu, nim_satu, email_satu])
    } catch (error) {
        return error
    }
}
const insertAnggotaDua = async(nama_dua, nim_dua, email_dua) => {
    try {
        await query.query('INSERT INTO anggota_satu(nama_dua, nim_dua, email_dua) VALUES ($1,$2,$3);', [nama_dua, nim_dua, email_dua])
    } catch (error) {
        return error
    }
}

const insertKelompok = async(bidang_lomba, nama_team, ketua, nim, email, asal_sekolah, kontak, alamat, ktm, nama_satu, nama_dua) => {
    try {
        const anggota_satu = await query.query(`SELECT * FROM anggota_satu where nama_satu=$1`, [nama_satu])
        const anggota_dua = await query.query(`SELECT * FROM anggota_satu where nama_dua=$1`, [nama_dua])
        await db.query('INSERT INTO reg_kelompok(bidang_lomba, nama_team, ketua, nim, email, asal_universitas, kontak, alamat, ktm, anggota_satu, anggota_dua) VALUES ($1,$2,$3,$4,$5,$6,$7, $8, $9);',
                [bidang_lomba, nama_team, ketua, nim, email, asal_sekolah, alamat, ktm, anggota_satu, anggota_dua])
    } catch(error) {
        return error
    }
}

const insertIndividu = async(bidang_lomba, nama, nim, email, kontak, asal_sekolah, alamat) => {
    try {
        await db.query('INSERT INTO reg_individu(bidang_lomba, nama, nim, email, kontak, asal_universitas, alamat) VALUES ($1,$2,$3,$4,$5,$6, $7);', [bidang_lomba, nama, nim, email, asal_sekolah, alamat])
    } catch(error) {
        return error
    }
}

const nomorUrutIndividu = async(email) => {
    try{
        const id_individu =  await db.query('SELECT id FROM reg_individu WHERE email=$1;', [email])
        let id = id_individu.rows[0].id
        await query.query('INSERT INTO nomorurut(id_individu) VALUES ($1);', [id])
    } catch(error) {
        return error
    }
}

const nomorUrutKelompok = async(email) => {
    try {
        const id_kelompok = await query.query('SELECT id FROM reg_kelompok WHERE email=$1;', [email])
        let id = id_kelompok.rows[0].id
        await query.query('INSERT INTO nomorurut(id_kelompok) VALUES ($1);', [id])
    } catch (error) {
        return error
    }
}
const cekEmailAnggotaSatu = async(email) => {
    try {
        const result = await query.query('SELECT id FROM anggota_satu WHERE email=$1;', [email])
        if(result.rowCount>0) {
            return (true)
        } else {
            return (false)
        }
    } catch (error) {
        return error
    }
}
const cekEmailAnggotaDua = async(email) => {
    try {
        const result = await query.query('SELECT id FROM anggota_dua WHERE email=$1;', [email])
        if(result.rowCount>0) {
            return (true)
        } else {
            return (false)
        }
    } catch (error) {
        return error
    }
}
module.exports = {
    register,
    login,
    verify,
    updateDaftar,
    cekDaftar,
    insertAnggotaSatu,
    insertAnggotaDua,
    insertKelompok,
    insertIndividu,
    nomorUrutIndividu,
    nomorUrutKelompok,
    cekEmailAnggotaSatu,
    cekEmailAnggotaDua
}
