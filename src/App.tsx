import AppRouter from "./components/AppRouter";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <div>
      <NotificationContainer/>
      <AppRouter/>
    </div>
  );
}

export default App;
