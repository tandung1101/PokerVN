using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokerVN.Migrations
{
    /// <inheritdoc />
    public partial class AddedPokerClub : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AppPokerClubs",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "AppPokerClubs");
        }
    }
}
