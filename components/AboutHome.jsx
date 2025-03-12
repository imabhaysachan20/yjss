import { ArrowRightCircle, Home } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="flex relative  rounded flex-col md:flex-row items-center justify-center min-h-screen py-36">
       
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="/png.png" 
          alt="About Us" 
          className="w-full max-w-md"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 p-8 relative bg-white shadow-lg rounded-xl">
        {/* Decorative Quotation Mark (Top-Left) */}
        <span className="absolute -top-2 -left-0 text-[6rem] text-gray-300 font-serif -translate-x-3 -translate-y-4 select-none">
          “
        </span>
        <h1 className="text-gray-700 text-lg mb-1">संगठन के बारे में</h1>
        <h2 className="text-5xl font-bold text-gray-800 mb-4">युवा जनता संघर्ष संगठन </h2>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10"></div>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
        युवा जनता संघर्ष संगठन सामाजिक दल है यह भारतीय राज्य उत्तर प्रदेश में सक्रिय है युवा जनता संघर्ष संगठन के संस्थापक मानस तिवारी है । 
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
        युवा रत्न आज देश और दुनिया में सबसे ज्यादा सम्मान हमारे युवा पीढ़ी को मिल रहा है इन युवाओ का बोलबाला आज भी कई जगह देखने को मिलता है अगर हम कहे की ये वही युवा वर्ग है जो हमारे भारत देश का भूत, वर्तमान ,भविष्य तय करते है यही सच है युवाओ में सहनशीलता की कमी नहीं होती ये ऊर्जावान होते है और सच का साथ कभी नहीं छोड़ते है ... युवाशक्ति हर वो काम करने की इच्छुक होती है जिसमे संघर्ष हो | 
        </p>
        <div className="mt-4 font-semibold text-xl flex justify-between">
        <div>
        युवा जनता संघर्ष समिति के संस्थापक :-
        </div>
        <div>
         मानस तिवारी <br/>
         मुख्यालय उत्तर प्रदेश 
         
         </div>
        </div>
         <div className="flex justify-end mt-4 text-gray-500 gap-x-2 font-bold hover:text-gray-700 cursor-pointer text-sm">
          Read More...
          
         </div>
      </div>
    </div>
  );
}
