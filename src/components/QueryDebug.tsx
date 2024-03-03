import { Accordion, AccordionItem, Snippet } from "@nextui-org/react";
import { DocumentNode } from "graphql";
import { printWithCache } from "@graphql-mesh/utils";
import { useMemo } from "react";

export default function QueryDebug({
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
        <Snippet symbol="" codeString={queryStr}>
          <pre>{queryStr}</pre>
        </Snippet>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Show raw result"
        title="Show raw result"
      >
        <Snippet symbol="">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Snippet>
      </AccordionItem>
    </Accordion>
  );
}
