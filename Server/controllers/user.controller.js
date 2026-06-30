
// import {prisma} from "../lib/prisma.js"; // Commented out - unused
import { chatWithAi, generateImage } from "../utlis/ai.js";
import { generatePDF } from "../utlis/pdfGenerator.js";

const register = async (req, res) => {

    try {
        // const clerkId = req.auth.userId;
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token)
        console.log('the okk from the backend ')
        return res.status(200).json({
            message: "done",
            clerkId
        })

    } catch (error) {

        console.log('error at the time of creating the registration', error)
        return res.status(500).json({
            message: "registration failed!!"
        })
    }

}


const generatingTheNotes = async (req, res) => {
    try {
        const { className, subject, difficulty, topic } = req.body;

        // if (!className || !subject || !difficulty || !topic) {
        //     return res.status(400).json({
        //         message: "All fields are required",
        //     });
        // }

        // const response = await chatWithAi(className, subject, difficulty, topic);

        // const parsed = JSON.parse(response);

        // // return res.status(200).json({
        // //     message: "notes generation dome",
        // //     parsed :parsed
        // // });

        // const diagramPrompt = parsed.diagram_description || `Diagram of ${topic} for class ${className}`;

        const parsed ='A detailed, labeled illustration suitable for image generation showing a chloroplast with its double membrane, stroma, and stacked thylakoids (grana). Inside the thylakoid membrane, depict Photosystem II (P680) on the left, a water-splitting complex releasing O₂, electrons moving through plastoquinone, cytochrome b6f complex, plastocyanin, Photosystem I (P700), ferredoxin, and NADP⁺ reductase producing NADPH. Show a proton gradient across the thylakoid lumen driving ATP synthase to produce ATP on the stromal side. In the stroma, illustrate the Calvin cycle: CO₂ entering, RuBisCO catalyzing carboxylation of RuBP, formation of 3-phosphoglycerate, reduction using ATP and NADPH to G3P, and regeneration of RuBP. Include arrows indicating energy flow (light → ATP/NADPH → sugar) and label key molecules (H₂O, O₂, ADP, Pi, ATP, NADP⁺, NADPH, CO₂, RuBP, PGA, G3P).'

        // if (String(difficulty) == 'hard') {
            const image = await generateImage(parsed)
            return res.status(200).json({
            message: "notes generation done",
            image :image
        });
            
            // return generatePDF(res, response, image, "hard")
        // } else if (String(difficulty) == 'medium') {
        //     return generatePDF(res, response, '', 'medium')
        // }

        // // return generatePDF(res, response, '', 'easy')
        // return

    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            message: "notes generation failed",
        });
    }
}

export {
    register,
    generatingTheNotes
}