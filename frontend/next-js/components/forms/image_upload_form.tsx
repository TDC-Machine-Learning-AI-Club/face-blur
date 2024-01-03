"use client";

import { createClient } from "@supabase/supabase-js";
import { SingleDocumentDropZone } from "@/components/document-drop-zone";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createDocument } from "@/actions/document";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const documentBucket = process.env
  .NEXT_PUBLIC_SUPABASE_PUBLIC_IMAGES_BUCKET as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function FileUploadForm() {
  const [file, setFile] = useState<File | string | undefined>();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  // we have stages uploading processing saving , sucess, error and waiting default
  const [stage, setStage] = useState("default");

  type Stage =
    | "waiting"
    | "success"
    | "error"
    | "processing"
    | "saving"
    | "uploading"
    | "default";

  const stageMessages: Record<Stage, string> = {
    waiting: "Nice job! Now press upload to upload your image.",
    success: "Your file has been uploaded successfully.",
    error:
      "There was an error uploading your image. Please try again with a different image.",
    processing: "We are processing your image. Please wait.",
    saving: "We are saving your image. Please wait.",
    uploading: "We are uploading your image. Please wait.",
    default: "Please select a file to upload.",
  };

  const uploadFile = async () => {
    if (
      file &&
      typeof file !== "string" &&
      typeof file !== "undefined" &&
      !uploading
    ) {
      setStage("waiting");
      console.log("file", file);
      // Create a unique file name for storage purposes
      const fileName = `${Date.now()}-${file.name}`;
      const extension = file.name.split(".").pop();
      const randomUUID = crypto.randomUUID();
      const filePath = `${randomUUID}.${extension}`;

      console.log("filePath", filePath);
      console.log("fileName", fileName);
      console.log("extension", extension);
      console.log("randomUUID", randomUUID);

      try {
        // Use the storage API to upload the file
        setUploading(true);
        setProgress(10);
        setStage("uploading");
        const { data, error } = await supabase.storage
          .from(documentBucket)
          .upload(filePath, file);
        console.log("data", data);

        if (error) {
          console.error("Error uploading file:", error);
          alert("Error uploading file");
          setUploading(false);
          setProgress(0);
          setStage("error");
          return;
        }

        setProgress(40);
        setStage("processing");
        const publicUrl = supabase.storage
          .from(documentBucket)
          .getPublicUrl(filePath);

        setProgress(60);
        setStage("saving");

        setUrls({
          url: publicUrl.data.publicUrl,
          thumbnailUrl: publicUrl.data.publicUrl, // Add correctly generated thumbnail URL here if needed
        });

        const { documentId, success, message } = await createDocument(
          publicUrl?.data?.publicUrl,
          randomUUID,
          "application_document"
        );
        setProgress(100);
        setStage("success");

        console.log("success", success);
        console.log("message", message);
        console.log("publicUrl", publicUrl);
        console.log("documentId", documentId);

        // Reset file state after successful upload
        setFile(undefined);
        setUploading(false);
        setProgress(0);
        // console.log('publicUrl', publicUrl)
      } catch (error) {
        console.log("error on uploadFile", error);
        setUploading(false);
        setProgress(0);
        setStage("error");

        // Reset file state after successful upload
        setFile(undefined);
        setUploading(false);
      }
    }
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
          setStage("default");
          if (typeof file !== "string" && typeof file !== "undefined") {
            setStage("waiting");
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
        {stageMessages[stage as keyof typeof stageMessages]}
      </div>

      <Button
        className="rounded bg-secondary px-2 text-primary hover:opacity-80"
        onClick={uploadFile}
        disabled={!file || uploading}
      >
        Upload
      </Button>

      <div className="mx-auto  grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold">Original Image</h2>
          <img
            alt="Original Image"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="mb-4 text-2xl font-bold">Blurred Image</h2>
          <img
            alt="Blurred Image"
            className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
            height={600}
            src="/placeholder.svg"
            width={600}
          />
        </div>
      </div>
      <div className="mt-8">
        <Button className="w-full max-w-md" variant="outline">
          Download Blurred Image
        </Button>
      </div>
    </div>
  );
}
