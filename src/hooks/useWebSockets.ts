import { useEffect, useRef } from "react";

interface Props {
  showId: string;
  onMessage: (msg: any) => void;
}

export const useWebSocket = ({ showId, onMessage }: Props) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true); // Track mount state

  useEffect(() => {
    isMounted.current = true;

    const connect = () => {
      const socketUrl = `wss://localhost:7028/ws?showId=${showId}`;
      ws.current = new WebSocket(socketUrl);

      ws.current.onopen = () => {
        console.log("✅ WebSocket connected");
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          onMessage(message);
        } catch (err) {
          console.error("Error parsing WebSocket message", err);
        }
      };

      ws.current.onclose = () => {
        console.log("❌ WebSocket disconnected.");
        if (isMounted.current) {
          console.log("🔁 Reconnecting in 3s...");
          reconnectTimeout.current = setTimeout(connect, 3000);
        }
      };

      ws.current.onerror = (err) => {
        console.error("WebSocket error", err);
        ws.current?.close();
      };
    };

    connect();

    return () => {
      // Cleanup on unmount
      isMounted.current = false;
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [showId]);
};
