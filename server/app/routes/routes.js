'use strict';

//create App function
module.exports = function (app) {
    var posts = require('../controllers/controller')

    // posts routes

    //get and post request for /todos endpoints
 
    app
        .route("/posts")
        .get(posts.findAll)
        .post(posts.create);

    //put and delete request for posts endpoints

    // pagination test 
    app
        .route("/articles")
        .get(posts.findPage);

    app
        .route("/post/:id")
        .get(posts.findOne);

    app
        .route("/post/create")
        .post(posts.create);
    
    app
        .route("/num")
        .get(posts.findNum);

    app
        .route("/posts/:category")
        .get(posts.findCategory);

    app
        .route("/post/delete/:id")
        .delete(posts.delete);

    app
        .route("/post/update/:id")
        .put(posts.update);

    app
        .route("/latest")
        .get(posts.findLatest);

};