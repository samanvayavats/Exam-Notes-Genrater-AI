export async function chatWithAi(className, subject, difficulty, topic) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "nvidia/nemotron-3-super-120b-a12b:free",
            messages: [
                {
                    role: "system",
                    content: "You are an expert teacher who explains concepts clearly based on student level. Always respond ONLY in valid JSON."
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        class: className,
                        subject: subject,
                        difficulty: difficulty,
                        topic: topic,
                        instructions: {
                            easy: {
                                description: "Generate very short and simple notes",
                                format: {
                                    title: "string",
                                    points: ["short bullet points (5-7 max)"],
                                    keywords: ["important terms"]
                                }
                            },
                            medium: {
                                description: "Generate deep explanation with diagrams",
                                format: {
                                    title: "string",
                                    introduction: "detailed intro",
                                    concepts: ["in-depth explanation points"],
                                    diagram: "text-based diagram (ASCII or labeled)",
                                    applications: ["real-world applications"],
                                    important_questions: ["2-3 conceptual questions"],
                                    summary: "final summary"
                                }
                            },
                            hard: {
                                description: "Generate deep explanation with diagram description for later image generation",
                                format: {
                                    title: "string",
                                    introduction: "detailed intro",
                                    concepts: ["in-depth explanation points"],
                                    diagram_description: "clear and detailed description of the diagram for image generation (no ASCII)",
                                    applications: ["real-world applications"],
                                    important_questions: ["2-3 conceptual questions"],
                                    summary: "final summary"
                                }
                            }
                        },
                        output_rules: [
                            "Return ONLY JSON",
                            "Do not include extra text",
                            "Follow the format strictly based on difficulty",
                            "Make content suitable for the given class level"
                        ]
                    })
                }
            ]
        })
    });

    const result = await response.json();

    console.log("AI RESPONSE:", result);

    if (!result.choices || result.choices.length === 0) {
        throw new Error("Invalid AI response");
    }

    const aiContent = result.choices[0].message.content;
    return aiContent
}

export async function generateImage(prompt) {
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": process.env.GEMINI_API_KEY, 
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        }
    );

    const data = await response.json();

    console.log("GEMINI RESPONSE:", data);

    // ✅ Safe extraction
    const result =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
        throw new Error("Invalid Gemini response");
    }

    return result;
}