import AppRouter from "./components/AppRouter";
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
      blogStore.postList = data;
      console.log(blogStore.postList);
    }).catch(err => {
      blogStore.setPosts([]);
      notificationService.createNotification(NotificationType.ERROR, err.message)
    });
  }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
