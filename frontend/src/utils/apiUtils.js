export const getErrorMessage = (err) => {
    // Pattern requested by user to safely extract string from FastAPI/Pydantic errors
    return (
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        err.message ||
        "Request failed"
    );
};
