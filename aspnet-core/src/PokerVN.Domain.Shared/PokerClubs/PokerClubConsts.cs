namespace PokerVN.PokerClubs
{
    public static class PokerClubConsts
    {
        private const string DefaultSorting = "{0}ClubCode asc";

        public static string GetDefaultSorting(bool withEntityName)
        {
            return string.Format(DefaultSorting, withEntityName ? "PokerClub." : string.Empty);
        }

    }
}