import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import File from "./File";

interface FileUploadProps {
  id: string;
  onInput: (id: string, value: any, isValid: boolean) => void;
  initialValue?: any;
  purpose: string;
}

function FileUpload(props: FileUploadProps) {
  const [file, setFile] = useState<any>(
    props.initialValue ? props.initialValue : []
  );
  const [isValid, setIsValid] = useState(false);

  const { id, onInput } = props;

  useEffect(() => {
    onInput(id, file, isValid);
  }, [id, file, isValid, onInput]);

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile = [];

    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        pickedFile.push(e.target.files[i]);
      }

      setFile([...file, ...pickedFile]);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const onDelete = (clickedIndex: number) => {
    const deletedFile = file.filter(
      (_: any, index: number) => index !== clickedIndex
    );

    setFile(deletedFile);
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="py-2 border-b-2 border-[#ffcdd2]">
        <div>
          <span className="mr-2">{t("file.file")}</span>

          <label
            className="mr-2 rounded-lg p-1 border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            htmlFor={props.id}
          >
            + {t("file.fileButton")}
          </label>

          <input
            id={props.id}
            className="hidden"
            type="file"
            multiple
            accept=".jpg, .png, .jpeg, .pdf, .word"
            onChange={pickedHandler}
          />
        </div>

        {file &&
          !props.initialValue &&
          file.map((item: any, index: number) => (
            <File
              item={item}
              index={index}
              onDelete={onDelete}
              key={index}
              purpose={props.purpose}
            />
          ))}

        {file &&
          props.initialValue &&
          file.map((item: any, index: number) => (
            <File
              item={item}
              index={index}
              onDelete={onDelete}
              key={index}
              purpose={props.purpose}
            />
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
