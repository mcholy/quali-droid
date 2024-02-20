namespace Qualifacts.Repository.Contracts
{
    public interface IRepositoryManager
    {
        ICalculationRepository Calculation { get; }
        Task SaveAsync();
    }
}
