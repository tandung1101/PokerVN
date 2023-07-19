using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Auditing;
using Volo.Abp.Identity;
using Volo.Abp.Validation;

namespace Volo.Abp.Account.Public.Web.Pages.Account;

public class ChangePasswordModel : AccountPageModel
{
    public static string ChangePasswordScheme = "Abp.ChangePassword";

    [BindProperty]
    public UserInfoModel UserInfo { get; set; }

    [BindProperty(SupportsGet = true)]
    public string ReturnUrl { get; set; }

    [BindProperty(SupportsGet = true)]
    public string ReturnUrlHash { get; set; }

    [BindProperty(SupportsGet = true)]
    public bool RememberMe { get; set; }

    public bool HideOldPasswordInput { get; set; }

    [Required]
    [BindProperty]
    [DynamicStringLength(typeof(IdentityUserConsts), nameof(IdentityUserConsts.MaxPasswordLength))]
    [DataType(DataType.Password)]
    [DisableAuditing]
    public string CurrentPassword { get; set; }

    [Required]
    [BindProperty]
    [DynamicStringLength(typeof(IdentityUserConsts), nameof(IdentityUserConsts.MaxPasswordLength))]
    [DataType(DataType.Password)]
    [DisableAuditing]
    public string NewPassword { get; set; }

    [Required]
    [BindProperty]
    [DynamicStringLength(typeof(IdentityUserConsts), nameof(IdentityUserConsts.MaxPasswordLength))]
    [DataType(DataType.Password)]
    [DisableAuditing]
    [Compare("NewPassword")]
    public string NewPasswordConfirm { get; set; }

    public virtual async Task<IActionResult> OnGetAsync()
    {
        UserInfo = await RetrieveChangePasswordUser();

        if (UserInfo == null || UserInfo.TenantId != CurrentTenant.Id)
        {
            await HttpContext.SignOutAsync(ChangePasswordModel.ChangePasswordScheme);
            return RedirectToPage("./Login", new
            {
                ReturnUrl = ReturnUrl,
                ReturnUrlHash = ReturnUrlHash
            });
        }

        var user = await UserManager.GetByIdAsync(UserInfo.Id);
        HideOldPasswordInput = user.PasswordHash == null;

        return Page();
    }

    public virtual async Task<IActionResult> OnPostAsync()
    {
        var userInfo = await RetrieveChangePasswordUser();
        if (userInfo == null || userInfo.TenantId != CurrentTenant.Id)
        {
            await HttpContext.SignOutAsync(ChangePasswordModel.ChangePasswordScheme);
            return RedirectToPage("./Login", new
            {
                ReturnUrl = ReturnUrl,
                ReturnUrlHash = ReturnUrlHash
            });
        }

        try
        {
            var user = await UserManager.GetByIdAsync(userInfo.Id);
            if (user.PasswordHash == null)
            {
                (await UserManager.AddPasswordAsync(user, NewPassword)).CheckErrors();
            }
            else
            {
                (await UserManager.ChangePasswordAsync(user, CurrentPassword, NewPassword)).CheckErrors();;
            }

            await IdentitySecurityLogManager.SaveAsync(new IdentitySecurityLogContext
            {
                Identity = IdentitySecurityLogIdentityConsts.Identity,
                Action = IdentitySecurityLogActionConsts.ChangePassword
            });

            user.SetShouldChangePasswordOnNextLogin(false);
            (await UserManager.UpdateAsync(user)).CheckErrors();

            await HttpContext.SignOutAsync(ChangePasswordScheme);
            await SignInManager.SignInAsync(user, RememberMe);

            await IdentitySecurityLogManager.SaveAsync(new IdentitySecurityLogContext
            {
                Identity = IdentitySecurityLogIdentityConsts.IdentityExternal,
                Action = IdentitySecurityLogActionConsts.LoginSucceeded,
                UserName = user.UserName
            });

            return RedirectSafely(ReturnUrl, ReturnUrlHash);
        }
        catch (Exception e)
        {
            Alerts.Warning(GetLocalizeExceptionMessage(e));
            return Page();
        }
    }

    protected virtual async Task<UserInfoModel> RetrieveChangePasswordUser()
    {
        var result = await HttpContext.AuthenticateAsync(ChangePasswordModel.ChangePasswordScheme);
        if (result?.Principal != null)
        {
            var userId = result.Principal.FindUserId();
            if (userId == null)
            {
                return null;
            }

            var tenantId = result.Principal.FindTenantId();

            using (CurrentTenant.Change(tenantId))
            {
                var user = await UserManager.FindByIdAsync(userId.Value.ToString());
                if (user == null)
                {
                    return null;
                }

                return new UserInfoModel
                {
                    Id = user.Id,
                    TenantId = user.TenantId,
                };
            }
        }

        return null;
    }

    public class UserInfoModel
    {
        public Guid Id { get; set; }

        public Guid? TenantId { get; set; }
    }
}
