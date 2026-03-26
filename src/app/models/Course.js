const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const Course = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    _id: false,
    timestamps: true,
})

mongoose.plugin(slug);
// mongoose.plugin(AutoIncrement);

Course.plugin(AutoIncrement, {
    inc_field: '_id'
})

Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});


module.exports = mongoose.model('Course', Course)