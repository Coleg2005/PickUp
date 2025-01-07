import '../App.css';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  const handleDescChange = () => {
  }

  const { user, isLoading, isAuthenticated } = useAuth0();

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
          <div className='profile-page-description'>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=edit" />
          <span class="edit-icon material-symbols-outlined" onClick={handleDescChange}>edit</span>
          <textarea type='text' className='profile-page-text' placeholder='Description'></textarea>
        </div>
      </div>

    </div>
  );
};

export default Profile;