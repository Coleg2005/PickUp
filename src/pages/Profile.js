import '../App.css';

const Profile = () => {
  return (
    <div className='profile'>

      <div className='sidebar'>
        <a href='settings'>Settings</a>
        <a href='statistics'>Statistics</a>
        <a href='sign-out'>Sign Out</a>
      </div>

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