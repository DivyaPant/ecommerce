import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/mui-theme";
import AuthProvider from './components/Auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
    </ThemeProvider>
  </AuthProvider>
  )
}

export default App;


