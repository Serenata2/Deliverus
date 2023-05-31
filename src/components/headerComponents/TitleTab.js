import { Link } from "react-router-dom";

const TitleTab = () => {
  return (
    <Link
      to="/"
      style={{
        textDecoration: "none",
        background:
          "linear-gradient(90deg, rgba(255,7,0,1) 0%, rgba(222,148,36,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Deliverus
    </Link>
  );
};

export default TitleTab;
