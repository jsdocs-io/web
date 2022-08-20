import { PackageFile } from "@jsdocs-io/extractor";
import PackageFilesList from "./PackageFilesList";

const PackageFilesSection = ({ files }: { files: PackageFile[] }) => {
  return (
    <section className="space-y-2">
      <h2 id="package-files">Package Files ({files.length})</h2>

      <PackageFilesList files={files} />
    </section>
  );
};

export default PackageFilesSection;
