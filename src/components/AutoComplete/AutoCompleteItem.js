import React from "react";

const AutoCompleteItem = ({isHighlighted, ticker, text}) => {
	return (
		<li><b>{ticker.slice(0,text.length)}</b>{ticker.slice(text.length)}</li>
  );
};

export default AutoCompleteItem;