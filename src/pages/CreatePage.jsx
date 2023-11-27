import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

import { postsRef } from "../firebase-config";
import { addDoc, serverTimestamp } from "firebase/firestore";

export default function CreatePage() {
  const auth = getAuth();
  const navigate = useNavigate();

  async function createPost(newPost) {
    newPost.uid = auth.currentUser.uid; // authenticated user id

    newPost.createdAt = serverTimestamp();
    newPost.uid = auth.currentUser.uid;
    await addDoc(postsRef, newPost);
    navigate("/");
  }

  return (
    <section className="page">
      <h1>Create New Post</h1>
      <PostForm savePost={createPost} />
    </section>
  );
}
