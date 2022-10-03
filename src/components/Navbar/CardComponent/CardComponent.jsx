import React from "react";
import logo from "../../../logo192.png";
import "./styles.css";

export const CardComponent = ({ newItem }) => {
  return (
    <li className="card">
      <div>
        <h1>{newItem.title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta alias
          nemo culpa consequuntur quia tempore dolorem maiores rerum quaerat sed
          dolorum delectus sit tempora, ipsam, beatae, repellendus vel magni
          odit!
        </p>
        <div>
          <p>{newItem.pubDate}</p>
        </div>
      </div>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </li>
  );
};
