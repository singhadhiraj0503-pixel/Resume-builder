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

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import { getResume } from "@/services/resume.service";
// import { IResume } from "@/types/resume.types";

// import ResumeBuilder from "@/components/resume-builder/ResumeBuilder";

// const ResumePage = () => {
//   const params = useParams();

//   const resumeId = params.resumeId as string;

//   const [resume, setResume] = useState<IResume | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadResume = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await getResume(resumeId);

//         setResume(response.data);
//       } catch (error) {
//         console.error("Failed to load resume:", error);

//         setError(
//           error instanceof Error ? error.message : "Failed to load resume",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (resumeId) {
//       loadResume();
//     }
//   }, [resumeId]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Loading resume...
//       </div>
//     );
//   }

//   if (error || !resume) {
//     return (
//       <div className="flex min-h-screen items-center justify-center text-red-500">
//         {error || "Resume not found"}
//       </div>
//     );
//   }

//   return <ResumeBuilder resumeId={resumeId} initialResume={resume} />;
// };

// export default ResumePage;
