// import { promised } from 'q';
import React from 'react';
import './App.css';

const initialStories = [
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

const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return state.filter(
        story => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    // setIsLoading(true);

    getAsyncStories()
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.stories,
        });
        setIsLoading(false);
      })
      .catch(() => 
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
      );
  }, []);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
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
  