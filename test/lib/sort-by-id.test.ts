import { sortByID } from "../../src/lib/sort-by-id";

describe("sortByID", () => {
  it("supports empty lists", () => {
    expect(sortByID([])).toEqual([]);
  });

  it("supports lists with one item", () => {
    expect(sortByID([{ id: "a" }])).toEqual([{ id: "a" }]);
  });

  it("sorts list of items with an ID", () => {
    expect(sortByID([{ id: "b" }, { id: "a" }])).toEqual([
      { id: "a" },
      { id: "b" },
    ]);
  });
});
