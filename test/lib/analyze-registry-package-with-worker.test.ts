import analyzeRegistryPackageWithWorker from "../../src/lib/analyze-registry-package-with-worker";

describe("analyzeRegistryPackageWithWorker", () => {
  it("rejects when the timeout expires", async () => {
    expect.assertions(1);

    try {
      await analyzeRegistryPackageWithWorker({
        name: "short-time-ago",
        version: "2.0.0",
        timeout: 100,
      });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it("resolves when the package analysis is done", async () => {
    expect.assertions(1);

    const info = await analyzeRegistryPackageWithWorker({
      name: "short-time-ago",
      version: "2.0.0",
    });

    expect(info).toBeDefined();
  });
});
