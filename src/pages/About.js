import '../App.css';

const About = () => {
  return (
    <div class='about'>
      <div className='about-header'>
        <h1>Welcome to PickUp!</h1>
      </div>
      <div className='about-description'>
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

export default About;