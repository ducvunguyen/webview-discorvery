const LogoBrand = ({ logoUrl }) => {
  return (
    <div
      className="absolute left-6 top-64 bg-white rounded-full h-28 w-28 bg-contain bg-no-repeat"
      style={{ backgroundImage: `url(${logoUrl})` }}
    />
  );
};

export default LogoBrand;
