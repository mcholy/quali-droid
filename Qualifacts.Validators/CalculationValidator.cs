using FluentValidation;
using Qualifacts.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifacts.Validators
{
    public class CalculationValidator : AbstractValidator<Calculation>
    {
        public CalculationValidator()
        {
            RuleFor(calculation => calculation.InputOne).NotEmpty().WithMessage("InputOne is mandatory.");
            RuleFor(calculation => calculation.InputTwo).NotEmpty().WithMessage("InputTwo is mandatory.");
            RuleFor(calculation => calculation.SampleSize).NotEmpty().WithMessage("SampleSize is mandatory.");
        }
    }
}
