"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ArrowBigRight, BookAIcon, BookOpen, Contact, Globe, Home, Image, PersonStanding, PersonStandingIcon, Presentation } from "lucide-react";
import { usePathname } from "next/navigation";

  
  const navItems = [
    {
        name: "होम",
        icon:<Home className="w-4 relative -top-0.5"/>,
        link: "/",
        content: null
    },
    {
        name: "हमारे बारे में",
        icon:<BookOpen className="w-4 relative -top-0.5"/>,
        link: "/about",
        content: (
            <>
                <p>यह हमारे बारे में पेज है।</p>
            </>
        )
    },
    {
        name: "अध्यक्ष",
        link: "/president",
        icon:<Presentation className="w-4 relative -top-0.5"/>,
        content: null
    },
    {
        name: "संगठन",
        link: "/group",
        icon:<Globe className="w-4 relative -top-0.5"/>,
        content: (<>
        </>)
    },
    {
        name: "गैलरी",
        link: "/gallery",
        icon:<Image className="w-4 relative -top-0.5"/>,
        content: (
            <>
                <p>यह गैलरी पेज है।</p>
            </>
        )
    },
    {
        name: "संपर्क करें",
        icon:<Contact className="w-4 relative -top-0.5"/>,
        link: "/contact",
        content: (
            <>
                <p>यह संपर्क करें पेज है।</p>
            </>
        )
    }
];
    
    function NavBarOptions() {
        const pathname = usePathname();
        console.log(pathname);
        
        return (
            <div className="flex gap-x-8">
           <nav className="flex flex-row items-center gap-x-6 ">
            {navItems.map((item)=>{
                return <div className={`flex items-center text-lg justify-center text-gray-700 gap-x-1.5 hover:text-black ${pathname==item.link?"font-bold text-black":""}`} key={item.name}>
                    {item.icon}
                    {item.name}
                    </div>
            })}
            
           </nav>
           <div className=" relative -top-0.5 font-semibold flex flex-row text-white bg-[#F63D3E] p-4 rounded-b-md gap-x-2">
            <div className="flex">
           <BookAIcon/> सदास्यता कार्ड 
           </div>
           <ArrowBigRight className=""/>
           </div>
           </div>
        )
    }



export default NavBarOptions
