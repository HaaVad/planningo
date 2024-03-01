import Link from "next/link";

export default function Footer(){

  return (
    <footer className="flex flex-col justify-center">
      <Link href="/">
      <h2>Planningo</h2>
       </Link>
    </footer>
  );
}