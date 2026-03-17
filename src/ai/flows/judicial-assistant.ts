'use server';
/**
 * @fileOverview A multi-lingual judicial AI assistant for NyayDrishti.
 *
 * - judicialAssistant - A function that provides judicial guidance.
 * - JudicialAssistantInput - Input schema for the assistant.
 * - JudicialAssistantOutput - Output schema for the assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JudicialAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question or query.'),
  language: z.string().describe('The user\'s preferred language (e.g., hi, en, ta).'),
  context: z.string().optional().describe('Additional context about the current dashboard state or user role.'),
});
export type JudicialAssistantInput = z.infer<typeof JudicialAssistantInputSchema>;

const JudicialAssistantOutputSchema = z.object({
  response: z.string().describe('The AI generated response in the requested language.'),
  suggestedActions: z.array(z.string()).optional().describe('List of suggested next steps for the user.'),
});
export type JudicialAssistantOutput = z.infer<typeof JudicialAssistantOutputSchema>;

export async function judicialAssistant(input: JudicialAssistantInput): Promise<JudicialAssistantOutput> {
  return judicialAssistantFlow(input);
}

const judicialAssistantPrompt = ai.definePrompt({
  name: 'judicialAssistantPrompt',
  input: { schema: JudicialAssistantInputSchema },
  output: { schema: JudicialAssistantOutputSchema },
  prompt: `You are the NyayDrishti AI Assistant, an expert in the Indian Judicial System.
Your goal is to help users navigate the dashboard, understand judicial metrics, and provide general legal procedural information in their preferred language.

User Language: {{{language}}}
User Query: {{{query}}}
Context: {{{context}}}

Respond clearly and professionally in the requested language. If the language is not English, ensure high-quality translation and cultural relevance. 
Identify yourself as "न्यायदृष्टि एआई सहायक" (or equivalent in other languages). 

Focus on:
1. Explaining the dashboard (Pending cases, Disposal rates, etc.)
2. General legal concepts (Civil vs Criminal, Filing procedures)
3. Directing users to specific sections (Courts, Judges, Reports)

Response format must be professional and helpful.`,
});

const judicialAssistantFlow = ai.defineFlow(
  {
    name: 'judicialAssistantFlow',
    inputSchema: JudicialAssistantInputSchema,
    outputSchema: JudicialAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await judicialAssistantPrompt(input);
    return output!;
  }
);
