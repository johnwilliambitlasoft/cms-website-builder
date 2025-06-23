"use client";
import React, { createContext, useContext } from "react";
import { message } from "antd";

// Create a context for the message API
const MessageContext = createContext(null);

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
