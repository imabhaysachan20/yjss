import { useEffect, useState } from "react";
import { ArrowBigRight, BookAIcon, BookOpen, Contact, Globe, Home, Image, Presentation,FileBadge,FileUser } from "lucide-react";
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
        link:"/",
        // link: "/president",
        icon: <Presentation className="w-4 relative -top-0.5" />,
        content: null
    },
    {
        name: t("common.organization"),
        link: null,
        icon: <Globe className="w-4 relative -top-0.5" />,
        content: [
            {
                name: t("organization.nationalexecutive"),
                link:"/"
                // link: "/organization/national-executive"
            },
            {
                name: t("organization.stateexecutive"),
                link:"/"
                // link: "/organization/state-executive"
            },
            {
                name: t("organization.divisionalcommittee"),
                link:"/"
                // link: "/organization/divisional-committee"
            },
            {
                name: t("organization.districtcommittee"),
                link:"/"
                // link: "/organization/district-committee"
            },
            {
                name: t("organization.assemblycommittee"),
                link:"/"
                // link: "/organization/assembly-committee"
            },
            {
                name: t("organization.wardcommittee"),
                link:"/"
                // link: "/organization/ward-committee"
            },
            {
                name: t("organization.boothcommittee"),
                link:"/"
                // link: "/organization/booth-committee"
            },
            {
                name: t("organization.spokesperson"),
                link:"/"
                // link: "/organization/spokesperson"
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
                link:"/"
                // link: "/gallery/videos"
            },
            {
                name: t("gallery.newsGallery"),
                link:"/"
                // link: "/gallery/news"
            },
            // {
            //     name: t("gallery.pressRelease"),
            //     link:"/"
            //     // link: "/gallery/pressrelease"
            // },
        ]
    },
    {
        name: t("common.contact"),
        icon: <Contact className="w-4 relative -top-0.5" />,
        link: "/contact",
        content: null
    },
    // {
    //     name: t("common.padavedan"),
    //     icon: <FileBadge className="w-4 relative -top-0.5" />,
    //     link: "/padavedan",
    //     content: null
    // },
    {
        name: t("common.grivences"),
        icon: <FileUser className="w-4 relative -top-0.5" />,
        link: "/grivences",
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