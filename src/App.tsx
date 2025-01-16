import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProjectSetup from './components/steps/ProjectSetup';
//import RequirementsCapture from './components/steps/RequirementsCapture';
import DataModel from './components/steps/DbSchema';
//import EntityDesigner from './components/steps/EntityDesigner';
import CodeGeneration from './components/steps/CodeGeneration';
import ProjectSummary from './components/steps/ProjectSummary';
import StepProgress from './components/common/StepProgress';
import { ProjectProvider } from './context/ProjectContext';
import FunctionalRequirements from './components/steps/FunctionalRequirements';

export default function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/project-setup"
              element={
                <>
                  <StepProgress />
                  <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <ProjectSetup />
                  </div>
                </>
              }
            />
            <Route
              path="/functional-requirements"
              element={
                <>
                  <StepProgress />
                  <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <FunctionalRequirements/>
                  </div>
                </>
              }
            />
            <Route
              path="/data-base"
              element={
                <>
                  <StepProgress />
                  <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <DataModel />
                  </div>
                </>
              }
            />
            <Route
              path="/code-generation"
              element={
                <>
                  <StepProgress />
                  <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <CodeGeneration />
                  </div>
                </>
              }
            />
            <Route
              path="/project-summary"
              element={
                <>
                  <StepProgress />
                  <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <ProjectSummary />
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ProjectProvider>
  );
}