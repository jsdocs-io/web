import * as tsdoc from "@microsoft/tsdoc";
import A from "./A";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";
import InternalLink from "./InternalLink";
import PackageLink from "./PackageLink";

interface DocNodeProps {
  readonly node: tsdoc.DocNode;
}

interface DocLinkTagProps {
  readonly linkTag: tsdoc.DocLinkTag;
}

/**
 * DocComment renders a JSDoc/TSDoc comment (like this one).
 */
const DocComment = ({ doc }: { doc?: string }) => {
  if (!doc) {
    return null;
  }

  const {
    summarySection,
    params: { blocks: paramBlocks },
    returnsBlock,
    remarksBlock,
    customBlocks,
    seeBlocks,
    modifierTagSet: { nodes: allModifierTags },
    deprecatedBlock,
    inheritDocTag,
  } = new tsdoc.TSDocParser().parseString(doc).docComment;

  const returnsSection = returnsBlock?.content;
  const remarksSection = remarksBlock?.content;
  const deprecatedSection = deprecatedBlock?.content;

  const exampleBlocks = customBlocks.filter(
    ({ blockTag: { tagNameWithUpperCase } }) => {
      // Example blocks are defined by the `@example` tag
      return (
        tagNameWithUpperCase === tsdoc.StandardTags.example.tagNameWithUpperCase
      );
    }
  );

  const throwsBlocks = customBlocks.filter(
    ({ blockTag: { tagNameWithUpperCase } }) => {
      // Throws blocks are defined by the `@throws` tag
      return (
        tagNameWithUpperCase === tsdoc.StandardTags.throws.tagNameWithUpperCase
      );
    }
  );

  const modifierTags = allModifierTags.filter(({ tagNameWithUpperCase }) => {
    // Do not display the `@packageDocumentation` tag
    return ![
      tsdoc.StandardTags.packageDocumentation.tagNameWithUpperCase,
    ].includes(tagNameWithUpperCase);
  });

  if (inheritDocTag) {
    return <DocInheritDocSection inheritDocTag={inheritDocTag} />;
  }

  return (
    <div className="space-y-4">
      <DocSummarySection summarySection={summarySection} />

      {paramBlocks.length !== 0 && (
        <DocParamsSections paramBlocks={paramBlocks} />
      )}

      {returnsSection && <DocReturnsSection returnsSection={returnsSection} />}

      {throwsBlocks.length !== 0 && (
        <DocThrowsSections throwsBlocks={throwsBlocks} />
      )}

      {remarksSection && <DocRemarksSection remarksSection={remarksSection} />}

      {exampleBlocks.length !== 0 && (
        <DocExamplesSections exampleBlocks={exampleBlocks} />
      )}

      {seeBlocks.length !== 0 && <DocSeeSection seeBlocks={seeBlocks} />}

      {modifierTags.length !== 0 && (
        <DocModifiersSection modifierTags={modifierTags} />
      )}

      {deprecatedSection && (
        <DocDeprecatedSection deprecatedSection={deprecatedSection} />
      )}
    </div>
  );
};

export default DocComment;

function DocInheritDocSection({
  inheritDocTag,
}: {
  inheritDocTag: tsdoc.DocInheritDocTag;
}) {
  const { declarationReference } = inheritDocTag;
  if (!declarationReference) {
    return null;
  }

  const { packageName, declarationID, url } = resolveDeclarationReference({
    declarationReference,
  });

  return (
    <section>
      <p>
        See documentation for{" "}
        {packageName ? (
          <PackageLink name={packageName} declarationID={declarationID}>
            {declarationID} from package {packageName}
          </PackageLink>
        ) : (
          <InternalLink href={url}>{declarationID}</InternalLink>
        )}
        .
      </p>
    </section>
  );
}

function DocSummarySection({
  summarySection,
}: {
  summarySection: tsdoc.DocSection;
}) {
  return (
    <section>
      <DocContainer container={summarySection} />
    </section>
  );
}

function DocParamsSections({
  paramBlocks,
}: {
  paramBlocks: ReadonlyArray<tsdoc.DocParamBlock>;
}) {
  return (
    <>
      {paramBlocks.map(({ parameterName, content }, index) => (
        <section key={index}>
          <h4>Parameter {parameterName}</h4>

          <DocContainer container={content} />
        </section>
      ))}
    </>
  );
}

function DocReturnsSection({
  returnsSection,
}: {
  returnsSection: tsdoc.DocSection;
}) {
  return (
    <section>
      <h4>Returns</h4>

      <DocContainer container={returnsSection} />
    </section>
  );
}

function DocThrowsSections({
  throwsBlocks,
}: {
  throwsBlocks: tsdoc.DocBlock[];
}) {
  return (
    <>
      {throwsBlocks.map(({ content }, index) => (
        <section key={index}>
          <h4>Throws</h4>

          <DocContainer container={content} />
        </section>
      ))}
    </>
  );
}

function DocRemarksSection({
  remarksSection,
}: {
  remarksSection: tsdoc.DocSection;
}) {
  return (
    <section>
      <h4>Remarks</h4>

      <DocContainer container={remarksSection} />
    </section>
  );
}

function DocExamplesSections({
  exampleBlocks,
}: {
  exampleBlocks: tsdoc.DocBlock[];
}) {
  return (
    <>
      {exampleBlocks.map(({ content }, index) => (
        <section key={index}>
          <h4>Example {index + 1}</h4>

          <DocContainer container={content} />
        </section>
      ))}
    </>
  );
}

function DocSeeSection({
  seeBlocks,
}: {
  seeBlocks: ReadonlyArray<tsdoc.DocBlock>;
}) {
  return (
    <section className="space-y-2">
      <h4>See Also</h4>

      <ul>
        {seeBlocks.map(({ content }, index) => (
          <li key={index}>
            <DocContainer container={content} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DocModifiersSection({
  modifierTags,
}: {
  modifierTags: tsdoc.DocBlockTag[];
}) {
  return (
    <section className="space-y-2">
      <h4>Modifiers</h4>

      <ul className="list-inline">
        {modifierTags.map(({ tagName }) => (
          <li key={tagName}>
            <InlineCode code={tagName} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function DocDeprecatedSection({
  deprecatedSection,
}: {
  deprecatedSection: tsdoc.DocSection;
}) {
  return (
    <section>
      <h4 className="text-red-700 dark:text-red-500">Deprecated</h4>

      <DocContainer container={deprecatedSection} />
    </section>
  );
}

function DocContainer({ container }: { container: tsdoc.DocNodeContainer }) {
  return (
    <>
      {container.nodes.map((node, index) => (
        <DocNode key={index} node={node} />
      ))}
    </>
  );
}

function DocNode({ node }: DocNodeProps) {
  switch (node.kind) {
    case "ErrorText":
      return <DocErrorText node={node} />;
    case "EscapedText":
      return <DocEscapedText node={node} />;
    case "CodeSpan":
      return <DocCodeSpan node={node} />;
    case "FencedCode":
      return <DocFencedCode node={node} />;
    case "LinkTag":
      return <DocLinkTag node={node} />;
    case "Paragraph":
      return <DocParagraph node={node} />;
    case "PlainText":
      return <DocPlainText node={node} />;
    case "SoftBreak":
      return <DocSoftBreak />;
    default:
      return null;
  }
}

function DocErrorText({ node }: DocNodeProps) {
  const errorText = (node as tsdoc.DocErrorText).text;

  return <span className="break-words">{errorText}</span>;
}

function DocEscapedText({ node }: DocNodeProps) {
  const escapedText = (node as tsdoc.DocEscapedText).decodedText;

  return <span className="break-words">{escapedText}</span>;
}

function DocCodeSpan({ node }: DocNodeProps) {
  const code = (node as tsdoc.DocCodeSpan).code;

  return <InlineCode code={code} />;
}

function DocFencedCode({ node }: DocNodeProps) {
  const fencedCode = node as tsdoc.DocFencedCode;
  const { code, language } = fencedCode;

  return <CodeBlock code={code} language={language} />;
}

function DocLinkTag({ node }: DocNodeProps) {
  const linkTag = node as tsdoc.DocLinkTag;

  return linkTag.urlDestination ? (
    <DocLinkTagExternal linkTag={linkTag} />
  ) : (
    <DocLinkTagInternal linkTag={linkTag} />
  );
}

/** DocLinkTagExternal links to an external resource. */
function DocLinkTagExternal({ linkTag }: DocLinkTagProps) {
  const url = linkTag.urlDestination as string;
  const text = linkTag.linkText ?? url;

  return <A href={url}>{text}</A>;
}

/**
 * DocLinkTagInternal links to a declaration in some package,
 * which may be different from the one containing the link.
 */
function DocLinkTagInternal({ linkTag }: DocLinkTagProps) {
  const { packageName, declarationID, url } = resolveDeclarationReference({
    declarationReference: linkTag.codeDestination!,
  });
  const text = linkTag.linkText;

  return packageName ? (
    <PackageLink name={packageName} declarationID={declarationID}>
      {text ? text : `${packageName}#${declarationID}`}
    </PackageLink>
  ) : (
    <InternalLink href={url}>{text ?? declarationID}</InternalLink>
  );
}

function DocParagraph({ node }: DocNodeProps) {
  const paragraph = node as tsdoc.DocParagraph;
  const contents = tsdoc.DocNodeTransforms.trimSpacesInParagraph(paragraph);

  return (
    <p className="break-words">
      <DocContainer container={contents} />
    </p>
  );
}

function DocPlainText({ node }: DocNodeProps) {
  const plainText = (node as tsdoc.DocPlainText).text;

  return <>{plainText}</>;
}

/** DocSoftBreak renders a single space */
function DocSoftBreak() {
  return <> </>;
}

/**
 * resolveDeclarationReference resolves a declaration reference
 * returning it's package name if any (e.g., `@foo/bar`),
 * it's declaration ID (e.g., `myClass.myProperty`) and
 * an internal URL that links to the resolved declaration
 * (e.g. `/package/@foo/bar#myClass.myProperty`).
 */
function resolveDeclarationReference({
  declarationReference,
}: {
  declarationReference: tsdoc.DocDeclarationReference;
}): { packageName?: string; declarationID: string; url: string } {
  const { packageName, memberReferences } = declarationReference;
  const packageRoute = packageName ? `/package/${packageName}` : "";

  const declarationID = memberReferences
    .flatMap(({ memberIdentifier }) => {
      const id = memberIdentifier?.identifier;
      return id ? id : [];
    })
    .join(".");

  const url = `${packageRoute}#${declarationID}`;
  return { packageName, declarationID, url };
}
