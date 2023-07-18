using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;
using PokerVN.Shared;

namespace PokerVN.PokerClubs
{
    public interface IPokerClubsAppService : IApplicationService
    {
        Task<PagedResultDto<PokerClubDto>> GetListAsync(GetPokerClubsInput input);

        Task<PokerClubDto> GetAsync(Guid id);

        Task DeleteAsync(Guid id);

        Task<PokerClubDto> CreateAsync(PokerClubCreateDto input);

        Task<PokerClubDto> UpdateAsync(Guid id, PokerClubUpdateDto input);

        Task<IRemoteStreamContent> GetListAsExcelFileAsync(PokerClubExcelDownloadDto input);

        Task<DownloadTokenResultDto> GetDownloadTokenAsync();
    }
}