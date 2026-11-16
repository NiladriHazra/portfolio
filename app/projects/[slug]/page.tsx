import { Suspense } from "react";
import { notFound } from "next/navigation";
import CaseStudyClient from "@/components/case-study/CaseStudyClient";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <CaseStudyClient study={study} />
    </Suspense>
  );
}
