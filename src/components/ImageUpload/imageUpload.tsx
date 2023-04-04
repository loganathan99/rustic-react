import React, { ChangeEventHandler, FunctionComponent, useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
// import { uploadFile } from "../../services/api.service";
import { Button } from "../Button/Button";

interface IFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  url: string;
}

interface IImageUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string[];
  hint?: string;
  onAdd?: (value: IFileProps | null) => void;
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onloadend = () => {
      resolve(fr.result as string);
    };
    fr.readAsDataURL(file);
  });
}

export const ImageUpload: FunctionComponent<IImageUploadProps> = (props) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [controls, setControls] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [hint, setHint] = useState<string>("");

  const getPhoto: ChangeEventHandler<HTMLInputElement> = async function (e) {
    e.preventDefault();

    let reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      const result = await readAsDataURL(file);
      setImage(file);
      setImageUrl(result);
      setShowUpload(true);
    }
  };

  async function startUpload() {
    if (image) {
      setShowUpload(false);
      //   const res = await uploadFile(image);
      setError([]);
      setHint("Uploaded Successfully");
      //   if (props.onAdd) {
      //     props.onAdd(res.data);
      //   }
    } else {
      setShowUpload(true);
      setError(["Please select an image"]);
    }
  }

  return (
    <>
      <div className="w-full flex-1">
        {props.label && (
          <label
            htmlFor={props.id}
            className="block text-xs font-bold leading-5 text-gray-800"
          >
            {props.label}
            {props.required && <b className="text-red-500">*</b>}
          </label>
        )}
        {!image && (
          <label className="my-1 flex flex-col items-center p-4 rounded-md shadow-sm tracking-wide border border-gray-300 cursor-pointer text-gray-500 hover:text-purple-500">
            <FiUpload className="text-lg" />
            <span className="mt-2 text-sm leading-normal">Select a file</span>
            <input
              type="file"
              className="hidden"
              onChange={getPhoto}
              accept="image/*"
            />
          </label>
        )}
        {imageUrl && image && (
          <div className="relative">
            <img
              onMouseEnter={() => setControls(true)}
              className="w-32 h-32 my-1 object-cover rounded-md shadow-sm border border-gray-300"
              src={imageUrl}
            />
            {controls && (
              <div
                className="cursor-pointer absolute top-0 left-0 w-32 h-32 flex items-center justify-center z-10 rounded-md bg-white shadow-sm border border-gray-300"
                onMouseLeave={() => setControls(false)}
                onClick={() => {
                  setImage(null);
                  setImageUrl(null);
                  setControls(false);
                  if (props.onAdd) {
                    props.onAdd(null);
                  }
                }}
              >
                <FiTrash className="text-red-500" />
              </div>
            )}
            {showUpload && (
              <Button onClick={() => startUpload()}>Upload</Button>
            )}
          </div>
        )}
        {props.hint && (
          <div className="text-xs text-gray-500">{props.hint}</div>
        )}
        {hint && <div className="text-xs text-gray-500">{hint}</div>}
        {props.error?.map((err, i) => (
          <div key={i} className="text-xs text-red-500">
            {err}
          </div>
        ))}
        {error?.map((err, i) => (
          <div key={i} className="text-xs text-red-500">
            {err}
          </div>
        ))}
      </div>
    </>
  );
};
