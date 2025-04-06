"use client"
import { Globe2 } from 'lucide-react';
import React from 'react';
import { FaUsers, FaBookOpen, FaBriefcase, FaGlobeAsia } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from '@/contexts/TranslationContext';

function page() {
  const { t } = useTranslation();

  return (
    <div className="pb-24">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8">
          <Globe2 /> {t('aboutPage.title')}
        </h1>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
      </div>
      <div className="flex items-center justify-center p-2 md:p-6 bg-white">
        <Card className="max-w-7xl md:p-8 shadow-2xl bg-white rounded-lg md:rounded-xl leading-6.5 border border-gray-300">
          <CardContent>
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              {t('aboutPage.organizationName')}
            </h1>
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <FaBookOpen className="text-blue-500 text-2xl" />
                <p className="text-gray-700 text-justify">
                  {t('aboutPage.section1')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaBriefcase className="text-green-500 text-5xl" />
                <p className="text-gray-700 text-justify">
                  {t('aboutPage.section2')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaUsers className="text-red-500 text-3xl" />
                <p className="text-gray-700 text-justify">
                  {t('aboutPage.section3')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaGlobeAsia className="text-purple-500 text-3xl" />
                <p className="text-gray-700 text-justify">
                  {t('aboutPage.section4')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default page;
