import { DetailHeader } from "@/components/detail/detail-header";
import { DetailSpecs } from "@/components/detail/detail-specs";
import { RelatedItems } from "@/components/detail/related-items";
import { getDetailPageData } from "@/modules/detail/api";
import styles from "@/components/detail/detail.module.css";

export default async function DetailPage() {
  const data = await getDetailPageData();

  return (
    <section className={styles.shell}>
      <DetailHeader title={data.title} />
      <DetailSpecs resource={data.resource} />
      <RelatedItems />
    </section>
  );
}
