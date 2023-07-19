namespace PokerVN.EventShedules
{
    public static class EventSheduleConsts
    {
        private const string DefaultSorting = "{0}EventCode asc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "EventShedule." : string.Empty);
        }

    }
}