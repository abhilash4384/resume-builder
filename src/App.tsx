import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResumeForm from './pages/resume-form/resume-form';
import Resume from './pages/resume/resume';

function App() {
  return (
    <div className="h-full">
      <Provider>
        <DevTools theme="dark" />
        <BrowserRouter>
          <Routes>
            <Route
              path="/resume"
              element={<Resume isPreview={false} />}
            ></Route>
            <Route
              path="/preview"
              element={<Resume isPreview={true} />}
            ></Route>
            <Route path="/" element={<ResumeForm />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
