import stream from "stream";
import { loadObject, storeObject } from "../../src/lib/storage";

describe("loadObject", () => {
  it("uses the default client by default", async () => {
    expect.assertions(1);

    const obj = await loadObject({ name: "" });
    expect(obj).toBeUndefined();
  });

  it("returns the object found in storage and parsed from JSON", async () => {
    expect.assertions(1);

    const mockClient = {
      async getObject() {
        return stream.Readable.from(['{"x":1}']);
      },
      async putObject() {
        throw new Error("not implemented");
      },
    };

    const obj = await loadObject({ name: "foo", client: mockClient });
    expect(obj).toStrictEqual({ x: 1 });
  });

  it("returns undefined if an object cannot be parsed from JSON", async () => {
    expect.assertions(1);

    const mockClient = {
      async getObject() {
        return stream.Readable.from(["{"]);
      },
      async putObject() {
        throw new Error("not implemented");
      },
    };

    const obj = await loadObject({ name: "foo", client: mockClient });
    expect(obj).toBeUndefined();
  });

  it("returns undefined if an object cannot be retrieved", async () => {
    expect.assertions(1);

    const mockClient = {
      async getObject() {
        throw new Error("object not found");
      },
      async putObject() {
        throw new Error("not implemented");
      },
    };

    const obj = await loadObject({ name: "foo", client: mockClient });
    expect(obj).toBeUndefined();
  });
});

describe("storeObject", () => {
  it("uses the default client by default", async () => {
    expect.assertions(1);

    await storeObject({ name: "", obj: {} });
    expect(true).toBeTruthy();
  });

  it("tries to store an object", async () => {
    expect.assertions(1);

    const mockClient = {
      async getObject() {
        throw new Error("not implemented");
      },
      async putObject() {
        throw new Error("operation failed");
      },
    };

    await storeObject({ name: "foo", obj: {}, client: mockClient });
    expect(true).toBeTruthy();
  });
});
