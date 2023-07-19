﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EventBus.Distributed;
using Volo.Abp.Users;

namespace Volo.Abp.Identity;
public class UserPasswordChangeRequestedEventHandler :
    IDistributedEventHandler<UserPasswordChangeRequestedEto>,
    ITransientDependency
{
    public ILogger<UserPasswordChangeRequestedEventHandler> Logger { get; set; }

    protected IIdentityUserRepository UserRepository { get; }
    protected IdentityUserManager IdentityUserManager { get; }

    public UserPasswordChangeRequestedEventHandler(
        IIdentityUserRepository userRepository,
        IdentityUserManager identityUserManager)
    {
        Logger = NullLogger<UserPasswordChangeRequestedEventHandler>.Instance;
        UserRepository = userRepository;
        IdentityUserManager = identityUserManager;
    }

    public async Task HandleEventAsync(UserPasswordChangeRequestedEto eventData)
    {
        if (!eventData.Password.IsNullOrEmpty())
        {
            var user = await UserRepository.FindByTenantIdAndUserNameAsync(eventData.UserName, eventData.TenantId);
            if (user != null)
            {
                var errors = await ValidatePasswordAsync(user, eventData.Password);
                if (errors.Any())
                {
                    Logger.LogError("User password change failed: {userName}, reason: {reason}", eventData.UserName, string.Join(";", errors.Select(e => e.Code)));
                }
                else
                {
                    (await IdentityUserManager.RemovePasswordAsync(user)).CheckErrors();
                    (await IdentityUserManager.AddPasswordAsync(user, eventData.Password)).CheckErrors();
                    Logger.LogInformation("User password changed: {userName}", eventData.UserName);
                }
            }
        }
    }

    private async Task<List<IdentityError>> ValidatePasswordAsync(IdentityUser user, string password)
    {
        var errors = new List<IdentityError>();
        foreach (var v in IdentityUserManager.PasswordValidators)
        {
            var result = await v.ValidateAsync(IdentityUserManager, user, password);
            if (!result.Succeeded)
            {
                if (result.Errors.Any())
                {
                    errors.AddRange(result.Errors);
                }
            }
        }

        return errors;
    }
}
