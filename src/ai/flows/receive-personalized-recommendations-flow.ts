
'use server';
/**
 * @fileOverview A Genkit flow for providing personalized cannabis product recommendations.
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
  category: z.string().describe('Category (e.g., "Flower", "Edibles", "Concentrates").'),
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
  prompt: `You are an AI-powered cannabis specialist for DankDrops, a premium boutique dispensary. Your goal is to provide insightful product recommendations based on the user's browsing and purchasing behavior. 

You should consider strain types (Indica, Sativa, Hybrid) and product categories. For example, if a user is looking at high-potency Flower, they might enjoy premium Concentrates. If they are looking at sleepy Indica strains, they might like nighttime Edibles.

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

Here is the current harvest catalog. Recommend products from this list only:
{{#each allProducts}}
- ID: {{{id}}}, Name: {{{name}}}, Description: {{{description}}}, Category: {{{category}}}, Price: {{{price}}}
{{/each}}

Suggest 3-5 complementary products that would enhance the user's experience. Focus on strain effects and usage scenarios. Only output product IDs, names, descriptions, and categories that exist in the provided list.`,
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
