using Qualifacts.Repository.Contracts;

namespace Qualifacts.Repository
{
    public sealed class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _repositoryContext;
        private readonly Lazy<ICalculationRepository> _calculationRepository;
        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
            _calculationRepository = new Lazy<ICalculationRepository>(() => new CalculationRepository(repositoryContext));
        }
        public ICalculationRepository Calculation => _calculationRepository.Value;

        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}
