import React from "react";

type Props = {
  quote: any; // later we can create a TypeScript type for your full schema
  company: any;
};

const QuoteTemplate: React.FC<Props> = ({ quote, company }) => {
  return <div>{quote}{company}</div>;
};

export default QuoteTemplate;
