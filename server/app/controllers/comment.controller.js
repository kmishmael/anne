const Comment = require("../models/comment.model");

exports.create = (req, res) =>{
    let newComment = new Comment(req.body);
    newComment.save((err, comment) =>{
        if (err){
            res.status(500).send(err);
        }
        res.status(201).json(comment);
    })
}

exports.update = (req, res) => {
    Comment.updateOne({_id: req.params.id}, req.body, (err, query) =>{
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(query)
    })
}


exports.delete = (req, res) => {
    Comment.deleteOne({_id: req.params.id}, req.body, (err, query) =>{
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(query)
    })
}

exports.find = (req, res) => {
    Comment.find({post_id: req.params.id}, req.body, (err, comments) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(comments);
    }).sort({date: -1})
}

exports.findOneComment = (req, res) => {
    Comment.findOne({_id: req.params.id}, req.body, (err, comment) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).json(comment);
    })
}

exports.deleteOfArticle = (req, res) => {
    var myquery = { post_id: req.params.id };
    Comment.deleteMany(myquery, req.body, (err, query) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(query)
    })
}