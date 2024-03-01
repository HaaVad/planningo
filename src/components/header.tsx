import Image from "next/image";
import logo from "../assets/Planningo.vadstein.02.png"
import Link from "next/link";

export default function Header(){

  return (
    <header className="flex flex-row justify-center pl-6">
      <h1>Planningo</h1>
      <Link href="/" className="-mb-12">
      <Image 
      src={logo} 
      alt={"Easy peasy! Just make a plan and go for it!"}
      width={130}
      height={130}
      priority={true}
      className=""
       />
       </Link>
    </header>
  );
}