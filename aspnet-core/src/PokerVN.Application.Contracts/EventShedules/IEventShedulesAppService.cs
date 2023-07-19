using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using PokerVN.Shared;

namespace PokerVN.EventShedules
{
    public interface IEventShedulesAppService : IApplicationService
    {
        Task<PagedResultDto<EventSheduleDto>> GetListAsync(GetEventShedulesInput input);

        Task<EventSheduleDto> GetAsync(Guid id);

        Task DeleteAsync(Guid id);

        Task<EventSheduleDto> CreateAsync(EventSheduleCreateDto input);

        Task<EventSheduleDto> UpdateAsync(Guid id, EventSheduleUpdateDto input);

        Task<IRemoteStreamContent> GetListAsExcelFileAsync(EventSheduleExcelDownloadDto input);

        Task<DownloadTokenResultDto> GetDownloadTokenAsync();
    }
}