import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'
import { IMessage } from '../interfaces/types/Data';

const MessageSchema = new mongoose.Schema<IMessage>({
  senderId: {
    type: String,
    required: true,
  },
  receiverId:{
    type:String, 
    required:true,
  },
  content: {
    type: String,
    required: true,
  },
  status:{
    type:String,
    enum:["pending","delivered","seen"],
    required:true,
  },
  readBy: {
    type: [ObjectId], 
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model('Message', MessageSchema);

export default Messages;
