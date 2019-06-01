using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class AddedPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.AlterColumn<string>(
            //     name: "Description",
            //     table: "Photos",
            //     nullable: true,
            //     oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");

            // migrationBuilder.AlterColumn<int>(
            //     name: "Description",
            //     table: "Photos",
            //     nullable: false,
            //     oldClrType: typeof(string),
            //     oldNullable: true);
        }
    }
}
