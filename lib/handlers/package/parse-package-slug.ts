import validateNpmPkgName from "validate-npm-package-name";
import { serverEnv } from "../../server-env";

const ignoredPackages = serverEnv.IGNORED_PACKAGES;

export interface ParsePackageSlugOutput {
	pkg: string;
	pkgName: string;
	subpath: string;
}

export function parsePackageSlug(slug: string): ParsePackageSlugOutput {
	slug = slug.trim();
	if (!slug) throw new Error("empty package slug");
	const [head = "", ...rest] = slug.split("/").map((s) => s.trim());
	if (head.startsWith("@")) return parseScopedPkg(head, rest);
	return parseBarePkg(head, rest);
}

function parseScopedPkg(head: string, rest: string[]): ParsePackageSlugOutput {
	const [second = "", ...rest1] = rest;
	const [name = "", tag] = second.split("@").map((s) => s.trim());
	const pkgName = `${head}/${name}`;
	checkPkgName(pkgName);
	checkTag(tag);
	const pkg = tag ? `${pkgName}@${tag}` : pkgName;
	const subpath = parseSubpath(pkgName, rest1);
	return { pkg, pkgName, subpath };
}

function parseBarePkg(head: string, rest: string[]): ParsePackageSlugOutput {
	const [pkgName = "", tag] = head.split("@").map((s) => s.trim());
	checkPkgName(pkgName);
	checkTag(tag);
	const pkg = tag ? `${pkgName}@${tag}` : pkgName;
	const subpath = parseSubpath(pkgName, rest);
	return { pkg, pkgName, subpath };
}

function checkPkgName(pkgName: string) {
	const { validForNewPackages } = validateNpmPkgName(pkgName);
	if (!validForNewPackages) throw new Error("invalid npm package name");
	if (ignoredPackages.has(pkgName)) throw new Error("ignored package");
}

function checkTag(tag: string | undefined) {
	if (!tag) return;

	// Reject tag-like protocols (e.g., "foo@https://example.com/foo.tgz").
	if (tag.includes(":")) throw new Error("invalid tag-like protocol");
}

function parseSubpath(pkgName: string, rest: string[]): string {
	const subpath = rest.filter(Boolean).join("/");
	if (!subpath || subpath === pkgName) return ".";
	return subpath;
}
