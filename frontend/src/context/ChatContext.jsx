import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🇵🇰 Salam! I am your Pakistan travel assistant. Ask me about any place in Pakistan – prices, best time to visit, activities, and more!' }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([{ role: 'assistant', content: '🇵🇰 Salam! Ask me about Pakistan travel.' }]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
};