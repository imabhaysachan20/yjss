import Image from "next/image";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import NavBarOptions from "./NavBarOptions";

const NavBar = () => {
  return (
    <div className="py-2">
      <Container className={"flex items-center justify-between"}>
        <Link href={"/"}>
      <Image src="/logo.png" alt="logo" height={100} width={100}/>
      </Link>
    <NavBarOptions/>

      </Container>
    </div>
  );
};

export default NavBar;
