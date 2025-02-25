import './App.css';
import React from 'react';
import { auth } from './firebase/init'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
function App() {
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
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
  return (
    <div className="App">
     <button onClick={register}>Register</button>
     <button onClick={login}>Login</button>
     <button onClick={logout}>Logout</button>
     {isLoading ? "loading" : user.email}
    
    </div>
  );
}

export default App;
