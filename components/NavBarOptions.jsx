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
import { ArrowBigRight, BookAIcon, Menu, X } from "lucide-react";
import { useState } from "react";

function NavBarOptions() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative">
            {/* Mobile menu button */}
            <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex gap-x-8">
                <nav className="flex flex-row items-center gap-x-6">
                    {navItems.map((item) => (
                        <div 
                            key={item.name}
                            className={`flex items-center text-lg justify-center text-gray-700 gap-x-1.5 hover:text-black ${
                                item.link !== "/" && pathname.startsWith(item.link) 
                                    ? "font-bold text-black" 
                                    : ""
                            }`}
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    {item.content ? (
                                        <div className="flex flex-col justify-center items-center cursor-pointer">
                                            {item.icon} {item.name}
                                        </div>
                                    ) : (
                                        <Link href={item.link}>
                                            <div className="flex flex-col justify-center items-center cursor-pointer">
                                                {item.icon}{item.name}
                                            </div>
                                        </Link>
                                    )}
                                </DropdownMenuTrigger>
                                {item.content && (
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {item.content.map((it, idx) => (
                                            <Link href={it.link} key={idx}>
                                                <DropdownMenuItem>{it.name}</DropdownMenuItem>
                                            </Link>
                                        ))}
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                        </div>
                    ))}
                </nav>
                <Link href="/download">
                    <div className="relative -top-0.5 font-semibold flex flex-row text-white bg-[#F63D3E] p-4 rounded-b-md gap-x-2">
                        <div className="flex">
                            <BookAIcon/> सदास्यता कार्ड 
                        </div>
                        <ArrowBigRight className=""/>
                    </div>
                </Link>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg mt-2 md:hidden z-50">
                    <nav className="flex flex-col p-4">
                        {navItems.map((item) => (
                            <div key={item.name} className="py-2">
                                {item.content ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full text-left">
                                            <div className="flex items-center gap-2">
                                                {item.icon} {item.name}
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {item.content.map((it, idx) => (
                                                <Link href={it.link} key={idx}>
                                                    <DropdownMenuItem>{it.name}</DropdownMenuItem>
                                                </Link>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Link href={item.link}>
                                        <div className="flex items-center gap-2">
                                            {item.icon} {item.name}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link href="/download" className="mt-4">
                            <div className="font-semibold flex flex-row text-white bg-[#F63D3E] p-3 rounded-md gap-x-2">
                                <div className="flex">
                                    <BookAIcon/> सदास्यता कार्ड 
                                </div>
                                <ArrowBigRight className=""/>
                            </div>
                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default NavBarOptions; 