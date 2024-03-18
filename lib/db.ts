import type { PackageApi } from "@jsdocs-io/extractor";
import { Context, Data, Effect } from "effect";

export class DbGetError extends Data.TaggedError("DbGetError")<{ readonly cause?: unknown }> {}
export class DbSetError extends Data.TaggedError("DbSetError")<{ readonly cause?: unknown }> {}

export type GetPackageApiOptions = {
	pkg: string;
	subpath: string;
};

export type SetPackageApiOptions = {
	pkg: string;
	subpath: string;
	pkgApi: PackageApi;
};

export class Db extends Context.Tag("Db")<
	Db,
	{
		readonly getPackageApi: (opts: GetPackageApiOptions) => Effect.Effect<PackageApi, DbGetError>;
		readonly setPackageApi: (opts: SetPackageApiOptions) => Effect.Effect<void, DbSetError>;
	}
>() {}
