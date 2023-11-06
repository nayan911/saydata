import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Tabs } from 'antd';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true

const Poppup = (props) => {
  const { openpopup, setopenpopup, savedNotes, setSavedNotes } = props;

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    mic.lang = selectedLanguage
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  const downloadNotes = () => {
    const textToDownload = savedNotes.join('\n'); // Join notes with newlines

    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt'; // Set the filename for the download

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const languageOptions = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
  ];

  return (
    <Dialog open={openpopup}>
      <DialogTitle style={{ width: 600 }}>
        <div>Add New Profile</div>
      </DialogTitle>
      <DialogContent>
        <Tabs>
          <Tabs.TabPane tab="Basic" key={0}>
            {
              <>
                <h1>Voice Notes</h1>
                <div className="container">
                    <div className="box">
                    <h2>Current Note</h2>
                    {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                    <button onClick={handleSaveNote} disabled={!note}>
                        Save Note
                    </button>
                    <button onClick={() => setIsListening(prevState => !prevState)}>
                        Start/Stop
                    </button>
                    <Select
                    value={selectedLanguage}
                    onChange={(event) => setSelectedLanguage(event.target.value)}
                  >
                    {languageOptions.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                    <p>{note}</p>
                    </div>
                    <div className="box">
                    <h2>Notes</h2>
                    {savedNotes.map(n => (
                        <p key={n}>{n}</p>
                    ))}
                    </div>
                    <button onClick={downloadNotes}>Download Notes</button>
                    <button type="submit" class="btn btn-primary" onClick={()=>setopenpopup(false)}>Done</button>
                </div>
              </>
            }
          </Tabs.TabPane>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Poppup;