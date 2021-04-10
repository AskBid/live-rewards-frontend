import React, { useState, useRef, useEffect, useMemo } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({ 
		suggestions, 
		text, 
		handleTextChange,
		selectSuggestion
	}) => {

	const [isVisbile, setVisiblity] = useState(false);
	const [cursor, setCursor] = useState(-1);

	const searchContainer = useRef(null);
	const searchResultRef = useRef(null);

	useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (
      searchContainer.current &&
      !searchContainer.current.contains(event.target)
    ) {
      hideSuggestion();
    }
  };

  const hideSuggestion = () => setVisiblity(false);
  const showSuggestion = () => setVisiblity(true);

	const renderSuggestions = () => {
    const isHighlighted = false
    if ( suggestions.length > 0 ) {
      return (
      	<div className={`w-100 d-block-flex autocomplete border shadow-sm rounded pl-1 pt-2 ${isVisbile ? null : 'invisible'}`}>
	        <ul ref={searchResultRef}>
	        	{suggestions.map( (ticker, idx) => (
		          <AutoCompleteItem 
		          	key={idx}
		            // onSelectItem={hideSuggestion}
		            selectSuggestion={selectSuggestion}
		            isHighlighted={cursor === idx ? true : false}
		            ticker={ticker}
		            text={text}
		          />))
	        	}
	        </ul>
	      </div>
	    )
    } 
  }

  const addressChecksMessage = () => {
    const ticker = text
    const chars = ticker.length
    if ((chars > 5 || (chars > 0 && chars < 3)) && !(ticker.includes("pool1") && chars.length === 56)) {
      return (
      	<div className='alert alert-info mt-1 messages'>
	        {`Pool TICKER must have between 3 and 5 characters.`}<br/>
	        {`Pool addresses should start with 'pool1' and be 56 characters long. (${chars}/56)`}
	      </div>
	    )
    }
  }

  const keyboardNavigation = e => {
    if (e.key === "ArrowDown") {
      isVisbile
	      ? setCursor(c => (c < suggestions.length - 1 ? c + 1 : 0))
	      : showSuggestion();
    }

    if (e.key === "ArrowUp") {
      setCursor(c => (c > 0 ? c - 1 : suggestions.length - 1));
    }

    if (e.key === "Escape") {
      hideSuggestion();
    }

    if (e.key === "Enter" && cursor > 0) {
      selectSuggestion(suggestions[cursor])
    }
  };

  const scrollIntoView = position => {
    searchResultRef.current.parentNode.scrollTo({
        top: position,
        behavior: "smooth"
    });
  };

  useEffect(() => {
      if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
          return () => {};
      }
      debugger
      if (cursor > 10) {
      	let listItems = Array.from(searchResultRef.current.children);
     		listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
      }
  }, [cursor]);

	return (
		<fieldset className='col w-100 p-0 pl-2 pr-2' ref={searchContainer}>
	    <input
	      value={text}
	      type="text"
	      name="pool"
	      placeholder="TICKR or pool1cuxntl7p... (If empty, will pick a random Pool)"
	      className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded '
	      onChange={handleTextChange}
	      onClick={showSuggestion}
	      onKeyDown={keyboardNavigation}
	      autocomplete="off">
	    </input>
	    <div className='position-absolute w-100'>
	    	{renderSuggestions()}
        {addressChecksMessage()}
      </div>
	  </fieldset>
  )
};

export default AutoComplete;		


