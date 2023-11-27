import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar/UserAvatar";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  /**
   * handleClick is called when user clicks on the Article (PostCard)
   */
  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return (
    <article onClick={handleClick}>
      <UserAvatar uid={post.uid} />
      <img src={post.image} alt={post.caption} />
      <h2>{post.caption}</h2>
    </article>
  );
}
