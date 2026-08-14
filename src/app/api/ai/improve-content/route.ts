import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { ImproveContentBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: ImproveContentBody = await req.json();

    const { content } = body;

    if (!content) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Content is Missing",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert professional resume writer, career coach, and ATS optimization specialist.

Your task is to improve the resume content provided below.

Original Content:
${content}

Requirements:
1. Improve the provided content to make it more professional, clear, concise, and ATS-friendly.
2. Preserve the original meaning, facts, responsibilities, skills, technologies, qualifications, and achievements.
3. Do NOT invent or add information that is not present in the original content.
4. Do NOT create fictional achievements, metrics, percentages, companies, clients, projects, certifications, job titles, technologies, or responsibilities.
5. Improve grammar, spelling, sentence structure, clarity, and professional tone.
6. Replace weak or generic wording with strong, action-oriented language where appropriate.
7. Naturally incorporate relevant ATS-friendly terminology based ONLY on the information already present in the content.
8. Make the content easy for ATS systems to parse and understand.
9. Remove unnecessary words, repetition, filler phrases, and vague statements.
10. Keep the content concise and impactful while preserving important information.
11. Use professional resume language rather than conversational language.
12. Avoid first-person pronouns such as "I", "me", "my", "we", and "our".
13. Do not use emojis, decorative characters, or unnecessary formatting.
14. Do not use markdown unless the original content clearly requires a list or bullet structure.
15. Preserve the original type of content:
    - If the input is a paragraph, return an improved paragraph.
    - If the input contains bullet points, return improved bullet points.
    - If the input is a short statement, keep the improved version concise.
16. Do not change the factual intent or exaggerate the candidate's experience.
17. Return ONLY the improved resume content.
18. Do not include explanations, feedback, analysis, introductions, labels, or comments.
19. Do not say "Here is the improved version" or similar phrases.
20. The final response must be ready to copy and paste directly into a professional resume.

IMPORTANT:
The goal is to improve the quality and ATS compatibility of the provided content, NOT to create new content.

Output:
Return ONLY the improved resume content.
`;

    const result = await generateAIContent(prompt);

    const improvedContent = result;

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Content Improved Successfully",
        data: { improvedContent },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in improve content API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
