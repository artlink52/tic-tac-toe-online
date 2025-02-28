import { useEffect, useState } from "react";

export function useEventSource<T>(url: string) {
  const [isPending, setIsPending] = useState(true);
  const [dataStream, setData] = useState<T>();
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setIsPending(false);
        setError(undefined);
        setData(JSON.parse(message.data));
      } catch (error) {
        setError(error);
      }
    });

    gameEvents.addEventListener("error", (error) => {
      setError(error);
    });

    return () => gameEvents.close();
  }, [url]);

  return {
    dataStream,
    error,
    isPending,
  };
}
