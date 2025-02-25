import React from "react";
import { auth, db } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Skeleton from "./Skeleton";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
function deletePost() {
  const hardcodedId = "AZkCk841DebLzmH8mtxQ"
  const postRef = doc(db, "posts", hardcodedId)
  deleteDoc(postRef);
}
async function updatePost() {
  const hardcodedId= "ihaqIi478PZOBWer0gE6"
  const postRef=doc(db, "posts", hardcodedId)
  const post = await getPostById(hardcodedId)
  console.log(post)
  const newPost = {
    ...post,
    title: "Land a job"
  }
  updateDoc(postRef, newPost)
}

  function createPost() {
    const post = {
      title: "User uid post alternative",
      description: "Hello",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({...elem.data(), id: elem.id}));
    console.log(posts);
  }
  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid) //the uid of the person logged in
    );
    const {docs} = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

async function getPostById(id) {
const postRef = doc(db, "posts", id);
const postSnap = await getDoc(postRef)
return postSnap.data();

}

  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setIsLoading(false);
        //    console.log(user);
      }, 2000);
      if (user) {
        setUser(user);
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
  });
  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test1234")
      .then((user) => {
        // console.log(user);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test1234")
      .then((data) => {
        console.log(data.user);
        setUser(data.user);
        setIsLoggedin(true);
        // ...
      })
      .catch((error) => {
        //console.log(error);
      });
  }
  function logout() {
    signOut(auth);
    setUser({});
    setIsLoggedin(false);
  }
  function loggedIn() {
    if (isLoggedin) {
      return (
        <>
          <button onClick={logout}>{user.email[0].toUpperCase()}</button>
        </>
      );
    } else
      return (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      );
  }
  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostById}>Get Post By ID</button>
        <button onClick={getPostByUid}>Get Post by UID</button>
        <button onClick={updatePost}>Update Post</button>
        <button onClick={deletePost}>Delete Post</button>
        <div>{isLoading ? <Skeleton /> : loggedIn()}</div>
      </div>
    </div>
  );
}

export default App;
