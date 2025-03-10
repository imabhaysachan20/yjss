import { ActivitySquare, HelpingHand, Icon, NotebookPen, Pointer } from "lucide-react";

import React from "react";

const Banner_below_options = () => {
  const options = [
    {
      name:"ऑनलाइन सदास्यता",
      icon:<Pointer/>,
      link:"/"
    },
    {
      name:"संकल्प पत्र",
      icon:<NotebookPen/>,
      link:"/"
    },
    {
      name:"सहयोग करें",
      icon:<HelpingHand/>,
      link:"/"
    },
    {
      name:"सक्रिय सदस्य",
      icon:<ActivitySquare/>,
      link:"/"
    },
  ]




  return (
    <div className="flex bg-white relative -top-[25px] rounded justify-between w-[80%] m-auto text-2xl font-bold h-[200px] items-center shadow-2xl">
      {options.map((option)=>{
        return (<div key={option.name} className="h-full flex flex-col justify-center grow-1 items-center transition-all duration-700 hover:scale-[1.03] hover:bg-gray-100 gap-y-5 hover:gap-y-3">
          {option.icon}
          {option.name}
          </div>)
      })}
    </div>
  );
};

export default Banner_below_options;
