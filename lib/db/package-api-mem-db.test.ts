import { fromAny } from "@total-typescript/shoehorn";
import { goTry } from "go-go-try";
import { expect, test } from "vitest";
import { PackageApiMemDb } from "./package-api-mem-db";

test("PackageApiMemDb", async () => {
	const db = new PackageApiMemDb();
	expect(db.dbName).toBe("PackageApiMemDb");
	const [err1] = await goTry(db.getPackageApi("foo"));
	const [err2] = await goTry(db.setPackageApi("foo", fromAny({ name: "foo" })));
	const [err3, pkgApi] = await goTry(db.getPackageApi("foo"));
	expect(err1).toBeDefined();
	expect(err2).toBeUndefined();
	expect(err3).toBeUndefined();
	expect(pkgApi).toMatchInlineSnapshot(`
		{
		  "name": "foo",
		}
	`);
});
