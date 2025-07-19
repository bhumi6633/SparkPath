import React, { useState } from 'react';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm EcoBot+, your SparkPath assistant. How can I help you with sustainable transportation today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
<<<<<<< HEAD
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
=======
    const [isLoading, setIsLoading] = useState(false);

    const sendMessageToAI = async (message) => {
        try {
            const response = await fetch('http://localhost:5000/ai/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    ride_summary: "" // You can add ride data here for context
                })
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            return data.response;
        } catch (error) {
            console.error('Error calling AI:', error);
            return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;
        
        const userMessage = inputMessage.trim();
        const newUserMessage = { text: userMessage, isBot: false };
        
        setMessages(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const aiResponse = await sendMessageToAI(userMessage);
            const newBotMessage = { text: aiResponse, isBot: true };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            const errorMessage = { text: "Sorry, I encountered an error. Please try again.", isBot: true };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
>>>>>>> 5830a7e75858318dcab1f12fe830a7925ff5b2b3
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
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
<<<<<<< HEAD
                        {loading && (
                            <div className="message-container bot">
                                <div className="message bot">EcoBot+ is typing...</div>
=======
                        {isLoading && (
                            <div className="message-container bot">
                                <div className="message bot">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        EcoBot+ is thinking...
                                    </div>
                                </div>
>>>>>>> 5830a7e75858318dcab1f12fe830a7925ff5b2b3
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
<<<<<<< HEAD
                                disabled={loading}
=======
                                disabled={isLoading}
>>>>>>> 5830a7e75858318dcab1f12fe830a7925ff5b2b3
                            />
                            <button
                                onClick={handleSendMessage}
                                className="chatbot-send-button"
<<<<<<< HEAD
                                disabled={loading || !inputMessage.trim()}
=======
                                disabled={isLoading}
>>>>>>> 5830a7e75858318dcab1f12fe830a7925ff5b2b3
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
    