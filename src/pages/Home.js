import '../App.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='home-header'>
        <h1>Welcome to PickUp!</h1>
      </div>
      <div className='home-description'>
        <p>
          Find a park near you to play sports with friends!
          <br></br>
          Click Parks to view local parks, 
          Friends to find your team, 
          and Profile to set up your profile.
          <br></br>
          Each group is responsible for their own equipment, 
          Checking Field/Court availability, 
          and following all park rules.
        </p>
      </div>
    </div>
  );
};

export default Home;