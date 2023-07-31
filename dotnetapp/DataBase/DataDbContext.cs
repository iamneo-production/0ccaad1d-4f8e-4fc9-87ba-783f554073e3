using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.DataBase
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {

        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<LoginModel> Login { get; set; }
        public DbSet<AdminModel> Admin { get; set; }
        public DbSet<ThemeModel> Themes { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<GiftModel> Gifts { get; set; }

    }
}
