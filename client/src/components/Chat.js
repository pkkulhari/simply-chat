import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({ socket, room, username }) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    const messageData = {
      id: Math.floor(Math.random() * 100000),
      room: room,
      username: username,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
    }
    socket.emit('send-message', messageData)
    setMessageList((list) => [...list, messageData])
    setCurrentMessage('')
  }

  useEffect(() => {
    socket.on('recieve-message', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg) => (
            <div className="message" id={username === msg.username ? 'you' : 'other'} key={msg.id}>
              <div>
                <div className="message-content">
                  <p>{msg.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{msg.time}</p>
                  <p id="author">{msg.username}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          onChange={(event) => setCurrentMessage(event.target.value)}
          placeholder="Enter a Message"
          onKeyUp={(event) => event.key === 'Enter' && sendMessage()}
          value={currentMessage}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
