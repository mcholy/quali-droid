using Microsoft.EntityFrameworkCore;
using Qualifacts.Entities.Models;
using Qualifacts.Repository.Contracts;
using Qualifacts.Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifacts.Repository
{
    internal sealed class CalculationRepository : RepositoryBase<Calculation>, ICalculationRepository
    {
        public CalculationRepository(RepositoryContext repositoryContext) : base(repositoryContext) { }

        public void CreateCalculation(Calculation calculation) => Create(calculation);

        public void DeleteCalculation(Calculation calculation) => Delete(calculation);

        public async Task<PagedList<Calculation>> GetAllCalculationsAsync(CalculationParameters calculationParameters, bool trackChanges)
        {
            var calculations = await FindAll(trackChanges)
                .OrderBy(c => c.Id)
                .Skip((calculationParameters.PageNumber - 1) * calculationParameters.PageSize)
                .Take(calculationParameters.PageSize)
                .ToListAsync();
            var count = await FindAll(trackChanges).CountAsync();
            return PagedList<Calculation>.ToPagedList(calculations, count, calculationParameters.PageNumber, calculationParameters.PageSize);
        }

        public async Task<IEnumerable<Calculation>> GetByIdsAsync(IEnumerable<Guid> ids, bool trackChanges) =>
            await FindByCondition(x => ids.Contains(x.Id), trackChanges).ToListAsync();

        public async Task<Calculation> GetCalculationAsync(Guid calculationId, bool trackChanges)
        {
            var calculation = await FindByCondition(c => c.Id.Equals(calculationId), trackChanges).SingleOrDefaultAsync();
            return calculation!;
        }
    }
}
