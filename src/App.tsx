import React from 'react';
import Auth from "./pages/Auth/Auth";
import {useAppSelector} from "./redux/hooks";
import {Route, Routes, useNavigate} from "react-router-dom";
import UserList from "./pages/UserList/UserList";

function App() {
  return (
    <Routes>
        <Route path={'/'} element={<Auth />} />
        <Route path={'/userlist'} element={<UserList />} />
    </Routes>
  );
}

export default App;
