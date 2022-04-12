import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './components/Chat'

const socket = io.connect('http://localhost:8000')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showRoom, setShowRoom] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join-room', room)
      setShowRoom(true)
    }
  }

  return (
    <div className="App">
      {!showRoom ? (
        <div className="joinChatContainer">
          <h3>Simply Chat</h3>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  )
}

export default App
