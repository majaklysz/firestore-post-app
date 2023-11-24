import { useState, useEffect } from "react";
import placerholder from "../assets/img/user-placeholder.jpg";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({
        image: placerholder,
        name: "User's Name",
        title: "User's Title"
    });
    const url = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${uid}.json`;

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
        }
        getUser();
    }, [url]);

    return (
        <div className="avatar">
            <img src={user.image || placerholder} alt={user.id} />
            <span>
                <h3>{user.name}</h3>
                <p>{user.title}</p>
            </span>
        </div>
    );
}
