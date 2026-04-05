import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LandingLoading } from "@/components/landing/landing-loading";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <LandingLoading />
        </Container>
      </main>
      <Footer />
    </>
  );
}
