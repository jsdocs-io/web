import minSemverVersion from "../../src/lib/min-semver-version";

describe("minSemverVersion", () => {
  it("should return undefined when the minimum version cannot be found", () => {
    // Invalid ranges
    expect(minSemverVersion({ semver: "" })).toBeUndefined();
    expect(minSemverVersion({ semver: "foo" })).toBeUndefined();

    // X-ranges
    expect(minSemverVersion({ semver: "*" })).toBeUndefined();
    expect(minSemverVersion({ semver: "x" })).toBeUndefined();
    expect(minSemverVersion({ semver: "X" })).toBeUndefined();

    // Less than ranges
    expect(minSemverVersion({ semver: "<=1.0.0" })).toBeUndefined();
  });

  it("should return the minimum version when possible", () => {
    expect(minSemverVersion({ semver: "1.*" })).toBe("1.0.0");
    expect(minSemverVersion({ semver: "^1.0.0" })).toBe("1.0.0");
    expect(minSemverVersion({ semver: ">=1.0.0" })).toBe("1.0.0");
    expect(minSemverVersion({ semver: "=1.0.0" })).toBe("1.0.0");
    expect(minSemverVersion({ semver: "~1.0.0" })).toBe("1.0.0");
  });
});
