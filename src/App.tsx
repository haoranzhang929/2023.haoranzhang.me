import Header from "./components/Header";
import { ModeProvider } from "./context";
import Router from "./router";

const App = () => {
  return (
    <ModeProvider>
      <div className="h-screen w-screen bg-neutral-200 text-zinc-800 dark:bg-neutral-900 dark:text-white">
        <Header />
        <Router />
      </div>
    </ModeProvider>
  );
};

export default App;
