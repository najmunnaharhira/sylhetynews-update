import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
