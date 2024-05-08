import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req,res,next) => {

    try {
        
        const {content, postId, userId} = req.body;

        if(userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to create the comment"));
        }

        const newCommment = new Comment({
            content,
            postId,
            userId,
        });

        await newCommment.save();

        return res.status(200).json(newCommment);

    }
    catch(error) {
        console.log(error);
        next(error);
    }

}