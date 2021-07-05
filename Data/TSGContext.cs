using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TennisShopGuru.Models;

public class TSGContext : IdentityDbContext<User>
{
  public TSGContext(DbContextOptions<TSGContext> options)
      : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);
    // builder
    //     .Entity<Job>()
    //     .HasOne(e => e.Company)
    //     .WithMany(e => e.Jobs)
    //     .OnDelete(DeleteBehavior.NoAction);
    // builder
    //     .Entity<Job>()
    //     .HasOne(e => e.User)
    //     .WithMany(e => e.Jobs)
    //     .OnDelete(DeleteBehavior.NoAction);
    // builder
    //     .Entity<Job>()
    //     .HasOne(e => e.Customer)
    //     .WithMany(e => e.Jobs)
    //     .OnDelete(DeleteBehavior.NoAction);
    // builder
    //     .Entity<TimeSheetEntry>()
    //     .HasOne(e => e.User)
    //     .WithMany(e => e.TimeSheetEntries)
    //     .OnDelete(DeleteBehavior.NoAction);
  }

  public DbSet<TennisShopGuru.Models.Company> Company { get; set; }

  public DbSet<TennisShopGuru.Models.Customer> Customer { get; set; }

  public DbSet<TennisShopGuru.Models.Job> Job { get; set; }

  public DbSet<TennisShopGuru.Models.TimeSheetEntry> TimeSheetEntry { get; set; }

  public DbSet<TennisShopGuru.Models.TimeSheetReport> TimeSheetReport { get; set; }
}
