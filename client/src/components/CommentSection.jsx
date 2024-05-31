import { Textarea, Button, Alert } from 'flowbite-react';
import React from 'react';
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Comment from "../components/Comment";

export default function CommentSection({postId}) {
    const {currentUser} = useSelector((state) => state.user);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null);
    const [postComments, setPostComments] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if(comment.length > 200) {
            return;
        }
        try {

            const res = await fetch("/api/comment/create", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id})
            });
    
            const data = await res.json();

            if(res.ok) {
                setCommentError(null);
                setComment("");
                setPostComments([data, ...postComments]);
            }
            else {
                setCommentError(data.message);
                console.log(data.message);
            }
        }
        catch(error) {
            setCommentError(error.message);
            console.log(error);
        }

    }

    const getPostComments = async () => {
        try {
            const res = await fetch(`/api/comment/getPostComments/${postId}`);

            const data = await res.json();

            if(res.ok) {
                setPostComments(data);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getPostComments();
    },[postId])

    return (
        <div className="mx-w-2xl mx-auto w-full p-3">
            {currentUser ? 
            (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Signed in as : </p>
                    <img src={currentUser?.profilePicture} alt="" className="h5 w-5 object-cover rounded-full"/>
                    <Link to={"/dashboard?tab=profile"} className="text-xs text-cyan-600 hover:underline">
                        @{currentUser?.username}
                    </Link>
                </div>
            ): 
            (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to comment.
                    <Link to={"/sign-in"} className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <>
                    <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                        <Textarea 
                            placeholder="Add a comment..."
                            rows={3}
                            maxLength={200}
                            onChange={((e) => setComment(e.target.value))}
                            value={comment}
                        />
                        <div className="flex justify-between items-center mt-5">
                            <p className="text-gray-500 text-sm">{200 - comment.length} characters remaining</p>
                            <Button outline gradientDuoTone="purpleToBlue" type="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </form>
                    {commentError && (
                        <Alert color="failure" className="mt-5">
                            {commentError}
                        </Alert>
                    )}
                </>
            )}
            {postComments.length === 0 
            ? <>
                <p classNaeme="text-sm my-5">No comments yet!</p>
            </>
            : 
            <>
                <div className="text-sm flex my-5 items-center gap-1">
                    <p>Comments</p>
                    <div className="border border-gray-400 py-1 px-2 rounded-sm">
                        <p>{postComments.length}</p>
                    </div>
                </div>
                {postComments?.map((comment, index) => 
                    (<Comment 
                        key={comment._id}
                        comment={comment}
                    />)
                )}
            </>
            }  
        </div>
    )
}
