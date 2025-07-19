import React, { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you with SparkPath today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;
        
        // Add user message
        const newMessage = { text: inputMessage, isBot: false };
        setMessages([...messages, newMessage]);
        setInputMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-box">
                <div className="chatbot-header">
                    <div className="chatbot-header-content">
                        <h2>SparkPath Assistant</h2>
                        <img src="/image1.png" alt="Logo" className="chatbot-header-logo" />
                    </div>
                    <p>Your ride-sharing companion</p>
                </div>
                <div className="chatbot-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-container ${message.isBot ? 'bot' : 'user'}`}>
                            <div className={`message ${message.isBot ? 'bot' : 'user'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
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
                        />
                        <button
                            onClick={handleSendMessage}
                            className="chatbot-send-button"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
    