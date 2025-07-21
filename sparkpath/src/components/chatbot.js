import React, { useState } from 'react';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm EcoBot+, your SparkPath assistant. How can I help you with sustainable transportation today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const callGemini = async (message) => {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) return 'Error: API key not found.';

    try {
        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text: `Reply concisely and clearly in 2-3 lines max. Question: ${message}`
                                }
                            ]
                        }
                    ]
                })
            }
        );
        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    } catch (err) {
        return 'Error calling Gemini API.';
    }
};


    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const newMessage = { text: inputMessage, isBot: false };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setLoading(true);

        const reply = await callGemini(inputMessage);
        setMessages(prev => [...prev, { text: reply, isBot: true }]);
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button
                    className="chatbot-toggle-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <img src="/image1.png" alt="Open Chatbot" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                </button>
            )}
            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-header-content">
                        <h2>EcoBot+ Assistant</h2>
                        <button
                            className="chatbot-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Chatbot"
                        >
                            ×
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message-container ${message.isBot ? 'bot' : 'user'}`}>
                                <div className={`message ${message.isBot ? 'bot' : 'user'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message-container bot">
                                <div className="message bot">EcoBot+ is typing...</div>
                            </div>
                        )}
                    </div>
                    <div className="chatbot-input">
                        <div className="input-container">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me about sustainable transportation..."
                                className="chatbot-input-field"
                                disabled={loading}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="chatbot-send-button"
                                disabled={loading || !inputMessage.trim()}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;
