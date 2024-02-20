using Moq;
using Qualifacts.Service.Contracts;
using Qualifacts.Shared.DataTransferObjects;
using Qualifacts.Shared.RequestFeatures;
using Xunit;

namespace Qualifacts.Services.Tests
{
    public class CalculationServiceTests
    {
        [Fact]
        public async Task GetAllResults_ReturnsCorrectResults()
        {
            // Arrange
            var calculation = new CalculationForCreationDto
            {
                InputOne = 2,
                InputTwo = 3,
                SampleSize = 10
            };
            var calculationParameters = new CalculationParameters
            {
                PageNumber = 1,
                PageSize = 10
            };

            var expectedResult = new List<ResultDto>
            {
                new ResultDto(1, "N/A"),
                new ResultDto(2, "Yes"),
                new ResultDto(3, "No"),
                new ResultDto(4, "Yes"),
                new ResultDto(5, "N/A"),
                new ResultDto(6, "No"),
                new ResultDto(7, "N/A"),
                new ResultDto(8, "Yes"),
                new ResultDto(9, "No"),
                new ResultDto(10, "Yes")
            };

            var mockService = new Mock<ICalculationService>();
            mockService.Setup(s => s.GetAllResults(calculation, calculationParameters))
                       .ReturnsAsync((expectedResult, new MetaData()));

            var service = mockService.Object;

            // Act
            var (results, _) = await service.GetAllResults(calculation, calculationParameters);
            var resultList = results.ToList();
            // Assert
            Assert.Equal(expectedResult.Count, results.Count());
            for (int i = 0; i < expectedResult.Count; i++)
            {
                Assert.Equal(expectedResult[i].Number, resultList[i].Number);
                Assert.Equal(expectedResult[i].Label, resultList[i].Label);
            }
        }
    }
}
