import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from './CallToAction';
import CommentSection from './CommentSection';

export default function PostPage() {

    const {postSlug} = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            setError(false);
            setLoading(true);
            try {
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if(res.ok) {
                    setLoading(false);
                    setError(false);
                    setPost(data.posts[0]);
                }
                else {
                    setLoading(false);
                    setError(true);
                    console.log(data.message);
                    setError(data.message);
                }
            }
            catch(error) {
                setLoading(false);
                setError(true);
                console.log(error);
                setError(error.message);
            }
        }
        fetchPost();
    },[postSlug]);
    
    if(loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        )
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post && post.title}
            </h1>
            <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
                <Button color="gray" pill size="xs">{post && post.category}</Button>
            </Link> 
            <img 
                src={post && post.image}
                alt={post && post.title}
                className="mt-10 p-3 max-h-[600px] w-full object-cover"
            />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post?.createdAt).toLocaleDateString()}</span>
                <span>{post && (post?.content?.length / 1000)?.toFixed(0)} mins read</span>
            </div>
            <div className="p-3 mx-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}>
                
            </div>
            <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
            </div>
            <CommentSection postId={post._id}/>
        </main>
    )
}
