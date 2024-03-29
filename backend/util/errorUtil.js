export const INVALID_ARGUMENT_ERROR = 'InvalidArgumentError';
export const VALIDATION_ERROR = 'ValidationError';
export const UNAUTHORIZED_ERROR = 'UnauthorizedError';
export const FORBIDDEN_ERROR = 'ForbiddenError';
export const CAST_ERROR = 'CastError';
export const INTERNAL_SERVER_ERROR = 'InternalServerError';
export const NOT_FOUND_ERROR = 'NotFoundError';

export const throwInvalidArgumentError = message => {
    throwError(INVALID_ARGUMENT_ERROR, message);
};

export const throwForbiddenError = message => {
    throwError(FORBIDDEN_ERROR, message);
};

export const throwUnauthorizedError = message => {
    throwError(UNAUTHORIZED_ERROR, message);
};

export const throwInternalServerError = message => {
    throwError(INTERNAL_SERVER_ERROR, message);
};

export const throwNotFoundError = message => {
    throwError(NOT_FOUND_ERROR, message);
};

export const getError = (type, message) => {
    let error = new Error();
    error.name = type;
    error.message = message;
    return error;
};

const throwError = (type, message) => {
    const error = getError(type, message);
    throw error;
};
