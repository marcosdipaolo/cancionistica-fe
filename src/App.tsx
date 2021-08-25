import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useStore } from "./stores/helpers/useStore";


function App() {
  const { dataStore: { blogStore, courseStore } } = useStore();
  useEffect(() => {
    blogStore.getPosts();
    courseStore.getCourses();
  }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
