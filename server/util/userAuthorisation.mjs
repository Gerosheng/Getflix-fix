import responseHandler from './handlers/responseHandlers.mjs';

const userAuthorisation = (auhtorizedRole) => (req, res, next) => {
    const userRole = req.user.role;

    if (userRole.includes(auhtorizedRole)) {
        next();
    } else {
        responseHandler.forbidden(res);
    }
};

export default userAuthorisation;