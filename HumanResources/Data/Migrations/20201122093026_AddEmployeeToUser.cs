using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HumanResources.Data.Migrations
{
    public partial class AddEmployeeToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "EmployeeDetails",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "EmployeeDetails",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Employees",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_AspNetUsers_UserId",
                table: "Employees",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_AspNetUsers_UserId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_UserId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Employees");

            migrationBuilder.InsertData(
                table: "EmployeeDetails",
                columns: new[] { "Id", "Birthdate", "City", "PostalCode", "StreetAddress" },
                values: new object[] { 1, new DateTime(1990, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gliwice", "44-100", "ul. Jasna 1/1" });

            migrationBuilder.InsertData(
                table: "EmployeeDetails",
                columns: new[] { "Id", "Birthdate", "City", "PostalCode", "StreetAddress" },
                values: new object[] { 2, new DateTime(1985, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gliwice", "44-100", "ul. Ciemna 2/2" });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 1, "Zarządzanie zasobami ludzkimi", "HR Manager" });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[] { 2, "Tworzenie oprogramowania", "Programista" });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "DetailsId", "FirstName", "LastName", "PositionId", "Sex" },
                values: new object[] { 1, 1, "Anna", "Nowak", 1, "F" });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "DetailsId", "FirstName", "LastName", "PositionId", "Sex" },
                values: new object[] { 2, 2, "Bartosz", "Kowalski", 2, "M" });
        }
    }
}
