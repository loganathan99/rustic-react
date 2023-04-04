import React, {
  ChangeEvent,
  DragEvent as ReactDragEvent,
  DragEventHandler as ReactDragEventHandler,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiFile, FiTrash2 } from "react-icons/fi";

//   import { uploadFiles } from "../../services/api.service";

export type DropEffects = "copy" | "move" | "link" | "none";

interface IFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  url: string;
}

export interface FileDropProps {
  className?: string;
  targetClassName?: string;
  draggingOverFrameClassName?: string;
  draggingOverTargetClassName?: string;
  frame?:
    | Exclude<HTMLElementTagNameMap[keyof HTMLElementTagNameMap], HTMLElement>
    | HTMLDocument;
  onFrameDragEnter?: (event: DragEvent) => void;
  onFrameDragLeave?: (event: DragEvent) => void;
  onFrameDrop?: (event: DragEvent) => void;
  onDragOver?: ReactDragEventHandler<HTMLDivElement>;
  onDragLeave?: ReactDragEventHandler<HTMLDivElement>;
  onChange?: (files: IFileProps[]) => any;
  onTargetClick?: ReactEventHandler<HTMLDivElement>;
  dropEffect?: DropEffects;
  label?: string;
  error?: string | string[] | undefined;
  hint?: string;
  required?: boolean;
}

export interface FileDropState {
  draggingOverFrame: boolean;
  draggingOverTarget: boolean;
}

export const FileDrop: React.FC<FileDropProps> = (props) => {
  const fileInputRef = useRef<any>(null);
  const [files, setFiles] = useState<IFileProps[]>([]);
  const [draggingOverFrame, setDraggingOverFrame] = useState(false);
  const [draggingOverTarget, setDraggingOverTarget] = useState(false);
  const [frameDragCounter, setFrameDragCounter] = useState(0);

  const {
    dropEffect = "copy",
    frame = typeof window !== "undefined" ? window.document : undefined,
    onFrameDragLeave,
    onFrameDragEnter,
    onFrameDrop,
    onDragOver,
    onDragLeave,
    onTargetClick,
    onChange,
  } = props;

  useEffect(() => {
    if (frame) {
      resetDragging();
      startFrameListeners(frame);
      return () => {
        stopFrameListeners(frame);
      };
    }
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      onChange && onChange(files);
    } else {
      onChange && onChange([]);
    }
  }, [files]);

  const eventHasFiles = (event: DragEvent | ReactDragEvent<HTMLElement>) => {
    // In most browsers this is an array, but in IE11 it's an Object :(
    let hasFiles = false;
    if (event.dataTransfer) {
      const types = event.dataTransfer.types;
      for (const keyOrIndex in types) {
        if (types[keyOrIndex] === "Files") {
          hasFiles = true;
          break;
        }
      }
    }
    return hasFiles;
  };

  const deleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const resetDragging = () => {
    setFrameDragCounter(0);
    setDraggingOverFrame(false);
    setDraggingOverTarget(false);
  };

  const handleWindowDragOverOrDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleFrameDrag = (event: DragEvent) => {
    event.preventDefault();
    if (!eventHasFiles(event)) return;
    setFrameDragCounter(
      frameDragCounter + (event.type === "dragenter" ? 1 : -1)
    );

    if (frameDragCounter === 1) {
      setDraggingOverFrame(true);
      if (onFrameDragEnter) onFrameDragEnter(event);
      return;
    }

    if (frameDragCounter === 0) {
      setDraggingOverFrame(false);
      if (onFrameDragLeave) {
        onFrameDragLeave(event);
      }
      return;
    }
  };

  const handleFrameDrop = (event: DragEvent) => {
    event.preventDefault();
    if (!draggingOverTarget) {
      resetDragging();
      if (onFrameDrop) onFrameDrop(event);
    }
  };

  const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (eventHasFiles(event)) {
      setDraggingOverTarget(true);
      if (dropEffect) event.dataTransfer.dropEffect = dropEffect;
      if (onDragOver) onDragOver(event);
    }
  };

  const handleDragLeave = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOverTarget(false);
    if (onDragLeave) onDragLeave(event);
  };

  const handleDrop = async (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (onChange && eventHasFiles(event)) {
      const fi = event.dataTransfer ? event.dataTransfer.files : null;
      let f: File[] = [];
      if (fi) {
        for (let i = 0; i < fi.length; i++) {
          const element = fi[i];
          f.push(element);
        }
        //   const { data } = await uploadFiles(f);
        //   setFiles([...files, ...data]);
      }
    }
    resetDragging();
  };

  const handleTargetClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onTargetClick) onTargetClick(event);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    resetDragging();
  };

  const stopFrameListeners = (frame: FileDropProps["frame"]) => {
    if (!frame) return;
    frame.removeEventListener("dragenter", handleFrameDrag);
    frame.removeEventListener("dragleave", handleFrameDrag);
    frame.removeEventListener("dragover", handleWindowDragOverOrDrop);
    frame.removeEventListener("drop", handleFrameDrop);
  };

  const startFrameListeners = (frame: FileDropProps["frame"]) => {
    if (!frame) return;
    frame.addEventListener("dragenter", handleFrameDrag);
    frame.addEventListener("dragleave", handleFrameDrag);
    frame.addEventListener("dragover", handleWindowDragOverOrDrop);
    frame.addEventListener("drop", handleFrameDrop);
  };

  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fi = event.target.files;
    let f: File[] = [];

    if (fi && onChange) {
      for (let i = 0; i < fi.length; i++) {
        const element = fi[i];
        f.push(element);
      }
      // const { data } = await uploadFiles(f);
      // setFiles([...files, ...data]);
    }
  };

  return (
    <div className="flex-1 w-full">
      {props.label && (
        <label className="block text-xs font-bold leading-5 text-gray-800">
          {props.label}
          {props.required && <b className="text-red-500">*</b>}
        </label>
      )}
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        className="hidden"
      />

      <div
        className={`appearance-none flex w-full items-center justify-center px-3 py-2 my-1 border border-gray-300 rounded-md placeholder-gray-500 hover:shadow-outline-purple hover:border-purple-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5 cursor-pointer ${
          draggingOverTarget || draggingOverFrame ? "bg-file-drop" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleTargetClick}
        onDrop={handleDrop}
      >
        {files.length == 0 && (
          <div className="m-5 my-10 bg-white rounded p-3 text-gray-500">
            Drag and drop your files here or click to upload
          </div>
        )}
        {files.length > 0 && (
          <div className="flex flex-wrap justify-start gap-3 w-full">
            {files.map((file, index) =>
              ["jpg", "png", "jpeg"].includes(
                file.name.split(".").at(-1) as string
              ) ? (
                <div
                  key={index}
                  className="bg-white rounded p-1 border border-gray-400 relative"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteFile(index);
                  }}
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2">
                    <FiTrash2 />
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="bg-gray-100 rounded p-1 border border-gray-400 relative"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteFile(index);
                  }}
                >
                  <div className="w-24 h-24 flex flex-col items-center justify-center">
                    <FiFile className="text-purple-500 w-6 h-6 mb-2" />
                    <div className="text-gray-500 text-xs break-all">
                      {file.name}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2">
                    <FiTrash2 />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
      {props.hint && <div className="text-xs text-gray-500">{props.hint}</div>}
      {props.error && typeof props.error === "object" ? (
        props.error.map((err, i) => (
          <div key={i} className="text-xs text-red-500">
            {err}
          </div>
        ))
      ) : (
        <div className="text-xs text-red-500">{props.error}</div>
      )}
    </div>
  );
};
