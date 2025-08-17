// CreateForm.ts
"use server";

import { UploadImage } from "@/cloudinary/UploadImage";
import { insertFeed } from "@/postfeed";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: string[];
};

export default async function CreateForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title") as string | null;
  const image = formData.get("image") as File | null;
  const content = formData.get("content") as string | null;

  const errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push("title should be there");
  }
  if (!content || content.trim().length === 0) {
    errors.push("content should be there");
  }

  if (errors.length > 0) {
    return { errors };
  }

  const ImageUrl = await UploadImage({ image });
  const info = {
    title,
    image: ImageUrl,
    content,
    userid: 1,
  };

  await insertFeed(info);

  redirect("/feed"); // throws → but TS is fine with Promise<FormState>
}
