import { useEffect, useState } from "react";
import { ArrowBigRight, BookAIcon, BookOpen, Contact, Globe, Home, Image, Presentation } from "lucide-react";
import { t, languageService } from "@/utils/languageService"; // Import languageService

const generateNavItems = () => [
    {
        name: t("common.home"),
        icon: <Home className="w-4 relative -top-0.5" />,
        link: "/",
        content: null
    },
    {
        name: t("common.about"),
        icon: <BookOpen className="w-4 relative -top-0.5" />,
        link: "/about",
        content: [
            {
                name: t("about.aboutOrg"),
                link: "/about/organisation"
            },
            {
                name: t("about.ideology"),
                link: "/about/ideology"
            },
            {
                name: t("about.leadership"),
                link: "/about/leadership"
            },
        ]
    },
    {
        name: t("common.president"),
        link: "/president",
        icon: <Presentation className="w-4 relative -top-0.5" />,
        content: null
    },
    {
        name: t("common.organization"),
        link: "/group",
        icon: <Globe className="w-4 relative -top-0.5" />,
        content: [
            {
                name: t("organization.vicePresident"),
                link: "/"
            },
            {
                name: t("organization.statePresident"),
                link: "/"
            },
            {
                name: t("organization.districtPresident"),
                link: "/"
            },
            {
                name: t("organization.socialMedia"),
                link: "/"
            },
            {
                name: t("organization.spokesperson"),
                link: "/"
            },
            {
                name: t("organization.electionProgram"),
                link: "/"
            },
        ]
    },
    {
        name: t("common.gallery"),
        link: null,
        icon: <Image className="w-4 relative -top-0.5" />,
        content: [
            {
                name: t("gallery.photoGallery"),
                link: "/gallery/images"
            },
            {
                name: t("gallery.videoGallery"),
                link: "/"
            },
            {
                name: t("gallery.newsGallery"),
                link: "/"
            },
        ]
    },
    {
        name: t("common.contact"),
        icon: <Contact className="w-4 relative -top-0.5" />,
        link: "/contact",
        content: null
    }
];

const NavItems = () => {
    const [navItems, setNavItems] = useState(generateNavItems);
    const [language, setLanguage] = useState(languageService.getCurrentLanguage());

    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(languageService.getCurrentLanguage());
            setNavItems(generateNavItems());
        };

        const unsubscribe = languageService.subscribe(handleLanguageChange);

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        setNavItems(generateNavItems());
    }, [language]);

    return navItems;
};

export default NavItems;