"use client";

import { createClient } from "@supabase/supabase-js";
import { SingleDocumentDropZone } from "@/components/document-drop-zone";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { blurImage } from "@/actions/blur";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import { InfoIcon } from "lucide-react";
import { IconSpinner } from "../ui/icons";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const imagesBucket = process.env
  .NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGES_BUCKET as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function FileUploadForm() {
  const [file, setFile] = useState<File | string | undefined>();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const [blurredUrl, setBlurredUrl] = useState<string | null>();
  const [progress, setProgress] = useState(0);
  const [uploadingState, setUploadingState] = useState("default");
  const [convertingState, setConvertingState] = useState("default");

  type ConvertingState =
    | "success"
    | "error"
    | "processing"
    | "waiting"
    | "default";

  type UploadingState =
    | "waiting"
    | "success"
    | "error"
    | "processing"
    | "saving"
    | "uploading"
    | "default";

  const UploadingStateMessages: Record<UploadingState, string> = {
    waiting: "Nice job! Now press upload to upload your image.",
    success: "Your file has been uploaded successfully. You can now blur it.",
    error:
      "There was an error uploading your image. Please try again with a different image.",
    processing: "We are processing your image. Please wait.",
    saving: "We are saving your image. Please wait.",
    uploading: "We are uploading your image. Please wait.",
    default: "Please select a file to upload.",
  };

  const ConvertingStateMessages: Record<ConvertingState, string> = {
    success:
      "Your file has been blurred successfully. See will view and download it below. To blur another image, please click Reset.",
    error:
      "There was an error blurring your image. Please try again with a different image.",
    processing: "We are blurring your image. Please wait.",
    waiting: "Please click Blur to blur your image.",
    default: "Please finish uploading your image first.",
  };

  const uploadFile = async () => {
    if (file && typeof file !== "string" && typeof file !== "undefined") {
      setUploadingState("waiting");
      // console.log("file", file);
      // Create a unique file name for storage purposes
      const fileName = `${Date.now()}-${file.name}`;
      const extension = file.name.split(".").pop();
      const randomUUID = crypto.randomUUID();

      // console.log("filePath", filePath);
      // console.log("fileName", fileName);
      // console.log("extension", extension);
      // console.log("randomUUID", randomUUID);

      try {
        // Use the storage API to upload the file

        setProgress(10);
        setUploadingState("uploading");
        toast.custom(
          <div className="animate-ease-in-out text-md pointer-events-auto m-2 flex max-w-md items-center gap-1 rounded-md border-primary bg-foreground p-2 leading-normal text-background shadow-md shadow-gray-800 duration-500">
            <IconSpinner className=" mr-1 h-6 w-6 animate-spin  rounded-full text-violet-500" />
            <span>We are uploading your image. Please wait.</span>
          </div>
        );

        const { data, error } = await supabase.storage
          .from(imagesBucket)
          .upload(filePath, file);
        // console.log("data", data);

        if (error) {
          console.error("Error uploading file:", error);
          toast.error("Error uploading your image. Please try again.");

          setProgress(0);
          setUploadingState("error");
          return;
        }

        setProgress(40);
        setUploadingState("processing");
        const publicUrl = supabase.storage
          .from(imagesBucket)
          .getPublicUrl(filePath);

        setProgress(60);
        setUploadingState("saving");

        setUrls({
          url: publicUrl.data.publicUrl,
          thumbnailUrl: publicUrl.data.publicUrl, // Add correctly generated thumbnail URL here if needed
        });

        // console.log("publicUrl", publicUrl);
        setProgress(100);
        setUploadingState("success");
        setConvertingState("waiting");
        toast.success("Your image has been uploaded successfully.");
      } catch (error) {
        console.log("error on uploadFile", error);

        setProgress(0);
        setUploadingState("error");
        toast.error("Error uploading your image. Please try again.");

        // Reset file state after successful upload
        setFile(undefined);
      }
    }
  };

  const reset = () => {
    setFile(undefined);

    setProgress(0);
    setUploadingState("default");
    setConvertingState("default");
    setUrls(undefined);
    setBlurredUrl(undefined);
    toast.success(
      "Your image has been reset successfully. You can upload another image now."
    );
  };

  const blurTheImage = async () => {
    setConvertingState("processing");
    toast.custom(
      <div className="animate-ease-in-out text-md pointer-events-auto m-2 flex max-w-md items-center gap-1 rounded-md border-primary bg-foreground p-2 leading-normal text-background shadow-md shadow-gray-800 duration-500">
        <IconSpinner className="mr-1 h-6 w-6 animate-spin rounded-full  text-violet-500" />
        <span>We are blurring your image. Please wait.</span>
      </div>
    );
    try {
      const { message, blurred_image_url, conversionId, success } =
        await blurImage(urls?.url as string);

      // console.log("success", success);
      // console.log("message", message);
      // console.log("blurred_image_url", blurred_image_url);
      // console.log("conversionId", conversionId);

      if (!success) {
        setConvertingState("error");
        toast.error(message);
        return;
      }

      // console.log("message", message);
      // console.log("blurred_image_url", blurred_image_url);
      // console.log("conversionId", conversionId);

      setBlurredUrl(blurred_image_url);

      setConvertingState("success");
      toast.success("Your image has been blurred successfully.");
    } catch (error) {
      console.log("error on blurImage", error);
      setConvertingState("error");
      toast.error("Error blurring your image. Please try again.");
    }
  };

  const saveFile = () => {
    const defaultFileName = "blurred_image.jpg";
    const fileName =
      file && typeof file === "object" && file.name
        ? `${file.name
            .split(".")
            .slice(0, -1)
            .join(".")}-blurred-${Date.now()}.${file.name.split(".").pop()}`
        : defaultFileName;

    saveAs(`${blurredUrl}`, fileName);
    toast.success("Your image has been downloaded successfully.");
  };

  return (
    <div className="m-6 flex flex-col items-center gap-2 ">
      <SingleDocumentDropZone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 5, // 5MB
        }}
        onChange={(file) => {
          setProgress(0);
          setUploadingState("default");
          setConvertingState("default");
          setBlurredUrl(undefined);
          if (typeof file !== "string" && typeof file !== "undefined") {
            setUploadingState("waiting");
          }
          setUrls(undefined);
          setFile(file);
        }}
        // accept images such as jpg jpeg
        fileTypes={{
          "image/*": [".jpg", ".jpeg"],
        }}
        pdfIconAsPreview={false}
      />
      <div className="h-[6px] w-44 overflow-hidden rounded border">
        <div
          className="h-full bg-[#2bb051] transition-all duration-150"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="text-sm text-primary">
        {
          UploadingStateMessages[
            uploadingState as keyof typeof UploadingStateMessages
          ]
        }
      </div>

      <Button
        className="w-full max-w-md"
        onClick={uploadFile}
        disabled={!file || uploadingState === "success" || progress > 0}
      >
        Upload
      </Button>

      <div className="text-sm text-primary">
        {
          ConvertingStateMessages[
            convertingState as keyof typeof ConvertingStateMessages
          ]
        }
      </div>

      <Button
        className="w-full max-w-md"
        onClick={blurTheImage}
        disabled={
          !urls ||
          convertingState === "success" ||
          uploadingState !== "success" ||
          convertingState === "processing"
        }
      >
        Blur
      </Button>

      <div className="mx-auto  grid w-full max-w-2xl gap-4 text-foreground sm:grid-cols-2">
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Original Image
          </h2>
          <Image
            alt="Original Image"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={600}
            src={urls?.url || "/next.svg"}
            width={600}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Blurred Image
          </h2>
          <Image
            alt="Blurred Image"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={600}
            src={blurredUrl || "/next.svg"}
            width={600}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-2">
        <Button
          className="w-full max-w-md"
          variant="outline"
          onClick={saveFile}
          disabled={convertingState !== "success"}
        >
          Download Blurred Image
        </Button>
        <Button
          className="w-full max-w-md"
          variant="destructive"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
