const isValidLicense = ({ license }: { license?: string }): boolean => {
  return (
    license !== undefined &&
    license.toLowerCase() !== "unlicensed" &&
    !license.toLowerCase().startsWith("see ")
  );
};

export default isValidLicense;
