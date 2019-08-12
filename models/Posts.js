const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostsSchema = new Schema({
  title: String,
  body: String,
  author: String,
}, { timestamps: true });

PostsSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Posts', PostsSchema);