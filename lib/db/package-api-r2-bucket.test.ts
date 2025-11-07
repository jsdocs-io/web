import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sdkStreamMixin } from "@smithy/util-stream";
import { fromAny } from "@total-typescript/shoehorn";
import { mockClient } from "aws-sdk-client-mock";
import { compressSync, strToU8 } from "fflate";
import { goTry } from "go-go-try";
import { beforeEach } from "node:test";
import { Readable } from "stream";
import { expect, test } from "vitest";
import { PackageApiR2Bucket } from "./package-api-r2-bucket";

const s3Mock = mockClient(S3Client);

beforeEach(() => {
	s3Mock.reset();
});

test("setPackageApi fail", async () => {
	s3Mock.on(PutObjectCommand).rejects("test");
	const db = new PackageApiR2Bucket();
	const [err] = await goTry(db.setPackageApi("foo", fromAny({ name: "foo" })));
	expect(err).toBeDefined();
});

test("setPackageApi success", async () => {
	s3Mock.on(PutObjectCommand).resolves({});
	const db = new PackageApiR2Bucket();
	const [err] = await goTry(db.setPackageApi("foo", fromAny({ name: "foo" })));
	expect(err).toBeUndefined();
});

test("getPackageApi fail", async () => {
	s3Mock.on(GetObjectCommand).rejects("test");
	const db = new PackageApiR2Bucket();
	const [err] = await goTry(db.getPackageApi("foo"));
	expect(err).toBeDefined();
});

test("getPackageApi success", async () => {
	const pkgApiGz = compressSync(strToU8(JSON.stringify({ name: "foo" })));
	const stream = new Readable();
	stream.push(pkgApiGz);
	stream.push(null);
	s3Mock.on(GetObjectCommand).resolves({ Body: sdkStreamMixin(stream) });
	const db = new PackageApiR2Bucket();
	const [err, pkgApi] = await goTry(db.getPackageApi("foo"));
	expect(err).toBeUndefined();
	expect(pkgApi).toMatchInlineSnapshot(`
		{
		  "name": "foo",
		}
	`);
});
