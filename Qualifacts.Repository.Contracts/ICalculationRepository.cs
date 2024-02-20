using Qualifacts.Entities.Models;
using Qualifacts.Shared.RequestFeatures;

namespace Qualifacts.Repository.Contracts
{
    public interface ICalculationRepository
    {
        Task<PagedList<Calculation>> GetAllCalculationsAsync(CalculationParameters calculationParameters, bool trackChanges);
        Task<Calculation> GetCalculationAsync(Guid calculationId, bool trackChanges);
        void CreateCalculation(Calculation calculation);
        Task<IEnumerable<Calculation>> GetByIdsAsync(IEnumerable<Guid> ids, bool trackChanges);
        void DeleteCalculation(Calculation calculation);
    }
}
