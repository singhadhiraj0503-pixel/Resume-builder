import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { AtsScoreBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: AtsScoreBody = await req.json();

    const { resumeText } = body;

    if (!resumeText) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Resume text missing",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer, professional recruiter, and resume optimization specialist.

Analyze the following resume and calculate an ATS compatibility score.

Resume Text:
${resumeText}

Evaluate the resume based on the following ATS and resume-quality criteria:

1. Keyword Optimization
   - Presence of relevant industry-specific and technical keywords.
   - Use of clear and standard terminology.
   - Avoidance of unnecessary keyword stuffing.

2. Skills
   - Clearly listed technical and professional skills.
   - Relevance and clarity of the listed skills.

3. Experience
   - Clear job roles, responsibilities, and professional experience.
   - Use of strong action-oriented language.
   - Relevant technical terminology.

4. Resume Structure
   - Clear and logical organization.
   - Standard resume sections such as Summary, Skills, Experience, Education, and Projects where applicable.
   - Easy for an ATS to parse.

5. Content Quality
   - Professional language.
   - Concise and relevant content.
   - Strong action verbs.
   - Clear and measurable achievements when they are actually provided.

6. Formatting Compatibility
   - Simple, ATS-friendly formatting.
   - Avoidance of excessive symbols, decorative elements, tables, columns, graphics, or unusual formatting when detectable from the provided text.

7. Contact and Basic Information
   - Check whether important information such as name, email, phone number, location, LinkedIn, or GitHub is present when applicable.
   - Do not penalize information that cannot reasonably be determined from plain text.

8. Overall Professionalism
   - Grammar and spelling.
   - Clarity and consistency.
   - Relevance to the candidate's apparent career profile.

SCORING RULES:
- Give an overall ATS score from 0 to 100.
- The score must be an integer.
- Do not automatically give a high score.
- Base the score only on the resume content provided.
- Do not assume information that is not present.
- Do not invent missing information.
- Do not compare the resume against a specific job description because no job description has been provided.
- A strong resume with clear structure, relevant keywords, strong experience descriptions, and good ATS compatibility should receive a higher score.
- A resume with missing sections, weak wording, poor keyword usage, unclear experience, or parsing issues should receive a lower score.

Provide:
- Overall ATS score.
- Short overall assessment.
- Key strengths.
- Key weaknesses.
- Specific improvements that would increase the ATS score.
- Missing or weak resume sections.
- Keyword recommendations based only on the information that can reasonably be inferred from the resume.

IMPORTANT:
- Do NOT rewrite the resume.
- Do NOT create fictional information.
- Do NOT invent skills, experience, achievements, metrics, certifications, companies, or technologies.
- Keep recommendations practical and specific.
- Return ONLY valid JSON.
- Do NOT use markdown code fences.
- Do NOT include any text before or after the JSON.

STRICT JSON OUTPUT FORMAT:

{
  "atsScore": 0,
  "overallAssessment": "Short assessment of the resume.",
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],
  "improvements": [
    "Specific improvement 1",
    "Specific improvement 2",
    "Specific improvement 3"
  ],
  "missingSections": [
    "Section 1",
    "Section 2"
  ],
  "keywordRecommendations": [
    "Keyword 1",
    "Keyword 2",
    "Keyword 3"
  ]
}

The response MUST be a valid JSON object.
The "atsScore" MUST be an integer between 0 and 100.
All other fields MUST contain appropriate strings or arrays of strings.
`;

    const result = await generateAIContent(prompt);

    const atsScore = result;

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "ATS Score generated successfully",
        data: { atsScore },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in ATS Score API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
