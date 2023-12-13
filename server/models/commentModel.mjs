import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    entity: { 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true
    },
    onModel: {
        type: String,
        enum: ['MovieModel', 'TvShowModel']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;