using PokerVN.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace PokerVN.Permissions;

public class PokerVNPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(PokerVNPermissions.GroupName);

        myGroup.AddPermission(PokerVNPermissions.Dashboard.Host, L("Permission:Dashboard"), MultiTenancySides.Host);
        myGroup.AddPermission(PokerVNPermissions.Dashboard.Tenant, L("Permission:Dashboard"), MultiTenancySides.Tenant);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(PokerVNPermissions.MyPermission1, L("Permission:MyPermission1"));

        var pokerClubPermission = myGroup.AddPermission(PokerVNPermissions.PokerClubs.Default, L("Permission:PokerClubs"));
        pokerClubPermission.AddChild(PokerVNPermissions.PokerClubs.Create, L("Permission:Create"));
        pokerClubPermission.AddChild(PokerVNPermissions.PokerClubs.Edit, L("Permission:Edit"));
        pokerClubPermission.AddChild(PokerVNPermissions.PokerClubs.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<PokerVNResource>(name);
    }
}