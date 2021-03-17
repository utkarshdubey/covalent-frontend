import { css } from "catom";
import { useState, useEffect, useContext } from "@hydrophobefireman/ui-lib";
import {
  bold,
  spacerText,
  container,
  spacer,
  grey,
  userListBox,
  usersWrap,
  circle,
  personWrap,
  fetchButton,
} from "./relationships.styles";
import { GraphViewer } from "@/components/GraphViewer";
import { handler, People, RelationGraph } from "@/util/api";
import { FetchContext } from "@/context";

export function Relationships({ mobile }: { mobile?: boolean }) {
  const [isFinding, setFinding] = useState(false);
  return (
    <div class={[container, mobile ? css({ flex: 1 }) : null]}>
      <SpacerText isFinding={isFinding} setFinding={setFinding} />
      <RelationshipList setFinding={setFinding} isFinding={isFinding} />
    </div>
  );
}

function SpacerText({ isFinding, setFinding }: any) {
  return (
    <div class={spacerText}>
      <span class={isFinding ? grey : bold} onClick={() => setFinding(false)}>
        People
      </span>
      <span class={[bold, spacer]}>/</span>
      <span class={isFinding ? bold : grey}>Relationships</span>
    </div>
  );
}

function RelationshipList({
  setFinding,
  isFinding,
}: {
  setFinding(b: boolean): void;
  isFinding: boolean;
}) {
  const [fromPerson, setFromPerson] = useState<string>(null);
  const [toPerson, setToPerson] = useState<string>(null);
  const [graphMode, setGraphMode] = useState(false);
  const [data, setData] = useState<RelationGraph[]>(null);
  const [error, setError] = useState<string>(null);
  const people = usePeopleList(setError);
  const isValid = fromPerson && toPerson;
  function reset() {
    setGraphMode(false);
    setData(null);
    setToPerson(null);
    setFromPerson(null);
    setError(null);
  }
  useEffect(() => {
    !isFinding && reset();
  }, [isFinding]);
  if (graphMode) {
    return (
      <section class={userListBox}>
        <h1 class="sr-only">Relationships</h1>

        <div>
          {data ? (
            <GraphViewer graph={data} reset={reset} />
          ) : (
            <div>Finding relations...</div>
          )}
        </div>
      </section>
    );
  }
  return (
    <>
      <section class={userListBox}>
        <h1 class="sr-only">List of people</h1>
        <div>
          <div class={css({ color: "red" })}>{error}</div>
          {!error && people ? (
            <PeopleListRenderer
              people={people}
              fromPerson={fromPerson}
              setFromPerson={setFromPerson}
              toPerson={toPerson}
              setToPerson={setToPerson}
            />
          ) : (
            !error && <div>Getting users...</div>
          )}
        </div>
      </section>
      {isValid && (
        <div>
          <button
            class={fetchButton}
            onClick={async () => {
              setFinding(true);
              setGraphMode(true);
              setData(await handler.getRelationships(fromPerson, toPerson));
            }}
          >
            Fetch Relationship
          </button>
        </div>
      )}
    </>
  );
}

function PeopleListRenderer({
  people,
  fromPerson,
  toPerson,
  setFromPerson,
  setToPerson,
}: {
  people: People[];
  fromPerson: string;
  toPerson: string;
  setFromPerson: (s: string) => void;
  setToPerson: (s: string) => void;
}) {
  const onPersonClick = (id: string) => {
    if (id === fromPerson) {
      return setFromPerson(null);
    }
    if (id === toPerson) {
      return setToPerson(null);
    }
    if (!fromPerson) {
      return setFromPerson(id);
    }

    return setToPerson(id);
  };
  return (
    <div class={[usersWrap]}>
      {people.map((x) => (
        <PersonItem
          data={x}
          isCheck={x._id === fromPerson || x._id === toPerson}
          update={onPersonClick}
        />
      ))}
    </div>
  );
}
function usePeopleList(setError: (a: string) => void): People[] {
  const { setFetcher } = useContext(FetchContext);
  const [l, setList] = useState(null);
  const fetcher = async () => {
    setList(null);
    setError(null);
    try {
      const { people } = await handler.getAllUsers();
      setList(people);
    } catch (e) {
      setError("Could not fetch users..");
    }
  };

  useEffect(() => {
    setFetcher(() => fetcher);

    fetcher();
  }, []);
  return l;
}
function PersonItem({ data: x, isCheck, update }) {
  return (
    <div class={personWrap} onClick={() => update(x._id)}>
      {isCheck ? <Checked /> : <div class={circle}></div>}
      <div>{x.name}</div>
    </div>
  );
}
function Checked() {
  return (
    <svg
      className="w-6 h-6"
      height="3rem"
      width="3rem"
      fill="none"
      stroke-width="2px"
      class={css({ backgroundColor: "green", borderRadius: "50%" })}
      stroke="white"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
