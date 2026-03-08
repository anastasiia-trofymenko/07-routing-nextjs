type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function NotesLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
