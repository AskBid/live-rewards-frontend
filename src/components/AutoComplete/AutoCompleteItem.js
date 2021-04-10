import React from "react";
import { Li } from './AutoCompleteElements.js'

const AutoCompleteItem = ({isHighlighted, ticker, text, selectSuggestion}) => {
	return (
		<Li 
			className={`${isHighlighted ? 'bg-primary' : null} pt-1 pb-1 pl-2`}
			onClick={() => selectSuggestion(ticker)}
		>
			<b>{ticker.slice(0,text.length)}</b>{ticker.slice(text.length)}
		</Li>
  );
};

export default AutoCompleteItem;