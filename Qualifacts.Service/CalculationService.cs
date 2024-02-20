using AutoMapper;
using Microsoft.VisualBasic;
using Qualifacts.Entities.Models;
using Qualifacts.Repository.Contracts;
using Qualifacts.Service.Contracts;
using Qualifacts.Shared.DataTransferObjects;
using Qualifacts.Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifacts.Service
{
    internal sealed class CalculationService : ICalculationService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public CalculationService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CalculationDto> CreateCalculationAsync(CalculationForCreationDto calculation)
        {
            var calculationEntity = _mapper.Map<Calculation>(calculation);
            SetDefaultValuesToCalculation(ref calculationEntity);
            _repository.Calculation.CreateCalculation(calculationEntity);
            await _repository.SaveAsync();
            var calculationToReturn = _mapper.Map<CalculationDto>(calculationEntity);
            return calculationToReturn;
        }

        public async Task<(IEnumerable<CalculationDto> calculations, MetaData metaData)> GetAllCalculationsAsync(CalculationParameters calculationParameters, bool trackChanges)
        {
            var calculationsWithMetaData = await _repository.Calculation.GetAllCalculationsAsync(calculationParameters, trackChanges);
            var calculationsDto = _mapper.Map<IEnumerable<CalculationDto>>(calculationsWithMetaData);
            return (calculations: calculationsDto, metaData: calculationsWithMetaData.MetaData);
        }


        public async Task<CalculationDto> GetCalculationAsync(Guid id, bool trackChanges)
        {
            var calculation = await GetCalculationAndCheckIfItExists(id, trackChanges);
            var calculationDto = _mapper.Map<CalculationDto>(calculation);
            return calculationDto;
        }

        private async Task<Calculation> GetCalculationAndCheckIfItExists(Guid id, bool trackChanges) =>
        await _repository.Calculation.GetCalculationAsync(id, trackChanges) ?? throw new Exception("Calculation no existe.");

        private static void SetDefaultValuesToCalculation(ref Calculation calculation)
        {
            if (calculation == null) return;
            calculation.DateEntry = DateTime.UtcNow;

        }

        public async Task<(IEnumerable<ResultDto> results, MetaData metaData)> GetAllResults(CalculationForCreationDto calculation, CalculationParameters calculationParameters)
        {
            int startIndex = ((calculationParameters.PageNumber-1) * calculationParameters.PageSize);
            int endIndex = Math.Min(startIndex + calculationParameters.PageSize, calculation.SampleSize + 1);
            List<ResultDto> results = new();
            for (int i = startIndex; i < endIndex; i++)
            {
                string label = GetLabel(calculation.InputOne, calculation.InputTwo, i+1);
                results.Add(new ResultDto(i+1, label));
            }
            var calculationsWithMetaData = PagedList<ResultDto>.ToPagedList(results, calculation.SampleSize, calculationParameters.PageNumber, calculationParameters.PageSize);

            return await Task.FromResult((results, metaData: calculationsWithMetaData.MetaData));
        }

        private static string GetLabel(int inputOne, int inputTwo, int number)
        {
            if (number % inputOne == 0 && number % inputTwo == 0)
            {
                return "I don't know...";
            }
            else if (number % inputOne == 0)
            {
                return "Yes";
            }
            else if (number % inputTwo == 0)
            {
                return "No";
            }
            else
            {
                return "N/A";
            }
        }
    }
}
