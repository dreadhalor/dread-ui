import { useIframe } from '@dread-ui/providers/iframe-provider';
import { Button } from '@dread-ui/index';
import { useState } from 'react';

const IframeChildDemoComponent = () => {
  const { receivedMessage, sendMessageToParent } = useIframe();
  const [message, setMessage] = useState('');

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 border-4 border-black'>
      Hi, I am a child app in an iframe.
      <div className='flex gap-2'>
        <input
          placeholder='Send message to parent'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button onClick={() => sendMessageToParent(message)}>
          Talk to parent
        </Button>
      </div>
      Parent says: {receivedMessage}
    </div>
  );
};

export { IframeChildDemoComponent };
