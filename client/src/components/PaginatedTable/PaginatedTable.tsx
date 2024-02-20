import { useLocation, useNavigate } from 'react-router-dom';
import { compute } from '../../middleware/api';
import { computeResult } from '../../models/model';
import { resultStore } from '../../stores/resultStore';
import './PaginatedTable.css';

const PaginatedTable = () => {
  const location = useLocation();
  const {
    setCalculations,
    setPagination,
    calculations,
    pagination,
    inputOne,
    inputTwo,
    sampleSize,
  } = resultStore();

  const navigate = useNavigate();

  const handleClick = async (pageNumber: number, pageSize: number) => {
    try {
      const values = { inputOne, inputTwo, sampleSize };
      const response = await compute(values, { pageNumber, pageSize });
      setCalculations((response as computeResult).calculations);
      setPagination((response as computeResult).pagination);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    const { from } = location.state || { from: { pathname: '/' } };
    navigate(from, { replace: true });
  };

  return (
    <div className="paginated-table">
      <table className="paginated-table__table">
        <thead>
          <tr>
            <th className="paginated-table__header">Number</th>
            <th className="paginated-table__header">Label</th>
          </tr>
        </thead>
        <tbody>
          {calculations!.map((calculation, index) => (
            <tr key={index}>
              <td className="paginated-table__data">{calculation.number}</td>
              <td className="paginated-table__data">{calculation.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginated-table__pagination">
        <button
          className="paginated-table__pagination-btn"
          disabled={!pagination!.HasPrevious}
          onClick={async () =>
            handleClick(pagination!.CurrentPage - 1, pagination!.PageSize)
          }
        >
          Previous
        </button>
        <span className="paginated-table__pagination-info">
          {pagination!.CurrentPage} of {pagination!.TotalPages}
        </span>
        <button
          className="paginated-table__pagination-btn"
          disabled={!pagination!.HasNext}
          onClick={async () =>
            handleClick(pagination!.CurrentPage + 1, pagination!.PageSize)
          }
        >
          Next
        </button>
      </div>
      <button className="paginated-table__back-button" onClick={handleGoBack}>Back</button>
    </div>
  );
};

export default PaginatedTable;
