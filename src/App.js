import logo from './logo.svg';
import './App.css';

// const title = "React"

// const welcome = {
//   greeting: 'Hey',
//   title: 'React',
// };

function getTitle(title) {
  return title;
}
//Practice more complex JavaScript data types

function getNumbers(array) {
  return array

}

function App() {


  return (
    <div>
      <h1>
        Hello {getTitle('React')}
        {/* {welcome.greeting} {welcome.title} */}
        {/* everything in curly braces in JSX can be used for JavaScript expressions (function execution) */}
     </h1>

     <h2>
       Lucky Numbers: {getNumbers([14, 21, 9, 19, 0])}
     </h2>

      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
