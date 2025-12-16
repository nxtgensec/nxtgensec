import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import CoursesSection from "@/components/courses-section"
import InternshipsSection from "@/components/internships-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import ScrollAnimations from "@/components/scroll-animations"
import FloatingElements from "@/components/floating-elements"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 relative">
      <CustomCursor />
      <FloatingElements />
      <ScrollAnimations />

      <Navigation />

      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="courses">
        <CoursesSection />
      </section>

      <section id="internships">
        <InternshipsSection />
      </section>

      <Footer />
    </main>
  )
}
