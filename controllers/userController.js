import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
    try {
        res.json(await User.find());
    } catch (error) {
        error.message = "Benutzer konnten nicht abgerufen werden.";
        error.status = 404;
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        await User.create(user);
        res.status(201).json({message: `Added user successfully`})
    } catch (error) {
        error.message = "Create user failed";
        error.status = 500;
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("Benutzer nicht gefunden.");
            error.status = 404;
            next(error);
        }
        res.json(user);
    } catch (error) {
        error.message = "Benutzer konnte nicht abgerufen werden.";
        error.status = 400;
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        {
            new: true,
            runValidators: true,
        }
        );

        if(!updatedUser){
            const error = new Error("User not found");
            error.status = 404;
            next(error);
        }
        res.json({message: "Updated user successfully"});
    } catch (error) {
        error.message = "Benutzer konnte nicht aktualisiert werden.";
        error.status = 400;
        next(error);
    }
}

export const softDeleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("Benutzer nicht gefunden.");
            error.status = 404;
            next(error);
        }
        book.deleted = true;
        await book.save();
        res.json({message: "User soft deleted successfully"});
    } catch (error) {
        error.message = "Benutzer konnte nicht gelöscht werden.";
        error.status = 400;
        next(error);

    }
}