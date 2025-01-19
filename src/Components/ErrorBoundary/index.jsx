"use client";
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(
            "ErrorBoundary  Component caught an error:",
            error,
            errorInfo
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                <h1 className="text-white my-[10px]">
                    Something went wrong. Please try again later.
                </h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
