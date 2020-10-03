import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="container" onClick={goBack}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} className="arrow" size="2x" />
    </div>
  );
}

export default BackButton;
