
import { notification} from 'antd';
import { FcOk,FcCancel } from "react-icons/fc";

interface NotificationInterface{
  title:string;
  message:string;
  ok:boolean;
  go:()=>void;
}
const openNotification = (props:NotificationInterface) => {
    const args = {
      message: props.title,
      description:props.message,
      duration: 1.5,
      icon: props.ok?<FcOk />:<FcCancel />,
      onClose:props.go
    };
    notification.open(args);
  }

  export default openNotification;