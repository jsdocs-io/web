const PackageMissingTypesAlert = () => {
  return (
    <div className="flex justify-center p-4 border-2 border-yellow-500 rounded">
      <p className="mt-0 font-bold">
        Unfortunately type definitions are currently not available for this
        package
      </p>
    </div>
  );
};

export default PackageMissingTypesAlert;
