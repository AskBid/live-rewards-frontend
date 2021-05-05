import React, { useState, useRef, useEffect, useMemo } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({
		suggestions, 
		text, 
		handleTextChange,
		selectSuggestion,
    onClickOption,
    placeholderOption
	}) => {

	const [isVisible, setVisiblity] = useState(false);
	const [cursor, setCursor] = useState(-1);
	const [scroll, setScroll] = useState(0);

	const searchContainer = useRef(null);
	const searchResultRef = useRef(null);
	const searchResultDivRef = useRef(null);

	useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  // !isVisible && showSuggestion()
  // }, [text])

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
    // const isHighlighted = false
    return (
    	<div className={`autocomplete-div d-block-flex border shadow-sm rounded pl-1 pt-2 ${isVisible ? null : 'invisible'}`}
    		ref={searchResultDivRef} style={{minWidth:'200px'}}
    	>
        <ul ref={searchResultRef}>
        	{(suggestions.length > 0) ?
        	suggestions.map( (ticker, idx) => (
	          <AutoCompleteItem 
	          	key={idx}
	            // onSelectItem={hideSuggestion}
	            selectSuggestion={onClickOption || selectSuggestion}
	            isHighlighted={cursor === idx ? true : false}
	            ticker={ticker}
	            text={text}
	          />))
        		: <li className='text-muted pl-2 pr-3'>No matches found...</li>
        	}
        </ul>
      </div>
    )
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
      isVisible
	      ? setCursor(c => (c < suggestions.length - 1 ? c + 1 : 0))
	      : showSuggestion();
    }

    if (e.key === "ArrowUp") {
      setCursor(c => (c > 0 ? c - 1 : suggestions.length - 1));
      showSuggestion();
    }

    if (e.key === "Escape") {
      hideSuggestion();
    }

    if (e.key === "Enter") {
      (cursor > 0) && selectSuggestion(suggestions[cursor]);
      hideSuggestion();
      setCursor(-1);
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

    	let listItems = Array.from(searchResultRef.current.children);
   		if (listItems[cursor]) {
   			const height = searchResultDivRef.current.offsetHeight
   			const location = listItems[cursor].offsetTop
   			if (((location - scroll) > (height-10)) || ((location - scroll) < 0)) {
   				setScroll(location)
   				scrollIntoView(location)
   			}
   		}
  }, [cursor]);

	return (
		<fieldset className='flex-grow-1' ref={searchContainer}>
	    <input
	      value={text}
	      type="text"
	      name="pool"
	      placeholder={placeholderOption || "TICKR or pool1cuxntl7p...     (If empty, will pick a random Pool)"}
	      className='h-100 w-100 p-2 border border-primary rounded shadow-sm'
	      onChange={handleTextChange}
	      onClick={showSuggestion}
	      onKeyDown={keyboardNavigation}
	      autocomplete="off">
	    </input>
	    <div className='position-absolute pr-2' style={{'z-index':'99'}} onClick={() => hideSuggestion()}>
	    	{renderSuggestions()}
        {addressChecksMessage()}
      </div>
	  </fieldset>
  )
};

export default AutoComplete;		


