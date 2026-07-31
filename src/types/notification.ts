export type NotificationUsers = {
  _id: string;
  name: string;
  photo: string;
};

export type NotificationTarget = {
  _id: string;
  unavailable?: boolean | undefined;
};

export type NotificationTypes =
  | "follow"
  | "like_post"
  | "like_comment"
  | "comment"
  | "reply"
  | "share_post";

export type Notifications = {
  _id: string;
  actor: NotificationUser;
  recipient: NotificationUser;
  entity: NotificationEntity;
  entityId: string;
  entityType: "post" | "comment" | "reply" | "user";
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
};export type NotificationUser = {
  _id: string;
  name: string;
  photo: string;
};

export type NotificationEntity = {
  _id: string;
  unavailable?: boolean;
};

export type NotificationType =
  | "follow"
  | "like_post"
  | "like_comment"
  | "comment"
  | "reply"
  | "share_post";

export type Notification = {
  _id: string;
  actor: NotificationUser;
  recipient: NotificationUser;
  entity: NotificationEntity;
  entityId: string;
  entityType: "post" | "comment" | "reply" | "user";
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
};