import logo from './logo.svg';
import './App.css';

// const title = "React"

// const welcome = {
//   greeting: 'Hey',
//   title: 'React',
// };

// function getTitle(title) {
//   return title;
// }
// //Practice more complex JavaScript data types

// function getNumbers(array) {
//   return array

// }

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const App = () => {
  
  
  return (
    <div>
      <h1>
        My Hacker Stories
        {/* Hello {getTitle('React')} */}
        {/* {welcome.greeting} {welcome.title} */}
        {/* everything in curly braces in JSX can be used for JavaScript expressions (function execution) */}
     </h1>


      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" />


      <hr/>
      {/* render list here */}
      <List />

    </div>
  );
}

// rendering component list 
const List = () => {
  return (
    <ul>
      {list.map(function(item) {
        return <div key={item.objectID}> 
                <span>
                  <a href={item.url}> {item.title} </a>
                </span>
      
                <span> {item.author} </span>
                <span> {item.num_comments} </span>
                <span> {item.points} </span>
                    
              </div>
      })}

    </ul>
  )
}
  
  
  
  export default App;
  