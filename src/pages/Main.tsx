import {
  useDeskproAppClient,
  useDeskproAppTheme,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useState } from "react";
import { FeedbackPosts } from "../components/FeedbackPosts/feedbackPosts";

import { IFeedbackStatus, ITab } from "../types/feedback";
import { fetchFeedbackFeed } from "../utils";

export const Main = () => {
  const { client } = useDeskproAppClient();

  const [tabs, setTabs] = useState<ITab[]>([]);

  const { theme } = useDeskproAppTheme();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // this is valid
  document.querySelector("body").style.backgroundColor = theme.colors.grey10;

  useInitialisedDeskproAppClient((client) => {
    (async () => {
      const finishedFeedback = (await client.getUserState("feedbackinfo"))?.[0]
        ?.data as string;

      const feedbackTabs: ITab[] = await fetchFeedbackFeed();

      const mappedFeedback = feedbackTabs.map((tab) => ({
        ...tab,
        status:
          (JSON.parse(finishedFeedback || "[]") as IFeedbackStatus[]).find(
            (status) => status.guid === tab.guid.split("/")?.slice(-1)[0]
          )?.status || "new",
        expiry_date:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // this is valid
          tab[Object.keys(tab).find((e) => e.includes("expiry_date"))],
      }));

      client.setBadgeCount(
        mappedFeedback.filter(
          (e) =>
            e.status === "new" &&
            new Date(e.expiry_date).getTime() - new Date().getTime() > 0
        ).length
      );

      sessionStorage.setItem("feedback", JSON.stringify(mappedFeedback));

      setTabs(mappedFeedback);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDismiss = async (guid: string) => {
    if (!client) return;

    const finishedFeedback = (await client.getUserState("feedbackinfo"))?.[0]
      ?.data as string;

    const parsedFeedback = JSON.parse(
      finishedFeedback || "[]"
    ) as IFeedbackStatus[];

    parsedFeedback.push({
      guid,
      status: "dismissed",
    });

    await client.setUserState("feedbackinfo", JSON.stringify(parsedFeedback));

    setTabs([...tabs]);
  };

  return (
    <div>
      <FeedbackPosts data={tabs} onDismiss={onDismiss}></FeedbackPosts>
    </div>
  );
};
