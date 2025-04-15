import React from 'react';
import { AISystemDiagram } from './components/AISystemDiagram';

function App() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-[1200px] aspect-[3/2] p-4">
        <AISystemDiagram />
      </div>
    </div>
  );
}

export default App;