import AppRouter from "./components/AppRouter";
import { NotificationContainer } from "react-notifications";
import { useInjection } from "./container/inversify-hook";
import { IBlogService } from "./services/BlogService";
import { TYPES } from "./container/types";
import { useEffect } from "react";
import { useStore } from "./stores/helpers/useStore";
import { INotificationService, NotificationType } from "./services/NotificationService";


function App() {
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);
  const { dataStore: { blogStore } } = useStore();
  useEffect(() => {
    blogService.getPosts().then((data) => {      
      blogStore.setPosts(data);
    }).catch(err => {
      blogStore.setPosts([]);
      notificationService.createNotification(NotificationType.ERROR, err.message)
    });
  }, []);
  return (
    <div>
      <NotificationContainer />
      <AppRouter />
    </div>
  );
}

export default App;
