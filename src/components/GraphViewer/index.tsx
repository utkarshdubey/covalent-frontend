import { css } from "catom";
import { useState } from "@hydrophobefireman/ui-lib";
import { RelationGraph } from "@/util/api";
export function GraphViewer({
  graph,
  reset,
}: {
  graph: RelationGraph[];
  reset(): void;
}) {
  return (
    <div>
      {graph.length > 0 ? (
        graph.map((x) => <Reader current={x} />)
      ) : (
        <div>Nothing found</div>
      )}
      <div>
        <button class={css({ color: "white" })} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
function Reader({ current }: { current: RelationGraph }) {
  const [index, setIndex] = useState(0);
  const currentUser = current[index];

  const nextUser = current[index + 1];
  return (
    <>
      <div class={css({ padding: "2rem" })}>
        <span class={css({ color: "var(--skyblue)", wordBreak: "break-all" })}>
          {current.map((x) => x.name).join(">")}
        </span>
      </div>
      <div
        class={css({
          background: "white",
          padding: "1rem",
          paddingTop: "2rem",
          color: "black",
          paddingBottom: "2rem",
        })}
      >
        {nextUser ? (
          <span>
            {currentUser.name} is {nextUser.relation} of {nextUser.name}
          </span>
        ) : (
          <span>
            {current[0].name}
            {"->"}
            {currentUser.name}
          </span>
        )}
      </div>
      <div class={css({ margin: "auto", textAlign: "center" })}>
        {!currentUser.done && (
          <button
            class={css({
              padding: ".5rem",
              border: "1px solid",
              margin: "5px",
              borderRadius: "50px",
              background: "var(--skyblue)",
              color: "var(--darker)",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            })}
            onClick={() => setIndex(index + 1)}
          >
            Next Relation
          </button>
        )}
      </div>
    </>
  );
}
