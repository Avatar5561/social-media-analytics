import { useState } from 'react';


class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { 'Content-Type': 'application/json' }) {
    headers['Authorization'] = `Bearer ${this.applicationToken}`;
    const url = `${this.baseURL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error.message);
      throw error;
    }
  }

  async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
}
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input) return;

    const flowId = import.meta.env.LANGFLOW_FLOW_ID;
    const langflowId = import.meta.env.LANGFLOW_ID;
    const applicationToken = import.meta.env.LANGFLOW_APPLICATION_TOKEN;

    const client = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);
    try {
      const response = await client.initiateSession(flowId, langflowId, input);
      const outputMessage = response.outputs[0]?.outputs[0]?.outputs?.message?.text || 'No response';
      setMessages((prev) => [...prev, { type: 'user', text: input }, { type: 'bot', text: outputMessage }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
