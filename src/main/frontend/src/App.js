import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminBoardList from "./pages/admin/AdminBoardList";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMemberList from "./pages/admin/AdminMemberList";
import AdminScBoardList from "./pages/admin/AdminScBoardList";
import CheckPwd from "./pages/editInfo/CheckPwd";
import EditInfo from "./pages/editInfo/EditInfo";
import FindInfo from "./pages/findInfo/FindInfo";
import Login from "./pages/login/Login";
import Nav from "../src/containers/common/Nav";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SocialDetail from "./pages/social/SocialDetail";
import SocialList from "./pages/social/SocialList";
import SocialUpdate from "./pages/social/SocialUpdate";
import SocialWrite from "./pages/social/SocialWrite";
import SocketTest from "./pages/chat/SocketTest";
import StudyDetail from "./pages/study/StudyDetail";
import StudyList from "./pages/study/StudyList";
import StudyWrite from "./pages/study/StudyWrite";
import Terms from "./pages/register/Terms";
import StudyUpdate from "./pages/study/StudyUpdate";


// import Admin from "./pages/admin/Admin";
function App() {
  return (
      <Router>
        <Nav />
        <Routes>
          {/* <Route path="/Admin" element={<Admin />} /> */}
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminScBoardList" element={<AdminScBoardList />} />
          <Route path="/AdminBoardList" element={<AdminBoardList />} />
          <Route path="/AdminMemberList" element={<AdminMemberList />} />
          <Route exact path="/AdminMember/:userId" element={<AdminEditUser />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/FindInfo" element={<FindInfo />} />
          <Route path="/EditInfo" element={<EditInfo />} />
          <Route path="/CheckPwd" element={<CheckPwd />} />
          <Route path="/studies" element={<StudyList />} />
          <Route path="/study/write" element={<StudyWrite />} />
          <Route exact path="/study/:studyId" element={<StudyDetail />} />
          <Route exact path="/study/edit/:studyId" element={<StudyUpdate />} />
          <Route path="/Socket" element={<SocketTest />} />
          <Route path="/social" element={<SocialList />} />
          <Route exact path="/social/:socialId" element={<SocialDetail />} />
          <Route
              exact
              path="/social/:socialId/update"
              element={<SocialUpdate />}
          />
          <Route path="/social/write" element={<SocialWrite />} />
        </Routes>
        {/* <Admin></Admin> */}
      </Router>
  );
}

export default App;
