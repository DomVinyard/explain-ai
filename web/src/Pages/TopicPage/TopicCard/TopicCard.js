import React, { useContext, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropType from "prop-types";
import { ageContext } from "../../../components/AudienceContext";
import "../../../Styling/TopicCard/TopicCard.css";
import { sendClickEvent } from "../../../utils/gaEvents";
/* eslint react/forbid-prop-types: 0 */

function TopicCard({ topic }) {
  const { audience } = useContext(ageContext);
  const [descLength, setDescLength] = useState("short");
  const [buttonTxt, setButtonTxt] = useState("Tell me more");
  const description = topic.descriptions?.find?.(({ audience: a }) => audience === a)[descLength];
  const imageHandler = () => {
    const imageError = typeof topic.image !== "string" || topic.image === ""; // this may be changed depending on how the API responds
    return imageError ? "./no-image.jpeg" : topic.image;
  };
  const lengthSetter = () => {
    setDescLength(descLength === "short" ? "long" : "short");
    setButtonTxt(descLength === "short" ? "Tell me less" : "Tell me more");
  };
  return (
    <div className="topic-card-parent">
      <div className="topic-card">
        <div className="topic-card-title">
          <h1>topic.name</h1>
        </div>
        <div className={`topic-card-description ${descLength === "long" ? "expanding" : ""}`}>
          <p data-testid="description-container" className="topic-desc">
            {" "}
            {description}{" "}
          </p>
        </div>
        <div className="topic-card-img-btn">
          <button
            type="button"
            onClick={() => {
              lengthSetter();
              sendClickEvent("button", "Tell me more");
            }}
          >
            {buttonTxt}
          </button>
          <div className="topic-card-img">
            <img src={imageHandler()} alt={`A representation of ${topic.name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

TopicCard.propTypes = {
  topic: PropType.shape({
    name: PropType.string,
    description: PropType.arrayOf(PropType.object),
    parent: PropType.object,
    relationships: PropType.arrayOf(PropType.object),
  }).isRequired,
};
export default TopicCard;
