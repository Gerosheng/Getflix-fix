import Comment from "../models/commentModel.mjs";
import responseHandlers from "./handlers/responseHandlers.mjs";

const isCommentOwnerOrAdmin = async (req, res, next) => {
    const user = req.user; 
    const commentId = req.params.commentId; 
    try{
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return responseHandlers.notFound(res);
        }
    
        if (user.role === 'admin' || user.id.toString() === comment.userId.toString()) {
            next();
        } else {
           responseHandlers.unauthorize(res, 'Forbidden');
        }
    } catch (err) {
        console.error('Error retrieving comment:', err);
        responseHandlers.error(res);
    }
};

export default isCommentOwnerOrAdmin