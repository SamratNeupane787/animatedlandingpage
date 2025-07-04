import Image from "next/image";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap/all";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
gsap.registerPlugin(ScrollTrigger,SplitText)
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className=" h-dvh bg-black"></div>
    </main>
  );
}
