import Image from "next/image";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import NavBarOptions from "./NavBarOptions";

const NavBar = () => {
  return (
    <header className="py-1.5 px-2 sm:px-1.5 md:px-1.5 md:px-0 shadow-md">
      <Container className={"flex items-center justify-between"}>
        <Link href={"/"}>
      <Image src="/logo.png" alt="logo" height={80} width={80} className="hover:opacity-90 transition transition-opacity"/>
      </Link>
    <NavBarOptions/>

      </Container>
    </header>
  );
};

export default NavBar;
