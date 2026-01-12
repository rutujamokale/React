import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "../styles/global.css";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main style={{ minHeight: "80vh", padding: "1rem" }}>
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
