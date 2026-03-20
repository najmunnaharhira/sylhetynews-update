import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerAdminPwa } from "./lib/pwa";

createRoot(document.getElementById("root")!).render(<App />);
void registerAdminPwa();
