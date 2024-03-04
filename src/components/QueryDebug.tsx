import { Accordion, AccordionItem, Snippet } from "@nextui-org/react";
import { DocumentNode } from "graphql";
import { printWithCache } from "@graphql-mesh/utils";
import { useMemo } from "react";

export function QueryDebug({
  query,
  result,
}: {
  query: DocumentNode;
  result: object;
}) {
  const queryStr = useMemo(() => printWithCache(query), [query]);
  return (
    <Accordion isCompact variant="shadow">
      <AccordionItem key="1" aria-label="Show query" title="Show query">
        <AccordionSnippet code={queryStr} />
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Show raw result"
        title="Show raw result"
      >
        <AccordionSnippet code={JSON.stringify(result, null, 2)} />
      </AccordionItem>
    </Accordion>
  );
}

function AccordionSnippet({ code }: { code: string }) {
  return (
    <Snippet
      hideCopyButton
      symbol=""
      codeString={code}
      className="overflow-x-auto py-unit-md"
    >
      <pre className="max-w-[70vw] md:max-w-full">{code}</pre>
    </Snippet>
  );
}
