const Skeleton = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <>
      <div
        className="bg-no-repeat rounded-t-lg skeleton leading-none"
        style={{
          height: '13rem',
        }}
      />
      <div className="px-4 py-3 bg-white">
        <div className="pb-3 h-5 mb-3 skeleton" />
        <div className="pb-3 h-5 mb-3 skeleton" />
        <div className="skeleton h-3 w-1/2" />
      </div>
    </>
  );
};

export default Skeleton;
