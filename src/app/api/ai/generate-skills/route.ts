import { connectToDB } from "@/lib/database";
import { generateAIContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: GenerateSkillsBody = await req.json();

    const { experienceLevel, jobTitle } = body;

    if (!experienceLevel || !jobTitle) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 },
      );
    }

    const prompt = `
    You are an expert technical recruiter and ATS resume optimization specialist.
    
    Generate a list of relevant TECHNICAL SKILLS for the following job role.
    
    Job Title:
    ${jobTitle}
    
    Experience Level:
    ${experienceLevel}
    
    Requirements:
    1. Generate ONLY technical skills.
    2. Do NOT include soft skills such as communication, leadership, teamwork, problem-solving, adaptability, creativity, or time management.
    3. Select skills that are highly relevant to the specified job title and experience level.
    4. Prioritize commonly used, industry-standard, and ATS-friendly technical keywords.
    5. Include relevant programming languages, frameworks, libraries, databases, APIs, developer tools, cloud technologies, platforms, and technical concepts where applicable.
    6. Do not include unrelated, outdated, obscure, or duplicate skills.
    7. Generate between 10 and 15 technical skills.
    8. Return ONLY a JSON array.
    9. Each skill MUST be a string inside the array.
    10. DO NOT return the array as a string.
    11. DO NOT wrap the array inside another object.
    12. DO NOT use markdown code fences.
    13. DO NOT include explanations, headings, labels, or any additional text.
    
    STRICT OUTPUT FORMAT:
    ["JavaScript", "React", "Node.js", "MongoDB", "Git"]
    
    Your response MUST start with [ and end with ].
    `;

    const result = await generateAIContent(prompt);
    const skills = JSON.parse(result);

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Skills created successfully",
        data: { skills },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in generating skills API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
