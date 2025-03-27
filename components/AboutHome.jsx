import { ArrowRightCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AboutUs() {
  return (
    <div className="flex relative rounded flex-col md:flex-row items-center justify-center min-h-screen py-28 md:py-36">
      <div className="w-full md:w-1/2 flex justify-center">
        <img 
          src="/png.png" 
          alt="About Us" 
          className="w-[75%] md:w-full max-w-md"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 mt-4 md:mt-0 relative bg-white shadow-lg rounded-xl">
        <span className="absolute -top-2 -left-0 text-[6rem] text-gray-300 font-serif -translate-x-3 -translate-y-4 select-none">
        “
        </span>
        <h1 className="text-gray-700 text-md md:text-lg mb-1">संगठन के बारे में</h1>
        <h2 className="leading-11 md:leading-14 text-4xl md:text-5xl font-bold text-gray-800 mb-4">युवा जनता संघर्ष संगठन </h2>
        <div className="w-[100px] relative -top-2 md:top-0 h-[8px] md:h-[10px] bg-[#F53D3D] rounded-3xl mb-10"></div>
        <p className="text-md md:text-lg text-gray-600 leading-relaxed mb-4 text-justify">
          युवा जनता संघर्ष संगठन एक सामाजिक दल है, जो भारतीय राज्य उत्तर प्रदेश में सक्रिय रूप से कार्यरत है। इस संगठन की स्थापना मानस तिवारी द्वारा की गई थी। संगठन का उद्देश्य युवाओं को सामाजिक न्याय, समानता, विकास और राष्ट्र निर्माण के प्रति जागरूक करना तथा समाज में सकारात्मक बदलाव लाना है।
        </p>
        <p className="text-md md:text-lg text-gray-600 leading-relaxed text-justify">
          यह संगठन समाज के वंचित, शोषित और पिछड़े वर्गों के अधिकारों की रक्षा के लिए संघर्षरत है और युवाओं को राष्ट्रहित में कार्य करने के लिए प्रेरित करता है। युवा रत्न और युवाशक्ति आज के समय में देश और दुनिया में सबसे अधिक सम्मान युवाओं को मिल रहा है।
        </p>
        <div className="mt-4 font-semibold text-xl flex flex-col mt-2 gap-y-1 md:flex-row md:justify-between">
          <div className="text-sm md:text-lg mb-1">
            युवा जनता संघर्ष समिति के संस्थापक :-
          </div>
          <div className="text-md">
            मानस तिवारी <br/>
            <small>(मुख्यालय उत्तर प्रदेश )</small>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-end mt-4 text-gray-500 gap-x-2 font-bold hover:text-gray-700 cursor-pointer text-sm">
              Read More...
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">युवा जनता संघर्ष संगठन</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-justify">
              <p className="text-gray-600">
                युवा वर्ग का प्रभाव विभिन्न क्षेत्रों में स्पष्ट रूप से देखा जा सकता है। यह वही युवा हैं जो भारत के भूत, वर्तमान और भविष्य को तय करते हैं। राष्ट्र के विकास में युवाओं की भूमिका अत्यंत महत्वपूर्ण होती है, क्योंकि वे नवाचार, साहस और आत्मविश्वास से परिपूर्ण होते हैं।
              </p>
              
              <p className="text-gray-600">
                युवाओं में सहनशीलता, साहस और संघर्षशीलता की कोई कमी नहीं होती, वे ऊर्जावान होते हैं और सच्चाई का साथ कभी नहीं छोड़ते। संघर्ष और चुनौतियों से जूझने की इनकी क्षमता उन्हें हर क्षेत्र में आगे बढ़ने के लिए प्रेरित करती है।
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">संगठन के प्रमुख उद्देश्य और कार्य</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                  <li>सामाजिक न्याय एवं समानता – समाज के हर वर्ग को समान अधिकार दिलाने के लिए संघर्ष करना।</li>
                  <li>शिक्षा और जागरूकता – युवाओं को शिक्षित कर समाज में जागरूकता फैलाना और असमानता दूर करना।</li>
                  <li>रोजगार एवं स्वरोजगार – बेरोजगारी के खिलाफ आवाज उठाना और युवाओं को स्वरोजगार के प्रति प्रोत्साहित करना।</li>
                  <li>महिला सशक्तिकरण – महिलाओं की सुरक्षा, शिक्षा और उनके अधिकारों की रक्षा के लिए कार्य करना।</li>
                  <li>भ्रष्टाचार के खिलाफ संघर्ष – सरकारी और गैर-सरकारी संस्थानों में व्याप्त भ्रष्टाचार के खिलाफ अभियान चलाना।</li>
                  <li>पर्यावरण संरक्षण – स्वच्छता अभियान, वृक्षारोपण और जल संरक्षण को बढ़ावा देना।</li>
                  <li>स्वास्थ्य एवं खेल – स्वास्थ्य सेवाओं की उपलब्धता और खेल-कूद को बढ़ावा देना।</li>
                </ol>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">हमारी प्रतिबद्धता</h3>
                <p className="text-gray-600">
                  युवा जनता संघर्ष संगठन युवाओं को संगठित कर सामाजिक उत्थान, न्याय और समानता के लिए कार्य करने हेतु प्रेरित करता है। यह संगठन युवाओं की शक्ति को सही दिशा देने और समाज में एक सकारात्मक बदलाव लाने के लिए प्रतिबद्ध है।
                </p>
                <p className="text-gray-600 mt-2">
                  हम मिलकर एक ऐसे भारत का निर्माण करेंगे, जहां हर व्यक्ति को समान अवसर मिले और कोई भी अन्याय का शिकार न हो।
                </p>
              </div>

              <div className="text-center mt-6 italic text-gray-700 font-semibold">
                "संघर्ष ही हमारा संकल्प, युवा शक्ति ही हमारी पहचान!"
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
