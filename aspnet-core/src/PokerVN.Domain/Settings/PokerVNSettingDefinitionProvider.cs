using Volo.Abp.Settings;

namespace PokerVN.Settings;

public class PokerVNSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(PokerVNSettings.MySetting1));
    }
}
