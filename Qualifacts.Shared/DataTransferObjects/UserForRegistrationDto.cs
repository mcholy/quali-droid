﻿using System.ComponentModel.DataAnnotations;

namespace Qualifacts.Shared.DataTransferObjects
{
    public record UserForRegistrationDto
    {
        [Required(ErrorMessage = "Username is required")]
        public string? UserName { get; init; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; init; }
        public string? Email { get; init; }
        public ICollection<string>? Roles { get; init; }
    }
}
