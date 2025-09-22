"use client"
import React, { useState, useRef } from "react";
import { useTranslation } from '@/contexts/TranslationContext';
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PenTool } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import  districts  from "@/utils/data"; 
import positions from "@/utils/karyakarniData";

const kalyanpur =['नवाबगंज ', 'विष्णुपुरी ', 'पुराना कानपुर ', 'ख्योरा ', 'नारामऊ ', 'बेनाझाबर ', 'तिलक नगर ', 'आवास विकास ', 'कल्याणपुर उत्तरी ', 'कल्याणपुर दक्षिण ', 'गीता नगर ', 'कल्याणपुर पश्चिम', 'पनकी ', 'नानकारी ', 'आंबेडकर नगर काकादेव ', 'काकादेव ', 'अशोक नगर'];

// Zone and Mandal structure for Uttar Pradesh
const upZones = {
  "पश्चिमांचल": {
    mandals: ["मेरठ मंडल", "आगरा मंडल", "अलीगढ़ मंडल", "सहारनपुर मंडल", "मुरादाबाद मंडल", "बरेली मंडल"],
    districts: {
      "मेरठ मंडल": ["मेरठ", "गाजियाबाद", "गौतम बुद्ध नगर", "हापुड़", "बुलंदशहर", "बागपत"],
      "आगरा मंडल": ["आगरा", "फिरोजाबाद", "मैनपुरी", "मथुरा"],
      "अलीगढ़ मंडल": ["अलीगढ़", "हाथरस", "कासगंज", "एटा"],
      "सहारनपुर मंडल": ["सहारनपुर", "मुज़फ्फरनगर", "शामली"],
      "मुरादाबाद मंडल": ["मुरादाबाद", "रामपुर", "ज्योतिबा फुले नगर", "बिजनौर", "सम्भल"],
      "बरेली मंडल": ["बरेली", "बदायूं", "पीलीभीत", "शाहजहाँपुर"]
    }
  },
  "पूर्वांचल": {
    mandals: ["गोरखपुर मंडल", "देवीपाटन मंडल", "बस्ती मंडल", "आजमगढ़ मंडल", "वाराणसी मंडल", "मिर्जापुर मंडल"],
    districts: {
      "गोरखपुर मंडल": ["गोरखपुर", "कुशी नगर", "देवरिया", "महराजगंज"],
      "देवीपाटन मंडल": ["गोंडा", "बहराइच", "श्रावस्ती", "बलरामपुर"],
      "बस्ती मंडल": ["बस्ती", "सिद्धार्थ नगर", "संत कबीर नगर"],
      "आजमगढ़ मंडल": ["आज़मगढ़", "मऊ", "बलिया", "अम्बेडकर नगर"],
      "वाराणसी मंडल": ["वाराणसी", "चन्दौली", "जौनपुर", "गाजीपुर", "भदोही(संत रविदास नगर)"],
      "मिर्जापुर मंडल": ["मीरजापुर", "सोनभद्र"]
    }
  },
  "मध्यांचल": {
    mandals: ["लखनऊ मंडल", "फैजाबाद मंडल", "इलाहाबाद मंडल", "कानपुर मंडल"],
    districts: {
      "लखनऊ मंडल": ["लखनऊ", "अयोध्या", "रायबरेली", "उन्नाव", "सीतापुर", "हरदोई", "लखीमपुर खीरी"],
      "फैजाबाद मंडल": ["फैजाबाद", "अमेठी", "सुल्तानपुर", "बाराबंकी"],
      "इलाहाबाद मंडल": ["प्रयागराज", "कौशाम्बी", "प्रतापगढ़", "फतेहपुर"],
      "कानपुर मंडल": ["कानपुर देहात", "कानपुर नगर", "औरैया", "इटावा", "फर्रुखाबाद", "कन्नौज"]
    }
  },
  "बुंदेलखंड": {
    mandals: ["झांसी मंडल", "चित्रकूट मंडल"],
    districts: {
      "झांसी मंडल": ["झांसी", "जालौन", "ललितपुर", "हमीरपुर", "महोबा"],
      "चित्रकूट मंडल": ["चित्रकूट", "बाँदा"]
    }
  }
};

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

function Page() {
    const { t } = useTranslation();
    const serialNumberRef = useRef("YJSS" + Date.now().toString());
    
    // Form state - removed serialNumber state since it's now auto-generated
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [education, setEducation] = useState("");
    const [address, setAddress] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [executiveCommittee, setExecutiveCommittee] = useState("");
    const [position, setPosition] = useState("");
    const [executiveId, setExecutiveId] = useState("");
    const [experience, setExperience] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [selectedState, setSelectedState] = useState("");
    
    // Location hierarchy
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedMandal, setSelectedMandal] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedLoksabha, setSelectedLoksabha] = useState("");
    const [selectedVidansabha, setSelectedVidansabha] = useState("");
    const [areaType, setAreaType] = useState("");
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        let newErrors = {};
        
        // Basic validations for all states
        if (!name) newErrors.name = "नाम आवश्यक है";
        if (!fatherName) newErrors.fatherName = "पिता का नाम आवश्यक है";
        if (!birthDate) newErrors.birthDate = "जन्म तिथि आवश्यक है";
        if (!address) newErrors.address = "पूरा पता आवश्यक है";
        if (!aadharNumber || !/^[0-9]{12}$/.test(aadharNumber)) newErrors.aadharNumber = "वैध 12-अंकीय आधार संख्या दर्ज करें";
        if (!executiveCommittee) newErrors.executiveCommittee = "कार्यकारणी का चयन आवश्यक है";
        if (!position) newErrors.position = "पद का चयन आवश्यक है";
        if (!executiveId) newErrors.executiveId = "कार्यकारणी आईडी आवश्यक है";
        if (!phone || !/^[0-9]{10}$/.test(phone)) newErrors.phone = "वैध 10-अंकीय फोन नंबर दर्ज करें";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "वैध ईमेल दर्ज करें";
        if (!applicationDate) newErrors.applicationDate = "आवेदन की तिथि आवश्यक है";
        if (!selectedState) newErrors.state = "राज्य का चयन आवश्यक है";
        
        // Additional validations only for Uttar Pradesh
        if (selectedState === "Uttar Pradesh") {
            if (!selectedZone) newErrors.zone = "क्षेत्र का चयन आवश्यक है";
            if (!selectedMandal) newErrors.mandal = "मंडल का चयन आवश्यक है";
            if (!selectedDistrict) newErrors.district = "जिला का चयन आवश्यक है";
            if (!selectedLoksabha) newErrors.loksabha = "लोकसभा का चयन आवश्यक है";
            if (!selectedVidansabha) newErrors.vidansabha = "विधानसभा का चयन आवश्यक है";
            if (!areaType) newErrors.areaType = "क्षेत्र प्रकार का चयन आवश्यक है";
            
            if (areaType === "rural") {
                if (!selectedBlock) newErrors.block = "ब्लॉक का चयन आवश्यक है";
                if (!selectedGramPanchayat) newErrors.gramPanchayat = "ग्राम पंचायत का चयन आवश्यक है";
            } else if (areaType === "urban") {
                if (!selectedWard) newErrors.ward = "वार्ड का चयन आवश्यक है";
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        
        // Reset UP-specific fields when state changes
        if (state !== 'Uttar Pradesh') {
            setSelectedZone("");
            setSelectedMandal("");
            setSelectedDistrict("");
            setSelectedLoksabha("");
            setSelectedVidansabha("");
            setAreaType("");
            setSelectedBlock("");
            setSelectedGramPanchayat("");
            setSelectedWard("");
        }
    };

    // Handlers to reset dependent dropdowns when a parent changes
    const handleZoneChange = (zone) => {
        setSelectedZone(zone);
        setSelectedMandal("");
        setSelectedDistrict("");
        setSelectedLoksabha("");
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleMandalChange = (mandal) => {
        setSelectedMandal(mandal);
        setSelectedDistrict("");
        setSelectedLoksabha("");
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
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

    const handleLoksabhaChange = (loksabha) => {
        setSelectedLoksabha(loksabha);
        setSelectedVidansabha("");
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleVidansabhaChange = (vidansabha) => {
        setSelectedVidansabha(vidansabha);
        setAreaType("");
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
        
        // Auto-set area type for Kalyanpur
        if (vidansabha === 'कल्याणपुर') {
            setAreaType("urban");
        }
    };

    const handleAreaTypeChange = (type) => {
        setAreaType(type);
        setSelectedBlock("");
        setSelectedGramPanchayat("");
        setSelectedWard("");
    };

    const handleBlockChange = (block) => {
        setSelectedBlock(block);
        setSelectedGramPanchayat("");
    };

    const handleExecutiveCommitteeChange = (committee) => {
        setExecutiveCommittee(committee);
        setPosition("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const formData = {
                serialNumber: serialNumberRef.current, name, fatherName, birthDate, education, address,
                aadharNumber, executiveCommittee, position, executiveId, experience,
                phone, email, applicationDate, state: selectedState,
                zone: selectedZone, mandal: selectedMandal, district: selectedDistrict, 
                loksabha: selectedLoksabha, vidansabha: selectedVidansabha, 
                areaType: areaType, block: selectedBlock, gramPanchayat: selectedGramPanchayat, 
                ward: selectedWard, submittedAt: new Date().toISOString()
            };

            console.log("Form Data:", formData);

            const response = await fetch('/api/submit/padAvedan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to submit form');

            await response.json();
            setSubmitStatus('success');
            
            // Reset form
            setName("");
            setFatherName("");
            setBirthDate("");
            setEducation("");
            setAddress("");
            setAadharNumber("");
            setExecutiveCommittee("");
            setPosition("");
            setExecutiveId("");
            setExperience("");
            setPhone("");
            setEmail("");
            setApplicationDate("");
            setSelectedState("");
            setSelectedZone("");
            setSelectedMandal("");
            setSelectedDistrict("");
            setSelectedLoksabha("");
            setSelectedVidansabha("");
            setAreaType("");
            setSelectedBlock("");
            setSelectedGramPanchayat("");
            setSelectedWard("");
            
            // Generate new serial number for next form
            serialNumberRef.current = "yjss" + Date.now().toString();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showUrbanOption = selectedDistrict && districts[selectedDistrict]?.nagar_nikay?.ward?.length > 0;

    return (
        <div className="mb-24">
            <div className="flex justify-center mt-8 md:mt-16 mb-16">
                <h1 className="text-lg md:text-3xl font-bold bg-yellow-200 px-4 py-2 inline-block rounded-md -mb-8 md:mb-8">
                    <div className="flex items-center gap-x-2">
                        <PenTool className="relative -top-0.5 w-4 md:w-8"/>
                        <TypeAnimation
                            sequence={['पद आवेदन फॉर्म', 5000, 'Position Application Form', 3000]}
                            wrapper="span" speed={50} style={{ display: 'inline-block' }} repeat={Infinity}
                        />
                    </div>
                </h1>
            </div>

            <div className="flex justify-between items-center">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg grow-1 rounded-xl">
                    <h2 className="text-xl font-bold mb-4">पद आवेदन फॉर्म</h2>
                    
                    {/* Personal Information */}
                    <div>
                        <Label htmlFor="serialNumber">क्रम संख्या:</Label>
                        <Input 
                            id="serialNumber" 
                            name="serialNumber" 
                            value={serialNumberRef.current} 
                            readOnly 
                            className="mb-3 w-full" 
                        />
                    </div>
                    
                    <Input placeholder="नाम" value={name} onChange={(e) => setName(e.target.value)} className="mb-3 w-full" />
                    {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                    <Input placeholder="पिता का नाम" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="mb-3 w-full" />
                    {errors.fatherName && <p className="text-red-500 text-sm mb-2">{errors.fatherName}</p>}
                    
                    <Label htmlFor="dob_date">जन्म तिथि</Label>
                    <Input id="dob_date" placeholder="जन्म तिथि" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mb-3 w-full" type="date"/>
                    {errors.birthDate && <p className="text-red-500 text-sm mb-2">{errors.birthDate}</p>}
                    
                    <Input placeholder="शिक्षा" value={education} onChange={(e) => setEducation(e.target.value)} className="mb-3 w-full" />
                    {errors.education && <p className="text-red-500 text-sm mb-2">{errors.education}</p>}

                    <Textarea placeholder="पूरा पता" value={address} onChange={(e) => setAddress(e.target.value)} className="mb-3 w-full" />
                    {errors.address && <p className="text-red-500 text-sm mb-2">{errors.address}</p>}

                    <Input placeholder="आधार संख्या" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} className="mb-3 w-full" maxLength={12}/>
                    {errors.aadharNumber && <p className="text-red-500 text-sm mb-2">{errors.aadharNumber}</p>}
                    
                    {/* Executive & Position */}
                    <Select onValueChange={handleExecutiveCommitteeChange}>
                        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="कार्यकारणी" /></SelectTrigger>
                        <SelectContent>
                            {Object.keys(positions).map((committee) => (
                                <SelectItem key={committee} value={committee}>{committee}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.executiveCommittee && <p className="text-red-500 text-sm mb-2">{errors.executiveCommittee}</p>}
                    
                    {executiveCommittee && (
                        <Select onValueChange={setPosition}>
                            <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="पद (जिसके लिए आवेदन)" /></SelectTrigger>
                            <SelectContent>
                                {positions[executiveCommittee].map((pos) => ( <SelectItem key={pos} value={pos}>{pos}</SelectItem>))}
                            </SelectContent>
                        </Select>
                    )}
                    {errors.position && <p className="text-red-500 text-sm mb-2">{errors.position}</p>}
                    
                    <Input placeholder="कार्यकारणी आईडी संख्या" value={executiveId} onChange={(e) => setExecutiveId(e.target.value)} className="mb-3 w-full" />
                    {errors.executiveId && <p className="text-red-500 text-sm mb-2">{errors.executiveId}</p>}
                    
                    <Textarea placeholder="पूर्व अनुभव" value={experience} onChange={(e) => setExperience(e.target.value)} className="mb-3 w-full" />
                    
                    <Input placeholder="संपर्क नंबर" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3 w-full" type="tel" maxLength={10} />
                    {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}
                    
                    <Input placeholder="ईमेल" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3 w-full" type="email" />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                    
                    <Label htmlFor="application_date">आवेदन की तिथि</Label>
                    <Input id="application_date" placeholder="आवेदन की तिथि" value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} className="mb-3 w-full" type="date" />
                    {errors.applicationDate && <p className="text-red-500 text-sm mb-2">{errors.applicationDate}</p>}

                    {/* State Selection */}
                    <Select onValueChange={handleStateChange} value={selectedState}>
                        <SelectTrigger className="mb-3 w-full">
                            <SelectValue placeholder="राज्य का चयन करें" />
                        </SelectTrigger>
                        <SelectContent>
                            {states.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-500 text-sm mb-2">{errors.state}</p>}

                    {/* UP-specific Location Hierarchy */}
                    {selectedState === "Uttar Pradesh" && (
                        <>
                            <Select onValueChange={handleZoneChange} value={selectedZone}>
                                <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="क्षेत्र का चयन करें" /></SelectTrigger>
                                <SelectContent>
                                    {Object.keys(upZones).map((zone) => (
                                        <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.zone && <p className="text-red-500 text-sm mb-2">{errors.zone}</p>}

                            {selectedZone && (
                                <Select onValueChange={handleMandalChange} value={selectedMandal}>
                                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="मंडल का चयन करें" /></SelectTrigger>
                                    <SelectContent>
                                        {upZones[selectedZone].mandals.map((mandal) => (
                                            <SelectItem key={mandal} value={mandal}>{mandal}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {errors.mandal && <p className="text-red-500 text-sm mb-2">{errors.mandal}</p>}

                            {selectedMandal && (
                                <Select onValueChange={handleDistrictChange} value={selectedDistrict}>
                                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="जिला का चयन करें" /></SelectTrigger>
                                    <SelectContent>
                                        {upZones[selectedZone].districts[selectedMandal]?.map((dist) => (
                                            <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {errors.district && <p className="text-red-500 text-sm mb-2">{errors.district}</p>}

                            {selectedDistrict && (
                                <Select onValueChange={handleLoksabhaChange} value={selectedLoksabha}>
                                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="लोकसभा" /></SelectTrigger>
                                    <SelectContent>
                                        {districts[selectedDistrict]?.loksabha.map((ls) => (
                                            <SelectItem key={ls} value={ls}>{ls}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {errors.loksabha && <p className="text-red-500 text-sm mb-2">{errors.loksabha}</p>}

                            {selectedLoksabha && (
                                <Select onValueChange={handleVidansabhaChange} value={selectedVidansabha}>
                                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="विधानसभा" /></SelectTrigger>
                                    <SelectContent>
                                        {districts[selectedDistrict]?.vidansabha[selectedLoksabha]?.map((vs) => (
                                            <SelectItem key={vs} value={vs}>{vs}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            {errors.vidansabha && <p className="text-red-500 text-sm mb-2">{errors.vidansabha}</p>}
                            
                            {selectedVidansabha && selectedVidansabha !== "कल्याणपुर" && (
                                <div className="mb-4">
                                    <RadioGroup value={areaType} onValueChange={handleAreaTypeChange} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="rural" id="rural" />
                                            <Label htmlFor="rural">ग्रामीण</Label>
                                        </div>
                                        {showUrbanOption && (
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="urban" id="urban" />
                                                <Label htmlFor="urban">शहरी</Label>
                                            </div>
                                        )}
                                    </RadioGroup>
                                    {errors.areaType && <p className="text-red-500 text-sm">{errors.areaType}</p>}
                                </div>
                            )}

                            {/* Kalyanpur special case */}
                            {selectedVidansabha === "कल्याणपुर" && (
                                <>
                                    <Select onValueChange={setSelectedWard} value={selectedWard}>
                                        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="वार्ड का चयन करें" /></SelectTrigger>
                                        <SelectContent>
                                            {kalyanpur.map((ward) => (
                                                <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.ward && <p className="text-red-500 text-sm mb-2">{errors.ward}</p>}
                                </>
                            )}

                            {/* Rural area fields */}
                            {areaType === "rural" && selectedDistrict && (
                                <>
                                    <Select onValueChange={handleBlockChange} value={selectedBlock}>
                                        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="ब्लॉक" /></SelectTrigger>
                                        <SelectContent>
                                            {districts[selectedDistrict].blocks.map((block) => (
                                                <SelectItem key={block} value={block}>{block}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.block && <p className="text-red-500 text-sm mb-2">{errors.block}</p>}
                                    
                                    {selectedBlock && (
                                        <Select onValueChange={setSelectedGramPanchayat} value={selectedGramPanchayat}>
                                            <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="ग्राम पंचायत" /></SelectTrigger>
                                            <SelectContent>
                                                {districts[selectedDistrict]?.grampanchayat[selectedBlock]?.map((gp) => (
                                                    <SelectItem key={gp} value={gp}>{gp}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                    {errors.gramPanchayat && <p className="text-red-500 text-sm mb-2">{errors.gramPanchayat}</p>}
                                </>
                            )}

                            {/* Urban area fields (excluding Kalyanpur) */}
                            {areaType === "urban" && selectedDistrict && selectedVidansabha !== "कल्याणपुर" && (
                                <div>
                                    <Select onValueChange={setSelectedWard} value={selectedWard}>
                                        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="वार्ड का चयन करें" /></SelectTrigger>
                                        <SelectContent>
                                            {districts[selectedDistrict].nagar_nikay.ward.map((ward) => (
                                                <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.ward && <p className="text-red-500 text-sm mb-2">{errors.ward}</p>}
                                </div>
                            )}
                        </>
                    )}
                    
                    {submitStatus === 'success' && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">आवेदन सफलतापूर्वक जमा हो गया है।</div>}
                    {submitStatus === 'error' && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">कुछ गलत हो गया। कृपया पुनः प्रयास करें।</div>}
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'सबमिट कर रहे हैं...' : 'आवेदन जमा करें'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Page;