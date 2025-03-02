import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  const navItems = [
    {
        name: "Home",
        link: "/",
        content: (
            <>
                <p>यह होम पेज है।</p>
            </>
        )
    },
    {
        name: "हमारे बारे में",
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
        content: (
            <>
                <p>यह अध्यक्ष पेज है।</p>
            </>
        )
    },
    {
        name: "गैलरी",
        link: "/gallery",
        content: (
            <>
                <p>यह गैलरी पेज है।</p>
            </>
        )
    },
    {
        name: "संपर्क करें",
        link: "/contact",
        content: (
            <>
                <p>यह संपर्क करें पेज है।</p>
            </>
        )
    }
];
    
    function NavBarOptions() {
        return (
            <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map((item, index) => (
                        <NavigationMenuItem key={index}>
                            
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        )
    }



export default NavBarOptions
