import express from 'express';
import { createComment, getComments, updateComment, deleteComment } from '../controllers/commentController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs';
import isCommentOwnerOrAdmin from '../util/commentOwner.mjs';

const commentRoutes = express.Router();

commentRoutes.post('/:entityType/:entityId/comments', checkUserRole('registrant'), createComment)
commentRoutes.get('/:entityType/:entityId/comments', getComments);
commentRoutes.put('/comments/:commentId', userAuthenticate, isCommentOwnerOrAdmin, updateComment);
commentRoutes.delete('/comments/:commentId', userAuthenticate, isCommentOwnerOrAdmin, deleteComment );

export default commentRoutes;