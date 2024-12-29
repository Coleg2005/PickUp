import '../App.css';

const Parks = () => {
  return (
    <div className='parks'>
      <div class="dropdown">
        <button class="dropdown-btn">Select a Sport to View Parks</button>
        <div class="dropdown-content">
          <a href="/parks">Basketball</a>
          <a href="/parks">Pickelball</a>
          <a href="/parks">Soccer</a>
          <a href="/parks">Tennis</a>
        </div>
      </div>
    </div>
  );
}

export default Parks;