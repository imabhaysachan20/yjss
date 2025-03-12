"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import Link from "next/link";
import { usePathname } from "next/navigation";
import navItems from "@/utils/NavItems";
import { ArrowBigRight, BookAIcon } from "lucide-react";
    
    function NavBarOptions() {
        const pathname = usePathname();
        
        
        return (
            <div className="flex gap-x-8">
           <nav className="flex flex-row items-center gap-x-6 ">
            
            {navItems.map((item)=>{
                return <div className={`flex items-center text-lg justify-center text-gray-700 gap-x-1.5 hover:text-black ${item.link!="/" && pathname.startsWith(item.link)?"font-bold text-black":""}`} key={item.name}>
                    <DropdownMenu>
  <DropdownMenuTrigger className="">
  {item.content ? <div className="flex flex-col justify-center items-center cursor-pointer">{item.icon} {item.name}</div> : <Link  href={item.link}><div className="flex flex-col justify-center items-center cursor-pointer">{item.icon}{item.name}</div></Link>}</DropdownMenuTrigger>
    {/* {!item.content && <DropdownMenuContent></DropdownMenuContent>} */}
    {item.content?<DropdownMenuContent ><DropdownMenuLabel>{item.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />{item.content && item.content.map((it,idx)=>{
        return (
            <Link href= {it.link} key={idx}><DropdownMenuItem>{it.name}</DropdownMenuItem></Link>
        )
    })}</DropdownMenuContent> : ""}
</DropdownMenu>
                    </div>
            })}
            
           </nav>
           <Link href={"/download"}>
           <div className=" relative -top-0.5 font-semibold flex flex-row text-white bg-[#F63D3E] p-4 rounded-b-md gap-x-2">
            <div className="flex">
           <BookAIcon/> सदास्यता कार्ड 
           </div>
           <ArrowBigRight className=""/>
           </div>
           </Link>
           </div>
        )
    }



export default NavBarOptions
