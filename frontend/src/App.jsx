import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  CreateJob,
  EditHunter,
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
  CreateHunter,
  CreateRecruiter,
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

          {/* Hunter  */}
          <Route path="/hunters" element={<Hunters />} />
          <Route path="/hunters/:username" element={<SingleHunter />} />
          <Route
            path="/hunters/edit/:userName"
            element={authUser && <EditHunter />}
          />
          <Route
            path="/hunters/create/:username"
            element={authUser && <CreateHunter />}
          />

          {/* Jobs  */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/create" element={authUser && <CreateJob />} />
          <Route path="/jobs/:jobId" element={<SingleJob />} />

          {/* Recruiter  */}
          <Route
            path="recruiters/create/:username"
            element={authUser && <CreateRecruiter />}
          />
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
          <Route path="/login" element={authUser ? <Jobs /> : <Login />} />
          <Route path="/signup" element={authUser ? <Jobs /> : <Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
