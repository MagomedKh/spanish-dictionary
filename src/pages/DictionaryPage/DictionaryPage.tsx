import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddWordForm from "../../components/entities/AddWordForm/AddWordForm";
import DictionaryInfo from "../../components/entities/DictionaryInfo/DictionaryInfo";
import DictionaryTable from "../../components/entities/DictionaryTable/DictionaryTable";
import GoBackLink from "../../components/ui/GoBackLink/GoBackLink";
import Page from "../../components/ui/Page/Page";
import {
   openDictionary,
   selectDictionaries,
   selectIsLoading,
} from "../../store/slices/DictionariesSlice";

const DictionaryPage: FC = () => {
   // TODO decompose openDictionary action to hook
   const dispatch = useDispatch();

   const params = useParams();
   const { id } = params as { id: string };

   const dictionaries = useSelector(selectDictionaries);
   const isLoading = useSelector(selectIsLoading);

   useEffect(() => {
      if (id) {
         const currentDictionary = dictionaries.find(
            (currentDictionary) => currentDictionary.id === id
         );

         if (currentDictionary) {
            dispatch(openDictionary(currentDictionary));
         }
      }
   }, [id, dictionaries]);

   return (
      <Page isLoading={isLoading}>
         <GoBackLink />

         <DictionaryInfo />

         <AddWordForm />

         <DictionaryTable />
      </Page>
   );
};

export default DictionaryPage;
