import Joi from 'joi';

export const commentValidation = Joi.object({
    content: Joi.string().min(1).max(400).required()
});

