import React from "react";
import { Button } from "@material-ui/core";

import InputWithLabel from "./InputWithLabel";

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
  onPrev,
  onNext,
  urls,
}) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <Button
        variant="outlined"
        color="primary"
        type="submit"
        disabled={!searchTerm}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        type="button"
        disabled={!urls}
        onClick={onPrev}
      >
        Prev
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        type="button"
        disabled={!urls}
        onClick={onNext}
      >
        Next
      </Button>
    </form>
  );
};

export default SearchForm;
