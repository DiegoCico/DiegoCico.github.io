import { useState, useEffect } from 'react';
import { useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: string; content: string; color?: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  // Pre-scripted commands to type automatically
  const autoCommands = [
    { command: 'whoami', delay: 1000 },
    { command: 'origin', delay: 2000 },
    { command: 'education', delay: 2000 },
    { command: 'status', delay: 1500 },
  ];

  const commands = {
    help: () => [
      { content: 'Available commands:', color: '#ff6666' },
      { content: '  whoami     - Display user info', color: '#ff6666' },
      { content: '  origin     - Show origin and current location', color: '#ff6666' },
      { content: '  education  - Display education info', color: '#ff6666' },
      { content: '  status     - Show current status', color: '#ff6666' },
      { content: '  projects   - View recent projects', color: '#ff6666' },
      { content: '  contact    - Get contact information', color: '#ff6666' },
      { content: '  clear      - Clear terminal', color: '#ff6666' },
    ],
    whoami: () => [
      { content: 'Diego Cicotoste', color: '#ff6666' }
    ],
    origin: () => [
      { content: 'Brazil → USA', color: '#ff6666' },
      { content: 'Born in Brazil 🇧🇷', color: '#ff6666' },
      { content: 'Currently studying in Boston, MA 🇺🇸', color: '#ff6666' }
    ],
    education: () => [
      { content: 'Northeastern University', color: '#ff6666' },
      { content: 'Bachelor of Science in Computer Science', color: '#ff6666' },
      { content: 'Class of 2026', color: '#ff6666' },
      { content: 'Concentration: Software', color: '#ff6666' }
    ],
    status: () => [
      { content: 'Current Status:', color: '#ff6666' },
      { content: '🎓 CS Student at Northeastern University', color: '#ff6666' },
      { content: '💼 Incoming SDE @AWS', color: '#ff6666' },
      { content: '🤖 Automation & AI enthusiast', color: '#ff6666' }
    ],
    projects: () => [
      { content: 'Current Project:', color: '#ff6666' },
      { content: 'Coinly: website to track my spending using AWS as my cloud provider', color: '#ff6666' },
    ],
    contact: () => [
      { content: 'Contact Information:', color: '#ff6666' },
      { content: '📧 Email: cicotosted@gmail.com', color: '#ff6666' },
      { content: '💼 LinkedIn: https://www.linkedin.com/in/diego-cicotoste/', color: '#ff6666' },
      { content: '☕ Coffee Chat: https://calendly.com/cicotosted/coffee-chat', color: '#ff6666' }
    ],
    clear: () => []
  };

  // Auto-typing animation
  useEffect(() => {
    if (currentCommandIndex < autoCommands.length) {
      const currentCmd = autoCommands[currentCommandIndex];
      const timer = setTimeout(() => {
        typeCommand(currentCmd.command);
      }, currentCmd.delay);

      return () => clearTimeout(timer);
    }
  }, [currentCommandIndex]);

  const typeCommand = async (command: string) => {
    setIsTyping(true);
    
    // Add the prompt line
    const newHistory = [...history, { 
      type: 'input', 
      content: `diego@portfolio:~$ `, 
      color: '#00ff00' 
    }];
    setHistory(newHistory);

    // Type each character with delay
    for (let i = 0; i <= command.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: 'input',
          content: `diego@portfolio:~$ ${command.slice(0, i)}`,
          color: '#00ff00'
        };
        return updated;
      });
    }

    // Add command output
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      setHistory(prev => [...prev, ...output.map(line => ({ type: 'output', ...line }))]);
    }

    setIsTyping(false);
    setCurrentCommandIndex(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    
    const newHistory = [...history, { 
      type: 'input', 
      content: `diego@portfolio:~$ ${input}`,
      color: '#00ff00'
    }];
    
    if (command === 'clear') {
      setHistory([]);
      setCurrentCommandIndex(0); // Reset auto commands
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      setHistory([...newHistory, ...output.map(line => ({ type: 'output', ...line }))]);
    } else if (command) {
      newHistory.push({ 
        type: 'output', 
        content: `Command not found: ${command}. Type "help" for available commands.`,
        color: '#ff6666'
      });
      setHistory(newHistory);
    }
    
    setInput('');
  };

  useEffect(() => {
    const el = terminalContentRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [history, isTyping]);



  return (
    <div id="terminal" className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <div className="terminal-title">diego@life: ~/portfolio</div>
        </div>
        <div className="terminal-content" ref={terminalContentRef}>
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              {line.type === 'input' ? (
                <span>
                  <span style={{ color: '#00ff00' }}>diego@portfolio:~$ </span>
                  <span style={{ color: '#ffffff' }}>
                    {line.content.replace('diego@portfolio:~$ ', '')}
                  </span>
                  {index === history.length - 1 && isTyping && (
                    <span className="cursor-blink">█</span>
                  )}
                </span>
              ) : (
                <span style={{ color: line.color || '#ff6666' }}>
                  {line.content}
                </span>
              )}
            </div>
          ))}
          
          {!isTyping && currentCommandIndex >= autoCommands.length && (
            <form onSubmit={handleSubmit} className="terminal-input-form">
              <div className="terminal-line">
                <span className="prompt">diego@portfolio:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="terminal-input"
                  spellCheck={false}
                  placeholder="Type 'help' for commands..."
                  style={{ color: '#ffffff' }}
                />
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Terminal;