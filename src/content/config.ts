import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			cover: image(),
			title: z.string(),
			author: z.string(),
			updatedAt: z.string(),
			tag: z.array(z.string()),
		}),
});

export const collections = {
	blog: blogCollection,
};
