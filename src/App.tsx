import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useStore } from "./stores/helpers/useStore";


function App() {
  const { dataStore: { blogStore } } = useStore();
  useEffect(() => {
    blogStore.getPosts();
  }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
