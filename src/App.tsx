import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import ErrorBoundry from './pages/error-boundry';
import ResumeForm from './pages/resume-form/resume-form';
import Resume from './pages/resume/resume';

function App() {
  return (
    <div className="h-full">
      <Provider>
        <DevTools theme="dark" />
        <ErrorBoundry>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="resume" element={<Resume isPreview={false} />} />
                <Route path="preview" element={<Resume isPreview={true} />} />
                <Route path="" element={<ResumeForm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundry>
      </Provider>
    </div>
  );
}

export default App;
