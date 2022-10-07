//Type racfe to get boilerplate code
// Change Babel JAvascript to Javascript React in bottom bar
import React from 'react';
import { Helmet } from 'react-helmet';

//var x = {'float': 'right'} is the nicer/shorter form of var x = new Object(); x.float = 'right';
// Inside braces in React we could have an Object , function , variable
// Here {title} is a prop passed to MetaData from Home Page Home.js and from any other page jetc

//In the below program, we have embedded the Javascript expression const name = "Beginner";
// into the JSX code using curly braces.
//const name = "Beginner";
//const element = <h1>Hello, { name }.Welcome to Tutorialspoint.</h1>;

// if we were to embed an object then we would use
//const element = <h1>Hello, { {obj} }.Welcome to Tutorialspoint.</h1>;

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{` ${title} - ShopIT`}</title>
    </Helmet>
  );
};

export default MetaData;
