import useQueryCommon from "./useQueryCommon";
import {updateCards} from 'redux/slices/cardsSlice';
import {getCards} from "../services/card";

const useCard = () => {
  const params = {
    page: 0,
    pageSize: 999
  }

  const cards = useQueryCommon({
    queryKey: 'cards',
    queryFn: () => getCards(params).then(({data}) => data?.cards),
    reduxAction: updateCards
  });

  return cards
}

export default useCard;