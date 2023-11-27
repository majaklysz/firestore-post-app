import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { postsRef } from "../firebase-config";

export default function UpdatePage() {
  const [post, setPost] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const docRef = doc(postsRef, params.postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    }

    getPost();
  }, [params.postId]);

  //fetching post to update

  async function savePost(postToUpdate) {
    postToUpdate.uid = post.uid;
    const docRef = doc(postsRef, params.postId);
    await updateDoc(docRef, postToUpdate);
    navigate("/");
  }

  async function deletePost() {
    const confirmDelete = window.confirm(
      `Do you want to delete post, ${post.title}?`
    );
    if (confirmDelete) {
      const docRef = doc(postsRef, params.postId);
      await deleteDoc(docRef);
      navigate("/");
    }
  }

  return (
    <section className="page">
      <h1>Update Post</h1>
      <PostForm post={post} savePost={savePost} />
      <button className="btn-delete" onClick={deletePost}>
        Delete Post
      </button>
    </section>
  );
}
