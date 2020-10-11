const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**  Report status 
 *   0 -> pending
 *   1 -> approved
 *  -1 -> rejected
*/
const reportSchema = new Schema({
    offender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    offence: { type: String, required: true },
    community: { type: Schema.Types.ObjectId, ref: 'Community', required: true },
    post: { postid: Schema.Types.ObjectId, title: String, preview: String, _id: false },
    status: { type: Number, default: '0' },
    created: { type: Date, default: Date.now }
});

reportSchema.set('toJSON', { getters: true });
reportSchema.options.toJSON.transform = (doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
};

reportSchema.pre(/^find/, function () {
    this
        .populate('offender', 'username picture')
        .populate('reporter', 'username picture')
        .populate('community', 'name picture');
})

reportSchema.post('save', function (doc, next) {
    doc
        .populate('offender', 'username picture')
        .populate('reporter', 'username picture')
        .populate('community', 'name picture')
        .execPopulate()
        .then((doc) => {
            next()
        });
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
