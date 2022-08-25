const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema
(
    {
        userId: {type: String, required:true},
        content: {type: Object, required: true},
        dateCreation: {type: Number, required:true},
        lastDateModification: {type: Number, required:true},
        lastModifier: {type: String, required:true},
        likes: {type: Number, default: 0},
        usersLiked: {type: Array}
    }
);


module.exports = mongoose.model("Groupomania_submissionModel", submissionSchema);