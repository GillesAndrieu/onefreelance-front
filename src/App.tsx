import {AuthProvider} from "./hooks";
import {Routes} from "./routes";

function App() {

    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App;
