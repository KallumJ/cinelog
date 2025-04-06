import { z } from "zod";

export function parseFormData<T extends z.ZodTypeAny>(formData: FormData, schema: T) {
    return schema.safeParse(Object.fromEntries(formData.entries()));
}