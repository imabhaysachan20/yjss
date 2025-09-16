"use client"
import React, { useState } from "react";
const kalyanpur =['नवाबगंज ', 'विष्णुपुरी ', 'पुराना कानपुर ', 'ख्योरा ', 'नारामऊ ', 'बेनाझाबर ', 'तिलक नगर ', 'आवास विकास ', 'कल्याणपुर उत्तरी ', 'कल्याणपुर दक्षिण ', 'गीता नगर ', 'कल्याणपुर पश्चिम', 'पनकी ', 'नानकारी ', 'आंबेडकर नगर काकादेव ', 'काकादेव ', 'अशोक नगर']
import { useTranslation } from '@/contexts/TranslationContext';
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PenTool } from "lucide-react";
import districts from "@/utils/data";

export default function SupportForm() {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLoksabha, setSelectedLoksabha] = useState("");
  const [selectedVidansabha, setSelectedVidansabha] = useState("");
  const [areaType, setAreaType] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(phone)) newErrors.phone = "Invalid phone number";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    if (!selectedDistrict) newErrors.district = "District is required";
    if (!selectedLoksabha) newErrors.loksabha = "Lok Sabha is required";
    if (!selectedVidansabha) newErrors.vidansabha = "Vidhan Sabha is required";
    if (!areaType) newErrors.areaType = "Area type selection is required";
    if (areaType === "rural") {
      if (!selectedBlock) newErrors.block = "Block is required";
      if (!selectedGramPanchayat) newErrors.gramPanchayat = "Gram Panchayat is required";
    } else if (areaType === "urban") {
      if (!selectedWard) newErrors.ward = "Ward is required";
    }
    if (!problem) newErrors.problem = "Problem description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedLoksabha("");
    setSelectedVidansabha("");
    setAreaType("");
    setSelectedBlock("");
    setSelectedGramPanchayat("");
    setSelectedWard("");
  };

  const handleAreaTypeChange = (type) => {
    setAreaType(type);
    setSelectedBlock("");
    setSelectedGramPanchayat("");
    setSelectedWard("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedVidansabha=='कल्याणपुर'?setAreaType("urban"):"";
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = {
        name,
        phone,
        email,
        district: selectedDistrict,
        loksabha: selectedLoksabha,
        vidansabha: selectedVidansabha,
        areaType:selectedVidansabha=='कल्याणपुर'?"urban":areaType,
        ...(areaType === "rural" ? {
          block: selectedBlock,
          gramPanchayat: selectedGramPanchayat
        } : {
          ward: selectedWard
        }),
        problem,
        submittedAt: new Date().toISOString()
      };
console.log(formData);
      const response = await fetch('/api/submit/supportForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      setSubmitStatus('success');
      
      // Reset form
      setName('');
      setPhone('');
      setEmail('');
      setSelectedDistrict('');
      setSelectedLoksabha('');
      setSelectedVidansabha('');
      setAreaType('');
      setSelectedBlock('');
      setSelectedGramPanchayat('');
      setSelectedWard('');
      setProblem('');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showUrbanOption = selectedDistrict && districts[selectedDistrict]?.nagar_nikay?.ward?.length > 0;

  return (<div className="mb-24">
    <div className="flex justify-center mt-8 md:mt-16 mb-16">
      <h1 className="text-lg md:text-3xl font-bold bg-yellow-200 px-4 py-2 inline-block rounded-md -mb-8 md:mb-8">
        <div className="flex items-center gap-x-2">
          <PenTool className="relative -top-0.5 w-4 md:w-8"/>
          <TypeAnimation
            sequence={[
              t('support.Heading2'),
              5000,
              t('support.Heading3'),
              3000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
      </h1>
    </div>
    <div className="flex justify-between items-center">
      <div className="hidden md:block w-[20%] grow-1">
        <img className="w-full" src="/contact.png" alt="Contact"/>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg grow-1 rounded-xl">
        <h2 className="text-xl font-bold mb-4">{t('support.Heading')}</h2>
        
        <Input placeholder={t('support.name')} value={name} onChange={(e) => setName(e.target.value)} className="mb-3 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        
        <Input placeholder={t('support.phoneNumber')} value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3 w-full" type="tel" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <Input placeholder={t('support.email')} value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 w-full" type="email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        
        <Select onValueChange={handleDistrictChange}>
          <SelectTrigger className="mb-3 w-full"><SelectValue placeholder={t('support.District')} /></SelectTrigger>
          <SelectContent>
            {Object.keys(districts).map((district) => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}

        {selectedDistrict && (
          <Select onValueChange={setSelectedLoksabha}>
            <SelectTrigger className="mb-3 w-full"><SelectValue placeholder={t('support.SLS')} /></SelectTrigger>
            <SelectContent>
              {districts[selectedDistrict].loksabha.map((ls) => (
                <SelectItem key={ls} value={ls}>{ls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.loksabha && <p className="text-red-500 text-sm">{errors.loksabha}</p>}

        {selectedLoksabha && districts[selectedDistrict]?.vidansabha?.[selectedLoksabha] && (
          <Select onValueChange={setSelectedVidansabha}>
            <SelectTrigger className="mb-3 w-full"><SelectValue placeholder={t('support.SVS')} /></SelectTrigger>
            <SelectContent>
              {districts[selectedDistrict]?.vidansabha?.[selectedLoksabha]?.map((vs) => (
                <SelectItem key={vs} value={vs}>{vs}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {errors.vidansabha && <p className="text-red-500 text-sm">{errors.vidansabha}</p>}

        {

        }

        {selectedDistrict && selectedVidansabha!="कल्याणपुर" && (
          <div className="mb-4">
            <RadioGroup value={areaType} onValueChange={handleAreaTypeChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rural" id="rural" />
                <Label htmlFor="rural">Rural</Label>
              </div>
              {showUrbanOption && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urban" id="urban" />
                  <Label htmlFor="urban">Urban</Label>
                </div>
              )}
            </RadioGroup>
            {errors.areaType && <p className="text-red-500 text-sm">{errors.areaType}</p>}
          </div>
        )}

        {areaType === "rural" && selectedDistrict && (
          <>
            <Select onValueChange={setSelectedBlock}>
              <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Block" /></SelectTrigger>
              <SelectContent>
                {districts[selectedDistrict].blocks.map((block) => (
                  <SelectItem key={block} value={block}>{block}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.block && <p className="text-red-500 text-sm">{errors.block}</p>}

            {selectedBlock && (
              <Select onValueChange={setSelectedGramPanchayat}>
                <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Gram Panchayat" /></SelectTrigger>
                <SelectContent>
                  {districts[selectedDistrict].grampanchayat[selectedBlock].map((gp) => (
                    <SelectItem key={gp} value={gp}>{gp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.gramPanchayat && <p className="text-red-500 text-sm">{errors.gramPanchayat}</p>}
          </>
        )}
        {selectedVidansabha=="कल्याणपुर" &&  <>
            <Select onValueChange={setSelectedWard}>
              <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Ward" /></SelectTrigger>
              <SelectContent>
                {kalyanpur.map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
          </>}
        {areaType === "urban" && selectedDistrict && (
          <>
            <Select onValueChange={setSelectedWard}>
              <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Ward" /></SelectTrigger>
              <SelectContent>
                {districts[selectedDistrict].nagar_nikay.ward.map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
          </>
        )}

        <Textarea placeholder={t('support.WP')} value={problem} onChange={(e) => setProblem(e.target.value)} className="mb-3 w-full" />
        {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
        
        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            आपकी समस्या सफलतापूर्वक जमा कर दी गई है। हम जल्द ही आपसे संपर्क करेंगे।
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? t('supportForm.submitting') : t('supportForm.submit')}
        </Button>
      </form>
    </div>
  </div>
  );
}
