import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function createChatSession() {
    try {
        const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API key is missing");
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                      {text: "Generate a recommended computer build based on a THB 20,000 to 30,000 budget for Gaming. For each part, provide 2-3 options with details including productName, productDescription, and estimatePrice for the following components: CPU, mainboard, VGA, RAM, SSD, HDD, PSU, PCCase, cooler, and monitor. Respond in JSON format."},
                    ],
                  },
                  {
                    role: "model",
                    parts: [
                      {text: "```json\n{\n  \"Components\": {\n    \"CPU\": [\n      {\n        \"productName\": \"AMD Ryzen 5 5600X\",\n        \"productDescription\": \"6-core, 12-thread CPU with excellent performance for gaming and general use.\",\n        \"estimatePrice\": \"7000\" \n      },\n      {\n        \"productName\": \"Intel Core i5-12400F\",\n        \"productDescription\": \"6-core, 12-thread CPU with good value for gaming, especially at 1080p resolution.\",\n        \"estimatePrice\": \"6500\" \n      }\n    ],\n    \"Mainboard\": [\n      {\n        \"productName\": \"ASUS TUF B550M-PLUS\",\n        \"productDescription\": \"Micro-ATX motherboard with good features for Ryzen 5000 series CPUs, including PCIe 4.0 support.\",\n        \"estimatePrice\": \"4500\" \n      },\n      {\n        \"productName\": \"MSI B660M Mortar WiFi\",\n        \"productDescription\": \"Micro-ATX motherboard with good features for Intel 12th Gen CPUs, including WiFi 6.\",\n        \"estimatePrice\": \"5000\" \n      }\n    ],\n    \"VGA\": [\n      {\n        \"productName\": \"NVIDIA GeForce GTX 1660 Super\",\n        \"productDescription\": \"A powerful graphics card for 1080p gaming at high settings, offering good value for the price.\",\n        \"estimatePrice\": \"8000\" \n      },\n      {\n        \"productName\": \"AMD Radeon RX 6600\",\n        \"productDescription\": \"A competitive graphics card with good performance for 1080p and 1440p gaming.\",\n        \"estimatePrice\": \"9000\" \n      }\n    ],\n    \"RAM\": [\n      {\n        \"productName\": \"Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200MHz\",\n        \"productDescription\": \"Reliable and fast 16GB dual-channel kit for smooth gaming performance.\",\n        \"estimatePrice\": \"3000\" \n      },\n      {\n        \"productName\": \"Kingston Fury Beast 16GB (2x8GB) DDR4-3600MHz\",\n        \"productDescription\": \"High-speed 16GB dual-channel kit for slightly better performance, but potentially more expensive.\",\n        \"estimatePrice\": \"3500\" \n      }\n    ],\n    \"SSD\": [\n      {\n        \"productName\": \"Samsung 970 EVO Plus 500GB NVMe SSD\",\n        \"productDescription\": \"Fast NVMe SSD for the operating system and frequently used games.\",\n        \"estimatePrice\": \"3000\" \n      },\n      {\n        \"productName\": \"WD Black SN750 500GB NVMe SSD\",\n        \"productDescription\": \"Another fast NVMe SSD with good performance and value.\",\n        \"estimatePrice\": \"2800\" \n      }\n    ],\n    \"HDD\": [\n      {\n        \"productName\": \"Seagate BarraCuda 1TB 7200RPM HDD\",\n        \"productDescription\": \"Large capacity hard drive for storing games and other files.\",\n        \"estimatePrice\": \"1500\" \n      },\n      {\n        \"productName\": \"WD Blue 1TB 7200RPM HDD\",\n        \"productDescription\": \"Another good option for a 1TB hard drive with reliable performance.\",\n        \"estimatePrice\": \"1600\" \n      }\n    ],\n    \"PSU\": [\n      {\n        \"productName\": \"Corsair CX550F RGB 550W 80 Plus Bronze\",\n        \"productDescription\": \"A reliable PSU with enough power for the build and good efficiency.\",\n        \"estimatePrice\": \"3500\" \n      },\n      {\n        \"productName\": \"EVGA 600 BR 600W 80 Plus Bronze\",\n        \"productDescription\": \"Another good option with slightly more power and good efficiency.\",\n        \"estimatePrice\": \"3800\" \n      }\n    ],\n    \"PCCase\": [\n      {\n        \"productName\": \"Cooler Master MasterBox Q300L\",\n        \"productDescription\": \"A compact and stylish case with good airflow and cable management.\",\n        \"estimatePrice\": \"2000\" \n      },\n      {\n        \"productName\": \"Fractal Design Focus G\",\n        \"productDescription\": \"A well-designed case with excellent airflow and good sound dampening.\",\n        \"estimatePrice\": \"2500\" \n      }\n    ],\n    \"Cooler\": [\n      {\n        \"productName\": \"Cooler Master Hyper 212 Black Edition\",\n        \"productDescription\": \"An effective and affordable CPU cooler for general use.\",\n        \"estimatePrice\": \"1000\" \n      },\n      {\n        \"productName\": \"Arctic Freezer 34 eSports DUO\",\n        \"productDescription\": \"A slightly better CPU cooler with better cooling performance.\",\n        \"estimatePrice\": \"1200\" \n      }\n    ],\n    \"Monitor\": [\n      {\n        \"productName\": \"Acer Nitro XV240Y Pbmiiprzx\",\n        \"productDescription\": \"A 24-inch 144Hz Full HD monitor with good response time for fast-paced games.\",\n        \"estimatePrice\": \"6000\" \n      },\n      {\n        \"productName\": \"ASUS TUF Gaming VG279QM\",\n        \"productDescription\": \"A 27-inch 144Hz 1440p monitor with good color accuracy and response time for smoother visuals.\",\n        \"estimatePrice\": \"10000\" \n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* Prices are estimated and may vary depending on the retailer and current market conditions.\n* This build prioritizes performance and value within the budget.\n* Consider upgrading the GPU to a more powerful model if you're willing to spend more.\n* You may also need to purchase a keyboard, mouse, and operating system separately. \n"},
                    ],
                  },
            ],
        });

        return chatSession

    } catch (error) {
        console.error('Error running AI model:', error);
    }
}