import { cn } from '@repo/utils';
import { useRef, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type Props = {
  children?: React.ReactNode;
  className?: string;
  onTruncation?: (isTruncated: boolean) => void;
};

const TruncatedText = ({ children, className, onTruncation }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const onResize = useCallback(() => {
    if (targetRef.current && onTruncation) {
      const { scrollWidth, offsetWidth } = targetRef.current;
      onTruncation(offsetWidth < scrollWidth);
    }
  }, [onTruncation, targetRef]);

  useResizeDetector({ onResize, targetRef });

  return (
    <div className={cn('truncate', className)} ref={targetRef}>
      {children}
    </div>
  );
};

export { TruncatedText };
