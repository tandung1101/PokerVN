using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace PokerVN.PokerClubs
{
    public class PokerClubManager : DomainService
    {
        private readonly IPokerClubRepository _pokerClubRepository;

        public PokerClubManager(IPokerClubRepository pokerClubRepository)
        {
            _pokerClubRepository = pokerClubRepository;
        }

        public async Task<PokerClub> CreateAsync(
        string clubCode, string clubName, string aliasName, string releaseDate, string clubAddress, string clubAddress1, string clubAddress2, string clubAddress3, string phoneNumber, string email, string refFb, string description, string statusCode)
        {

            var pokerClub = new PokerClub(
             GuidGenerator.Create(),
             clubCode, clubName, aliasName, releaseDate, clubAddress, clubAddress1, clubAddress2, clubAddress3, phoneNumber, email, refFb, description, statusCode
             );

            return await _pokerClubRepository.InsertAsync(pokerClub);
        }

        public async Task<PokerClub> UpdateAsync(
            Guid id,
            string clubCode, string clubName, string aliasName, string releaseDate, string clubAddress, string clubAddress1, string clubAddress2, string clubAddress3, string phoneNumber, string email, string refFb, string description, string statusCode, [CanBeNull] string concurrencyStamp = null
        )
        {

            var pokerClub = await _pokerClubRepository.GetAsync(id);

            pokerClub.ClubCode = clubCode;
            pokerClub.ClubName = clubName;
            pokerClub.AliasName = aliasName;
            pokerClub.ReleaseDate = releaseDate;
            pokerClub.ClubAddress = clubAddress;
            pokerClub.ClubAddress1 = clubAddress1;
            pokerClub.ClubAddress2 = clubAddress2;
            pokerClub.ClubAddress3 = clubAddress3;
            pokerClub.PhoneNumber = phoneNumber;
            pokerClub.Email = email;
            pokerClub.RefFb = refFb;
            pokerClub.Description = description;
            pokerClub.StatusCode = statusCode;

            pokerClub.SetConcurrencyStampIfNotNull(concurrencyStamp);
            return await _pokerClubRepository.UpdateAsync(pokerClub);
        }

    }
}