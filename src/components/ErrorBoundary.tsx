'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MU-TH-UR Terminal Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-screen bg-black text-red-400 flex items-center justify-center">
          <div className="text-center p-8 border border-red-600 bg-black bg-opacity-80">
            <div className="text-red-400 font-mono text-xl mb-4">
              🚨 MU-TH-UR SYSTEM ERROR 🚨
            </div>
            <div className="text-red-300 font-mono text-sm mb-4">
              CRITICAL SYSTEM MALFUNCTION DETECTED
            </div>
            <div className="text-yellow-400 font-mono text-xs mb-6">
              {this.state.error?.message || 'Unknown system error'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-600 text-red-400 font-mono text-sm hover:bg-red-600 hover:text-black transition-colors"
            >
              RESTART MU-TH-UR SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
