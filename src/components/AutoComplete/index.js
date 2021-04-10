import React, { useState, useRef, useEffect, useMemo } from "react";
import AutoCompleteItem from "./AutoCompleteItem";

const AutoComplete = ({ 
		suggestions, 
		text, 
		handleTextChange 
	}) => {

	const renderSuggestions = () => {
    const isHighlighted = false
    if ( suggestions.length === 0 ) {
      return null;
    } 
    return (
      <div className='d-block-flex position-absolute autocomplete border rounded pl-3 pt-2'>
        <ul>
          {suggestions && suggestions.map(item => {
            return <li className={`decoration-none ${isHighlighted}`} onClick={() => this.selectSuggestion(item)}>
              <b>{item.slice(0,text.length)}</b>{item.slice(text.length)}
            </li>
          })}
        </ul>
      </div>
    )
  }

	return (
		<fieldset className='col w-100 d-inline-flex p-0 pl-2'>
	    <input
	      value={text}
	      type="text"
	      name="pool"
	      placeholder="TICKR or pool1cuxntl7p... (If empty, will pick a random Pool)"
	      className='w-100 border border-primary shadow-sm ml-1 mr-1 mt-auto mb-auto p-2 rounded '
	      onChange={handleTextChange}
	      autocomplete="off">
	    </input>
	    {renderSuggestions()}
	  </fieldset>
  )
};

export default AutoComplete;