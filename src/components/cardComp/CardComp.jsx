import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useNavigate } from "react-router-dom";
import Button from "../common/button/Button";
import { handleShare } from "../../helpers/share";
import { useTheme } from "../../context/ThemeContext";

const CardComp = ({ data,collection }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const htmlContent =
    data?.desc?.length > 100 ? data?.desc.slice(0, 100) + "..." : data?.desc;

  const handleReadMore = (data) => {
    navigate(`/singleblog?id=${data.id}&collection=${collection}`);
  };
  const lightTheme = theme.lightBackground === "rgba(254,254,254,0.2)"
  

  return (
    <div style={{ display: "flex", gap: "10px", padding: "40px 0" }}>
      <Card
        className="max-w-sm shadow-lg rounded-xl overflow-hidden flex flex-col min-h-[450px]"
        style={{ background: theme.lightBackground }}
      >
        <CardHeader className="p-0">
          <img
            src={data?.img}
            alt={data?.title}
            className="w-full h-40 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle
            className="text-lg font-semibold"
            style={{ color: theme.heading }}
          >
            {data?.title?.length > 100
              ? data?.title.slice(0, 100) + "..."
              : data?.title}
          </CardTitle>
          <p
            className="text-sm text-gray-500"
            style={{ color: theme.text, padding: "10px 0" }}
          >
            {data?.subTitle?.length > 80
              ? data?.subTitle.slice(0, 80) + "..."
              : data?.subTitle}
          </p>

          <CardDescription
            className={`mt-2 text-gray-700 ${lightTheme ? "truncatetext" : ""} `}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ color: theme.text }}
          />
        </CardContent>
        <CardFooter className="flex justify-center mt-auto pb-4">
          <div>
            <Button
              title="Share"
              btnStyles={{
                backgroundColor: "transparent",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                padding: "10px 25px",
                borderRadius: "25px",
                margin: "0 10px",
              }}
              handleClick={() => handleShare(data)}
            />
            <Button
              title="Read More"
              btnStyles={{
                backgroundColor: "transparent",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                padding: "10px 25px",
                borderRadius: "25px",
              }}
              handleClick={() => handleReadMore(data)}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardComp;
