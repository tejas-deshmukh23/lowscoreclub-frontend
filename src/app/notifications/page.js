// import NotificationButton from '@/components/NotificationButton'
// import NotificationButton from "@/Components/NotificationButton"
// import NotificationButton from "@/Components/NotificationButton"
// import PushNotificationButton from "@/Components/PushNotificationButton"
// import NotificationSender from "@/Components/NotificationSender"

import NotificationsList from "@/Components/LowScoreClubPages/NotificationsList"
import {QuestionsProvider} from "../../context/QuestionContext";

export default function NotificationsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {/* <NotificationButton /> */}
      {/* <PushNotificationButton userId = {"15"}/> */}
      {/* <NotificationSender/> */}
      {/* <QuestionsProvider> */}
      <NotificationsList/>
      {/* </QuestionsProvider> */}
    </div>
  )
}