import {signOut, onAuthStateChanged , signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from '../firebase/config';

const handleLogout = async () => {
    return signOut(auth).then(() => {
      localStorage.removeItem('token');
    // Sign-out successful.
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
      
};


const handleLogin = async (email, password) => {
    try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

const handleSignUp = async (email, password) => {
    try {
     await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error.message)
    }
}

const getToken = async () => {
  try {
    const token = await auth.currentUser.getIdToken(); 
  return token;
  } catch (error) {
    return null;
  }
  
}

const handleRefreshing = (loginStatus)=> {
const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      loginStatus(true);
      console.log("User is logged in:");
    } else {
      loginStatus(false);
      console.log("No user is logged in");
    }
  });
  return unsubscribe;
}

const handleProfileUpdate = (displayName) => {
return updateProfile(auth.currentUser, {
  displayName: displayName
});
}

const getUserInfo = () => {
  const user = auth.currentUser;
  return {
    email: user.email,
    name: user.displayName
  };
}

export {handleLogin , handleLogout , handleRefreshing, getToken, handleSignUp, handleProfileUpdate, getUserInfo}