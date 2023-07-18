using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using PokerVN.Permissions;
using PokerVN.PokerClubs;
using MiniExcelLibs;
using Volo.Abp.Content;
using Volo.Abp.Authorization;
using Volo.Abp.Caching;
using Microsoft.Extensions.Caching.Distributed;
using PokerVN.Shared;

namespace PokerVN.PokerClubs
{
    [RemoteService(IsEnabled = false)]
    [Authorize(PokerVNPermissions.PokerClubs.Default)]
    public class PokerClubsAppService : ApplicationService, IPokerClubsAppService
    {
        private readonly IDistributedCache<PokerClubExcelDownloadTokenCacheItem, string> _excelDownloadTokenCache;
        private readonly IPokerClubRepository _pokerClubRepository;
        private readonly PokerClubManager _pokerClubManager;

        public PokerClubsAppService(IPokerClubRepository pokerClubRepository, PokerClubManager pokerClubManager, IDistributedCache<PokerClubExcelDownloadTokenCacheItem, string> excelDownloadTokenCache)
        {
            _excelDownloadTokenCache = excelDownloadTokenCache;
            _pokerClubRepository = pokerClubRepository;
            _pokerClubManager = pokerClubManager;
        }

        public virtual async Task<PagedResultDto<PokerClubDto>> GetListAsync(GetPokerClubsInput input)
        {
            var totalCount = await _pokerClubRepository.GetCountAsync(input.FilterText, input.ClubCode, input.ClubName, input.AliasName, input.ReleaseDate, input.ClubAddress, input.ClubAddress1, input.ClubAddress2, input.ClubAddress3, input.PhoneNumber, input.Email, input.RefFb, input.Description, input.StatusCode);
            var items = await _pokerClubRepository.GetListAsync(input.FilterText, input.ClubCode, input.ClubName, input.AliasName, input.ReleaseDate, input.ClubAddress, input.ClubAddress1, input.ClubAddress2, input.ClubAddress3, input.PhoneNumber, input.Email, input.RefFb, input.Description, input.StatusCode, input.Sorting, input.MaxResultCount, input.SkipCount);

            return new PagedResultDto<PokerClubDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<PokerClub>, List<PokerClubDto>>(items)
            };
        }

        public virtual async Task<PokerClubDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<PokerClub, PokerClubDto>(await _pokerClubRepository.GetAsync(id));
        }

        [Authorize(PokerVNPermissions.PokerClubs.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _pokerClubRepository.DeleteAsync(id);
        }

        [Authorize(PokerVNPermissions.PokerClubs.Create)]
        public virtual async Task<PokerClubDto> CreateAsync(PokerClubCreateDto input)
        {

            var pokerClub = await _pokerClubManager.CreateAsync(
            input.ClubCode, input.ClubName, input.AliasName, input.ReleaseDate, input.ClubAddress, input.ClubAddress1, input.ClubAddress2, input.ClubAddress3, input.PhoneNumber, input.Email, input.RefFb, input.Description, input.StatusCode
            );

            return ObjectMapper.Map<PokerClub, PokerClubDto>(pokerClub);
        }

        [Authorize(PokerVNPermissions.PokerClubs.Edit)]
        public virtual async Task<PokerClubDto> UpdateAsync(Guid id, PokerClubUpdateDto input)
        {

            var pokerClub = await _pokerClubManager.UpdateAsync(
            id,
            input.ClubCode, input.ClubName, input.AliasName, input.ReleaseDate, input.ClubAddress, input.ClubAddress1, input.ClubAddress2, input.ClubAddress3, input.PhoneNumber, input.Email, input.RefFb, input.Description, input.StatusCode, input.ConcurrencyStamp
            );

            return ObjectMapper.Map<PokerClub, PokerClubDto>(pokerClub);
        }

        [AllowAnonymous]
        public virtual async Task<IRemoteStreamContent> GetListAsExcelFileAsync(PokerClubExcelDownloadDto input)
        {
            var downloadToken = await _excelDownloadTokenCache.GetAsync(input.DownloadToken);
            if (downloadToken == null || input.DownloadToken != downloadToken.Token)
            {
                throw new AbpAuthorizationException("Invalid download token: " + input.DownloadToken);
            }

            var items = await _pokerClubRepository.GetListAsync(input.FilterText, input.ClubCode, input.ClubName, input.AliasName, input.ReleaseDate, input.ClubAddress, input.ClubAddress1, input.ClubAddress2, input.ClubAddress3, input.PhoneNumber, input.Email, input.RefFb, input.Description, input.StatusCode);

            var memoryStream = new MemoryStream();
            await memoryStream.SaveAsAsync(ObjectMapper.Map<List<PokerClub>, List<PokerClubExcelDto>>(items));
            memoryStream.Seek(0, SeekOrigin.Begin);

            return new RemoteStreamContent(memoryStream, "PokerClubs.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        public async Task<DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            var token = Guid.NewGuid().ToString("N");

            await _excelDownloadTokenCache.SetAsync(
                token,
                new PokerClubExcelDownloadTokenCacheItem { Token = token },
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
                });

            return new DownloadTokenResultDto
            {
                Token = token
            };
        }
    }
}