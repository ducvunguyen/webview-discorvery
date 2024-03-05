import classNames from 'classnames';

const Loading = ({ fullScreen, color, bgColor, size = '0.4rem', isLoading = true }) => {
  const loadingColor = color || 'blue';
  if (!isLoading) return null;

  return (
    <div
      className={classNames('flex justify-center items-center w-full', {
        'fixed top-0 left-0 w-screen h-screen z-10': fullScreen,
      })}
      style={{ backgroundColor: bgColor ? bgColor : 'G1-110' }}
    >
      <div
        className=" w-12 h-12 animate-spin rounded-full"
        style={{
          border: `${size} solid transparent`,
          borderTop: `${size} solid ${loadingColor}`,
          borderLeft: `${size} solid ${loadingColor}`,
          borderRight: `${size} solid ${loadingColor}`,
        }}
      />
    </div>
  );
};

export default Loading;
