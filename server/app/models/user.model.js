const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let userScheme = mongoose.Schema(
    {
        email: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
        }
       
    }
)

let user = mongoose.model("user", userScheme);

module.exports = user;

/*
 roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "role"
            }
        ]
         */