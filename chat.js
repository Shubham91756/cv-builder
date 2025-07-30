// chat.js

function saveApiKey() {
  const key = document.getElementById('apiKey').value.trim();
  if (key) {
    localStorage.setItem('openai_api_key', key);
    document.getElementById('apiKeyInputBox').style.display = 'none';
  }
}

const chatBox = document.getElementById('chatBox');
const messages = document.getElementById('chatMessages');
const input = document.getElementById('userInput');

function toggleChat() {
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const typing = [...messages.children].find(el => el.textContent.includes('Typing...'));
  if (typing) typing.remove();
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('openai_api_key')) {
    document.getElementById('apiKeyInputBox').style.display = 'none';
  }
});

async function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage('You', userMsg);
  input.value = '';
  appendMessage('AI', 'Typing...');

  const apiKey = localStorage.getItem('openai_api_key');
  if (!apiKey) {
    removeTyping();
    appendMessage('AI', '⚠️ API Key not found. Please enter your key above.');
    return;
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMsg }],
      }),
    });

    const data = await res.json();
    removeTyping();

    if (res.ok && data.choices?.[0]?.message?.content) {
      appendMessage('AI', data.choices[0].message.content.trim());
    } else {
      appendMessage('AI', `⚠️ Error: ${data.error?.message || 'No reply received.'}`);
    }

  } catch (err) {
    removeTyping();
    appendMessage('AI', '⚠️ Network error.');
  }
}
