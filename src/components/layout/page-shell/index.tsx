import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function PageShell(props: {
  children: ReactNode;
  beforeMain?: ReactNode;
  contentClassName?: string;
}) {
  const content = props.contentClassName ? (
    <div className={props.contentClassName}>{props.children}</div>
  ) : (
    props.children
  );

  return (
    <>
      <Navbar />
      {props.beforeMain}
      <main id="main-content">
        <Container>{content}</Container>
      </main>
      <Footer />
    </>
  );
}
