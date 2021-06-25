const mysql = require('mysql');
const { nanoid } = require('nanoid');
const connection = require('../database/connection');


const showAllPostHandler = (request, h) => {
    const sql = 'SELECT * FROM post';
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            const response = h.response({
                status: 'success',
                message: null,
                data: result,
                error: null
            }).header('Content-Type', 'application/json').etag('xxxxx');
            response.code(200);
            resolve(response)
        })
    })
}

const showPostByIdHandler = (request, h) => {
    const { id } = request.params;
    const sql = 'SELECT * FROM post WHERE id='+'"'+id+'"';
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            const objectResult = result[0];

            let response = h.response({
                status: 'fail',
                message: null,
                data: null,
                error: null
            });
            response.code(404);
            
            if(result != "") {
                response = h.response({
                    status: 'success',
                    message: null,
                    data: objectResult,
                    error: null
                });
                response.code(200);
            }

            resolve(response)
        })
    })
}

const addPostHandler = (request, h) => {
    const { title, content, image } = request.payload;
    const id = nanoid(16);

    const sql = 'INSERT INTO post (id, title, content, image) VALUES ("'+id+'", "'+title+'", "'+content+'", "'+image+'")';

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if(error) reject(error);
            const response = h.response({
                status: 'success',
                message: 'Post berhasil ditambahkan',
                data: {
                    id: id
                },
                error: null
            });
            response.code(201);
            resolve(response);
        })
    })
}

const updatePostByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, content, image } = request.payload;
    
    let sql = 'UPDATE post SET title="'+title+'", content="'+content+'" WHERE id="'+id+'"';

    if(image) {
        sql = 'UPDATE post SET title="'+title+'", content="'+content+'", image="'+image+'" WHERE id="'+id+'"';
    }

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if(error) reject(error);

            let response = h.response({
                status: 'fail',
                message: 'Post dengan id '+id+' tidak ditemukan',
                data: null,
                error: 'id not found'
            })
            response.code(400);
            
            if(result.affectedRows) {
                response = h.response({
                    status: 'success',
                    message: 'Post dengan id '+id+' berhasil diupdate',
                    data: {
                        id: id
                    },
                    error: null
                })
                response.code(201);
            }
            resolve(response)
        })
    })
}

const deletePostByIdHandler = (request, h) => {
    const { id } = request.params;

    const sql = 'DELETE FROM post WHERE id="'+id+'"';

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if(error) reject(error);

            let response = h.response({
                status: 'fail',
                message: 'Post dengan id '+id+' tidak ditemukan',
                data: null,
                error: 'id not found'
            });
            response.code(404);

            if(result.affectedRows) {
                response = h.response({
                    status: 'success',
                    message: 'Post dengan id '+id+' telah dihapus',
                    data: null,
                    error: null
                });
                response.code(201);
            }
 
            resolve(response)
        })
    })
}


module.exports = { showAllPostHandler, showPostByIdHandler, addPostHandler, updatePostByIdHandler, deletePostByIdHandler }

// standart respone json
// {
//     status: "",
//     message: "",
//     data: "",
//     error: ""
// }