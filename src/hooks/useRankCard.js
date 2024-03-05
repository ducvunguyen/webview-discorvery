import { useSelector, useDispatch } from 'react-redux'
import { updateRankCard, resetRankCard} from 'redux/slices/rankCardSlice';

const useRankCard = () => {
  const rankCard = useSelector((state) => state.rankCard)
  const dispatch = useDispatch()

  return {
    rankCard,
    updateRankCard : dataFilter => dispatch(updateRankCard(dataFilter)),
    resetRankCard : () => dispatch(resetRankCard())
  }
}

export default useRankCard;