const { Server } = require('socket.io');
const Message = require('./models/Message');

let io;

function initSocket(server){
  io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});

  io.on('connection', (socket) => {
    console.log('client connected', socket.id);

    socket.on('join', ({ chatId }) => socket.join(chatId));

    socket.on('sendMessage', async ({ chatId, message }) => {
      try {
        const msg = await Message.create(message);
        io.to(chatId).emit('receiveMessage', msg);
      } catch (err) {
        console.error('message save error', err);
      }
    });

    socket.on('disconnect', () =>
      console.log('client disconnected', socket.id)
    );
  });
}

module.exports = { initSocket, getIo: () => io };
