import ResumeBuilder from "@/components/resume-builder/ResumeBuilder";

interface ResumePageProps {
  params: Promise<{
    resumeId: string;
  }>;
}

const ResumePage = async ({ params }: ResumePageProps) => {
  const { resumeId } = await params;

  return <ResumeBuilder resumeId={resumeId} />;
};

export default ResumePage;
