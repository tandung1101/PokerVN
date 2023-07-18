using PokerVN.PokerClubs;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.BlobStoring.Database.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.LanguageManagement.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TextTemplateManagement.EntityFrameworkCore;
using Volo.Saas.EntityFrameworkCore;
using Volo.Saas.Editions;
using Volo.Saas.Tenants;
using Volo.Abp.Gdpr;
using Volo.Abp.OpenIddict.EntityFrameworkCore;

namespace PokerVN.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityProDbContext))]
[ReplaceDbContext(typeof(ISaasDbContext))]
[ConnectionStringName("Default")]
public class PokerVNDbContext :
    AbpDbContext<PokerVNDbContext>,
    IIdentityProDbContext,
    ISaasDbContext
{
    public DbSet<PokerClub> PokerClubs { get; set; }
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityProDbContext and ISaasDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityProDbContext and ISaasDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    // Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; }

    // SaaS
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<Edition> Editions { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    public PokerVNDbContext(DbContextOptions<PokerVNDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentityPro();
        builder.ConfigureOpenIddictPro();
        builder.ConfigureFeatureManagement();
        builder.ConfigureLanguageManagement();
        builder.ConfigureSaas();
        builder.ConfigureTextTemplateManagement();
        builder.ConfigureBlobStoring();
        builder.ConfigureGdpr();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(PokerVNConsts.DbTablePrefix + "YourEntities", PokerVNConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});

        builder.Entity<PokerClub>(b =>
    {
        b.ToTable(PokerVNConsts.DbTablePrefix + "PokerClubs", PokerVNConsts.DbSchema);
        b.ConfigureByConvention();
        b.Property(x => x.TenantId).HasColumnName(nameof(PokerClub.TenantId));
        b.Property(x => x.ClubCode).HasColumnName(nameof(PokerClub.ClubCode));
        b.Property(x => x.ClubName).HasColumnName(nameof(PokerClub.ClubName));
        b.Property(x => x.AliasName).HasColumnName(nameof(PokerClub.AliasName));
        b.Property(x => x.ReleaseDate).HasColumnName(nameof(PokerClub.ReleaseDate));
        b.Property(x => x.ClubAddress).HasColumnName(nameof(PokerClub.ClubAddress));
        b.Property(x => x.ClubAddress1).HasColumnName(nameof(PokerClub.ClubAddress1));
        b.Property(x => x.ClubAddress2).HasColumnName(nameof(PokerClub.ClubAddress2));
        b.Property(x => x.ClubAddress3).HasColumnName(nameof(PokerClub.ClubAddress3));
        b.Property(x => x.PhoneNumber).HasColumnName(nameof(PokerClub.PhoneNumber));
        b.Property(x => x.Email).HasColumnName(nameof(PokerClub.Email));
        b.Property(x => x.RefFb).HasColumnName(nameof(PokerClub.RefFb));
        b.Property(x => x.Description).HasColumnName(nameof(PokerClub.Description));
        b.Property(x => x.StatusCode).HasColumnName(nameof(PokerClub.StatusCode));
    });
    }
}