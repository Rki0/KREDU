import React, { useState, useEffect } from "react";
import File from "./File";

interface FileUploadProps {
  id: string;
  onInput: (id: string, value: any, isValid: boolean) => void;
}

function FileUpload(props: FileUploadProps) {
  const [file, setFile] = useState<any>([]);
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

  return (
    <div>
      <div className="py-2 border-b-2 border-[#ffcdd2]">
        <div className="mb-2">
          <span className="mr-2">첨부 파일 :</span>

          <label
            className="mr-2 rounded-lg p-1 border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            htmlFor={props.id}
          >
            + 파일 추가하기
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
          file.map((item: any, index: number) => (
            <File
              item={item}
              index={index}
              onDelete={onDelete}
              key={item.name}
            />
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
