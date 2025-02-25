import React from 'react';
import { auth, db } from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Skeleton from './Skeleton';
import { collection, addDoc } from "firebase/firestore"


function App() {

function createPost() {
  const post = {
    title: "land a 400k job",
    description: "finish front end simplified"
  };
  addDoc(collection(db, "posts"), post)
}

  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React. useState(false)
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        setIsLoading(false)
        console.log(user);
      }, 2000);
      if (user) {
        setUser(user)
        setIsLoggedin(true)
      }
      else {
        setIsLoggedin(false)
      }
    }
    )
  })
  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'email@email.com','test1234')   
     .then((user) => {
    console.log(user);
     
    })
    .catch((error) => {
    console.log(error);
    });
  }
  function login() {
signInWithEmailAndPassword(auth, 'email@email.com','test1234')
.then((data) => {
  console.log(data.user)
  setUser(data.user);
  setIsLoggedin(true)
  // ...
})
.catch((error) => {
console.log(error);
});
  }
  function logout() {
    signOut(auth);
    setUser({});
    setIsLoggedin(false)
  }
  function loggedIn () {
    if (isLoggedin) {
      return (
        <>
        <button onClick={logout}>{user.email[0].toUpperCase()}</button>
        </>
      )
      
    }
    else return (
      <>
       <button onClick={register}>Register</button>
       <button onClick={login}>Login</button>
      </>
    )
  }
  return (
    <div className="App">
    <button onClick={createPost}>Create Post</button>
    {isLoading ? <Skeleton /> : loggedIn() }

    </div>
  );
}

export default App;
