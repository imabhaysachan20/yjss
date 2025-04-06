  "use client"
  import { Feather } from 'lucide-react'
  import React from 'react'
  import { Card, CardContent } from "@/components/ui/card";
  import { Quote } from "lucide-react";
import { useTranslation } from '@/contexts/TranslationContext';
  

  function page() {
    const { t } = useTranslation();
    return (
      <div className='min-h-screen'>
        <div className="flex items-center flex-col">
      <h1 className="text-4xl font-bold pt-10 pb-8"><Feather></Feather> {t('ideology.heading')}</h1>
      <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
      </div>
      <div className="flex items-center justify-center p-4 mt-6 bg-white">
        <Card className="max-w-6xl md:p-8 shadow-lg bg-white rounded-2xl border border-gray-200 mb-20">
          <CardContent>
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#f53d3d] mb-6">
              {t('ideology.heading2')}
            </h1>
            <div className="border-l-4 border-[#f53d3d] pl-4 md:text-lg text-gray-800 italic flex items-start">
              <Quote className="text-[#f53d3d] w-40  md:w-24 mr-2 mt-1" />
              <p>
              {t('ideology.para')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    )
  }

  export default page
