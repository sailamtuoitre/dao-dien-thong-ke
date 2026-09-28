/* ===== Shared Types ===== */

// --- Student & Grading (UC11) ---

export interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  internshipPeriod?: string;
  status?: string;
}

export interface InternshipReport {
  id: string;
  title: string;
  content: string;
  submittedAt: string;
}

export interface CompanyEvaluation {
  id: string;
  companyName: string;
  evaluatorName: string;
  comment: string;
  rating: string;
}

export interface StudentDetail {
  student: Student;
  internshipReport: InternshipReport | null;
  companyEvaluation: CompanyEvaluation | null;
  score: number | null;
}

export interface SaveScoreResponse {
  success: boolean;
  message: string;
}

// --- Statistics (UC12) ---

export interface FilterOption {
  id: string;
  name: string;
}

export interface StatisticsFilters {
  internshipPeriods: FilterOption[];
  companies: FilterOption[];
  supervisors: FilterOption[];
  results: FilterOption[];
}

export interface SelectedFilters {
  internshipPeriodId: string;
  companyId: string;
  supervisorId: string;
  result: string;
}

export interface StatisticsRecord {
  id: string;
  studentCode: string;
  studentName: string;
  internshipPeriod: string;
  company: string;
  supervisor: string;
  score: number | null;
  result: string;
}

export interface StatisticsSummaryData {
  totalStudents: number;
  averageScore: number;
  passCount: number;
  failCount: number;
  notGradedCount: number;
}

export interface StatisticsResponse {
  data: StatisticsRecord[];
  summary: StatisticsSummaryData;
}
