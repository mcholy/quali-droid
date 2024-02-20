using System.ComponentModel.DataAnnotations;

namespace Qualifacts.Shared.DataTransferObjects
{
    public abstract record CalculationForManipulationDto
    {
        [Required(ErrorMessage = "InputOne field is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "InputOne value must be greater than zero.")]
        public int InputOne { get; set; }

        [Required(ErrorMessage = "Input2 field is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "InputTwo value must be greater than zero.")]
        public int InputTwo { get; set; }

        [Required(ErrorMessage = "SampleSize field is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "SampleSize value must be greater than zero.")]
        public int SampleSize { get; set; }

        public bool IsValid()
        {
            return InputOne > 0 && InputTwo > 0 && SampleSize > 0;
        }
    }
}
