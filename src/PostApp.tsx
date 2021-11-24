import { Suspense } from "react";
import { selector, useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { getPost, responseProps } from "./PostService";
import "./App.css";

export const postSelector = selector({
  key: "postSelectorFamily",
  get: async () => {
    const response = await getPost();
    return response.data;
  },
});

const PostApp = () => {
  const refresh = useRecoilRefresher_UNSTABLE(postSelector);
  return (
    <div className="postContainer">
      <p className="title">POSTS</p>
      <p className="contentText">FETCH API | SHIMMER | RELOAD STATE</p>
      <p className="contentText">
        from : https://jsonplaceholder.typicode.com/posts
      </p>
      <button className="mButton" onClick={() => refresh()}>
        Refresh
      </button>
      <Suspense fallback={LoadingShimmer}>
        <PostAppChild />
      </Suspense>
    </div>
  );
};

const PostAppChild = () => {
  const posts = useRecoilValue(postSelector);
  return (
    <>
      {posts.map((e: responseProps) => {
        return (
          <div className="posts" key={e.id}>
            <p className="postTitle">{e.title} </p>
            <p className="postDescription">{e.body}</p>
          </div>
        );
      })}
    </>
  );
};

const data: number[] = [1, 2, 3, 4, 5];
const LoadingShimmer = (
  <div
    style={{
      width: "100%",
    }}
  >
    {data.map((e: number, i: number) => {
      return (
        <div
          className="posts"
          style={{
            margin: 16,
          }}
          key={i}
        >
          <div
            className="shimmer postTitle"
            style={{
              width: 200,
              height: 24,
            }}
          />
          <div
            className="shimmer"
            style={{
              width: 400,
              margin: "10px 0px",
              height: 16,
            }}
          />
        </div>
      );
    })}
  </div>
);

export default PostApp;
