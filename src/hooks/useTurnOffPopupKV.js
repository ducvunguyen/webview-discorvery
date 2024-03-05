import { useDispatch, useSelector } from 'react-redux';
import { updateTurnOffPopup } from '../redux/slices/turnOffPopupKVSlice';

const useTurnOffPopupKV = () => {
  const isOpenPopup = useSelector(state => state.turnOffPopupKVSlice.isOpen)
  const dispatch = useDispatch()

  return {
    isOpenPopup,
    turnOffPopup: () => dispatch(updateTurnOffPopup(false))
  }
}

export default useTurnOffPopupKV