type Button2Props = {
  children: React.ReactNode;
};
const Button2 = ({ children }: Button2Props) => (
  <button className="rounded-md bg-teal-500 p-2 text-black">{children}</button>
);

export { Button2 };
