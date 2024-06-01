require('dotenv').config();

const express = require('express');
const cors = require('cors')
const sequelize = require('./config/database');
const { User, Message, Conversation, ConversationMember } = require('./models');

const { authenticateToken } = require('./middleware/authenticateToken');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8000'
}));

// FIXME: Authorize users API only for admins
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/messages', authenticateToken, messageRoutes);

app.listen(port, () => {
  console.log(`[*] Server listening on port http://localhost:${port}`);
});

sequelize.authenticate()
  .then(() => console.log('[+] Connection has been established successfully to the database'))
  .catch(error => console.error(`Unable to connect to the database: ${error}`));

sequelize.sync({ force: true }).then(() => {
  console.log('[+] Database synchronized');
}).catch((error) => {
  console.error(`[-] Failed to synchronize database: ${error}`);
});