import {Route, Routes} from 'react-router-dom';
import {NotFound} from "./pages/auth";
import {ProtectedRoute} from "./routes";
import {AuthProvider} from "./hooks";

import Home from './pages/home/home';
import Login from './pages/auth/login';

function App() {


    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>
    )
}

export default App;
