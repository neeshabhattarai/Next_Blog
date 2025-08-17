"use server";

import { updateStatusLike } from "@/postfeed";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: number) {
  // persist change in DB
  await updateStatusLike(postId, 2);
  revalidatePath("/feed", "page");
}
