import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function analyzeImage(file: File) {
    try {
        const mimeType = file.type;

        const fileBuffer = await file.arrayBuffer();

        const buffer = new Uint8Array(fileBuffer); // Convert arrayBuffer to Uint8Array
        const imagePart = [{
            inlineData: {
                data: Buffer.from(fileBuffer).toString("base64"), // Convert to base64 for model compatibility
                mimeType: mimeType
            },
        }];
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `You are an expert in recycling and sustainability. Analyze the given image and return a structured JSON response with the following details:

1. **Material Type**: Identify the type of material (e.g., "Aluminum", "Plastic", "Glass", "Paper", etc.).
2. **Estimated Market Price (INR per kg)**: Provide an estimated price per kg for the material in India. If unknown, return "null".
3. **Sustainability Score (1-10)**: Rate the material's sustainability on a scale from 1 (least sustainable) to 10 (most sustainable).
4. **Proper Disposal or Recycling Instructions**: Provide clear step-by-step disposal or recycling instructions.
5. **Approximate Carbon Emissions Saved (kg CO2 per kg recycled)**: Give an approximate value for CO2 savings when recycled.
6. **Potential Contaminants & Precautions**: Mention common contamination risks and how to avoid them.
7. **Market Demand**: Indicate the general demand for this material in recycling industries (e.g., "High", "Medium", "Low").
8. **Common Uses After Recycling**: List a few common products made from this recycled material.
9. **Share your confidence**: Confidence of your response in percentage from (1 - 100).

Ensure the response is in valid JSON format with the exact keys:
json
{
  "material": "<Material Type>",
  "price_per_kg": <Estimated Price in INR (null if unknown)>,
  "sustainability_score": <Score (1-10)>,
  "disposal_instructions": [
  "<Step 1>",
    "<Step 2>",
    "<Step 3>"
  ],
  "carbon_emissions_saved": "<kg CO2 per kg recycled>",
  "contaminants_precautions": [
  "<Precaution 1>",
    "<Precaution 2>",
    "<Precaution 3>"
  ],
  "market_demand": "<High/Medium/Low>",
  "recycled_uses": ["<Product 1>", "<Product 2>", "<Product 3>"]
  "confidence": <Confidence (1 - 100)>
}

`;

        const result = await model.generateContent([
            prompt,
            ...imagePart
        ]);
        const modelResponse = result.response.text();

        const jsonString = modelResponse.match(/```json\n([\s\S]*?)\n```/)?.[1];
        let parsedData;
        if (jsonString) {
            parsedData = JSON.parse(jsonString);
            console.log(parsedData);
        }

        // const analysis = parsedData;
        return parsedData;
        // console.log(analysis);
        // return {
        //     category: analysis.material,
        //     estimatedPrice: analysis.price_per_kg,
        //     carbonFootprint: analysis.carbon_emissions_saved,
        //     confidence: 100
        // };
        // return analysis;
    } catch (error) {
        // console.log(error);
        console.error('Error analyzing image with Gemini AI:', error);
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        console.log(formData);
        const file = formData.get("image") as File;
        console.log(file);

        if (!file) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        const analysis = await analyzeImage(file);
        console.log(analysis);

        return NextResponse.json(analysis);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Failed to analyze image' },
            { status: 500 }
        );
    }
}