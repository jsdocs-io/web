import CodeBlockContents from "./CodeBlockContents";

const CodeBlock = ({
  code,
  language,
  className,
}: {
  code: string;
  language: string;
  className?: string;
}) => {
  return (
    <div className={className ?? "my-4"}>
      <CodeBlockContents code={code} language={language} />
    </div>
  );
};

export default CodeBlock;
