import React, { useState, useRef, useEffect, useMemo } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({ 
		suggestions, 
		text, 
		handleTextChange 
	}) => {

	const [isVisbile, setVisiblity] = useState(false);

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
    if ( suggestions.length === 0 ) {
      return addressChecksMessage();
    } 
    return (
    	<div className='position-absolute'>
      <div className={`d-block-flex autocomplete border rounded pl-3 pt-2 ${isVisbile ? null : 'invisible'}`}>
        <ul>
          {suggestions && suggestions.map(item => {
            return <li className={`decoration-none ${isHighlighted}`} onClick={() => this.selectSuggestion(item)}>
              <b>{item.slice(0,text.length)}</b>{item.slice(text.length)}
            </li>
          })}
        </ul>
      </div>
        {addressChecksMessage()}
      </div>
    )
  }

  const addressChecksMessage = () => {
    const ticker = text
    const chars = ticker.length
    if ((chars > 5 || (chars > 0 && chars < 3)) && !(ticker.includes("pool1") && chars.length === 56)) {
      return <div className='alert alert-info mt-1 messages'>
        {`Pool TICKER must have between 3 and 5 characters.`}<br/>
        {`Pool addresses should start with 'pool1' and be 56 characters long. (${chars}/56)`}
      </div>
    }
  }

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
	      autocomplete="off">
	    </input>
	    {renderSuggestions()}
	  </fieldset>
  )
};

export default AutoComplete;


