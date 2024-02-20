namespace Qualifacts.Service.Contracts
{
    public interface IServiceManager
    {
        ICalculationService CalculationService { get; }
        IAuthenticationService AuthenticationService { get; }

    }
}
