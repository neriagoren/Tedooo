import Avatar from "./Avatar";
import LikeIcon from '../assets/icons/like.svg?react';
import ThumbsUpIcon from '../assets/icons/thumbs-up.svg?react';
import CommentIcon from '../assets/icons/message-square.svg?react';
import { FeedItemData } from "../types";
import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

type FeedItemProps = Pick<
    FeedItemData,
    "id" | "username" | "avatar" | "shopName" | "images" | "comments" | "likes" | "date" | "text" | "didLike" | "premium"
>;

const FeedItem: React.FC<FeedItemProps> = ({ id, username, avatar, shopName, images, comments, likes, date, text, didLike, premium }) => {

    const [likesCounter, setLikesCounter] = useState<number>(likes);
    const [hasLiked, setHasLiked] = useState<boolean>(didLike);

    const handleLike = () => {
        setLikesCounter(prev => hasLiked ? prev - 1 : prev + 1);
        setHasLiked(prev => !prev)
    }

    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5
    });

    useEffect(() => {
        if (isIntersecting) {
            const sendImpression = async () => {
                try {
                    const response = await fetch(`https://backend.tedooo.com/?itemId=${id}`);
                    if (response.ok) {
                        console.log(`Impression sent for item ${id}`);
                    } else {
                        console.error('Failed to send impression');
                    }
                } catch (error) {
                    console.error('Error sending impression:', error);
                }
            };

            sendImpression();
        }
    }, [isIntersecting]);

    return (
        <div ref={ref} className='flex flex-col w-full bg-white rounded-[4px] shadow-lg'>
            <div className="space-y-4 pt-6 px-6 pb-4">
                <div className="flex gap-3">
                    <Avatar src={avatar} />
                    <div>
                        <p className="font-medium"> {username} </p>
                        <p className="text-indigo font-medium text-sm"> {shopName} <span className="text-grey50"> {`· ${formatDistance(date, new Date(), { addSuffix: true, includeSeconds: false })}`} </span> </p>
                    </div>
                </div>

                <p className="text-sm"> {text} </p>
            </div>

            <div className={`${images.length >= 2 ? 'grid grid-cols-2 gap-2 justify-items-center' : ''}`}>
                {images.slice(0, 2).map((image, index) => (
                    <img key={index} src={image} alt={`Post image ${index + 1}`} className="object-contain h-full w-full" />
                ))}
            </div>

            <div className="pt-4 px-6 space-y-4">
                <div className="flex justify-between text-grey65 text-sm">
                    <div className="flex items-center gap-1">
                        <LikeIcon />
                        {`${likesCounter} likes`}
                    </div>
                    <div>
                        {`${comments} comments`}
                    </div>
                </div>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1072 2" fill="none">
                        <path d="M0 1H1072" stroke="#E9EAEA" />
                    </svg>
                    <div className="flex py-2 text-grey85 text-sm">
                        <button onClick={handleLike} className={`flex items-center justify-center gap-1 w-1/2 ${hasLiked ? 'text-indigo' : ''}`}>
                            <ThumbsUpIcon />
                            Like
                        </button>
                        <button className="flex items-center justify-center gap-1 w-1/2">
                            <CommentIcon />
                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedItem;