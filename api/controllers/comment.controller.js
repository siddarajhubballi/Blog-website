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

export const getPostComments = async (req, res, next) => {
    if(!req.params.postId) {
        next(errorHandler(400, "Unable to get post"));
    }

    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({createdAt: -1});

        return res.status(200).json(comments);
    }
    catch(error) {
        next(error);
    }
}  


export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) {
            return next(errorHandler(404, "Comment not found"));
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        }
        else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex,1);
        }
        await comment.save();
        res.status(200).json(comment);
    }
    catch(error) {
        console.log(error);
        next(error);
    }
}