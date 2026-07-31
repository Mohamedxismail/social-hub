import {
  FaHeart,
  FaComment,
  FaShare,
  FaUserPlus,
} from "react-icons/fa";

export function getNotificationText(type: string) {
  switch (type) {
    case "follow_user":
      return "started following you";

    case "like_post":
      return "liked your post";

    case "like_comment":
      return "liked your comment";

    case "comment_post":
      return "commented on your post";

    case "reply":
      return "replied to a comment";

    case "share_post":
      return "shared a post";

    default:
      return "sent you a notification";
  }
}

export function NotificationIcon(type: string) {
  switch (type) {
    case "like_post":
    case "like_comment":
      return <FaHeart className="text-red-500 text-xs" />;

    case "comment_post":
    case "comment_post":
      return <FaComment className=" text-xs" />;

    case "share_post":
      return <FaShare className="text-green-400 text-xs" />;

    case "follow_user":
      return <FaUserPlus className=" text-xs" />;

    default:
      return null;
  }
}