import { Feather } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

function page() {
  return (
    <div className='min-h-screen'>
      <div className="flex items-center flex-col">
    <h1 className="text-4xl font-bold pt-10 pb-8"><Feather></Feather> हमारी विचारधार</h1>
    <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
    </div>
    <div className="flex items-center justify-center p-4 mt-12 bg-white">
      <Card className="max-w-6xl p-8 shadow-lg bg-white rounded-2xl border border-gray-200">
        <CardContent>
          <h1 className="text-4xl font-bold text-center text-[#f53d3d] mb-6">
            युवा जनता संघर्ष संगठन
          </h1>
          <div className="border-l-4 border-[#f53d3d] pl-4 text-lg text-gray-800 italic flex items-start">
            <Quote className="text-[#f53d3d] w-24 mr-2 mt-1" />
            <p>
              युवाओ की नई राजनीति जन्म ले रही है। आए अपराध घोटाले भ्रष्टाचार को देखते हैं। युवाशक्ति आज राजनैतिक अदूरदर्शिता और सामाजिक व राष्ट्रीय प्रतिबद्धता में कमी के चलते भारत की जो छवि बन रही है, उससे हर देशवासी का मन विचलित होता जा रहा है।
              अपराध घोटाले भ्रष्टाचार को देखते हुए युवा वर्ग सोचने को मजबूर होता जा रहा है, क्या यही वही परम वैभवशाली भारत है जिसकी श्रेष्ठता के कई किस्से युवावर्ग सुनता आया है? राजनैतिक दूरदर्शिता के अभाव को देखते हुए युवाओं को नेतृत्व करना होगा और विचार करना होगा कि अक्साई चीन, सिक्किम, अरुणाचल और तवांग हमारा है। भारत के भूभाग का कोई खंड अब स्वीकार्य नहीं होगा। युवाओं को ही आगे आना होगा।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default page
