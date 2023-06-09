import { Button } from "@mui/material";

const DeliverusStyleButton = (props) => {
  const content = props.content;
  return (
    <Button
      sx={{
        width: "100%",
        backgroundColor: "#f5f3f3",
        border: 1,
        mt: 3,
        mb: 2,
        // borderColor: "rgba(0,0,0,0.4)",
      }}
    >
      {content}
    </Button>
  );
};

export default DeliverusStyleButton;
