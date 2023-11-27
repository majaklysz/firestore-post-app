import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { postsRef } from "../firebase-config.js";
import { onSnapshot } from "firebase/firestore";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(postsRef, (data) => {
      const postsData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    });
  }, []);

  return (
    <section className="page">
      <section className="grid-container">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </section>
  );
}
