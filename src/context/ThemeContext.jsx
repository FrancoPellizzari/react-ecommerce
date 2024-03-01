import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme) === "light" ? "dark": "light");
    };

    const themeContextValues = {
        theme,
        toggleTheme,
    };

    return(
        <ThemeContext.Provider value={themeContextValues}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };