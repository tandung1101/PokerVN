using Volo.Abp.Application.Dtos;
using System;

namespace PokerVN.PokerClubs
{
    public class PokerClubExcelDownloadDto
    {
        public string DownloadToken { get; set; }

        public string? FilterText { get; set; }

        public string? ClubCode { get; set; }
        public string? ClubName { get; set; }
        public string? AliasName { get; set; }
        public string? ReleaseDate { get; set; }
        public string? ClubAddress { get; set; }
        public string? ClubAddress1 { get; set; }
        public string? ClubAddress2 { get; set; }
        public string? ClubAddress3 { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? RefFb { get; set; }
        public string? Description { get; set; }
        public string? StatusCode { get; set; }

        public PokerClubExcelDownloadDto()
        {

        }
    }
}