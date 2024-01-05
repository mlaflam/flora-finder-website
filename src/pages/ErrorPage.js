import React from 'react'
import '../style.css';
import Navbar from '../components/Navbar';
import ErrorFooter from '../components/ErrorFooter';
import { Link } from "react-router-dom";

import ErrorIcon from '../icons/error-icon-1.png';


const ErrorPage = () => {
  return (

      <div>
        <div className="block-main">
        <Navbar />

        <div className="block">

          <div id="error-main-container">
            <div className="error-container">
              <img className="explore-icon" src={ErrorIcon} alt="Plant Preview" />
              <div className="explore-title">Error 404</div>
            </div>

            <div className="error-info-first">
              Oops! Page not found.
            </div>
            <div className="error-info-second">
              The page you are looking for might have been
              removed  <br /> had its name changed or is temporarily unavailable.
            </div>

            <div className='link-container'>
              <Link to='/' className='link-back-1'> Back to main</Link>

              <Link to='/' className='link-back-2'> Contact Us</Link>
            </div>



          </div>

        </div>

        <ErrorFooter />

        </div>

      </div>

    );
  }

export default ErrorPage