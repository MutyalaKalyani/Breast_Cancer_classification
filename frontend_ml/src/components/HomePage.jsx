import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./homepage.css";
import Result from "./Result";
const HomePage = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const File = useRef(null);
  useEffect(() => {
    const func = () => {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    };
    func();
  }, [file]);
  const upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    /*setTimeout(() => {
      setData("Benigin");
      setLoading(false);
    }, 2000);*/

     const result = await axios.post(
      "http://localhost:8000/predict",
      formData,
    );
    setLoading(false);
    setData(result.data.class);
    File.current.value = null;
  };
  return (
    <>
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 Navbar">Breast <span>Cancer</span></span>
        </div>
      </nav>
      <div class="form-label d-flex justify-content-center align-items-center home_container row">
        <div className="form_container col-8 col-md-6 col-lg-4">
          <form onSubmit={upload}>
            <label for="formFile" class="form-label d-block home_label">
              select file
            </label>
            <small className="file_info">upload only jpg,jpeg or png</small>
            <div class="form_input">
              <input
                class="form-control"
                type="file"
                id="formFile"
                ref={File}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            {loading ? (
              <button type="submit" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit">Upload</button>
            )}
          </form>
        </div>
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="preview" />
        )}
      </div>
      <Result data={data} />
    </>
  );
};

export default HomePage;
