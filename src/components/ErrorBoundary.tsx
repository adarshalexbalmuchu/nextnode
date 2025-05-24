import React from 'react';
import { toast } from '@/components/ui/sonner';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    toast.error('Something went wrong. Please try again.');
    // Optionally log error info to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Oops! An unexpected error occurred.</h2>
          <p className="mb-4">Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
