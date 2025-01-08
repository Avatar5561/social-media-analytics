import { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'user', text: input },
    ]);

    // Fetch bot response from the API
    try {
      const response = await fetch('http://localhost:3000/run-flow', {
        method: 'POST', // Assuming POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue: input }),
      });
      const data = await response.json();

      console.log('Bot response:', data.data.outputs[0].outputs[0].messages[0].message);
      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: data.data.outputs[0].outputs[0].messages[0].message || 'Sorry, I did not understand that.' },
      ]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Error fetching response. Please try again later.' },
      ]);
    }

    // Clear input field
    setInput('');
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
