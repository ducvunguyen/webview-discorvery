const data = [0, 1, 2, 3];

const Skeleton = ({ loading, children }) => {
  if (!loading) return children;

  return (
    <div className="grid grid-cols-4">
      {data.map((item) => (
        <div className="flex flex-col justify-center items-center mb-6" key={item}>
          <div
            className="skeleton rounded-md flex justify-center items-center p-2"
            style={{ width: '4.8rem', height: '4.8rem' }}
          />
          <div className="skeleton mt-2 h-5 w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
