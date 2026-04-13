const http = require("http");
const fs = require("fs");
const path = require("path");

function extractJsonObject(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not find valid JSON in model response.");
  }

  return text.slice(start, end + 1);
}

async function generateSummaryFromText(text, apiKey) {
  if (!apiKey) {
    throw new Error("Missing Groq API key.");
  }

  const groqResponse = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a professional analyst and summarizer. Always return clean valid JSON only."
          },
          {
            role: "user",
            content:
              "Read the transcript and produce a professional summary. " +
              "Return valid JSON only with exactly these fields: " +
              "executiveSummary (string), mainPoints (array of 4 to 6 ordered points), " +
              "importantInsights (array of 3 to 5 concise insights), finalTakeaway (string). " +
              "Do not include markdown. Do not include code fences. Do not include extra explanation.\n\n" +
              `Transcript:\n${text}`
          }
        ]
      })
    }
  );

  const result = await groqResponse.json();

  if (!groqResponse.ok) {
    throw new Error(result.error?.message || "Groq request failed");
  }

  const content = result.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content returned from Groq");
  }

  const jsonText = extractJsonObject(content);
  const parsed = JSON.parse(jsonText);

  return {
    executiveSummary: parsed.executiveSummary || "",
    mainPoints: Array.isArray(parsed.mainPoints) ? parsed.mainPoints : [],
    importantInsights: Array.isArray(parsed.importantInsights)
      ? parsed.importantInsights
      : [],
    finalTakeaway: parsed.finalTakeaway || ""
  };
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading page");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/styles.css") {
    const filePath = path.join(__dirname, "public", "styles.css");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading CSS");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/app.js") {
    const filePath = path.join(__dirname, "public", "app.js");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading JavaScript");
        return;
      }

      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });

    return;
  }

  if (req.method === "POST" && req.url === "/summarize") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const apiKey = (data.apiKey || "").trim();
        const transcript = (data.transcript || "").trim();

        if (!transcript) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              executiveSummary: "Please provide transcript text.",
              mainPoints: [],
              importantInsights: [],
              finalTakeaway: ""
            })
          );
          return;
        }

        const responseData = await generateSummaryFromText(transcript, apiKey);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseData));
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            executiveSummary: "Error while generating summary.",
            mainPoints: [],
            importantInsights: [error.message],
            finalTakeaway: ""
          })
        );
      }
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Page not found");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
