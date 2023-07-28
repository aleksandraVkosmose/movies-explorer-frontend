import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import Profile from './Profile'; // Import the Profile component
import mainApi from '../../utils/MainApi'; // Import the API module (if applicable)

function ProfileContainer() {
    const [editSuccess, setEditSuccess] = useState(false);
    const [profileError, setProfileError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();
  
    const handleOnEditProfile = useCallback(async ({ email, name }) => {
      try {
        setEditSuccess(false); // Reset editSuccess to false at the start of the editing process
        setProfileError(""); // Clear any previous errors before attempting to edit
        const user = await mainApi.editUser(name, email);
        setCurrentUser(user);
        setIsLoggedIn(true);
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
    }, [navigate]);
  
    // Other functions, such as handleOnLogout, loadLiked, handleOnLikeClick, handleOnUnLikeClick, etc.
  
    const handleOnLogout = useCallback(async () => {
      setIsLoggedIn(false);
      navigate("/signin");
      localStorage.removeItem("jwt");
    }, [navigate]);
  
    // Other useEffect and relevant code
  
    return (
      <Profile
      onLogout={handleOnLogout}
        onEdit={handleOnEditProfile}
        editSuccess={editSuccess}
        profileError={profileError}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    );
  }
  
  export default ProfileContainer;