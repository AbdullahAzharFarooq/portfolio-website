import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import SectionDivider from "@/components/SectionDivider";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <SectionDivider />
        <Process />
        <Work />
      </main>
      <Footer />
    </>
  );
}
