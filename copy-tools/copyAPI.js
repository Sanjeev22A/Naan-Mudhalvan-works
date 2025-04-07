const API_KEY = 'ENTER_YOUR_API_KEY'; 

async function askGeminiFlash(question) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: question }
          ]
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      console.log("Gemini Flash Response:", reply);
      
    } catch (error) {
      console.error("Error fetching from Gemini:", error);
    
    }
  }

  document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      console.log("Selected:", selectedText);
      askGeminiFlash(selectedText);
    }
  });
