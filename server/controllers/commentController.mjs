import { commentValidation } from "../validations/commentValidation.mjs";
import Comment from "../models/commentModel.mjs";
import MovieModel from "../models/moviemodel.mjs";
import TvShowModel from "../models/tvmodel.mjs";
import { parseError } from "../util/helpers.mjs";
import responseHandler from "../util/handlers/responseHandlers.mjs"
import sanitize from 'sanitize-html';

const createComment = async (req, res) => {
    const { content } = req.body;
    const user = req.user;
    const entityId = req.params.entityId;
    const entityType = req.params.entityType;

    try {
        await commentValidation.validateAsync({
            content
        });

        const sanitizedContent = sanitize(content);

        let entity;
        if (entityType === 'MovieModel'){
            entity = await MovieModel.findById(entityId);
        } else if (entityType === 'TvShowModel') {
            entity = await TvShowModel.findById(entityId);
        }

        if (!entity) {
            return responseHandler.notFound(res);
        }

        const comment = new Comment({
            content: sanitizedContent,
            userId: user,
            entity: entityId,
            onModel: entityType,
        });

        await comment.save();

        entity.comments.push(comment);

        await entity.save();

        responseHandler.created(res);
        
    } catch (error){ 
        responseHandler.valError(res, parseError);
    };
}; 

const getComments = async (req, res) => {
    const entityId = req.params.entityId;
    const entityType = req.params.entityType;

    try {
        const comments = await Comment.find({ entity: entityId, onModel: entityType })
            .populate('userId', 'firstname email')

        responseHandler.ok(res, comments);
    } catch (err) {
        responseHandler.error(res);
    }
};

const updateComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );

        if (!updatedComment) {
            return responseHandler.notFound(res);
        }

        responseHandler.ok(res, updatedComment);
    } catch (err) {
        responseHandler.error(res);
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return responseHandler.notFound(res);
        }

        responseHandler.ok(res, deletedComment);   
    } catch (error) {
        responseHandler.error(res);
    }
}

export {
    createComment,
    getComments,
    updateComment,
    deleteComment,
}