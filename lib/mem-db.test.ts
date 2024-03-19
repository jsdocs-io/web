import { fromPartial } from "@total-typescript/shoehorn";
import { Effect } from "effect";
import { expect, test } from "vitest";
import { memDb } from "./mem-db";

test("mem-db", async () => {
	const db = memDb;
	expect(db.name).toMatchInlineSnapshot(`"mem-db"`);
	await expect(
		Effect.runPromise(db.getPackageApi({ pkg: "foo", subpath: "bar" })),
	).rejects.toThrow();
	await expect(
		Effect.runPromise(
			db.setPackageApi({
				pkg: "foo",
				subpath: "bar",
				pkgApi: fromPartial({
					name: "foo",
					version: "1.0.0",
				}),
			}),
		),
	).resolves.toBeUndefined();
	await expect(
		Effect.runPromise(db.getPackageApi({ pkg: "foo", subpath: "bar" })),
	).resolves.toBeDefined();
});
