type IframeChildProps = Omit<
  React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  >,
  'id'
>;
const IframeChild = (props: IframeChildProps) => {
  return <iframe id='iframe-child' {...props} />;
};

export { IframeChild };
