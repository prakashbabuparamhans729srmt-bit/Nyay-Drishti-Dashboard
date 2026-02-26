'use server';
/**
 * @fileOverview An AI-powered tool for analyzing judicial data to identify systemic bottlenecks and provide actionable recommendations.
 *
 * - judicialBottleneckAnalysis - A function that analyzes judicial data.
 * - JudicialBottleneckAnalysisInput - The input type for the judicialBottleneckAnalysis function.
 * - JudicialBottleneckAnalysisOutput - The return type for the judicialBottleneckAnalysis function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JudicialBottleneckAnalysisInputSchema = z.object({
  courtData: z.array(
    z.object({
      courtName: z.string().describe('Name of the court (e.g., Supreme Court, Allahabad High Court).'),
      pendingCases: z.number().describe('Total number of pending cases in this court.'),
      newCasesThisYear: z.number().describe('Number of new cases filed in this court this year.'),
      disposedCasesThisYear: z.number().describe('Number of cases disposed of by this court this year.'),
      totalSanctionedJudgePosts: z.number().describe('Total sanctioned judge posts for this court.'),
      vacantJudgePosts: z.number().describe('Number of vacant judge posts in this court.'),
      judgeWorkload: z.number().optional().describe('Average cases per judge in this court (if available).'),
      disposalRate: z.number().optional().describe('Case disposal rate for the court (as a percentage, e.g., 85 for 85%).'),
    })
  ).describe('Array of data for various courts.'),
  overallPendingCaseTrend: z.array(
    z.object({
      year: z.number().describe('Year of the data.'),
      pendingCasesCount: z.number().describe('Total pending cases across all courts for that year.'),
    })
  ).describe('Overall pending case trend over the last few years.'),
  pendingCasesAgeDistribution: z.object({
    '0-1_year': z.number().describe('Percentage of cases pending for 0-1 year.'),
    '1-3_years': z.number().describe('Percentage of cases pending for 1-3 years.'),
    '3-5_years': z.number().describe('Percentage of cases pending for 3-5 years.'),
    '5-10_years': z.number().describe('Percentage of cases pending for 5-10 years.'),
    '10+_years': z.number().describe('Percentage of cases pending for 10+ years.'),
  }).describe('Distribution of pending cases by age.'),
  topPerformingJudges: z.array(
    z.object({
      judgeName: z.string().describe('Name of the judge.'),
      court: z.string().describe('Court where the judge presides.'),
      casesDisposed: z.number().describe('Number of cases disposed by the judge.'),
    })
  ).describe('List of top-performing judges by cases disposed.'),
});
export type JudicialBottleneckAnalysisInput = z.infer<typeof JudicialBottleneckAnalysisInputSchema>;

const JudicialBottleneckAnalysisOutputSchema = z.object({
  summary: z.string().describe('A high-level summary of the judicial system analysis.'),
  identifiedBottlenecks: z.array(
    z.object({
      category: z.string().describe('Category of the bottleneck (e.g., Vacancy, Workload, Disposal Rate).'),
      description: z.string().describe('Detailed description of the bottleneck.'),
      impact: z.string().describe('Impact of this bottleneck on judicial efficiency.'),
      relevantCourts: z.array(z.string()).optional().describe('Courts primarily affected by this bottleneck.'),
    })
  ).describe('List of identified systemic bottlenecks.'),
  actionableRecommendations: z.array(
    z.object({
      recommendation: z.string().describe('Specific actionable recommendation.'),
      justification: z.string().describe('Reasoning or expected outcome of the recommendation.'),
      priority: z.enum(['High', 'Medium', 'Low']).describe('Priority level for implementing the recommendation.'),
    })
  ).describe('List of actionable recommendations to improve efficiency.'),
});
export type JudicialBottleneckAnalysisOutput = z.infer<typeof JudicialBottleneckAnalysisOutputSchema>;

export async function judicialBottleneckAnalysis(input: JudicialBottleneckAnalysisInput): Promise<JudicialBottleneckAnalysisOutput> {
  return judicialBottleneckAnalysisFlow(input);
}

const judicialBottleneckAnalysisPrompt = ai.definePrompt({
  name: 'judicialBottleneckAnalysisPrompt',
  input: { schema: JudicialBottleneckAnalysisInputSchema },
  output: { schema: JudicialBottleneckAnalysisOutputSchema },
  prompt: `You are an AI-powered judicial system analyst. Your task is to analyze provided judicial data to proactively identify systemic bottlenecks and provide actionable recommendations to improve judicial efficiency and case disposal rates.

Here is the judicial data:

### Court Data:
{{{courtData}}}

### Overall Pending Case Trend (Last few years):
{{{overallPendingCaseTrend}}}

### Pending Cases Age Distribution:
{{{pendingCasesAgeDistribution}}}

### Top Performing Judges:
{{{topPerformingJudges}}}

Analyze the data and provide a concise summary, a list of identified bottlenecks with their impact and relevant courts, and specific actionable recommendations with justification and priority levels. Focus on systemic issues and practical solutions.

Ensure that every identified bottleneck has a clear description, its impact, and affected courts. Every recommendation should be actionable, have a clear justification, and a priority (High, Medium, Low).`,
});

const judicialBottleneckAnalysisFlow = ai.defineFlow(
  {
    name: 'judicialBottleneckAnalysisFlow',
    inputSchema: JudicialBottleneckAnalysisInputSchema,
    outputSchema: JudicialBottleneckAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await judicialBottleneckAnalysisPrompt(input);
    return output!;
  }
);
