const InlineCode = ({ code }: { code: string }) => {
  return (
    <code className="text-pink-800 break-words dark:text-pink-300">{code}</code>
  );
};

export default InlineCode;
