import flattenPackageAPI from "../../src/lib/flatten-package-api";

describe("flattenPackageAPI", () => {
  it("returns undefined when API is not available", () => {
    expect(flattenPackageAPI({})).toBeUndefined();
    expect(flattenPackageAPI({ api: undefined })).toBeUndefined();
  });

  it("returns the same API when no namespaces need to be flattened", () => {
    const api = {
      overview: "/** Foo */",
      declarations: {
        variables: [],
        functions: [],
        classes: [],
        interfaces: [],
        enums: [],
        typeAliases: [],
        namespaces: [],
      },
      files: [],
    };

    expect(flattenPackageAPI({ api })).toStrictEqual(api);
  });

  it("flattens a simple list of namespaces", () => {
    const api = {
      overview: "/** Foo */",
      declarations: {
        namespaces: [
          { id: "a", declarations: { namespaces: [] } },
          { id: "b", declarations: { namespaces: [] } },
        ],
      },
      files: [],
    };

    expect(flattenPackageAPI({ api: api as any })).toStrictEqual(api);
  });

  it("flattens namespaces two levels deep", () => {
    const api = {
      overview: "/** Foo */",
      declarations: {
        namespaces: [
          {
            id: "a",
            declarations: {
              namespaces: [
                {
                  id: "a.aa",
                  declarations: { namespaces: [] },
                },
                {
                  id: "a.bb",
                  declarations: { namespaces: [] },
                },
              ],
            },
          },
          {
            id: "b",
            declarations: {
              namespaces: [
                {
                  id: "b.aa",
                  declarations: { namespaces: [] },
                },
                {
                  id: "b.bb",
                  declarations: { namespaces: [] },
                },
              ],
            },
          },
        ],
      },
      files: [],
    };

    expect(flattenPackageAPI({ api: api as any })).toStrictEqual({
      overview: "/** Foo */",
      declarations: {
        namespaces: [
          {
            id: "a",
            declarations: { namespaces: [] },
          },
          {
            id: "a.aa",
            declarations: { namespaces: [] },
          },
          {
            id: "a.bb",
            declarations: { namespaces: [] },
          },
          {
            id: "b",
            declarations: { namespaces: [] },
          },
          {
            id: "b.aa",
            declarations: { namespaces: [] },
          },
          {
            id: "b.bb",
            declarations: { namespaces: [] },
          },
        ],
      },
      files: [],
    });
  });

  it("flattens namespaces three levels deep", () => {
    const api = {
      overview: "/** Foo */",
      declarations: {
        namespaces: [
          {
            id: "a",
            declarations: {
              namespaces: [
                {
                  id: "a.aa",
                  declarations: {
                    namespaces: [
                      {
                        id: "a.aa.aaa",
                        declarations: {
                          namespaces: [],
                        },
                      },
                    ],
                  },
                },
                {
                  id: "a.bb",
                  declarations: { namespaces: [] },
                },
              ],
            },
          },
          {
            id: "b",
            declarations: {
              namespaces: [
                {
                  id: "b.aa",
                  declarations: {
                    namespaces: [
                      {
                        id: "b.aa.aaa",
                        declarations: {
                          namespaces: [],
                        },
                      },
                    ],
                  },
                },
                {
                  id: "b.bb",
                  declarations: { namespaces: [] },
                },
              ],
            },
          },
        ],
      },
      files: [],
    };

    expect(flattenPackageAPI({ api: api as any })).toStrictEqual({
      overview: "/** Foo */",
      declarations: {
        namespaces: [
          {
            id: "a",
            declarations: { namespaces: [] },
          },
          {
            id: "a.aa",
            declarations: { namespaces: [] },
          },
          {
            id: "a.aa.aaa",
            declarations: { namespaces: [] },
          },
          {
            id: "a.bb",
            declarations: { namespaces: [] },
          },
          {
            id: "b",
            declarations: { namespaces: [] },
          },
          {
            id: "b.aa",
            declarations: { namespaces: [] },
          },
          {
            id: "b.aa.aaa",
            declarations: { namespaces: [] },
          },
          {
            id: "b.bb",
            declarations: { namespaces: [] },
          },
        ],
      },
      files: [],
    });
  });
});
