import { Navigation } from "@/components/Navigation";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { TechStack } from "@/sections/TechStack";
import { Projects } from "@/sections/Projects";
import { CodePlayground } from "@/sections/CodePlayground";
import { Quotes } from "@/sections/Quotes";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#171717]">
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <CodePlayground />
      <Quotes />
      <Contact />
      <Footer />
    </div>
  );
}
