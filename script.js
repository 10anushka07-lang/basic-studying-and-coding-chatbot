let apiKey = "";
window.onload = function () {
  apiKey = prompt("Enter your Gemini API Key:");
};
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {
    
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response — check your API key.";

    addMessage(reply, "bot");
  } catch (error) {
    addMessage("Error: " + error.message, "bot");
  }
}


function addMessage(text, sender) {
  const chatbox = document.getElementById("chatbox");
  const msg = document.createElement("div");

  msg.classList.add("message", sender);
  msg.innerText = text;

  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight; // Auto scroll
}
