'use client';

import { notFound } from 'next/navigation';
import { demos } from '@/lib/demos';
import { DemoPageTemplate } from '@/components/systems/DemoPageTemplate';

interface DemoPageProps {
  params: {
    slug: string;
  };
}

export default function DemoPage({ params }: DemoPageProps) {
  const demo = demos.find((d) => d.slug === params.slug);

  if (!demo) {
    notFound();
  }

  return (
    <DemoPageTemplate
      systemTitle={demo.systemTitle}
      systemSlug={demo.slug}
      demoTitle={demo.demoTitle}
      demoDescription={demo.demoDescription}
      videoUrl={demo.videoUrl}
      videoDuration={demo.videoDuration}
      problem={demo.problem}
      result={demo.result}
      prompt={demo.prompt}
      language={demo.language}
      metrics={demo.metrics}
      beforeAfter={demo.beforeAfter}
      steps={demo.steps}
      tools={demo.tools}
      downloadFile={demo.downloadFile}
      nextSystemSlug={demo.nextSystemSlug}
      nextSystemTitle={demo.nextSystemTitle}
    />
  );
}
