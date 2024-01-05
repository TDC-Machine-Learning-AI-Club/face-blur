"use server";

import { auth } from "@/auth";
import { Database } from "@/types/db_types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type blurImageResponse = {
  success: boolean;
  message: string;
  blurred_image_url: string | null;
  conversionId?: string;
};

type saveConversionResponse = {
  success: boolean;
  message?: string;
  conversionId?: string;
};

export async function blurImage(
  image_url: string,
  is_guest: boolean = true
): Promise<blurImageResponse> {
  try {
    const response = await fetch(
      `${process.env.FACE_BLUR_API_BASE_URL}/image-blurrer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.FACE_BLUR_API_KEY || "",
        } as HeadersInit,
        body: JSON.stringify({
          image_url: image_url,
        }),
      }
    );
    const data = await response.json();
    console.log("face blur response", data);
    if (data.public_url) {
      if (is_guest) {
        return {
          success: true,
          message: "Image blurred successfully",
          blurred_image_url: data.public_url,
        };
      }

      const saveConversionResponse = await saveConversion(
        image_url,
        data.output_url
      );

      if (saveConversionResponse.success) {
        return {
          success: true,
          blurred_image_url: data.output_url,
          conversionId: saveConversionResponse.conversionId,
        };
      } else {
        return {
          success: false,
          message: "Error saving conversion",
        };
      }
    } else {
      return {
        success: false,
        message: "Error blurring image",
        blurred_image_url: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error blurring image",
      blurred_image_url: null,
    };
  }
}

export async function saveConversion(
  image_url: string,
  blurred_image_url: string
): Promise<saveConversionResponse> {
  const cookieStore = cookies();
  const session = await auth({ cookieStore });
  const extension = image_url.split(".").pop();

  if (!session?.user) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.from("conversions").insert([
    {
      user_id: session.user.id,
      image_source: image_url,
      blurred_image_url: blurred_image_url,
      extension: extension,
    },
  ]);

  if (error) {
    console.error("Error creating document:", error);
    return {
      success: false,
      message: `Error creating document : ${JSON.stringify(
        error
      )} , ${JSON.stringify(session)}`,
    };
  }

  return {
    success: true,
    conversionId: `${JSON.stringify(data)}`,
  };
}
