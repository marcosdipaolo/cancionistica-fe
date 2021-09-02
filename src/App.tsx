import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useStore } from "./stores/helpers/useStore";


function App() {
  const { dataStore: { blogStore, courseStore, userStore } } = useStore();
  useEffect(() => {
    blogStore.getPosts();
    courseStore.getCourses();
    userStore.isUserLoggedIn();
  }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
