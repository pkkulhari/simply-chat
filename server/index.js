const http = require('http')
const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: ['*'],
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (room_id) => {
    socket.join(room_id)
    console.log(`User with ID: ${socket.id} joined room: ${room_id}`)
  })

  socket.on('send-message', (data) => {
    socket.to(data.room).emit('recieve-message', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(8000, () => {
  console.log('Server is listening at http://localhost:8000')
})
