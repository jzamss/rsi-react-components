import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Error from "./Error";
import axios from "axios";
import styles from "./UploadButton.css";
import Loading from "./Loading";

const UploadButton = ({
  onUpload,
  fileId,
  caption = "Upload",
  color = "secondary",
  visibleWhen = true,
  multiple = false,
  url = "/filipizen/attachment/upload",
}) => {
  const [error, setError] = useState();
  const [file, setFile] = useState("");
  const [progress, setProgess] = useState(0);
  const [uploading, setUploading] = useState(false);

  if (!visibleWhen) return null;

  const handleFileChange = (e) => {
    setProgess(0);
    const file = e.target.files[0];
    setFile(file);
    if (file) uploadFile(file);
  };

  const uploadFile = (file) => {
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", fileId);
    axios
      .post(url, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          );
          setProgess(progress);
        },
      })
      .then((res) => {
        const attachment = {
          name: res.data.name,
          key: res.data.key,
          location: res.data.location,
        };
        onUpload(attachment);
        setUploading(false);
      })
      .catch((err) => {
        setError(err);
        setUploading(false);
      });
  };

  return (
    <div className={styles.UploadButton}>
      <div className={styles.UploadButton__menu}>
        {uploading ? (
          <Loading msg="Uploading file..." />
        ) : (
          <React.Fragment>
            <input
              className={styles.UploadButton__input}
              id={fileId}
              type="file"
              onChange={handleFileChange}
              multiple={multiple}
            />
            <label htmlFor={fileId}>
              <Button variant="outlined" component="span" color={color}>
                {caption || "Upload"}
              </Button>
            </label>
          </React.Fragment>
        )}
        {progress != 0 && progress != 100 && (
          <div
            className={styles.UploadButton__progress}
            style={{ width: progress }}
          >
            {progress}%
          </div>
        )}
        <Error msg={error} />
      </div>
    </div>
  );
};

export default UploadButton;
