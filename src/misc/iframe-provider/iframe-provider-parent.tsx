import { useIframe } from '@dread-ui/providers/iframe-provider';
import { Button } from '@dread-ui/index';
import { useState } from 'react';

type IframeParentProps = {
  children: React.ReactNode;
};
const IframeParentDemoComponent = ({ children }: IframeParentProps) => {
  const { receivedMessage, sendMessageToChild } = useIframe();
  const [message, setMessage] = useState('');

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 border-8 border-red-500 p-4'>
      Hey, I'm a parent app.
      <div className='flex gap-2'>
        <input
          placeholder='Send message to child'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button onClick={() => sendMessageToChild(message)}>
          Talk to child
        </Button>
      </div>
      Child says: {receivedMessage}
      {children}
    </div>
  );
};

export { IframeParentDemoComponent };
