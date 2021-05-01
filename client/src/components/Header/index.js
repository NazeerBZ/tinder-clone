import React from "react";
import "./style.css";
import PersonIcon from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import ForumIcon from "@material-ui/icons/Forum";
import { TinderIcon } from "../../assets";

function Header() {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon fontSize="large" />
      </IconButton>

      <img className="header_logo" src={TinderIcon} />

      <IconButton>
        <ForumIcon fontSize="large" className="header_icon" />
      </IconButton>
    </div>
  );
}

export default Header;
