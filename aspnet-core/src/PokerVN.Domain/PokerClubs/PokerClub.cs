using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;

using Volo.Abp;

namespace PokerVN.PokerClubs
{
    public class PokerClub : FullAuditedAggregateRoot<Guid>, IMultiTenant
    {
        public virtual Guid? TenantId { get; set; }

        [CanBeNull]
        public virtual string? ClubCode { get; set; }

        [CanBeNull]
        public virtual string? ClubName { get; set; }

        [CanBeNull]
        public virtual string? AliasName { get; set; }

        [CanBeNull]
        public virtual string? ReleaseDate { get; set; }

        [CanBeNull]
        public virtual string? ClubAddress { get; set; }

        [CanBeNull]
        public virtual string? ClubAddress1 { get; set; }

        [CanBeNull]
        public virtual string? ClubAddress2 { get; set; }

        [CanBeNull]
        public virtual string? ClubAddress3 { get; set; }

        [CanBeNull]
        public virtual string? PhoneNumber { get; set; }

        [CanBeNull]
        public virtual string? Email { get; set; }

        [CanBeNull]
        public virtual string? RefFb { get; set; }

        [CanBeNull]
        public virtual string? Description { get; set; }

        [CanBeNull]
        public virtual string? StatusCode { get; set; }

        public PokerClub()
        {

        }

        public PokerClub(Guid id, string clubCode, string clubName, string aliasName, string releaseDate, string clubAddress, string clubAddress1, string clubAddress2, string clubAddress3, string phoneNumber, string email, string refFb, string description, string statusCode)
        {

            Id = id;
            ClubCode = clubCode;
            ClubName = clubName;
            AliasName = aliasName;
            ReleaseDate = releaseDate;
            ClubAddress = clubAddress;
            ClubAddress1 = clubAddress1;
            ClubAddress2 = clubAddress2;
            ClubAddress3 = clubAddress3;
            PhoneNumber = phoneNumber;
            Email = email;
            RefFb = refFb;
            Description = description;
            StatusCode = statusCode;
        }

    }
}