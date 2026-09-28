import { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../mockData';
import type { Student, StudentDetail } from '../types';
import './UC11GradingPage.css';

/* ===== Sub-components ===== */

function StudentSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="student-search">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Tìm kiếm sinh viên (MSSV hoặc họ tên)..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function StudentTable({
  students,
  selectedId,
  onSelect,
}: {
  students: Student[];
  selectedId: string | null;
  onSelect: (s: Student) => void;
}) {
  if (students.length === 0) {
    return <div className="empty-state">Không tìm thấy sinh viên nào.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Kỳ thực tập</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr
              key={s.id}
              className={selectedId === s.id ? 'selected' : ''}
              onClick={() => onSelect(s)}
            >
              <td>{s.studentCode}</td>
              <td>{s.fullName}</td>
              <td>{s.internshipPeriod ?? '—'}</td>
              <td>
                <span className={`status-badge ${s.status === 'Đã hoàn thành' ? 'completed' : 'in-progress'}`}>
                  {s.status ?? '—'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StudentInformation({ detail }: { detail: StudentDetail }) {
  const { student } = detail;
  return (
    <div className="info-card">
      <h3>📋 Thông tin sinh viên</h3>
      <div className="info-grid">
        <div className="info-item">
          <label>MSSV</label>
          <span>{student.studentCode}</span>
        </div>
        <div className="info-item">
          <label>Họ và tên</label>
          <span>{student.fullName}</span>
        </div>
        <div className="info-item">
          <label>Kỳ thực tập</label>
          <span>{student.internshipPeriod ?? '—'}</span>
        </div>
        <div className="info-item">
          <label>Trạng thái</label>
          <span>{student.status ?? '—'}</span>
        </div>
      </div>
    </div>
  );
}

function InternshipReport({ detail }: { detail: StudentDetail }) {
  const report = detail.internshipReport;
  return (
    <div className="info-card">
      <h3>📄 Báo cáo thực tập</h3>
      {report ? (
        <div className="report-content">
          <div className="report-header">
            <strong>{report.title}</strong>
            <span className="report-date">Nộp ngày: {report.submittedAt}</span>
          </div>
          <p>{report.content}</p>
        </div>
      ) : (
        <div className="empty-state">Chưa có báo cáo thực tập.</div>
      )}
    </div>
  );
}

function CompanyEvaluation({ detail }: { detail: StudentDetail }) {
  const evaluation = detail.companyEvaluation;
  return (
    <div className="info-card">
      <h3>🏢 Nhận xét / Đánh giá của doanh nghiệp</h3>
      {evaluation ? (
        <div className="evaluation-content">
          <div className="eval-row">
            <label>Doanh nghiệp:</label>
            <span>{evaluation.companyName}</span>
          </div>
          <div className="eval-row">
            <label>Người đánh giá:</label>
            <span>{evaluation.evaluatorName}</span>
          </div>
          <div className="eval-row">
            <label>Đánh giá:</label>
            <span className="eval-rating">{evaluation.rating}</span>
          </div>
          <div className="eval-row">
            <label>Nhận xét:</label>
            <span>{evaluation.comment}</span>
          </div>
        </div>
      ) : (
        <div className="empty-state">Chưa có đánh giá từ doanh nghiệp.</div>
      )}
    </div>
  );
}

function ScoreForm({
  currentScore,
  onSave,
  saving,
}: {
  currentScore: number | null;
  onSave: (score: number) => void;
  saving: boolean;
}) {
  const [inputValue, setInputValue] = useState(currentScore !== null ? String(currentScore) : '');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    setInputValue(currentScore !== null ? String(currentScore) : '');
    setValidationError('');
  }, [currentScore]);

  const handleSave = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') {
      setValidationError('Vui lòng nhập điểm.');
      return;
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      setValidationError('Điểm phải là một số hợp lệ.');
      return;
    }
    setValidationError('');
    onSave(num);
  };

  return (
    <div className="score-form">
      <h3>✏️ Chấm điểm</h3>
      <div className="score-input-row">
        <label htmlFor="score-input">Điểm:</label>
        <input
          id="score-input"
          type="number"
          step="any"
          placeholder="Nhập điểm..."
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value);
            setValidationError('');
          }}
          disabled={saving}
        />
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '⏳ Đang lưu...' : '💾 Lưu / Xác nhận điểm'}
        </button>
      </div>
      {validationError && <div className="validation-error">{validationError}</div>}
    </div>
  );
}

function GradingResultMessage({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    if (type === 'success') {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <div className={`result-message ${type}`}>
      <span>{type === 'success' ? '✅' : '❌'} {message}</span>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  );
}

/* ===== Main Page ===== */

export function UC11GradingPage() {
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentDetail, setStudentDetail] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [resultMessage, setResultMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load student list on mount
  useEffect(() => {
    setLoading(true);
    mockApi
      .fetchStudents()
      .then(data => {
        setStudents(data);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filter students by search query
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      s.studentCode.toLowerCase().includes(q) ||
      s.fullName.toLowerCase().includes(q)
    );
  });

  // Select a student
  const handleSelectStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setStudentDetail(null);
    setResultMessage(null);
    setDetailLoading(true);

    mockApi
      .fetchStudentDetail(student.id)
      .then(detail => {
        setStudentDetail(detail);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setDetailLoading(false));
  }, []);

  // Save score
  const handleSaveScore = useCallback(
    (score: number) => {
      if (!selectedStudent) return;
      setSaving(true);
      setResultMessage(null);

      mockApi
        .saveScore(selectedStudent.id, score)
        .then(res => {
          setResultMessage({ message: res.message, type: 'success' });
          // Reload detail to reflect new score
          return mockApi.fetchStudentDetail(selectedStudent.id);
        })
        .then(detail => setStudentDetail(detail))
        .catch(err => setResultMessage({ message: err.message, type: 'error' }))
        .finally(() => setSaving(false));
    },
    [selectedStudent]
  );

  return (
    <div className="uc11-page">
      {/* Result message */}
      {resultMessage && (
        <GradingResultMessage
          message={resultMessage.message}
          type={resultMessage.type}
          onClose={() => setResultMessage(null)}
        />
      )}

      {/* Error */}
      {error && (
        <div className="api-error">❌ {error}</div>
      )}

      {/* Student List Section */}
      <section className="section student-list-section">
        <h2>📚 Danh sách sinh viên được hướng dẫn</h2>
        <StudentSearch value={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Đang tải danh sách sinh viên...</span>
          </div>
        ) : (
          <StudentTable
            students={filteredStudents}
            selectedId={selectedStudent?.id ?? null}
            onSelect={handleSelectStudent}
          />
        )}
      </section>

      {/* Student Detail Section */}
      {selectedStudent && (
        <section className="section student-detail-section">
          <h2>📖 Thông tin sinh viên được chọn</h2>

          {detailLoading ? (
            <div className="loading-state">
              <div className="spinner" />
              <span>Đang tải thông tin sinh viên...</span>
            </div>
          ) : studentDetail ? (
            <>
              <StudentInformation detail={studentDetail} />
              <InternshipReport detail={studentDetail} />
              <CompanyEvaluation detail={studentDetail} />

              <ScoreForm
                currentScore={studentDetail.score}
                onSave={handleSaveScore}
                saving={saving}
              />
            </>
          ) : null}
        </section>
      )}
    </div>
  );
}
