const Post = require("../models/posts.model");

const numPosts = 10;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    let newPost = new Post(req.body);
    newPost.save((err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(post);
    });
};

exports.findPage = (req, res) => {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    var query = {}
    if (page < 0 || page === 0){
        response = {"error": true, "message": "invalid page number, should start with 1"};
        return res.json(response)
    }
    query.sort = {date: -1}
    query.skip = size * (page - 1);
    query.limit = size;
    //lets find some documents

    Post.count({}, (err, pages) => {
        if(err){
            response.status(500).send(err);
        }
        Post.find({},{}, query, (err, data) =>{
            // Mongo command to fetch all data from collection
            if(err){
                response = {"error": true,"message": "Error fetching data"};
            } else {
                var totalPages = Math.ceil(pages / size);
                response = {"payload": data, "pages": totalPages};
            }
            res.json(response);
        });
    })
   
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Post.find({}, (err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(post);
    })
};

exports.findLatest = (req, res) => {
    Post.find({}, req.body, (err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(post);
    }).sort({date: -1}).limit(1)
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    Post.findOne({ _id: req.params.id }, req.body, (err, post) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(post);
    }
)};

// Update a Post by the id in the request
exports.update = (req, res) => {
    Post.updateOne({_id: req.params.id}, req.body, (err, post) =>{
        if(err){
            res.status(500).send(err);
        }
        res.status(201).json(post);
    } )
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    Post.deleteOne({_id: req.params.id}, req.body, (err, post) =>{
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(post);
    })

};

//Retrieve articles belonging to one category

exports.findCategory = (req, res) => {
    Post.find({category: req.params.category}, req.body, (err, posts) =>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(posts)
    })
};