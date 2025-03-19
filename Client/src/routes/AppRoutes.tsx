import { Routes, Route, Navigate } from 'react-router-dom';

import CatalogPage from '../pages/catalog/CatalogPage.tsx';
import BuilderPage from '../pages/builder/BuilderPage.tsx';
import QuestionnairePage from '../pages/questionnaire/QuestionnairePage.tsx';
import EditPage from '../pages/edit/EditPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/catalog" />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="builder" element={<BuilderPage />} />
      <Route path="questionaire/:quizId" element={<QuestionnairePage />} />
      <Route path="edit/:quizId" element={<EditPage />} />
  </Routes>
  );
}
