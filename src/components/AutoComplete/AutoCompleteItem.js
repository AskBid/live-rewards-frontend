import React from "react";
import { Li } from './AutoCompleteElements.js'

const AutoCompleteItem = ({isHighlighted, ticker, text, selectSuggestion}) => {
	return (
		<Li 
			className='pt-1 pb-1 pl-2'
			style={isHighlighted ? {background:`rgba(74, 217, 228,0.5)`} : {}}
			onClick={() => selectSuggestion(ticker)}
		>
			<b>{ticker.slice(0,text.length)}</b>{ticker.slice(text.length)}
		</Li>
  );
};

export default AutoCompleteItem;