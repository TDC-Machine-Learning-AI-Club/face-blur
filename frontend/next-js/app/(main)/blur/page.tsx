import FileUploadForm from "@/components/forms/image_upload_form";

export default function IndexPage() {
  return (
    <div className="prose prose-sm prose-invert my-12 text-foreground ">
      <h1 className="text-4xl font-bold text-foreground ">
        Upload an Image you want to
        {""}
        <span className=" text-foreground/50"> Blur</span>
      </h1>
      <FileUploadForm />
    </div>
  );
}
