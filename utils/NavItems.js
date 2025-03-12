import { ArrowBigRight, BookAIcon, BookOpen, Contact, Globe, Home, Image, PersonStanding, PersonStandingIcon, Presentation } from "lucide-react";
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
        content: [
            {
                name:"संगठन के बारे में",
                link:"/about/organisation"
            },
            {
                name:"हमारी विचारधारा",
                link:"/about/ideology"
            },
            {
                name:"नेतृत्व ",
                link:"/about/leadership"
            },
           
        ]
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
        content: [
            {
                name:"उपाध्यक्ष",
                link:"/"
            },
            {
                name:"प्रदेश अध्यक्ष",
                link:"/"
            },
            {
                name:"मंडल व जिला अध्यक्ष",
                link:"/"
            },
            {
                name:"सोशल मीडिया ",
                link:"/"
            },
            {
                name:"प्रवक्ता ",
                link:"/"
            },
            {
                name:"चुनाव कार्यक्रम",
                link:"/"
            },
           
        ]
    },
    {
        name: "गैलरी",
        link: "/gallery",
        icon:<Image className="w-4 relative -top-0.5"/>,
        content: [
            {
                name:"फोटो गैलरी",
                link:"/"
            },
            {
                name:"वीडियो गैलरी",
                link:"/"
            },
            {
                name:"समाचार गैलरी",
                link:"/"
            },
           
        ]
        
    },
    {
        name: "संपर्क करें",
        icon:<Contact className="w-4 relative -top-0.5"/>,
        link: "/contact",
        content: null
    }
];
export default navItems;