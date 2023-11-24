import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import imgPlaceholder from "../assets/img/user-placeholder.jpg";
import UserPosts from "../components/UserPosts";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const auth = getAuth();
    const url = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${auth.currentUser?.uid}.json`;

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url);
            const userData = await response.json();

            if (userData) {
                // if userData exists set states with values from userData (data from firestore)
                setName(userData.name);
                setEmail(auth.currentUser?.email);
                setTitle(userData.title || "");
                setImage(userData.image || imgPlaceholder);
            }
        }
        getUser();
    }, [auth.currentUser, url]); // dependencies: useEffect is executed when auth.currentUser changes

    async function handleSubmit(event) {
        event.preventDefault();

        const userToUpdate = { name, mail: email, title, image }; // create an object to hold the user to update properties
        console.log(userToUpdate);

        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(userToUpdate)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("User updated: ", data);
        } else {
            console.log("Sorry, something went wrong");
        }
    }

    function handleSignOut() {
        signOut(auth); // sign out from firebase/auth
    }

    /**
     * handleImageChange is called every time the user chooses an image in the fire system.
     * The event is fired by the input file field in the form
     */
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            // image file size must be below 0,5MB
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage(""); // reset errorMessage state
        } else {
            // if not below 0.5MB display an error message using the errorMessage state
            setErrorMessage("The image file is too big!");
        }
    }

    return (
        <section className="page">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name="name"
                        placeholder="Type name"
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        placeholder="Type email"
                        disabled
                    />
                </label>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        name="title"
                        placeholder="Type your title"
                    />
                </label>
                <label>
                    Image
                    <input type="file" className="file-input" accept="image/*" onChange={handleImageChange} />
                    <img
                        className="image-preview"
                        src={image}
                        alt="Choose"
                        onError={event => (event.target.src = imgPlaceholder)}
                    />
                </label>
                <p className="text-error">{errorMessage}</p>
                <button>Save User</button>
            </form>
            <button className="btn-outline" onClick={handleSignOut}>
                Sign Out
            </button>

            <h2>Posts</h2>
            <UserPosts uid={auth.currentUser?.uid} />
        </section>
    );
}
