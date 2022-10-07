// Type rafce to get boilerplate code
// got by installing extension ES7+React+Redux...

import React, { Fragment } from 'react';
import '../../App.css';

//A common pattern in React is for a component to return multiple elements. Fragments let you group
//a list of children without adding extra nodes to the DOM.
//Now the point is that in javascript the return statement can only return one entity, So when we have
// to return the multiple elements from return statements we usually create the extra node.
// This extra node has some disadvantages hence to avoid them we use the React Fragment.
// eg.
// function App() {
//     return (<React.Fragment>
//       <h1>Hello, There</h1>
//       <h2>This is the another element.</h2>
//     </React.Fragment>);
//   }
// So while grouping multiple elements it does not create extra node in DOM
//ReactJS Fragments were introduced with React 16.2 version to remove the need to define an extra
// <div> tag which also takes extra memory.

// without Fragments
// className App extends React.Component {
//     render() {
//        return (
//           <div>
//              <h2>TutorialsPoint</h2>
//              <p>Simply Easy Learning</p>
//           </div>
//        );
//     }
//  }
// export default App;

// With fragments
// className App extends React.Component {
//     render() {
//        return (
//           <React.Fragment>
//              <h2>TutorialsPoint</h2>
//              <p>Simply Easy Learning</p>
//           </React.Fragment>
//        );
//     }
//  }
//  export default App;

// so the extra div is eliminated which consumes lot of memory
// Fragments are like an empty tags and they dont appear in your HTML
// They are wrapper for grouping multiple elements
const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/shopit_logo.png" alt="Hello" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
