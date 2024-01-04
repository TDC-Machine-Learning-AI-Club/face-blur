import FileUploadForm from "@/components/forms/image_upload_form";

export default function IndexPage() {
  return (
    <div className="prose prose-sm prose-invert my-12 text-foreground ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="justify-center text-4xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
            Upload an Image you want to
            {""}
            <span className=" text-foreground/50"> Blur</span>
          </h1>
        </div>

        <FileUploadForm />
      </div>
    </div>
  );
}
