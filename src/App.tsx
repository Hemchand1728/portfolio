import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { Cursor, Nav, Preloader, ScrollProgress } from "./components/Chrome";
import { About, Contact, Credentials, Experience, Footer, Hero, Projects, Skills } from "./components/Sections";
import { useTheme } from "./useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [ready, setReady] = useState(false);

  // Smooth, inertial scrolling; in-page anchor links glide to their section
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -72 } });
    if (!ready) lenis.stop();
    return () => lenis.destroy();
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <Cursor />
      <Nav theme={theme} toggleTheme={toggle} ready={ready} />
      <main>
        <Hero theme={theme} ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
