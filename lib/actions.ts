"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProducts() {
  revalidateTag("products");
}

export async function revalidateCategories() {
  revalidateTag("categories");
}
