import React from 'react';
import { AISystemDiagram } from './components/AISystemDiagram';

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full">
        <AISystemDiagram />
      </div>
    </div>
  );
}

export default App;