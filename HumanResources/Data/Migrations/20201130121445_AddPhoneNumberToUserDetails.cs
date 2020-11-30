using Microsoft.EntityFrameworkCore.Migrations;

namespace HumanResources.Data.Migrations
{
    public partial class AddPhoneNumberToUserDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "UserDetails",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "UserDetails");
        }
    }
}
