type Button2Props = {
  children: React.ReactNode;
};
const Button2 = ({ children }: Button2Props) => (
  <button className="bg-teal-500 text-black">{children}</button>
);

export { Button2 };
