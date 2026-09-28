import type {
  Student,
  StudentDetail,
  SaveScoreResponse,
  StatisticsFilters,
  StatisticsResponse,
  SelectedFilters,
} from './types';

const API_BASE = '/api';

/* ===== UC11 — Grading APIs ===== */

export async function fetchStudents(): Promise<Student[]> {
  const res = await fetch(`${API_BASE}/grading/students`);
  if (!res.ok) throw new Error('Không thể tải danh sách sinh viên');
  const json = await res.json();
  return json.data;
}

export async function fetchStudentDetail(studentId: string): Promise<StudentDetail> {
  const res = await fetch(`${API_BASE}/grading/students/${studentId}`);
  if (!res.ok) throw new Error('Không thể tải thông tin sinh viên');
  return res.json();
}

export async function saveScore(studentId: string, score: number): Promise<SaveScoreResponse> {
  const res = await fetch(`${API_BASE}/grading/students/${studentId}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score }),
  });
  if (!res.ok) throw new Error('Lưu điểm thất bại');
  return res.json();
}

/* ===== UC12 — Statistics APIs ===== */

export async function fetchStatisticsFilters(): Promise<StatisticsFilters> {
  const res = await fetch(`${API_BASE}/statistics/filters`);
  if (!res.ok) throw new Error('Không thể tải bộ lọc');
  return res.json();
}

export async function fetchStatistics(filters: SelectedFilters): Promise<StatisticsResponse> {
  const params = new URLSearchParams();
  if (filters.internshipPeriodId) params.set('internshipPeriodId', filters.internshipPeriodId);
  if (filters.companyId) params.set('companyId', filters.companyId);
  if (filters.supervisorId) params.set('supervisorId', filters.supervisorId);
  if (filters.result) params.set('result', filters.result);

  const res = await fetch(`${API_BASE}/statistics/internships?${params.toString()}`);
  if (!res.ok) throw new Error('Không thể tải dữ liệu thống kê');
  return res.json();
}

export async function exportStatisticsReport(filters: SelectedFilters): Promise<Blob> {
  const params = new URLSearchParams();
  if (filters.internshipPeriodId) params.set('internshipPeriodId', filters.internshipPeriodId);
  if (filters.companyId) params.set('companyId', filters.companyId);
  if (filters.supervisorId) params.set('supervisorId', filters.supervisorId);
  if (filters.result) params.set('result', filters.result);

  const res = await fetch(`${API_BASE}/statistics/internships/export?${params.toString()}`);
  if (!res.ok) throw new Error('Xuất báo cáo thất bại');
  return res.blob();
}
