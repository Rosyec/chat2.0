"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical } from "lucide-react";
import { socket } from "@/lib/socket";
import { Message, TypingUser } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import $axios from "axios";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase.config";

const ChatView: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! ¿Cómo estás?",
      sender: {
        id: "user2",
        name: "María García",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: "2",
      text: "¡Muy bien, gracias! ¿Y tú qué tal?",
      sender: {
        id: "user1",
        name: "Tú",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: "3",
      text: "Genial, trabajando en algunos proyectos nuevos. ¿Te gustaría ver lo que estoy haciendo?",
      sender: {
        id: "user2",
        name: "María García",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
    {
      id: "4",
      text: "¡Por supuesto! Me encantaría verlo",
      sender: {
        id: "user1",
        name: "Tú",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(Date.now() - 120000),
      isOwn: true,
    },
  ]);

  const [inputValue, setInputValue] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect((): void => {
    scrollToBottom();
  }, [messages, typingUsers]);

  useEffect((): void => {
    socket.on("sendMessage", (value: Message) => {
      console.log("Socket recibido: ", value);
    });
  }, []);

  useEffect((): void => {
    async function chatGPT() {
      // const reply = await $axios.post(`/api/gpt`, {
      //   message: "Hola, como estas?",
      // });
      // console.log(reply.data);
    }

    chatGPT();
  }, []);

  const handleSendMessage = (): void => {
    socket.emit("message", {
      id: Date.now().toString(),
      text: inputValue,
      sender: {
        id: "user1",
        name: "Tú",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date(),
      isOwn: true,
    });

    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: {
          id: "user1",
          name: "Tú",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
      setInputValue("");

      // Simular respuesta automática después de 2 segundos
      setTimeout((): void => {
        setTypingUsers([
          {
            id: "user2",
            name: "María García",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        ]);

        setTimeout((): void => {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "¡Excelente mensaje! 👍",
            sender: {
              id: "user2",
              name: "María García",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: new Date(),
            isOwn: false,
          };
          setMessages((prevMessages: Message[]) => [
            ...prevMessages,
            responseMessage,
          ]);
          setTypingUsers([]);
        }, 2000);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const auth = getAuth(app);
    if (!auth.currentUser) {
      router.push(`/`);
    }
  }, [getAuth(app)]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://w7.pngwing.com/pngs/941/468/png-transparent-computer-icons-online-chat-chat-room-group-miscellaneous-blue-marine-mammal-thumbnail.png"
              alt="Chat"
            />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-gray-900">Chat</h1>
            {/* <p className="text-sm text-green-500">En línea</p> */}
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Más opciones">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.isOwn ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {!message.isOwn && (
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage
                  src={message.sender.avatar || "/placeholder.svg"}
                  alt={message.sender.name}
                />
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`flex flex-col ${
                message.isOwn ? "items-end" : "items-start"
              } max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
            >
              {!message.isOwn && (
                <span className="text-xs text-gray-500 mb-1 px-1">
                  {message.sender.name}
                </span>
              )}

              <div
                className={`px-4 py-3 rounded-2xl break-words ${
                  message.isOwn
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-white border border-gray-200 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>

              <span className="text-xs text-gray-400 mt-1 px-1">
                {formatTime(message.timestamp)}
              </span>
            </div>

            {message.isOwn && (
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage
                  src={message.sender.avatar || "/placeholder.svg"}
                  alt={message.sender.name}
                />
                <AvatarFallback>TÚ</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Typing Indicators */}
        {typingUsers.map((user: TypingUser) => (
          <TypingIndicator key={user.id} user={user} />
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="pr-12 py-3 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              aria-label="Escribe un mensaje"
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="icon"
            className="rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 w-10 h-10 flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface TypingIndicatorProps {
  user: TypingUser;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ user }) => (
  <div className="flex items-start space-x-3 mb-4">
    <Avatar className="w-8 h-8 flex-shrink-0">
      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 mb-1">{user.name}</span>
      <div className="bg-gray-200 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ChatView;
