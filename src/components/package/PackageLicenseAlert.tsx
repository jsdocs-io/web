const PackageLicenseAlert = () => {
  return (
    <div className="flex justify-center p-4 border-2 border-red-500 rounded">
      <p className="mt-0 font-bold">
        API extraction from unlicensed or proprietary packages is not supported
      </p>
    </div>
  );
};

export default PackageLicenseAlert;
