using System;
using PokerVN.Shared;
using Volo.Abp.AutoMapper;
using PokerVN.PokerClubs;
using AutoMapper;

namespace PokerVN;

public class PokerVNApplicationAutoMapperProfile : Profile
{
    public PokerVNApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<PokerClub, PokerClubDto>();
        CreateMap<PokerClub, PokerClubExcelDto>();
    }
}