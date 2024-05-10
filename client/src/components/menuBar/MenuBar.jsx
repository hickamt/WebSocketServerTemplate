/* eslint-disable react/prop-types */
import { IoSettingsOutline } from "react-icons/io5";
import CircleLoadAnimation from "../loadAnimation/CircleLoadAnimation";
import "./styles.css";

function MenuBar({ isLoading }) {
  return (
    <div className="menu-bar">
      { !isLoading && <CircleLoadAnimation /> }
      <h1>Websocket Server Template</h1>
      <IoSettingsOutline size={20} />
    </div>
  );
}

export default MenuBar;
