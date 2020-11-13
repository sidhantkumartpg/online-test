import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return ( 
        <header>
            <div className="container">
                <h3>Online test</h3>
                <ul>
                    <li><Link to="/take-test">Take test</Link></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Logout</a></li>
                </ul>
            </div>
        </header>
     );
}
 
export default Header;