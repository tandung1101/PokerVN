using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using PokerVN.PokerClubs;
using Volo.Abp.Content;
using PokerVN.Shared;

namespace PokerVN.Controllers.PokerClubs
{
    [RemoteService]
    [Area("app")]
    [ControllerName("PokerClub")]
    [Route("api/app/poker-clubs")]

    public class PokerClubController : AbpController, IPokerClubsAppService
    {
        private readonly IPokerClubsAppService _pokerClubsAppService;

        public PokerClubController(IPokerClubsAppService pokerClubsAppService)
        {
            _pokerClubsAppService = pokerClubsAppService;
        }

        [HttpGet]
        public virtual Task<PagedResultDto<PokerClubDto>> GetListAsync(GetPokerClubsInput input)
        {
            return _pokerClubsAppService.GetListAsync(input);
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<PokerClubDto> GetAsync(Guid id)
        {
            return _pokerClubsAppService.GetAsync(id);
        }

        [HttpPost]
        public virtual Task<PokerClubDto> CreateAsync(PokerClubCreateDto input)
        {
            return _pokerClubsAppService.CreateAsync(input);
        }

        [HttpPut]
        [Route("{id}")]
        public virtual Task<PokerClubDto> UpdateAsync(Guid id, PokerClubUpdateDto input)
        {
            return _pokerClubsAppService.UpdateAsync(id, input);
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task DeleteAsync(Guid id)
        {
            return _pokerClubsAppService.DeleteAsync(id);
        }

        [HttpGet]
        [Route("as-excel-file")]
        public virtual Task<IRemoteStreamContent> GetListAsExcelFileAsync(PokerClubExcelDownloadDto input)
        {
            return _pokerClubsAppService.GetListAsExcelFileAsync(input);
        }

        [HttpGet]
        [Route("download-token")]
        public Task<DownloadTokenResultDto> GetDownloadTokenAsync()
        {
            return _pokerClubsAppService.GetDownloadTokenAsync();
        }
    }
}