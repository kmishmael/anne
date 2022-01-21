const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let commentSchema = mongoose.Schema(
    {
        post_id: {
            type: String,
        },
        content: {
            type: String,
        },
        likes: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now
        },
    }
)
let comment = mongoose.model("comment", commentSchema);

module.exports = comment;