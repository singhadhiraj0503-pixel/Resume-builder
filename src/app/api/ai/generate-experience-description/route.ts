import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: GenerateExperienceDescriptionBody = await req.json();

    const { experienceLevel, yearsOfExperience, jobRole, techStack } = body;

    if (!experienceLevel || !yearsOfExperience || !jobRole || !techStack) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Missing Fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert professional resume writer and ATS optimization specialist.

Generate a professional work experience description based on the following information:

Experience Level:
${experienceLevel}

Years of Experience:
${yearsOfExperience}

Job Role:
${jobRole}

Tech Stack:
${techStack}

Requirements:
1. Generate ONLY the work experience description.
2. Write a professional, concise, and ATS-friendly description suitable for a resume.
3. The description MUST be between 80 and 120 words.
4. Tailor the description specifically to the provided Job Role, Experience Level, Years of Experience, and Tech Stack.
5. Describe realistic responsibilities and technical contributions appropriate for the specified role and experience level.
6. Naturally incorporate relevant technologies and ATS-friendly keywords from the provided Tech Stack.
7. Focus on software development responsibilities, technical implementation, collaboration with development processes, application development, debugging, testing, API integration, database work, or other responsibilities relevant to the job role.
8. Use strong action-oriented verbs such as developed, implemented, designed, optimized, integrated, maintained, automated, tested, deployed, and improved where appropriate.
9. Do NOT invent specific companies, clients, products, projects, revenue figures, percentages, performance metrics, awards, certifications, or achievements.
10. Do NOT claim specific accomplishments that were not provided in the input.
11. Do NOT exaggerate the candidate's experience or responsibilities.
12. Do NOT use first-person pronouns such as "I", "me", or "my".
13. Do NOT use bullet points.
14. Do NOT include a job title, heading, label, introduction, or conclusion.
15. Do NOT include explanations or additional information.
16. Return ONLY the work experience description as plain text.
17. Do not wrap the response in quotation marks or markdown.
18. Make the description natural, professional, grammatically correct, and ready to paste directly into a resume.

The final output MUST be a single work experience description between 80 and 120 words.
`;

    const result = await generateAIContent(prompt);

    const workExperienceDescription = result;

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Work Experience Description created successfully",
        data: { workExperienceDescription },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in experience description API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
