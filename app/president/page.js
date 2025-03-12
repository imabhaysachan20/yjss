import { Feather } from "lucide-react";
import React from "react";

const PresidentQuote = () => {
  return (
    <>
    <div className="flex items-center flex-col">
    <h1 className="text-4xl font-bold pt-10 pb-8"><Feather></Feather> हमारी विचारधार</h1>
    <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
    </div>
    <div className="flex items-center justify-center pb-24">
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-lg max-w-3xl relative">
        {/* Image Section */}
        <div className="w-1/2 md:w-1/2 relative">
          <img
            src="president.png" // Replace with actual image path
            alt="President"
            className="w-full h-auto object-cover opacity-80"
          />
          <div className="bg-[rgba(255,255,255,0.8)] p-2 rounded-2xl shadow-2xs absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 flex items-center justify-center flex-col">
          <p className="text-gray-800 font-bold text-lg">
            मानस तिवारी
          </p>
          <p>
          संगठन अध्यक्ष 
          </p>
          </div>
          
        </div>
        
        {/* Text Section */}
        <div className="ml-4 w-full text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
          अध्यक्ष का संदेश
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
          युवा जनता संघर्ष समिति सामाजिक दल है यह भारतीय राज्य उत्तर प्रदेश में सक्रिय है युवा जनता संघर्ष समिति के संस्थापक मानस तिवारी है । 
          </p>
          <div className="text-gray-600 mt-10 italic leading-relaxed relative text-justify">
          <span className="absolute -top-15 -left-0 text-[6rem] text-gray-300 font-serif -translate-x-3 -translate-y-4 select-none">
          “
        </span>
          युवा रत्न आज देश और दुनिया में सबसे ज्यादा सम्मान हमारे युवा पीढ़ी को मिल रहा है इन युवाओ का बोलबाला आज भी कई जगह देखने को मिलता है अगर हम कहे की ये वही युवा वर्ग है जो हमारे भारत देश का भूत, वर्तमान ,भविष्य तय करते है यही सच है युवाओ में सहनशीलता की कमी नहीं होती ये ऊर्जावान होते है और सच का साथ कभी नहीं छोड़ते है ... युवाशक्ति हर वो काम करने की इच्छुक होती है जिसमे संघर्ष हो | हमेसा अपने आप को आगे रखना यही होता है युवाओ का जोश और जीवन मकसद | हर क्षेत्र में अपनी जीत का परचम लहराते दिख रहे है आज के युवा | युवा देश की रीढ़ होते है | किसी भी देश के सामर्थ्य और ऊर्जा का पता वहा के युवा जनसँख्या के आधार पे पता किया जा सकता है हमारे देश की शक्ति का करण यही है की हमारे देश में सर्वाधिक युवा शक्ति मजबूत है बात करते है दिल्ली की घटना गैंग रेप के विरोध की हमारे हिंदुस्तान के नवजवानो ने प्रदर्शन कर जो विरोध का स्वर उठाया था वह काबिले तारीफ है युवाओ के प्रदर्शन ने साबित किया उनसे लड़ना आसान नहीं है | यह कहना उचित होगा की देश, का भविष्य हमारे युवा शक्ति के पास है…
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default PresidentQuote;