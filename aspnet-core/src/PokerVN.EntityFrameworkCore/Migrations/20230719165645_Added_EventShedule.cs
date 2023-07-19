using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokerVN.Migrations
{
    /// <inheritdoc />
    public partial class AddedEventShedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppEventShedules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EventCode = table.Column<string>(type: "text", nullable: true),
                    EventName = table.Column<string>(type: "text", nullable: true),
                    ClubCode = table.Column<string>(type: "text", nullable: true),
                    MatchDay = table.Column<string>(type: "text", nullable: true),
                    TimeDay = table.Column<string>(type: "text", nullable: true),
                    FullMatchDay = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    DescEvent = table.Column<string>(type: "text", nullable: true),
                    Days = table.Column<string>(type: "text", nullable: true),
                    EntryCostVND = table.Column<string>(type: "text", nullable: true),
                    DescEntryCostVND = table.Column<string>(type: "text", nullable: true),
                    EntryCostUSD = table.Column<string>(type: "text", nullable: true),
                    DescEntryCostUSD = table.Column<string>(type: "text", nullable: true),
                    GuaranteeVND = table.Column<string>(type: "text", nullable: true),
                    GuaranteeUSD = table.Column<string>(type: "text", nullable: true),
                    StackBegin = table.Column<string>(type: "text", nullable: true),
                    Blinds = table.Column<string>(type: "text", nullable: true),
                    RegCloseStartOfLevel = table.Column<string>(type: "text", nullable: true),
                    RegCloseStartOfTime = table.Column<string>(type: "text", nullable: true),
                    LiveFinal = table.Column<string>(type: "text", nullable: true),
                    IsHighRoller = table.Column<string>(type: "text", nullable: true),
                    IsDeepStack = table.Column<string>(type: "text", nullable: true),
                    ExtraProperties = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(type: "uuid", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppEventShedules", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppEventShedules");
        }
    }
}
