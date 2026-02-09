const Message = require('../models/Message');

console.log('🔁 Loading message controller...');

// Get all messages
exports.getMessages = async (req, res, next) => {
  console.log('🎯 getMessages controller called');
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']]
    });
    console.log(`✅ Successfully fetched ${messages.length} messages`);
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Create new message
exports.createMessage = async (req, res, next) => {
  console.log('🎯 createMessage controller called');
  console.log('📦 Request body:', req.body);
  
  try {
    const { first_name, last_name, email, phone, subject, message } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !message) {
      console.log('❌ Validation failed - missing required fields');
      return res.status(400).json({ 
        error: 'First name, last name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log('💾 Creating message in database...');
    const newMessage = await Message.create({
      first_name,
      last_name,
      email,
      phone,
      subject,
      message
    });

    console.log('✅ Message created successfully:', newMessage.id);
    
    // Here you can add email notification logic
    // await sendEmailNotification(newMessage);

    res.status(201).json({
      message: 'Message sent successfully',
      id: newMessage.id
    });
  } catch (err) {
    console.error('❌ Error creating message:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Delete message
exports.deleteMessage = async (req, res, next) => {
  console.log('🎯 deleteMessage controller called');
  console.log('🗑️ Deleting message ID:', req.params.id);

  try {
    const { id } = req.params;

    console.log('🔍 Looking for message with ID:', id);
    const message = await Message.findByPk(id);
    if (!message) {
      console.log('❌ Message not found with ID:', id);
      return res.status(404).json({ error: 'Message not found' });
    }

    console.log('✅ Message found, proceeding with deletion...');
    await message.destroy();
    console.log('✅ Message deleted successfully');
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting message:', err);
    console.error('🔍 Error details:', err.message);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

console.log('✅ Message controller loaded successfully');