import { createContext, useContext, useState } from "react";
const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}

      {loading && (
        <div className="overlay">
            <div className="position-absolute top-50 start-50">
                <div className="spinner-border text-blue" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// export const useLoading = () => useContext(LoadingContext);

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
};