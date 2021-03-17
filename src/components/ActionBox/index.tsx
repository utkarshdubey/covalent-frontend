import { FetchContext } from "@/context";
import { handler } from "@/util/api";
import { useContext, useState } from "@hydrophobefireman/ui-lib";
import { css } from "catom";
import { Form } from "../Form";
import { ModalLayout } from "../Modal";
import {
  actionBox,
  branding,
  addPerson,
  addRelation,
} from "./actionbox.styles";
export function ActionBox() {
  const [addPeople, setAddPeople] = useState(false);
  const [addRelationActive, setAddRelation] = useState(false);
  return (
    <div class={actionBox}>
      {addPeople && <AddPeopleModal close={() => setAddPeople(false)} />}
      {addRelationActive && (
        <AddRelationModal close={() => setAddRelation(false)} />
      )}
      <div class={branding}>Covalent</div>
      <div>
        <button
          onClick={() => {
            setAddPeople(true);
          }}
          class={addPerson}
        >
          Add People
        </button>
        <button onClick={() => setAddRelation(true)} class={addRelation}>
          Add relationship
        </button>
      </div>
    </div>
  );
}
const input = css({
  padding: ".5rem",
  outline: "none",
  borderRadius: "50px",
  border: "none",
  margin: "5px",
  boxShadow: "0 2px 5px rgb(0 0 0 / 25%), 0 5px 4px rgb(0 0 0 / 22%)",
});
const submitButton = css({
  padding: ".2rem",
  background: "var(--dark)",
  borderRadius: "53px",
  width: "100px",
  color: "silver",
  margin: "5px",
});
function AddPeopleModal({ close }: { close(): void }) {
  const [name, setName] = useState("");
  const [e, setError] = useState<string>(null);
  const { fetcher } = useContext(FetchContext);
  return (
    <ModalLayout close={close}>
      <Form
        onSubmit={async () => {
          const n = name.trim();
          if (!n) return;
          const { error } = await handler.addPerson(n);
          if (error) return setError(error);
          fetcher();
          close();
        }}
      >
        <div>
          <div class={css({ color: "red" })}>
            <span>{e}</span>
          </div>
          <div class={css({ color: "#242424" })}>Name</div>
          <input
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            placeholder="John Doe"
            class={input}
          ></input>
          <div>
            <button class={submitButton}>Submit</button>
          </div>
        </div>
      </Form>
    </ModalLayout>
  );
}

function AddRelationModal({ close }: { close(): void }) {
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [relation, setRelation] = useState("");
  const [e, setError] = useState<string>(null);
  const { fetcher } = useContext(FetchContext);
  return (
    <ModalLayout close={close}>
      <Form
        onSubmit={async () => {
          const n = name.trim();
          const n1 = name1.trim();
          const r = relation.trim();
          if (!n || !n1 || !r) return;
          const { error } = await handler.addRelation(n, n1, r);
          if (error) return setError(error);
          fetcher();
          close();
        }}
      >
        <div>
          <div class={css({ color: "red" })}>
            <span>{e}</span>
          </div>
          <div>
            <div class={css({ color: "#242424" })}>Name</div>
            <input
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              placeholder="John Doe"
              class={input}
            />
          </div>
          <div class={css({ color: "#242424" })}>Name</div>
          <input
            value={name1}
            onInput={(e) => setName1(e.currentTarget.value)}
            placeholder="Jane Doe"
            class={input}
          />
          <div class={css({ color: "#242424" })}>Relation</div>
          <input
            value={relation}
            onInput={(e) => setRelation(e.currentTarget.value)}
            placeholder="Friends"
            class={input}
          />
          <div>
            <button class={submitButton}>Submit</button>
          </div>
        </div>
      </Form>
    </ModalLayout>
  );
}
