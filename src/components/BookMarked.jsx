import { useEffect } from "react";
import { Layout } from "./Layout";
import { Postcard } from "./PostCard";
import { getCall } from "./ReusableFunctions";
import { usePostProvider } from "../postProvider";
import { GET_BOOKMARKED } from "./postActionTypes";

export const BookMarked = () => {
  const { state, dispatch } = usePostProvider();
  useEffect(async () => {
    const data = await getCall(`/api/users/bookmark`);
    dispatch({ type: GET_BOOKMARKED, payload: data.bookmarks });
  }, []);

  return (
    <Layout>
      {state.bookmarks.length === 0 && <h3>You have no bookmarks</h3>}
      {state.bookmarks.map((item) => {
        return <Postcard item={item} key={item._id} />;
      })}
    </Layout>
  );
};
