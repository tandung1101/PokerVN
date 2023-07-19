using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Volo.Abp.Account.AuthorityDelegation;
using Volo.Abp.AspNetCore.Mvc.UI.Bundling;

namespace Volo.Abp.Account.Pro.Public.Blazor.Server;

public class AbpAccountBlazorBundleContributor: BundleContributor
{
    public override void ConfigureBundle(BundleConfigurationContext context)
    {
        context.Files.AddIfNotContains("/_content/Volo.Abp.Account.Pro.Public.Blazor.Shared/libs/account/link-user.js");
        if (context.ServiceProvider.GetRequiredService<IOptions<AbpAccountAuthorityDelegationOptions>>().Value
            .EnableDelegatedImpersonation)
        {
            context.Files.AddIfNotContains("/_content/Volo.Abp.Account.Pro.Public.Blazor.Shared/libs/account/authority-delegation.js");
        }
    }
}
