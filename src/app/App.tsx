import { Navigate, Route, Routes } from "react-router-dom";
import { useFetchCards } from "../hooks/useFetchCards";
import CollectionPage from "../pages/CollectionPage/CollectionPage";
import CollectionsListPage from "../pages/CollectionsListPage/CollectionsListPage";
import "./index.css";

function App() {
   useFetchCards();

   return (
      <Routes>
         <Route index path="/collections" element={<CollectionsListPage />} />
         <Route path="/collections/:id" element={<CollectionPage />} />
         <Route path="*" element={<Navigate to="/collections" />} />
      </Routes>
   );
}

export default App;
