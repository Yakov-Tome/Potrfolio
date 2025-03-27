"use client";

import { blogs } from "@/app/data/blogs";
import { portfolio } from "@/app/data/portfolio";
import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const ContentContext = createContext();

// 2. Custom hook to manage content state and logic
const useContentProvider = () => {
  const blogsData = blogs;
  const portfolioData = portfolio;

  const [singleData, setSingleData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleBlogsData = (id) => {
    const found = blogsData.find((item) => item?.id === id);
    if (found) {
      setSingleData(found);
      setIsOpen(true);
    }
  };

  const handlePortfolio = (id) => {
    const found = portfolioData.find((item) => item?.id === id);
    if (found) {
      setSingleData(found);
      setIsOpen(true);
    }
  };

  return {
    singleData,
    isOpen,
    setIsOpen,
    blogsData,
    portfolioData,
    handleBlogsData,
    handlePortfolio,
  };
};

// 3. Provider component to wrap the app
export const ContentProvider = ({ children }) => {
  const value = useContentProvider();
  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

// 4. Custom hook to consume the context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
