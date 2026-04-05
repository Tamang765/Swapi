import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LandingLoading } from "@/components/landing/landing-loading";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Container>
          <LandingLoading />
        </Container>
      </main>
      <Footer />
    </>
  );
}
