import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/ui/PageHeader.jsx';
import { Panel } from '../../components/ui/Panel.jsx';
import { TextField, SelectField } from '../../components/ui/Field.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Alert } from '../../components/ui/Alert.jsx';
import { http } from '../../lib/http.js';

export function WhatsAppAdminPage() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [testMode, setTestMode] = useState(false);
  const [testNumbers, setTestNumbers] = useState('');
  
  const [lookupPhone, setLookupPhone] = useState('');
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await http.get('/whatsapp/settings');
      setSettings(data);
      setTestMode(data.test_mode);
      setTestNumbers(data.test_numbers.join(', '));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings(e) {
    e.preventDefault();
    try {
      const numbersArray = testNumbers.split(',').map(n => n.trim()).filter(Boolean);
      await http.put('/whatsapp/settings', { testMode, testNumbers: numbersArray });
      alert('Settings saved successfully');
      loadSettings();
    } catch (err) {
      alert('Error saving settings: ' + err.message);
    }
  }

  async function handleLookup(e) {
    e.preventDefault();
    if (!lookupPhone) return;
    
    try {
      setMsgLoading(true);
      const data = await http.get(`/whatsapp/messages?phone=${encodeURIComponent(lookupPhone)}`);
      setMessages(data);
    } catch (err) {
      alert('Error fetching messages: ' + err.message);
    } finally {
      setMsgLoading(false);
    }
  }

  return (
    <div className="page">
      <PageHeader title="WhatsApp Bot Configuration" />
      
      {error && <Alert type="error">{error}</Alert>}
      
      <div className="split">
        <Panel title="General Settings">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSaveSettings} className="stack">
              <SelectField label="Test Mode" value={testMode.toString()} onChange={(e) => setTestMode(e.target.value === 'true')}>
                <option value="true">Enabled (Only respond to test numbers)</option>
                <option value="false">Disabled (Live to public)</option>
              </SelectField>
              <TextField 
                label="Test Numbers (comma separated)" 
                hint="Include country code without +, e.g., 919876543210"
                value={testNumbers} 
                onChange={(e) => setTestNumbers(e.target.value)} 
              />
              <Button type="submit" variant="primary">Save Settings</Button>
            </form>
          )}
        </Panel>

        <Panel title="Conversation Viewer">
          <form onSubmit={handleLookup} style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div style={{ flex: 1 }}>
              <TextField 
                value={lookupPhone} 
                onChange={(e) => setLookupPhone(e.target.value)} 
                placeholder="e.g. 919876543210" 
              />
            </div>
            <Button type="submit">Lookup</Button>
          </form>

          {msgLoading && <p>Loading messages...</p>}
          
          <div className="messages" style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {!msgLoading && messages.length === 0 && lookupPhone && (
              <p className="muted">No messages found for this number.</p>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                style={{
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: msg.role === 'user' ? 'var(--blue-1)' : (msg.role === 'assistant' ? 'var(--green-1)' : 'var(--gray-2)'),
                  border: '1px solid var(--border)'
                }}
              >
                <strong>{msg.role === 'tool' ? 'tool (' + msg.name + ')' : msg.role}</strong>
                <pre style={{ whiteSpace: 'pre-wrap', margin: 'var(--space-2) 0 0 0', fontFamily: 'inherit' }}>
                  {msg.content || (msg.tool_call_id ? `[Tool Call: ${msg.name}]` : '(empty)')}
                </pre>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
