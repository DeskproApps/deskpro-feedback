import { AnyIcon, Button, Stack } from "@deskpro/deskpro-ui";
import {
  HorizontalDivider,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import { BigH1 } from "../components/styles";
import { ITab } from "../types/feedback";
import { FeedbackPage } from "../components/FeedbackPage/feedbackPage";
import { FinalPage } from "../components/FinalPage/finalPage";
import { useNavigate, useParams } from "react-router-dom";

export const Feedback = () => {
  const [finished, setFinished] = useState(false);

  const [data, setData] = useState<ITab | null>(null);

  const { theme } = useDeskproAppTheme();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const dataSessionStorage = sessionStorage.getItem("feedback");

    const data = (JSON.parse(dataSessionStorage || "[]") as ITab[]).find(
      (e) => e?.guid?.split("/")?.slice(-1)[0] === id
    );

    setData(data ?? null);
  }, [id]);

  return (
    <Stack vertical style={{ backgroundColor: "white" }}>
      <Stack
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BigH1>{data?.title}</BigH1>
        <Stack align="center" gap={12}>
          <Stack>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare as unknown as {
                prefix: "fas";
                iconName: "mailchimp";
              } }
              onClick={() => window.open(data?.guid)}
              style={{ cursor: "pointer" }}
            ></FontAwesomeIcon>
          </Stack>
          {!finished && (
            <Button
              icon={faArrowLeft as AnyIcon}
              text="Back"
              intent="secondary"
              onClick={() => navigate("/")}
            />
          )}
        </Stack>
      </Stack>
      <HorizontalDivider
        style={{
          width: "110%",
          color: theme.colors.grey20,
          marginLeft: "-10px",
          marginBottom: "5px",
        }}
      />
      {!finished && data ? (
        <FeedbackPage data={data} setFinished={setFinished} />
      ) : (
        <FinalPage />
      )}
    </Stack>
  );
};
