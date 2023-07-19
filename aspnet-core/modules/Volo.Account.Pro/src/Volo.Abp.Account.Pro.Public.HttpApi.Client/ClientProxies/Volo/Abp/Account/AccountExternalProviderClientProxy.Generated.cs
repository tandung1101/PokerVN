// This file is automatically generated by ABP framework to use MVC Controllers from CSharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Account.ExternalProviders;
using Volo.Abp.Application.Dtos;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Http.Client;
using Volo.Abp.Http.Client.ClientProxying;
using Volo.Abp.Http.Modeling;

// ReSharper disable once CheckNamespace
namespace Volo.Abp.Account;

[Dependency(ReplaceServices = true)]
[ExposeServices(typeof(IAccountExternalProviderAppService), typeof(AccountExternalProviderClientProxy))]
public partial class AccountExternalProviderClientProxy : ClientProxyBase<IAccountExternalProviderAppService>, IAccountExternalProviderAppService
{
    public virtual async Task<ExternalProviderDto> GetAllAsync()
    {
        return await RequestAsync<ExternalProviderDto>(nameof(GetAllAsync));
    }

    public virtual async Task<ExternalProviderItemWithSecretDto> GetByNameAsync(GetByNameInput input)
    {
        return await RequestAsync<ExternalProviderItemWithSecretDto>(nameof(GetByNameAsync), new ClientProxyRequestTypeValue
        {
            { typeof(GetByNameInput), input }
        });
    }
}