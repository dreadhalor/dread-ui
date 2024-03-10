import React, { createContext, useContext, useEffect, useState } from 'react';

type IframeContextValue = {
  receivedMessage: string;
  setReceivedMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessageToParent: (msg: string) => void;
  sendMessageToChild: (msg: string) => void;
};

const IframeContext = createContext<IframeContextValue>(
  {} as IframeContextValue,
);

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
  const [receivedMessage, setReceivedMessage] = useState('');

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

  const sendMessageToParent = (msg: string) => {
    window.parent.postMessage(
      {
        type: 'msg',
        message: msg,
      },
      '*',
    );
  };
  const sendMessageToChild = (msg: string) => {
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
        sendMessageToParent,
        sendMessageToChild,
      }}
    >
      {children}
    </IframeContext.Provider>
  );
};
