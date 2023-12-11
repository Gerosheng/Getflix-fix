import Comment from "../models/commentModel.mjs";
import responseHandlers from "./handlers/responseHandlers.mjs";

const isCommentOwnerOrAdmin = (req, res, next) => {
    const user = req.user; 
    const commentId = req.params.commentId; 

    const comment = Comment.findById(commentId);

    if (!comment) {
        return responseHandlers.notFound(res);
    }

    if (user.role === 'admin' || user._id.toString() === comment.userId.toString()) {
        next();
    } else {
       responseHandlers.unauthorize(res, 'Forbidden');
    }
};

export default isCommentOwnerOrAdmin