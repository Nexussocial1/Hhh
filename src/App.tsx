import {useAuthState} from "react-firebase-hooks/auth";import {auth} from "./firebase";
import AuthPage from "./pages/AuthPage";import HomePage from "./pages/HomePage";
export default function App(){const [user]=useAuthState(auth);return user?<HomePage/>:<AuthPage/>;}