import { Link } from "react-router-dom";

const LinkTab = (props) => {
  const targetLink = props.to;
  const name = props.name;
  return (
    <Link
      to={targetLink}
      style={{
        textDecoration: "none",
        background: "black",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "22px",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      {name}
    </Link>
  );
};

export default LinkTab;
