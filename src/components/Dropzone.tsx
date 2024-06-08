import { rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function DropZone(props: Partial<DropzoneProps> & { setImg: React.Dispatch<React.SetStateAction<File | null>> }) {
  const imgUploadHandler = (files: File[]) => {
    props.setImg(files[0]);
  };

  return (
    <Dropzone
      onDrop={(files) => imgUploadHandler(files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
      styles={{
        root: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #ccc",
          borderRadius: "5px",
          padding: "1rem",
        },
      }}
    >
      <div style={{ pointerEvents: "none" }} className=" flex items-stretch w-full h-full">
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: "red" }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={52} stroke={1.5} />
        </Dropzone.Idle>

        <div className="font-quicksand text-center ml-4">
          <h1>Drag images here or click to select files</h1>
          <p className="opacity-50 ">
            Recommendation: Use high-quality JPG, JPEG or PNG less than 3MB
          </p>
        </div>
      </div>
    </Dropzone>
  );
}
