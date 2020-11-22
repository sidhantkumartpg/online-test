import React from "react";
import { useHistory } from "react-router-dom";
import { cleanSession, isRegistered } from "../utils/sessionManag";

const Header = () => {
  const history = useHistory();

  function handleLogout() {
    cleanSession();
    history.replace("/register");
  }
  return (
    <header>
      <div className="container">
        <h3>
          Online test <i className="fas fa-clipboard-list"></i>{" "}
        </h3>
        {isRegistered() && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
