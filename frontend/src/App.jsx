

import './App.css';
import Chatbot from './components/Chatbot';
import Analytics from './components/Analytics';

function App() {
  return (
    <div className="app-container">
      <Analytics />
      <Chatbot />
    </div>
  );
}

export default App;