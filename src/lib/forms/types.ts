/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SuperValidated } from "sveltekit-superforms";

export type SuperForm<T extends Record<string, unknown>> = SuperValidated<T, any, T>