using Microsoft.EntityFrameworkCore.Migrations;

namespace HumanResources.Data.Migrations
{
    public partial class AddedVotesToBlogEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogEntryVote",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    BlogEntryId = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogEntryVote", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlogEntryVote_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BlogEntryVote_BlogEntries_BlogEntryId",
                        column: x => x.BlogEntryId,
                        principalTable: "BlogEntries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlogEntryVote_BlogEntryId",
                table: "BlogEntryVote",
                column: "BlogEntryId");

            migrationBuilder.CreateIndex(
                name: "IX_BlogEntryVote_UserId",
                table: "BlogEntryVote",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogEntryVote");
        }
    }
}
