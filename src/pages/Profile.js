import '../App.css';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  const { user, isLoading, isAuthenticated } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("This is the profile description.");
  const [previousDescription, setPreviousDescription] = useState(description);

  const handleEdit = () => {
    setPreviousDescription(description);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you could add an API call to save the description
  };

  const handleCancel = () => {
    setDescription(previousDescription);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <div>Please login to view your profile</div>;
  }

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
          <div className="relative">
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
          
          <div className="profile-description-buttons">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} className="profile-description-cancel" aria-label="Cancel editing">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="profile-description-save"
                  aria-label="Save description"
                >
                  <CheckIcon size={16} />
                  Save
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                className="profile-description-edit"
                aria-label="Edit description"
              >
                <EditIcon size={16} />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;