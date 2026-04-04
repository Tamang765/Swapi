import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LinkButton } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <h1>SWAPI App</h1>
          <p>Shared layout and reusable UI are now set up.</p>
          <LinkButton href="/">Get started</LinkButton>
        </Container>
      </main>
      <Footer />
    </>
  );
}
