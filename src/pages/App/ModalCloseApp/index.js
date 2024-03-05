import { useEffect, useState } from 'react';
import { Button, Modal } from 'components';
import eventDispatcher from 'systems/utils/eventDispatcher';
import { postMessageToApp } from 'systems/utils/helper';
import { EVENT, NATIVE_ACTION } from 'config/constants';

const ModalCloseApp = ({ show }) => {
  const [open, setOpen] = useState(false);

  useEffect(
    () =>
      eventDispatcher.listen(EVENT.SHOW_MODAL_CLOSE_APP, () => {
        setOpen(true);
      }),
    []
  );

  const handleCloseApp = () => postMessageToApp({ type: NATIVE_ACTION.CLOSE_APP });

  return (
    <Modal open={open || show}>
      <div className="p-14 text-center">
        <div className="text-3xl font-bold">Phiên đăng nhập hết hạn</div>
        <div className="text-2xl my-8">Vui lòng mở lại ứng dụng</div>
        <Button onClick={handleCloseApp}>Đồng ý</Button>
      </div>
    </Modal>
  );
};

export default ModalCloseApp;
