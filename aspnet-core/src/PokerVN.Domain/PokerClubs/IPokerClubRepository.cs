using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace PokerVN.PokerClubs
{
    public interface IPokerClubRepository : IRepository<PokerClub, Guid>
    {
        Task<List<PokerClub>> GetListAsync(
            string filterText = null,
            string clubCode = null,
            string clubName = null,
            string aliasName = null,
            string releaseDate = null,
            string clubAddress = null,
            string clubAddress1 = null,
            string clubAddress2 = null,
            string clubAddress3 = null,
            string phoneNumber = null,
            string email = null,
            string refFb = null,
            string description = null,
            string statusCode = null,
            string sorting = null,
            int maxResultCount = int.MaxValue,
            int skipCount = 0,
            CancellationToken cancellationToken = default
        );

        Task<long> GetCountAsync(
            string filterText = null,
            string clubCode = null,
            string clubName = null,
            string aliasName = null,
            string releaseDate = null,
            string clubAddress = null,
            string clubAddress1 = null,
            string clubAddress2 = null,
            string clubAddress3 = null,
            string phoneNumber = null,
            string email = null,
            string refFb = null,
            string description = null,
            string statusCode = null,
            CancellationToken cancellationToken = default);
    }
}