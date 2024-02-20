using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Qualifacts.Presentation.ActionFilters;
using Qualifacts.Service.Contracts;
using Qualifacts.Shared.DataTransferObjects;
using Qualifacts.Shared.RequestFeatures;
using System.Text.Json;

namespace Qualifacts.Presentation.Controllers
{
    [Route("api/divisibilityChecker")]
    [Authorize]
    [ApiController]
    public class DivisibilityCheckerController : ControllerBase
    {
        private readonly IServiceManager _service;

        public DivisibilityCheckerController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        [ValidateNumericInputs]
        public IActionResult GetResults([FromQuery] CalculationForCreationDto calculation,
            [FromQuery] CalculationParameters calculationParameters)
        {
            var result = _service.CalculationService.GetAllResults(calculation, calculationParameters);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(result.Result.metaData));
            return Ok(result.Result.results);
        }
    }
}
