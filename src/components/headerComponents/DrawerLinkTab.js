import { Link } from "react-router-dom";

const DrawerLinkTab = (props) => {
  const to = props.to;
  const text = props.text;

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        background: "black",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </Link>
  );
};

export default DrawerLinkTab;
