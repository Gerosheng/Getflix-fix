

const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res) => responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something went wrong!"
});

const valError = (res, data) => responseWithData(res, 400, data);

const notFound = (res) => responseWithData(res, 404, {
    status: 404,
    message: "Ressource not found"
});

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const empty = (res) => responseWithData(res, 204, {
    status: 204,
    message: "No content"
});

const unauthorize = (res, message, redirectUrl = '/welcome') => 
    responseWithData(res, 401, {
        status: 401,
        message: message,
        redirect: redirectUrl
    });

const forbidden = (res) => responseWithData(res, 403, {
    status: 403,
    message: "Forbidden"
});

const duplicate = (res, propertyName, duplicate) => responseWithData(res, 409, {
    status: 409,
    message: `Duplicate ${propertyName}: ${duplicate[propertyName]}`
});

export default {
    error,
    created,
    empty,
    ok,
    unauthorize,
    forbidden,
    notFound,
    valError,
    duplicate
}