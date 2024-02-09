import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddWordForm from "../../components/entities/AddWordForm/AddWordForm";
import CollectionInfo from "../../components/entities/CollectionInfo/CollectionInfo";
import CollectionTable from "../../components/entities/CollectionTable/CollectionTable";
import GoBackLink from "../../components/ui/GoBackLink/GoBackLink";
import Page from "../../components/ui/Page/Page";
import { openCard, selectCards, selectIsLoading } from "../../store/slices/CollectionsSlice";

const CollectionPage: FC = () => {
   // TODO decompose openCard action to hook
   const dispatch = useDispatch();

   const params = useParams();
   const { id } = params as { id: string };

   const cards = useSelector(selectCards);
   const isLoading = useSelector(selectIsLoading);

   useEffect(() => {
      if (id) {
         const currentCard = cards.find((currentCard) => currentCard.id === id);

         if (currentCard) {
            dispatch(openCard(currentCard));
         }
      }
   }, [id, cards]);

   return (
      <Page isLoading={isLoading}>
         <GoBackLink />

         <CollectionInfo />

         <AddWordForm />

         <CollectionTable />
      </Page>
   );
};

export default CollectionPage;
