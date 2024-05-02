import React, { useState,useEffect } from 'react';
import { useCopilotReadable } from "@copilotkit/react-core";
import {
  useMakeCopilotDocumentReadable,
  DocumentPointer,
} from "@copilotkit/react-document";
import { CopilotTextarea } from "@copilotkit/react-textarea";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [skt,setskt]=useState(new WebSocket('ws://localhost:3015'))
  const [messageInput, setMessageInput] = useState('');
  const [text, setText] = useState('');

  const employeeContextId = useCopilotReadable({
    description: "Employee name",
    value: employeeName,
  });
  
  // Pass a parentID to maintain a hierarchical structure.
  // Especially useful with child React components, list elements, etc.
  useCopilotReadable({
    description: "Work profile",
    value: workProfile.description(),
    parentId: employeeContextId,
  });
  useCopilotReadable({
    description: "Employee work profile",
    value: workProfile.description(),
    parentId: employeeContextId,
  });
  
  const document = {
    id: "2",
    name: "Travel Pet Peeves",
    sourceApplication: "Google Docs",
    iconImageUri: "/images/GoogleDocs.svg",
    getContents: () => {
      return "hello document";
    },
  } ;
  
  // ...then, in a react component:
  useMakeCopilotDocumentReadable(document);
  
// ...

useEffect(() => {
  const socket = new WebSocket('ws://localhost:3015');
  socket.onopen = () => {
    console.log('WebSocket connection established.');
  };
 setskt(socket)
 
 

  return () => {
    socket.close();
  };
}, []);

skt.onmessage = (event) => {
  const receivedMessage = JSON.parse(event.data);
  
  alert("message received")
  setMessages([...messages, receivedMessage.text]);
};

  // WebSocket connection setup goes here

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message = {
        text: messageInput,
        
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, messageInput]);
      console.log(messageInput);
      skt.send(JSON.stringify(message));

      setMessageInput('');
    }
  };

  return (
    <div className="App">
       <CopilotTextarea
        className="px-4 py-4"
        value={text}
        onValueChange={(value) => setText(value)}
        placeholder="What are your plans for your vacation?"
        autosuggestionsConfig={{
          textareaPurpose:
            "Travel notes from the user's previous vacations. Likely written in a colloquial style, but adjust as needed.",
          chatApiConfigs: {
            suggestionsApiConfig: {
              forwardedParams: {
                max_tokens: 20,
                stop: [".", "?", "!"],
              },
            },
          },
        }}
      />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            style={{width:"500px",height:"50px"}}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;