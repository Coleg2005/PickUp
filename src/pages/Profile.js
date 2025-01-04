import '../App.css';
// import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  // const { user, isAuthenticated } = useAuth0();
  return (
    <div className='profile'>
      <div className='profile-page'>
        <h1 className='profile-username'>
          Fill in with username
        </h1>
        <div className='profile-page-pic'>
          <img src="/assets/default-pfp.jpg" alt="Profile" className="profile-pic" />
        </div>
        <div className='profile-page-description'>
          <p>Description Here</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;