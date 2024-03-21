import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { sdkStreamMixin } from "@smithy/util-stream";
import { fromPartial } from "@total-typescript/shoehorn";
import { mockClient } from "aws-sdk-client-mock";
import { Effect } from "effect";
import { compressSync, strToU8 } from "fflate";
import { beforeEach } from "node:test";
import { Readable } from "stream";
import { expect, test } from "vitest";
import { r2Bucket } from "./r2-bucket";

const s3Mock = mockClient(S3Client);

beforeEach(() => {
	s3Mock.reset();
});

test("setPackageApi fail", async () => {
	s3Mock.on(PutObjectCommand).rejects("test");
	await expect(
		Effect.runPromise(
			r2Bucket.setPackageApi({
				pkg: "foo",
				subpath: "bar",
				pkgApi: fromPartial({
					name: "foo",
					version: "1.0.0",
				}),
			}),
		),
	).rejects.toThrow();
});

test("setPackageApi success", async () => {
	s3Mock.on(PutObjectCommand).resolves({});
	await expect(
		Effect.runPromise(
			r2Bucket.setPackageApi({
				pkg: "foo",
				subpath: "bar",
				pkgApi: fromPartial({
					name: "foo",
					version: "1.0.0",
				}),
			}),
		),
	).resolves.toBeUndefined();
});

test("getPackageApi fail", async () => {
	s3Mock.on(GetObjectCommand).rejects("test");
	await expect(
		Effect.runPromise(
			r2Bucket.getPackageApi({
				pkg: "foo",
				subpath: "bar",
			}),
		),
	).rejects.toThrow();
});

test("getPackageApi success", async () => {
	const pkgApiGz = compressSync(strToU8(JSON.stringify({ name: "foo", version: "1.0.0" })));
	const stream = new Readable();
	stream.push(pkgApiGz);
	stream.push(null);
	s3Mock.on(GetObjectCommand).resolves({ Body: sdkStreamMixin(stream) });
	await expect(
		Effect.runPromise(
			r2Bucket.getPackageApi({
				pkg: "foo",
				subpath: "bar",
			}),
		),
	).resolves.toMatchInlineSnapshot(`
		{
		  "name": "foo",
		  "version": "1.0.0",
		}
	`);
});
