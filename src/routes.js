const { showAllPostHandler, showPostByIdHandler, addPostHandler, updatePostByIdHandler, deletePostByIdHandler } = require("./handler");


const routes = [
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            const params = request.query;
            return params;
        }
    },
    {
        method: "GET",
        path: "/posts",
        handler: showAllPostHandler,
    },
    {
        method: "GET",
        path: "/posts/{id}",
        handler: showPostByIdHandler
    },
    {
        method: "POST",
        path: "/posts",
        handler: addPostHandler
    },
    {
        method: "PUT",
        path: "/posts/{id}",
        handler: updatePostByIdHandler
    },
    {
        method: "DELETE",
        path: "/posts/{id}",
        handler: deletePostByIdHandler
    }
];

module.exports = routes;