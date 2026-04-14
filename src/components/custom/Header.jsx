import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex items-center px-6 py-4 border-b border-b-slate-200 justify-between">
      <img
        src="/logoipsum-264.png"
        alt="Logoipsum"
        style={{ height: "36px", width: "auto" }}
      />
      <div>
        <Button className="px-6 py-5 ">Sign In</Button>
      </div>
    </div>
  );
};

export default Header;
