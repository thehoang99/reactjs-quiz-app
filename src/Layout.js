import {
    Routes,
    Route
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense } from 'react';
import App from './App';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/User/ManageUser';
import Login from './components/Auth/Login';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import NotFound from "./components/Error/NotFound";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import ManageQuestion from "./components/Admin/Content/Question/ManageQuestion";
import PrivateRoute from "./routes/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoute from "./routes/ProtectRoute";


const Layout = () => {
    return (
        <Suspense fallback={<div>...is loading</div>}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={
                    <ProtectRoute>
                        <Admin />
                    </ProtectRoute>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-quizzes" element={<ManageQuiz />} />
                    <Route path="manage-questions" element={<ManageQuestion />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </Suspense>
    )
}

export default Layout;