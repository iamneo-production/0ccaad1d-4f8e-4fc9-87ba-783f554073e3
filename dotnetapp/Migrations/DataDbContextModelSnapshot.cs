﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dotnetapp.DataBase;

#nullable disable

namespace dotnetapp.Migrations
{
    [DbContext(typeof(DataDbContext))]
    partial class DataDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("dotnetapp.Models.AdminModel", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("mobileNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userRole")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("email");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("dotnetapp.Models.GiftModel", b =>
                {
                    b.Property<int>("GiftId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GiftId"), 1L, 1);

                    b.Property<string>("GiftDetails")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GiftImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GiftName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GiftPrice")
                        .HasColumnType("int");

                    b.Property<int>("GiftQuantity")
                        .HasColumnType("int");

                    b.HasKey("GiftId");

                    b.ToTable("Gifts");
                });

            modelBuilder.Entity("dotnetapp.Models.LoginModel", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("email");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("dotnetapp.Models.OrderModel", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrderId"), 1L, 1);

                    b.Property<int?>("GiftId")
                        .HasColumnType("int");

                    b.Property<string>("OrderAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("Date");

                    b.Property<string>("OrderDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrderEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrderName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrderPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderPrice")
                        .HasColumnType("int");

                    b.Property<int>("OrderQuantity")
                        .HasColumnType("int");

                    b.Property<int?>("ThemeId")
                        .HasColumnType("int");

                    b.HasKey("OrderId");

                    b.HasIndex("GiftId");

                    b.HasIndex("ThemeId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("dotnetapp.Models.ThemeModel", b =>
                {
                    b.Property<int>("ThemeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ThemeId"), 1L, 1);

                    b.Property<string>("ThemeDetails")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ThemeName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ThemePrice")
                        .HasColumnType("int");

                    b.HasKey("ThemeId");

                    b.ToTable("Themes");
                });

            modelBuilder.Entity("dotnetapp.Models.UserModel", b =>
                {
                    b.Property<string>("email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("mobileNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("dotnetapp.Models.OrderModel", b =>
                {
                    b.HasOne("dotnetapp.Models.GiftModel", "Gift")
                        .WithMany()
                        .HasForeignKey("GiftId");

                    b.HasOne("dotnetapp.Models.ThemeModel", "Theme")
                        .WithMany()
                        .HasForeignKey("ThemeId");

                    b.Navigation("Gift");

                    b.Navigation("Theme");
                });
#pragma warning restore 612, 618
        }
    }
}
