import '../App.css';
import React, { useState, /*useEffect*/ } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Snackbar, Alert } from '@mui/material';
import { updateProfile } from '../api.js';
// import { useAuth } from '../AuthContext.js';

const Profile = () => {

  // const [user] = useState();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(user.user.profile.description);
  const [previousDescription, setPreviousDescription] = useState(description);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  

  // useEffect(() => {

  //   let isMounted = false;
  //   if (user && user.user && isMounted) {
  //     setDescription(user.user.profile.description || "Description not set");
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [user]);

  const handleEdit = () => {
    setPreviousDescription(description);
    setIsEditing(true);
  };

  const handleSave = async () => {

    setIsSaving(true);
    setError(null);

    try {
      const response = updateProfile(description, 1, user.user.username);
      user.user.profile.description = description;
      sessionStorage.setItem('user', JSON.stringify(user));
      setIsEditing(false);
      setDescription(description)
      return response;
    } catch (error) {
      console.error('Error updating description', error);
      setError(error.message || 'Failed to update description')
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setDescription(previousDescription);
    setIsEditing(false);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className='profile'>
      <div className='profile-page'>
        <h1 className='profile-username'>
          {user.user.username}
        </h1>
        <div className='profile-page-pic'>
          <img src={user.user && user.user.picture ? user.user.picture : "/assets/default-pfp.jpg"} alt="Profile" className="profile-page-pic" />
        </div>
        <div className="profile-page-description">
          <div className="profile-description-text-whole">
            {isEditing ? (
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="profile-description-textarea" 
                autoFocus 
                aria-label="Edit profile description"
              />
            ) : (
              <div className="profile-description-text">
                {user.user.description || description || "No description provided"}
              </div>
            )}
          </div>
          <div className="profile-description-buttons-container">
            <div className="profile-description-buttons">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="profile-description-save"
                    aria-label="Save description"
                  >
                    <CheckIcon fontSize='small' />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button onClick={handleCancel} className="profile-description-cancel" aria-label="Cancel editing" disabled={isSaving}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEdit}
                  className="profile-description-edit"
                  aria-label="Edit description"
                >
                  <EditIcon fontSize='small' />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert serverity='error' onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;