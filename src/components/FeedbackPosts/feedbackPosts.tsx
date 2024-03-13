import {
  useDeskproAppTheme,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { AnyIcon, Tag, Button, P1, Stack } from "@deskpro/deskpro-ui";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { ITab } from "../../types/feedback";
import { BigH1 } from "../styles";
import "./image.css";

interface Props {
  data: ITab[];

  onDismiss: (i: string) => void;
}

export const FeedbackPosts = ({ data, onDismiss }: Props) => {
  const navigate = useNavigate();

  const { theme } = useDeskproAppTheme();

  useInitialisedDeskproAppClient((client) => {
    client.setWidth(475);
  });

  return (
    <Stack vertical gap={12}>
      {[
        ...data.filter((e) => e.status === "new"),
        ...data.filter((e) => e.status === "dismissed"),
        ...data.filter((e) => e.status === "done"),
      ].map((feedback, i) => {
        const designCover =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // this is valid
          feedback[
            Object.keys(feedback)
              .find((key) => key.includes("design_cover"))
              ?.toString() ?? ""
          ];

        const timeDifference =
          new Date(feedback.expiry_date).getTime() - new Date().getTime();

        return (
          <Stack
            vertical
            key={i}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: `1px solid ${theme.colors.grey20}`,
              width: "100%",
              opacity:
                feedback.status === "done" || timeDifference < 0
                  ? "0.7"
                  : "1.0",
            }}
          >
            <Stack style={{ padding: "10px" }} vertical>
              <Stack>
                <BigH1 style={{ marginBottom: "10px" }}>{feedback.title}</BigH1>
              </Stack>
              <Stack gap={5}>
                <P1>
                  {new Date(feedback.pubDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) + " ·"}
                </P1>
                <Stack style={{ marginTop: "1px" }}>
                  <Tag
                    icon={faClockFour as AnyIcon}
                    label={
                      timeDifference > 0
                        ? `${Math.ceil(
                            timeDifference / 1000 / 60 / 60 / 24
                          )} days left`
                        : "Expired Session"
                    }
                    color={
                      timeDifference > 0
                        ? {
                            textColor: theme.colors.sky_blue100,
                            backgroundColor: theme.colors.sky_blue10,
                            borderColor: theme.colors.sky_blue100,
                          }
                        : {
                            textColor: theme.colors.grey80,
                            backgroundColor: theme.colors.grey10,
                            borderColor: theme.colors.grey80,
                          }
                    }
                    closeIcon={faClockFour as AnyIcon}
                  />
                </Stack>
              </Stack>
            </Stack>
            {designCover && <img src={designCover} alt="Feedback image" />}
            {feedback.status !== "done" && timeDifference > 0 && (
              <Stack style={{ margin: "12px" }}>
                <Button
                  text="Provide Feedback"
                  style={{ padding: "12px" }}
                  onClick={() =>
                    navigate(
                      `/feedback/${feedback?.guid?.split("/")?.slice(-1)[0]}`
                    )
                  }
                ></Button>
                {feedback.status !== "dismissed" && (
                  <Button
                    text="Dismiss"
                    intent="secondary"
                    style={{ marginLeft: "12px", padding: "12px" }}
                    onClick={() => onDismiss(feedback.guid)}
                  ></Button>
                )}
              </Stack>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
