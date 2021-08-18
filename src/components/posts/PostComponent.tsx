import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { Post } from "../../models/Post";
import { IBlogService } from "../../services/BlogService";
import SectionTitle from "../shared/SectionTitle";

const PostComponent: FC<{ postId: string; }> = ({ postId }) => {
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const [ post, setPost ] = useState<Post>();
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const history = useHistory();
  useEffect(() => {
    blogService.getPost(postId).then(({ data }) => {
      setPost(data);
    });
  }, []);
  if (!post) {
    return <div></div>;
  }
  return (
    <div className="single-post">
      <div className="single-post-image" style={ { backgroundImage: `url(${backendBaseUrl}/${post.images.find(img => img.size === "full")?.path})` } } />
      <br />
      <br />
      <SectionTitle title={ post.title } sub={ post.sub_title } />
      <br />
      <div className="container">
        <h5 className="back" onClick={ () => history.goBack() }>&laquo;&laquo; volver</h5>
        <div dangerouslySetInnerHTML={ { __html: post.content } } />

      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default PostComponent;