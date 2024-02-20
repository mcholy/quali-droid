namespace Qualifacts.Entities.Models
{
    public class Calculation
    {
        public Guid Id { get; set; }
        public int InputOne { get; set; }
        public int InputTwo { get; set; }
        public int SampleSize { get; set; }
        public Guid IdUserEntry { get; set; }
        public DateTime DateEntry { get; set; }
    }
}
