using Qualifacts.Shared.DataTransferObjects;
using Qualifacts.Shared.RequestFeatures;

namespace Qualifacts.Service.Contracts
{
    public interface ICalculationService
    {
        Task<(IEnumerable<CalculationDto> calculations, MetaData metaData)> GetAllCalculationsAsync(CalculationParameters calculationParameters, bool trackChanges);
        Task<CalculationDto> GetCalculationAsync(Guid id, bool trackChanges);
        Task<CalculationDto> CreateCalculationAsync(CalculationForCreationDto calculations);
        Task<(IEnumerable<ResultDto> results, MetaData metaData)> GetAllResults(CalculationForCreationDto calculation, CalculationParameters calculationParameters);
    }
}
