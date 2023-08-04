import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import Profile from './Profile'; 
import { editUser } from '../../utils/MainApi';

function ProfileContainer(props) {
  console.log(props)  
  const [editSuccess, setEditSuccess] = useState(false);
    const [profileError, setProfileError] = useState("");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
  
    const handleOnEditProfile = (async ({ email, name }) => {
      try {
        setEditSuccess(false); // Reset editSuccess to false at the start of the editing process
        setProfileError(""); // Clear any previous errors before attempting to edit
        const user = await editUser(name, email);
        setCurrentUser(user);
        props.setIsLoggedIn(true);
        setEditSuccess(true); // Set editSuccess to true upon successful editing
        navigate("/profile");
      } catch (error) {
        console.error(error);
  
        if (error.response && error.response.status === 409) {
          setProfileError("Пользователь с таким email уже существует");
        } else {
          setProfileError("При обновлении профиля произошла ошибка");
        }
      }
    });
  
    // Other functions, such as handleOnLogout, loadLiked, handleOnLikeClick, handleOnUnLikeClick, etc.
  
    const handleOnLogout = (async () => {
      props.setIsLoggedIn(false);
      navigate("/signin");
      localStorage.removeItem("jwt");
    });
  
    // Other useEffect and relevant code
  
    return (
      <Profile
      onLogout={handleOnLogout}
        onEdit={handleOnEditProfile}
        editSuccess={editSuccess}
        profileError={profileError}
        isLoggedIn={props.isLoggedIn}
        currentUser={currentUser}
      />
    );
  }
  
  export default ProfileContainer;