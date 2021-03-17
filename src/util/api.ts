const MOCK_MODE = false;
const _endpoint = location.host.includes("localhost")
  ? "http://localhost:8300"
  : "https://domain.com";
function makeUrl(x: string) {
  return new URL(x, _endpoint).href;
}
export interface Relationship {
  person: string;
  relation: string;
}
export interface People {
  name: string;
  relationships: Relationship[];
  _id: string;
}
export type RelationGraph = [
  {
    id: string;
    name: string;
    relation: string;
    isBeginning: boolean;
    done: boolean;
  }
];
class Handler {
  private _getRequest<T>(url: string): Promise<T> {
    return fetch(makeUrl(url)).then((x) => x.json());
  }

  private _postRequest<T>(url: string, data: any): Promise<T> {
    return fetch(makeUrl(url), {
      method: "post",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    }).then((x) => x.json());
  }

  public getAllUsers(): Promise<{ people: People[] }> {
    if (MOCK_MODE) {
      return Promise.resolve({
        people: arrOf(10).map(() => ({
          name: randomString(),
          _id: randomString(),
          relationships: arrOf(3).map(() => ({
            person: randomString(),
            relation: "friend",
          })),
        })),
      });
    }
    return this._getRequest<{ people: People[] }>("/people");
  }
  public getRelationships(from: string, to: string): Promise<RelationGraph[]> {
    if (MOCK_MODE) {
      const arr = arrOf(3).map(() =>
        arrOf(5).map((_, i) => ({
          id: randomString(),
          name: randomString(),
          relation: "friend",
          done: i === 4,
          isBeginning: i === 0,
        }))
      );
      return Promise.resolve(arr as any);
    }
    return this._postRequest<any>("/people/relationships", {
      people: [from, to],
    }).then((x) => x.relationship);
  }
  public addPerson(name: string) {
    return this._postRequest<{ error: string }>("/people/add", { name });
  }
  public addRelation(name1: string, name2: string, relation: string) {
    return this._postRequest<{ error: string }>("/people/add/relation", {
      people: [name1, name2],
      relationship: relation,
    });
  }
}

export const handler = new Handler();

function randomString() {
  return Math.random().toString(16).replace(".", "");
}

function arrOf(n: number) {
  return Array.from({ length: n });
}
