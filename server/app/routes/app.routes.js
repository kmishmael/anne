'use strict';
const express = require('express');
var posts = require('../controllers/post.controller');
var comments = require('../controllers/comment.controller');
const { post } = require('jquery');

const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({ message: "Anne server RESTful API" });
});

router
        //post routes
        .get('/articles', posts.findPage)
        .post('/articles', posts.create)

        .get("/article/:id", posts.findOne)

        .post("/article/create", posts.create)

        .get("/articles/:category", posts.findCategory)

        .delete("/article/delete/:id", posts.delete)

        .put("/article/update/:id", posts.update)

        .get("/article/get/latest", posts.findLatest)

           //comments routes
        .get("/article/comments/:id", comments.find)

        .get("/article/comment/view/:id", comments.findOneComment)

        .post("/article/comment/create", comments.create)

        .put("/article/comment/update/:id", comments.update)

        .delete("/article/comment/delete/:id", comments.delete)

        .delete("/article/comments/delete/:id", comments.deleteOfArticle)
        

module.exports = router;
/*
        
    //put and delete request for posts endpoints

    app
        .route("")
        .put();
    
    app
        .route("")
        .put();
*/