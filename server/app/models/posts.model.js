const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema(
    {
      //  _id: {
        //    type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        //},
        title: {
            type: String,
        },
        category: {
            type: String,
        },
        content: {
            type: String,
        },
        author: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
    //{ timestamps: true }
);


let post = mongoose.model("post", postSchema);

module.exports = post;