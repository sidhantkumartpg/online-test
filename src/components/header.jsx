import React from "react";
import { useHistory } from "react-router-dom";
import { cleanSession } from "../utils/sessionManag";
import PropTypes from "prop-types";
import { memo } from "react";

const Header = ({ isRegistered }) => {
  const history = useHistory();

  console.log("Header Rendered");

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
        {isRegistered && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
            <i className="fas fa-sign-out-alt"></i>
          </button>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
