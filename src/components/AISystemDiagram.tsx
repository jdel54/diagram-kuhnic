import React, { useState, useEffect } from 'react';
import { DataFlow } from './DataFlow';
import { SystemNode } from './SystemNode';
import { ActionLabel } from './ActionLabel';
import { Database, MessageSquare, Bot, Brain, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

type ColorType = 'emerald' | 'violet' | 'amber' | 'sky' | 'rose';

const AGGREGATION_MESSAGES = [
  "Processing CRM customer data...",
  "Analyzing sales patterns...",
  "Extracting email sentiments...",
  "Compiling meeting transcripts...",
  "Gathering customer feedback...",
  "Merging calendar events...",
  "Scanning support tickets...",
  "Indexing document archives...",
  "Processing chat history...",
  "Analyzing usage metrics..."
];

const LLM_MESSAGES = [
  "Identifying customer intent...",
  "Generating response options...",
  "Analyzing sentiment patterns...",
  "Processing natural language...",
  "Evaluating context...",
  "Extracting key insights...",
  "Classifying requests...",
  "Optimizing response...",
  "Learning from feedback...",
  "Applying business rules..."
];

const CHAT_MESSAGES = [
  "\"I can help optimize your workflow\"",
  "\"Let me find that information\"",
  "\"Here's a personalized solution\"",
  "\"I understand your request\"",
  "\"Would you like more details?\"",
  "\"I've analyzed your history\"",
  "\"Let me assist you with that\"",
  "\"Here's what I recommend\"",
  "\"I can explain further\"",
  "\"Based on your preferences...\""
];

const VOICE_MESSAGES = [
  "\"Processing your request now\"",
  "\"I heard you'd like help with...\"",
  "\"Let me find that for you\"",
  "\"I understand, one moment\"",
  "\"Here's what I found\"",
  "\"Would you like me to explain?\"",
  "\"I can assist with that\"",
  "\"Let me check that for you\"",
  "\"Here's my suggestion\"",
  "\"Based on what you said...\""
];

const HUMAN_MESSAGES = [
  "Customer request resolved ✓",
  "Solution implemented successfully ✓",
  "Feedback received positively ✓",
  "Task completed efficiently ✓",
  "Information delivered clearly ✓",
  "Customer satisfaction confirmed ✓",
  "Action items completed ✓",
  "Support provided effectively ✓",
  "Query resolved successfully ✓",
  "Assistance acknowledged ✓"
];

export const AISystemDiagram: React.FC = () => {
  const getRandomMessage = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const [currentPhase, setCurrentPhase] = useState(0);
  const [messages, setMessages] = useState({
    aggregation: getRandomMessage(AGGREGATION_MESSAGES),
    llm: '',
    chat: '',
    voice: '',
    human: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % 5);
    }, window.innerWidth < 768 ? 2000 : 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentPhase === 0) {
      setMessages(prev => ({
        ...prev,
        aggregation: getRandomMessage(AGGREGATION_MESSAGES),
        llm: '', chat: '', voice: '', human: ''
      }));
    } else if (currentPhase === 1) {
      setMessages(prev => ({
        ...prev,
        llm: getRandomMessage(LLM_MESSAGES),
      }));
    } else if (currentPhase === 2) {
      setMessages(prev => ({
        ...prev,
        chat: getRandomMessage(CHAT_MESSAGES),
        voice: getRandomMessage(VOICE_MESSAGES),
      }));
    } else if (currentPhase === 3) {
      setMessages(prev => ({
        ...prev,
        human: getRandomMessage(HUMAN_MESSAGES),
      }));
    } else if (currentPhase === 4) {
      setMessages({
        aggregation: getRandomMessage(AGGREGATION_MESSAGES),
        llm: '',
        chat: '',
        voice: '',
        human: ''
      });
    }
  }, [currentPhase]);

  const generateFlows = (startX: number, startY: number, endX: number, endY: number, count: number, phase: number, groupPhase: number, color: ColorType) => {
    const flows = [];
    const spread = 20;
    
    for (let i = 0; i < count; i++) {
      const offsetY = (i - (count - 1) / 2) * (spread / count);
      
      const dx = endX - startX;
      const dy = endY - startY;
      const controlPoint1X = startX + dx * 0.4;
      const controlPoint1Y = startY;
      const controlPoint2X = endX - dx * 0.4;
      const controlPoint2Y = endY;
      
      flows.push(
        <DataFlow
          key={`flow-${i}`}
          start={{ x: startX, y: startY + offsetY }}
          end={{ x: endX, y: endY }}
          controlPoint1={{ x: controlPoint1X, y: controlPoint1Y }}
          controlPoint2={{ x: controlPoint2X, y: controlPoint2Y }}
          phase={phase}
          groupPhase={groupPhase}
          color={color}
        />
      );
    }
    return flows;
  };

  const MobileDataFlow = ({ top, height, groupPhase }: { top: number; height: number; groupPhase: number }) => (
    <div className="absolute left-1/2 -translate-x-1/2" style={{ top, height }}>
      <motion.div
        className="absolute w-[2px] bg-blue-500"
        style={{ height: '100%' }}
        initial={{ scaleY: 0, opacity: 0, y: 0 }}
        animate={{
          scaleY: [0, 1],
          opacity: [0, 0.8, 0],
          y: [0, height]
        }}
        transition={{
          duration: 1,
          delay: groupPhase * 1,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  return (
    <div className="relative w-full h-full bg-white rounded-xl md:p-12 flex items-center justify-center overflow-hidden">
      {/* Desktop Layout */}
      <div className="relative w-[1200px] h-[500px] hidden md:block">
        {/* Data Flows Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {generateFlows(120, 250, 320, 250, 2, 0, 0, "emerald")}
          {generateFlows(120, 250, 320, 250, 2, 1, 0, "emerald")}
          {generateFlows(400, 250, 520, 250, 2, 0, 1, "violet")}
          {generateFlows(400, 250, 520, 250, 2, 1, 1, "violet")}
          {generateFlows(600, 250, 720, 150, 2, 0, 2, "amber")}
          {generateFlows(600, 250, 720, 350, 2, 1, 2, "amber")}
          {generateFlows(800, 150, 1000, 250, 2, 0, 3, "sky")}
          {generateFlows(800, 350, 1000, 250, 2, 1, 3, "sky")}
        </div>

        {/* Nodes Layer */}
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          {/* Business Systems */}
          <div className="absolute left-0 top-[180px]">
            <div className="flex flex-col items-center">
              <SystemNode 
                title="Business Systems"
                icon={<Building2 className="w-5 h-5" />}
                className="w-32"
                color="emerald"
              />
              <div className="mt-4 text-xs text-gray-500 space-y-1.5">
                <div className="text-center">CRM</div>
                <div className="text-center">ERP</div>
                <div className="text-center">Analytics</div>
                <div className="text-center">Email</div>
                <div className="text-center">Calendar</div>
              </div>
            </div>
          </div>
          
          {/* Data Aggregation */}
          <div className="absolute left-[320px] top-[250px] -translate-y-1/2">
            <SystemNode
              title="Data Aggregation"
              icon={<Brain className="w-6 h-6" />}
              className="w-36"
              color="violet"
            />
          </div>

          {/* LLM Models */}
          <div className="absolute left-[520px] top-[250px] -translate-y-1/2">
            <SystemNode
              title="LLM Models"
              icon={<MessageSquare className="w-5 h-5" />}
              className="w-32"
              color="amber"
            />
          </div>

          {/* Agents */}
          <div className="absolute left-[720px] top-[150px] -translate-y-1/2">
            <SystemNode
              title="Chat Agents"
              icon={<Bot className="w-5 h-5" />}
              className="w-32"
              color="sky"
            />
          </div>
          <div className="absolute left-[720px] top-[350px] -translate-y-1/2">
            <SystemNode
              title="Voice Agents"
              icon={<Bot className="w-5 h-5" />}
              className="w-32"
              color="sky"
            />
          </div>

          {/* Human */}
          <div className="absolute right-[40px] top-[250px] -translate-y-1/2">
            <SystemNode
              title="Human Being"
              icon={<User className="w-5 h-5" />}
              className="w-32"
              color="rose"
            />
          </div>
        </div>

        {/* Action Labels Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          {/* Data Aggregation Label */}
          {messages.aggregation && (
            <div className="absolute left-[320px] top-[170px] transform -translate-x-1/2">
              <ActionLabel 
                text={messages.aggregation}
                isVisible={currentPhase === 0}
                color="#7c3aed"
              />
            </div>
          )}

          {/* LLM Label */}
          {messages.llm && (
            <div className="absolute left-[520px] top-[170px] transform -translate-x-1/2">
              <ActionLabel 
                text={messages.llm}
                isVisible={currentPhase === 1}
                color="#d97706"
              />
            </div>
          )}

          {/* Chat Agent Label */}
          {messages.chat && (
            <div className="absolute left-[720px] top-[70px] transform -translate-x-1/2">
              <ActionLabel 
                text={messages.chat}
                isVisible={currentPhase === 2}
                color="#0284c7"
              />
            </div>
          )}

          {/* Voice Agent Label */}
          {messages.voice && (
            <div className="absolute left-[720px] top-[420px] transform -translate-x-1/2">
              <ActionLabel 
                text={messages.voice}
                isVisible={currentPhase === 2}
                color="#0284c7"
              />
            </div>
          )}

          {/* Human Label */}
          {messages.human && (
            <div className="absolute right-[200px] top-[320px]">
              <ActionLabel 
                text={messages.human}
                isVisible={currentPhase === 3}
                color="#e11d48"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - Adding back Flow Lines */}
      <div className="relative w-full flex flex-col items-center space-y-24 py-8 pb-16 md:hidden">

        {/* Flow Lines Container (Behind Nodes) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
           {/* Estimates: py-8=32px, nodeH=80px, space-y-24=96px */}
           {/* Flow 1: top=32+80=112, height=96 */}
           <MobileDataFlow top={112} height={96} groupPhase={0} />
           {/* Flow 2: top=112+96+80=288, height=96 */}
           <MobileDataFlow top={288} height={96} groupPhase={1} />
        </div>

        {/* Data Aggregation Node + Notification */}
        <div className="relative w-[80%]" style={{ zIndex: 5 }}> {/* Ensure nodes are above flows */}
          <SystemNode
            title="Data Aggregation"
            icon={<Brain className="w-6 h-6" />}
            className="w-full"
            color="violet"
          />
          {messages.aggregation && (
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-auto">
              <ActionLabel 
                text={messages.aggregation}
                isVisible={currentPhase === 0}
                color="#7c3aed"
              />
            </div>
          )}
        </div>

        {/* LLM Models Node + Notification */}
        <div className="relative w-[80%]" style={{ zIndex: 5 }}> {/* Ensure nodes are above flows */}
          <SystemNode
            title="LLM Models"
            icon={<MessageSquare className="w-5 h-5" />}
            className="w-full"
            color="amber"
          />
           {messages.llm && (
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-auto">
              <ActionLabel 
                text={messages.llm}
                isVisible={currentPhase === 1}
                color="#d97706"
              />
            </div>
          )}
        </div>

        {/* AI Agents Node + Notification */}
        <div className="relative w-[80%]" style={{ zIndex: 5 }}> {/* Ensure nodes are above flows */}
          <SystemNode
            title="AI Agents"
            icon={<Bot className="w-5 h-5" />}
            className="w-full"
            color="sky"
          />
          {messages.chat && (
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-auto">
              <ActionLabel 
                text={messages.chat}
                isVisible={currentPhase === 2}
                color="#0284c7"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};