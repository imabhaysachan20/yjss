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
        <div className="w-2/3 md:w-1/2 relative">
          <img
            src="/president.png" // Replace with actual image path
            alt="President"
            className="w-full h-auto object-cover opacity-80"
          />
          <div className="bg-[rgba(255,255,255,0.8)] p-2 rounded-2xl shadow-2xs w-full absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 flex items-center justify-center flex-col">
          <p className="text-gray-800 font-bold text-lg">
            मानस तिवारी
          </p>
          <p>
          संगठन अध्यक्ष 
          </p>
          </div>
          
        </div>
        
        {/* Text Section */}
        <div className="ml-4 w-full mt-14 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
          अध्यक्ष का संदेश
          </h2>
          <p className="text-gray-600 mb-16 text-lg">
          युवा जनता संघर्ष एक सामाजिक संगठन है, जो उत्तर प्रदेश में सक्रिय रूप से कार्यरत है। इस संगठन के संस्थापक मानस तिवारी हैं। हमारा उद्देश्य युवाओं को संगठित कर उन्हें सामाजिक, आर्थिक और राजनीतिक रूप से सशक्त बनाना है, ताकि वे अपने अधिकारों और कर्तव्यों को समझकर देश की उन्नति में महत्वपूर्ण भूमिका निभा सकें।
          </p>
          <div className="text-gray-600 mt-10 italic leading-relaxed relative text-justify">
          <span className="absolute -top-15 -left-0 text-[6rem] text-gray-300 font-serif -translate-x-3 -translate-y-4 select-none">
          &quot;
          </span>
          <p className="font-bold text-lg mb-2">युवाशक्ति: बदलाव की अग्रदूत</p>
          आज के दौर में भारत की सबसे बड़ी ताकत उसकी युवा शक्ति है। यही वह पीढ़ी है जो देश के भूत, वर्तमान और भविष्य की नींव रखती है। भारतीय युवा न केवल जोश और उत्साह से भरे हुए हैं, बल्कि वे सत्य, संघर्ष और समर्पण का उदाहरण भी प्रस्तुत करते हैं। उनका हौसला हर कठिनाई से लड़ने की क्षमता रखता है, और उनका धैर्य हर बदलाव की राह बनाता है।

          <p className="font-bold text-lg my-4">युवा: देश की रीढ़</p>
          किसी भी देश की प्रगति का पैमाना वहाँ की युवा जनसंख्या होती है। भारत को यह सौभाग्य प्राप्त है कि हमारे देश में दुनिया की सबसे बड़ी और सबसे ऊर्जावान युवा शक्ति मौजूद है। यही कारण है कि हमारा राष्ट्र तेजी से विकास कर रहा है। इतिहास साक्षी है कि जब भी देश पर कोई संकट आया है, युवाओं ने अपनी एकजुटता से उसे दूर किया है।

          <p className="font-bold text-lg my-4">युवाओं की शक्ति और समाज में उनकी भूमिका</p>
          जब अन्याय और अत्याचार के खिलाफ आवाज उठाने की बात आती है, तो हमारे युवा कभी पीछे नहीं हटते। दिल्ली में हुए निर्भया कांड के विरोध में पूरे देश के युवाओं ने जिस तरह सड़कों पर उतरकर न्याय की मांग की, वह इस बात का प्रमाण है कि वे अन्याय को सहन नहीं करते। उनका संघर्ष, उनका हौसला और उनका एकजुट प्रयास समाज में बदलाव लाने की क्षमता रखता है।

          युवा वह शक्ति है, जो असंभव को संभव बना सकती है। उनके हाथों में सिर्फ तख्तियां नहीं, बल्कि पूरे देश के भविष्य की दिशा तय करने की क्षमता होती है। अगर युवा ठान लें, तो परिवर्तन निश्चित है!

          <p className="font-bold text-lg my-4">हमारा संकल्प</p>
          युवा जनता संघर्ष समिति का यह संकल्प है कि हम हर उस संघर्ष में युवाओं के साथ खड़े रहेंगे, जो समाज में सकारात्मक बदलाव लाने के लिए आवश्यक है। हम युवा पीढ़ी को संगठित कर उन्हें सशक्त और जागरूक बनाएंगे, ताकि वे समाज के हर क्षेत्र में अपनी पहचान बना सकें।

          आइए, हम सब मिलकर युवाशक्ति को एक नई दिशा दें और एक सशक्त, आत्मनिर्भर और विकसित भारत के निर्माण में अपना योगदान दें।

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold mb-2">&quot;युवा बढ़े, देश बढ़े!&quot;</p>
            <p className="text-lg font-semibold">जय हिंद! जय भारत!</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default PresidentQuote;