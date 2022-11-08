import { Button, Stack } from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BigH1 } from "../styles";

export const FinalPage = () => {
  const navigate = useNavigate();

  const StyledH1 = styled.h1`
    font-size: 14px;
    font-weight: 400;
  `;

  return (
    <Stack vertical>
      <BigH1>🙌 Thank you for your feedback!</BigH1>
      <img src="./team.png" alt="Team image" />
      <div style={{ fontSize: "15px" }}>
        <StyledH1>
          Thank you so much for your time and feedback. Your insights will be
          shared with our product team to help us improve upon this feature
          idea.
          <br /> <br />
          Your feedback is always valued at Deskpro. Please reach out to our
          support team if you encounter any problems while using the software,
          or&nbsp;
          <a href="https://support.deskpro.com/community/7/create-topic">
            submit a suggestion
          </a>{" "}
          or{" "}
          <a href="https://support.deskpro.com/community/2/create-topic">
            feature request
          </a>{" "}
          on our community forum.
          <br /> <br />
          View comments by other customers on this feature idea at&nbsp;
          <a href="hthttps://support.deskpro.com/community/7/create-topictps://www.figma.com/exit?url=https%3A%2F%2Fsupport.deskpro.com%2Fen-US%2Fcommunity%2Fview%2Fimproving-view-settings">
            https://support.deskpro.com/en-US/community/view/improving-view-settings.
          </a>
        </StyledH1>
      </div>
      <Button
        text="Next"
        intent="secondary"
        style={{ marginTop: "12px" }}
        onClick={() => {
          sessionStorage.clear();

          navigate("/");
        }}
      ></Button>
    </Stack>
  );
};
