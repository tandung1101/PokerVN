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
using PokerVN.EventShedules;
using MiniExcelLibs;
using Volo.Abp.Content;
using Volo.Abp.Authorization;
using Volo.Abp.Caching;
using Microsoft.Extensions.Caching.Distributed;
using PokerVN.Shared;
using PokerVN.Common;

namespace PokerVN.EventShedules
{
    [RemoteService(IsEnabled = false)]
    [Authorize(PokerVNPermissions.EventShedules.Default)]
    public class EventShedulesAppService : ApplicationService, IEventShedulesAppService
    {
        private readonly IDistributedCache<EventSheduleExcelDownloadTokenCacheItem, string> _excelDownloadTokenCache;
        private readonly IEventSheduleRepository _eventSheduleRepository;
        private readonly EventSheduleManager _eventSheduleManager;

        public EventShedulesAppService(IEventSheduleRepository eventSheduleRepository, EventSheduleManager eventSheduleManager, IDistributedCache<EventSheduleExcelDownloadTokenCacheItem, string> excelDownloadTokenCache)
        {
            _excelDownloadTokenCache = excelDownloadTokenCache;
            _eventSheduleRepository = eventSheduleRepository;
            _eventSheduleManager = eventSheduleManager;
        }

        public virtual async Task<PagedResultDto<EventSheduleDto>> GetListAsync(GetEventShedulesInput input)
        {
            var totalCount = await _eventSheduleRepository.GetCountAsync(input.FilterText, input.EventCode, input.EventName, input.ClubCode, input.MatchDay, input.TimeDay, input.FullMatchDayMin, input.FullMatchDayMax, input.DescEvent, input.Days, input.EntryCostVND, input.DescEntryCostVND, input.EntryCostUSD, input.DescEntryCostUSD, input.GuaranteeVND, input.GuaranteeUSD, input.StackBegin, input.Blinds, input.RegCloseStartOfLevel, input.RegCloseStartOfTime, input.LiveFinal, input.IsHighRoller, input.IsDeepStack);
            var items = await _eventSheduleRepository.GetListAsync(input.FilterText, input.EventCode, input.EventName, input.ClubCode, input.MatchDay, input.TimeDay, input.FullMatchDayMin, input.FullMatchDayMax, input.DescEvent, input.Days, input.EntryCostVND, input.DescEntryCostVND, input.EntryCostUSD, input.DescEntryCostUSD, input.GuaranteeVND, input.GuaranteeUSD, input.StackBegin, input.Blinds, input.RegCloseStartOfLevel, input.RegCloseStartOfTime, input.LiveFinal, input.IsHighRoller, input.IsDeepStack, input.Sorting, input.MaxResultCount, input.SkipCount);

            return new PagedResultDto<EventSheduleDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<EventShedule>, List<EventSheduleDto>>(items)
            };
        }

        public virtual async Task<EventSheduleDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<EventShedule, EventSheduleDto>(await _eventSheduleRepository.GetAsync(id));
        }

        [Authorize(PokerVNPermissions.EventShedules.Delete)]
        public virtual async Task DeleteAsync(Guid id)
        {
            await _eventSheduleRepository.DeleteAsync(id);
        }

        [Authorize(PokerVNPermissions.EventShedules.Create)]
        public virtual async Task<EventSheduleDto> CreateAsync(EventSheduleCreateDto input)
        {
            var _numberOfEvents = await _eventSheduleRepository.CountAsync();
            var _eventCode = input.FullMatchDay.ToString("ddMM") + input.ClubCode + Common.Common.GenerateNumberString(_numberOfEvents,6);
            var eventShedule = await _eventSheduleManager.CreateAsync(
            _eventCode, input.EventName, input.ClubCode, input.MatchDay, input.TimeDay, input.FullMatchDay, input.DescEvent, input.Days, input.EntryCostVND, input.DescEntryCostVND, input.EntryCostUSD, input.DescEntryCostUSD, input.GuaranteeVND, input.GuaranteeUSD, input.StackBegin, input.Blinds, input.RegCloseStartOfLevel, input.RegCloseStartOfTime, input.LiveFinal, input.IsHighRoller, input.IsDeepStack
            );

            return ObjectMapper.Map<EventShedule, EventSheduleDto>(eventShedule);
        }

        [Authorize(PokerVNPermissions.EventShedules.Edit)]
        public virtual async Task<EventSheduleDto> UpdateAsync(Guid id, EventSheduleUpdateDto input)
        {

            var eventShedule = await _eventSheduleManager.UpdateAsync(
            id,
            input.EventCode, input.EventName, input.ClubCode, input.MatchDay, input.TimeDay, input.FullMatchDay, input.DescEvent, input.Days, input.EntryCostVND, input.DescEntryCostVND, input.EntryCostUSD, input.DescEntryCostUSD, input.GuaranteeVND, input.GuaranteeUSD, input.StackBegin, input.Blinds, input.RegCloseStartOfLevel, input.RegCloseStartOfTime, input.LiveFinal, input.IsHighRoller, input.IsDeepStack, input.ConcurrencyStamp
            );

            return ObjectMapper.Map<EventShedule, EventSheduleDto>(eventShedule);
        }

        [AllowAnonymous]
        public virtual async Task<IRemoteStreamContent> GetListAsExcelFileAsync(EventSheduleExcelDownloadDto input)
        {
            var downloadToken = await _excelDownloadTokenCache.GetAsync(input.DownloadToken);
            if (downloadToken == null || input.DownloadToken != downloadToken.Token)
            {
                throw new AbpAuthorizationException("Invalid download token: " + input.DownloadToken);
            }

            var items = await _eventSheduleRepository.GetListAsync(input.FilterText, input.EventCode, input.EventName, input.ClubCode, input.MatchDay, input.TimeDay, input.FullMatchDayMin, input.FullMatchDayMax, input.DescEvent, input.Days, input.EntryCostVND, input.DescEntryCostVND, input.EntryCostUSD, input.DescEntryCostUSD, input.GuaranteeVND, input.GuaranteeUSD, input.StackBegin, input.Blinds, input.RegCloseStartOfLevel, input.RegCloseStartOfTime, input.LiveFinal, input.IsHighRoller, input.IsDeepStack);

            var memoryStream = new MemoryStream();
            await memoryStream.SaveAsAsync(ObjectMapper.Map<List<EventShedule>, List<EventSheduleExcelDto>>(items));
            memoryStream.Seek(0, SeekOrigin.Begin);

            return new RemoteStreamContent(memoryStream, "EventShedules.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        public async Task<DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            var token = Guid.NewGuid().ToString("N");

            await _excelDownloadTokenCache.SetAsync(
                token,
                new EventSheduleExcelDownloadTokenCacheItem { Token = token },
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