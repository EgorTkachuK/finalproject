import React from "react";
import "./header.css";
import { IconLogout } from "../icons/logout";
import { useAuth } from "../../contexts/AuthContext";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const email = user?.email || ""
  const firstLetter = email?.[0]?.toUpperCase() || "U"
  console.log( firstLetter)

  return (
    <header className="header">
      <div className="headerCover">
        <div className="left">
          <div className="headerLogo">
            <div className="yellowBubble"></div>
            <div className="redBubble"></div>
            <p className="logoTitle">InvestIQ</p>
          </div>
        </div>
        <div className="right">
          <div className="userHeader">
            <div className="userIcon">
              <p className="userFirstLetter">{firstLetter}</p>
            </div>
          </div>
          <div className="logOut">
            <button className="logOutButton" onClick={() => signOut()}>
              <IconLogout />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
