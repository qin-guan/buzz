import { z } from 'zod'

const translateResponse = z.object({
  translations: z.array(z.object({
    text: z.string(),
  })),
})

export type TranslateResponse = z.infer<typeof translateResponse>
