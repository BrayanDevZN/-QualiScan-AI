export type Decision = "approved" | "analysis" | "rejected";

export const decisionLabels: Record<Decision, string> = {
  approved: "Aprovado",
  analysis: "Em análise",
  rejected: "Reprovado",
};

export function countDecisions(decisions: ReadonlyMap<number, Decision>) {
  const counts: Record<Decision, number> = { approved: 0, analysis: 0, rejected: 0 };
  decisions.forEach((decision) => {
    counts[decision] += 1;
  });
  return counts;
}
