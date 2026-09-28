/**
 * Mock data cho development — sử dụng khi chưa có backend.
 * Import file này thay vì gọi API thực.
 */
import type {
  Student,
  StudentDetail,
  StatisticsFilters,
  StatisticsResponse,
  StatisticsRecord,
} from './types';

// ===== UC11 Mock =====

export const mockStudents: Student[] = [
  { id: '1', studentCode: 'SV001', fullName: 'Nguyễn Văn An', internshipPeriod: 'HK1 2025-2026', status: 'Đã hoàn thành' },
  { id: '2', studentCode: 'SV002', fullName: 'Trần Thị Bình', internshipPeriod: 'HK1 2025-2026', status: 'Đã hoàn thành' },
  { id: '3', studentCode: 'SV003', fullName: 'Lê Hoàng Cường', internshipPeriod: 'HK1 2025-2026', status: 'Đang thực tập' },
  { id: '4', studentCode: 'SV004', fullName: 'Phạm Minh Đức', internshipPeriod: 'HK2 2024-2025', status: 'Đã hoàn thành' },
  { id: '5', studentCode: 'SV005', fullName: 'Hoàng Thị Ê', internshipPeriod: 'HK2 2024-2025', status: 'Đã hoàn thành' },
];

export const mockStudentDetails: Record<string, StudentDetail> = {
  '1': {
    student: mockStudents[0],
    internshipReport: {
      id: 'r1',
      title: 'Báo cáo thực tập tại Công ty ABC',
      content: 'Trong quá trình thực tập, em đã tham gia phát triển hệ thống quản lý nhân sự...',
      submittedAt: '2025-12-15',
    },
    companyEvaluation: {
      id: 'e1',
      companyName: 'Công ty ABC',
      evaluatorName: 'Nguyễn Văn Giám Đốc',
      comment: 'Sinh viên chăm chỉ, hoàn thành tốt nhiệm vụ được giao.',
      rating: 'Tốt',
    },
    score: null,
  },
  '2': {
    student: mockStudents[1],
    internshipReport: {
      id: 'r2',
      title: 'Báo cáo thực tập tại Công ty XYZ',
      content: 'Em đã thực tập tại bộ phận kiểm thử phần mềm...',
      submittedAt: '2025-12-18',
    },
    companyEvaluation: {
      id: 'e2',
      companyName: 'Công ty XYZ',
      evaluatorName: 'Trần Văn Quản Lý',
      comment: 'Sinh viên có tinh thần học hỏi, cần cải thiện kỹ năng giao tiếp.',
      rating: 'Khá',
    },
    score: 7.5,
  },
  '3': {
    student: mockStudents[2],
    internshipReport: null,
    companyEvaluation: null,
    score: null,
  },
  '4': {
    student: mockStudents[3],
    internshipReport: {
      id: 'r4',
      title: 'Báo cáo thực tập tại Công ty DEF',
      content: 'Dự án mobile app cho quản lý kho hàng...',
      submittedAt: '2025-06-20',
    },
    companyEvaluation: {
      id: 'e4',
      companyName: 'Công ty DEF',
      evaluatorName: 'Lê Thị Phó GĐ',
      comment: 'Hoàn thành xuất sắc.',
      rating: 'Xuất sắc',
    },
    score: 9.0,
  },
  '5': {
    student: mockStudents[4],
    internshipReport: {
      id: 'r5',
      title: 'Báo cáo thực tập tại Công ty GHI',
      content: 'Thực tập tại bộ phận hỗ trợ kỹ thuật...',
      submittedAt: '2025-06-22',
    },
    companyEvaluation: {
      id: 'e5',
      companyName: 'Công ty GHI',
      evaluatorName: 'Phạm Văn Trưởng BP',
      comment: 'Sinh viên trung bình, cần nỗ lực hơn.',
      rating: 'Trung bình',
    },
    score: 5.0,
  },
};

// ===== UC12 Mock =====

export const mockStatisticsFilters: StatisticsFilters = {
  internshipPeriods: [
    { id: '1', name: 'HK1 2025-2026' },
    { id: '2', name: 'HK2 2024-2025' },
    { id: '3', name: 'HK1 2024-2025' },
  ],
  companies: [
    { id: '1', name: 'Công ty ABC' },
    { id: '2', name: 'Công ty XYZ' },
    { id: '3', name: 'Công ty DEF' },
    { id: '4', name: 'Công ty GHI' },
  ],
  supervisors: [
    { id: '1', name: 'TS. Nguyễn Hướng Dẫn' },
    { id: '2', name: 'ThS. Trần Giảng Viên' },
  ],
  results: [
    { id: 'pass', name: 'Đạt' },
    { id: 'fail', name: 'Không đạt' },
    { id: 'not_graded', name: 'Chưa chấm điểm' },
  ],
};

export const mockStatisticsData: StatisticsRecord[] = [
  { id: '1', studentCode: 'SV001', studentName: 'Nguyễn Văn An', internshipPeriod: 'HK1 2025-2026', company: 'Công ty ABC', supervisor: 'TS. Nguyễn Hướng Dẫn', score: 8.5, result: 'Đạt' },
  { id: '2', studentCode: 'SV002', studentName: 'Trần Thị Bình', internshipPeriod: 'HK1 2025-2026', company: 'Công ty XYZ', supervisor: 'TS. Nguyễn Hướng Dẫn', score: 7.5, result: 'Đạt' },
  { id: '3', studentCode: 'SV003', studentName: 'Lê Hoàng Cường', internshipPeriod: 'HK1 2025-2026', company: 'Công ty ABC', supervisor: 'ThS. Trần Giảng Viên', score: null, result: 'Chưa chấm điểm' },
  { id: '4', studentCode: 'SV004', studentName: 'Phạm Minh Đức', internshipPeriod: 'HK2 2024-2025', company: 'Công ty DEF', supervisor: 'ThS. Trần Giảng Viên', score: 9.0, result: 'Đạt' },
  { id: '5', studentCode: 'SV005', studentName: 'Hoàng Thị Ê', internshipPeriod: 'HK2 2024-2025', company: 'Công ty GHI', supervisor: 'TS. Nguyễn Hướng Dẫn', score: 3.0, result: 'Không đạt' },
];

export const mockStatisticsResponse: StatisticsResponse = {
  data: mockStatisticsData,
  summary: {
    totalStudents: 5,
    averageScore: 7.0,
    passCount: 3,
    failCount: 1,
    notGradedCount: 1,
  },
};

// ===== Mock API functions (simulates network delay) =====

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // UC11
  async fetchStudents(): Promise<Student[]> {
    await delay(500);
    return mockStudents;
  },

  async fetchStudentDetail(studentId: string): Promise<StudentDetail> {
    await delay(400);
    const detail = mockStudentDetails[studentId];
    if (!detail) throw new Error('Không tìm thấy sinh viên');
    return detail;
  },

  async saveScore(studentId: string, score: number): Promise<{ success: boolean; message: string }> {
    await delay(600);
    const detail = mockStudentDetails[studentId];
    if (detail) {
      detail.score = score;
    }
    return { success: true, message: 'Chấm điểm thành công' };
  },

  // UC12
  async fetchStatisticsFilters(): Promise<StatisticsFilters> {
    await delay(400);
    return mockStatisticsFilters;
  },

  async fetchStatistics(): Promise<StatisticsResponse> {
    await delay(600);
    return mockStatisticsResponse;
  },

  async exportReport(): Promise<Blob> {
    await delay(800);
    // Create a simple CSV-like blob for demo
    const header = 'MSSV,Họ tên,Kỳ thực tập,Doanh nghiệp,GVHD,Điểm,Kết quả\n';
    const rows = mockStatisticsData
      .map(r => `${r.studentCode},${r.studentName},${r.internshipPeriod},${r.company},${r.supervisor},${r.score ?? 'N/A'},${r.result}`)
      .join('\n');
    return new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
  },
};
