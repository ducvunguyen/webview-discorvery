const Skeleton = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <>
      <div
        className="bg-no-repeat rounded-t-lg skeleton leading-none"
        style={{
          height: '10.5rem',
        }}
      />
      <div className="my-4 h-5 skeleton" />
      <div className="my-4 h-5 w-1/2 mt skeleton" />
      <div className="flex justify-between items-center">
        <span className="skeleton w-28 h-5" />
        <span className="skeleton rounded-xl w-40 h-12" />
      </div>
    </>
  );
};

export default Skeleton;
