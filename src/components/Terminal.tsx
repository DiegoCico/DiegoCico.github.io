import { useState } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Diego\'s portfolio terminal!' },
    { type: 'output', content: 'Diego Cicotoste - Northeastern University \'26' },
    { type: 'output', content: 'Future SDE @AWS | Born in Brazil 🇧🇷' },
    { type: 'output', content: 'Type "help" for available commands' },
  ]);

  const commands = {
    help: () => [
      'Available commands:',
      '  about    - Learn more about Diego',
      '  projects - View recent projects', 
      '  contact  - Get contact information',
      '  clear    - Clear terminal',
      '  whoami   - Display user info'
    ],
    about: () => [
      'Diego Cicotoste',
      'Computer Science @ Northeastern University',
      'Passionate about automation and building scalable systems',
      '72+ GitHub projects and counting!'
    ],
    projects: () => [
      'Recent Projects:',
      '• CS4550 - Web Development (27 days ago)',
      '• Alexa Smart Home Automation',
      '• Automated House Search Bot',
      '• Personal Productivity Mobile App'
    ],
    contact: () => [
      'Contact Information:',
      '📧 Email: Available on resume',
      '💼 LinkedIn: Available in navigation',
      '☕ Coffee Chat: Schedule via button below'
    ],
    whoami: () => ['diego@northeastern'],
    clear: () => []
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    
    const newHistory = [...history, { type: 'input', content: `diego@portfolio:~$ ${input}` }];
    
    if (command === 'clear') {
      setHistory([]);
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      output.forEach(line => {
        newHistory.push({ type: 'output', content: line });
      });
      setHistory(newHistory);
    } else if (command) {
      newHistory.push({ type: 'output', content: `Command not found: ${command}. Type "help" for available commands.` });
      setHistory(newHistory);
    }
    
    setInput('');
  };

  return (
    <div id="terminal" className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
          <div className="terminal-title">SESSION - diego@northeastern</div>
        </div>
        <div className="terminal-content">
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              <span className={line.type === 'input' ? 'prompt-line' : 'output'}>
                {line.content}
              </span>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="terminal-input-form">
            <div className="terminal-line">
              <span className="prompt">diego@portfolio:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal-input"
                autoFocus
                spellCheck={false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;