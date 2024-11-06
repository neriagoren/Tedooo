import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import FeedItem from "./FeedItem";
import { FeedItemData } from "../types";
import Loader from "./Loader";

const Feed: React.FC = () => {
    const [feedItems, setFeedItems] = useState<FeedItemData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`https://backend.tedooo.com/hw/feed.json?skip=${skip}`);
            const { data, hasMore } = response.data;

            setFeedItems((prevFeedItems) => [...prevFeedItems, ...data]);
            setHasMore(hasMore);
            setSkip((prevSkip) => prevSkip + data.length);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    }, [skip, hasMore, loading]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100)
            fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="flex flex-col gap-4 items-center">
            {/* NOTE: added index because of duplicated ids */}
            {feedItems.map((feedItem, index) => (<FeedItem key={`${feedItem.id}-${index}}`} {...feedItem} />))}
            {loading && <Loader />}
            {!hasMore && <div> <p className="text-grey50"> No more items to load</p> </div>}
        </div>
    );
}

export default Feed;