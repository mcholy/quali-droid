using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Qualifacts.Shared.DataTransferObjects;

namespace Qualifacts.Presentation.ActionFilters
{
    public class ValidateNumericInputsAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!(context.ActionArguments["calculation"] is CalculationForCreationDto calculation))
            {
                context.Result = new BadRequestObjectResult("calculation is required.");
                return;
            }
            if (!IsNumeric(calculation.InputOne) || !IsNumeric(calculation.InputTwo) || !IsNumeric(calculation.SampleSize))
            {
                context.Result = new BadRequestObjectResult("inputOne, inputTwo, and sampleSize must be numeric.");
                return;
            }

            base.OnActionExecuting(context);
        }

        private bool IsNumeric(object value)
        {
            return value != null && int.TryParse(value.ToString(), out _);
        }
    }
}
