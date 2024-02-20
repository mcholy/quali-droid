using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Qualifacts.Entities.Models;
using Qualifacts.Repository.Contracts;
using Qualifacts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifacts.Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<ICalculationService> _calculationService;
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repositoryManager,
            IMapper mapper,
            ILoggerManager logger,
            UserManager<User> userManager,
            IConfiguration configuration)
        {
            _calculationService = new Lazy<ICalculationService>(() => new CalculationService(repositoryManager, mapper));
            _authenticationService = new Lazy<IAuthenticationService>(() => new AuthenticationService(logger, mapper, userManager, configuration));
        }

        public ICalculationService CalculationService => _calculationService.Value;
        public IAuthenticationService AuthenticationService => _authenticationService.Value;

    }
}
