﻿using System.Threading.Tasks;
using Localization.Resources.AbpUi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Volo.Abp.Account.AuthorityDelegation;
using Volo.Abp.Account.Localization;
using Volo.Abp.UI.Navigation;
using Volo.Abp.Users;

namespace Volo.Abp.Account.Public.Web;

public class AbpAccountUserMenuContributor : IMenuContributor
{
    public virtual Task ConfigureMenuAsync(MenuConfigurationContext context)
    {
        if (context.Menu.Name != StandardMenus.User)
        {
            return Task.CompletedTask;
        }

        var uiResource = context.GetLocalizer<AbpUiResource>();
        var accountResource = context.GetLocalizer<AccountResource>();
        var currentUser = context.ServiceProvider.GetRequiredService<ICurrentUser>();
        var options = context.ServiceProvider.GetRequiredService<IOptions<AbpAccountAuthorityDelegationOptions>>();
        
        context.Menu.AddItem(new ApplicationMenuItem("Account.LinkedAccounts", accountResource["LinkedAccounts"], url: "javascript:void(0)", icon: "fa fa-link"));
        if (currentUser.FindImpersonatorUserId() == null && options.Value.EnableDelegatedImpersonation)
        {
            context.Menu.AddItem(new ApplicationMenuItem("Account.AuthorityDelegation", accountResource["AuthorityDelegation"], url: "javascript:void(0)", icon: "fa fa-users"));
        }
        context.Menu.AddItem(new ApplicationMenuItem("Account.Manage", accountResource["MyAccount"], url: "~/Account/Manage", icon: "fa fa-cog"));
        context.Menu.AddItem(new ApplicationMenuItem("Account.SecurityLogs", accountResource["MySecurityLogs"], url: "~/Account/SecurityLogs", icon: "fa fa-cog"));
        context.Menu.AddItem(new ApplicationMenuItem("Account.Logout", uiResource["Logout"], url: "~/Account/Logout", icon: "fa fa-power-off", order: int.MaxValue - 1000));

        return Task.CompletedTask;
    }
}
