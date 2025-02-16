import '../App.css';
import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Button, Snackbar, Alert } from '@mui/material';
import { updateProfile } from '../api.js';
// import { useAuth } from '../AuthContext.js';

const Profile = () => {

  const [user] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("Description not set");
  const [previousDescription, setPreviousDescription] = useState(description);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {

    let isMounted = false;
    if (user && user.user_metadata && isMounted) {
      setDescription(user.user_metadata.description || "Description not set");
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleEdit = () => {
    setPreviousDescription(description);
    setIsEditing(true);
  };

  const handleSave = async () => {

    setIsSaving(true);
    setError(null);

    try {

      const response = updateProfile(description);
      setIsEditing(false);
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
          {user.name}
        </h1>
        <div className='profile-page-pic'>
          <img src={user.picture || "/assets/default-pfp.jpg"} alt="Profile" className="profile-page-pic" />
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
                {description || "No description provided"}
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
                  <Button onClick={handleCancel} className="profile-description-cancel" aria-label="Cancel editing" disabeed={isSaving}>
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