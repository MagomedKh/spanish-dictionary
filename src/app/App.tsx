import { Navigate, Route, Routes } from "react-router-dom";
import { useFetchDictionaries } from "../hooks/useFetchDictionaries";
import DictionariesListPage from "../pages/DictionariesListPage/DictionariesListPage";
import DictionaryPage from "../pages/DictionaryPage/DictionaryPage";
import "./index.css";

function App() {
   useFetchDictionaries();

   return (
      <Routes>
         <Route index path="/dictionaries" element={<DictionariesListPage />} />
         <Route path="/dictionaries/:id" element={<DictionaryPage />} />
         <Route path="*" element={<Navigate to="/dictionaries" />} />
      </Routes>
   );
}

export default App;
