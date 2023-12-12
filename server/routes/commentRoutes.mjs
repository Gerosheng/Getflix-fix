import express from 'express';
import { createComment, getComments, updateComment, deleteComment }  from '../controllers/commentController.mjs'
import userAuthenticate from '../util/userAuthenticate.mjs';
import userAuthorisation from '../util/userAuthorisation.mjs';
import isCommentOwnerOrAdmin from '../util/commentOwner.mjs';

const commentRoutes = express.Router();

commentRoutes.post('/:entityType/:entityId/create', userAuthenticate, userAuthorisation('registrant'), createComment);
commentRoutes.get('/:entityType/:entityId/get', getComments);
commentRoutes.put('/update/:commentId', userAuthenticate, isCommentOwnerOrAdmin, updateComment);
commentRoutes.delete('/delete/:commentId', userAuthenticate, isCommentOwnerOrAdmin, deleteComment );

export default commentRoutes;