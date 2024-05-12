import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { getAllTweet } from "../redux/tweetSlice.js";

const useGetMyTweet = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = useCallback(async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(getAllTweet(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  const followingTweetHandler = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${id}`
      );
      console.log(res);
      dispatch(getAllTweet(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  useEffect(() => {
    const effectHandler = () => {
      if (isActive) {
        fetchMyTweets();
      } else {
        followingTweetHandler();
      }
    };

    effectHandler();

    return () => {
      // Cleanup function if needed
    };
  }, [isActive, refresh, fetchMyTweets, followingTweetHandler]);

  // Include dispatch and id in dependency array to ensure useEffect runs when they change
};

export default useGetMyTweet;
