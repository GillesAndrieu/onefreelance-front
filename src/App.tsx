import './global.css';
// Auth
import {AuthProvider} from "./hooks";
import {Routes} from "./routes";
// Theme
import {ThemeProvider} from "./theme/theme-provider";

function App() {

    return (
        <ThemeProvider>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App;