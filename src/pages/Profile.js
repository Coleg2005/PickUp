import '../App.css';

const Profile = () => {
  return (
    <div className='profile'>

      <div className='sidebar'>
        <a href='settings'>Settings</a>
        <a href='statistics'>Statistics</a>
        <a href='sign-out'>Sign Out</a>
      </div>

      <div class='profile-page'>
        <h1 class='profile-username'>
          Fill in with username
        </h1>
        <div class='profile-page-pic'>
          <img height='100' width='100' src="/assets/default-pfp.jpg" alt="Profile" className="profile-pic" />
        </div>
        <div class='profile-page-description'>
          <p>Description Here</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;