import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./api/fbase";
//import "./pages/admin/firebase-messaging-sw";


import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";

import AdminBoardList from "./pages/admin/AdminBoardList";
import AdminEditUser from "./pages/admin/AdminEditUser";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMemberList from "./pages/admin/AdminMemberList";
import AdminScBoardList from "./pages/admin/AdminScBoardList";
import CheckPwd from "./pages/editInfo/CheckPwd";
import EditInfo from "./pages/editInfo/EditInfo";
import FindInfo from "./pages/findInfo/FindInfo";
import Login from "./pages/login/Login";
import MyCalendar from "./pages/myPage/MyCalendar";
import MyComment from "./pages/myPage/MyComment";
import MyLike from "./pages/myPage/MyLike";
import MySocial from "./pages/myPage/MySocial";
import MyStudy from "./pages/myPage/MyStudy";
import CalendarAdd from "./pages/myPage/CalendarAdd";
import CalendarDetail from "./pages/myPage/CalendarDetail";
import Nav from "../src/containers/common/Nav";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SocialDetail from "./pages/social/SocialDetail";
import SocialList from "./pages/social/SocialList";
import SocialUpdate from "./pages/social/SocialUpdate";
import SocialWrite from "./pages/social/SocialWrite";
import StudyDetail from "./pages/study/StudyDetail2";
import StudyList from "./pages/study/StudyList2";
import StudyUpdate from "./pages/study/StudyUpdate";
import StudyWrite from "./pages/study/StudyWrite";
import Home from "./pages/chat/Home";
import { useContext } from "react";
import { AuthContext } from "./pages/context/AuthContext";

// import Admin from "./pages/admin/Admin";
function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />;
    }

    return children
  };

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminScBoardList" element={<AdminScBoardList />} />
        <Route path="/AdminBoardList" element={<AdminBoardList />} />
        <Route path="/AdminMemberList" element={<AdminMemberList />} />
        <Route exact path="/AdminMember/:userId" element={<AdminEditUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/find" element={<FindInfo />} />
        <Route path="/user/edit" element={<EditInfo />} />
        <Route path="/user/check" element={<CheckPwd />} />
        <Route path="/studies" element={<StudyList />} />
        <Route path="/study/write" element={<StudyWrite />} />
        <Route exact path="/study/:studyId" element={<StudyDetail />} />
        <Route exact path="/study/:studyId/update" element={<StudyUpdate />} />
        <Route path="/social" element={<SocialList />} />
        <Route exact path="/social/:socialId" element={<SocialDetail />} />
        <Route
          exact
          path="/social/:socialId/update"
          element={<SocialUpdate />}
        />
        <Route path="/social/write" element={<SocialWrite />} />
        <Route path="/myPage/myCalendar/:userId" element={<MyCalendar />} />
        <Route path="/myPage/myStudy/:userId" element={<MyStudy />} />
        <Route path="/myPage/mySocial/:userId" element={<MySocial />} />
        <Route path="/myPage/myComment/:userId" element={<MyComment />} />
        <Route path="/myPage/MyLike/:userId" element={<MyLike />} />
        <Route path="/myPage/myCalendar/add" element={<CalendarAdd />} />
        {/* <Route path="/myPage/myCalendar/:calendarId" element={<CalendarDetail />} /> */}
        <Route path="/myPage/myCalendar/detailTest" element={<CalendarDetail />} />
        <Route
          index
          path="/chat"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
