import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			cover: image(),
			title: z.string(),
			author: z.string(),
			updatedAt: z.string(),
			tag: z.array(
				z.enum([
					"ニュース",
					"日常",
					"ポエム",
					"振り返り",
					"イベント",
					"Tech",
					"教養",
				])
			),
		}),
});

export const collections = {
	blog: blogCollection,
};
