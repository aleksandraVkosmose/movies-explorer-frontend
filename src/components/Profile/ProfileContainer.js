import React from 'react';
import { useNavigate } from "react-router-dom";
import Profile from './Profile';

function ProfileContainer({setIsLoggedIn, isLoggedIn, currentUser, onEdit, editSuccess, profileError}) {
    const navigate = useNavigate();
    const handleOnLogout = (async () => {
      setIsLoggedIn(false);
      navigate("/signin");
      localStorage.clear()
    });

    return (
        <Profile
            onLogout={handleOnLogout}
            onEdit={onEdit}
            editSuccess={editSuccess}
            profileError={profileError}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
        />
    );
}

  export default ProfileContainer;