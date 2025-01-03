import '../App.css';

const Friends = () => {

  return (
    <div>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search" />
      </head>
      <div class='search'>
        <span class="search-icon material-symbols-outlined">search</span>        
        <input class='search-input' type='search' placeholder='Search'></input>
      </div>
    </div>
  );
};

export default Friends;