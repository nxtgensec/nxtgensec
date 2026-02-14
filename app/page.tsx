import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CoursesSection from "@/components/courses-section"
import ProjectsSection from "@/components/projects-section"
import TeamSection from "@/components/team-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import ScrollAnimations from "@/components/scroll-animations"

export default function Home() {
  return (
    <>
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gray-950 -z-10"></div>
      
      {/* Scrollable Content */}
      <main className="min-h-screen relative">
        <CustomCursor />
        <ScrollAnimations />

        <Navigation />

      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="learning">
        <CoursesSection />
      </section>

      <section id="approach">
        <ProjectsSection />
      </section>

      <section id="team">
        <TeamSection />
      </section>

      <Footer />
    </main>
    </>
  )
}
