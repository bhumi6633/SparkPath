import React, { useState } from 'react';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you with SparkPath today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;
        const newMessage = { text: inputMessage, isBot: false };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const res = await fetch('/ai/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputMessage })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { text: data.response || 'Sorry, I could not get a response from EcoBot+.', isBot: true }]);
        } catch (err) {
            setMessages(prev => [...prev, { text: 'Sorry, there was an error connecting to EcoBot+.', isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    className="chatbot-toggle-btn"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <img src="/image1.png" alt="Open Chatbot" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                </button>
            )}
            {/* Chat Box */}
            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-header-content">
                        <h2>SparkPath Assistant</h2>
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
                                placeholder="Type your message here..."
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
    