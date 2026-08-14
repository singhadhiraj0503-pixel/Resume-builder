import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { GenerateSummaryBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: GenerateSummaryBody = await req.json();

    const { experienceLevel, skills, jobTitle } = body;

    if (!experienceLevel || !skills || !jobTitle) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert professional resume writer and ATS optimization specialist.

Generate ONLY a professional resume summary based on the information provided below.

Job Title:
${jobTitle}

Skills:
${skills}

Experience Level:
${experienceLevel}

Requirements:
1. Write a concise, professional, and ATS-friendly resume summary.
2. The summary MUST be between 50 and 80 words.
3. Tailor the summary specifically to the provided Job Title, Skills, and Experience Level.
4. Naturally incorporate relevant industry keywords and skills that ATS systems are likely to recognize.
5. Focus on the candidate's professional strengths, technical skills, relevant expertise, and career value.
6. Use strong professional language and action-oriented terminology.
7. Do not invent experience, qualifications, achievements, certifications, companies, or technologies that were not provided.
8. Do not use first-person pronouns such as "I", "me", or "my".
9. Do not use bullet points, headings, labels, quotation marks, or markdown.
10. Return ONLY the resume summary text.
11. Do not include explanations, introductions, notes, or any additional text.
12. Ensure the summary is grammatically correct, natural, and suitable for a professional resume.

Output:
Return exactly ONE resume summary between 50 and 80 words.
`;

    const result = await generateAIContent(prompt);

    const summary = result;

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Summary created successfully",
        data: { summary },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in generate summary API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
