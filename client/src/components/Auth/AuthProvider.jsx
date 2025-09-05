import { useEffect } from 'react'
import { handleRefreshing, getUserInfo } from '../../utils/authHelpers';
import {setIsLoggedIn} from '../../redux/slice/authSlice';
import {setUserDetails} from '../../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const AuthProvider = ({children}) => {
const dispatch = useDispatch();
const isLoggedIn = useSelector(state=> state.auth.isLoggedIn)

  const loginStatus = (val) => {
    dispatch(setIsLoggedIn(val));
  };

  useEffect(()=>{
    const unsubscribe = handleRefreshing(loginStatus);
    return () => unsubscribe(); // clean up listener on unmount
  }, []);

  useEffect(()=>{
    if(isLoggedIn) {
        const info = getUserInfo();
        dispatch(setUserDetails(info));
    } else {
        dispatch(setUserDetails({}));
    }
  }, [isLoggedIn]);

    return children;
};

export default AuthProvider;