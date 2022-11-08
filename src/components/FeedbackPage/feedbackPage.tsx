import {
  Button,
  Checkbox,
  Stack,
  useInitialisedDeskproAppClient,
  H1,
  TextArea,
  useDeskproAppClient,
  proxyFetch,
  useDeskproAppTheme,
} from "@deskpro/app-sdk";
import parse from "html-react-parser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/userContext";
import { IFeedbackStatus, ITab } from "../../types/feedback";

interface Values {
  [key: string]: string;
}

interface Props {
  data: ITab | null;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FeedbackPage = ({ setFinished, data }: Props) => {
  const [checked, setChecked] = useState(false);

  const { theme } = useDeskproAppTheme();

  const deskproUser = useUser();

  const { client } = useDeskproAppClient();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // this is valid
  document.querySelector("body").style.backgroundColor = "white";

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<Values>();

  const navigate = useNavigate();

  useInitialisedDeskproAppClient((client) => {
    client.setWidth(640);
  });
  <body></body>;
  if (!data || !client) return <Stack></Stack>;

  const questions = Object.keys(data)
    .filter((key) => key.includes("question"))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // this is valid
    .map((key) => data[key]);

  const submit = async (values: Values) => {
    if (!client || !deskproUser) return;

    let text = Object.keys(values).reduce((acc, curr, i) => {
      return (
        acc + `${i + 1} ${questions[i]}\n\n${values[curr]}\n\n\n----------\n\n`
      );
    }, "");

    text += `Publish: ${checked ? "Yes" : "No"}\nName: ${
      deskproUser.name
    }\nEmail: ${deskproUser.primaryEmail}`;

    const pFetch = await proxyFetch(client);

    const response = await pFetch(
      "https://feedback-app-proxy.deskpro.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer __api_key__",
        },
        body: JSON.stringify({
          topicId: data?.guid?.split("/")?.slice(-1)[0],
          body: text,
        }),
      }
    );

    if (!response.ok) {
      setError("checkbox", {
        type: "required",
        message: "Error submitting feedback, please try again",
      });
      return;
    }

    const finishedFeedback = (await client.getUserState("feedbackinfo"))?.[0]
      ?.data as string;

    const parsedFeedback = JSON.parse(
      finishedFeedback || "[]"
    ) as IFeedbackStatus[];

    parsedFeedback.push({
      guid: data?.guid?.split("/")?.slice(-1)[0],
      status: "done",
    });

    await client.setUserState("feedbackinfo", JSON.stringify(parsedFeedback));

    setFinished(true);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack vertical style={{ width: "100%" }} gap={12}>
        <Stack vertical>{data && parse(data.description)}</Stack>
        <Stack vertical gap={12}>
          {questions.map((question, i) => {
            return (
              <Stack justify="start" vertical style={{ width: "100%" }} key={i}>
                <h1 style={{ fontSize: "14px" }}>{`${i + 1}. ${question}`}</h1>
                <TextArea
                  placeholder="Enter text"
                  error={Boolean(errors[`question_${i}`])}
                  style={{
                    height: "64px",
                    backgroundColor: "white",
                    border: `1px solid ${theme.colors.grey20}`,
                    overflow: "hidden",
                  }}
                  {...register(`question_${i}`, {
                    required: i !== questions.length - 1,
                  })}
                />
              </Stack>
            );
          })}
        </Stack>
        <Stack align={"center"} justify="start">
          <Checkbox
            label="Publish my feedback on the community forum"
            checked={checked}
            onChange={() => setChecked(!checked)}
            id="option4"
            size={14}
          />
        </Stack>
        <Stack justify="space-between" style={{ width: "100%" }}>
          <Stack vertical gap={5}>
            {errors.checkbox && (
              <H1 style={{ color: "red" }}>{errors.checkbox.message}</H1>
            )}
            <Button text="Submit Feedback" type="submit"></Button>
          </Stack>
          <Button
            style={errors.checkbox && { marginTop: "17px" }}
            text="Cancel"
            intent="secondary"
            onClick={() => {
              navigate("/");
            }}
          ></Button>
        </Stack>
      </Stack>
    </form>
  );
};
