using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using PokerVN.EntityFrameworkCore;

namespace PokerVN.PokerClubs
{
    public class EfCorePokerClubRepository : EfCoreRepository<PokerVNDbContext, PokerClub, Guid>, IPokerClubRepository
    {
        public EfCorePokerClubRepository(IDbContextProvider<PokerVNDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        public async Task<List<PokerClub>> GetListAsync(
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
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetQueryableAsync()), filterText, clubCode, clubName, aliasName, releaseDate, clubAddress, clubAddress1, clubAddress2, clubAddress3, phoneNumber, email, refFb, description, statusCode);
            query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? PokerClubConsts.GetDefaultSorting(false) : sorting);
            return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
        }

        public async Task<long> GetCountAsync(
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
            CancellationToken cancellationToken = default)
        {
            var query = ApplyFilter((await GetDbSetAsync()), filterText, clubCode, clubName, aliasName, releaseDate, clubAddress, clubAddress1, clubAddress2, clubAddress3, phoneNumber, email, refFb, description, statusCode);
            return await query.LongCountAsync(GetCancellationToken(cancellationToken));
        }

        protected virtual IQueryable<PokerClub> ApplyFilter(
            IQueryable<PokerClub> query,
            string filterText,
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
            string statusCode = null)
        {
            return query
                    .WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.ClubCode.Contains(filterText) || e.ClubName.Contains(filterText) || e.AliasName.Contains(filterText) || e.ReleaseDate.Contains(filterText) || e.ClubAddress.Contains(filterText) || e.ClubAddress1.Contains(filterText) || e.ClubAddress2.Contains(filterText) || e.ClubAddress3.Contains(filterText) || e.PhoneNumber.Contains(filterText) || e.Email.Contains(filterText) || e.RefFb.Contains(filterText) || e.Description.Contains(filterText) || e.StatusCode.Contains(filterText))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubCode), e => e.ClubCode.Contains(clubCode))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubName), e => e.ClubName.Contains(clubName))
                    .WhereIf(!string.IsNullOrWhiteSpace(aliasName), e => e.AliasName.Contains(aliasName))
                    .WhereIf(!string.IsNullOrWhiteSpace(releaseDate), e => e.ReleaseDate.Contains(releaseDate))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubAddress), e => e.ClubAddress.Contains(clubAddress))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubAddress1), e => e.ClubAddress1.Contains(clubAddress1))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubAddress2), e => e.ClubAddress2.Contains(clubAddress2))
                    .WhereIf(!string.IsNullOrWhiteSpace(clubAddress3), e => e.ClubAddress3.Contains(clubAddress3))
                    .WhereIf(!string.IsNullOrWhiteSpace(phoneNumber), e => e.PhoneNumber.Contains(phoneNumber))
                    .WhereIf(!string.IsNullOrWhiteSpace(email), e => e.Email.Contains(email))
                    .WhereIf(!string.IsNullOrWhiteSpace(refFb), e => e.RefFb.Contains(refFb))
                    .WhereIf(!string.IsNullOrWhiteSpace(description), e => e.Description.Contains(description))
                    .WhereIf(!string.IsNullOrWhiteSpace(statusCode), e => e.StatusCode.Contains(statusCode));
        }
    }
}