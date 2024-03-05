import useAuth from 'hooks/useAuth';
import AppRoutes from 'routes';
import ModalCloseApp from 'pages/App/ModalCloseApp';
import { Message, Loading } from 'components';

const App = () => {
  const { loading, isAuth } = useAuth();

  return (
    <>
      {/*{isAuth && <AppRoutes />}*/}
      <AppRoutes />
      <Loading fullScreen isLoading={loading} />
      {/*<ModalCloseApp show={!loading && !isAuth} />*/}
      <Message />
    </>
  );
};

export default App;
