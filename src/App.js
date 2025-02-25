import './App.css';
import React from 'react';
import { auth } from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
function App() {
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React. useState(false)
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      console.log(user);
      if (user) {
        setUser(user)
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
    {isLoading ? "loading" : <>  <button onClick={logout}>{user.email[0].toUpperCase()}</button></>}
    {loggedIn()}
    </div>
  );
}

export default App;
