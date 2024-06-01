const Joi = require('joi');


// FIXME: adapt to new database design
const messageSchema = Joi.object({
  msgContent: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .label('Message content'),
  conversationId: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
    .label('Conversation ID')
});

module.exports = { messageSchema };