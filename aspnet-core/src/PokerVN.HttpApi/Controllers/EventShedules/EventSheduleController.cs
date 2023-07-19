using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using PokerVN.EventShedules;
using Volo.Abp.Content;
using PokerVN.Shared;

namespace PokerVN.Controllers.EventShedules
{
    [RemoteService]
    [Area("app")]
    [ControllerName("EventShedule")]
    [Route("api/app/event-shedules")]

    public class EventSheduleController : AbpController, IEventShedulesAppService
    {
        private readonly IEventShedulesAppService _eventShedulesAppService;

        public EventSheduleController(IEventShedulesAppService eventShedulesAppService)
        {
            _eventShedulesAppService = eventShedulesAppService;
        }

        [HttpGet]
        public virtual Task<PagedResultDto<EventSheduleDto>> GetListAsync(GetEventShedulesInput input)
        {
            return _eventShedulesAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<EventSheduleDto> GetAsync(Guid id)
        {
            return _eventShedulesAppService.GetAsync(id);
        }

        [HttpPost]
        public virtual Task<EventSheduleDto> CreateAsync(EventSheduleCreateDto input)
        {
            return _eventShedulesAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<EventSheduleDto> UpdateAsync(Guid id, EventSheduleUpdateDto input)
        {
            return _eventShedulesAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task DeleteAsync(Guid id)
        {
            return _eventShedulesAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("as-excel-file")]
        public virtual Task<IRemoteStreamContent> GetListAsExcelFileAsync(EventSheduleExcelDownloadDto input)
        {
            return _eventShedulesAppService.GetListAsExcelFileAsync(input);
        }

        [HttpGet]
        [Route("download-token")]
        public Task<DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            return _eventShedulesAppService.GetDownloadTokenAsync();
        }
    }
}