export const logger = (req, res, next) => {
    console.log(`Time: ${new Date()}`);
    next();
};

export function invalidPathHandler(req, res) {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
};

export function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json(err.message);
    }