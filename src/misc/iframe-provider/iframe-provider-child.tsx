import { useIframe } from '@dread-ui/providers/iframe-provider';
import { Button, Input } from '@dread-ui/index';
import { useState } from 'react';

const IframeChildDemoComponent = () => {
  const { receivedMessage, sendMessageToParent } = useIframe();
  const [message, setMessage] = useState('');

  return (
    <div className='flex h-screen w-full flex-1 flex-col items-center justify-center gap-4 border-4 border-black'>
      Hi, I am a child app in an iframe.
      <div className='flex gap-2'>
        <Input
          placeholder='Send message to parent'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessageToParent(message);
            }
          }}
          value={message}
        />
        <Button
          className='text-nowrap'
          onClick={() => sendMessageToParent(message)}
        >
          Talk to parent
        </Button>
      </div>
      Parent says: {receivedMessage}
    </div>
  );
};

export { IframeChildDemoComponent };
