'use server';
/**
 * @fileOverview A Genkit flow for providing personalized product recommendations.
 *
 * - receivePersonalizedRecommendations - A function that handles the product recommendation process.
 * - ReceivePersonalizedRecommendationsInput - The input type for the receivePersonalizedRecommendations function.
 * - ReceivePersonalizedRecommendationsOutput - The return type for the receivePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSchema = z.object({
  id: z.string().describe('Unique identifier for the product.'),
  name: z.string().describe('Name of the product.'),
  description: z.string().describe('Description of the product.'),
  category: z.string().describe('Category of the product (e.g., "T-Shirts", "Hoodies", "Accessories").'),
  price: z.number().describe('Price of the product.'),
});

const ReceivePersonalizedRecommendationsInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('List of product names or IDs the user has recently viewed.'),
  cartItems: z
    .array(z.string())
    .describe('List of product names or IDs currently in the user\'s shopping cart.'),
  allProducts: z
    .array(ProductSchema)
    .describe('List of all available products in the catalog.'),
});
export type ReceivePersonalizedRecommendationsInput = z.infer<
  typeof ReceivePersonalizedRecommendationsInputSchema
>;

const RecommendedProductSchema = z.object({
  id: z.string().describe('Unique identifier for the recommended product.'),
  name: z.string().describe('Name of the recommended product.'),
  description: z.string().describe('Description of the recommended product.'),
  category: z.string().describe('Category of the recommended product.'),
});

const ReceivePersonalizedRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(RecommendedProductSchema)
    .describe('List of recommended products.'),
});
export type ReceivePersonalizedRecommendationsOutput = z.infer<
  typeof ReceivePersonalizedRecommendationsOutputSchema
>;

export async function receivePersonalizedRecommendations(
  input: ReceivePersonalizedRecommendationsInput
): Promise<ReceivePersonalizedRecommendationsOutput> {
  return receivePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: ReceivePersonalizedRecommendationsInputSchema},
  output: {schema: ReceivePersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI-powered personalized shopping assistant for DankDrops, a streetwear e-commerce store. Your goal is to provide insightful product recommendations to users based on their shopping behavior. Your suggestions should enhance their streetwear style and be relevant to their implied preferences.

The user has the following browsing history and items in their cart:

Browsing History:
{{#if browsingHistory}}
  {{#each browsingHistory}}
    - {{{this}}}
  {{/each}}
{{else}}
  No browsing history available.
{{/if}}

Cart Items:
{{#if cartItems}}
  {{#each cartItems}}
    - {{{this}}}
  {{/each}}
{{else}}
  No items in cart.
{{/if}}

Here is a list of all available products in the store. Please only recommend products from this list:
{{#each allProducts}}
- ID: {{{id}}}, Name: {{{name}}}, Description: {{{description}}}, Category: {{{category}}}, Price: {{{price}}}
{{/each}}

Based on the browsing history and cart items, suggest 3-5 complementary or similar products from the 'allProducts' list that the user might be interested in. Do not recommend products that are already explicitly mentioned in the browsing history or cart items if possible, unless they are very highly complementary and you believe they significantly enhance the overall style. Only output product IDs, names, descriptions, and categories that exist in the provided 'allProducts' list.`,
});

const receivePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedRecommendationsFlow',
    inputSchema: ReceivePersonalizedRecommendationsInputSchema,
    outputSchema: ReceivePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
