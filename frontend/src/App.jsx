import { Route, Routes } from "react-router-dom";
import {
  CreateJob,
  EditHunter,
  EditJob,
  EditRecruiter,
  Home,
  Hunters,
  Jobs,
  NotFound,
  RecruiterProfile,
  Signup,
  SingleHunter,
  Login,
  SingleJob,
  RecruiterDashboard,
} from "./pages";
import { LoggedNav, Navbar } from "./components";

function App() {
  return (
    <div className="relative">
      {/* <Navbar /> */}
      <LoggedNav />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Jobs  */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={<CreateJob />} />
          <Route path="/jobs/edit/:jobId" element={<EditJob />} />
          <Route path="/jobs/:jobId" element={<SingleJob />} />

          {/* Hunter  */}
          <Route path="/hunters" element={<Hunters />} />
          <Route path="/hunters/:username" element={<SingleHunter />} />
          <Route path="/hunters/edit/:username" element={<EditHunter />} />

          {/* Recruiter  */}
          <Route path="/recruiters/:username" element={<RecruiterProfile />} />
          <Route
            path="/recruiters/edit/:username"
            element={<EditRecruiter />}
          />
          <Route
            path="//recruiters/dashboard"
            element={<RecruiterDashboard />}
          />

          {/* Auth  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
