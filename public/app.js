const generateBtn = document.getElementById("generateBtn");
const apiKeyInput = document.getElementById("apiKey");
const transcriptInput = document.getElementById("transcript");

const executiveSummaryDiv = document.getElementById("executiveSummary");
const mainPointsList = document.getElementById("mainPoints");
const importantInsightsList = document.getElementById("importantInsights");
const finalTakeawayDiv = document.getElementById("finalTakeaway");

function renderList(element, items) {
  element.innerHTML = "";

  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    element.appendChild(li);
  });
}

generateBtn.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();
  const transcript = transcriptInput.value.trim();

  if (apiKey === "") {
    alert("Please add your Groq API key.");
    return;
  }

  if (transcript === "") {
    alert("Please paste a transcript.");
    return;
  }

  executiveSummaryDiv.innerText = "Generating summary...";
  mainPointsList.innerHTML = "";
  importantInsightsList.innerHTML = "";
  finalTakeawayDiv.innerText = "";

  try {
    const response = await fetch("/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey,
        transcript
      })
    });

    const data = await response.json();

    executiveSummaryDiv.innerText = data.executiveSummary || "";
    renderList(mainPointsList, data.mainPoints || []);
    renderList(importantInsightsList, data.importantInsights || []);
    finalTakeawayDiv.innerText = data.finalTakeaway || "";
  } catch (error) {
    executiveSummaryDiv.innerText = "Something went wrong.";
    mainPointsList.innerHTML = "";
    importantInsightsList.innerHTML = "";
    finalTakeawayDiv.innerText = "";
  }
});
