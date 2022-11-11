export interface ITab {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
  status?: string;
  expiry_date: string;
}

export interface IFeedbackStatus {
  guid: string;
  status: "new" | "dismissed" | "done";
}
