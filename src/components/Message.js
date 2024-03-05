import { useEffect, useRef, useState } from 'react';
import { EVENT } from 'config/constants';
import eventDispatcher from 'systems/utils/eventDispatcher';

export const message = (content) => eventDispatcher.dispatch(EVENT.SHOW_MESSAGE, content);

const Message = ({ delay = 1200 }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const _timeoutRef = useRef();

  useEffect(() => {
    return eventDispatcher.listen(EVENT.SHOW_MESSAGE, (event, payload) => {
      setContent(payload);
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    _timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, delay);

    return () => clearInterval(_timeoutRef.current);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed top-1/3 z-50 w-screen text-center">
      <span className="py-2 px-4 bg-txt-10 text-white">{content}</span>
    </div>
  );
};

export default Message;
