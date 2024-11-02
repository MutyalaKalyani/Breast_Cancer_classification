import React, { memo } from "react";
import "./homepage.css";
const Result = ({ data }) => {
  return (
    <div className="d-flex justify-content-center ">
     {data && <div class="toast show">
    <div class="toast-header text-secondary">
      <strong class="me-auto">Image Uploaded</strong>
    </div>
    <div class="toast-body">
      <p className="text-dark">Prediction is {data}</p>
    </div>
  </div>}
</div>

  );
};

export default memo(Result);
