import React from 'react';
import './App.css';

//custom react hook

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState 
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]); 

  return [value, setValue]
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );


  const handleSearch = event => {
    setSearchTerm(event.target.value);

    // localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => (
  <>
    <label  key= '1' htmlFor="search">Search: </label>
    <input
      key = '2'
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </>
);

const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);


// Destructured below
// -------------------------------------------------------
// const App = () => {
//   const stories = [
//     {
//       title: 'React',
//       url: 'https://reactjs.org/',
//       author: 'Jordan Walke',
//       num_comments: 3,
//       points: 4,
//       objectID: 0,
//     },
//     {
//       title: 'Redux',
//       url: 'https://redux.js.org/',
//       author: 'Dan Abramov, Andrew Clark',
//       num_comments: 2,
//       points: 5,
//       objectID: 1,
//     },
//   ];

//   const [searchTerm, setSearchTerm] = React.useState('React');

  
  
//   const handleSearch = event => {
//     setSearchTerm(event.target.value);
//   };
  
//   const searchedStories = stories.filter(story =>
//     story.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
    
//     return (
//       <div>
//       <h1>My Hacker Stories</h1>

//       <Search search={searchTerm} onSearch={handleSearch} />

//       <hr />

//       <List list={searchedStories} />
//     </div>
//   );
// };


// const Search = ({ search, onSearch }) => (

//   <div>
//     <label htmlFor="search">Search: </label>
//     <input 
//       id="search" 
//       type="text" 
//       onChange={onSearch} 
//       value={search}
//     />
//   </div>
// );
 



// const List = ({ list }) =>
//   list.map(({ objectID, ...item }) => <Item key={item.objectID} {...item} />);

 
//   const Item = ({ title, url, author, num_comments, points }) => (
//     <div >
//       <span>
//         <a href={url}>{title}</a>
//       </span>
//       <span>{author}</span>
//       <span>{num_comments}</span>
//       <span>{points}</span>
//     </div>

//   );
  
  
  
  export default App;
  