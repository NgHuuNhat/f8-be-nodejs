const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
})

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});


module.exports = mongoose.model('Course', Course)