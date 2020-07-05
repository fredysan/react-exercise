import React from "react";
import axios from "axios";
import { orderBy } from "lodash";

import SearchForm from "./SearchForm";
import List from "./List";

import { Container } from "@material-ui/core";

import "./App.css";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  // States
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
  const [urls, setUrls] = React.useState([`${API_ENDPOINT}${searchTerm}`]);
  const [sort, setSort] = React.useState({ by: "title", order: "asc" });

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // Actions
  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(urls[0]);
      const orderedData = orderBy(result.data.hits, sort.by, sort.order);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: orderedData,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls, sort]);

  const extractSearchTerm = (url) => url.replace(API_ENDPOINT, "");

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    setUrls([`${API_ENDPOINT}${searchTerm}`, ...urls.slice(0, 4)]);

    event.preventDefault();
  };

  const handlePrev = (event) => {
    const first = urls.shift();
    setUrls([...urls, first]);
    console.log([...urls, first]);

    setSearchTerm(extractSearchTerm(first));

    event.preventDefault();
  };

  const handleNext = (event) => {
    const last = urls.pop();
    console.log([last, ...urls]);

    setUrls([last, ...urls]);

    setSearchTerm(extractSearchTerm(last));

    event.preventDefault();
  };

  // Effects
  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  return (
    <Container maxWidth="lg">
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        urls={urls}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        </>
      )}
    </Container>
  );
};

export default App;
