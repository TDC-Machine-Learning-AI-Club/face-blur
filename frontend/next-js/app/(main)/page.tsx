import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function IndexPage() {
  return (
    <div className="prose prose-sm prose-invert max-w-none text-foreground ">
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-6 sm:py-12 md:py-16 lg:py-24">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
                      AI Face <span className="text-foreground/50">Blur </span>{" "}
                      <br />
                      <span className="text-2xl font-bold tracking-tighter text-foreground sm:text-4xl xl:text-5xl/none">
                        The Future of Privacy
                      </span>
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl ">
                      Enhance your privacy with our state-of-the-art AI face
                      blur technology. Perfect for video calls, live streams,
                      and more.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="/blur"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  height="550"
                  src="/black-boy.jpeg"
                  width="550"
                />
              </div>
            </div>
          </section>

          <section className="w-full w-full bg-gray-100 py-6 sm:py-12 md:py-16 lg:py-24 dark:bg-gray-800 ">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                    Powerful AI for Privacy
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                    Our AI-powered face blur technology ensures the privacy of
                    individuals in your photos without compromising on quality.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <EyeOffIcon className="mx-auto h-10 w-10" />
                  <h3 className="text-center text-xl font-bold text-foreground">
                    Privacy Protection
                  </h3>
                  <p className="text-center text-muted-foreground ">
                    Our AI ensures the privacy of individuals in your photos.
                  </p>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <CloudLightningIcon className="mx-auto h-10 w-10" />
                  <h3 className="text-center text-xl font-bold text-foreground">
                    Fast Processing
                  </h3>
                  <p className="text-center text-muted-foreground ">
                    Get your photos processed in seconds, not minutes.
                  </p>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <LayersIcon className="mx-auto h-10 w-10" />
                  <h3 className="text-center text-xl font-bold text-foreground">
                    High Quality
                  </h3>
                  <p className="text-center text-muted-foreground ">
                    Maintain the quality of your photos with our advanced AI.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg  px-3 py-1 text-sm">
                    Before & After
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
                    See the Difference
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                    Check out the before and after examples to see how our AI
                    blurs faces while maintaining the quality of the photo.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 pt-12 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-center text-xl font-bold text-foreground">
                    Before
                  </h3>
                  <Image
                    alt="Before"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src="/dall-e-girl.png"
                    width="550"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-center text-xl font-bold text-foreground">
                    After
                  </h3>
                  <Image
                    alt="After"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="310"
                    src="/dall-e-girl-blured.png"
                    width="550"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full pb-6 sm:pb-12 md:pb-16 lg:pb-24">
            <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl/tight">
                  Request More Information / Contact Us
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                  Interested in AI Face Blur for your business? <br /> Do you
                  have any questions or concerns?
                  <br /> Please fill out the form below and we`ll get back to
                  you as soon as possible.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2 pt-4">
                <form className="flex flex-col gap-2 space-y-4">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Your Name"
                    type="text"
                  />
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Your Email"
                    type="email"
                  />
                  <textarea
                    className=" block w-full flex-1 rounded-md border-transparent   focus:bg-gray-500 focus:ring-0"
                    placeholder="Your Message"
                    rows={3}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function CloudLightningIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function EyeOffIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function LayersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
