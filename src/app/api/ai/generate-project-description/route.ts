import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: GenerateProjectDescriptionBody = await req.json();

    const { experienceLevel, jobTitle, techStack } = body;

    if (!experienceLevel || !jobTitle || !techStack) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Fields Missing",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert resume writer and ATS optimization specialist.

Generate a professional project description for a resume based on the following information.

Job Title:
${jobTitle}

Experience Level:
${experienceLevel}

Tech Stack:
${techStack}

Requirements:
1. Generate ONLY the project description.
2. Write a concise, professional, and ATS-friendly description.
3. The description MUST be between 60 and 100 words.
4. Clearly describe a realistic project relevant to the specified Job Title.
5. Naturally incorporate the provided technologies from the Tech Stack.
6. Explain the project's purpose, key functionality, and technical implementation.
7. Highlight relevant technical contributions and development practices.
8. Use strong action-oriented and professional language.
9. Include relevant ATS-friendly technical keywords naturally.
10. Do NOT invent specific clients, companies, users, revenue, performance metrics, awards, certifications, or achievements.
11. Do NOT claim technologies that are not included in the provided Tech Stack unless they are fundamental to the specified technology.
12. Do NOT use first-person pronouns such as "I", "me", or "my".
13. Do NOT use bullet points.
14. Do NOT include a project title, heading, labels, or introductory text.
15. Do NOT include explanations or additional information.
16. Return ONLY the project description as plain text.
17. Do not wrap the response in quotation marks or markdown.

The final output should be a single resume-ready project description between 60 and 100 words.
`;

    const result = await generateAIContent(prompt);

    const projectDescription = result;

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Project Description created successfully",
        data: { projectDescription },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in project description API!!", error);
    return NextResponse.json<APIResponse>({
      success: false,
      message: "Something went wrong",
    });
  }
};
