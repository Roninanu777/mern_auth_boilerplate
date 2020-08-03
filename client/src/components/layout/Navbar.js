import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div style={{marginTop: '2rem'}} className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: 'Arial',
                fontWeight: 'bold'
              }}
              className="col s5 brand-logo center black-text"
            >
              <i style={{fontSize: '3rem', color: '#db09a0'}} className="material-icons">code</i>
              <span style={{color: '#424242'}}>MERN_AUTH</span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
