using Microsoft.EntityFrameworkCore.Migrations;

namespace HumanResources.Data.Migrations
{
    public partial class AddedVotesToBlogEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Downvotes",
                table: "BlogEntries",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Upvotes",
                table: "BlogEntries",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Downvotes",
                table: "BlogEntries");

            migrationBuilder.DropColumn(
                name: "Upvotes",
                table: "BlogEntries");
        }
    }
}
