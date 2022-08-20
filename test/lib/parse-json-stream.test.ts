import stream from "stream";
import parseJSONStream from "../../src/lib/parse-json-stream";

describe("parseJSONStream", () => {
  it("rejects when the JSON stream is invalid", async () => {
    expect.assertions(1);

    try {
      await parseJSONStream({ jsonStream: stream.Readable.from(["{"]) });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it("resolves when the JSON stream is valid", async () => {
    expect.assertions(1);

    const got = await parseJSONStream({
      jsonStream: stream.Readable.from(['{"x":1}']),
    });

    expect(got).toStrictEqual({ x: 1 });
  });
});
