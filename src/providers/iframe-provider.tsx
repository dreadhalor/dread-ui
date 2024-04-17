import React, { createContext, useContext, useEffect, useState } from 'react';

type IframeContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receivedMessage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setReceivedMessage: React.Dispatch<React.SetStateAction<any>>;
  clearReceivedMessage: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessageToParent: (msg: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessageToChild: (msg: any) => void;
};

const IframeContext = createContext<IframeContextValue>(
  {} as IframeContextValue,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useIframe = () => {
  const context = useContext(IframeContext);
  if (!context) {
    throw new Error('useIframe must be used within a IframeProvider');
  }
  return context;
};

type IframeProviderProps = {
  children: React.ReactNode;
};

export const IframeProvider = ({ children }: IframeProviderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [receivedMessage, setReceivedMessage] = useState<any>();
  const clearReceivedMessage = () => setReceivedMessage(undefined);

  useEffect(() => {
    const handler = (ev: MessageEvent<{ type: string; message: string }>) => {
      if (typeof ev.data !== 'object') return;
      if (!ev.data.type) return;
      if (ev.data.type !== 'msg') return;
      if ((ev.data.message ?? null) === null) return;

      setReceivedMessage(ev.data.message);
    };

    window.addEventListener('message', handler);

    // Don't forget to remove addEventListener
    return () => window.removeEventListener('message', handler);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessageToParent = (msg: any) => {
    window.parent.postMessage(
      {
        type: 'msg',
        message: msg,
      },
      '*',
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessageToChild = (msg: any) => {
    const iframe = document.getElementById('iframe-child') as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage(
      {
        type: 'msg',
        message: msg,
      },
      '*',
    );
  };

  return (
    <IframeContext.Provider
      value={{
        receivedMessage,
        setReceivedMessage,
        clearReceivedMessage,
        sendMessageToParent,
        sendMessageToChild,
      }}
    >
      {children}
    </IframeContext.Provider>
  );
};
