import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { MessageType } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(requestId: string) {
    // Check if chat already exists
    const existingChat = await this.prisma.chat.findFirst({
      where: { requestId },
    });

    if (existingChat) {
      return existingChat;
    }

    return this.prisma.chat.create({
      data: { requestId },
      include: {
        request: {
          include: {
            client: true,
            specialty: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async findChatByRequest(requestId: string) {
    const chat = await this.prisma.chat.findFirst({
      where: { requestId },
      include: {
        request: {
          include: {
            client: true,
            specialty: true,
            acceptedBy: true,
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async findUserChats(userId: string) {
    // Find chats where user is either client or accepted craftsman
    const chats = await this.prisma.chat.findMany({
      where: {
        OR: [
          {
            request: {
              clientId: userId,
            },
          },
          {
            request: {
              acceptedById: userId,
            },
          },
        ],
      },
      include: {
        request: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            specialty: true,
            acceptedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 1, // Get last message for preview
        },
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return chats;
  }

  async sendMessage(data: {
    chatId: string;
    content: string;
    messageType: MessageType;
    senderId: string;
  }) {
    // Verify sender has access to this chat
    const chat = await this.prisma.chat.findUnique({
      where: { id: data.chatId },
      include: {
        request: {
          select: {
            clientId: true,
            acceptedById: true,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const { clientId, acceptedById } = chat.request;
    if (data.senderId !== clientId && data.senderId !== acceptedById) {
      throw new ForbiddenException('You do not have access to this chat');
    }

    const message = await this.prisma.chatMessage.create({
      data: {
        content: data.content,
        messageType: data.messageType,
        chatId: data.chatId,
        senderId: data.senderId,
        isRead: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // Update chat's updatedAt timestamp
    await this.prisma.chat.update({
      where: { id: data.chatId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async markMessagesAsRead(chatId: string, userId: string) {
    // Verify user has access to this chat
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        request: {
          select: {
            clientId: true,
            acceptedById: true,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const { clientId, acceptedById } = chat.request;
    if (userId !== clientId && userId !== acceptedById) {
      throw new ForbiddenException('You do not have access to this chat');
    }

    // Mark all unread messages from other users as read
    await this.prisma.chatMessage.updateMany({
      where: {
        chatId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    return { success: true };
  }

  async getUnreadMessageCount(userId: string) {
    const chats = await this.findUserChats(userId);
    
    let totalUnread = 0;
    
    for (const chat of chats) {
      const unreadCount = await this.prisma.chatMessage.count({
        where: {
          chatId: chat.id,
          senderId: { not: userId },
          isRead: false,
        },
      });
      totalUnread += unreadCount;
    }

    return totalUnread;
  }

  async deleteMessage(messageId: string, userId: string) {
    const message = await this.prisma.chatMessage.findUnique({
      where: { id: messageId },
      include: {
        chat: {
          include: {
            request: {
              select: {
                clientId: true,
                acceptedById: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.senderId !== userId) {
      throw new ForbiddenException('You can only delete your own messages');
    }

    return this.prisma.chatMessage.delete({
      where: { id: messageId },
    });
  }

  async searchMessages(chatId: string, searchTerm: string, userId: string) {
    // Verify user has access to this chat
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        request: {
          select: {
            clientId: true,
            acceptedById: true,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const { clientId, acceptedById } = chat.request;
    if (userId !== clientId && userId !== acceptedById) {
      throw new ForbiddenException('You do not have access to this chat');
    }

    return this.prisma.chatMessage.findMany({
      where: {
        chatId,
        content: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getChatParticipants(chatId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        request: {
          include: {
            client: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                phone: true,
              },
            },
            acceptedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const participants = [chat.request.client];
    
    if (chat.request.acceptedBy) {
      participants.push(chat.request.acceptedBy);
    }

    return participants;
  }

  async createSystemMessage(chatId: string, content: string) {
    return this.prisma.chatMessage.create({
      data: {
        content,
        messageType: MessageType.SYSTEM,
        chatId,
        senderId: 'system', // You might want to handle this differently
        isRead: true,
      },
    });
  }

  async getChatHistory(chatId: string, userId: string, limit: number = 50, offset: number = 0) {
    // Verify user has access to this chat
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        request: {
          select: {
            clientId: true,
            acceptedById: true,
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const { clientId, acceptedById } = chat.request;
    if (userId !== clientId && userId !== acceptedById) {
      throw new ForbiddenException('You do not have access to this chat');
    }

    return this.prisma.chatMessage.findMany({
      where: { chatId },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }
}
