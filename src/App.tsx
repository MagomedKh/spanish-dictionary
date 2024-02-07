import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import CollectionsList from "./components/CollectionsList";
import Collection from "./components/Collection";
import CollectionsListPage from "./pages/CollectionsListPage/CollectionsListPage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import { useFetchCards } from "./hooks/useFetchCards";

function App() {
   useFetchCards();

   return (
      <div className={styles.app}>
         <Routes>
            <Route
               index
               path="/collections"
               element={<CollectionsListPage />}
            />
            <Route path="/collections/:id" element={<CollectionPage />} />
            <Route path="*" element={<Navigate to="/collections" />} />
         </Routes>
      </div>
   );
}

export default App;
