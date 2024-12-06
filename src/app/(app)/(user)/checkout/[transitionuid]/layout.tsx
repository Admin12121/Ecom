type Props = {
  children: React.ReactNode;
};

const CreateGroupLayout = ({ children }: Props) => {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="w-screen container h-screen grid grid-cols-1 lg:grid-cols-2 p-5">
        {children}
      </div>
    </main>
  );
};

export default CreateGroupLayout;
