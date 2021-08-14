import { FC } from "react";
import { useParams } from "react-router-dom";
import PostComponent from "../posts/PostComponent";
import Page from "../shared/Page";

const SinglePostPage: FC = () => {
  const { id } = useParams<{ id: string; }>();
  return (
    <Page>
      <div>
        <PostComponent postId={ id } />
      </div>
    </Page>
  );
};

export default SinglePostPage;