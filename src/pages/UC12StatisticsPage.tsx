import { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../mockData';
import type {
  StatisticsFilters,
  StatisticsResponse,
  SelectedFilters,
} from '../types';
import './UC12StatisticsPage.css';

/* ===== Sub-components ===== */

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; name: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="filter-item">
      <label>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Tất cả</option>
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryCards({ summary }: { summary: StatisticsResponse['summary'] }) {
  const cards = [
    { label: 'Tổng sinh viên', value: summary.totalStudents, className: 'card-total' },
    { label: 'Điểm trung bình', value: summary.averageScore.toFixed(1), className: 'card-average' },
    { label: 'Đạt', value: summary.passCount, className: 'card-pass' },
    { label: 'Không đạt', value: summary.failCount, className: 'card-fail' },
    { label: 'Chưa chấm điểm', value: summary.notGradedCount, className: 'card-not-graded' },
  ];

  return (
    <div className="summary-cards">
      {cards.map(card => (
        <div key={card.label} className={`summary-card ${card.className}`}>
          <div className="card-value">{card.value}</div>
          <div className="card-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatisticsTable({ data }: { data: StatisticsResponse['data'] }) {
  if (data.length === 0) {
    return <div className="empty-state">Không có dữ liệu thống kê.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table stats-table">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Kỳ thực tập</th>
            <th>Doanh nghiệp</th>
            <th>GVHD</th>
            <th>Điểm</th>
            <th>Kết quả</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.studentCode}</td>
              <td>{row.studentName}</td>
              <td>{row.internshipPeriod}</td>
              <td>{row.company}</td>
              <td>{row.supervisor}</td>
              <td className="score-cell">
                {row.score !== null ? row.score.toFixed(1) : <span className="no-score">N/A</span>}
              </td>
              <td>
                <span className={`result-badge ${getResultClass(row.result)}`}>
                  {row.result}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getResultClass(result: string): string {
  if (result === 'Đạt') return 'result-pass';
  if (result === 'Không đạt') return 'result-fail';
  return 'result-pending';
}

/* ===== Main Page ===== */

export function UC12StatisticsPage() {
  // State
  const [filters, setFilters] = useState<StatisticsFilters | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    internshipPeriodId: '',
    companyId: '',
    supervisorId: '',
    result: '',
  });
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [exportMessage, setExportMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Load filters on mount
  useEffect(() => {
    setLoadingFilters(true);
    mockApi
      .fetchStatisticsFilters()
      .then(data => {
        setFilters(data);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoadingFilters(false));
  }, []);

  // Update a single filter
  const updateFilter = useCallback((key: keyof SelectedFilters, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Search/view statistics
  const handleSearch = useCallback(() => {
    setLoadingStats(true);
    setStatistics(null);
    setError('');

    mockApi
      .fetchStatistics()
      .then(data => setStatistics(data))
      .catch(err => setError(err.message))
      .finally(() => setLoadingStats(false));
  }, []);

  // Export report
  const handleExport = useCallback(() => {
    setExporting(true);
    setExportMessage(null);

    mockApi
      .exportReport()
      .then(blob => {
        // Trigger download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bao_cao_thong_ke.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setExportMessage({ text: 'Xuất báo cáo thành công!', type: 'success' });
      })
      .catch(err => setExportMessage({ text: err.message, type: 'error' }))
      .finally(() => setExporting(false));
  }, []);

  return (
    <div className="uc12-page">
      {/* Error */}
      {error && <div className="api-error">❌ {error}</div>}

      {/* Export Message */}
      {exportMessage && (
        <div className={`result-message ${exportMessage.type}`}>
          <span>{exportMessage.type === 'success' ? '✅' : '❌'} {exportMessage.text}</span>
          <button className="close-btn" onClick={() => setExportMessage(null)}>✕</button>
        </div>
      )}

      {/* Filters Section */}
      <section className="section filters-section">
        <h2>🔍 Bộ lọc thống kê</h2>

        {loadingFilters ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Đang tải bộ lọc...</span>
          </div>
        ) : filters ? (
          <>
            <div className="filters-grid">
              <FilterDropdown
                label="Kỳ thực tập"
                options={filters.internshipPeriods}
                value={selectedFilters.internshipPeriodId}
                onChange={v => updateFilter('internshipPeriodId', v)}
              />
              <FilterDropdown
                label="Doanh nghiệp"
                options={filters.companies}
                value={selectedFilters.companyId}
                onChange={v => updateFilter('companyId', v)}
              />
              <FilterDropdown
                label="GV hướng dẫn"
                options={filters.supervisors}
                value={selectedFilters.supervisorId}
                onChange={v => updateFilter('supervisorId', v)}
              />
              <FilterDropdown
                label="Kết quả thực tập"
                options={filters.results}
                value={selectedFilters.result}
                onChange={v => updateFilter('result', v)}
              />
            </div>
            <div className="filters-actions">
              <button
                className="btn btn-primary"
                onClick={handleSearch}
                disabled={loadingStats}
              >
                {loadingStats ? '⏳ Đang tìm...' : '🔍 Xem thống kê / Tìm kiếm'}
              </button>
            </div>
          </>
        ) : null}
      </section>

      {/* Results Section */}
      {loadingStats && (
        <section className="section">
          <div className="loading-state">
            <div className="spinner" />
            <span>Đang tổng hợp dữ liệu thống kê...</span>
          </div>
        </section>
      )}

      {statistics && (
        <section className="section results-section">
          <h2>📊 Kết quả thống kê</h2>

          <SummaryCards summary={statistics.summary} />

          <StatisticsTable data={statistics.data} />

          <div className="export-area">
            <button
              className="btn btn-export"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? '⏳ Đang xuất...' : '📥 Xuất báo cáo'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
