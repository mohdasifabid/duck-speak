import { useEffect } from "react";
import { Postcard } from "./PostCard";
import { PostMaker } from "./PostMaker";
import { getCall } from "./ReusableFunctions";
import { usePostProvider } from "../postProvider";
import { Layout } from "./Layout";
import { GET_POSTS } from "./postActionTypes";

export const Home = () => {
  const { state, dispatch } = usePostProvider();

  useEffect(async () => {
    const data = await getCall("/api/posts");
    dispatch({ type: GET_POSTS, payload: data.posts });
  }, []);

  return (
    <Layout>
      <PostMaker />
      {state.posts.map((post) => {
        return <Postcard item={post} key={post._id} />;
      })}
    </Layout>
  );
};
