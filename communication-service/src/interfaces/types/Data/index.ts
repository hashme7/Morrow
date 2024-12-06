export interface IMessage {
    senderId: string;
    receiverId: string; 
    content: string;
    status: "pending" | "delivered" | "seen";
    timestamp: Date;
    readBy: string[];
}
