"use server";

import PocketBase, { ClientResponseError } from "pocketbase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // TODO: server-side validation

  const pb = new PocketBase(process.env.POCKETBASE_URL);

  const { token, record: model } = await pb
    .collection("users")
    .authWithPassword(email, password);

  const cookie = JSON.stringify({ token, model });

  cookies().set("pb_auth", cookie, {
    secure: true,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  });

  redirect("/");
}

export async function logout() {
  cookies().delete("pb_auth");
  redirect("/");
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string

    // TODO: server-side validation

  const pb = new PocketBase(process.env.POCKETBASE_URL);

  await pb.collection("users").create({ email, password, passwordConfirm})

  redirect("/login")
}
