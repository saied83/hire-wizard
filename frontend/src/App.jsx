import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import { Navbar } from "./components";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="relative">
      <Navbar />
      <Toaster />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Jobs  */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={authUser && <CreateJob />} />
          <Route path="/jobs/edit/:jobId" element={authUser && <EditJob />} />
          <Route path="/jobs/:jobId" element={<SingleJob />} />

          {/* Hunter  */}
          <Route path="/hunters" element={<Hunters />} />
          <Route path="/hunters/:username" element={<SingleHunter />} />
          <Route
            path="/hunters/edit/:username"
            element={authUser && <EditHunter />}
          />

          {/* Recruiter  */}
          <Route
            path="/recruiters/:username"
            element={authUser && <RecruiterProfile />}
          />
          <Route
            path="/recruiters/edit/:username"
            element={authUser && <EditRecruiter />}
          />
          <Route
            path="/recruiters/dashboard/:username"
            element={authUser && <RecruiterDashboard />}
          />

          {/* Auth  */}
          <Route path="/login" element={authUser ? <></> : <Login />} />
          <Route path="/signup" element={authUser ? <></> : <Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
